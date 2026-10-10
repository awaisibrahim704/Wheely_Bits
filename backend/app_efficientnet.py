import os
import sys
import json
import cv2
import torch
import numpy as np
import faiss
from PIL import Image, ImageDraw
import torchvision.models as models
import torchvision.transforms as transforms

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR      = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR   = os.path.join(BASE_DIR, 'dataset')
DISPLAY_DIR   = os.path.join(BASE_DIR, 'display_images')
OUTPUTS_DIR   = os.path.join(BASE_DIR, 'outputs')
INDEX_PATH    = os.path.join(OUTPUTS_DIR, 'rim_index_effnet.faiss')
METADATA_PATH = os.path.join(OUTPUTS_DIR, 'metadata_effnet.json')

IMG_EXTS = ('.jpg', '.jpeg', '.png', '.jfif', '.webp')

# ── Device ────────────────────────────────────────────────────────────────────
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


# ── Feature Extractor ─────────────────────────────────────────────────────────
class FeatureExtractor:
    """Extracts L2-normalised 1280-d embeddings using EfficientNet-B0."""

    def __init__(self):
        print("Loading EfficientNet-B0 from torchvision...")
        base = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
        
        # Strip classification head, extract raw 1280-d pooled features
        self.model = torch.nn.Sequential(
            base.features,
            base.avgpool,
            torch.nn.Flatten()
        )
        self.model = self.model.to(device)
        self.model.eval()

        self.transform = transforms.Compose([
            transforms.Grayscale(num_output_channels=3),
            transforms.GaussianBlur(kernel_size=3, sigma=0.8),
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                 std=[0.229, 0.224, 0.225]),
        ])

    def manual_crop(self, img_path):
        """Open an ROI selector so the user can box the rim before scanning."""
        try:
            img = cv2.imread(img_path)
            if img is None:
                print(f"Could not load image: {img_path}")
                return None

            print("\n=======================================================")
            print("MANUAL CROP:  Drag a box around the rim, then press")
            print("              ENTER or SPACE to confirm  |  C to cancel")
            print("=======================================================\n")

            roi = cv2.selectROI("Draw box around rim & press ENTER",
                                img, showCrosshair=True, fromCenter=False)
            cv2.destroyAllWindows()

            x, y, w, h = roi
            if w > 0 and h > 0:
                crop = img[int(y):int(y+h), int(x):int(x+w)]
                return Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB))

            print("No selection made — using full image.")
        except Exception as e:
            print(f"Manual crop failed: {e} — using full image.")

        try:
            return Image.open(img_path).convert('RGB')
        except:
            return None

    def extract(self, img_path, show_crop=False):
        """Return a normalised embedding vector for the given image."""
        try:
            img = self.manual_crop(img_path) if show_crop \
                  else Image.open(img_path).convert('RGB')
            if img is None:
                return None

            tensor = self.transform(img).unsqueeze(0).to(device)
            with torch.no_grad():
                vec = torch.squeeze(self.model(tensor)).cpu().numpy()

            norm = np.linalg.norm(vec)
            return vec / norm if norm > 0 else vec

        except Exception as e:
            print(f"Embedding error ({os.path.basename(img_path)}): {e}")
            return None


# ── Index Helpers ─────────────────────────────────────────────────────────────
def _display_file(class_path):
    for ext in IMG_EXTS:
        if os.path.exists(os.path.join(class_path, 'display' + ext)):
            return 'display' + ext
    return None

def _training_files(class_path):
    return [
        f for f in os.listdir(class_path)
        if f.lower().endswith(IMG_EXTS) and not f.lower().startswith('display.')
    ]

def build_index(class_filter=None):
    os.makedirs(OUTPUTS_DIR, exist_ok=True)

    if not os.path.exists(DATASET_DIR):
        print(f"Dataset directory not found: {DATASET_DIR}")
        return

    class_dirs = [d for d in os.listdir(DATASET_DIR)
                  if os.path.isdir(os.path.join(DATASET_DIR, d))]
    if not class_dirs:
        print("No class subfolders found in dataset/")
        return

    extractor = FeatureExtractor()

    # ── Partial / Single Class rebuild ──
    if class_filter:
        matched = [d for d in class_dirs if d.lower() == class_filter.lower()]
        if not matched:
            print(f"Class '{class_filter}' not found. Available: {class_dirs}")
            return
        class_filter = matched[0]
        print(f"Rebuilding EfficientNet-B0 index (updating '{class_filter}')...")

    # ── Full rebuild ──
    else:
        print("Building full FAISS index with EfficientNet-B0 (1280-d)...")

    embeddings, metadata, idx = [], [], 0

    for class_name in class_dirs:
        class_path = os.path.join(DATASET_DIR, class_name)
        files = _training_files(class_path)
        if not files:
            continue

        label    = class_name.replace('_', ' ').replace('-', ' ').title()
        disp     = _display_file(class_path)
        disp_rel = f"{class_name}/{disp}" if disp else None

        for fname in files:
            emb = extractor.extract(os.path.join(class_path, fname), show_crop=False)
            if emb is not None:
                if not class_filter or class_name == class_filter:
                    print(f"  Indexing [{idx}]: {class_name}/{fname}")
                embeddings.append(emb)
                metadata.append({
                    "id": idx,
                    "label": label,
                    "training_image": f"{class_name}/{fname}",
                    "display_image":  disp_rel or f"{class_name}/{fname}",
                })
                idx += 1

    if embeddings:
        embs_np = np.array(embeddings).astype('float32')
        index   = faiss.IndexFlatIP(embs_np.shape[1])
        index.add(embs_np)
        faiss.write_index(index, INDEX_PATH)
        with open(METADATA_PATH, 'w') as f:
            json.dump(metadata, f, indent=4)
        print(f"\nIndexed {len(metadata)} images with EfficientNet-B0.")
        print(f"Saved: {INDEX_PATH}")


# ── Search ────────────────────────────────────────────────────────────────────
def search_rim(query_img_path, extractor, index, metadata, top_k=3, show_crop=False):
    query_emb = extractor.extract(query_img_path, show_crop=show_crop)
    if query_emb is None: 
        return []

    distances, indices = index.search(
        np.array([query_emb]).astype('float32'),
        min(len(metadata), top_k * 5)
    )

    results, seen = [], set()
    for score, idx in zip(distances[0], indices[0]):
        if idx < 0 or idx >= len(metadata): 
            continue
        item  = metadata[idx]
        label = item['label']
        if label not in seen:
            seen.add(label)
            results.append({
                'score':          float(score),
                'label':          label,
                'training_image': item['training_image'],
                'display_image':  item['display_image'],
            })
        if len(results) >= top_k: 
            break
    return results


# ── Display ───────────────────────────────────────────────────────────────────
def show_results(results):
    try:
        panels = []
        for rank, match in enumerate(results):
            lbl_clean = match['label'].lower().strip()
            disp_standalone = os.path.join(DISPLAY_DIR, f"{lbl_clean}.jpg")
            disp_path = os.path.join(DATASET_DIR, match.get('display_image', ''))
            fall_path = os.path.join(DATASET_DIR, match.get('training_image', ''))

            if os.path.exists(disp_standalone):
                path = disp_standalone
            elif os.path.exists(disp_path):
                path = disp_path
            elif os.path.exists(fall_path):
                path = fall_path
            else:
                continue

            img  = Image.open(path).convert('RGB').resize((300, 300))
            draw = ImageDraw.Draw(img)

            draw.rectangle([5, 5, 50, 50], fill=(0, 0, 0))
            draw.text((20, 15), str(rank + 1), fill=(255, 255, 255))

            cos_sim = max(0.0, min(1.0, match['score']))
            draw.rectangle([0, 260, 300, 300], fill=(0, 0, 0))
            draw.text((10, 270), f"{match['label']} (Sim: {cos_sim:.3f})", fill=(255, 255, 255))
            panels.append(img)

        spacing     = 10
        total_width = 300 * len(panels) + spacing * (len(panels) - 1)
        canvas      = Image.new('RGB', (total_width, 300), color=(30, 30, 30))
        x = 0
        for p in panels:
            canvas.paste(p, (x, 0))
            x += 300 + spacing

        canvas.show()
    except Exception as e:
        print(f"Display error: {e}")


# ── Entry Point ───────────────────────────────────────────────────────────────
if __name__ == '__main__':
    import tkinter as tk
    from tkinter import filedialog

    class_arg = None
    if '--class' in sys.argv:
        ci = sys.argv.index('--class')
        class_arg = sys.argv[ci + 1] if ci + 1 < len(sys.argv) else None

    # Handle indexing
    if class_arg:
        build_index(class_filter=class_arg)
    elif '--rebuild' in sys.argv or not (os.path.exists(INDEX_PATH) and os.path.exists(METADATA_PATH)):
        build_index()

    print("\nLoading models and FAISS index...")
    extractor = FeatureExtractor()
    index     = faiss.read_index(INDEX_PATH)
    with open(METADATA_PATH) as f:
        metadata = json.load(f)

    root = tk.Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)

    print("--- EfficientNet-B0 AI Rim Scan Ready ---")
    while True:
        img_path = filedialog.askopenfilename(
            title="Select a Rim Photo to Scan (EfficientNet-B0)",
            filetypes=[("Image Files", "*.jpg *.jpeg *.png *.webp *.jfif")]
        )
        if not img_path: 
            break

        print(f"\nSelected: {img_path}")
        results = search_rim(img_path, extractor, index, metadata, top_k=3, show_crop=True)

        if results:
            print("\n------------------------------------------------")
            print("TOP 3 MATCHES (EfficientNet-B0):")
            for i, match in enumerate(results):
                cos_sim = max(0.0, min(1.0, match['score']))
                print(f"  {i+1}th: {match['label']}  |  Cosine Similarity Score = {cos_sim:.3f}")
            print("------------------------------------------------")
            show_results(results)
        else:
            print("No matching rims found.")

        if input("\nScan another? (y/n): ").strip().lower() != 'y': 
            break
        
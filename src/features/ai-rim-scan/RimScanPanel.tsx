import {
  AlertCircle,
  Camera,
  CheckCircle2,
  RotateCcw,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { Link } from "react-router-dom";

import { useRimScan } from "./useRimScan";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const MIN_CROP_SIZE = 0.12;

type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CropDrag = {
  mode: "move" | "resize";
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  startX: number;
  startY: number;
  initialCrop: CropArea;
};

const CROP_CORNERS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

async function cropImage(file: File, crop: CropArea): Promise<File> {
  const image = await createImageBitmap(file);
  const left = Math.round(crop.x * image.width);
  const top = Math.round(crop.y * image.height);
  const width = Math.max(1, Math.round(crop.width * image.width));
  const height = Math.max(1, Math.round(crop.height * image.height));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    image.close();
    throw new Error("Unable to prepare the cropped photo. Please try again.");
  }

  context.drawImage(image, left, top, width, height, 0, 0, width, height);
  image.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.95),
  );
  if (!blob) {
    throw new Error("Unable to prepare the cropped photo. Please try again.");
  }

  return new File([blob], "rim-crop.jpg", { type: "image/jpeg" });
}

function referenceImageUrl(apiBase: string, imagePath: string) {
  const encodedPath = imagePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${apiBase}${encodedPath}`;
}

export function RimScanPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropArea>({
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const cropDragRef = useRef<CropDrag | null>(null);
  const { scanning, matches, error, scan, reset: resetScan } = useRimScan();

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    const video = videoRef.current;
    const stream = cameraStreamRef.current;
    if (cameraOpen && video && stream) {
      video.srcObject = stream;
      void video.play();
    }
  }, [cameraOpen]);

  useEffect(
    () => () => {
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    },
    [],
  );

  const chooseFile = (nextFile?: File) => {
    if (!nextFile) return;
    setSelectionError(null);

    if (!nextFile.type.startsWith("image/")) {
      setSelectionError("Choose an image file such as JPG, PNG, or WEBP.");
      return;
    }

    if (nextFile.size > MAX_IMAGE_SIZE) {
      setSelectionError("Choose an image smaller than 20 MB.");
      return;
    }

    resetScan();
    setFile(nextFile);
    setCrop({ x: 0, y: 0, width: 1, height: 1 });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    chooseFile(event.currentTarget.files?.[0]);
    event.currentTarget.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    chooseFile(event.dataTransfer.files[0]);
  };

  const openCamera = async () => {
    setSelectionError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setSelectionError(
        "Camera access is not available in this browser. Try Browse photos instead.",
      );
      return;
    }

    try {
      cameraStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: "environment" } },
      });
      setCameraOpen(true);
    } catch (cameraError) {
      setSelectionError(
        cameraError instanceof Error && cameraError.name === "NotAllowedError"
          ? "Camera permission was denied. Allow camera access in your browser settings and try again."
          : cameraError instanceof Error && cameraError.name === "NotFoundError"
            ? "No camera was found. Try Browse photos instead."
            : `Unable to open the camera: ${
                cameraError instanceof Error
                  ? cameraError.message
                  : "Please try again."
              }`,
      );
    }
  };

  const closeCamera = () => {
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;
    setCameraOpen(false);
  };

  const capturePhoto = async () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) {
      setSelectionError("The camera is not ready yet. Please try again.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      setSelectionError("Unable to capture the photo. Please try again.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.95),
    );
    if (!blob) {
      setSelectionError("Unable to capture the photo. Please try again.");
      return;
    }

    chooseFile(new File([blob], "rim-camera.jpg", { type: "image/jpeg" }));
    closeCamera();
  };

  const scanCroppedImage = async () => {
    if (!file) return;
    setSelectionError(null);
    try {
      await scan(await cropImage(file, crop));
    } catch (cropError) {
      setSelectionError(
        cropError instanceof Error
          ? cropError.message
          : "Unable to prepare the cropped photo. Please try again.",
      );
    }
  };

  const startCropDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const handle = target.closest<HTMLElement>("[data-crop-handle]");
    const frame = target.closest<HTMLElement>("[data-crop-frame]");
    if (!handle && !frame) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    cropDragRef.current = {
      mode: handle ? "resize" : "move",
      corner: handle?.dataset.cropHandle as CropDrag["corner"],
      startX: event.clientX,
      startY: event.clientY,
      initialCrop: crop,
    };
  };

  const updateCropDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = cropDragRef.current;
    if (!drag) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const deltaX = (event.clientX - drag.startX) / bounds.width;
    const deltaY = (event.clientY - drag.startY) / bounds.height;
    const initial = drag.initialCrop;

    if (drag.mode === "move") {
      setCrop({
        ...initial,
        x: Math.max(0, Math.min(1 - initial.width, initial.x + deltaX)),
        y: Math.max(0, Math.min(1 - initial.height, initial.y + deltaY)),
      });
      return;
    }

    const corner = drag.corner;
    if (!corner) return;
    let left = initial.x;
    let right = initial.x + initial.width;
    let top = initial.y;
    let bottom = initial.y + initial.height;

    if (corner.includes("left")) {
      left = Math.max(0, Math.min(right - MIN_CROP_SIZE, left + deltaX));
    } else {
      right = Math.min(1, Math.max(left + MIN_CROP_SIZE, right + deltaX));
    }
    if (corner.includes("top")) {
      top = Math.max(0, Math.min(bottom - MIN_CROP_SIZE, top + deltaY));
    } else {
      bottom = Math.min(1, Math.max(top + MIN_CROP_SIZE, bottom + deltaY));
    }

    setCrop({ x: left, y: top, width: right - left, height: bottom - top });
  };

  const endCropDrag = () => {
    cropDragRef.current = null;
  };

  const apiBase = (
    import.meta.env.VITE_RIM_SCAN_API_URL || "http://localhost:8000"
  ).replace(/\/+$/, "");

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#121416] text-[#e2e2e5]">
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 bg-black/30 px-5 py-4 backdrop-blur-xl sm:px-8">
        <Link
          to="/rim"
          aria-label="Back to rim selection"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2">
          <Zap className="h-4 w-4 text-[#abcfb2]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">
            AI Rim Scanner
          </span>
        </div>
        <Link
          to="/"
          className="text-xs font-semibold uppercase tracking-widest text-white/70 transition hover:text-white"
        >
          Wheely Bits
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-10 sm:px-8">
        {!file && (
          <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-7 text-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#abcfb2]">
                EfficientNet-B0 · FAISS similarity search
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Identify a rim from a photo
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#c2c8c0] sm:text-base">
                Upload or take a clear photo of the wheel. The AI service will
                compare its geometry with the indexed rim catalog.
              </p>
            </div>

            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`w-full rounded-3xl border-2 border-dashed p-8 transition sm:p-12 ${
                dragging
                  ? "border-[#abcfb2] bg-[#abcfb2]/10"
                  : "border-white/20 bg-white/[0.03] hover:border-[#abcfb2]/60"
              }`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#abcfb2]/30 bg-[#abcfb2]/10 text-[#abcfb2]">
                <Upload className="h-8 w-8" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">
                Choose a rim photo
              </h2>
              <p className="mt-2 text-sm text-[#c2c8c0]">
                Drag and drop an image here, or use one of the buttons below.
              </p>
              <p className="mt-2 text-xs text-white/45">
                JPG, PNG, or WEBP · Maximum 20 MB
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#abcfb2] px-5 font-bold text-[#163722] transition hover:brightness-110"
                >
                  Browse photos
                </button>
                <button
                  type="button"
                  onClick={() => void openCamera()}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 font-semibold text-white transition hover:bg-white/10"
                >
                  <Camera className="h-4 w-4" />
                  Take a photo
                </button>
              </div>
            </div>
          </section>
        )}

        {file && previewUrl && (
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)]">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#1a1c1e]">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div className="min-w-0">
                  <h2 className="font-semibold text-white">Selected photo</h2>
                  <p className="truncate text-xs text-[#c2c8c0]">{file.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={scanning}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Change
                </button>
              </div>
              <div className="flex min-h-72 flex-col items-center justify-center gap-3 bg-black/30 p-4 sm:min-h-[420px]">
                <p className="text-center text-xs text-[#c2c8c0]">
                  Drag the corner points to crop, or drag inside the frame to move it.
                </p>
                <div className="relative inline-block max-h-[65vh] max-w-full touch-none select-none">
                  <img
                    src={previewUrl}
                    alt="Selected rim to identify"
                    className="block max-h-[65vh] max-w-full rounded-xl object-contain"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0 touch-none"
                    onPointerDown={startCropDrag}
                    onPointerMove={updateCropDrag}
                    onPointerUp={endCropDrag}
                    onPointerCancel={endCropDrag}
                  >
                    <div
                      data-crop-frame
                      className="absolute cursor-move border-2 border-[#abcfb2] shadow-[0_0_0_9999px_rgba(0,0,0,0.58)]"
                      style={{
                        left: `${crop.x * 100}%`,
                        top: `${crop.y * 100}%`,
                        width: `${crop.width * 100}%`,
                        height: `${crop.height * 100}%`,
                      }}
                    >
                      {CROP_CORNERS.map((corner) => {
                        const [vertical, horizontal] = corner.split("-");
                        return (
                          <span
                            key={corner}
                            data-crop-handle={corner}
                            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#163722] bg-[#abcfb2] shadow"
                            style={{
                              left: horizontal === "left" ? 0 : "100%",
                              top: vertical === "top" ? 0 : "100%",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {scanning ? (
                <div
                  role="status"
                  className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-[#abcfb2]/25 bg-[#abcfb2]/[0.06] p-8 text-center"
                >
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/15 border-t-[#abcfb2]" />
                  <h2 className="mt-5 text-xl font-semibold text-white">
                    Analyzing rim geometry
                  </h2>
                  <p className="mt-2 text-sm text-[#c2c8c0]">
                    EfficientNet is extracting image features and searching the
                    catalog.
                  </p>
                </div>
              ) : error ? (
                <div
                  role="alert"
                  className="rounded-3xl border border-red-400/30 bg-red-950/20 p-6"
                >
                  <div className="flex items-center gap-3 text-red-200">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <h2 className="font-semibold">Scan failed</h2>
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-red-100/80">
                    {error}
                  </p>
                  <button
                    type="button"
                    onClick={() => void scanCroppedImage()}
                    className="mt-5 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    Try again
                  </button>
                </div>
              ) : matches.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#abcfb2]" />
                    <h2 className="text-xl font-semibold text-white">
                      Closest catalog matches
                    </h2>
                  </div>
                  {matches.map((match, index) => (
                    <article
                      key={`${match.rank}-${match.label}`}
                      className={`overflow-hidden rounded-2xl border ${
                        index === 0
                          ? "border-[#abcfb2]/40 bg-[#abcfb2]/[0.06]"
                          : "border-white/10 bg-[#1a1c1e]"
                      }`}
                    >
                      <div className="flex min-h-24 items-center gap-4 p-4">
                        {match.image_url ? (
                          <img
                            src={referenceImageUrl(apiBase, match.image_url)}
                            alt={match.label}
                            className="h-20 w-20 shrink-0 rounded-xl bg-black/30 object-contain p-1"
                            onError={(event) => {
                              event.currentTarget.hidden = true;
                            }}
                          />
                        ) : (
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-black/30 text-white/40">
                            <Camera className="h-7 w-7" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#abcfb2]">
                            {index === 0 ? "Best match" : `Match ${match.rank}`}
                          </p>
                          <h3 className="mt-1 truncate font-semibold text-white">
                            {match.label}
                          </h3>
                          <p className="mt-1 text-xs text-[#c2c8c0]">
                            Similarity:{" "}
                            {(
                              match.cosine_similarity ?? match.score
                            ).toFixed(3)}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                  <button
                    type="button"
                    onClick={() => void scanCroppedImage()}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#abcfb2] font-bold text-[#163722] transition hover:brightness-110"
                  >
                    <Zap className="h-4 w-4" />
                    Scan
                  </button>
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 font-semibold text-white transition hover:bg-white/10"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Scan another rim
                  </button>
                </div>
              ) : (
                <div className="flex flex-1 flex-col justify-center rounded-3xl border border-white/10 bg-[#1a1c1e] p-6">
                  <h2 className="text-xl font-semibold text-white">
                    Ready to identify
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#c2c8c0]">
                    For the best match, use a clear photo with the whole rim
                    visible and minimal obstruction.
                  </p>
                  <button
                    type="button"
                    onClick={() => void scanCroppedImage()}
                    className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#abcfb2] px-5 font-bold text-[#163722] transition hover:brightness-110"
                  >
                    <Zap className="h-4 w-4" />
                    Scan
                  </button>
                </div>
              )}

              {selectionError && (
                <p role="alert" className="text-sm text-red-200">
                  {selectionError}
                </p>
              )}
            </div>
          </section>
        )}

        {!file && selectionError && (
          <p role="alert" className="mt-5 text-center text-sm text-red-200">
            {selectionError}
          </p>
        )}
      </main>

      {cameraOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="camera-title"
        >
          <section className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-[#1a1c1e] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 id="camera-title" className="font-semibold text-white">
                Take a rim photo
              </h2>
              <button
                type="button"
                onClick={closeCamera}
                aria-label="Close camera"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="max-h-[65vh] w-full bg-black object-contain"
            />
            <div className="flex justify-center p-5">
              <button
                type="button"
                onClick={() => void capturePhoto()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#abcfb2] px-6 font-bold text-[#163722] transition hover:brightness-110"
              >
                <Camera className="h-4 w-4" />
                Capture photo
              </button>
            </div>
          </section>
        </div>
      )}

      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default RimScanPanel;

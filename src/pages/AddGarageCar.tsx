import FallbackImage from "../components/FallbackImage";
import { useEffect, useRef, useState } from "react";
import type { DragEvent, FormEvent, ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CarFront,
  Check,
  Minus,
  Plus,
  Upload,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getGarageStorageKey,
  isGarageCar,
  type GarageCar,
  type ModificationStatus,
} from "../lib/garage";

type PhotoFile = {
  id: string;
  file?: File;
  previewUrl: string;
  dataUrl?: string;
};

type CarDraft = {
  make: string;
  model: string;
  year: string;
  variant: string;
  color: string;
  nickname: string;
  description: string;
  engine: string;
  transmission: string;
  mileage: string;
  modifications: string;
  rimDetails: string;
  tyreDetails: string;
  status: ModificationStatus;
};

const emptyDraft: CarDraft = {
  make: "",
  model: "",
  year: "",
  variant: "",
  color: "",
  nickname: "",
  description: "",
  engine: "",
  transmission: "",
  mileage: "",
  modifications: "",
  rimDetails: "",
  tyreDetails: "",
  status: "stock",
};

const MAX_PHOTOS = 12;
const MAX_FILE_SIZE = 15 * 1024 * 1024;
const MAX_TOTAL_IMAGE_CHARS = 2_500_000;
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function Field({
  label,
  value,
  onChange,
  required = false,
  placeholder,
  maxLength = 120,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  type?: string;
}) {
  return (
    <label className="block min-w-0 text-xs font-semibold text-on-surface">
      {label}
      {required && <span className="ml-1 text-primary-brand">*</span>}
      <input
        type={type}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-11 w-full rounded-lg border border-white/10 bg-surface-high px-3 text-sm font-normal text-on-surface outline-none placeholder:text-on-surface-muted/50 transition focus:border-primary-brand"
      />
    </label>
  );
}

function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/5 bg-surface-high/45 p-5 sm:p-7">
      <div className={`mb-5 ${icon ? "flex items-start gap-3" : ""}`}>
        {icon && (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-brand/10 text-primary-brand">
            {icon}
          </span>
        )}
        <div>
          <h2 className="font-semibold text-on-surface">{title}</h2>
          {subtitle && (
            <p className="description-copy mt-0.5 text-on-surface-muted">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function readAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("A selected image could not be read."));
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("A selected image could not be read."));
        return;
      }
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

async function compressPhoto(file: File) {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error(`“${file.name}” could not be opened as an image.`);
  }

  try {
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not process the image.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    let blob: Blob | null = null;
    for (const quality of [0.78, 0.66, 0.54, 0.42]) {
      blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality),
      );
      if (!blob) throw new Error(`“${file.name}” could not be prepared.`);
      if (blob.size <= 250_000) break;
    }
    if (!blob) throw new Error(`“${file.name}” could not be prepared.`);
    return await readAsDataUrl(blob);
  } finally {
    bitmap.close();
  }
}

export default function AddGarageCar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { carId } = useParams<{ carId: string }>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<CarDraft>(emptyDraft);
  const [originalCar, setOriginalCar] = useState<GarageCar | null>(null);
  const [isLoadingCar, setIsLoadingCar] = useState(Boolean(carId));
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const photosRef = useRef(photos);
  photosRef.current = photos;
  const [coverPhotoId, setCoverPhotoId] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    () => () =>
      photosRef.current.forEach((photo) =>
        photo.file && URL.revokeObjectURL(photo.previewUrl),
      ),
    [],
  );

  useEffect(() => {
    if (!carId || !user?.uid) return;
    setIsLoadingCar(true);
    try {
      const stored = window.localStorage.getItem(getGarageStorageKey(user.uid));
      const parsed: unknown = stored === null ? [] : JSON.parse(stored);
      if (!Array.isArray(parsed) || !parsed.every(isGarageCar)) {
        throw new Error("Your saved garage could not be read.");
      }
      const car = parsed.find(
        (item) =>
          item.id === carId &&
          (item.ownerId === undefined || item.ownerId === user.uid),
      );
      if (!car) {
        setError("This car could not be found in your personal garage.");
        return;
      }

      setOriginalCar(car);
      setDraft({
        make: car.make,
        model: car.model,
        year: String(car.year),
        variant: car.variant,
        color: car.color ?? "",
        nickname: car.nickname ?? "",
        description: car.description,
        engine: car.engine ?? "",
        transmission: car.transmission ?? "",
        mileage: car.mileage ?? "",
        modifications: car.modifications ?? "",
        rimDetails: car.rimDetails ?? "",
        tyreDetails: car.tyreDetails ?? "",
        status: car.status,
      });
      const savedImages = car.images?.length
        ? car.images
        : car.imageUrl
          ? [car.imageUrl]
          : [];
      const savedPhotos = savedImages.map((dataUrl, index) => ({
        id: `saved-${index}-${car.id}`,
        previewUrl: dataUrl,
        dataUrl,
      }));
      setPhotos(savedPhotos);
      setCoverPhotoId(savedPhotos[0]?.id ?? "");
    } catch {
      setError(
        "Your car could not be loaded. Check browser storage permissions, then return to your garage and try again.",
      );
    } finally {
      setIsLoadingCar(false);
    }
  }, [carId, user?.uid]);

  const setField = (name: keyof CarDraft, value: string) => {
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const addFiles = (files: FileList | File[]) => {
    setError("");
    const selectedFiles = Array.from(files);
    if (photos.length + selectedFiles.length > MAX_PHOTOS) {
      setError(`You can upload up to ${MAX_PHOTOS} car photos.`);
      return;
    }
    const invalidFile = selectedFiles.find(
      (file) => !ACCEPTED_IMAGE_TYPES.has(file.type) || file.size > MAX_FILE_SIZE,
    );
    if (invalidFile) {
      setError(
        ACCEPTED_IMAGE_TYPES.has(invalidFile.type)
          ? `“${invalidFile.name}” is over the 15 MB per-image limit.`
          : "Choose JPG, PNG, or WEBP image files.",
      );
      return;
    }

    const additions = selectedFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPhotos((current) => [...current, ...additions]);
    if (!coverPhotoId && additions[0]) setCoverPhotoId(additions[0].id);
  };

  const removePhoto = (photo: PhotoFile) => {
    if (photo.file) URL.revokeObjectURL(photo.previewUrl);
    setPhotos((current) => {
      const remaining = current.filter((item) => item.id !== photo.id);
      if (coverPhotoId === photo.id) setCoverPhotoId(remaining[0]?.id ?? "");
      return remaining;
    });
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files);
  };

  const saveCar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!user?.uid) {
      setError("You must be signed in to add a car to your garage.");
      return;
    }
    if (carId && !originalCar) {
      setError("This car is not available in your personal garage.");
      return;
    }
    const year = Number(draft.year);
    if (
      !Number.isInteger(year) ||
      year < 1886 ||
      year > new Date().getFullYear() + 1
    ) {
      setError("Enter a valid model year.");
      return;
    }

    setIsSaving(true);
    try {
      const preparedPhotos: string[] = [];
      const orderedPhotos = [
        ...photos.filter((photo) => photo.id === coverPhotoId),
        ...photos.filter((photo) => photo.id !== coverPhotoId),
      ];
      let totalImageChars = 0;
      for (const photo of orderedPhotos) {
        const dataUrl = photo.file
          ? await compressPhoto(photo.file)
          : photo.dataUrl;
        if (!dataUrl) continue;
        totalImageChars += dataUrl.length;
        if (totalImageChars > MAX_TOTAL_IMAGE_CHARS) {
          throw new Error(
            "These photos are too large to save in this browser. Remove some images and try again.",
          );
        }
        preparedPhotos.push(dataUrl);
      }

      const storageKey = getGarageStorageKey(user.uid);
      const stored = window.localStorage.getItem(storageKey);
      let existingCars: GarageCar[] = [];
      if (stored !== null) {
        const parsed: unknown = JSON.parse(stored);
        if (!Array.isArray(parsed) || !parsed.every(isGarageCar)) {
          throw new Error(
            "Your saved garage could not be read, so no changes were made.",
          );
        }
        existingCars = parsed;
      }
      if (
        originalCar &&
        !existingCars.some((existing) => existing.id === originalCar.id)
      ) {
        throw new Error(
          "This car is no longer available in your personal garage. No changes were made.",
        );
      }

      const car: GarageCar = {
        id:
          originalCar?.id ??
          `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        ownerId: user.uid,
        make: draft.make.trim(),
        model: draft.model.trim(),
        year,
        variant: draft.variant.trim(),
        color: draft.color.trim(),
        nickname: draft.nickname.trim(),
        description: draft.description.trim(),
        imageUrl: preparedPhotos[0] ?? "",
        images: preparedPhotos,
        status: draft.status,
        engine: draft.engine.trim(),
        transmission: draft.transmission.trim(),
        mileage: draft.mileage.trim(),
        modifications: draft.modifications.trim(),
        rimDetails: draft.rimDetails.trim(),
        tyreDetails: draft.tyreDetails.trim(),
      };
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(
          originalCar
            ? existingCars.map((existing) =>
                existing.id === originalCar.id ? car : existing,
              )
            : [car, ...existingCars],
        ),
      );
      navigate(
        originalCar
          ? `/garage/car/${encodeURIComponent(car.id)}`
          : "/garage",
        {
          replace: true,
          state: {
            garageNotice: originalCar
              ? `${car.make} ${car.model} was updated.`
              : `${car.make} ${car.model} was added to your garage.`,
          },
        },
      );
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Your car could not be saved. Check browser storage and try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative mx-auto min-h-[70vh] w-full max-w-[1100px] px-4 pb-20 pt-4 sm:px-6 md:px-12">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-32 h-[440px] w-[440px] rounded-full bg-primary-brand/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-secondary-brand/5 blur-[150px]" />
      </div>

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Link
            to="/garage"
            className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-on-surface-muted transition hover:text-primary-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to My Garage
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl">
            {carId ? "Edit Car" : "Add Your Car"}
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-on-surface-muted">
            Register your vehicle to unlock bespoke stance matching, fitment
            calculators, and garage logs.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-brand/20 bg-primary-brand/10 px-3 py-1.5 text-xs font-medium text-primary-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-brand" />
          Personal Garage · Car Profile
        </span>
      </div>

      {isLoadingCar ? (
        <div className="rounded-2xl border border-white/5 bg-surface-high/40 px-6 py-16 text-center text-sm text-on-surface-muted">
          Loading your car…
        </div>
      ) : carId && !originalCar ? (
        <section className="rounded-2xl border border-white/5 bg-surface-high/40 px-6 py-12 text-center">
          <p className="text-sm text-on-surface-muted">
            {error || "This car is not available in your personal garage."}
          </p>
          <Link
            to="/garage"
            className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary-brand px-4 text-sm font-bold text-on-primary transition hover:brightness-110"
          >
            Back to My Garage
          </Link>
        </section>
      ) : (
      <form onSubmit={saveCar} className="space-y-5">
        <Section
          title="Car Photos"
          subtitle={`Upload up to ${MAX_PHOTOS} images. JPG, PNG, or WEBP up to 15 MB each.`}
        >
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed px-5 py-6 text-center transition ${
              isDragging
                ? "border-primary-brand bg-primary-brand/10"
                : "border-white/15 bg-background/40 hover:border-primary-brand/50"
            }`}
          >
            <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-highest text-primary-brand">
              <Upload className="h-5 w-5" aria-hidden="true" />
            </span>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-sm font-semibold text-on-surface hover:text-primary-brand"
            >
              Click to browse or drag and drop photos here
            </button>
            <p className="mt-1 text-xs text-on-surface-muted">
              Photos are optimized for your garage · first photo is the cover
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(event) => {
                if (event.currentTarget.files) addFiles(event.currentTarget.files);
                event.currentTarget.value = "";
              }}
              className="sr-only"
              aria-label="Upload car photos"
            />
          </div>

          {photos.length > 0 && (
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo) => {
                const isCover = photo.id === coverPhotoId;
                return (
                  <li
                    key={photo.id}
                    className="relative overflow-hidden rounded-xl border border-white/10 bg-background"
                  >
                    <FallbackImage
                      src={photo.previewUrl}
                      alt={`Preview of ${photo.file?.name ?? `${draft.make} ${draft.model} photo`}`}
                      className="h-28 w-full object-cover sm:h-32"
                    />
                    <div className="flex min-w-0 items-center justify-between gap-2 p-2">
                      <button
                        type="button"
                        onClick={() => setCoverPhotoId(photo.id)}
                        aria-pressed={isCover}
                        className={`inline-flex min-w-0 items-center gap-1 truncate rounded-full px-2 py-1 text-[10px] font-semibold ${
                          isCover
                            ? "bg-primary-brand text-on-primary"
                            : "bg-surface-high text-on-surface-muted hover:text-on-surface"
                        }`}
                      >
                        {isCover && <Check className="h-3 w-3 shrink-0" />}
                        {isCover ? "Cover Photo" : "Set as Cover"}
                      </button>
                      <button
                        type="button"
                        onClick={() => removePhoto(photo)}
                        aria-label={`Remove ${photo.file?.name ?? "car photo"}`}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-on-surface-muted transition hover:bg-red-400/10 hover:text-red-200"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        <Section
          icon={<CarFront className="h-5 w-5" aria-hidden="true" />}
          title="Basic Vehicle Information"
          subtitle="Core specifications used for vehicle identification and fitment lookup."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field
              label="Make"
              value={draft.make}
              onChange={(value) => setField("make", value)}
              placeholder="e.g. Toyota"
              required
            />
            <Field
              label="Model"
              value={draft.model}
              onChange={(value) => setField("model", value)}
              placeholder="e.g. Corolla"
              required
            />
            <Field
              label="Year"
              value={draft.year}
              onChange={(value) => setField("year", value)}
              placeholder="e.g. 2022"
              type="number"
              required
            />
            <Field
              label="Variant / Trim"
              value={draft.variant}
              onChange={(value) => setField("variant", value)}
              placeholder="e.g. Altis Grande 1.8 CVT"
              required
            />
            <Field
              label="Exterior Color"
              value={draft.color}
              onChange={(value) => setField("color", value)}
              placeholder="e.g. Super White / Pearl"
              required
            />
            <Field
              label="Custom Garage Nickname"
              value={draft.nickname}
              onChange={(value) => setField("nickname", value)}
              placeholder="e.g. Daily Pearl (optional)"
            />
          </div>
        </Section>

        <Section
          icon={<span className="text-sm font-bold" aria-hidden="true">Aa</span>}
          title="About Your Car"
          subtitle="Tell the Wheely Bits community about your journey, aesthetic vision, or driving ethos."
        >
          <label className="block text-xs font-semibold text-on-surface">
            Description <span className="ml-1 text-primary-brand">*</span>
            <textarea
              required
              maxLength={1000}
              rows={4}
              value={draft.description}
              onChange={(event) => setField("description", event.target.value)}
              placeholder="Share what makes your car special…"
              className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-surface-high px-3 py-3 text-sm font-normal leading-relaxed text-on-surface outline-none placeholder:text-on-surface-muted/50 transition focus:border-primary-brand"
            />
            <span className="mt-1 block text-right font-normal text-on-surface-muted">
              {draft.description.length} / 1000
            </span>
          </label>
        </Section>

        <Section
          icon={<span className="text-sm font-bold" aria-hidden="true">⚙</span>}
          title="Additional Drivetrain & Chassis Specs"
          subtitle="All specifications in this section are optional."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field
              label="Engine"
              value={draft.engine}
              onChange={(value) => setField("engine", value)}
              placeholder="e.g. 2ZR-FE, 1.8L"
            />
            <label className="block min-w-0 text-xs font-semibold text-on-surface">
              Transmission
              <select
                value={draft.transmission}
                onChange={(event) => setField("transmission", event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border border-white/10 bg-surface-high px-3 text-sm font-normal text-on-surface outline-none transition focus:border-primary-brand"
              >
                <option value="">Select transmission</option>
                <option>Automatic</option>
                <option>Manual</option>
                <option>CVT</option>
                <option>Dual-clutch</option>
                <option>Other</option>
              </select>
            </label>
            <Field
              label="Mileage"
              value={draft.mileage}
              onChange={(value) => setField("mileage", value)}
              placeholder="e.g. 28,500 km"
              maxLength={40}
            />
          </div>
        </Section>

        <Section
          icon={<Check className="h-5 w-5" aria-hidden="true" />}
          title="Installed Modifications"
          subtitle="List the upgrades already installed on your vehicle."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-on-surface">
              Modification Status
              <select
                value={draft.status}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    status: event.target.value as ModificationStatus,
                  }))
                }
                className="mt-2 min-h-11 w-full rounded-lg border border-white/10 bg-surface-high px-3 text-sm font-normal text-on-surface outline-none transition focus:border-primary-brand"
              >
                <option value="stock">Stock</option>
                <option value="modified">Modified</option>
                <option value="custom">Custom Build</option>
              </select>
            </label>
            <Field
              label="Modifications"
              value={draft.modifications}
              onChange={(value) => setField("modifications", value)}
              placeholder="e.g. suspension, exhaust, tint"
              maxLength={500}
            />
          </div>
        </Section>

        <Section
          icon={<span className="text-sm font-bold" aria-hidden="true">◉</span>}
          title="Current Wheels & Tyres Setup"
          subtitle="Optional details for fitment and stance recommendations."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Rim Details"
              value={draft.rimDetails}
              onChange={(value) => setField("rimDetails", value)}
              placeholder="Brand, model, diameter, width, offset…"
              maxLength={300}
            />
            <Field
              label="Tyre Details"
              value={draft.tyreDetails}
              onChange={(value) => setField("tyreDetails", value)}
              placeholder="Brand, model, size, performance…"
              maxLength={300}
            />
          </div>
        </Section>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm leading-relaxed text-red-200"
          >
            {error}
          </p>
        )}

        <div className="sticky bottom-3 flex flex-col-reverse items-stretch justify-between gap-3 rounded-2xl border border-white/10 bg-surface-low/95 p-3 shadow-xl backdrop-blur-xl sm:flex-row sm:items-center sm:px-5">
          <Link
            to="/garage"
            className="inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold text-on-surface-muted transition hover:text-on-surface"
          >
            Cancel
          </Link>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSaving || !user?.uid}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-brand px-6 text-sm font-bold text-on-primary shadow-lg shadow-primary-brand/10 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary/30 border-t-on-primary" />
                  Saving…
                </>
              ) : (
                <>
                  {originalCar ? "Save Car Changes" : "Add to My Garage"}
                  {originalCar ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  )}
                </>
              )}
            </button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {isSaving ? "Saving car to your garage" : ""}
        </p>
      </form>
      )}
    </main>
  );
}

import FallbackImage from "../components/FallbackImage";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CircleGauge,
  Image as ImageIcon,
  Pencil,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getGarageStorageKey,
  isGarageCar,
  type GarageCar,
} from "../lib/garage";

function Spec({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="rounded-xl border border-white/5 bg-background/50 p-4">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-muted">
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-sm font-medium text-on-surface">
        {value || "Not specified"}
      </dd>
    </div>
  );
}

export default function GarageCarDetails() {
  const { user } = useAuth();
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<GarageCar | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!user?.uid || !carId) return;
    setIsLoading(true);
    setCar(null);
    setLoadError("");
    setSelectedImage(0);
    try {
      const stored = window.localStorage.getItem(getGarageStorageKey(user.uid));
      const parsed: unknown = stored === null ? [] : JSON.parse(stored);
      if (!Array.isArray(parsed) || !parsed.every(isGarageCar)) {
        throw new Error("Saved garage data is not in the expected format.");
      }
      const ownedCar = parsed.find(
        (item) =>
          item.id === carId &&
          (item.ownerId === undefined || item.ownerId === user.uid),
      );
      if (!ownedCar) {
        setLoadError("This vehicle is not available in your personal garage.");
      } else {
        setCar(ownedCar);
      }
    } catch {
      setLoadError(
        "Your car details could not be loaded. Check browser storage permissions and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [carId, user?.uid]);

  const images = useMemo(() => {
    if (!car) return [];
    const allImages = car.images?.length
      ? car.images
      : car.imageUrl
        ? [car.imageUrl]
        : [];
    return [...new Set(allImages)];
  }, [car]);

  if (isLoading) {
    return (
      <main className="mx-auto min-h-[60vh] w-full max-w-[1280px] px-4 py-20 text-center text-sm text-on-surface-muted sm:px-6 md:px-12">
        Loading your car…
      </main>
    );
  }

  if (!car) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-[900px] flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-surface-highest text-on-surface-muted">
          <ShieldCheck className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-semibold text-on-surface">
          Car details unavailable
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-on-surface-muted">
          {loadError ||
            "This vehicle is not available in your personal garage."}
        </p>
        <Link
          to="/garage"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-brand px-5 text-sm font-bold text-on-primary transition hover:brightness-110"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to My Garage
        </Link>
      </main>
    );
  }

  const heroImage = images[selectedImage] ?? "";
  const detailsUrl = `/garage/${encodeURIComponent(car.id)}/edit`;
  const browseWithCar = (path: string) => {
    const destination = new URL(path, window.location.origin);
    destination.searchParams.set("carId", car.id);
    return `${destination.pathname}${destination.search}`;
  };

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-20 pt-3 sm:px-6 md:px-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          <Link
            to="/garage"
            className="inline-flex items-center gap-2 font-semibold text-on-surface-muted transition hover:text-primary-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to My Garage
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-on-surface-muted">Personal Garage · Vehicle Detail</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-brand/10 px-2 py-1 text-[10px] font-semibold text-primary-brand">
            <Check className="h-3 w-3" aria-hidden="true" />
            Owner verified
          </span>
        </div>
        <Link
          to={detailsUrl}
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/10 bg-surface-high/70 px-3 text-xs font-semibold text-on-surface transition hover:border-primary-brand/40 hover:text-primary-brand"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Edit Car
        </Link>
      </div>

      <section className="relative isolate mb-5 overflow-hidden rounded-2xl border border-white/5 bg-surface-high">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-surface-highest via-surface-high to-surface-low" />
        <FallbackImage
          src={heroImage}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        {!heroImage && (
          <span className="absolute bottom-3 right-3 z-10 rounded bg-background/80 px-2 py-1 text-xs text-on-surface-muted">
            Photo not uploaded
          </span>
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/75 to-background/10 sm:via-background/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/80 via-transparent to-background/10" />

        <div className="flex min-h-[370px] flex-col justify-between gap-8 p-5 sm:min-h-[420px] sm:p-8 lg:min-h-[470px] lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-primary-brand/20 bg-background/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary-brand backdrop-blur">
                {car.status === "stock"
                  ? "Stock"
                  : car.status === "custom"
                    ? "Custom Build"
                    : "Modified"}
              </span>
              {car.color && (
                <span className="rounded-full border border-white/10 bg-background/70 px-3 py-1.5 text-[10px] font-medium text-on-surface backdrop-blur">
                  {car.color}
                </span>
              )}
            </div>
            {car.mileage && (
              <div className="rounded-xl border border-white/10 bg-background/75 px-4 py-2 backdrop-blur">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-on-surface-muted">
                  Odometer
                </p>
                <p className="mt-0.5 flex items-center gap-2 text-base font-bold text-on-surface">
                  {car.mileage}
                  <CircleGauge
                    className="h-4 w-4 text-primary-brand"
                    aria-hidden="true"
                  />
                </p>
              </div>
            )}
          </div>

          <div className="max-w-2xl">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-primary-brand">
              {car.year} · {car.variant}
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
              {car.nickname || `${car.year} ${car.make} ${car.model}`}
            </h1>
            {car.nickname && (
              <p className="mt-1 text-base font-medium text-on-surface-muted sm:text-lg">
                {car.year} {car.make} {car.model}
              </p>
            )}
            <p className="mt-2 text-sm font-medium text-on-surface-muted sm:text-base">
              {car.variant}
              {car.color ? ` · ${car.color}` : ""}
            </p>
            {car.description && (
              <p className="mt-4 max-w-xl whitespace-pre-line text-sm leading-relaxed text-on-surface/90">
                {car.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <nav
        aria-label="Car actions"
        className="mb-6 grid grid-cols-1 gap-2 rounded-2xl border border-white/5 bg-surface-high/50 p-3 sm:grid-cols-2"
      >
        <Link
          to={browseWithCar("/studio")}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary-brand px-3 text-sm font-bold text-on-primary transition hover:brightness-110"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Customize This Car
        </Link>
        <Link
          to={detailsUrl}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-semibold text-on-surface transition hover:border-primary-brand/40 hover:bg-white/5"
        >
          <Pencil className="h-4 w-4 text-primary-brand" aria-hidden="true" />
          Edit Car
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          <section className="rounded-2xl border border-white/5 bg-surface-high/45 p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-brand/10 text-primary-brand">
                <Settings2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-semibold text-on-surface">
                  Vehicle Specifications
                </h2>
                <p className="text-xs text-on-surface-muted">
                  Factory and drivetrain information
                </p>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Spec label="Make" value={car.make} />
              <Spec label="Model" value={car.model} />
              <Spec label="Year" value={car.year} />
              <Spec label="Variant / Trim" value={car.variant} />
              <Spec label="Exterior Color" value={car.color} />
              <Spec label="Engine" value={car.engine} />
              <Spec label="Transmission" value={car.transmission} />
              <Spec label="Mileage" value={car.mileage} />
            </dl>
          </section>

          <section className="rounded-2xl border border-white/5 bg-surface-high/45 p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-brand/10 text-primary-brand">
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-semibold text-on-surface">
                    Modifications
                  </h2>
                  <p className="text-xs text-on-surface-muted">
                    Current build status and upgrades
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-surface-highest px-2.5 py-1 text-[10px] font-semibold text-on-surface-muted">
                {car.status === "stock"
                  ? "Stock"
                  : car.status === "custom"
                    ? "Custom Build"
                    : "Modified"}
              </span>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-on-surface-muted">
              {car.modifications || "No modifications have been listed yet."}
            </p>
          </section>
        </div>

      </div>

      <section className="mt-5 rounded-2xl border border-white/5 bg-surface-high/45 p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-brand/10 text-primary-brand">
            <ImageIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-semibold text-on-surface">Vehicle Gallery</h2>
            <p className="text-xs text-on-surface-muted">
              {images.length
                ? `${images.length} ${images.length === 1 ? "photo" : "photos"}`
                : "Photo not uploaded"}
            </p>
          </div>
        </div>
        {images.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => setSelectedImage(0)}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-background sm:col-span-2"
              aria-label="View cover photo"
            >
              <FallbackImage
                src={images[0]}
                alt={`${car.make} ${car.model} cover`}
                className="h-64 w-full object-cover sm:h-[340px]"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-[10px] font-semibold text-on-surface backdrop-blur">
                Cover photo
              </span>
            </button>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
              {images.slice(1).map((image, index) => (
                <button
                  key={`${car.id}-photo-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index + 1)}
                  className={`overflow-hidden rounded-xl border bg-background transition ${
                    selectedImage === index + 1
                      ? "border-primary-brand"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  aria-label={`View photo ${index + 2}`}
                >
                  <FallbackImage
                    src={image}
                    alt={`${car.make} ${car.model} photo ${index + 2}`}
                    className="h-28 w-full object-cover sm:h-[calc((340px-0.75rem)/2)]"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 text-center">
            <p className="text-sm text-on-surface-muted">Photo not uploaded</p>
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {images.length > 0
            ? `Showing photo ${selectedImage + 1} of ${images.length}`
            : ""}
        </p>
      </section>

      <section className="mt-5 rounded-2xl border border-white/5 bg-gradient-to-r from-surface-high to-surface-high/50 p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-brand">
              Wheely Bits Garage
            </p>
            <h2 className="mt-1 text-xl font-semibold text-on-surface sm:text-2xl">
              Take Your {car.model} to the Next Level
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-muted">
              Explore wheel fitment, tyres, and styling options for your
              {` ${car.year} ${car.make} ${car.model}`}.
            </p>
          </div>
          <Link
            to={browseWithCar("/studio")}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-brand px-5 text-sm font-bold text-on-primary transition hover:brightness-110"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Customize This Car
          </Link>
        </div>
      </section>
    </main>
  );
}

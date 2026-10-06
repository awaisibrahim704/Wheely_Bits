import FallbackImage from "../components/FallbackImage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarFront, Plus, Search } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getGarageStorageKey,
  isGarageCar,
  type GarageCar,
  type ModificationStatus,
} from "../lib/garage";

type GarageFilter = "all" | ModificationStatus;

const statusLabels: Record<ModificationStatus, string> = {
  modified: "Modified",
  stock: "Stock",
  custom: "Custom Build",
};

function CarCard({ car }: { car: GarageCar }) {
  const coverImage = car.images?.[0] || car.imageUrl;

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface-high/70 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-primary-brand/30">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-surface-highest via-surface-high to-surface-low sm:h-52">
        <div className="absolute inset-0 flex items-center justify-center text-white/20">
          <CarFront className="h-14 w-14" strokeWidth={1} aria-hidden="true" />
        </div>
        <FallbackImage
          src={coverImage}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-black/15" />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
            car.status === "stock"
              ? "bg-white/80 text-[#202321]"
              : car.status === "custom"
                ? "bg-secondary-brand text-[#312010]"
                : "bg-primary-brand text-on-primary"
          }`}
        >
          {statusLabels[car.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-brand">
          {car.year} {car.variant}
          {car.color ? ` · ${car.color}` : ""}
        </p>
        <h2 className="text-xl font-semibold leading-snug tracking-tight text-on-surface">
          {car.nickname || `${car.make} ${car.model}`}
        </h2>
        {car.nickname && (
          <p className="mt-1 text-sm text-on-surface-muted">
            {car.make} {car.model}
          </p>
        )}
        <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-on-surface-muted">
          {car.description || "No description added yet."}
        </p>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <span className="text-xs font-medium text-on-surface-muted">
            {statusLabels[car.status]} vehicle
          </span>
          <Link
            to={`/garage/car/${encodeURIComponent(car.id)}`}
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary-brand px-4 text-sm font-bold text-on-primary transition hover:brightness-110"
          >
            View Car Details <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function UserDashboard() {
  const { user } = useAuth();
  const [cars, setCars] = useState<GarageCar[]>([]);
  const [loadedUserId, setLoadedUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [garageLoadFailed, setGarageLoadFailed] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [filter, setFilter] = useState<GarageFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.uid) return;
    setIsLoading(true);
    setGarageLoadFailed(false);
    setStorageError("");
    try {
      const stored = window.localStorage.getItem(getGarageStorageKey(user.uid));
      if (stored === null) {
        setCars([]);
      } else {
        const parsed: unknown = JSON.parse(stored);
        if (!Array.isArray(parsed) || !parsed.every(isGarageCar)) {
          throw new Error("Saved garage data is not in the expected format.");
        }
        setCars(
          parsed.filter(
            (car) => car.ownerId === undefined || car.ownerId === user.uid,
          ),
        );
      }
      setLoadedUserId(user.uid);
    } catch {
      setCars([]);
      setLoadedUserId(user.uid);
      setGarageLoadFailed(true);
      setStorageError(
        "Your garage could not be loaded from this browser. Check browser storage permissions and refresh the page.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid]);

  const userCars = loadedUserId === user?.uid ? cars : [];
  const query = search.trim().toLowerCase();
  const filteredCars = userCars.filter((car) => {
    const matchesFilter = filter === "all" || car.status === filter;
    const matchesSearch =
      !query ||
      `${car.make} ${car.model} ${car.year} ${car.variant} ${car.nickname ?? ""}`
        .toLowerCase()
        .includes(query);
    return matchesFilter && matchesSearch;
  });

  const filterOptions: { id: GarageFilter; label: string }[] = [
    { id: "all", label: `All Vehicles (${userCars.length})` },
    {
      id: "modified",
      label: `Modified (${userCars.filter((car) => car.status === "modified").length})`,
    },
    {
      id: "stock",
      label: `Stock (${userCars.filter((car) => car.status === "stock").length})`,
    },
    {
      id: "custom",
      label: `Custom Build (${userCars.filter((car) => car.status === "custom").length})`,
    },
  ];

  return (
    <main className="relative mx-auto min-h-[70vh] w-full max-w-[1280px] px-4 pb-20 pt-4 sm:px-6 md:px-12">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-32 h-[440px] w-[440px] rounded-full bg-primary-brand/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-secondary-brand/5 blur-[150px]" />
      </div>

      <header className="mb-7 flex flex-col justify-between gap-5 border-b border-white/5 pb-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-medium tracking-tight text-on-surface sm:text-4xl">
              My Garage
            </h1>
            <span className="rounded-full border border-primary-brand/20 bg-primary-brand/10 px-2.5 py-1 text-xs font-semibold text-primary-brand">
              {userCars.length} {userCars.length === 1 ? "Vehicle" : "Vehicles"}
            </span>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-on-surface-muted sm:text-base">
            Your personal collection of cars, builds, and custom aesthetics.
          </p>
        </div>
        <Link
          to="/garage/add"
          aria-disabled={garageLoadFailed || isLoading}
          className={`inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-primary-brand px-5 text-sm font-bold text-on-primary shadow-lg shadow-primary-brand/10 transition hover:brightness-110 active:scale-[0.98] md:self-auto ${
            garageLoadFailed || isLoading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Your Car
        </Link>
      </header>

      {storageError && (
        <p
          role="alert"
          className="mb-5 rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {storageError}
        </p>
      )}

      {isLoading || loadedUserId !== user?.uid ? (
        <div className="rounded-2xl border border-white/5 bg-surface-high/40 px-6 py-16 text-center text-sm text-on-surface-muted">
          Loading your garage…
        </div>
      ) : garageLoadFailed ? (
        <section className="rounded-2xl border border-white/10 bg-surface-high/30 px-6 py-12 text-center">
          <h2 className="text-lg font-semibold text-on-surface">
            Garage unavailable
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-on-surface-muted">
            Your saved garage was not changed. Resolve the storage issue above,
            then refresh to try loading it again.
          </p>
        </section>
      ) : userCars.length === 0 ? (
        <section className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-surface-high/20 px-6 py-12 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface-highest text-primary-brand">
            <CarFront className="h-8 w-8" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-on-surface">
            Your garage is waiting
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-on-surface-muted">
            Add your first car to keep its details, modifications, and build
            status all in one place.
          </p>
          <Link
            to="/garage/add"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary-brand px-5 text-sm font-bold text-on-primary transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add Your Car
          </Link>
        </section>
      ) : (
        <>
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" aria-label="Filter vehicles">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  aria-pressed={filter === option.id}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    filter === option.id
                      ? "bg-primary-brand text-on-primary"
                      : "bg-surface-high text-on-surface-muted hover:bg-surface-highest hover:text-on-surface"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <label className="flex min-h-10 w-full items-center gap-2 rounded-lg border border-white/10 bg-surface-high/60 px-3 text-on-surface-muted focus-within:border-primary-brand/60 sm:max-w-[260px]">
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="sr-only">Search garage by make, model, or year</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your garage…"
                className="min-w-0 flex-1 bg-transparent text-xs text-on-surface outline-none placeholder:text-on-surface-muted/60"
              />
            </label>
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
              <Link
                to="/garage/add"
                className="group flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center transition hover:border-primary-brand/50 hover:bg-primary-brand/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-highest text-on-surface-muted transition group-hover:bg-primary-brand">
                  <Plus className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-on-surface">
                    Add Another Car
                  </span>
                  <span className="mt-1 block text-xs text-on-surface-muted">
                    Add a vehicle to your garage
                  </span>
                </span>
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-surface-high/30 px-6 py-14 text-center">
              <p className="font-medium text-on-surface">
                No vehicles match this search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  setSearch("");
                }}
                className="mt-3 text-sm font-semibold text-primary-brand hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

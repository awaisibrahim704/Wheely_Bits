export type ModificationStatus = "modified" | "stock" | "custom";

export type GarageCar = {
  id: string;
  ownerId?: string;
  make: string;
  model: string;
  year: number;
  variant: string;
  color?: string;
  nickname?: string;
  description: string;
  imageUrl: string;
  images?: string[];
  status: ModificationStatus;
  engine?: string;
  transmission?: string;
  mileage?: string;
  modifications?: string;
  rimDetails?: string;
  tyreDetails?: string;
};

export function getGarageStorageKey(userId: string) {
  return `wheelybits:garage:${userId}`;
}

export function isGarageCar(value: unknown): value is GarageCar {
  if (typeof value !== "object" || value === null) return false;
  const car = value as Record<string, unknown>;
  return (
    typeof car.id === "string" &&
    (car.ownerId === undefined || typeof car.ownerId === "string") &&
    typeof car.make === "string" &&
    typeof car.model === "string" &&
    typeof car.year === "number" &&
    typeof car.variant === "string" &&
    typeof car.description === "string" &&
    typeof car.imageUrl === "string" &&
    (car.images === undefined ||
      (Array.isArray(car.images) &&
        car.images.every((image) => typeof image === "string"))) &&
    (car.status === "modified" ||
      car.status === "stock" ||
      car.status === "custom")
  );
}

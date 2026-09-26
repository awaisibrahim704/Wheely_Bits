const sellerApiUrl = import.meta.env.VITE_SELLER_API_URL || "http://localhost:4000";

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${sellerApiUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const body = (await response.json().catch(() => ({}))) as { error?: string } & T;
  if (!response.ok) throw new Error(body.error || "The seller data could not be saved.");
  return body;
}

export function saveSellerProfile(userId: string, payload: unknown) {
  return request<{ seller: unknown }>(`/api/sellers/${encodeURIComponent(userId)}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export type SellerDashboardProduct = {
  _id: string;
  productName?: string;
  brand?: string;
  category?: string;
  price?: string | number;
  stock?: string | number;
  description?: string;
  gallery?: string[];
  aiImage?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SellerRating = {
  _id: string;
  sellerId: string;
  userId: string;
  userName: string;
  stars: number;
  comment?: string;
  car?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RatingSummary = {
  averageRating: number | null;
  totalRatings: number;
  breakdown: Record<string, number>;
};

export type SellerRatingsResponse = RatingSummary & {
  ratings: SellerRating[];
};

const DEFAULT_SEED_RATINGS: SellerRating[] = [
  {
    _id: "seed-1",
    sellerId: "automax-wheels",
    userId: "buyer-1",
    userName: "Hamza Malik",
    stars: 5,
    comment:
      "Spot on fitment for my Civic FL5. Fitted 19×9.5 Volk TE37s with Michelin Pilot Sport 4S. AutoMax checked Brembo caliper clearance beforehand and laser balancing was millimeter perfect.",
    car: "Honda Civic Type R (FL5)",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    _id: "seed-2",
    sellerId: "automax-wheels",
    userId: "buyer-2",
    userName: "Taimoor Raza",
    stars: 5,
    comment:
      "Genuine BBS LM rims with fast 24-hour insured courier delivery to Lahore. Arrived boxed in original packaging with inspection certificates. Outstanding customer support on WhatsApp!",
    car: "BMW M340i · Lahore",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    _id: "seed-3",
    sellerId: "automax-wheels",
    userId: "buyer-3",
    userName: "Zayn Shah",
    stars: 4,
    comment:
      "Great selection of premium tyres. Got Yokohama Advan Neova AD09 installed. Professional laser alignment and quick service.",
    car: "Toyota GR Yaris",
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
];

const AURA_SEED_RATINGS: SellerRating[] = [
  {
    _id: "seed-aura-1",
    sellerId: "aura-custom",
    userId: "buyer-aura-1",
    userName: "Bilal Tariq",
    stars: 5,
    comment:
      "Avery Satin Nero wrap installed on my Audi S3. The finish, tucks, and edges are absolutely flawless. Laser bay calibration on wheels was quick too!",
    car: "Audi S3 Sedan",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: "seed-aura-2",
    sellerId: "aura-custom",
    userId: "buyer-aura-2",
    userName: "Danyal Khan",
    stars: 5,
    comment:
      "Super professional team at 42nd Design Way. Clean workshop, prompt appointments, and high-grade ceramic tint. Highly recommended.",
    car: "Mercedes-Benz C200",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    _id: "seed-aura-3",
    sellerId: "aura-custom",
    userId: "buyer-aura-3",
    userName: "Saad Rehman",
    stars: 5,
    comment:
      "Installed wheel spacers and suspension drop. Very meticulous attention to detail and zero vibrations at highway speeds.",
    car: "BMW 430i Gran Coupe",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

const STANCECRAFT_SEED_RATINGS: SellerRating[] = [
  {
    _id: "seed-sc-1",
    sellerId: "stancecraft",
    userId: "buyer-sc-1",
    userName: "Moiz Ali",
    stars: 5,
    comment:
      "Got custom hub-centric wheel spacers (15mm front, 20mm rear) and air suspension calibration for my Golf R. Zero high-speed wobble and perfect flush stance without fender rubbing!",
    car: "VW Golf R (Mk7.5)",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    _id: "seed-sc-2",
    sellerId: "stancecraft",
    userId: "buyer-sc-2",
    userName: "Haris Qureshi",
    stars: 5,
    comment:
      "Exceptional fitment consulting. They measured wheel offset and camber angle with digital lasers before ordering my Work Meister wheels. StanceCraft is the real deal in Islamabad.",
    car: "Nissan 370Z Nismo",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
  {
    _id: "seed-sc-3",
    sellerId: "stancecraft",
    userId: "buyer-sc-3",
    userName: "Ahmed Bilal",
    stars: 4,
    comment:
      "Great variety of hardware, forged lug nuts, and camber plates. Fast delivery to G-10 workshop and clean installation.",
    car: "Honda Civic Si",
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
];

function getStorageRatingsKey(sellerId: string) {
  return `wheelybits:ratings:${sellerId}`;
}

export function computeRatingSummary(ratings: SellerRating[]): RatingSummary {
  if (!ratings || ratings.length === 0) {
    return {
      averageRating: null,
      totalRatings: 0,
      breakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    };
  }
  const breakdown: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
  let totalStars = 0;
  ratings.forEach((r) => {
    const s = Math.min(5, Math.max(1, Math.round(r.stars)));
    breakdown[String(s)] = (breakdown[String(s)] || 0) + 1;
    totalStars += r.stars;
  });
  return {
    averageRating: Math.round((totalStars / ratings.length) * 10) / 10,
    totalRatings: ratings.length,
    breakdown,
  };
}

export function getLocalRatings(sellerId: string): SellerRating[] {
  try {
    const raw = localStorage.getItem(getStorageRatingsKey(sellerId));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    if (sellerId === "stancecraft") {
      return STANCECRAFT_SEED_RATINGS;
    }
    if (sellerId === "aura-custom" || sellerId === "aura-custom-studio") {
      return AURA_SEED_RATINGS;
    }
    return DEFAULT_SEED_RATINGS;
  } catch {
    if (sellerId === "stancecraft") return STANCECRAFT_SEED_RATINGS;
    return sellerId === "aura-custom" ? AURA_SEED_RATINGS : DEFAULT_SEED_RATINGS;
  }
}

export function saveLocalRating(payload: {
  sellerId: string;
  userId: string;
  userName: string;
  stars: number;
  comment?: string;
  car?: string;
}): RatingSummary {
  const current = getLocalRatings(payload.sellerId);
  const now = new Date().toISOString();
  const existingIndex = current.findIndex((r) => r.userId === payload.userId);

  let updated: SellerRating[];
  if (existingIndex >= 0) {
    updated = current.map((r, i) =>
      i === existingIndex
        ? {
            ...r,
            stars: payload.stars,
            comment: payload.comment || "",
            car: payload.car || r.car,
            userName: payload.userName || r.userName,
            updatedAt: now,
          }
        : r,
    );
  } else {
    const newRating: SellerRating = {
      _id: `rating_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      sellerId: payload.sellerId,
      userId: payload.userId,
      userName: payload.userName || "Customer",
      stars: payload.stars,
      comment: payload.comment || "",
      car: payload.car,
      createdAt: now,
      updatedAt: now,
    };
    updated = [newRating, ...current];
  }

  try {
    localStorage.setItem(getStorageRatingsKey(payload.sellerId), JSON.stringify(updated));
  } catch {
    // ignore
  }

  return computeRatingSummary(updated);
}

export type SellerInquiry = {
  _id: string;
  productId?: string | null;
  productName?: string | null;
  senderName: string;
  senderPhone: string;
  car?: string | null;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt?: string;
};

export type SellerDashboardData = {
  seller: {
    ownerName?: string;
    businessName?: string;
    email?: string;
    businessPhone?: string;
    whatsapp?: string;
    store?: {
      businessName?: string;
      city?: string;
      address?: string;
      businessPhone?: string;
      whatsapp?: string;
      businessEmail?: string;
      openingTime?: string;
      closingTime?: string;
    };
  } | null;
  products: SellerDashboardProduct[];
  inquiries: SellerInquiry[];
  ratingSummary?: RatingSummary;
  recentRatings?: SellerRating[];
};

export type MarketplaceData = {
  seller: SellerDashboardData["seller"] & {
    store?: { businessName?: string; city?: string; address?: string };
  };
  sellerId: string | null;
  averageRating: number | null;
  totalRatings: number;
  products: SellerDashboardProduct[];
};

export async function getMarketplace(): Promise<MarketplaceData> {
  try {
    const data = await request<MarketplaceData>("/api/marketplace", { method: "GET" });
    const localRatings = getLocalRatings(data.sellerId || "automax-wheels");
    const summary = computeRatingSummary(localRatings);
    return {
      ...data,
      averageRating: data.averageRating ?? summary.averageRating,
      totalRatings: data.totalRatings || summary.totalRatings,
    };
  } catch {
    const localRatings = getLocalRatings("automax-wheels");
    const summary = computeRatingSummary(localRatings);
    return {
      seller: {
        businessName: "AutoMax Wheels",
        store: {
          businessName: "AutoMax Wheels",
          city: "Islamabad",
          address: "Sector I-9, Islamabad",
        },
      },
      sellerId: "automax-wheels",
      averageRating: summary.averageRating,
      totalRatings: summary.totalRatings,
      products: [],
    };
  }
}

export function createInquiry(payload: {
  sellerId: string;
  productId?: string;
  productName?: string;
  senderName: string;
  senderPhone: string;
  car?: string;
  message: string;
}) {
  return request<{ inquiryId: string; status: string }>("/api/inquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateInquiryStatus(inquiryId: string, userId: string, status: SellerInquiry["status"]) {
  return request<{ inquiryId: string; status: string }>(`/api/inquiries/${encodeURIComponent(inquiryId)}`, {
    method: "PATCH",
    body: JSON.stringify({ userId, status }),
  });
}

export async function getSellerDashboard(userId: string): Promise<SellerDashboardData> {
  const localRatings = getLocalRatings(userId);
  const localSummary = computeRatingSummary(localRatings);
  try {
    const data = await request<SellerDashboardData>(
      `/api/sellers/${encodeURIComponent(userId)}/dashboard`,
      { method: "GET" },
    );
    const ratings =
      data.recentRatings && data.recentRatings.length > 0
        ? data.recentRatings
        : localRatings;
    const summary =
      data.ratingSummary && data.ratingSummary.totalRatings > 0
        ? data.ratingSummary
        : localSummary;
    return {
      ...data,
      ratingSummary: summary,
      recentRatings: ratings,
    };
  } catch {
    return {
      seller: {
        ownerName: "AutoMax Merchant",
        businessName: "AutoMax Wheels",
        store: {
          businessName: "AutoMax Wheels",
          city: "Islamabad",
          address: "Sector I-9, Islamabad",
        },
      },
      products: [],
      inquiries: [],
      ratingSummary: localSummary,
      recentRatings: localRatings,
    };
  }
}

export async function getSellerRatings(sellerId: string): Promise<SellerRatingsResponse> {
  try {
    const res = await request<SellerRatingsResponse>(
      `/api/sellers/${encodeURIComponent(sellerId)}/ratings`,
      { method: "GET" },
    );
    if (res && Array.isArray(res.ratings) && res.ratings.length > 0) {
      try {
        localStorage.setItem(getStorageRatingsKey(sellerId), JSON.stringify(res.ratings));
      } catch {
        // ignore
      }
      return res;
    }
  } catch {
    // backend offline or request error, fallback to local ratings
  }
  const local = getLocalRatings(sellerId);
  const summary = computeRatingSummary(local);
  return {
    ...summary,
    ratings: local,
  };
}

export async function submitRating(payload: {
  sellerId: string;
  userId: string;
  userName: string;
  stars: number;
  comment?: string;
  car?: string;
}): Promise<RatingSummary & { success: boolean }> {
  // Update local storage first
  const localSummary = saveLocalRating(payload);
  try {
    const res = await request<RatingSummary & { success: boolean }>("/api/ratings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res;
  } catch {
    return {
      ...localSummary,
      success: true,
    };
  }
}

export async function getMyRating(
  sellerId: string,
  userId: string,
): Promise<{ rating: { stars: number; comment: string; car?: string } | null }> {
  try {
    const res = await request<{ rating: { stars: number; comment: string; car?: string } | null }>(
      `/api/ratings/${encodeURIComponent(sellerId)}/${encodeURIComponent(userId)}`,
      { method: "GET" },
    );
    if (res?.rating) return res;
  } catch {
    // fallback
  }
  const ratings = getLocalRatings(sellerId);
  const found = ratings.find((r) => r.userId === userId);
  return {
    rating: found ? { stars: found.stars, comment: found.comment || "", car: found.car } : null,
  };
}

export function publishSellerProduct(payload: unknown) {
  return request<{ productId: string; status: string }>("/api/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateSellerProduct(productId: string, payload: unknown) {
  return request<{ productId: string; status: string }>(
    `/api/products/${encodeURIComponent(productId)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  );
}

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

export async function hasSellerProfile(userId: string): Promise<boolean> {
  if (!userId) return false;

  try {
    const data = await request<{ seller?: unknown }>(
      `/api/sellers/${encodeURIComponent(userId)}/dashboard`,
      { method: "GET" },
    );
    if (data?.seller) return true;
  } catch {
    // Fall back to a local draft check when the backend is unavailable.
  }

  try {
    const draft = window.localStorage.getItem("wheelybits:seller-business-draft");
    if (!draft) return false;

    const parsed = JSON.parse(draft) as {
      userId?: string;
      store?: unknown;
      status?: string;
    };

    return Boolean(
      parsed.userId === userId &&
        (parsed.status === "submitted" || Boolean(parsed.store)),
    );
  } catch {
    return false;
  }
}

export type SellerDashboardProduct = {
  _id: string;
  userId?: string;
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

export type CommunityComment = {
  id: string;
  userId: string;
  author: string;
  content: string;
  createdAt: string;
};

export type CommunityPost = {
  id: string;
  userId: string;
  author: string;
  description: string;
  images: string[];
  createdAt: string;
  likedBy: string[];
  comments: CommunityComment[];
};

export type CommunityDiscussionReply = {
  id: string;
  userId: string;
  author: string;
  content: string;
  createdAt: string;
};

export type CommunityDiscussion = {
  id: string;
  userId: string;
  author: string;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  lastActivityAt?: string;
  replies: CommunityDiscussionReply[];
};

type CommunityPostRecord = Partial<CommunityPost> & {
  image?: string;
};

function normalizeCommunityPost(record: CommunityPostRecord): CommunityPost {
  return {
    id: typeof record.id === "string" ? record.id : "",
    userId: typeof record.userId === "string" ? record.userId : "",
    author: typeof record.author === "string" ? record.author : "Enthusiast",
    description:
      typeof record.description === "string" ? record.description : "",
    images: Array.isArray(record.images)
      ? record.images.filter((image): image is string => typeof image === "string")
      : typeof record.image === "string"
        ? [record.image]
        : [],
    createdAt:
      typeof record.createdAt === "string"
        ? record.createdAt
        : new Date().toISOString(),
    likedBy: Array.isArray(record.likedBy)
      ? record.likedBy.filter((userId): userId is string => typeof userId === "string")
      : [],
    comments: Array.isArray(record.comments)
      ? record.comments.filter(
          (comment): comment is CommunityComment =>
            Boolean(comment) &&
            typeof comment === "object" &&
            typeof comment.id === "string" &&
            typeof comment.author === "string" &&
            typeof comment.content === "string",
        )
      : [],
  };
}

const LOCAL_PRODUCTS_KEY = "wheelybits:published-products";

function readPublishedProducts(): SellerDashboardProduct[] {
  try {
    const raw = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writePublishedProducts(products: SellerDashboardProduct[]) {
  try {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    // ignore persistent storage errors
  }
}

const LOCAL_COMMUNITY_POSTS_KEY = "wheelybits:community-posts";

function readCommunityPosts() {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(LOCAL_COMMUNITY_POSTS_KEY) || "[]",
    );
    if (!Array.isArray(parsed)) return [];
    return parsed.map((post) => normalizeCommunityPost(post));
  } catch {
    return [];
  }
}

function writeCommunityPosts(posts: CommunityPost[]) {
  try {
    localStorage.setItem(LOCAL_COMMUNITY_POSTS_KEY, JSON.stringify(posts));
  } catch {
    // Ignore local storage errors; the API remains the primary store.
  }
}

function keepLatestProducts(products: SellerDashboardProduct[]) {
  const latestById = new Map<string, SellerDashboardProduct>();
  for (const product of products) {
    const existing = latestById.get(product._id);
    const productUpdatedAt = Date.parse(
      product.updatedAt || product.createdAt || "",
    ) || 0;
    const existingUpdatedAt = existing
      ? Date.parse(existing.updatedAt || existing.createdAt || "") || 0
      : -1;

    if (!existing || productUpdatedAt >= existingUpdatedAt) {
      latestById.set(product._id, product);
    }
  }
  return Array.from(latestById.values());
}

export async function getMarketplace(): Promise<MarketplaceData> {
  try {
    const data = await request<MarketplaceData>("/api/marketplace", {
      method: "GET",
      cache: "no-store",
    });
    const localRatings = getLocalRatings(data.sellerId || "automax-wheels");
    const summary = computeRatingSummary(localRatings);
    return {
      ...data,
      products: keepLatestProducts(data.products ?? []),
      averageRating: data.averageRating ?? summary.averageRating,
      totalRatings: data.totalRatings || summary.totalRatings,
    };
  } catch {
    const localRatings = getLocalRatings("automax-wheels");
    const summary = computeRatingSummary(localRatings);
    const localProducts = readPublishedProducts();
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
      products: keepLatestProducts(localProducts),
    };
  }
}

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  try {
    const data = await request<{ posts: CommunityPost[] }>(
      "/api/community/posts",
      { method: "GET", cache: "no-store" },
    );
    return Array.isArray(data.posts)
      ? data.posts.map((post) => normalizeCommunityPost(post))
      : [];
  } catch {
    return readCommunityPosts();
  }
}

export async function createCommunityPost(payload: {
  userId: string;
  author: string;
  description: string;
  images: string[];
}): Promise<CommunityPost> {
  try {
    const data = await request<{ post: CommunityPost }>(
      "/api/community/posts",
      { method: "POST", body: JSON.stringify(payload) },
    );
    return data.post;
  } catch {
    const post: CommunityPost = {
      ...payload,
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      likedBy: [],
      comments: [],
    };
    writeCommunityPosts([post, ...readCommunityPosts()]);
    return post;
  }
}

export async function toggleCommunityReaction(
  postId: string,
  userId: string,
): Promise<CommunityPost | null> {
  try {
    const data = await request<{ post: CommunityPost }>(
      `/api/community/posts/${encodeURIComponent(postId)}/reactions`,
      { method: "POST", body: JSON.stringify({ userId }) },
    );
    return data.post;
  } catch {
    let updated: CommunityPost | null = null;
    const posts = readCommunityPosts().map((post) => {
      if (post.id !== postId) return post;
      const likedBy = post.likedBy.includes(userId)
        ? post.likedBy.filter((id) => id !== userId)
        : [...post.likedBy, userId];
      updated = { ...post, likedBy };
      return updated;
    });
    writeCommunityPosts(posts);
    return updated;
  }
}

export async function addCommunityComment(
  postId: string,
  payload: { userId: string; author: string; content: string },
): Promise<CommunityPost | null> {
  try {
    const data = await request<{ post: CommunityPost }>(
      `/api/community/posts/${encodeURIComponent(postId)}/comments`,
      { method: "POST", body: JSON.stringify(payload) },
    );
    return data.post;
  } catch {
    let updated: CommunityPost | null = null;
    const posts = readCommunityPosts().map((post) => {
      if (post.id !== postId) return post;
      const comment: CommunityComment = {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        ...payload,
        createdAt: new Date().toISOString(),
      };
      updated = { ...post, comments: [...post.comments, comment] };
      return updated;
    });
    writeCommunityPosts(posts);
    return updated;
  }
}

export async function deleteCommunityPost(
  postId: string,
  userId: string,
): Promise<boolean> {
  try {
    await request<{ success: boolean }>(
      `/api/community/posts/${encodeURIComponent(postId)}`,
      { method: "DELETE", body: JSON.stringify({ userId }) },
    );
    return true;
  } catch {
    const posts = readCommunityPosts();
    const target = posts.find((post) => post.id === postId);
    if (!target || target.userId !== userId) return false;
    writeCommunityPosts(posts.filter((post) => post.id !== postId));
    return true;
  }
}

export async function getCommunityDiscussions(): Promise<CommunityDiscussion[]> {
  const data = await request<{ discussions: CommunityDiscussion[] }>(
    "/api/community/discussions",
    { method: "GET", cache: "no-store" },
  );
  return Array.isArray(data.discussions) ? data.discussions : [];
}

export async function getCommunityDiscussion(
  discussionId: string,
): Promise<CommunityDiscussion> {
  const data = await request<{ discussion: CommunityDiscussion }>(
    `/api/community/discussions/${encodeURIComponent(discussionId)}`,
    { method: "GET", cache: "no-store" },
  );
  return data.discussion;
}

export async function updateCommunityDiscussionAuthor(
  discussionId: string,
  payload: { userId: string; author: string },
): Promise<CommunityDiscussion> {
  const data = await request<{ discussion: CommunityDiscussion }>(
    `/api/community/discussions/${encodeURIComponent(discussionId)}/author`,
    { method: "PUT", body: JSON.stringify(payload) },
  );
  return data.discussion;
}

export async function createCommunityDiscussion(payload: {
  userId: string;
  author: string;
  title: string;
  category: string;
  content: string;
}): Promise<CommunityDiscussion> {
  const data = await request<{ discussion: CommunityDiscussion }>(
    "/api/community/discussions",
    { method: "POST", body: JSON.stringify(payload) },
  );
  return data.discussion;
}

export async function addDiscussionReply(
  discussionId: string,
  payload: { userId: string; author: string; content: string },
): Promise<CommunityDiscussion> {
  const data = await request<{ discussion: CommunityDiscussion }>(
    `/api/community/discussions/${encodeURIComponent(discussionId)}/replies`,
    { method: "POST", body: JSON.stringify(payload) },
  );
  return data.discussion;
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
    const localProducts = readPublishedProducts().filter(
      (product) => product.userId === userId || !product.userId,
    );
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
      products: localProducts,
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
  }).catch(() => {
    const product = {
      ...(payload as Record<string, unknown>),
      _id: `local-${Date.now()}`,
      userId: (payload as Record<string, unknown>)?.userId ?? "local-user",
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as SellerDashboardProduct;
    const products = readPublishedProducts();
    products.unshift(product);
    writePublishedProducts(products);
    return { productId: String(product._id), status: "published" };
  });
}

export function updateSellerProduct(productId: string, payload: unknown) {
  return request<{ productId: string; status: string }>(
    `/api/products/${encodeURIComponent(productId)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  ).catch(() => {
    const products = readPublishedProducts();
    const nextProducts = products.map((product) =>
      product._id === productId ? { ...product, ...(payload as Record<string, unknown>), _id: productId, updatedAt: new Date().toISOString(), status: "published" } : product,
    );
    if (!nextProducts.some((product) => product._id === productId)) {
      nextProducts.unshift({
        ...((payload as Record<string, unknown>) ?? {}),
        _id: productId,
        userId: (payload as Record<string, unknown>)?.userId ?? "local-user",
        status: "published",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as SellerDashboardProduct);
    }
    writePublishedProducts(nextProducts);
    return { productId, status: "published" };
  });
}

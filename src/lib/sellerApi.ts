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

export type SellerDashboardData = {
  seller: {
    ownerName?: string;
    businessName?: string;
    email?: string;
    store?: { city?: string; address?: string };
  } | null;
  products: SellerDashboardProduct[];
};

export function getSellerDashboard(userId: string) {
  return request<SellerDashboardData>(
    `/api/sellers/${encodeURIComponent(userId)}/dashboard`,
    { method: "GET" },
  );
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

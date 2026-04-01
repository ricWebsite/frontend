import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES, HTTP_STATUS } from "@/shared/const";

export interface ApiEnvelope<T> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
  items?: T[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface User {
  _id?: string;
  id?: string;
  name?: string;
  email: string;
  role?: "user" | "admin" | "superadmin";
}

export interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export interface ResendVerificationPayload {
  email: string;
}

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  description?: string;
}

export interface BlogPayload {
  title: string;
  excerpt?: string;
  content: string;
  category?: string;
}

export interface ReviewPayload {
  author: string;
  email?: string;
  rating: number;
  content: string;
}

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images?: string[];
}

export interface OrderPayload {
  items: Array<{ productId?: string; id?: string; name?: string; price: number; quantity: number }>;
  email?: string;
  total: number;
}

class ApiError extends Error {
  public statusCode: number;
  public details: string;

  constructor(message: string, statusCode: number, details: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

class ApiClient {
  private readonly baseUrl: string;
  private readonly timeout = 30000;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined | null>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.request<T>(url.toString(), { method: "GET" });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, { method: "DELETE" });
  }

  private getErrorMessageFromPayload(payload: unknown, fallback: string): string {
    if (!payload) {
      return fallback;
    }

    if (typeof payload === "string") {
      return payload;
    }

    if (typeof payload === "object") {
      const candidate = payload as {
        message?: unknown;
        error?: unknown;
        errors?: unknown;
      };

      if (typeof candidate.message === "string" && candidate.message.trim().length > 0) {
        return candidate.message;
      }

      if (typeof candidate.error === "string" && candidate.error.trim().length > 0) {
        return candidate.error;
      }

      if (Array.isArray(candidate.errors)) {
        const messages = candidate.errors
          .map((item) => {
            if (typeof item === "string") {
              return item;
            }

            if (item && typeof item === "object" && "message" in item) {
              const maybeMessage = (item as { message?: unknown }).message;
              return typeof maybeMessage === "string" ? maybeMessage : null;
            }

            return null;
          })
          .filter((msg): msg is string => Boolean(msg && msg.trim().length > 0));

        if (messages.length > 0) {
          return messages.join(", ");
        }
      }
    }

    return fallback;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        credentials: "include",
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const contentType = response.headers.get("content-type") ?? "";
        const payload = contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        throw new ApiError(
          this.getErrorMessageFromPayload(payload, `HTTP ${response.status}`),
          response.status,
          typeof payload === "string" ? payload : JSON.stringify(payload)
        );
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        return (await response.json()) as T;
      }

      return (await response.text()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        throw new ApiError(ERROR_MESSAGES.NETWORK_ERROR, 0, "Network request failed");
      }

      throw new ApiError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.SERVER_ERROR, String(error));
    }
  }
}

export { ApiError };

export const api = new ApiClient();

export function unwrapCollection<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === "object") {
    const boxed = payload as ApiEnvelope<T> & {
      results?: T[];
      data?: T[] | { items?: T[]; results?: T[] };
    };

    if (Array.isArray(boxed.items)) {
      return boxed.items;
    }

    if (Array.isArray(boxed.data)) {
      return boxed.data;
    }

    if (boxed.data && typeof boxed.data === "object") {
      if (Array.isArray(boxed.data.items)) {
        return boxed.data.items;
      }

      if (Array.isArray(boxed.data.results)) {
        return boxed.data.results;
      }
    }

    if (Array.isArray(boxed.results)) {
      return boxed.results;
    }
  }

  return [];
}

export function unwrapSingle<T>(payload: unknown): T | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const boxed = payload as ApiEnvelope<T> & {
    user?: T;
    item?: T;
  };

  if (boxed.data && typeof boxed.data === "object") {
    return boxed.data;
  }

  if (boxed.user && typeof boxed.user === "object") {
    return boxed.user;
  }

  if (boxed.item && typeof boxed.item === "object") {
    return boxed.item;
  }

  return payload as T;
}

export const authApi = {
  register: (data: AuthPayload) => api.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH}/register`, data),
  login: (data: AuthPayload) => api.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH}/login`, data),
  registerStaff: (data: AuthPayload) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH}/staff/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const contentType = res.headers.get("content-type") ?? "";
      const payload = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        const message =
          typeof payload === "object" && payload !== null && "message" in payload
            ? String((payload as { message: string }).message)
            : `HTTP ${res.status}`;

        throw new ApiError(message, res.status, JSON.stringify(payload));
      }

      return payload as ApiResponse<User>;
    }),
  loginStaff: (data: AuthPayload) => api.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH}/staff/login`, data),
  verifyStaffEmail: (data: VerifyEmailPayload) =>
    api.post<ApiResponse<User>>(`${API_ENDPOINTS.AUTH}/staff/verify-email`, data),
  resendStaffVerification: (data: ResendVerificationPayload) =>
    api.post<ApiResponse<null>>(`${API_ENDPOINTS.AUTH}/staff/resend-verification`, data),
  me: () => api.get<ApiResponse<User>>(`${API_ENDPOINTS.AUTH}/me`),
};

export const bookingApi = {
  create: (data: BookingPayload) => api.post<ApiResponse<unknown>>(API_ENDPOINTS.BOOKINGS, data),
  getAll: () => api.get<unknown>(API_ENDPOINTS.BOOKINGS),
  getById: (id: string) => api.get<unknown>(`${API_ENDPOINTS.BOOKINGS}/${id}`),
  update: (id: string, data: Partial<BookingPayload>) => api.put<ApiResponse<unknown>>(`${API_ENDPOINTS.BOOKINGS}/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse<unknown>>(`${API_ENDPOINTS.BOOKINGS}/${id}`),
};

export const blogApi = {
  getAll: () => api.get<unknown>(API_ENDPOINTS.BLOG),
  getById: (id: string) => api.get<unknown>(`${API_ENDPOINTS.BLOG}/${id}`),
  create: (data: BlogPayload) => api.post<ApiResponse<unknown>>(API_ENDPOINTS.BLOG, data),
  update: (id: string, data: Partial<BlogPayload>) => api.put<ApiResponse<unknown>>(`${API_ENDPOINTS.BLOG}/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse<unknown>>(`${API_ENDPOINTS.BLOG}/${id}`),
};

export const reviewApi = {
  getAll: () => api.get<unknown>(API_ENDPOINTS.REVIEWS),
  getById: (id: string) => api.get<unknown>(`${API_ENDPOINTS.REVIEWS}/${id}`),
  create: (data: ReviewPayload) => api.post<ApiResponse<unknown>>(API_ENDPOINTS.REVIEWS, data),
  update: (id: string, data: Partial<ReviewPayload>) => api.put<ApiResponse<unknown>>(`${API_ENDPOINTS.REVIEWS}/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse<unknown>>(`${API_ENDPOINTS.REVIEWS}/${id}`),
};

export const shopApi = {
  getProducts: () => api.get<unknown>(API_ENDPOINTS.SHOP),
  getProductById: (id: string) => api.get<unknown>(`${API_ENDPOINTS.SHOP}/${id}`),
  createProduct: (data: ProductPayload) => api.post<ApiResponse<unknown>>(API_ENDPOINTS.SHOP, data),
  updateProduct: (id: string, data: Partial<ProductPayload>) => api.put<ApiResponse<unknown>>(`${API_ENDPOINTS.SHOP}/${id}`, data),
  deleteProduct: (id: string) => api.delete<ApiResponse<unknown>>(`${API_ENDPOINTS.SHOP}/${id}`),
  createOrder: (data: OrderPayload) => api.post<ApiResponse<unknown>>(API_ENDPOINTS.ORDER, data),
  getOrders: () => api.get<unknown>(API_ENDPOINTS.ORDERS),
  getAllOrders: () => api.get<unknown>(`${API_ENDPOINTS.ORDERS}/all`),
  deleteOrder: (id: string) => api.delete<ApiResponse<unknown>>(`${API_ENDPOINTS.ORDER}/${id}`),
};

export const adminApi = {
  getUsers: () => api.get<unknown>(`${API_ENDPOINTS.ADMIN}/users`),
  deleteUser: (id: string) => api.delete<ApiResponse<unknown>>(`${API_ENDPOINTS.ADMIN}/delete-user/${id}`),
  makeAdmin: (id: string) => api.put<ApiResponse<unknown>>(`${API_ENDPOINTS.ADMIN}/make-admin/${id}`),
  removeAdmin: (id: string) => api.put<ApiResponse<unknown>>(`${API_ENDPOINTS.ADMIN}/remove-admin/${id}`),
};

export default api;

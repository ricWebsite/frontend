/**
 * API utility module for Nozah Artist Portfolio
 * Handles all HTTP requests to the backend
 */

// Ambient module declaration to satisfy TypeScript when the '@shared/const' path alias
// or its declaration file is not available in this environment.

import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES, HTTP_STATUS } from '../shared/const';

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

class ApiClient {
  private baseUrl: string;
  private timeout: number = 30000;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make a GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.request<T>(url.toString(), {
      method: 'GET',
    });
  }

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
  }

  /**
   * Core request method with error handling
   */
  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        credentials: 'include', // Include cookies
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}`,
          response.status,
          await response.text()
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }

      return (await response.text()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new ApiError(
          ERROR_MESSAGES.NETWORK_ERROR,
          0,
          'Network request failed'
        );
      }

      throw new ApiError(
        ERROR_MESSAGES.SERVER_ERROR,
        HTTP_STATUS.SERVER_ERROR,
        String(error)
      );
    }
  }
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Export singleton instance
export const api = new ApiClient();

/**
 * Portfolio API methods
 */
export const portfolioApi = {
  getAll: (category?: string) =>
    api.get<PaginatedResponse<any>>(API_ENDPOINTS.PORTFOLIO, { category }),
  getByCategory: (category: string) =>
    api.get<PaginatedResponse<any>>(API_ENDPOINTS.PORTFOLIO, { category }),
  getById: (id: string) =>
    api.get<any>(`${API_ENDPOINTS.PORTFOLIO}/${id}`),
};

/**
 * Booking API methods
 */
export const bookingApi = {
  create: (data: any) =>
    api.post<ApiResponse<any>>(API_ENDPOINTS.BOOKINGS, data),
  getAll: () =>
    api.get<PaginatedResponse<any>>(API_ENDPOINTS.BOOKINGS),
  getById: (id: string) =>
    api.get<any>(`${API_ENDPOINTS.BOOKINGS}/${id}`),
  update: (id: string, data: any) =>
    api.put<ApiResponse<any>>(`${API_ENDPOINTS.BOOKINGS}/${id}`, data),
  delete: (id: string) =>
    api.delete<ApiResponse<any>>(`${API_ENDPOINTS.BOOKINGS}/${id}`),
};

/**
 * Blog API methods
 */
export const blogApi = {
  getAll: (page?: number, pageSize?: number) =>
    api.get<PaginatedResponse<any>>(API_ENDPOINTS.BLOG, { page, pageSize }),
  getBySlug: (slug: string) =>
    api.get<any>(`${API_ENDPOINTS.BLOG}/${slug}`),
  create: (data: any) =>
    api.post<ApiResponse<any>>(API_ENDPOINTS.BLOG, data),
  update: (id: string, data: any) =>
    api.put<ApiResponse<any>>(`${API_ENDPOINTS.BLOG}/${id}`, data),
  delete: (id: string) =>
    api.delete<ApiResponse<any>>(`${API_ENDPOINTS.BLOG}/${id}`),
  addComment: (postId: string, data: any) =>
    api.post<ApiResponse<any>>(`${API_ENDPOINTS.BLOG}/${postId}/comments`, data),
  getComments: (postId: string) =>
    api.get<PaginatedResponse<any>>(`${API_ENDPOINTS.BLOG}/${postId}/comments`),
};

/**
 * Review API methods
 */
export const reviewApi = {
  getAll: (page?: number, pageSize?: number) =>
    api.get<PaginatedResponse<any>>(API_ENDPOINTS.REVIEWS, { page, pageSize }),
  create: (data: any) =>
    api.post<ApiResponse<any>>(API_ENDPOINTS.REVIEWS, data),
  delete: (id: string) =>
    api.delete<ApiResponse<any>>(`${API_ENDPOINTS.REVIEWS}/${id}`),
};

/**
 * Shop API methods
 */
export const shopApi = {
  getProducts: (page?: number, pageSize?: number) =>
    api.get<PaginatedResponse<any>>(API_ENDPOINTS.PRODUCTS, { page, pageSize }),
  getProductById: (id: string) =>
    api.get<any>(`${API_ENDPOINTS.PRODUCTS}/${id}`),
  createOrder: (data: any) =>
    api.post<ApiResponse<any>>(API_ENDPOINTS.ORDERS, data),
  getOrders: () =>
    api.get<PaginatedResponse<any>>(API_ENDPOINTS.ORDERS),
  getOrderById: (id: string) =>
    api.get<any>(`${API_ENDPOINTS.ORDERS}/${id}`),
};

export default api;


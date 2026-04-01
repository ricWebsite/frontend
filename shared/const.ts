export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  AUTH: "/api/auth",
  PORTFOLIO: "/api/portfolio",
  BOOKINGS: "/api/bookings",
  BLOG: "/api/blog",
  REVIEWS: "/api/reviews",
  PRODUCTS: "/api/products",
  SHOP: "/api/products",
  ORDER: "/api/orders",
  ORDERS: "/api/orders",
  ADMIN: "/api/admin",
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Unable to connect to the server. Check your internet connection.",
  SERVER_ERROR: "Something went wrong on the server. Please try again.",
} as const;

export const HTTP_STATUS = {
  SERVER_ERROR: 500,
} as const;

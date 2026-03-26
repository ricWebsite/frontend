/**
 * Shared constants for Nozah Artist Portfolio Website
 */

// Session & Storage
export const COOKIE_NAME = 'nozah_session';
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';
export const CART_STORAGE_KEY = 'nozah_cart';
export const FAVORITES_STORAGE_KEY = 'nozah_favorites';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  ADMIN: '/api/admin',
  PORTFOLIO: '/api/portfolio',
  BOOKINGS: '/api/bookings',
  BLOG: '/api/blog',
  REVIEWS: '/api/reviews',
  SHOP: '/api/shop',
  PRODUCTS: '/api/shop',
  ORDER: '/api/shop/order',
  ORDERS: '/api/shop/orders',
  COMMENTS: '/api/blog/comments',
};

// Color Palette - Nozah Artistic Theme
export const COLORS = {
  PRIMARY: '#FFD1DC', // Pink
  SECONDARY: '#C3E0A8', // Green
  ACCENT: '#E6E6FA', // Lavender
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  LIGHT_GRAY: '#F5F5F5',
  MEDIUM_GRAY: '#666666',
  DARK_GRAY: '#333333',
  BORDER: '#E0E0E0',
  ERROR: '#FF6B6B',
};

// Typography
export const FONTS = {
  HEADING: "'Great Vibes', cursive",
  BODY: "'Lato', sans-serif",
};

// App Configuration
export const APP_CONFIG = {
  TITLE: 'Nozah - Artist Portfolio',
  DESCRIPTION: 'Showcasing Kenyan visual artist Nozah\'s tattoos, digital art, pen art, and contemporary pieces',
  LOGO: '/logo.svg',
  FAVICON: '/favicon.ico',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  BLOG_PAGE_SIZE: 10,
  REVIEWS_PAGE_SIZE: 5,
};

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/,
  MIN_PASSWORD_LENGTH: 8,
};

// Portfolio Categories
export const PORTFOLIO_CATEGORIES = [
  { id: 'tattoos', label: 'Tattoos', icon: '🎨' },
  { id: 'digital', label: 'Digital Art', icon: '💻' },
  { id: 'pen', label: 'Pen Art', icon: '✏️' },
  { id: 'contemporary', label: 'Contemporary', icon: '🖼️' },
];

// Booking Configuration
export const BOOKING_CONFIG = {
  MIN_DATE_OFFSET: 1, // Minimum days in advance
  MAX_DATE_OFFSET: 90, // Maximum days in advance
  TIME_SLOTS: [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00',
  ],
};

// Shop Configuration
export const SHOP_CONFIG = {
  CURRENCY: 'KES',
  CURRENCY_SYMBOL: 'KSh',
  TAX_RATE: 0.16, // 16% VAT in Kenya
};

// Social Media Links
export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://instagram.com/nozah',
  TWITTER: 'https://twitter.com/nozah',
  FACEBOOK: 'https://facebook.com/nozah',
  TIKTOK: 'https://tiktok.com/@nozah',
  LINKEDIN: 'https://linkedin.com/in/nozah',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  BOOKING_CONFLICT: 'This time slot is no longer available.',
  CART_EMPTY: 'Your cart is empty.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  BOOKING_SUBMITTED: 'Your booking request has been submitted successfully!',
  REVIEW_SUBMITTED: 'Thank you for your review!',
  PRODUCT_ADDED: 'Product added to cart.',
  PRODUCT_REMOVED: 'Product removed from cart.',
  ORDER_PLACED: 'Your order has been placed successfully!',
  COMMENT_POSTED: 'Your comment has been posted.',
};


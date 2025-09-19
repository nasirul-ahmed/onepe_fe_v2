export const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "https://api.your-backend.com";
export const COOKIE_NAME = "__Host-access"; // httpOnly access token cookie
export const USER_COOKIE_NAME = "user"; // readable cookie for client user info
export const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes

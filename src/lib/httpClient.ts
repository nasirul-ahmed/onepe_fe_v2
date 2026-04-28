import axios from "axios";
import config from "@/config/config.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const httpClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Sends refresh token cookie
});

let isRefreshing = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Add token to every request
httpClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token added to request:", config.url);
    } else {
      console.warn("No token found for request:", config.url);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Handle 401 and refresh token
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. Check if the error is 401
    // 2. Ensure it's not a retry (avoids infinite loops)
    // 3. Ensure we aren't already trying to call the refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const { access_token } = response.data;

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", access_token);
        }

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        processQueue(null, access_token);

        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");

          const isPublicPage = config.publicRoutes.includes(
            window.location.pathname,
          );

          if (!isPublicPage) {
            window.location.href = "/login";
          }
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default httpClient;

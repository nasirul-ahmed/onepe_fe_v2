import api from "./api";

export const requestOtp = (phone: string) =>
  api.post("/auth/mobile/request-otp", { phone });

export const verifyOtp = (phone: string, otp: string) =>
  api.post("/auth/mobile/verify-otp", { phone, otp });

export const getProfile = async () => {
  const { data } = await api.get("/auth/me");
  return data.user;
};

export const logoutApi = () => api.post("/auth/logout");

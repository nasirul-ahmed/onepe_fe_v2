import httpClient from "@/lib/httpClient";

export const requestOtp = (phone: string) =>
  httpClient.post("/auth/request-otp", {
    phone: `+91${phone}`,
    type: "phone_verification",
  });

export const verifyOtp = (phone: string, otp: string) =>
  httpClient.post("/auth/verify-mobile-otp", { phone: `+91${phone}`, otp });

export const getProfile = async () => {
  const { data } = await httpClient.get("/user/profile");
  return data.user;
};

export const logoutApi = () => httpClient.post("/auth/logout");

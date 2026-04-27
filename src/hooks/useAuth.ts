"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  logoutApi,
  requestOtp,
  verifyOtp,
} from "@/services/auth.services";
import { useAuthStore } from "@/store/auth-store";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

interface VerifyOtpResponse {
  accessToken: string;
  user: User;
}

export function useRequestOtp() {
  return useMutation({
    mutationFn: (phone: string) => requestOtp(phone),
  });
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  return useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) =>
      verifyOtp(phone, otp),
    onSuccess: (response: AxiosResponse<VerifyOtpResponse>) => {
      const { accessToken, user } = response.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        document.cookie = `authToken=${accessToken}; path=/; max-age=86400`;
      }

      // Update store and sync React Query cache
      setAuthenticated(true);
      queryClient.setQueryData(["user", "profile"], user);
    },
  });
}

// Query: Get user profile
export function useUserProfile() {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      try {
        const user = await getProfile();
        return user;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });
}

// Mutation: Logout
export function useLogout() {
  const queryClient = useQueryClient();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clear user data from cache
      queryClient.removeQueries({ queryKey: ["user"] });

      // Clear auth token from storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        document.cookie = "authToken=; path=/; max-age=0";
      }

      // Update auth state
      setAuthenticated(false);
    },
    onError: () => {
      setAuthenticated(false);
    },
  });
}

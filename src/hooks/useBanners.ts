import { allBanners } from "@/services/banners.services";
import { useQuery } from "@tanstack/react-query";

export const APP_BANNERS_QUERY_KEYS = ["app-banners", "banners"];

export function useBanners() {
  return useQuery({
    queryKey: APP_BANNERS_QUERY_KEYS,
    queryFn: () => allBanners(),
    staleTime: 5000,
  });
}

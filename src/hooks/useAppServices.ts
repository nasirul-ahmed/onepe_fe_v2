import { getAllServices } from "@/services/appServices.services";
import { useQuery } from "@tanstack/react-query";

export const APP_SERVICES_QUERY_KEYS = ["app-servieces"];

export function useAppServices() {
  return useQuery({
    queryKey: APP_SERVICES_QUERY_KEYS,
    queryFn: () => getAllServices(),
    staleTime: 5000,
  });
}

import { fetchSearch, fetchSuggestions } from "@/services/search.services";
import { useQuery } from "@tanstack/react-query";

export function useSearch<T>(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearch<T>(query),
    enabled: !!query,
    staleTime: 1000 * 60,
  });
}

export function useSuggestions(query: string) {
  return useQuery({
    queryKey: ["suggestions", query],
    queryFn: () => fetchSuggestions(query),
    enabled: !!query,
    staleTime: 1000 * 60,
  });
}
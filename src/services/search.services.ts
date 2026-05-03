import httpClient from "@/lib/httpClient";

export async function fetchSearch<T>(q: string): Promise<T> {
  const { data } = await httpClient.get(
    `/search?q=${encodeURIComponent(q)}`,
  );
  return data as T;
}

export async function fetchSuggestions(q: string) {
  const { data } = await httpClient.get(
    `/search/suggestions?q=${encodeURIComponent(q)}`,
  );
  return data;
}

import httpClient from "@/lib/httpClient";

export async function fetchSearch(q: string) {
  const { data } = await httpClient.get(
    `/search?q=${encodeURIComponent(q)}`,
  );
  return data;
}

export async function fetchSuggestions(q: string) {
  const { data } = await httpClient.get(
    `/search/suggestions?q=${encodeURIComponent(q)}`,
  );
  return data;
}

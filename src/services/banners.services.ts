import httpClient from "@/lib/httpClient";

export async function allBanners() {
  const { data } = await httpClient.get("/banners");
  return data;
}

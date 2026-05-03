import httpClient from "@/lib/httpClient";

export async function getAllServices() {
  const { data } = await httpClient.get("/app-services");

  return data;
}

export async function getServiceBySlug(slug: string) {
  const { data } = await httpClient.get(`/app-services/${slug}`);

  return data;
}

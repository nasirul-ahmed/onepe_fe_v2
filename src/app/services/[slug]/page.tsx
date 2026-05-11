import { notFound } from "next/navigation";
import { AppService } from "@/lib/interfaces/services";
import { Suspense } from "react";
import SkeletonList from "@/components/SkeletonList";
import { ServiceModuleFactory } from "../factory";
import { cookies } from "next/headers";
import config from "@/config/config.json";

async function fetchServiceBySlug(slug: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app-services/${slug}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();

    return data.service as AppService | null;
  } catch (error) {
    console.error(`Error fetching service with slug "${slug}":`, error);
    return config.appServices.find((service) => service.slug === slug) || null;
  }
}

export default async function DynamicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    console.log("token not found");
  }

  const service = await fetchServiceBySlug(slug, token!);
  
  // TODO: make sure our service by slug api does not fail. if it fails
  // then we need to come up with a secondary solution 
  // if (!service) {
  //   notFound();
  // }

  const ComponentModule = ServiceModuleFactory(slug);

  return (
    <div className="flex flex-col">
      <main>
        <Suspense fallback={<SkeletonList count={6} />}>
          <ComponentModule service={null} />
        </Suspense>
      </main>
    </div>
  );
}

import { notFound } from "next/navigation";
import { AppService } from "@/lib/interfaces/services";
import { Suspense } from "react";
import SkeletonList from "@/components/SkeletonList";
import { ServiceModuleFactory } from "../factory";
import { cookies } from "next/headers";

async function fetchServiceBySlug(
  slug: string,
  token: string,
): Promise<AppService | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/app-services/${slug}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  const data = await res.json();

  return data.service as AppService | null;
}

export default async function DynamicServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    console.log("token not found");
  }

  const service = await fetchServiceBySlug(slug, token!);

  if (!service) {
    notFound();
  }

  const ComponentModule = ServiceModuleFactory(service.type);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-8">
        <Suspense fallback={<SkeletonList count={6} />}>
          <ComponentModule service={service} />
        </Suspense>
      </main>
    </div>
  );
}

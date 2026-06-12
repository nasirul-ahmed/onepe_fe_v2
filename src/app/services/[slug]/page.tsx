import config from "@/config/config.json";
import { ServiceModuleFactory } from "../factory";

interface RouteParams {
  slug: string;
}
export async function generateStaticParams(): Promise<RouteParams[]> {
  const services = config.appServices.map((item) => item.slug);

  // Option B: If your services come from an API endpoint, fetch them:
  // const res = await fetch('https://api.example.com/services');
  // const data = await res.json();
  // const services = data.map((s: any) => s.slug);

  return services.map((serviceSlug) => ({
    slug: serviceSlug,
  }));
}

// async function fetchServiceBySlug(slug: string, token: string) {
//   const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/app-services/${slug}`;

//   try {
//     const res = await fetch(url, {
//       headers: { Authorization: `Bearer ${token}` },
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     const data = await res.json();

//     return data.service as AppService | null;
//   } catch (error) {
//     console.error(`Error fetching service with slug "${slug}":`, error);
//     return config.appServices.find((service) => service.slug === slug) || null;
//   }
// }

export default async function DynamicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // const cookieStore = await cookies();
  // const token = cookieStore.get("authToken")?.value;

  // if (!token) {
  //   console.log("token not found");
  // }

  // const service = await fetchServiceBySlug(slug, token!);

  // TODO: make sure our service by slug api does not fail. if it fails
  // then we need to come up with a secondary solution
  // if (!service) {
  //   notFound();
  // }

  const ComponentModule = ServiceModuleFactory(slug);

  return (
    <div className="flex flex-col">
      <main className="flex flex-col h-[100dvh] overflow-hidden">
        <ComponentModule service={null} />
      </main>
    </div>
  );
}

import { cookies } from "next/headers";
import { getQueryClient } from "@/lib/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import ProfileContent from "./ProfileContent";

async function getUser(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export default async function ProfilePage() {
  const queryClient = getQueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) throw new Error("No auth token");

  // Prefetch user data on server
  await queryClient.prefetchQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const data = await getUser(token);
      return data.user;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileContent />
    </HydrationBoundary>
  );
}

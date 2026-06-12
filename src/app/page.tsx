"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigate";
import { ROUTE_PATHS } from "@/config/routes";

export default function Page() {
  const { navigate } = useNavigation();

  useEffect(() => {
    navigate(ROUTE_PATHS.HOME);
  }, []);

  return null;
}

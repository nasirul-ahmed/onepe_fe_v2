import { useRouter, usePathname } from "next/navigation";
import { useNavigationStore } from "@/store/navigation-store";
import { RouteUtils } from "@/config/routes";

export function useBack() {
  const router = useRouter();
  const pathname = usePathname();
  const pop = useNavigationStore((s) => s.pop);

  const goBack = () => {
    const previous = pop(); // take top of stack

    if (previous) {
      router.push(previous);
    } else {
      // Stack empty — user landed directly on this URL (bookmark/refresh)
      // Fall back to static parentRoute from route config
      const parent = RouteUtils.getParentRoute(pathname);
      router.push(parent);
    }
  };

  const canGoBack = useNavigationStore((s) => s.history.length > 0);

  return { goBack, canGoBack };
}

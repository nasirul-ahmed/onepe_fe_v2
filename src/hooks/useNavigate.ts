import { useRouter, usePathname } from "next/navigation";
import { useNavigationStore } from "@/store/navigation-store";
import { RouteUtils } from "@/config/routes";

export function useNavigation() {
  // const router = useRouter();
  // const pathname = usePathname();
  // const push = useNavigationStore((s) => s.push);
  // const pop = useNavigationStore((s) => s.pop);
  // const canGoBack = useNavigationStore((s) => s.history.length > 0);

  const router = useRouter();
  const pathname = usePathname();
  const { push, clear, history } = useNavigationStore();

  const navigate = (to: string) => {
    const resolved = RouteUtils.resolve(to);
    if (!resolved) return;

    const isNavTab = resolved.config.isBottomTabRoute;

    if (isNavTab) {
      clear();
      router.replace(to);
      return;
    }

    if (history[history.length - 1] !== pathname) {
      push(pathname);
    }

    router.push(to);
  };

  const goBack = () => {
    const { pop } = useNavigationStore.getState();
    const previous = pop();

    if (previous) {
      router.push(previous);
    } else {
      // Fallback to parent if history is empty
      router.push(RouteUtils.getParentPath(pathname));
    }
  };

  return { navigate, goBack };
}

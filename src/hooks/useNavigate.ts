import { useRouter, usePathname } from 'next/navigation';
import { useNavigationStore } from '@/store/navigation-store';
import { RouteUtils } from '@/config/routes';

export function useNavigation() {
  const router    = useRouter();
  const pathname  = usePathname();
  const push      = useNavigationStore((s) => s.push);
  const pop       = useNavigationStore((s) => s.pop);
  const canGoBack = useNavigationStore((s) => s.history.length > 0);

  const navigate = (to: string) => {
    push(pathname);
    router.push(to);
  };

  const goBack = () => {
    const previous = pop();
    router.push(previous ?? RouteUtils.getParentRoute(pathname));
  };

  const replace = (to: string) => {
    // Navigate without pushing to stack — used for redirects
    // e.g. after login, after payment success
    router.replace(to);
  };

  return { navigate, goBack, canGoBack, replace };
}
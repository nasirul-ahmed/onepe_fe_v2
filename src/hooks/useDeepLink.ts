import { useNavigation } from "@/hooks/useNavigate";
import { ROUTE_PATHS } from "@/config/routes";
import { isValidUrl } from "@/lib/utils";
import { FRONTEND_BASE_URL } from "@/config";

export const useDeepLink = () => {
  const { navigate } = useNavigation();

  const handleAction = (action: string) => {
    console.log({ actionFromHook: action });
    if (!action) return;

    // 1. External Web URLs
    if (isValidUrl(action)) {
      console.log("norma link");
      try {
        const url = new URL(action);
        const appUrl = new URL(FRONTEND_BASE_URL);

        // if the url matches with this app domain
        if (url.hostname === appUrl.hostname) {
          const path = url.pathname;
          const search = url.search;

          // Still verify the path exists before navigating
          const validPaths = Object.values(ROUTE_PATHS);
          if (validPaths.includes(path as any)) {
            navigate(`${path}${search}`);
            return;
          }
        }
        window.open(action, "_blank", "noopener,noreferrer");
      } catch (error) {
        window.open(action, "_blank", "noopener,noreferrer");
      }

      return;
    }

    // 2. Internal Deep Links
    if (action.startsWith("deep_link://")) {
      console.log("deeplink");
      try {
        const url = new URL(
          action.replace("deep_link://", `${FRONTEND_BASE_URL}/`),
        );

        const path = url.pathname; // "/services/mobile-recharge"
        const search = url.search; // "?offerId=123"

        // Check if path exists in our configuration
        const validPaths = Object.values(ROUTE_PATHS);

        console.log({ validPaths });

        if (validPaths.includes(path as any)) {
          navigate(`${path}${search}`);
        } else {
          console.warn(
            `[DeepLink] Blocked: Path "${path}" is not a recognized route.`,
          );
        }
      } catch (error) {
        console.error("[DeepLink] Parsing error:", error);
      }
    }
  };

  return { handleAction };
};

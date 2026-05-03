"use client";

import React, { ReactNode, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useDevice } from "@/hooks/useDevice";
import MobileOnlyMessage from "./MobileOnly";
import styles from "@/styles/components/appLayout.module.css";
import { usePathname } from "next/navigation";
import config from "@/config/config.json";
import SplashScreen from "./SplashScreen";
import { useNavigation } from "@/hooks/useNavigate";
import Loader from "./Loader";

interface IAppLayoutInputProps {
  children: ReactNode;
}

const AppLayout = ({ children }: IAppLayoutInputProps) => {
  const { isMobile } = useDevice();
  const pathname = usePathname();
  const dontShowNavs = config.dontShowNavsOn.includes(pathname);
  const [showSplash, setShowSplash] = React.useState(true);
  const { replace } = useNavigation();

  React.useEffect(() => {
    if (sessionStorage.getItem("splash_shown")) {
      setShowSplash(false);
    }

    if (pathname === "/") {
      replace("/home");
    }
  }, []);

  if (!isMobile) {
    return <MobileOnlyMessage />;
  }

  const handleSplashComplete = () => {
    sessionStorage.setItem("splash_shown", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className={styles.appLayout} data-auth-page={dontShowNavs}>
      <Header />
      <Suspense fallback={<Loader />}>
        <div className={styles.scrollableContent}>{children}</div>
      </Suspense>
      <Footer />
    </div>
  );
};

export default AppLayout;

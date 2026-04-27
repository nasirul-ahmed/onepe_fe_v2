"use client";

import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useDevice } from "@/hooks/useDevice";
import MobileOnlyMessage from "./MobileOnly";
import styles from "@/styles/components/appLayout.module.css";
import { usePathname } from "next/navigation";
import config from "@/config/config.json";

interface IAppLayoutInputProps {
  children: ReactNode;
}

const AppLayout = ({ children }: IAppLayoutInputProps) => {
  const { isMobile } = useDevice();
  const pathname = usePathname();
  const dontShowNavs = config.dontShowNavsOn.includes(pathname)

  React.useEffect(() => {
    // console.log(isMobile);
  }, [isMobile]);

  if (!isMobile) {
    return <MobileOnlyMessage />;
  }

  return (
    <div className={styles.appLayout} data-auth-page={dontShowNavs}>
      <Header />
      <div className={styles.scrollableContent}>{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;

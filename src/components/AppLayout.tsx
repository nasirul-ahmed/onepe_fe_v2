"use client";

import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useDevice } from "@/hooks/useDevice";
import MobileOnlyMessage from "./MobileOnly";

interface IAppLayoutInputProps {
  children: ReactNode;
}

const AppLayout = ({ children }: IAppLayoutInputProps) => {
  const { isMobile } = useDevice();

  React.useEffect(() => {
    console.log(isMobile)
  }, [isMobile]);

  if (!isMobile) {
    return <MobileOnlyMessage />;
  }

  return (
    <div>
      <Header />
      {<div>{children}</div>}
      <Footer />
    </div>
  );
};

export default AppLayout;

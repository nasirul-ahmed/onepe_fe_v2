"use client";
import { useState, useEffect } from "react";
import UAParser from "ua-parser-js";

export const useDevice = () => {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const detect = () => {
      const parser = new UAParser();
      const type = parser.getDevice().type;
      setDevice({
        isMobile: type === "mobile",
        isTablet: type === "tablet",
        isDesktop: !type,
      });
    };

    detect();

    window.addEventListener("resize", detect);

    return () => window.removeEventListener("resize", detect);
  }, []);

  return device;
};

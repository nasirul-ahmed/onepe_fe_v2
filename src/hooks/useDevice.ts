"use client";
import { useState, useEffect } from "react";
import UAParser from "ua-parser-js";

export const useDevice = () => {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    os: "", // e.g., "Android", "iOS", "Windows", "Mac OS"
    osVersion: "", // e.g., "15", "14.5", "11"
    browser: "", // e.g., "Chrome", "Safari", "Firefox"
    browserVersion: "", // e.g., "120.0.0.0"
    engine: "", // e.g., "Blink", "WebKit"
    deviceVendor: "", // e.g., "Apple", "Samsung", "Google"
    deviceModel: "", // e.g., "iPhone", "Galaxy S23", "Pixel 7"
    deviceType: "", // e.g., "mobile", "tablet", "console", "smarttv"
  });

  useEffect(() => {
    const detect = () => {
      const parser = new UAParser();
      const result = parser.getResult();

      setDevice({
        isMobile: result.device.type === "mobile",
        isTablet: result.device.type === "tablet",
        isDesktop: !result.device.type,
        os: result.os.name || "",
        osVersion: result.os.version || "",
        browser: result.browser.name || "",
        browserVersion: result.browser.version || "",
        engine: result.engine.name || "",
        deviceVendor: result.device.vendor || "",
        deviceModel: result.device.model || "",
        deviceType: result.device.type || "desktop",
      });
    };

    detect();

    window.addEventListener("resize", detect);

    return () => window.removeEventListener("resize", detect);
  }, []);

  return device;
};

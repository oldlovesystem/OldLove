"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("1315032009652288"); //don't forget to change this
        ReactPixel.pageView();
      });
  }, [pathname, searchParams]);

  return null;
};
export const nameEvent = async () => {
    const { default: ReactPixel } = await import("react-facebook-pixel");
    ReactPixel.init("Your Pixel ID");
    const data = {}; // Initialize data with an empty object or appropriate value
    ReactPixel.track("Name", { data });
    };

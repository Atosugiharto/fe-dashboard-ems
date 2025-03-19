import { LocalAtmOutlined } from "@mui/icons-material";
import MonthlyCost from "./MonthlyCost";
import DailyCost from "./DailyCost";
import { useState } from "react";
import { useEffect } from "react";

export const Cost = () => {
  const [responsive, setResponsive] = useState({
    iconSize: 25,
  });

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        // For 4K resolution
        setResponsive({
          iconSize: 60,
        });
      } else {
        // Default settings for smaller screens
        setResponsive({
          iconSize: 25,
        });
      }
    };

    // Initial check
    updateResponsiveSettings();

    // Add resize listener
    window.addEventListener("resize", updateResponsiveSettings);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);
  return (
    <div className="4k:text-4xl">
      <div className="flex items-center justify-center my-2">
        <div className="inline-block items-center text-center p-2 rounded-sm bg-latar-huruf text-white font-bold text-lg 4k:text-4xl uppercase">
          <span className="mr-2">
            <LocalAtmOutlined style={{ fontSize: responsive.iconSize }} />
          </span>
          <span>Cost</span>
        </div>
      </div>

      <DailyCost />

      <MonthlyCost />
    </div>
  );
};

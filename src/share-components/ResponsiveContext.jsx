/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

// 1. Buat Context
const ResponsiveContext = createContext(null);

export const ResponsiveProvider = ({ children, defaultSettings }) => {
  const [chartHeight, setChartHeight] = useState(defaultSettings?.chartHeight || 250);
  const [fontSize, setFontSize] = useState(
    defaultSettings?.fontSize || {
      xaxis: "12px",
      yaxis: "12px",
      iconSize: 20,
      annotations: "10px",
      title: "text-lg 4k:text-4xl",
    }
  );

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        setChartHeight(defaultSettings?.chartHeight || 400);
        setFontSize(
          defaultSettings?.fontSize || {
            xaxis: "17px",
            yaxis: "17px",
            iconSize: 40,
            annotations: "15px",
            title: "text-3xl",
          }
        );
      } else {
        setChartHeight(defaultSettings?.chartHeight || 250);
        setFontSize(
          defaultSettings?.fontSize || {
            xaxis: "12px",
            yaxis: "12px",
            iconSize: 20,
            annotations: "10px",
            title: "text-lg 4k:text-4xl",
          }
        );
      }
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);

    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, [defaultSettings]);

  return (
    <ResponsiveContext.Provider value={{ chartHeight, fontSize, setChartHeight, setFontSize }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

// Custom Hook untuk mengakses nilai context
export const useResponsiveSettings = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error("useResponsiveSettings must be used within a ResponsiveProvider");
  }
  return context;
};

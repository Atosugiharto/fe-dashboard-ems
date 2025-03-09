import { Cloud } from "@mui/icons-material";
import YearlyEmission from "./YearlyEmission";
import DailyEmission from "./DailyEmission";
// import TableEmission from "./TableEmission";
import TableMonthEmission from "./TableMonthEmission";
import MonthlyEmission from "./MonthlyEmission";
import { useState } from "react";
import { useEffect } from "react";

export const Emission = () => {
  const [responsive, setResponsive] = useState({ iconSize: 25 });

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        setResponsive({ iconSize: 60 });
      } else {
        setResponsive({ iconSize: 25 });
      }
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);
  return (
    <div className="4k:text-4xl">
      <div className="flex items-center justify-center my-2">
        <div className="inline-block items-center text-center p-2 rounded-sm bg-latar-huruf text-white font-bold text-lg 4k:text-4xl uppercase">
          <span className="mr-2">
            <Cloud style={{ fontSize: responsive.iconSize }} />
          </span>
          <span>Emission</span>
        </div>
      </div>

      <div className="lg:flex gap-4 p-4 rounded-md 4k:rounded-xl bg-kartu">
        <div className="lg:w-1/2 mb-4 lg:mb-0">
          <DailyEmission />
        </div>

        <div className="lg:w-1/2">
          {/* <TableEmission /> */}
          <TableMonthEmission />
        </div>
      </div>

      <div className="lg:flex gap-4 mt-4">
        <div className="lg:w-1/2 p-4 rounded-md 4k:rounded-xl bg-kartu mb-4 lg:mb-0">
          <MonthlyEmission />
        </div>

        <div className="lg:w-1/2 p-4 rounded-md 4k:rounded-xl bg-kartu">
          <YearlyEmission />
        </div>
      </div>
    </div>
  );
};

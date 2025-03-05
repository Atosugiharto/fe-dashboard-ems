import { Bolt, ExpandMore, ChevronRight } from "@mui/icons-material";
import { useState, useEffect } from "react";
import HourlySupply from "./HourlySupply";
import PowerQualityCard from "./PowerQualityCard";
import DailySupply from "./DailySupply";
import { MonthlyCard } from "./MonthlyCard";
import MonthlySupply from "./MonthlySupply";
import { YearlyCard } from "./YearlyCard";
import YearlySupply from "./YearlySupply";

export const Pln = () => {
  const [responsive, setResponsive] = useState({ iconSize: 25 });
  const [showMore, setShowMore] = useState(false);

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
        <div className="inline-block items-center text-center py-2 px-4 rounded-sm bg-latar-huruf text-white font-bold text-lg 4k:text-4xl uppercase">
          <span className="mr-2">
            <Bolt style={{ fontSize: responsive.iconSize }} />
          </span>
          <span>PLN</span>
        </div>
      </div>

      <div className="w-full lg:flex gap-8 p-4 rounded-md 4k:rounded-xl bg-kartu">
        <div className="w-full lg:w-4/5">
          <HourlySupply />
        </div>
        <div className="w-full lg:w-1/5">
          <PowerQualityCard />
        </div>
      </div>

      <div className="w-full lg:flex gap-8 p-4 rounded-md 4k:rounded-xl bg-kartu mt-4">
        <div className="w-full lg:w-4/5">
          <DailySupply />
        </div>
        <div className="w-full lg:w-1/5">
          <MonthlyCard />
        </div>
      </div>

      <button
        className="my-4 flex items-center justify-center py-1 px-2 4k:py-2 4k:px-4 rounded-md 4k:rounded-xl bg-latar-huruf text-white font-bold text-lg 4k:text-4xl"
        onClick={() => setShowMore((prev) => !prev)}
      >
        <span>{showMore ? "See Less" : "See More"}</span>
        {showMore ? (
          <ExpandMore style={{ fontSize: responsive.iconSize }} />
        ) : (
          <ChevronRight style={{ fontSize: responsive.iconSize }} />
        )}
      </button>

      {showMore && (
        <div className="lg:flex flex-1 gap-4">
          <div className="lg:flex gap-4 p-4 rounded-md 4k:rounded-xl bg-kartu lg:w-2/3">
            <div className="w-full lg:w-2/3">
              <MonthlySupply />
            </div>
            <div className="w-full lg:w-1/3"><YearlyCard /></div>
          </div>
          <div className="p-4 rounded-md 4k:rounded-xl bg-kartu w-full lg:w-1/3">
            <YearlySupply />
          </div>
        </div>
      )}
    </div>
  );
};

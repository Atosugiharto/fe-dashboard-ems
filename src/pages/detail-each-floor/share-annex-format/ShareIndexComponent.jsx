/* eslint-disable react/prop-types */
import { ViewInAr } from "@mui/icons-material";
import { useState, useEffect } from "react";
import ThisMonthChart from "./ThisMonthChart";
import DailyConsumption from "./DailyConsumption";
import HourlyConsumption from "./HourlyConsumption";
import ThisMonthComparison from "./ThisMonthComparison";
import TableFirtsFloor from "./TableFirtsFloor";
import moment from "moment";

export const ShareIndexComponent = ({
  menu = "",
  apiDaily = "",
  apiHourly = "",
  apiThisMonth = "",
  apiThisMonthComparison = "",
  apiTable = "",
}) => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setselectedDate] = useState(today);
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
        <div className="inline-block items-center text-center py-2 px-4 rounded-sm bg-latar-huruf text-white font-bold text-lg 4k:text-4xl uppercase">
          <span className="mr-2">
            <ViewInAr style={{ fontSize: responsive.iconSize }} />
          </span>
          <span>{menu}</span>
        </div>
      </div>

      <div className="bg-kartu p-3 flex items-center justify-center gap-4 rounded-md 4k:rounded-xl text-white font-medium text-xs 4k:text-2xl mb-4">
        <div className="flex items-center gap-2">
          <input
            className="bg-latar-select rounded-md p-1"
            type="date"
            id="startDate"
            value={selectedDate}
            onChange={(e) => setselectedDate(e.target.value)}
            style={{ WebkitAppearance: "none", colorScheme: "dark" }}
          />
        </div>
      </div>

      <div className="lg:flex gap-4 w-full">
        <div className="lg:flex lg:w-2/5 p-4 rounded-md 4k:rounded-xl bg-kartu mb-4 lg:mb-0">
          <HourlyConsumption apiUrl={apiHourly} />
        </div>

        <div className="lg:w-2/5 p-4 rounded-md 4k:rounded-xl bg-kartu mb-4 lg:mb-0">
          <DailyConsumption selectedDate={selectedDate} apiUrl={apiDaily} />
        </div>

        <div className="lg:w-1/3 4k:w-1/5 p-4 rounded-md 4k:rounded-xl bg-kartu mb-4 lg:mb-0">
          <ThisMonthChart selectedDate={selectedDate} apiUrl={apiThisMonth} />
        </div>
      </div>

      <div className="lg:flex gap-4 mt-4">
        <div className="lg:w-2/3 p-4 rounded-md 4k:rounded-xl bg-kartu mb-4 lg:mb-0 lg:flex gap-2">
          <div className="w-full">
            <ThisMonthComparison
              selectedDate={selectedDate}
              apiUrl={apiThisMonthComparison}
            />
          </div>
        </div>

        <div className="lg:w-1/3 p-4 rounded-md 4k:rounded-xl bg-kartu">
          <TableFirtsFloor apiUrl={apiTable} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

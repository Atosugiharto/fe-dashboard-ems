/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Build } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import DailyConsumption from "./DailyConsumption";
import MonthlyConsumption from "./MonthlyConsumption";
import TableEquipmentSingleData from "./TableEquipmentSingleData";
import TableEquipment from "./TableEquipment";
import HourlyConsumptionSingleData from "./HourlyConsumptionSingleData";
import HourlyConsumption from "./HourlyConsumption";
import HourlyConsumptionTwoData from "./HourlyConsumptionTwoData";

export const ShareIndexComponent = ({
  menu = "",
  apiHourly = "",
  apiDaily = "",
  apiMonthly = "",
  apiTable = "",
  isSingleData = false,
  isHourlyTwoData = false,
  isPanelAc = false,
  isChwp = false,
  isMotorPump = false,
  isPressFan = false,
  isPabx = false,
  isEksternal = false,
}) => {
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
            <Build style={{ fontSize: responsive.iconSize }} />
          </span>
          <span>{menu}</span>
        </div>
      </div>

      {isSingleData ? (
        <HourlyConsumptionSingleData
          apiUrl={apiHourly}
          menu={menu}
          isPanelAc={isPanelAc}
          isPabx={isPabx}
          apiTable={apiTable}
        />
      ) : isHourlyTwoData ? (
        <HourlyConsumptionTwoData
          apiUrl={apiHourly}
          isPressFan={isPressFan}
          menu={menu}
          isEksternal={isEksternal}
          apiTable={apiTable}
          isChwp={isChwp}
          isMotorPump={isMotorPump}
        />
      ) : (
        <HourlyConsumption
          apiUrl={apiHourly}
          menu={menu}
          isChwp={isChwp}
          isMotorPump={isMotorPump}
          apiTable={apiTable}
          isEksternal={isEksternal}
          isPressFan={isPressFan}
        />
      )}

      <div className="lg:flex gap-4 mt-4">
        <div className="lg:w-1/2 p-4 rounded-md 4k:rounded-xl bg-kartu mb-4 lg:mb-0">
          <DailyConsumption apiUrl={apiDaily} menu={menu} />
        </div>

        <div className="lg:w-1/2 p-4 rounded-md 4k:rounded-xl bg-kartu">
          <MonthlyConsumption apiUrl={apiMonthly} menu={menu} />
        </div>
      </div>
    </div>
  );
};

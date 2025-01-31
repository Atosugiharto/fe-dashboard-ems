import { CardSummary } from "./CardSummary";
import DailyEmission from "./DailyEmission";
import DailyKwhPln from "./DailyKwhPln";
import DailySolarPv from "./DailySolarPv";
import MonthlyEmission from "./MonthlyEmission";
import MonthlyKwhPln from "./MonthlyKwhPln";
import MonthlySolarPv from "./MonthlySolarPv";
import YearlyEmission from "./YearlyEmission";
import YearlyKwhPln from "./YearlyKwhPln";
import YearlySolarPv from "./YearlySolarPv";

export const DashboardManagement = () => {
  return (
    <div className="flex flex-col gap-4 text-gray-300">
      <div className="flex md:justify-center bg-black bg-opacity-50 shadow-lg rounded-lg border border-gray-300 p-4">
        <CardSummary />
      </div>

      <div className="md:flex md:flex-col bg-black bg-opacity-50 shadow-lg rounded-lg border border-gray-300">
        <div className="w-full">
          <DailyKwhPln />
        </div>

        <div className="w-full">
          <MonthlyKwhPln />
        </div>
        
        <div className="w-full">
          <YearlyKwhPln />
        </div>
      </div>

      <div className="md:flex md:flex-col bg-black bg-opacity-50 shadow-lg rounded-lg border border-gray-300">
        <div className="w-full">
          <DailySolarPv />
        </div>

        <div className="w-full">
          <MonthlySolarPv />
        </div>
        
        <div className="w-full">
          <YearlySolarPv />
        </div>
      </div>

      <div className="md:flex md:flex-col bg-black bg-opacity-50 shadow-lg rounded-lg border border-gray-300">
        <div className="w-full">
          <DailyEmission />
        </div>

        <div className="w-full">
          <MonthlyEmission />
        </div>
        
        <div className="w-full">
          <YearlyEmission />
        </div>
      </div>
    </div>
  );
};

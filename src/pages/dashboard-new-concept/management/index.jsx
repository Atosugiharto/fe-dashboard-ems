import CostTable from "./CostTable";
import DailyElectricity from "./DailyElectricity";
import EmissionReductionTable from "./EmissionReductionTable";
import GaugeEei from "./GaugeEei";
import MonthlyElectricity from "./MonthlyElectricity";
import PowerSupplyTable from "./PowerSupplyTable";
import YearlyElectricity from "./YearlyElectricity";

export const DashboardManagement = () => {
  return (
    <div className="4k:text-4xl">
      <div className="flex items-center justify-center mb-2">
        <h2 className="inline-block text-center p-2 rounded-sm bg-latar-huruf text-white font-bold text-lg 4k:text-4xl uppercase">
          Dashboard
        </h2>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="md:col-span-8 grid grid-cols-1 gap-2">
          <div className="p-4 rounded-md 4k:rounded-xl bg-kartu">
            <DailyElectricity />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="p-4 rounded-md 4k:rounded-xl bg-kartu">
              <MonthlyElectricity />
            </div>
            <div className="p-4 rounded-md 4k:rounded-xl bg-kartu">
              <YearlyElectricity />
            </div>
          </div>
        </div>

        <div className="md:col-span-4 grid grid-cols-1 gap-2">
          <div
            className="grid grid-cols-1 gap-2 4k:gap-10 p-4 rounded-md 4k:rounded-xl bg-kartu text-xs 4k:text-4xl"
            id="dashboard-table"
          >
            <div>
              <PowerSupplyTable />
            </div>
            <div>
              <CostTable />
            </div>
            <div>
              <EmissionReductionTable />
            </div>
          </div>

          <div className="p-4 rounded-md 4k:rounded-xl bg-kartu">
            <GaugeEei />
          </div>
        </div>
      </div> */}

      <div className="lg:flex w-full gap-2">
        <div className="flex flex-col gap-2 lg:w-2/3">
          <div className="p-4 rounded-md 4k:rounded-xl bg-kartu">
            <DailyElectricity />
          </div>
          <div className="lg:flex gap-2">
            <div className="p-4 rounded-md 4k:rounded-xl bg-kartu w-full lg:w-1/2 mb-2 lg:mb-0">
              <MonthlyElectricity />
            </div>
            <div className="p-4 rounded-md 4k:rounded-xl bg-kartu w-full lg:w-1/2 mb-2 lg:mb-0">
              <YearlyElectricity />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:w-1/3">
          <div
            className="flex flex-col gap-2 4k:gap-10 p-2 rounded-md 4k:rounded-xl bg-kartu text-xs 4k:text-4xl"
            id="dashboard-table"
          >
            <div>
              <PowerSupplyTable />
            </div>
            <div>
              <CostTable />
            </div>
            <div>
              <EmissionReductionTable />
            </div>
          </div>
          <div className="p-2 rounded-md 4k:rounded-xl bg-kartu">
            <GaugeEei />
          </div>
        </div>
      </div>
    </div>
  );
};

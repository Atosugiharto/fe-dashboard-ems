import CostTable from "./CostTable";
import DailyElectricity from "./DailyElectricity";
import EmissionReductionTable from "./EmissionReductionTable";
import GaugeEei from "./GaugeEei";
import MonthlyElectricity from "./MonthlyElectricity";
import PowerSupplyTable from "./PowerSupplyTable";
import YearlyElectricity from "./YearlyElectricity";

export const DashboardManagement = () => {
  return (
    <div>
      <div className="flex items-center justify-center my-2">
        <h2 className="inline-block text-center p-2 rounded-sm bg-latar-huruf text-white font-bold text-lg uppercase">
          Dashboard
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Bagian Kiri (Grafik Utama) */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Grafik Konsumsi Harian */}
          <div className="flex-1 p-4 rounded-md bg-kartu">
            <DailyElectricity />
          </div>

          {/* Bagian Grafik Konsumsi Bulanan dan Tahunan */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-4 rounded-md bg-kartu">
              <MonthlyElectricity />
            </div>
            <div className="flex-1 p-4 rounded-md bg-kartu">
              <YearlyElectricity />
            </div>
          </div>
        </div>

        {/* Bagian Kanan (Tabel & Gauge) */}
        <div className="flex flex-col gap-4 w-full md:w-1/3 text-xs">
          <div className="flex flex-col gap-4 p-4 rounded-md bg-kartu">
            <PowerSupplyTable />
            <CostTable />
            <EmissionReductionTable />
          </div>

          {/* Gauge EEI */}
          <div className="self-center w-full p-4 rounded-md bg-kartu">
            <GaugeEei />
          </div>
        </div>
      </div>
    </div>
  );
};

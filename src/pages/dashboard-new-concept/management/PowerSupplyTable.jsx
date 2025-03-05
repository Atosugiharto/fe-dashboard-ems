import { Power } from "@mui/icons-material";
import { formatNumberForDisplayDynamic } from "../../../share-components/Helper";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../../../share-components/api";

const PowerSupplyTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data dari tiga endpoint secara bersamaan
        const [todayRes, monthRes, yearRes] = await Promise.all([
          axios.get(`${baseApiUrl}/tableDashboardDailyPLN`),
          axios.get(`${baseApiUrl}/tableDashboardMonthlyPLN`),
          axios.get(`${baseApiUrl}/tableDashboardYearlyPLN`),
        ]);

        // Format data agar sesuai dengan struktur API terbaru
        const formattedData = [
          {
            label: "Today",
            plnPercentage: todayRes?.data?.data?.percentagePLN || 0,
            pln: todayRes?.data?.data?.totalPLNKWH || 0,
            nettoffPercentage: todayRes?.data?.data?.percentageNetOff || 0,
            nettoff: todayRes?.data?.data?.nettoff || 0,
            total: todayRes?.data?.data?.total || 0,
          },
          {
            label: "This Month",
            plnPercentage: monthRes?.data?.data?.percentagePLN || 0,
            pln: monthRes?.data?.data?.totalPLNKWH || 0,
            nettoffPercentage: monthRes?.data?.data?.percentageNetOff || 0,
            nettoff: monthRes?.data?.data?.nettoff || 0,
            total: monthRes?.data?.data?.total || 0,
          },
          {
            label: "This Year",
            plnPercentage: yearRes?.data?.data?.percentagePLN || 0,
            pln: yearRes?.data?.data?.totalPLNKWH || 0,
            nettoffPercentage: yearRes?.data?.data?.percentageNetOff || 0,
            nettoff: yearRes?.data?.data?.nettoff || 0,
            total: yearRes?.data?.data?.total || 0,
          },
        ];

        // Simpan data ke dalam state
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-white text-lg 4k:text-4xl font-semibold flex items-center mb-3">
        <span className="mr-2">
          <Power />
        </span>
        Power Consumption (kWh)
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-dashboard-table-abu-muda text-white">
            <th className="py-2 px-4 text-left"></th>
            <th className="py-2 px-4 text-dashboard-bar-kuning">Total</th>
            <th className="py-2 px-4 text-dashboard-text-table-oren">PLN</th>
            <th className="py-2 px-4 text-dashboard-gauge-hijau">
              <p>Net Off</p>
              <p className="text-[9px]">(Solar PV)</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-dashboard-table-abu-tua"
                  : "bg-dashboard-table-abu-muda"
              }
            >
              <td className="py-2 px-4 font-semibold text-white">
                {row?.label}
              </td>
              <td className="py-2 px-4 text-center text-dashboard-bar-kuning">
                {formatNumberForDisplayDynamic(row?.total)}
              </td>
              <td className="py-2 px-4 text-center text-dashboard-text-table-oren border-gray-700">
                <p>{formatNumberForDisplayDynamic(row?.pln)}</p>
                <p className="font-semibold">{`(${row?.plnPercentage}%)`}</p>
              </td>
              <td className="py-2 px-4 text-center text-dashboard-gauge-hijau">
                <p>{formatNumberForDisplayDynamic(row?.nettoff)}</p>
                <p className="font-semibold">{`(${row?.nettoffPercentage}%)`}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PowerSupplyTable;

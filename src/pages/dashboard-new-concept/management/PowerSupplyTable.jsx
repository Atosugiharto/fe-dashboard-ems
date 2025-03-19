import { Power } from "@mui/icons-material";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../../../share-components/api";
import { useRef } from "react";

const PowerSupplyTable = () => {
  const [data, setData] = useState([]);

  const [responsive, setResponsive] = useState({
    iconSize: 18,
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
          iconSize: 18,
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
  const intervalRef = useRef(null);
  useEffect(() => {
    fetchData();

    const delay = fetchTimeApi();

    const timeoutId = setTimeout(() => {
      fetchData();
      intervalRef.current = setInterval(fetchData, 60 * 60 * 1000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <h2 className="text-white text-[10px] 4k:text-4xl font-semibold flex items-center mb-1">
        <span className="mr-2">
          <Power style={{ fontSize: responsive.iconSize }} />
        </span>
        Power Consumption (kWh)
      </h2>
      <table className="w-full border-collapse text-[9px] 4k:text-3xl font-medium">
        <thead>
          <tr className="bg-dashboard-table-abu-muda text-white">
            <th className="py-0.5 px-2 text-left"></th>
            <th className="py-0.5 px-2 text-dashboard-bar-kuning">Total</th>
            <th className="py-0.5 px-2 text-dashboard-text-table-oren">PLN</th>
            <th className="py-0.5 px-2 text-dashboard-gauge-hijau">
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
              <td className="py-0.5 px-2 font-semibold text-white">
                {row?.label}
              </td>
              <td className="py-0.5 px-2 text-center text-dashboard-bar-kuning">
                {formatNumberForDisplayDynamic(row?.total)}
              </td>
              <td className="py-0.5 px-2 text-center text-dashboard-text-table-oren border-gray-700">
                <p>{formatNumberForDisplayDynamic(row?.pln)}</p>
                <p className="font-semibold">{`(${row?.plnPercentage}%)`}</p>
              </td>
              <td className="py-0.5 px-2 text-center text-dashboard-gauge-hijau">
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

import { Cloud } from "@mui/icons-material";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../../../share-components/api";
import { useRef } from "react";

const EmissionReductionTable = () => {
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
      const [todayRes, monthRes, yearRes] = await Promise.all([
        axios.get(`${baseApiUrl}/tableDashboardDailyEmisi`),
        axios.get(`${baseApiUrl}/tableDashboardMonthlyEmisi`),
        axios.get(`${baseApiUrl}/tableDashboardYearlyEmisi`),
      ]);

      const formattedData = [
        {
          label: "Today",
          remaining: todayRes?.data?.data?.remaining || 0,
          nettoff: todayRes?.data?.data?.netOff || 0,
          nettoffPercentage: todayRes?.data?.data?.percentageNettoff || 0,
          total: todayRes?.data?.data?.total || 0,
        },
        {
          label: "This Month",
          remaining: monthRes?.data?.data?.remaining || 0,
          nettoff: monthRes?.data?.data?.netOff || 0,
          nettoffPercentage: monthRes?.data?.data?.percentageNettoff || 0,
          total: monthRes?.data?.data?.total || 0,
        },
        {
          label: "This Year",
          remaining: yearRes?.data?.data?.remaining || 0,
          nettoff: yearRes?.data?.data?.netOff || 0,
          nettoffPercentage: yearRes?.data?.data?.percentageNettoff || 0,
          total: yearRes?.data?.data?.total || 0,
        },
      ];

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
          <Cloud style={{ fontSize: responsive.iconSize }} />
        </span>{" "}
        Emission Reduction (Ton CO2e)
      </h2>
      <table className="w-full border-collapse text-[9px] 4k:text-3xl font-medium">
        <thead>
          <tr className="bg-dashboard-table-abu-muda text-white">
            <th className="py-0.5 px-2 text-left"></th>
            <th className="py-0.5 px-2 text-dashboard-bar-kuning">Total</th>
            <th className="py-0.5 px-2 text-dashboard-gauge-hijau">
              <p>Net Off</p>
              <p className="text-[9px]">(Solar PV + REC)</p>
            </th>
            <th className="py-0.5 px-2 text-dashboard-text-table-biru">
              Remaining
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
              <td className="py-0.5 px-2 text-center text-dashboard-gauge-hijau border-gray-700">
                <p>{formatNumberForDisplayDynamic(row?.nettoff)}</p>
                <p className="font-semibold">{`(${row?.nettoffPercentage}%)`}</p>
              </td>
              <td className="py-0.5 px-2 text-center text-dashboard-text-table-biru">
                <p>{formatNumberForDisplayDynamic(row?.remaining)}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmissionReductionTable;

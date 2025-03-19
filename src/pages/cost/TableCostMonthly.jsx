/* eslint-disable react/prop-types */
import { Circle, Close } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { baseApiUrl } from "../../share-components/api";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../share-components/Helper";
import { useRef } from "react";

const TableCostMonthly = ({ filterDate }) => {
  const [data, setData] = useState(null);
  const [responsive, setResponsive] = useState({
    iconSize: 25,
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
          iconSize: 25,
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
      const response = await axios.post(`${baseApiUrl}/tableMonthlyCost`, {
        fiscalReq: filterDate,
      });
      const result = response?.data?.data;

      if (result) {
        const formattedData = [
          {
            label: "Total Energy",
            planning:
              formatNumberForDisplayDynamic(result?.totalEnergy?.planCost) || 0,
            actual:
              formatNumberForDisplayDynamic(
                result?.totalEnergy?.totalCostAct
              ) || 0,
            eval: result?.totalEnergy?.evalValue,
          },
          {
            label: " • PLN",
            planning: `${
              formatNumberForDisplayDynamic(result?.detil?.planPLN) || 0
            } (${result?.detil?.percentagePlanPLN || 0}%)`,
            actual: `${
              formatNumberForDisplayDynamic(result?.detil?.actPLN) || 0
            } (${result?.detil?.percentageActPLN || 0}%)`,
            eval: result?.detil?.evalValuePLN,
          },
          {
            label: " • Solar PV Net Off",
            planning: `${
              formatNumberForDisplayDynamic(result?.detil?.planSolarPV) || 0
            } (${result?.detil?.percentagePlanSolarPV || 0}%)`,
            actual: `${
              formatNumberForDisplayDynamic(result?.detil?.actSolarPV) || 0
            } (${result?.detil?.percentageActSolarPV || 0}%)`,
            eval: result?.detil?.evalValueSolarPV,
          },
          {
            label: "NetZero Emission Net Off",
            planning: "",
            actual: "",
            eval: null,
          },
          {
            label: " • REC",
            planning: `${
              formatNumberForDisplayDynamic(result?.detil?.planREC) || 0
            } (${result?.detil?.percentagePlanREC || 0}%)`,
            actual: `${
              formatNumberForDisplayDynamic(result?.detil?.planREC) || 0
            } (${result?.detil?.percentageActREC || 0}%)`,
            eval: result?.detil?.evalValueRECexp,
          },
        ];

        setData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
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
  }, [filterDate]);

  return (
    <div className="w-full mx-auto text-white font-semibold">
      <table className="w-full border-collapse text-sm 4k:text-4xl">
        <thead>
          <tr className="bg-dashboard-table-abu-muda">
            <th className="py-3 px-4 4k:py-6 4k:px-8 text-left">
              Energy Source
            </th>
            <th className="py-3 px-4 4k:py-6 4k:px-8 text-center">
              Actual Cost This Month
            </th>
            <th className="py-3 px-4 4k:py-6 4k:px-8 text-center">
              Planning Cost This Month
            </th>
            <th className="py-3 px-4 4k:py-6 4k:px-8 text-center">EVAL</th>
          </tr>
        </thead>
        <tbody>
          {data && data?.length > 0 ? (
            data?.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index === 0
                    ? "bg-dashboard-table-abu-tua"
                    : index === 1
                    ? "bg-dashboard-table-abu-tua text-bar-biru-cost"
                    : index === 2
                    ? "bg-dashboard-table-abu-tua text-bar-kuning-cost"
                    : index === 3
                    ? "bg-dashboard-table-abu-muda text-white"
                    : index === data?.length - 1
                    ? "bg-dashboard-table-abu-tua text-cost-text-hijau"
                    : "bg-dashboard-table-abu-muda"
                }`}
              >
                <td className="py-3 px-4 4k:py-6 4k:px-8 font-semibold">
                  {row?.label}
                </td>
                <td className="py-3 px-4 4k:py-6 4k:px-8 text-center">
                  {index === 3 ? "" : `Rp. ${row?.planning}`}
                </td>
                <td className="py-3 px-4 4k:py-6 4k:px-8 text-center">
                  {index === 3 ? "" : `Rp. ${row?.actual}`}
                </td>
                <td className="py-3 px-4 4k:py-6 4k:px-8 text-center">
                  {row?.eval === 0 ? (
                    <Circle
                      className="text-dashboard-gauge-hijau inline"
                      style={{ fontSize: responsive.iconSize }}
                    />
                  ) : row?.eval === 1 ? (
                    <Close
                      className="text-dashboard-bar-merah inline"
                      style={{ fontSize: responsive.iconSize }}
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-400">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableCostMonthly;

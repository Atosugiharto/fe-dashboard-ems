import { Paid } from "@mui/icons-material";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../../../share-components/api";
import { useRef } from "react";

const CostTable = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const [todayRes, monthRes, yearRes] = await Promise.all([
        axios.get(`${baseApiUrl}/tableDashboardDailyCost`),
        axios.get(`${baseApiUrl}/tableDashboardMonthlyCost`),
        axios.get(`${baseApiUrl}/tableDashboardYearlyCost`),
      ]);

      const formattedData = [
        {
          label: "Today",
          pln: todayRes?.data?.data?.totalPLNCost || 0,
          nettoff: todayRes?.data?.data?.totalNetOffCost || 0,
          total: todayRes?.data?.data?.total || 0,
        },
        {
          label: "This Month",
          pln: monthRes?.data?.data?.totalPLNCost || 0,
          nettoff: monthRes?.data?.data?.totalNetOffCost || 0,
          total: monthRes?.data?.data?.total || 0,
        },
        {
          label: "This Year",
          pln: yearRes?.data?.data?.totalPLNCost || 0,
          nettoff: yearRes?.data?.data?.totalNetOffCost || 0,
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
      <h2 className="text-white text-lg 4k:text-4xl font-semibold flex items-center mb-3">
        <span className="mr-2">
          <Paid />
        </span>
        Cost (in Mio IDR)
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
                Rp.{formatNumberForDisplayDynamic(row?.total)}
              </td>
              <td className="py-2 px-4 text-center text-dashboard-text-table-oren border-gray-700">
                <p>Rp.{formatNumberForDisplayDynamic(row?.pln)}</p>
              </td>
              <td className="py-2 px-4 text-center text-dashboard-gauge-hijau">
                <p>Rp.{formatNumberForDisplayDynamic(row?.nettoff)}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostTable;

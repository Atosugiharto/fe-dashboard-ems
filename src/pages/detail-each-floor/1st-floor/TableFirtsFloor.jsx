/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
import dayjs from "dayjs";
import { baseApiUrl } from "../../../share-components/api";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
  fetchTimeApi,
  filterText,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";

const TableFirtsFloor = ({
  apiUrl = "",
  selectedDate = dayjs().format("YYYY-MM-DD"),
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseApiUrl}/${apiUrl}`, {
        date: selectedDate,
      });

      if (response?.data?.data?.length > 0) {
        const firstData = response.data.data[0] || {};
        const mergedData = new Map(); // Untuk menggabungkan data berdasarkan namapanel

        // Proses data YOS
        firstData?.YOS?.detilPanel?.forEach((item) => {
          if (!mergedData.has(item.namapanel)) {
            mergedData.set(item.namapanel, {
              equipment: item.namapanel,
              kwh1: item.kW ?? 0,
              cost1: item.cost ?? 0,
              emission1: item.emisi ?? 0,
              kwh2: 0, // Default kosong untuk PODO
              cost2: 0,
              emission2: 0,
            });
          } else {
            mergedData.get(item.namapanel).kwh1 = item.kW ?? 0;
            mergedData.get(item.namapanel).cost1 = item.cost ?? 0;
            mergedData.get(item.namapanel).emission1 = item.emisi ?? 0;
          }
        });

        // Proses data PODO
        firstData?.PODO?.detilPanel?.forEach((item) => {
          if (!mergedData.has(item.namapanel)) {
            mergedData.set(item.namapanel, {
              equipment: item.namapanel,
              kwh1: 0, // Default kosong untuk YOS
              cost1: 0,
              emission1: 0,
              kwh2: item.kW ?? 0,
              cost2: item.cost ?? 0,
              emission2: item.emisi ?? 0,
            });
          } else {
            mergedData.get(item.namapanel).kwh2 = item.kW ?? 0;
            mergedData.get(item.namapanel).cost2 = item.cost ?? 0;
            mergedData.get(item.namapanel).emission2 = item.emisi ?? 0;
          }
        });

        // Ubah hasil Map ke dalam array
        setData(Array.from(mergedData.values()));
      } else {
        setData([]); // Jika tidak ada data, set array kosong
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); // Set array kosong jika terjadi error
    } finally {
      setLoading(false);
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
  }, [selectedDate]);

  return (
    <div className="text-white text-sm 4k:text-3xl lg:max-w-screen-lg 4k:max-w-screen-4k overflow-x-auto max-h-[250px] 4k:max-h-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-dashboard-table-abu">
            <th rowSpan="2" className="p-2 text-left">
              Equipment
            </th>
            <th colSpan="3" className="p-2 border-r border-white">
              Yos Sudarso Side
            </th>
            <th colSpan="3" className="p-2">
              Podomoro Side
            </th>
          </tr>
          <tr className="bg-dashboard-table-abu">
            <th className="p-2">kWh</th>
            <th className="p-2">Cost</th>
            <th className="p-2 border-r border-white">Emission (TonCO2e)</th>
            <th className="p-2">kWh</th>
            <th className="p-2">Cost</th>
            <th className="p-2">Emission (TonCO2e)</th>
          </tr>
        </thead>
        <tbody className="max-h-[200px] overflow-y-auto 4k:max-h-full">
          {loading ? (
            <tr>
              <td colSpan="7" className="p-4 text-center">
                Loading data...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-4 text-center">
                No Data Found
              </td>
            </tr>
          ) : (
            data?.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-dashboard-table-abu"
                    : "bg-dashboard-table-abu-tua"
                } text-center`}
              >
                <td className="p-2 text-left">{filterText(row?.equipment)}</td>
                <td className="p-2">
                  {formatNumberForDisplayDynamic(row?.kwh1)}
                </td>
                <td className="p-2">
                  {formatNumberForDisplayDynamic(row?.cost1)}
                </td>
                <td className="p-2 border-r border-white">
                  {formatNumberForDisplayDynamic(row?.emission1)}
                </td>
                <td className="p-2">
                  {formatNumberForDisplayDynamic(row?.kwh2)}
                </td>
                <td className="p-2">
                  {formatNumberForDisplayDynamic(row?.cost2)}
                </td>
                <td className="p-2">
                  {formatNumberForDisplayDynamic(row?.emission2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableFirtsFloor;

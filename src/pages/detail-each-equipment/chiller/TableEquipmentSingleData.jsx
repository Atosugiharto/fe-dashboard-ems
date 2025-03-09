/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";
import axios from "axios";
import { baseApiUrl } from "../../../share-components/api";
import moment from "moment";
import { useRef } from "react";

const TableEquipmentSingleData = ({
  selectedDate = moment().format("YYYY-MM-DD"),
  apiUrl = "",
  isPanelAC = false,
  isPabx = false,
}) => {
  const [datas, setDatas] = useState([]);
  const [responsive, setResponsive] = useState({
    iconSize: 25,
  });

  // Handle Responsiveness
  useEffect(() => {
    const updateResponsiveSettings = () => {
      setResponsive({
        iconSize: window.innerWidth >= 3840 ? 60 : 25,
      });
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  // State untuk menyimpan data API
  const [chiller1Data, setChiller1Data] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/${apiUrl}`, {
        date: selectedDate,
      });

      const apiData = response?.data?.data;

      if (apiData) {
        // Data untuk Panel P-Chiller 1
        const chiller1 = {
          avgV: isPabx
            ? apiData["P-Electronic"]?.avgV
            : isPanelAC
            ? apiData["Panel P-AC Server LT 5"]?.avgV
            : apiData?.avgV || 0,
          avgI: isPabx
            ? apiData["P-Electronic"]?.avgI
            : isPanelAC
            ? apiData["Panel P-AC Server LT 5"]?.avgI
            : apiData?.avgI || 0,
          totalKWh: isPabx
            ? apiData["P-Electronic"]?.totalKWh
            : isPanelAC
            ? apiData["Panel P-AC Server LT 5"]?.totalKWh
            : apiData?.totalKWh || 0,
        };

        setChiller1Data(chiller1);
      }
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
  }, [selectedDate]);

  // Menyiapkan data untuk tabel
  useEffect(() => {
    const formattedData = [
      {
        label: "Voltage (Volt)",
        chiller1: formatNumberForDisplayDynamic(chiller1Data.avgV),
      },
      {
        label: "Current (A)",
        chiller1: formatNumberForDisplayDynamic(chiller1Data.avgI),
      },
      {
        label: "Kilowatt-hour (kWh)",
        chiller1: formatNumberForDisplayDynamic(chiller1Data.totalKWh),
      },
    ];

    setDatas(formattedData);
  }, [chiller1Data]);

  return (
    <div className="w-full mx-auto text-white font-semibold rounded-lg text-sm 4k:text-4xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-latar-header-table-input-setting">
            <th className="py-3 px-4 text-left"> </th>
            <th className="py-3 px-4 text-center">Value</th>
          </tr>
        </thead>
        <tbody>
          {datas?.map((row, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-dashboard-table-abu-tua"
                  : "bg-dashboard-table-abu"
              }
            >
              <td className="py-6 px-4 font-semibold">{row?.label}</td>
              <td className="py-6 px-4 text-center">{row?.chiller1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableEquipmentSingleData;

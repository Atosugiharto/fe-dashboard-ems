/* eslint-disable react-hooks/exhaustive-deps */
import { EventNote } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import TotalAllEquipments from "./TotalAllEquipments";
import EachEquipmentChart from "./EachEquipmentChart";
import TableAllEquipments from "./TableAllEquipments";
import TableEachEquipment from "./TableEachEquipment";
import axios from "axios";
import { baseApiUrl } from "../../share-components/api";
import moment from "moment";
import { useRef } from "react";
import { fetchTimeApi } from "../../share-components/Helper";
import useFiscalYear from "../../share-components/useFiscalYear";

export const SummaryAllEquipments = () => {
  const { tglStart, tglEnd } = useFiscalYear();
  const today = moment().format("YYYY-MM-DD");
  const [dateStart, setDateStart] = useState(today);
  const [dateEnd, setDateEnd] = useState(today);
  const [error, setError] = useState("");
  const [responsive, setResponsive] = useState({
    iconSize: 25,
  });

  const [dataEachEquipment, setDataEachEquipment] = useState(null);
  const [dataTotalEquipment, setDataTotalEquipment] = useState(null);

  const fetchDataEachEquipment = async () => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/tabelRankConsumeEachEquipment`,
        {
          dateStart,
          dateEnd,
        }
      );

      if (response) {
        const result = response?.data?.data;
        setDataEachEquipment(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTotalEquipment = async () => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/tabelConsumeTotalEquipment`,
        {
          dateStart,
          dateEnd,
        }
      );

      if (response) {
        const result = response?.data?.data;
        setDataTotalEquipment(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const intervalRef = useRef(null);

  useEffect(() => {
    if (new Date(dateStart) > new Date(dateEnd)) {
      setError("Start date cannot be later than end date!");
      return;
    }
    setError("");
    fetchDataEachEquipment();
    fetchDataTotalEquipment();

    const delay = fetchTimeApi(); // Hitung delay ke jam XX:01 berikutnya

    const timeoutId = setTimeout(() => {
      fetchDataEachEquipment();
      fetchDataTotalEquipment();

      intervalRef.current = setInterval(() => {
        fetchDataEachEquipment();
        fetchDataTotalEquipment();
      }, 60 * 60 * 1000); // Setiap 1 jam
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dateStart, dateEnd]);

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
  return (
    <div className="4k:text-4xl">
      <div className="flex items-center justify-center my-2">
        <div className="inline-block items-center text-center p-2 rounded-sm bg-latar-huruf text-white font-bold text-lg 4k:text-4xl uppercase">
          <span className="mr-2">
            <EventNote style={{ fontSize: responsive.iconSize }} />
          </span>
          <span>SUMMARY ALL ELECTRICAL EQUIPMENT</span>
        </div>
      </div>

      <div className="bg-kartu p-3 flex items-center justify-center gap-4 rounded-md 4k:rounded-xl text-white font-medium text-xs 4k:text-2xl">
        <div className="flex items-center gap-2">
          <label htmlFor="startDate">Start Date</label>
          <input
            className="bg-latar-select rounded-md p-1"
            type="date"
            id="startDate"
            value={dateStart}
            min={tglStart}
            max={tglEnd}
            onChange={(e) => setDateStart(e.target.value)}
            style={{ WebkitAppearance: "none", colorScheme: "dark" }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="endDate">End Date</label>
          <input
            className="bg-latar-select rounded-md p-1"
            type="date"
            id="endDate"
            value={dateEnd}
            min={tglStart}
            max={tglEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            style={{ WebkitAppearance: "none", colorScheme: "dark" }}
          />
        </div>
      </div>
      {error && (
        <p className="text-merah bg-red-100 p-1 rounded-md border border-merah text-sm text-center mt-2">
          {error}
        </p>
      )}

      <div className="w-full lg:flex gap-4 my-4">
        <div className="lg:w-1/3 p-4 rounded-md 4k:rounded-xl bg-kartu mb-4 lg:mb-0">
          <TotalAllEquipments
            data={dataTotalEquipment}
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
        </div>
        <div className="lg:w-2/3 p-4 rounded-md 4k:rounded-xl bg-kartu">
          <EachEquipmentChart
            data={dataEachEquipment}
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
        </div>
      </div>

      <div className="w-full lg:flex gap-4">
        <div className="lg:w-1/3 mb-4 lg:mb-0">
          <TableAllEquipments data={dataTotalEquipment} />
        </div>
        <div className="lg:w-2/3">
          <TableEachEquipment data={dataEachEquipment} />
        </div>
      </div>
    </div>
  );
};

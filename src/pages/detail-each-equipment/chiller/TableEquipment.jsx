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

const TableEquipment = ({
  selectedDate = moment().format("YYYY-MM-DD"),
  apiUrl = "",
  isChwp = false,
  menu = "Chiller",
  isMotorPump = false,
  isPressFan = false,
  isEksternal = false,
}) => {
  const [datas, setDatas] = useState([]);
  const [responsive, setResponsive] = useState({
    iconSize: 25,
  });
  const labelMotorPump = ["Transfer Pump", "STP", "Hydrant"];
  const labelPressFan = ["PP-PF", "LP-Press Fan"];
  const labelEksternal = ["Carpool", "Koperasi"];

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
  const [chiller2Data, setChiller2Data] = useState({});
  const [chiller3Data, setChiller3Data] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/${apiUrl}`, {
        date: selectedDate,
      });

      const apiData = response?.data?.data;

      if (apiData) {
        // Data untuk Panel P-Chiller 1
        const chiller1 = {
          avgV: apiData["Panel P-Chiller 1"]?.avgV || 0,
          avgI: apiData["Panel P-Chiller 1"]?.avgI || 0,
          totalKWh: apiData["Panel P-Chiller 1"]?.totalKWh || 0,
        };

        const sharedChillerData = {
          avgV: apiData["Panel P-Chiller 2,3"]?.avgV || 0,
          avgI: apiData["Panel P-Chiller 2,3"]?.avgI || 0,
          totalKWh: apiData["Panel P-Chiller 2,3"]?.totalKWh || 0,
        };

        const chwp1 = {
          avgV: apiData["Panel P-CHWP 1"]?.avgV || 0,
          avgI: apiData["Panel P-CHWP 1"]?.avgI || 0,
          totalKWh: apiData["Panel P-CHWP 1"]?.totalKWh || 0,
        };
        const chwp2 = {
          avgV: apiData["Panel P-CHWP 2"]?.avgV || 0,
          avgI: apiData["Panel P-CHWP 2"]?.avgI || 0,
          totalKWh: apiData["Panel P-CHWP 2"]?.totalKWh || 0,
        };
        const chwp3 = {
          avgV: apiData["Panel P-CHWP 3"]?.avgV || 0,
          avgI: apiData["Panel P-CHWP 3"]?.avgI || 0,
          totalKWh: apiData["Panel P-CHWP 3"]?.totalKWh || 0,
        };

        const motorPump1 = {
          avgV: apiData["Panel P-Transfer Pump"]?.avgV || 0,
          avgI: apiData["Panel P-Transfer Pump"]?.avgI || 0,
          totalKWh: apiData["Panel P-Transfer Pump"]?.totalKWh || 0,
        };
        const motorPump2 = {
          avgV: apiData["Panel P-STP"]?.avgV || 0,
          avgI: apiData["Panel P-STP"]?.avgI || 0,
          totalKWh: apiData["Panel P-STP"]?.totalKWh || 0,
        };
        const motorPump3 = {
          avgV: apiData["Panel P-Hydrant"]?.avgV || 0,
          avgI: apiData["Panel P-Hydrant"]?.avgI || 0,
          totalKWh: apiData["Panel P-Hydrant"]?.totalKWh || 0,
        };

        const pressFan1 = {
          avgV: apiData["Panel PP-PF"]?.avgV || 0,
          avgI: apiData["Panel PP-PF"]?.avgI || 0,
          totalKWh: apiData["Panel PP-PF"]?.totalKWh || 0,
        };
        const pressFan2 = {
          avgV: apiData["Panel LP-Press Fan"]?.avgV || 0,
          avgI: apiData["Panel LP-Press Fan"]?.avgI || 0,
          totalKWh: apiData["Panel LP-Press Fan"]?.totalKWh || 0,
        };

        const eksternal1 = {
          avgV: apiData["Panel P-Carpool"]?.avgV || 0,
          avgI: apiData["Panel P-Carpool"]?.avgI || 0,
          totalKWh: apiData["Panel P-Carpool"]?.totalKWh || 0,
        };
        const eksternal2 = {
          avgV: apiData["Panel P-Koperasi"]?.avgV || 0,
          avgI: apiData["Panel P-Koperasi"]?.avgI || 0,
          totalKWh: apiData["Panel P-Koperasi"]?.totalKWh || 0,
        };

        setChiller1Data(
          isEksternal
            ? eksternal1
            : isPressFan
            ? pressFan1
            : isMotorPump
            ? motorPump1
            : isChwp
            ? chwp1
            : chiller1
        );
        setChiller2Data(
          isEksternal
            ? eksternal2
            : isPressFan
            ? pressFan2
            : isMotorPump
            ? motorPump2
            : isChwp
            ? chwp2
            : sharedChillerData
        );
        setChiller3Data(
          isMotorPump ? motorPump3 : isChwp ? chwp3 : sharedChillerData
        );
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
        chiller2: formatNumberForDisplayDynamic(chiller2Data.avgV),
        chiller3: formatNumberForDisplayDynamic(chiller3Data.avgV),
      },
      {
        label: "Current (A)",
        chiller1: formatNumberForDisplayDynamic(chiller1Data.avgI),
        chiller2: formatNumberForDisplayDynamic(chiller2Data.avgI),
        chiller3: formatNumberForDisplayDynamic(chiller3Data.avgI),
      },
      {
        label: "Kilowatt-hour (kWh)",
        chiller1: formatNumberForDisplayDynamic(chiller1Data.totalKWh),
        chiller2: formatNumberForDisplayDynamic(chiller2Data.totalKWh),
        chiller3: formatNumberForDisplayDynamic(chiller3Data.totalKWh),
      },
    ];

    setDatas(formattedData);
  }, [chiller1Data, chiller2Data, chiller3Data]);

  return (
    <div className="w-full mx-auto text-white font-semibold rounded-lg text-sm 4k:text-4xl lg:max-w-screen-lg 4k:max-w-screen-4k overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-latar-header-table-input-setting">
            <th className="py-3 px-4 text-left"> </th>
            <th className="py-3 px-4 text-center">
              {isEksternal
                ? labelEksternal[0]
                : isPressFan
                ? labelPressFan[0]
                : isMotorPump
                ? labelMotorPump[0]
                : menu
                ? `${menu} 1`
                : "Value"}
            </th>
            <th className="py-3 px-4 text-center">
              {isEksternal
                ? labelEksternal[1]
                : isPressFan
                ? labelPressFan[1]
                : isMotorPump
                ? labelMotorPump[1]
                : menu
                ? `${menu} 2`
                : "Value"}
            </th>
            {!isPressFan && !isEksternal && (
              <th className="py-3 px-4 text-center">
                {isMotorPump ? labelMotorPump[2] : menu ? `${menu} 3` : "Value"}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {datas.map((row, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-dashboard-table-abu-tua"
                  : "bg-dashboard-table-abu"
              }
            >
              <td className="py-6 px-4 font-semibold">{row.label}</td>
              <td className="py-6 px-4 text-center">{row.chiller1}</td>
              <td className="py-6 px-4 text-center">{row.chiller2}</td>
              {!isPressFan && !isEksternal && (
                <td className="py-6 px-4 text-center">{row.chiller3}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableEquipment;

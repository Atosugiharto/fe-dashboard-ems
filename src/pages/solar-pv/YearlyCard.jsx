import { Cloud, Paid, Power } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { baseApiUrl } from "../../share-components/api";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../share-components/Helper";
import { useRef } from "react";

export const YearlyCard = () => {
  const [responsive, setResponsive] = useState({ iconSize: 25 });
  const [supply, setSupply] = useState(0);
  const [cost, setCost] = useState(0);
  const [emission, setEmission] = useState(0);

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        setResponsive({ iconSize: 60 });
      } else {
        setResponsive({ iconSize: 25 });
      }
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  const fetchDataSupply = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableSolarPVYearly`);

      if (response?.data) {
        const data = response?.data?.data;
        setSupply(data?.totalPVKWH);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataCost = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableSolarPVYearlyCost`);

      if (response?.data) {
        const data = response?.data?.data;
        setCost(data?.totalPVIncome);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataEmission = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableSolarPVYearlyEmisi`);

      if (response?.data) {
        const data = response?.data?.data;
        setEmission(data?.emisiPV);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const intervalRef = useRef(null);

  useEffect(() => {
    fetchDataSupply();
    fetchDataCost();
    fetchDataEmission();

    const delay = fetchTimeApi(); // Hitung delay ke jam XX:01 berikutnya

    const timeoutId = setTimeout(() => {
      fetchDataSupply();
      fetchDataCost();
      fetchDataEmission();

      intervalRef.current = setInterval(() => {
        fetchDataSupply();
        fetchDataCost();
        fetchDataEmission();
      }, 60 * 60 * 1000); // Setiap 1 jam
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div className="flex flex-col gap-4 4k:gap-8 text-sm 4k:text-4xl font-bold">
      <div className="px-3 py-4 4k:px-6 4k:py-8 bg-outlet rounded-md 4k:rounded-xl">
        <div className="flex items-center justify-start gap-1 text-white">
          <Power style={{ fontSize: responsive.iconSize }} />
          <p>Solar PV Supply This Year</p>
        </div>
        <div className="flex items-center justify-end text-white">
          <div className="flex items-center gap-2">
            <span className="text-dashboard-gauge-hijau text-2xl 4k:text-6xl">
              {formatNumberForDisplayDynamic(supply)}
            </span>
            <span>Kwh</span>
          </div>
        </div>
      </div>

      <div className="px-3 py-4 4k:px-6 4k:py-8 bg-outlet rounded-md 4k:rounded-xl">
        <div className="flex items-center justify-start gap-1 text-white">
          <Paid style={{ fontSize: responsive.iconSize }} />
          <p>Solar PV Cost This Year</p>
        </div>
        <div className="flex items-center justify-end text-white">
          <div className="flex items-center gap-2">
            <span>Rp</span>
            <span className="text-dashboard-gauge-hijau text-2xl 4k:text-6xl">
              {formatNumberForDisplayDynamic(cost)}
            </span>
          </div>
        </div>
      </div>

      <div className="px-3 py-4 4k:px-6 4k:py-8 bg-outlet rounded-md 4k:rounded-xl">
        <div className="flex items-center justify-start gap-1 text-white">
          <Cloud style={{ fontSize: responsive.iconSize }} />
          <p>Solar PV Emission This Year</p>
        </div>
        <div className="flex items-center justify-end text-white">
          <div className="flex items-center gap-2">
            <span className="text-dashboard-gauge-hijau text-2xl 4k:text-6xl">
              {formatNumberForDisplayDynamic(emission)}
            </span>
            <span>Ton CO2e</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Cloud, Paid, Power } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { baseApiUrl } from "../../share-components/api";
import axios from "axios";
import { formatNumberForDisplayDynamic } from "../../share-components/Helper";

export const MonthlyCard = () => {
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
      const response = await axios.get(`${baseApiUrl}/tableSolarPVMonthly`);

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
      const response = await axios.get(`${baseApiUrl}/tableSolarPVMonthlyCost`);

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
      const response = await axios.get(`${baseApiUrl}/tableSolarPVMonthlyEmisi`);

      if (response?.data) {
        const data = response?.data?.data;
        setEmission(data?.emisiPV);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data saat pertama kali render dan saat selectedYear berubah
  useEffect(() => {
    fetchDataSupply();
    fetchDataCost();
    fetchDataEmission();
  }, []);
  return (
    <div className="flex flex-col gap-4 4k:gap-8 text-sm 4k:text-4xl font-bold">
      <div className="px-3 py-4 4k:px-6 4k:py-8 bg-outlet rounded-md 4k:rounded-xl">
        <div className="flex items-center justify-start gap-1 text-white">
          <Power style={{ fontSize: responsive.iconSize }} />
          <p>Solar PV Supply This Month</p>
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
          <p>Solar PV Cost This Month</p>
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
          <p>Solar PV Emission This Month</p>
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

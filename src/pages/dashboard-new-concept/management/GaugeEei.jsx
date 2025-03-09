import { useState, useEffect } from "react";
import axios from "axios";
import { EmojiObjectsOutlined } from "@mui/icons-material";
import GaugeComponent from "react-gauge-component";
import { baseApiUrl } from "../../../share-components/api";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";
import { useRef } from "react";
// import { formatNumberForDisplayDynamic } from "../../../share-components/Helper";

const GaugeEei = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [midValue, setMidValue] = useState(250); // Mid limit
  const [maxValue, setMaxValue] = useState(500);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/gaugesDashboardEEI`);
      const data = response?.data?.data;

      if (data) {
        setCurrentValue(data?.EEI ?? 0);
        setMinValue(data?.limitStart ?? 0);
        setMidValue(data?.limitAtas ?? (minValue + maxValue) / 2);
        setMaxValue(data?.limitMaks ?? 500);
      }
    } catch (error) {
      console.error("Error fetching EEI data:", error);
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
    <div className="rounded-lg relative">
      {/* Title */}
      <p className="text-white text-lg 4k:text-4xl font-semibold flex items-center">
        <EmojiObjectsOutlined className="mr-2" />
        EEI (Energy Efficiency Index) kWh/m²/Year
      </p>
      <p className="text-white text-sm 4k:text-4xl italic pl-8">{`Standard GBCI < 300 kWh/m²/year`}</p>

      {/* Angka di atas chart */}
      <div className="flex justify-between text-white text-lg 4k:text-4xl font-semibold mt-2">
        <span>{formatNumberForDisplayDynamic(minValue)}</span>
        <span className="text-merah">
          {formatNumberForDisplayDynamic(midValue)}
        </span>
        <span>{formatNumberForDisplayDynamic(maxValue)}</span>
      </div>

      {/* Container Gauge */}
      <div className="flex justify-center">
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0,
            cornerRadius: 0,
            gradient: false,
            subArcs: [
              { limit: currentValue, color: "#03cd1e" },
              { limit: midValue - 2, color: "#444645" },
              { limit: midValue, color: "red" },
              { limit: maxValue, color: "#444645" },
            ],
          }}
          value={currentValue}
          minValue={minValue}
          maxValue={maxValue}
          pointer={{
            color: "red",
            length: 0.75,
            width: 0,
          }}
          labels={{
            valueLabel: {
              formatTextValue: () => `${currentValue.toFixed(1)}`,
              style: { fontSize: 32, fontWeight: "bold", fill: "#03cd1e" },
            },
            // tickLabels: {
            //   type: "outer",
            //   ticks: [minValue, maxValue],
            //   style: { fontSize: 20, fontWeight: "bold", fill: "white" }, // Ubah ukuran angka skala
            // },
          }}
        />
      </div>
    </div>
  );
};

export default GaugeEei;

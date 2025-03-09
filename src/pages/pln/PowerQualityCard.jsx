import axios from "axios";
import { useEffect, useState } from "react";
import { baseApiUrl } from "../../share-components/api";
import dayjs from "dayjs";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../share-components/Helper";
import { useRef } from "react";

const PowerQualityCard = () => {
  const todayDate = dayjs().format("YYYY-MM-DD");
  const [powerData, setPowerData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/cardHourly`, {
        date: todayDate,
      });

      if (response?.data?.data) {
        const apiData = response?.data?.data;
        setPowerData({
          "Power Factor": formatNumberForDisplayDynamic(apiData?.total_PF_avg),
          "Freq (Hz)": formatNumberForDisplayDynamic(apiData?.total_freq),
          "V Avg (Volt)": formatNumberForDisplayDynamic(apiData?.total_v_avg),
          "I Avg (Amp.)": formatNumberForDisplayDynamic(apiData?.total_I_avg),
          kVA: formatNumberForDisplayDynamic(apiData?.total_kVA),
          kW: formatNumberForDisplayDynamic(apiData?.total_kW),
          kVARh: formatNumberForDisplayDynamic(apiData?.total_kVArh),
        });
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
  }, [todayDate]);

  const defaultData = [
    { label: "Power Factor", value: "0" },
    { label: "Freq (Hz)", value: "0" },
    { label: "V Avg (Volt)", value: "0" },
    { label: "I Avg (Amp.)", value: "0" },
    { label: "kVA", value: "0" },
    { label: "kW", value: "0" },
    { label: "kVARh", value: "0" },
  ];

  const displayData = powerData
    ? Object.entries(powerData).map(([key, value]) => ({
        label: key,
        value,
      }))
    : defaultData;

  return (
    <div className="bg-outlet text-white p-4 rounded-md 4k:rounded-xl w-full 4k:text-4xl">
      <h2 className="text-center text-lg 4k:text-5xl font-bold mb-4">
        Power Quality
      </h2>
      <div className="space-y-3 4k:space-y-6 font-semibold">
        {displayData?.map((item, index) => (
          <div key={index} className="flex justify-between text-sm 4k:text-4xl">
            <span className="text-white">{item?.label}</span>
            <span className="text-dashboard-text-table-oren font-semibold">
              {item?.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerQualityCard;

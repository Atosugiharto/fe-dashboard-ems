import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import {
  fetchTimeApi,
  formatNumberForDisplay,
} from "../../share-components/Helper";
import { utils, writeFile } from "xlsx";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import { baseApiUrl } from "../../share-components/api";
import axios from "axios";
import GlobalVariable from "../../share-components/GlobalVariable";
import { useRef } from "react";
import useFiscalYear from "../../share-components/useFiscalYear";

const HourlySupply = () => {
  const { tglStart, tglEnd } = useFiscalYear();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [actualData, setActualData] = useState([]);

  const [responsive, setResponsive] = useState({
    chartHeight: 225,
    xaxis: "12px",
    yaxis: "12px",
    title: "text-lg",
  });

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        setResponsive({
          chartHeight: 500,
          xaxis: "26px",
          yaxis: "26px",
          title: "text-3xl",
        });
      } else {
        setResponsive({
          chartHeight: 225,
          xaxis: "12px",
          yaxis: "12px",
          title: "text-lg",
        });
      }
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) =>
    dayjs().hour(i).format("HH.00")
  );

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/chartPLNHourly`, {
        date: selectedDate,
      });
      const result = response?.data?.data;

      let actual = Array(24).fill(0);
      result?.forEach((data) => {
        const hour = dayjs(data.date, "YYYY-MM-DD HH:mm").hour();
        actual[hour] = data?.totalLVMDPKWH ?? 0;
      });
      setActualData(actual);
    } catch (error) {
      setActualData(hours.map(() => 0));
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

  const series = [{ name: "PLN Actual", data: actualData }];

  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    colors: [GlobalVariable.dashboardColor.lineOren],
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      categories: hours,
      labels: {
        style: { colors: "#fff", fontSize: responsive.xaxis },
      },
      title: {
        text: "Hour",
        style: { color: "#fff", fontSize: responsive.xaxis },
      },
    },
    yaxis: {
      title: {
        text: "kWh",
        style: { color: "#fff", fontSize: responsive.yaxis },
      },
      labels: {
        style: { colors: "#fff", fontSize: responsive.yaxis },
        formatter: (value) => formatNumberForDisplay(value),
      },
    },
    legend: { labels: { colors: "#fff", fontSize: responsive.xaxis } },
    markers: {
      size: 4,
    },
  };

  const downloadExcel = () => {
    const data = hours.map((hour, index) => ({
      Date: selectedDate,
      Hour: hour,
      "PLN Actual": series[0].data[index],
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Hourly PLN");
    writeFile(wb, `HourlyPLN-${selectedDate}.xlsx`);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg 4k:text-4xl font-semibold mb-2">
          Hourly PLN Actual Supply
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="bg-latar-select text-white px-3 py-1 rounded-md 4k:rounded-xl text-xs 4k:text-3xl 4k:py-2 4k:px-6 font-medium"
            value={selectedDate}
            min={tglStart}
            max={tglEnd}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            onClick={downloadExcel}
            className="bg-latar-icon-hijau text-white rounded p-1"
          >
            <DocumentArrowDownIcon className="h-4 w-auto 4k:h-14" />
          </button>
        </div>
      </div>
      <Chart
        options={options}
        series={series}
        type="line"
        height={responsive.chartHeight}
      />
    </div>
  );
};

export default HourlySupply;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { utils, writeFile } from "xlsx";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
  replaceString,
} from "../../../share-components/Helper";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import GlobalVariable from "../../../share-components/GlobalVariable";
import { baseApiUrl } from "../../../share-components/api";
import dayjs from "dayjs";
import { useRef } from "react";
import useFiscalYear from "../../../share-components/useFiscalYear";

const HourlyConsumption = ({
  menu = "",
  apiUrl = "",
  //   selectedDate = dayjs().format("YYYY-MM-DD"),
}) => {
  const { tglStart, tglEnd } = useFiscalYear();
  const colorData1 = GlobalVariable.dashboardColor.lineOren;
  const [firtsData, setfirtsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const title = "Hourly Electricity Consumption";
  const [responsive, setResponsive] = useState({
    chartHeight: 225,
    xaxis: "10px",
    yaxis: "12px",
    annotations: "10px",
    iconSize: 25,
    title: "text-lg",
  });

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        // For 4K resolution
        setResponsive({
          chartHeight: 500,
          xaxis: "23px",
          yaxis: "26px",
          annotations: "15px",
          iconSize: 60,
          title: "text-3xl",
        });
      } else {
        // Default settings for smaller screens
        setResponsive({
          chartHeight: 225,
          xaxis: "10px",
          yaxis: "12px",
          annotations: "10px",
          iconSize: 25,
          title: "text-lg",
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

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  const hoursSlice = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}`
  );

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/${apiUrl}`, {
        date: selectedDate,
      });

      const result = response?.data?.data[0]?.daily[selectedDate];
      if (result) {
        const firtsDataArray = hours.map((hour) => result[hour]?.total_kW ?? 0);
        setfirtsData(firtsDataArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setfirtsData(new Array(24).fill(0));
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

  const firtsSeries = firtsData?.map((item) => item ?? 0);

  const series = [{ name: "Consumption", data: firtsSeries }];

  const options = {
    chart: { type: "bar", stacked: true },
    colors: [colorData1],
    plotOptions: { bar: { horizontal: false, columnWidth: "80%" } },
    dataLabels: { enabled: false },
    tooltip: {
      style: { fontSize: responsive.xaxis },
      y: {
        formatter: (val, { seriesIndex, dataPointIndex }) => {
          if (seriesIndex === 0)
            return `${formatNumberForDisplayDynamic(
              firtsData[dataPointIndex]
            )} kWh`;
          return "";
        },
      },
    },
    legend: {
      labels: { colors: "#fff" },
      markers: { shape: "circle" },
      position: "bottom",
    },
    xaxis: {
      categories: hoursSlice,
      labels: { style: { colors: "#fff", fontSize: responsive.xaxis } },
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
        formatter: formatNumberForDisplayDynamic,
        style: { colors: "#fff", fontSize: responsive.yaxis },
      },
    },
    grid: { show: true, strokeDashArray: 2 },
    markers: { size: 4, shape: "circle", strokeWidth: 0 },
  };

  const downloadExcel = () => {
    const data = hours.map((hour, index) => ({
      Time: hour,
      [series[0].name]: series[0].data[index],
      [series[1].name]: series[1].data[index],
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, menu);
    writeFile(wb, `Hourly_${menu}_${selectedDate}.xlsx`);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-white font-bold">{title}</h3>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="bg-latar-select text-white px-3 py-1 rounded-md font-medium text-xs 4k:text-3xl"
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
        type="bar"
        height={responsive.chartHeight}
      />
    </div>
  );
};

export default HourlyConsumption;

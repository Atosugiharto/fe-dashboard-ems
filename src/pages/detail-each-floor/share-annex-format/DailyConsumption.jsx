/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { utils, writeFile } from "xlsx";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import GlobalVariable from "../../../share-components/GlobalVariable";
import { baseApiUrl } from "../../../share-components/api";
import dayjs from "dayjs";
import { useRef } from "react";

const DailyConsumption = ({
  apiUrl = "",
  menu = "",
  selectedDate = dayjs().format("YYYY-MM-DD"),
}) => {
  const [firtsData, setFirstData] = useState([]);
  const selectedMoment = dayjs(selectedDate);
  const currentYear = selectedMoment.year();
  const currentMonth = selectedMoment.month() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const daysInMonth = selectedMoment.daysInMonth();
  const title = "Daily Electricity Consumption";

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthMap = {
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
    Jan: 1,
    Feb: 2,
    Mar: 3,
  };
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
          xaxis: "26px",
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

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/${apiUrl}`, {
        date: selectedMoment.format("YYYY-MM-DD"),
      });

      const data = response?.data?.data[0]?.daily || {};
      let firstDataArr = [];

      days.forEach((day) => {
        const formattedDate = dayjs()
          .year(currentYear)
          .month(selectedMonth - 1)
          .date(day)
          .format("YYYY-MM-DD");

        // Ambil nilai totalKWh jika tersedia untuk tanggal tersebut
        const totalKw = data[formattedDate]?.total_kW || 0;

        firstDataArr.push(totalKw);
      });

      setFirstData(firstDataArr);
    } catch (error) {
      setFirstData([]);
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

  const firtsSeries = firtsData?.map((actual) => actual ?? 0);
  const colorData1 = GlobalVariable.dashboardColor.lineOren;
  const series = [{ name: "Consumption", data: firtsSeries }];

  const options = {
    chart: {
      type: "bar",
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
    colors: [colorData1],
    plotOptions: { bar: { horizontal: false, columnWidth: "80%" } },
    dataLabels: { enabled: false },
    tooltip: {
      style: {
        fontSize: responsive.xaxis,
      },
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
      categories: days,
      labels: { style: { colors: "#fff", fontSize: responsive.xaxis } },
      title: {
        text: "Date",
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
    const data = days.map((day, index) => ({
      Date: dayjs()
        .year(currentYear)
        .month(monthMap[selectedMonth] - 1)
        .date(day)
        .format("YYYY-MM-DD"),
      [series[0].name]: series[0].data[index],
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, `${menu}`);
    writeFile(wb, `${menu}_${selectedMonth}.xlsx`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-white font-bold">{title}</h3>
        <div className="flex items-center gap-2">
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

export default DailyConsumption;

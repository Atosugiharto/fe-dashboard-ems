import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import {
  fetchTimeApi,
  formatNumberForDisplay,
  formatNumberForDisplayDynamic,
} from "../../share-components/Helper";
import { utils, writeFile } from "xlsx";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import { baseApiUrl } from "../../share-components/api";
import axios from "axios";
import GlobalVariable from "../../share-components/GlobalVariable";
import { useRef } from "react";

const DailyEmission = () => {
  const currentYear = dayjs().year();
  const currentMonth = dayjs().format("MMM");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [actualData, setActualData] = useState([]);
  const [planningData, setPlanningData] = useState([]);

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

  // Fungsi untuk mendapatkan jumlah hari dalam bulan yang dipilih
  const getDaysInMonth = (month, year) => {
    return dayjs(`${year}-${monthMap[month]}-01`).daysInMonth();
  };

  const days = Array.from(
    { length: getDaysInMonth(selectedMonth, currentYear) },
    (_, i) => i + 1
  );

  const [responsive, setResponsive] = useState({
    chartHeight: 350,
    xaxis: "12px",
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
          chartHeight: 550,
          xaxis: "26px",
          yaxis: "26px",
          annotations: "15px",
          iconSize: 60,
          title: "text-3xl",
        });
      } else {
        // Default settings for smaller screens
        setResponsive({
          chartHeight: 350,
          xaxis: "12px",
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
      const formattedDate = dayjs()
        .year(currentYear)
        .month(monthMap[selectedMonth] - 1)
        .date(1)
        .format("YYYY-MM");

      const response = await axios.post(`${baseApiUrl}/chartEmisiDaily`, {
        date: formattedDate,
      });

      let actual = {};
      let plan = {};

      if (response?.data?.data) {
        response?.data?.data?.forEach((data) => {
          const day = dayjs(data.date).date(); // Ambil tanggal dari API
          actual[day] = data?.totalEmisiPLN ?? 0;
          plan[day] = data?.planEmisi ?? 0;
        });
      }

      // Pastikan setiap tanggal dalam bulan memiliki nilai
      setActualData(days.map((day) => actual[day] || 0));
      setPlanningData(days.map((day) => plan[day] || 0));
    } catch (error) {
      setActualData(days.map(() => 0));
      setPlanningData(days.map(() => 0));
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
  }, [selectedMonth]);

  const series = [
    { name: "Emission Act", type: "area", data: actualData },
    { name: "Emission Plan", type: "line", data: planningData },
  ];

  const markerColors = actualData.map((actual, index) => ({
    seriesIndex: 0,
    dataPointIndex: index,
    fillColor:
      actual > planningData[index]
        ? "#ff0000"
        : GlobalVariable.dashboardColor.barBiru,
    strokeColor: "#fff",
    size: 5,
  }));

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
    colors: [
      GlobalVariable.dashboardColor.barBiru,
      GlobalVariable.dashboardColor.lineAbu,
    ],
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "solid",
      opacity: [0.3, 1], // Area pertama lebih transparan
      gradient: { shadeIntensity: 0, opacityFrom: 0, opacityTo: 0 },
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
        text: "Ton CO2e",
        style: { color: "#fff", fontSize: responsive.yaxis },
      },
      labels: {
        style: { colors: "#fff", fontSize: responsive.yaxis },
        formatter: (value) => formatNumberForDisplayDynamic(value),
      },
    },
    tooltip: {
      style: {
        fontSize: responsive.xaxis,
      },
    },
    legend: { labels: { colors: "#fff", fontSize: responsive.xaxis } },
    dataLabels: {
      enabled: false,
      style: { colors: ["#fff"], fontSize: "6px" },
      background: { enabled: false },
      borderRadius: 0,
      borderWidth: 0,
      dropShadow: { enabled: false },
      offsetY: -6,
      formatter: (value) => formatNumberForDisplay(value),
    },
    markers: {
      size: 4,
      discrete: markerColors, // Gunakan markers warna berbeda untuk actual
    },
  };

  const downloadExcel = () => {
    const data = days.map((day, index) => ({
      Date: dayjs()
        .year(currentYear)
        .month(monthMap[selectedMonth] - 1)
        .date(day)
        .format("YYYY-MM"),
      "Emission Act": series[0].data[index],
      "Emission Plan": series[1].data[index],
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Daily Emission");
    writeFile(wb, `DailyEmission-${selectedMonth}.xlsx`);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg 4k:text-4xl font-semibold mb-2">
          Daily Emission
        </h2>
        <div className="flex items-center gap-2">
          <select
            className="bg-latar-select text-white px-3 py-1 rounded-md 4k:rounded-xl text-xs 4k:text-3xl 4k:py-2 4k:px-6 font-medium"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {Object.keys(monthMap).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
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

export default DailyEmission;

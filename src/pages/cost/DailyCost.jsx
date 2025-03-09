import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { utils, writeFile } from "xlsx";
import {
  fetchTimeApi,
  formatNumberForDisplay,
  formatNumberForDisplayDynamic,
} from "../../share-components/Helper";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import GlobalVariable from "../../share-components/GlobalVariable";
import { baseApiUrl } from "../../share-components/api";
import dayjs from "dayjs";
import { useRef } from "react";

const DailyCost = () => {
  const [plnData, setplnData] = useState([]);
  const [solarPVData, setsolarPVData] = useState([]);
  const currentYear = dayjs().year();
  const currentMonth = dayjs().format("MMM");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
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
    chartHeight: 250,
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
          chartHeight: 250,
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

  // Fungsi untuk mendapatkan jumlah hari dalam bulan yang dipilih
  const getDaysInMonth = (month, year) => {
    return dayjs(`${year}-${monthMap[month]}-01`).daysInMonth();
  };

  const days = Array.from(
    { length: getDaysInMonth(selectedMonth, currentYear) },
    (_, i) => i + 1
  );

  const fetchData = async () => {
    try {
      const formattedDate = dayjs()
        .year(currentYear)
        .month(monthMap[selectedMonth] - 1)
        .date(1)
        .format("YYYY-MM");
      const response = await axios.post(`${baseApiUrl}/chartDailyCost`, {
        date: formattedDate,
      });
      //   console.log(response?.data?.data, "res");

      let pln = {};
      let solarPV = {};

      if (response?.data?.data) {
        response?.data?.data?.forEach((data) => {
          const day = dayjs(data.date).date(); // Ambil tanggal dari API
          pln[day] = data?.totalLVMDPCost ?? 0;
          solarPV[day] = data?.totalPVIncome ?? 0;
        });
      }

      // Pastikan setiap tanggal dalam bulan memiliki nilai
      setplnData(days.map((day) => pln[day] || 0));
      setsolarPVData(days.map((day) => solarPV[day] || 0));
    } catch (error) {
      setplnData(days.map(() => 0));
      setsolarPVData(days.map(() => 0));
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

  const SolarPVBase = solarPVData?.map((plan, index) =>
    plan > plnData[index] ? plan - plnData[index] : 0
  );

  const plnBase = plnData?.map((actual) => actual ?? 0);

  const series = [
    { name: "PLN", data: plnBase },
    { name: "Solar PV", data: SolarPVBase },
  ];

  const options = {
    chart: { type: "bar", stacked: true },
    colors: [
      GlobalVariable.dashboardColor.barBiruCost,
      GlobalVariable.dashboardColor.barKuningCost,
    ],
    plotOptions: { bar: { horizontal: false, columnWidth: "80%" } },
    dataLabels: { enabled: false },
    tooltip: {
      style: {
        fontSize: responsive.xaxis,
      },
      y: {
        formatter: (val, { seriesIndex, dataPointIndex }) => {
          if (seriesIndex === 0)
            return `Rp. ${formatNumberForDisplay(plnData[dataPointIndex])}`;
          if (seriesIndex === 1 && SolarPVBase[dataPointIndex] > 0)
            return `Rp. ${formatNumberForDisplay(solarPVData[dataPointIndex])}`;
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
        text: "Rupiah",
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
        .format("YYYY-MM"),
      PLN: series[0].data[index],
      "Solar PV": series[1].data[index],
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Daily Emission");
    writeFile(wb, `DailyEmission-${selectedMonth}.xlsx`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-white font-bold">Daily Electricity Cost</h3>
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
        type="bar"
        height={responsive.chartHeight}
      />
    </div>
  );
};

export default DailyCost;

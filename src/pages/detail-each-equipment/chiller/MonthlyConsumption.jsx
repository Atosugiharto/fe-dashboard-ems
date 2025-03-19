/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import * as XLSX from "xlsx";
import {
  fetchTimeApi,
  formatMonth,
  formatNumberForDisplay,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import GlobalVariable from "../../../share-components/GlobalVariable";
import { baseApiUrl } from "../../../share-components/api";
import { useRef } from "react";
import moment from "moment";
import useFiscalYear from "../../../share-components/useFiscalYear";

const MonthlyConsumption = ({ apiUrl = "", menu = "" }) => {
  const { yearsFYOption } = useFiscalYear();
  const dafaultDate = moment().format("YYYY");
  const defaultYear = `${dafaultDate - 1}-${Number(dafaultDate)}`;
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [firtsData, setfirtsData] = useState([]);
  const [secondData, setsecondData] = useState([]);
  const [dataMonth, setDataMonth] = useState([
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
  ]);
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

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/${apiUrl}`, {
        fiscalReq: selectedYear,
      });

      if (response?.data?.data) {
        const data = response?.data?.data;

        // Urutan bulan fiskal (April - Maret)
        const fiscalMonths = [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
          "Jan",
          "Feb",
          "Mar",
        ];

        // Mapping bulan dari API ke bulan fiskal
        const monthMap = {
          "04": "Apr",
          "05": "May",
          "06": "Jun",
          "07": "Jul",
          "08": "Aug",
          "09": "Sep",
          10: "Oct",
          11: "Nov",
          12: "Dec",
          "01": "Jan",
          "02": "Feb",
          "03": "Mar",
        };

        // Parsing data dari API
        const parsedData = {};
        Object.entries(data).forEach(([key, value]) => {
          const month = key.split("-")[1]; // Ambil bagian bulan dari "YYYY-MM"
          const monthName = monthMap[month]; // Konversi ke format bulan fiskal

          if (monthName) {
            parsedData[monthName] = {
              totalKWh: value?.totalKWh ?? 0,
              totalVAvg: value?.totalVAvg ?? 0,
            };
          }
        });

        // Menyesuaikan data dengan urutan bulan fiskal
        const firts = fiscalMonths.map(
          (month) => parsedData[month]?.totalKWh || 0
        );
        const second = fiscalMonths.map(
          (month) => parsedData[month]?.totalVAvg || 0
        );

        setfirtsData(firts);
        setsecondData(second);
        setDataMonth(fiscalMonths);
      }
    } catch (error) {
      setfirtsData([]);
      setsecondData([]);
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
  }, [selectedYear]);

  const secondBase = secondData?.map((plan, index) =>
    plan > firtsData[index] ? plan - firtsData[index] : 0
  );

  const firtsBase = firtsData?.map((actual) => actual ?? 0);

  const series = [
    { name: "Total", data: firtsBase },
    { name: "V Avg", data: secondBase },
  ];

  const options = {
    chart: { type: "bar", stacked: true },
    colors: [
      GlobalVariable.dashboardColor.barBiru,
      GlobalVariable.dashboardColor.barAbu,
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
            return `${formatNumberForDisplay(firtsData[dataPointIndex])} kWh`;
          if (seriesIndex === 1 && secondBase[dataPointIndex] > 0)
            return `${formatNumberForDisplay(secondData[dataPointIndex])} kWh`;
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
      categories: formatMonth(dataMonth),
      labels: { style: { colors: "#fff", fontSize: responsive.xaxis } },
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
    const headers = ["Month", "Total kWh", "V Avg", "Cost Planning"];
    const months = formatMonth(dataMonth);

    const data = months.map((month, index) => ({
      Month: month,
      Total: firtsData[index] || 0,
      Avg: secondData[index] || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(
      [headers, ...data.map(Object.values)],
      { skipHeader: true }
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `${menu}_${selectedYear}`
    );
    XLSX.writeFile(workbook, `Monthly_${menu}_${selectedYear}.xlsx`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-white font-semibold text-lg 4k:text-4xl">
          Monthly Equipment Consumption
        </h3>
        <div className="flex gap-2">
          <select
            className="bg-latar-select text-white px-3 py-1 rounded-md 4k:rounded-xl text-xs 4k:text-3xl 4k:py-2 4k:px-6 font-medium"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {yearsFYOption?.map((year) => (
              <option key={year?.value} value={year?.value}>
                {year?.label}
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

export default MonthlyConsumption;

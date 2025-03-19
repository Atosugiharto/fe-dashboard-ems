import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import * as XLSX from "xlsx";
import {
  fetchTimeApi,
  formatMonth,
  formatNumberForDisplayDynamic,
} from "../../share-components/Helper";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import GlobalVariable from "../../share-components/GlobalVariable";
import { baseApiUrl } from "../../share-components/api";
import { useRef } from "react";
import useFiscalYear from "../../share-components/useFiscalYear";
import moment from "moment";

const MonthlySupply = () => {
  const { yearsFYOption } = useFiscalYear();
  const dafaultDate = moment().format("YYYY");
  const defaultYear = `${dafaultDate - 1}-${Number(dafaultDate)}`;
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [actualData, setActualData] = useState([]);
  const [planningData, setPlanningData] = useState([]);
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
    chartHeight: 225,
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
          chartHeight: 225,
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

  // Fungsi untuk fetch data dari API
  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/chartSolarPVMonthly`, {
        fiscalReq: selectedYear,
      });

      if (response?.data) {
        const data = response?.data?.data;
        const actual = data?.map((data) => data?.totalPVKWH);
        const plan = data?.map((data) => data?.planKWH);
        const month = data?.map((data) => data?.month);
        setActualData(actual);
        setPlanningData(plan);
        setDataMonth(month);
      }
    } catch (error) {
      setActualData([]);
      setPlanningData([]);
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

  const planningExcessData = planningData?.map((plan, index) =>
    plan > actualData[index] ? plan - actualData[index] : 0
  );
  const actualExcessData = actualData?.map((actual, index) =>
    actual > planningData[index] ? actual - planningData[index] : 0
  );
  const baseData = actualData?.map((actual, index) =>
    Math.min(actual, planningData[index])
  );

  const series = [
    { name: "PV Actual", data: baseData },
    { name: "PV Planning", data: planningExcessData },
    { name: "PV Actual Excess", data: actualExcessData },
  ];

  const options = {
    chart: { type: "bar", stacked: true },
    colors: [
      GlobalVariable.dashboardColor.gaugeHijau,
      GlobalVariable.dashboardColor.barAbu,
      GlobalVariable.dashboardColor.barMerah,
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
            return `${formatNumberForDisplayDynamic(
              actualData[dataPointIndex]
            )} kWh`;
          if (seriesIndex === 1 && planningExcessData[dataPointIndex] > 0)
            return `${formatNumberForDisplayDynamic(
              planningData[dataPointIndex]
            )} kWh`;
          if (seriesIndex === 2 && actualExcessData[dataPointIndex] > 0)
            return `${formatNumberForDisplayDynamic(
              actualData[dataPointIndex]
            )} kWh`;
          return "";
        },
      },
    },
    legend: {
      labels: { colors: "#fff", fontSize: responsive.xaxis },
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
    const headers = ["Month", "PV Actual (kWh)", "PV Planning (kWh)"];
    const months = formatMonth(dataMonth);

    const data = months.map((month, index) => ({
      Month: month,
      "PV Actual (kWh)": actualData[index] || 0,
      "PV Planning (kWh)": planningData[index] || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(
      [headers, ...data.map(Object.values)],
      { skipHeader: true }
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Solar_PV_${selectedYear}`
    );
    XLSX.writeFile(workbook, `Monthly_Solar_PV_${selectedYear}.xlsx`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-white font-bold">Monthly Solar PV Supply</h3>
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

export default MonthlySupply;

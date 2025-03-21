import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import * as XLSX from "xlsx";
import {
  fetchTimeApi,
  formatMonth,
  formatNumberForDisplay,
  formatNumberForDisplayDynamic,
} from "../../share-components/Helper";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import GlobalVariable from "../../share-components/GlobalVariable";
import { baseApiUrl } from "../../share-components/api";
import { useRef } from "react";
import TableCostMonthly from "./TableCostMonthly";
import moment from "moment";
import useFiscalYear from "../../share-components/useFiscalYear";

const MonthlyCost = () => {
  const { yearsFYOption } = useFiscalYear();
  const dafaultDate = moment().format("YYYY");
  const defaultYear = `${dafaultDate - 1}-${Number(dafaultDate)}`;
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [plnData, setplnData] = useState([]);
  const [solarPVData, setsolarPVData] = useState([]);
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
      const response = await axios.post(`${baseApiUrl}/chartMonthlyCost`, {
        fiscalReq: selectedYear,
      });

      if (response?.data) {
        const data = response?.data?.data;
        const pln = data?.map((data) => data?.totalLVMDPCost);
        const solarPV = data?.map((data) => data?.totalPVIncome);
        const plan = data?.map((data) => data?.totalPlanCost);
        const month = data?.map((data) => data?.month);
        setplnData(pln);
        setsolarPVData(solarPV);
        setPlanningData(plan);
        setDataMonth(month);
      }
    } catch (error) {
      setplnData([]);
      setsolarPVData([]);
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

  const SolarPVBase = solarPVData?.map((plan, index) =>
    plan > plnData[index] ? plan - plnData[index] : 0
  );
  const costPlanning = planningData?.map((actual, index) =>
    actual > plnData[index] ? actual - plnData[index] : 0
  );

  const plnBase = plnData?.map((actual) => actual ?? 0);

  const series = [
    { name: "PLN", data: plnBase },
    { name: "Solar PV", data: SolarPVBase },
    { name: "Cost Planning", data: costPlanning },
  ];

  const options = {
    chart: { type: "bar", stacked: true },
    colors: [
      GlobalVariable.dashboardColor.barBiruCost,
      GlobalVariable.dashboardColor.barKuningCost,
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
            return `Rp. ${formatNumberForDisplay(plnData[dataPointIndex])}`;
          if (seriesIndex === 1 && SolarPVBase[dataPointIndex] > 0)
            return `Rp. ${formatNumberForDisplay(solarPVData[dataPointIndex])}`;
          if (seriesIndex === 2)
            return `Rp. ${formatNumberForDisplay(
              planningData[dataPointIndex]
            )}`;
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
    const headers = ["Month", "PLN", "Solar PV", "Cost Planning"];
    const months = formatMonth(dataMonth);

    const data = months.map((month, index) => ({
      Month: month,
      PLN: plnData[index] || 0,
      "Solar PV": solarPVData[index] || 0,
      "Cost Planning": planningData[index] || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(
      [headers, ...data.map(Object.values)],
      { skipHeader: true }
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Cost_${selectedYear}`);
    XLSX.writeFile(workbook, `Monthly_Electricity_Cost_${selectedYear}.xlsx`);
  };

  return (
    <div className="mt-4 lg:flex gap-4 p-4 rounded-md 4k:rounded-xl bg-kartu">
      <div className="lg:w-1/2 mb-4 lg:mb-0">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-white font-bold">Monthly Electricity Cost</h3>
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
      </div>

      <div className="lg:w-1/2">
        <TableCostMonthly filterDate={selectedYear} />
      </div>
    </div>
  );
};

export default MonthlyCost;

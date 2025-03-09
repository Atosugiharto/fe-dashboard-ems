/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import GlobalVariable from "../../../share-components/GlobalVariable";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { baseApiUrl } from "../../../share-components/api";
import axios from "axios";

const ThisMonthChart = ({
  menu = "",
  apiUrl = "",
  selectedDate = dayjs().format("YYYY-MM-DD"),
}) => {
  const colorData1 = GlobalVariable.dashboardColor.lineOren;
  const title = "Electricity Consumption This Month";
  const [data, setData] = useState([]);
  const year = dayjs(selectedDate).year();
  const selectedFiscalYear = `${year}-${year + 1}`;

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
      setResponsive(
        window.innerWidth >= 3840
          ? {
              chartHeight: 500,
              xaxis: "26px",
              yaxis: "26px",
              annotations: "15px",
              iconSize: 60,
              title: "text-3xl",
            }
          : {
              chartHeight: 250,
              xaxis: "12px",
              yaxis: "12px",
              annotations: "10px",
              iconSize: 25,
              title: "text-lg",
            }
      );
    };
    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/${apiUrl}`, {
        fisqalReq: selectedFiscalYear,
      });
      if (response?.data?.data) {
        const extractedData = response.data.data.map((item) => ({
          name: item.floor,
          total_kW: item.total_kW,
        }));
        setData(extractedData);
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
  }, [selectedDate]);

  const series = [
    {
      name: "Consumption",
      data: data.map((item) => item.total_kW),
    },
  ];

  const downloadExcel = () => {
    const formattedData = data.map((item) => ({
      Floor: item.name,
      Consumption: item.total_kW ?? 0,
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${selectedDate}`);
    XLSX.writeFile(workbook, `Monthly_${menu}_${selectedDate}.xlsx`);
  };

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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        distributed: true,
      },
    },
    colors: [colorData1],
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Consumption"],
      labels: { style: { colors: "#fff", fontSize: responsive.xaxis } },
    },
    tooltip: {
      y: {
        formatter: (val) => `${formatNumberForDisplayDynamic(val)} kWh`,
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
    legend: { show: false },
    grid: { show: true, strokeDashArray: 2 },
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-white font-bold">{title}</h3>
        <button
          onClick={downloadExcel}
          className="bg-latar-icon-hijau text-white rounded p-1"
        >
          <DocumentArrowDownIcon className="h-4 w-auto 4k:h-14" />
        </button>
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

export default ThisMonthChart;

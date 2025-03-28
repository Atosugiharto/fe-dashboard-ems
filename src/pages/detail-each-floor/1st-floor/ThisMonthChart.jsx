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
  const title = "Electricity Consumption This Month";
  const [data, setData] = useState([]);

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
              chartHeight: 225,
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
        date: selectedDate,
      });
      if (response?.data?.data) {
        const firstData = response?.data?.data?.floorDatax;

        const podoTotalKW = firstData["PODO"]?.total_kW ?? 0;
        const yosTotalKW = firstData["YOS"]?.total_kW ?? 0;

        setData([
          { name: "YOS", kW: yosTotalKW },
          { name: "PODO", kW: podoTotalKW },
        ]);
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
      name: "Consumption (kWh)",
      data: [
        data.find((d) => d.name === "YOS")?.kW ?? 0,
        data.find((d) => d.name === "PODO")?.kW ?? 0,
      ],
    },
  ];

  const downloadExcel = () => {
    const formattedData = data.map((item) => ({
      Floor: item.floor,
      YOS: item.YOS?.total_kW ?? 0,
      PODO: item.PODO?.total_kW ?? 0,
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
        columnWidth: "80%",
        distributed: true,
      },
    },
    colors: [
      GlobalVariable.dashboardColor.barBiru,
      GlobalVariable.dashboardColor.lineOren,
    ],
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["YOS", "PODO"],
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

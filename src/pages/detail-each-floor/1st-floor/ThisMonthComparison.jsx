/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import GlobalVariable from "../../../share-components/GlobalVariable";
import {
  fetchTimeApi,
  formatNumberForDisplayDynamic,
} from "../../../share-components/Helper";
import * as XLSX from "xlsx";
import axios from "axios";
import { baseApiUrl } from "../../../share-components/api";
import dayjs from "dayjs";
import { useRef } from "react";

const ThisMonthComparison = ({
  menu = "",
  apiUrl = "",
  selectedDate = dayjs().format("YYYY-MM-DD"),
  isYos = true,
}) => {
  const colorData = isYos ? GlobalVariable.dashboardColor.barBiru : GlobalVariable.dashboardColor.lineOren;
  const title = "Electricity Consumption This Month";
  const [actualData, setActualData] = useState([]);
  const [responsive, setResponsive] = useState({
    chartHeight: 300,
    xaxis: "12px",
    yaxis: "12px",
    annotations: "10px",
    iconSize: 25,
    title: "text-lg",
  });

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        setResponsive({
          chartHeight: 500,
          xaxis: "26px",
          yaxis: "26px",
          annotations: "15px",
          iconSize: 60,
          title: "text-3xl",
        });
      } else {
        setResponsive({
          chartHeight: 300,
          xaxis: "12px",
          yaxis: "12px",
          annotations: "10px",
          iconSize: 25,
          title: "text-lg",
        });
      }
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
        const firstData = response?.data?.data[0];
        const dataPanel = isYos ? firstData?.YOS?.detilPanel : firstData?.PODO?.detilPanel ?? [];

        const formattedData = dataPanel?.map((panel) => ({
          name: panel?.namapanel,
          kW: panel?.kW,
        }));

        setActualData(formattedData);
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


  const seriesName = isYos ? "YOS" : "PODO";
  const series = [
    {
      name: seriesName,
      data: actualData?.map((item) => item?.kW),
    },
  ];

  const downloadExcel = () => {
    const formattedData = actualData?.map((item) => ({
      Equipment: item?.name,
      "Consumption (kWh)": item?.kW,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Data_${selectedDate}`);
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
      },
    },
    colors: [colorData],
    dataLabels: { enabled: false },
    xaxis: {
      categories: actualData?.map((item) => item.name),
      labels: { style: { colors: "#fff", fontSize: responsive.xaxis } },
      title: {
        text: isYos ? "Yos Sudarso Side" : "Podomoro Side",
        style: { color: "#fff", fontSize: responsive.xaxis },
      },
    },
    tooltip: {
      style: {
        fontSize: responsive.xaxis,
      },
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
    legend: {
      labels: { colors: "#fff" },
      markers: { shape: "circle" },
      position: "bottom",
    },
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

export default ThisMonthComparison;

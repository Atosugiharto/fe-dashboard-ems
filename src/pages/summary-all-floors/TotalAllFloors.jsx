/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import GlobalVariable from "../../share-components/GlobalVariable";
import { formatNumberForDisplayDynamic } from "../../share-components/Helper";
import * as XLSX from "xlsx";

const TotalAllFloors = ({ data = [], dateStart = "", dateEnd = "" }) => {
  console.log(data, "total");
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
          chartHeight: 250,
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

  const series = [
    {
      name: "Consumption",
      data: [data?.data?.total_kW_all || 0, data?.planKWH || 0],
    },
  ];

  const downloadExcel = () => {
    const formattedData =
      [
        {
          "Actual (kWh)": data?.data?.total_kW_all ?? 0,
          "Planning (kWh)": data?.planKWH ?? 0,
        },
      ] || [];

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `${dateStart}-${dateEnd}`
    );
    XLSX.writeFile(workbook, `Summary_All_Floors.xlsx`);
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
    colors: [
      GlobalVariable.dashboardColor.lineOren,
      GlobalVariable.dashboardColor.barAbu,
    ],
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Actual", "Planning"],
      labels: { style: { colors: "#fff", fontSize: responsive.xaxis } },
    },
    tooltip: {
      style: {
        fontSize: responsive.xaxis,
      },
      y: {
        formatter: (val, { seriesIndex, dataPointIndex }) => {
          return `${formatNumberForDisplayDynamic(val)} kWh`;
        },
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
        <h3 className="text-white font-bold">
          Total Electricity Consumption of All Floors
        </h3>
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

export default TotalAllFloors;

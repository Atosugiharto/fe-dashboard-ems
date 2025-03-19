/* eslint-disable react/prop-types */
import Chart from "react-apexcharts";
import { formatNumberForDisplayDynamic } from "../../share-components/Helper";
import { useEffect } from "react";
import { useState } from "react";

const ConsumptionPlan = ({ data }) => {
  const [responsive, setResponsive] = useState({
    chartHeight: 500,
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
          chartHeight: 800,
          xaxis: "26px",
          yaxis: "26px",
          annotations: "26px",
          iconSize: 60,
          title: "text-3xl",
        });
      } else {
        // Default settings for smaller screens
        setResponsive({
          chartHeight: 500,
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

  const defaultCategories = [
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
    "Jan",
    "Feb",
    "Mar",
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      stacked: false,
    },
    colors: ["#d38a0a"],
    plotOptions: { bar: { horizontal: false, columnWidth: "90%" } },
    dataLabels: {
      enabled: false,
      style: { colors: ["#fff"], fontSize: "6px" },
      background: { enabled: false },
      borderRadius: 0,
      borderWidth: 0,
      dropShadow: { enabled: false },
      offsetY: -6,
      formatter: (value) => formatNumberForDisplayDynamic(value),
    },
    tooltip: {
      theme: "dark", // 🔹 Menyesuaikan tema agar tooltip terlihat
      style: { fontSize: responsive.xaxis, color: "#fff" }, // 🔹 Pastikan teks terlihat
      y: {
        formatter: (val) => `${formatNumberForDisplayDynamic(val)} kWh`,
      },
    },
    legend: {
      labels: { colors: "#fff" },
      markers: { radius: "100%" },
      position: "bottom",
    },
    xaxis: {
      categories:
        data?.length > 0
          ? data.map((item) => item?.month_name)
          : defaultCategories,
      labels: { style: { colors: "#fff", fontSize: responsive.xaxis } },
    },
    yaxis: {
      title: {
        text: "kWh",
        style: { color: "#fff", fontSize: responsive.yaxis },
      },
      labels: {
        style: { colors: "#fff", fontSize: responsive.yaxis },
        formatter: (value) => formatNumberForDisplayDynamic(value),
      },
    },
    grid: { show: true, strokeDashArray: 2 },
  };

  const series = [
    { name: "Actual", data: data?.map((item) => item?.total_kwh) },
  ];
  return (
    <div>
      <div className="4k:text-4xl flex justify-between items-center mb-1">
        <h3 className="text-white font-bold">
          Electricity Consumption Plan/Month
        </h3>
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

export default ConsumptionPlan;

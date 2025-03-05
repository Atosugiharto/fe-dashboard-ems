import Chart from "react-apexcharts";
import { formatNumberForDisplay, formatNumberForDisplayDynamic } from "../../share-components/Helper";
import { useEffect } from "react";
import { useState } from "react";


const ConsumptionPlan = () => {
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
            xaxis: "17px",
            yaxis: "17px",
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
    const actualData = [
      220377, 249828, 233254, 262704, 256266, 239693, 262704, 246130, 243390,
      243390, 238735, 236951,
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
        formatter: (value) => formatNumberForDisplayDynamic(value)
      },
      tooltip: {
        theme: "dark", // 🔹 Menyesuaikan tema agar tooltip terlihat
        style: { fontSize: "11px", color: "#fff" }, // 🔹 Pastikan teks terlihat
        y: {
          formatter: (val) => `${formatNumberForDisplay(val)} kWh`,
        },
      },
      legend: {
        labels: { colors: "#fff" },
        markers: { radius: "100%" },
        position: "bottom",
      },
      xaxis: {
        categories: [
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
        ],
        labels: { style: { colors: "#fff", fontSize: responsive.xaxis, } },
      },
      yaxis: {
        title: { text: "kWh", style: { color: "#fff" } },
        labels: {
          style: { colors: "#fff" },
          formatter: (value) => formatNumberForDisplay(value),
        },
      },
      grid: { show: true, strokeDashArray: 2 },
    };
    
    const series = [{ name: "Actual", data: actualData }];
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-white font-bold">
          Electricity Consumption Plan/Month
        </h3>
      </div>
      <Chart options={options} series={series} type="bar" height={500} />
    </div>
  );
};

export default ConsumptionPlan;

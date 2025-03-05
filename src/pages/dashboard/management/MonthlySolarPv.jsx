import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Labeling from "../../../share-components/Labeling";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const MonthlySolarPv = () => {
  const monthNames = [
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

  const getCurrentMonthIndex = () => {
    const now = new Date();
    const actualMonth = now.getMonth(); // 0-indexed
    return (actualMonth + 9) % 12; // Shift to match "Apr" as index 0
  };

  const [month, setMonth] = useState(getCurrentMonthIndex()); // Adjusted current month
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState({ categories: [], series: [] });

  const getDaysInMonth = (year, month) => {
    return new Array(new Date(year, month + 1, 0).getDate())
      .fill(0)
      .map((_, i) => (i + 1).toString());
  };

  const generateData = (year, month) => {
    const days = getDaysInMonth(year, month);
    return {
      categories: days,
      series: [
        {
          name: "Solar PV Produce",
          data: days.map(() => Math.floor(Math.random() * 100) + 50),
        },
      ],
    };
  };

  useEffect(() => {
    setData(generateData(year, month));
  }, [year, month]);

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: true },
      height: Labeling.chart.height, // Match height with the first component
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%", // Match with the first component's columnWidth
        endingShape: "flat",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: data.categories,
      title: {
        text: "Days",
        style: { color: "#D1D5DB", fontSize: "14px" },
      },
      labels: { style: { colors: "#D1D5DB" } },
    },
    yaxis: {
      title: {
        text: "Solar PV Produce",
        style: { color: "#D1D5DB", fontSize: "12px" },
      },
      labels: {
        style: { colors: "#D1D5DB" },
        formatter: (value) => formatNumberForDisplay(value),
      },
    },
    fill: {
      type: "pattern",
      pattern: {
        style: ["horizontalLines"],
        width: 5,
        height: 10,
        strokeWidth: 15,
      },
      opacity: 0.8,
      colors: ["#FFA500"], // Matching color from first component
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "12px", fontFamily: "Helvetica, Arial, sans-serif" },
    },
    legend: { show: false },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg 4k:text-4xl font-bold text-gray-300">
          Monthly Solar PV
        </h2>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <label htmlFor="month">Month</label>
            <select
              id="month"
              className="px-3 py-1 bg-blue-500 text-white rounded-md 4k:rounded-xl cursor-pointer"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            >
              {monthNames.map((m, index) => (
                <option key={index} value={index}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              className="px-3 py-1 bg-blue-500 text-white rounded-md 4k:rounded-xl cursor-pointer"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            >
              {[2023, 2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={data.series}
        type="bar"
        height={Labeling.chart.height}
      />
    </div>
  );
};

export default MonthlySolarPv;

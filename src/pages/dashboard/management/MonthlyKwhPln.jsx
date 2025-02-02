import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const MonthlyKwhPln = () => {
  const [month, setMonth] = useState(0); // Start with April (0-indexed)
  const [year, setYear] = useState(new Date().getFullYear()); // Current year

  const getDaysInMonth = (year, month) => {
    return new Array(new Date(year, month + 1, 0).getDate())
      .fill(0)
      .map((_, i) => (i + 1).toString());
  };

  const getData = (year, month) => {
    const days = getDaysInMonth(year, month);
    return {
      categories: days,
      series: [
        {
          name: "Energy Consumption Plan",
          data: Array.from(
            { length: days.length },
            () => Math.floor(Math.random() * 5000) + 1000
          ),
        },
        {
          name: "Energy Consumption Actual",
          data: Array.from(
            { length: days.length },
            () => Math.floor(Math.random() * 4500) + 900
          ),
        },
      ],
    };
  };

  const data = getData(year, month);

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: true },
      height: 250, // Match the height to be consistent
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%", // Adjust to match the KwhPerEquipment style
        dataLabels: { position: "top" },
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: data.categories,
      title: {
        text: "Days of the Month",
        style: { color: "#D1D5DB", fontSize: "14px" },
      },
      labels: { style: { colors: "#D1D5DB" } },
    },
    yaxis: {
      title: {
        text: "Energy Consumption (kWh)",
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
        style: ["horizontalLines", "horizontalLines"],
        width: 5,
        height: 10,
        strokeWidth: 15,
      },
      opacity: 0.8,
      colors: ["#FFA500", "#00FF00"], // Matching bar colors
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      labels: { colors: "#D1D5DB" },
    },
    tooltip: {
      theme: "dark",
      custom: ({ series, dataPointIndex }) => {
        const total = series.reduce(
          (sum, serie) => sum + parseFloat(serie[dataPointIndex]),
          0
        );
        return `
          <div style="background: #222; padding: 8px 12px; border-radius: 5px; color: #fff; font-size: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);">
            <strong style="display: block; font-size: 14px; margin-bottom: 5px;">Total Consumption</strong>
            <span style="font-size: 13px;">${formatNumberForDisplay(
              total
            )}</span>
          </div>
        `;
      },
    },
    stroke: { width: 0 },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-300">Monthly kWh PLN</h2>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <label htmlFor="month">Month</label>
            <select
              id="month"
              className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            >
              {[
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
              ].map((m, index) => (
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
              className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            >
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={data.series}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default MonthlyKwhPln;

import { useState } from "react";
import Chart from "react-apexcharts";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const MonthlyEmission = () => {
  const [month, setMonth] = useState(3); // Start with April (0-indexed)
  const [year, setYear] = useState(new Date().getFullYear()); // Current year

  const getCurrentMonthDays = () => {
    return Array.from(
      { length: new Date(year, month + 1, 0).getDate() },
      (_, i) => (i + 1).toString()
    );
  };

  const getData = () => {
    const days = getCurrentMonthDays();
    return {
      categories: days,
      series: [
        {
          name: "Actual Emission",
          type: "bar",
          data: Array.from({ length: days.length }, () =>
            Math.floor(Math.random() * 200) + 50
          ),
        },
        {
          name: "Actual Accum Emission Monthly",
          type: "line",
          data: Array.from({ length: days.length }, (_, i) =>
            (i + 1) * Math.floor(Math.random() * 100)
          ),
        },
        {
          name: "CAP Accum Monthly",
          type: "line",
          data: Array(days.length).fill(1200),
        },
      ],
      threshold: 2000,
    };
  };

  const data = getData();

  const options = {
    chart: { type: "line", height: 250, toolbar: { show: false } },
    xaxis: {
      categories: data.categories,
      title: {
        text: "Days",
        style: { color: "#d1d5db", fontSize: "14px" },
      },
      labels: { style: { colors: "#d1d5db", fontSize: "12px" } },
    },
    yaxis: {
      title: { text: "Emissions (Ton)", style: { color: "#d1d5db", fontSize: "12px" } },
      labels: {
        style: { colors: "#d1d5db", fontSize: "12px" },
        formatter: (value) => formatNumberForDisplay(value),
      },
      logarithmic: true,
    },
    plotOptions: { bar: { columnWidth: "50%" } },
    dataLabels: { enabled: false },
    annotations: {
      yaxis: [
        {
          y: data.threshold,
          borderColor: "red",
          label: {
            borderColor: "red",
            style: { color: "#fff", background: "red" },
            text: `CAP ${formatNumberForDisplay(data.threshold)}`,
          },
        },
      ],
    },
    tooltip: { theme: "dark", style: { fontSize: "12px" } },
    colors: ["#000", "#D1D5DB", "red"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      labels: { colors: "#D1D5DB" },
    },
    fill: { opacity: 1 },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-300">Monthly Emission</h2>
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
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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
              {[2023, 2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Chart options={options} series={data.series} type="line" height={250} />
    </div>
  );
};

export default MonthlyEmission;

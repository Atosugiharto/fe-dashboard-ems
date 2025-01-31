import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Labeling from "../../../share-components/Labeling";
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
          data: Array.from({ length: days.length }, () => Math.floor(Math.random() * 5000) + 1000),
        },
        {
          name: "Energy Consumption Actual",
          data: Array.from({ length: days.length }, () => Math.floor(Math.random() * 4500) + 900),
        },
      ],
    };
  };

  const data = getData(year, month);

  const options = {
    chart: { type: "bar", toolbar: { show: true } },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%", endingShape: "flat" },
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
      title: { text: "Energy Consumption (kWh)", style: { color: "#D1D5DB", fontSize: "12px" } },
      labels: { style: { colors: "#D1D5DB" }, formatter: (value) => formatNumberForDisplay(value) },
    },
    fill: { opacity: 1, colors: ["#FFA500", "#00FF00"] },
    legend: { position: "bottom", horizontalAlign: "center", labels: { colors: "#D1D5DB" } },
    tooltip: { theme: "dark", style: { fontSize: "12px" } },
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
              {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m, index) => (
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
      <ReactApexChart options={options} series={data.series} type="bar" height={Labeling.chart.height} />
    </div>
  );
};

export default MonthlyKwhPln;

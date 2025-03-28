import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Labeling from "../../../share-components/Labeling";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const YearlyKwhPln = () => {
  const [year, setYear] = useState(2025);

  const getData = () => {
    const categories = [
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

    return {
      categories: categories,
      series: [
        {
          name: "Energy Consumption Plan",
          data: Array.from(
            { length: 12 },
            () => Math.floor(Math.random() * 5000) + 1000
          ),
        },
        {
          name: "Energy Consumption Actual",
          data: Array.from(
            { length: 12 },
            () => Math.floor(Math.random() * 4500) + 900
          ),
        },
      ],
    };
  };

  const data = getData();

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: true },
      height: Labeling.chart.height, // Match height with the previous component
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%", // Match with the previous component's columnWidth
        endingShape: "flat",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: data.categories,
      title: {
        text: "Months",
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
      opacity: 0.5,
      colors: ["#FFA500", "#00FF00"], // Consistent bar colors
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      labels: { colors: "#D1D5DB" },
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "12px" },
    },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg 4k:text-4xl font-bold text-gray-300">
          Yearly kWh PLN
        </h2>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              className="px-3 py-1 bg-blue-500 text-white rounded-md 4k:rounded-xl cursor-pointer"
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
        height={Labeling.chart.height}
      />
    </div>
  );
};

export default YearlyKwhPln;

import { useState } from "react";
import Chart from "react-apexcharts";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const YearlyEmission = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // Tahun default saat ini

  // Data untuk tampilan yearly (Apr - Mar)
  const getData = () => {
    return {
      categories: [
        "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
      ],
      series: [
        {
          name: "Actual Emission",
          type: "bar",
          data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000) + 1000),
        },
        {
          name: "Actual Accum Emission Yearly",
          type: "line",
          data: Array.from({ length: 12 }, (_, i) => (i + 1) * Math.floor(Math.random() * 2500)),
        },
        {
          name: "CAP Accum Yearly",
          type: "line",
          data: Array(12).fill(12000),
        },
      ],
      threshold: 12000,
    };
  };

  const data = getData();

  const options = {
    chart: { type: "line", height: 250, toolbar: { show: false } },
    xaxis: {
      categories: data.categories,
      title: {
        text: "Months",
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
        <h2 className="text-lg 4k:text-4xl font-semibold text-gray-300">
          Yearly Emission
        </h2>
        <div className="flex gap-4 items-center">
          {/* Dropdown untuk memilih tahun */}
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
      <Chart options={options} series={data.series} type="line" height={250} />
    </div>
  );
};

export default YearlyEmission;

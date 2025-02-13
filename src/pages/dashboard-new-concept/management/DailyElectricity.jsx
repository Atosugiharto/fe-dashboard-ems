import { useState } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const DailyElectricity = () => {
  const [selectedMonth, setSelectedMonth] = useState("Apr");

  // Mapping bulan ke angka
  const monthMap = {
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
    Jan: 1,
    Feb: 2,
    Mar: 3,
  };

  const getDaysInMonth = (month) => {
    const year = 2024; // Bisa diubah ke dinamis
    return dayjs(`${year}-${monthMap[month]}-01`).daysInMonth();
  };

  const days = Array.from(
    { length: getDaysInMonth(selectedMonth) },
    (_, i) => i + 1
  );

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    colors: ["#d38a0a", "#333333", "#2979FF"], // Kuning, Abu, Biru
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.4, opacityFrom: 0.5, opacityTo: 0.1 },
    },
    xaxis: {
      categories: days,
      labels: { style: { colors: "#fff" } },
      title: { text: "Tanggal", style: { color: "#fff" } },
    },
    yaxis: {
      title: { text: "kWh", style: { color: "#fff" } },
      labels: {
        style: { colors: "#fff" },
        formatter: (value) => formatNumberForDisplay(value), // Format angka di sumbu Y
      },
    },
    legend: { labels: { colors: "#fff" } },
    dataLabels: {
      enabled: true,
      style: { colors: ["#fff"], fontSize: "6px" },
      background: { enabled: false },
      borderRadius: 0,
      borderWidth: 0,
      dropShadow: { enabled: false },
      offsetY: -6,
      formatter: (value) => formatNumberForDisplay(value), // Tambahkan formatter untuk Data Labels
    },
    markers: {
      size: 4,
      shape: "circle",
      strokeWidth: 0,
    },
  };

  const series = [
    {
      name: "PLN Act",
      data: days.map(() => Math.floor(Math.random() * 5000) + 7000),
    },
    {
      name: "PLN Plan",
      data: days.map(() => Math.floor(Math.random() * 5000) + 18000),
    },
    {
      name: "Solar PV",
      data: days.map(() => Math.floor(Math.random() * 2000) + 4000),
    },
  ];

  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold mb-2">
          Daily Electricity Consumption
        </h2>
        <select
          className="bg-latar-select text-white px-3 py-1 rounded-md text-xs font-medium"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {Object.keys(monthMap).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <Chart options={options} series={series} type="area" height={"450px"} />
    </div>
  );
};

export default DailyElectricity;

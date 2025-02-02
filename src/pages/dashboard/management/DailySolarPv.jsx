import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Labeling from "../../../share-components/Labeling";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const DailySolarPv = () => {
  const [selectedDay, setSelectedDay] = useState(1); // Default to the 1st day
  const [month, setMonth] = useState(new Date().getMonth()); // Current month (0-indexed)
  const [year, setYear] = useState(new Date().getFullYear()); // Current year

  const getDaysInMonth = (year, month) => {
    return new Array(new Date(year, month + 1, 0).getDate())
      .fill(0)
      .map((_, i) => (i + 1).toString());
  };

  const numStacks = 10; // Jumlah potongan tiap bar agar mirip equalizer
  const getData = () => {
    const categories = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const rawData = Array.from(
      { length: 24 },
      () => Math.floor(Math.random() * 20000) + 1
    );

    const series = Array.from({ length: numStacks }, (_, i) => ({
      name: `Stack ${i + 1}`,
      data: rawData.map((value) =>
        value > i * 2000 ? Math.min(2000, value - i * 2000) : 0
      ),
    }));

    return { categories, series };
  };

  const data = getData();

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: true },
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
      custom: ({ series, dataPointIndex }) => {
        const total = series.reduce(
          (sum, serie) => sum + serie[dataPointIndex],
          0
        );

        return `
          <div style="
            background: #222; 
            padding: 8px 12px; 
            border-radius: 5px; 
            color: #fff; 
            font-size: 12px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
          ">
            <strong style="display: block; font-size: 14px; margin-bottom: 5px;">Solar PV Produce</strong>
            <span style="font-size: 13px;">${formatNumberForDisplay(
              total
            )}</span>
          </div>
        `;
      },
    },

    xaxis: {
      categories: data.categories,
      title: {
        text: "Time (Hours)",
        style: {
          color: "#D1D5DB", // Warna teks sumbu X (gray-300)
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          colors: "#D1D5DB", // Warna teks label sumbu X
        },
      },
    },
    yaxis: {
      title: {
        text: "Solar PV Produce",
        style: {
          color: "#D1D5DB", // Warna teks sumbu Y (gray-300)
          fontSize: "12px",
        },
      },
      labels: {
        style: {
          colors: "#D1D5DB", // Warna teks label sumbu Y
        },
        formatter: (value) => formatNumberForDisplay(value),
      },
    },
    fill: {
      opacity: 0.8,
      colors: ["#FFA500"], // Warna bar
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 4,
      colors: ["transparent"],
    },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-300">Daily Solar PV</h2>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <label htmlFor="day">Day</label>
            <select
              id="day"
              className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer"
              value={selectedDay}
              onChange={(e) => setSelectedDay(parseInt(e.target.value))}
            >
              {getDaysInMonth(year, month).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
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
      <ReactApexChart
        options={options}
        series={data.series}
        type="bar"
        height={Labeling.chart.height}
      />
    </div>
  );
};

export default DailySolarPv;

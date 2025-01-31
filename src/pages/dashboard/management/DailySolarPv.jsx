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

  const getData = () => {
    const categories = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Data jam 00:00 - 23:00
    const seriesData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100) + 1); // Random data

    return {
      categories,
      series: [
        {
          name: "Solar PV Produce",
          data: seriesData,
        },
      ],
    };
  };

  const data = getData();

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "flat",
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (val) => `${val.toFixed(2)}`, // Menampilkan value di atas bar
      style: {
        colors: ["#000"], // Warna teks
      },
    },
    tooltip: {
      theme: "dark", // Tema gelap untuk tooltip
      style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
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
      opacity: 1,
      colors: ["#FFA500"], // Warna bar
    },
    legend: {
      show: false,
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

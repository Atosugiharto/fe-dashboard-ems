import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Labeling from "../../../share-components/Labeling";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const DailyEmission = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [month, setMonth] = useState(new Date().getMonth()); // Current month (0-indexed)
  const [year, setYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (year, month) => {
    return new Array(new Date(year, month + 1, 0).getDate())
      .fill(0)
      .map((_, i) => (i + 1).toString());
  };

  const getData = () => {
    const categories = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Data jam 00:00 - 23:00
    const seriesData = Array.from(
      { length: 24 },
      () => Math.floor(Math.random() * 100) + 1
    ); // Random data

    return {
      categories,
      series: [
        {
          name: "Emissions",
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
      height: Labeling.chart.height, // Match height with the first component
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%", // Match with the first component's columnWidth
        endingShape: "flat",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
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
          color: "#D1D5DB",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          colors: "#D1D5DB",
        },
      },
    },
    yaxis: {
      title: {
        text: "Emissions (Ton)",
        style: {
          color: "#D1D5DB",
          fontSize: "12px",
        },
      },
      labels: {
        style: {
          colors: "#D1D5DB",
        },
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
      opacity: 0.5,
      colors: ["#808080"], // Color for emissions
    },
    legend: {
      show: false,
    },
    annotations: {
      yaxis: [
        {
          y: 50, // Threshold value
          borderColor: "#FF0000",
          label: {
            borderColor: "#FF0000",
            style: {
              color: "#fff",
              background: "#FF0000",
            },
            text: `CAP 50,00`,
          },
        },
      ],
    },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg 4k:text-4xl font-bold text-gray-300 mb-4">
          Daily Emission
        </h2>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <label htmlFor="date">Date</label>
            <select
              id="day"
              className="px-3 py-1 bg-blue-500 text-white rounded-md 4k:rounded-xl cursor-pointer"
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
              className="px-3 py-1 bg-blue-500 text-white rounded-md 4k:rounded-xl cursor-pointer"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
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

export default DailyEmission;

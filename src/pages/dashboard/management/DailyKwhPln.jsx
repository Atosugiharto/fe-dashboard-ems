/* eslint-disable no-unused-vars */
import Chart from "react-apexcharts";
import Labeling from "../../../share-components/Labeling";
import { useDashboard } from "../useDashboard";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const DailyKwhPln = () => {
  const { items, status, error } = useDashboard();
  console.log(items, "data");

  const options = {
    chart: {
      type: "bar",
      height: 250, // Set the height to match KwhPerEquipment component
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: Array.from(
        { length: 24 },
        (_, i) => `${i.toString().padStart(2, "0")}:00`
      ), // Jam 00:00 - 23:00
      title: {
        text: "Time (Hours)",
        style: {
          color: "#D1D5DB",
          fontSize: "14px",
        },
      },
      labels: {
        rotate: 0, // Pastikan tidak miring
        style: {
          colors: Array(24).fill("#D1D5DB"),
          fontSize: "12px",
        },
      },
      scrollbar: {
        enabled: true,
      },
    },
    yaxis: {
      title: {
        text: "Energy Consumption (kWh)",
        style: {
          color: "#D1D5DB",
          fontSize: "12px",
        },
      },
      labels: {
        style: {
          colors: "#D1D5DB",
          fontSize: "12px",
        },
        formatter: (value) => formatNumberForDisplay(value),
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%", // Adjust column width to match the KwhPerEquipment style
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#FFA500", "#00FF00"], // Warna bar (orange dan hijau)
    fill: {
      type: "pattern",
      pattern: {
        style: ["horizontalLines", "horizontalLines"],
        width: 5,
        height: 10,
        strokeWidth: 15,
      },
      opacity: 0.8,
      colors: ["#FFA500", "#00FF00"], // Matching fill color with the bars
    },
    stroke: { width: 0 },
    tooltip: {
      theme: "dark", // Tooltip dengan tema gelap
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
    legend: {
      labels: { colors: "#D1D5DB" },
    },
  };

  const series = [
    {
      name: "Energy Consumption Plan",
      data: [
        2000, 3204, 2910, 4656, 3974, 6359, 6360, 10176, 10179, 10179, 6362,
        2426, 3883, 4500, 4800, 5000, 5200, 5500, 5700, 5900, 6100, 6300, 6500,
        6700,
      ],
    },
    {
      name: "Energy Consumption Actual",
      data: [
        1500, 3000, 2500, 4000, 3500, 6200, 6200, 9000, 9500, 10000, 6000, 2000,
        3500, 4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000,
      ],
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-300">Daily kWh PLN</h2>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <label htmlFor="">Date</label>
            <select className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer">
              <option value="monthly">1</option>
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="">Month</label>
            <select className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer">
              <option value="monthly">Apr</option>
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="">Year</label>
            <select className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer">
              <option value="monthly">2025</option>
            </select>
          </div>
        </div>
      </div>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={250} // Adjust height to match KwhPerEquipment component
      />
    </div>
  );
};

export default DailyKwhPln;

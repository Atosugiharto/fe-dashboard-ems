import { useState } from "react";
import Chart from "react-apexcharts";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const KwhPerEquipment = () => {
  const [selectedEquipment, setSelectedEquipment] = useState("Lampu");
  const equipmentList = [
    "Lampu",
    "AHU",
    "AC Server",
    "Chiller",
    "CHWP",
    "Motor Pump",
    "Lift",
    "Panel PD",
    "Other",
  ];

  const options = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: { show: true },
    },
    xaxis: {
      categories: Array.from(
        { length: 24 },
        (_, i) => `${i.toString().padStart(2, "0")}:00`
      ),
      labels: {
        style: {
          fontSize: "12px",
          colors: Array(24).fill("#D1D5DB"),
        },
      },
    },
    yaxis: {
      title: {
        text: "Total Consumption (kWh)",
        style: { color: "#D1D5DB", fontSize: "12px" },
      },
      labels: {
        style: { colors: "#D1D5DB", fontSize: "12px" },
        formatter: (value) => formatNumberForDisplay(value),
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: false,
        columnWidth: "40%",
        dataLabels: { position: "top" },
      },
    },
    colors: ["#FFA500", "#00FF00"],
    fill: {
      type: "pattern",
      pattern: {
        style: ["horizontalLines", "horizontalLines"],
        width: 5,
        height: 10,
        strokeWidth: 15,
      },
      opacity: 0.8,
      colors: ["#FFA500", "#00FF00"],
    },
    stroke: { width: 0 },
    legend: {
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
    dataLabels: {
      enabled: false,
      formatter: (value) => formatNumberForDisplay(value),
    },
  };

  const series = [
    {
      name: "Plan",
      data: Array.from({ length: 24 }, () => (Math.random() * 5).toFixed(2)),
    },
    {
      name: "Actual",
      data: Array.from({ length: 24 }, () => (Math.random() * 5).toFixed(2)),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg 4k:text-4xl font-bold text-gray-300">
          Daily kWh / Equipment
        </h2>
        <div>
          <label htmlFor="equipment-select" className="mr-2 text-gray-300">
            Select Equipment:
          </label>
          <select
            id="equipment-select"
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-gray-300 rounded px-2 py-1"
          >
            {equipmentList.map((equipment) => (
              <option key={equipment} value={equipment}>
                {equipment}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default KwhPerEquipment;

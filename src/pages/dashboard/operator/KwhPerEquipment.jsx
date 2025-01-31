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
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: Array.from(
        { length: 24 },
        (_, i) => `${i.toString().padStart(2, "0")}:00`
      ), // Jam 00:00 - 23:00,
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
        borderRadius: 0,
        horizontal: false,
      },
    },
    colors: ["#FFA500", "#00FF00"],
    fill: {
      opacity: 1,
    },
    legend: {
      labels: {
        colors: "#D1D5DB",
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
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
        <h2 className="text-lg font-bold text-gray-300">
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

import { useState } from "react";
import Chart from "react-apexcharts";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const KwhPerFloor = () => {
  const [selectedFloor, setSelectedFloor] = useState("lantai1");
  const dataFloor = [
    "lantai1", "val1_annex", "lantai2", "val2_annex", "lantai3", "val3_annex",
    "lantai4", "lantai5", "lantai6", "lantai7", "lantai8", "valExternal", "valGround"
  ];

  const options = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: [
        "PP-GL",
        "LP-GL",
        "LP-GR",
        "AHU1-GL",
        "AHU2-GL",
        "AHU3-GL",
        "AHU4-GL",
        "PLTS",
        "P-Outgoing",
      ],
      labels: {
        style: {
          fontSize: "12px",
          colors: Array(9).fill("#D1D5DB"),
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
    dataLabels: {
      enabled: false,
      formatter: (value) => formatNumberForDisplay(value),
    },
  };

  const series = [
    {
      name: "Plan",
      data: [4.5, 4.3, 4.2, 4.1, 4.0, 4.3, 4.1, 4.2, 4.3],
    },
    {
      name: "Actual",
      data: [4.17, 4.59, 4.26, 4.08, 4.33, 4.33, 4.16, 4.33, 4.16],
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-300">Daily kWh / Floor</h2>
        <div>
          <label htmlFor="floor-select" className="mr-2 text-gray-300">
            Select Floor:
          </label>
          <select
            id="floor-select"
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-gray-300 rounded px-2 py-1"
          >
            {dataFloor.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default KwhPerFloor;

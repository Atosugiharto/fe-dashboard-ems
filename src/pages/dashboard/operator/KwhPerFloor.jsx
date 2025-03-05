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
        columnWidth: "40%", // Menyesuaikan lebar bar
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#FFA500", "#00FF00"], // Warna untuk Plan & Actual
    fill: {
      type: "pattern",
      pattern: {
        style: ["horizontalLines", "horizontalLines"], // Pola garis horizontal
        width: 5,
        height: 10,
        strokeWidth: 15,
      },
      opacity: 0.8,
    },
    stroke: {
      width: 0,
    },
    legend: {
      labels: {
        colors: "#D1D5DB",
      },
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
        <h2 className="text-lg 4k:text-4xl font-bold text-gray-300">
          Daily kWh / Floor
        </h2>
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

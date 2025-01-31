import Chart from "react-apexcharts";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const KwhFloor = () => {
  const data = [
    "lantai1",
    "val1_annex",
    "lantai2",
    "val2_annex",
    "lantai3",
    "val3_annex",
    "lantai4",
    "lantai5",
    "lantai6",
    "lantai7",
    "lantai8",
    "valExternal",
    "valGround",
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
      categories: data,
      labels: {
        style: {
          fontSize: "12px",
          colors: Array(data.length).fill("#D1D5DB"), // Semua teks di sumbu X menjadi gray-300
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
        colors: "#D1D5DB", // Warna teks legend
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
      data: [18, 22, 10, 8, 7, 19, 7, 6, 6, 6, 35, 5, 1],
    },
    {
      name: "Actual",
      data: [
        16.7, 24.8, 8.2, 6.9, 6.7, 20.6, 6.2, 6.5, 5.3, 5.7, 36.7, 4.2, 0.8,
      ],
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-300">Daily kWh Floor</h2>
      </div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default KwhFloor;

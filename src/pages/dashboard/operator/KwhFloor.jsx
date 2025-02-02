import Chart from "react-apexcharts";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const KwhFloor = () => {
  const catergoryData = [
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

  const getData = () => {
    const categories = catergoryData;

    const planData = [18, 22, 10, 8, 7, 19, 7, 6, 6, 6, 35, 5, 1];
    const actualData = [
      16.7, 24.8, 8.2, 6.9, 6.7, 20.6, 6.2, 6.5, 5.3, 5.7, 36.7, 4.2, 0.8,
    ];

    const series = [
      {
        name: "Plan",
        data: planData,
      },
      {
        name: "Actual",
        data: actualData,
      },
    ];

    return { categories, series };
  };

  const data = getData();

  const options = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: data.categories,
      labels: {
        style: {
          fontSize: "12px",
          colors: Array(data.categories.length).fill("#D1D5DB"),
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
        barSpacing: 10,
        columnWidth: "40%", // Mengontrol lebar bar
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#FFA500", "#00FF00"], // Warna untuk Plan & Actual
    fill: {
      type: "pattern",
      pattern: {
        style: ["horizontalLines", "horizontalLines"], // Pola garis horizontal dan vertikal
        width: 5,
        height: 10,
        strokeWidth: 15,
      },
      opacity: 0.8,
      colors: ["#FFA500", "#00FF00"], // Memastikan ada dua warna untuk Plan dan Actual
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-300">Daily kWh Floor</h2>
      </div>
      <Chart options={options} series={data.series} type="bar" height={250} />
    </div>
  );
};

export default KwhFloor;

import Chart from "react-apexcharts";
import Labeling from "../../../share-components/Labeling";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const VoltagePln = () => {
  const options = {
    chart: {
      type: "area",
      height: 250,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    xaxis: {
      categories: [
        "00:00", "02:00", "04:00", "06:00", "08:00", "10:00",
        "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"
      ],
      labels: {
        style: {
          colors: Array(12).fill("#D1D5DB"),
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Volt (V)",
        style: {
          color: "#D1D5DB",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          colors: "#D1D5DB",
          fontSize: "12px",
        },
        formatter: (value) => formatNumberForDisplay(value),
      },
      min: 0,
      max: 250,
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#008000"], // Line color remains green
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.2,
        stops: [0, 100],
        colors: ["#008000"], // Gradient color remains green
      },
    },
    markers: {
      size: 4,
      colors: ["#008000"], // Marker color remains green
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => formatNumberForDisplay(value),
      offsetY: -10,
      style: {
        colors: ["#111827"], // Text color on data labels changed to gray-900
        background: "#FFF", // White background for data labels
      },
    },
    colors: ["#008000"], // Keep green color for the line and markers
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
    },
    legend: {
      labels: {
        colors: "#D1D5DB",
      },
    },
  };

  const series = [
    {
      name: "Voltage",
      data: [224.93, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 0],
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg 4k:text-4xl font-bold text-gray-300">
          Daily Voltage PLN
        </h2>
      </div>
      <Chart
        options={options}
        series={series}
        type="area"
        height={Labeling.chart.height}
      />
    </div>
  );
};

export default VoltagePln;

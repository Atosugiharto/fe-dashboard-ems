import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Labeling from "../../../share-components/Labeling";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const YearlySolarPv = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // Current year

  const getData = () => {
    const monthNames = [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ];
    const productionData = monthNames.map(
      () => Math.floor(Math.random() * 1500) + 500
    ); // Random production data for each month

    return {
      categories: monthNames,
      series: [
        {
          name: "Solar PV Produce",
          data: productionData,
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
        columnWidth: "40%", // Menyesuaikan dengan YearlyKwhPln
        endingShape: "flat",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.categories,
      title: {
        text: "Months",
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
        text: "Solar PV Produce",
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
      opacity: 0.8,
      colors: ["#FFA500", "#00FF00"], // Warna bar disamakan dengan YearlyKwhPln
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      labels: { colors: "#D1D5DB" },
    },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-300">Yearly Solar PV</h2>
        <div className="flex gap-2 items-center">
          <label htmlFor="">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
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

export default YearlySolarPv;

import { useState } from "react";
import Chart from "react-apexcharts";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const dataByYear = {
  2023: {
    actual: [
      244.94, 208.48, 236.91, 229.86, 268.82, 203.4, 225.43, 211.52, 232.08,
      207.53, 232.51, 214.94,
    ],
    planning: [
      250.53, 264.1, 264.71, 217.27, 222.67, 238.09, 291.35, 247.87, 297.3,
      295.35, 235.7, 218.99,
    ],
  },
  2024: {
    actual: [
      260.12, 220.45, 245.67, 240.21, 275.43, 215.32, 230.98, 220.76, 245.12,
      215.87, 240.23, 225.65,
    ],
    planning: [
      270.65, 280.2, 275.4, 230.5, 235.8, 250.6, 300.7, 260.1, 310.8, 305.6,
      245.9, 230.3,
    ],
  },
  2025: {
    actual: [
      275.4, 230.8, 260.1, 250.3, 285.7, 225.6, 245.9, 230.2, 260.3, 225.4,
      250.1, 235.6,
    ],
    planning: [
      290.1, 295.5, 280.3, 245.6, 250.8, 265.9, 320.1, 280.5, 330.2, 315.7,
      260.8, 250.5,
    ],
  },
};

const threshold = 280;

const MonthlyElectricity = () => {
  const [selectedYear, setSelectedYear] = useState(2023);

  const actualData = dataByYear[selectedYear].actual;
  const planningData = dataByYear[selectedYear].planning;

  const planningVisibleData = planningData.map((value, index) =>
    value > actualData[index] ? value - actualData[index] : 0
  );

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      stacked: true,
    },
    colors: ["#d38a0a", "#24282c"],
    plotOptions: { bar: { horizontal: false, columnWidth: "80%" } },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
        fontSize: "7px",
      },
      formatter: (val, { seriesIndex, dataPointIndex }) =>
        formatNumberForDisplay(seriesIndex === 1 ? planningData[dataPointIndex] : val),
    },
    annotations: {
      yaxis: [
        {
          y: threshold,
          borderColor: "red",
          label: {
            borderColor: "red",
            style: { color: "#fff", background: "red" },
            text: `Avg Last Year (${formatNumberForDisplay(threshold)})`,
          },
        },
      ],
    },
    tooltip: {
      y: {
        formatter: (val, { seriesIndex, dataPointIndex }) =>
          `${formatNumberForDisplay(seriesIndex === 1 ? planningData[dataPointIndex] : val)} kWh`,
      },
    },
    legend: {
      labels: { colors: "#fff" },
      markers: {
        radius: "100%", // Membuat bentuknya bulat
      },
      position: "bottom",
    },
    xaxis: {
      categories: [
        "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
      ],
      labels: { style: { colors: "#fff" } },
    },
    yaxis: {
      title: { text: "kWh", style: { color: "#fff" } },
      labels: {
        style: { colors: "#fff" },
        formatter: (value) => formatNumberForDisplay(value),
      },
    },
    grid: { show: true, strokeDashArray: 2 },
  };

  const series = [
    { name: "Actual", data: actualData },
    { name: "Planning", data: planningVisibleData },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-white font-bold">Monthly Electricity Consumption</h3>
        <div>
          <select
            id="year"
            className="text-xs px-3 py-1 bg-latar-select text-white rounded-md cursor-pointer font-medium"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <option value={2023}>FY&lsquo;23</option>
            <option value={2024}>FY&lsquo;24</option>
            <option value={2025}>FY&lsquo;25</option>
          </select>
        </div>
      </div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default MonthlyElectricity;

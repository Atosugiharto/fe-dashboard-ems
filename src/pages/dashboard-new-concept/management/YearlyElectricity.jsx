import { useState } from "react";
import Chart from "react-apexcharts";
import { formatNumberForDisplay } from "../../../share-components/Helper";

const dataByYear = {
  "20-24": {
    actual: [244.94, 208.48, 236.91, 229.86, 268.82],
    planning: [250.53, 264.1, 264.71, 217.27, 222.67],
  },
};

const YearlyElectricity = () => {
  const [selectedYear, setSelectedYear] = useState("20-24");

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
        formatNumberForDisplay(
          seriesIndex === 1 ? planningData[dataPointIndex] : val
        ),
    },
    tooltip: {
      y: {
        formatter: (val, { seriesIndex, dataPointIndex }) =>
          `${formatNumberForDisplay(
            seriesIndex === 1 ? planningData[dataPointIndex] : val
          )} kWh`,
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
      categories: ["FY'20", "FY'21", "FY'22", "FY'23", "FY'24"],
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
        <h3 className="text-white font-bold">Yearly Electricity Consumption</h3>
        <div>
          <select
            id="year"
            className="text-xs px-3 py-1 bg-latar-select text-white rounded-md cursor-pointer font-medium"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value={"20-24"}>FY&lsquo;20-FY&lsquo;24</option>
            {/* <option value={"25-29"}>FY&lsquo;25-FY&lsquo;29</option> */}
          </select>
        </div>
      </div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default YearlyElectricity;

import Chart from 'react-apexcharts';  
import 'apexcharts';  
import { formatNumberForDisplay } from '../../../share-components/Helper';

const DailyKwhEveryEquipment = () => {
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
        "Lampu",
        "AHU",
        "AC Server",
        "Chiller",
        "CHWP",
        "Motor Pump",
        "Lift",
        "Panel PD",
        "Other",
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
        barSpacing: 10, // Menambahkan jarak antar bar
        columnWidth: "40%", // Mengatur lebar kolom
        dataLabels: {
          position: "top", // Posisi data label di atas bar
        },
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
      data: [90, 65, 5, 3.5, 10, 7, 11, 15, 22],
    },
    {
      name: "Actual",
      data: [95.05, 70.47, 4.13, 4.09, 12.45, 8.34, 12.25, 16.7, 25.21],
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg 4k:text-4xl font-bold text-gray-300">
          Daily kWh Every Equipment
        </h2>
      </div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};  
  
export default DailyKwhEveryEquipment;

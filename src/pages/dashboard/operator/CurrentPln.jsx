import Chart from "react-apexcharts";  
import Labeling from "../../../share-components/Labeling";  
import { formatNumberForDisplay } from "../../../share-components/Helper";
  
const CurrentPln = () => {  
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
        text: "Ampere (A)",  
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
      max: 15,  
    },  
    stroke: {  
      curve: "smooth",  
      width: 3,  
      colors: ["#FF0000"], // Warna garis tetap merah  
    },  
    fill: {  
      type: "gradient",  
      gradient: {  
        shadeIntensity: 1,  
        opacityFrom: 0.6,  
        opacityTo: 0.2,  
        stops: [0, 100],  
        colors: ["#FF0000"],  
      },  
    },  
    markers: {  
      size: 4,  
      colors: ["#FF0000"],  
    },  
    dataLabels: {  
      enabled: true,  
      formatter: (value) => formatNumberForDisplay(value),  
      offsetY: -10,  
      style: {  
        colors: ["#111827"], // Warna teks nilai di atas garis berubah menjadi gray-900  
        background: "#FFF", // Bisa diubah jika ingin latar belakang lain  
      },  
    },  
    colors: ["#FF0000"],  
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
      name: "Current",  
      data: [12.51, 12.51, 12.51, 12.51, 12.51, 12.51, 12.51, 12.51, 12.51, 12.51, 12.51, 0],  
    },  
  ];  
  
  return (  
    <div className="p-4">  
      <div className="flex justify-between items-center mb-4">  
        <h2 className="text-lg font-bold text-gray-300">Daily Current PLN</h2>  
      </div>  
      <Chart options={options} series={series} type="area" height={Labeling.chart.height} />  
    </div>  
  );  
};  
  
export default CurrentPln;

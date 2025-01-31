import Chart from 'react-apexcharts';  
import 'apexcharts';  
import { formatNumberForDisplay } from '../../../share-components/Helper';
  
const DailyKwhEveryEquipment = () => {  
  const options = {  
    chart: {  
      type: 'bar',  
      height: 250,  
      toolbar: {  
        show: true,  
      },  
    },
    xaxis: {  
      categories: ['Lampu', 'AHU', 'AC Server', 'Chiller', 'CHWP', 'Motor Pump', 'Lift', 'Panel PD', "Other" ],  
      labels: {  
        style: {  
          fontSize: '12px',  
          colors: Array(9).fill('#D1D5DB'),  
        },  
      },  
    },  
    yaxis: {  
      title: {  
        text: 'Total Consumption (kWh)',  
        style: {  
          color: '#D1D5DB',  
          fontSize: '12px',  
        },  
      },  
      labels: {  
        style: {  
          colors: '#D1D5DB',  
          fontSize: '12px',  
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
    colors: ['#FFA500', '#00FF00'],  
    fill: {  
      opacity: 1,  
    },  
    legend: {  
      labels: {  
        colors: '#D1D5DB',  
      },  
    },  
    tooltip: {  
      theme: 'dark',  
      style: {  
        fontSize: '12px',  
      },  
    },  
    dataLabels: {  
      enabled: false,  
      formatter: (value) => formatNumberForDisplay(value),
    }
  };  
  
  const series = [  
    {  
      name: 'Plan',  
      data: [90, 65, 5, 3.5, 10, 7, 11, 15, 22],  
    },  
    {  
      name: 'Actual',  
      data: [95.05, 70.47, 4.13, 4.09, 12.45, 8.34, 12.25, 16.7, 25.21],  
    },  
  ];  
  
  return (  
    <div className="p-4">  
      <div className="flex justify-between items-center mb-4">  
        <h2 className="text-lg font-bold text-gray-300">Daily kWh Every Equipment</h2>  
      </div>  
      <Chart options={options} series={series} type="bar" height={250} /> 
    </div>  
  );  
};  
  
export default DailyKwhEveryEquipment;

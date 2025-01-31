import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const TotalCaseChart = () => {
  const [chartHeight, setChartHeight] = useState(250); // Default chart height
  const [fontSize, setFontSize] = useState({
    xaxis: "12px",
    yaxis: "12px",
    title: "text-lg",
    legend: "12px",
  });

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        // For larger screens (4K resolution)
        setChartHeight(400);
        setFontSize({
          xaxis: "17px",
          yaxis: "17px",
          title: "text-3xl",
          legend: "18px",
        });
      } else {
        // Default settings for smaller screens
        setChartHeight(250);
        setFontSize({
          xaxis: "12px",
          yaxis: "12px",
          title: "text-lg",
          legend: "12px",
        });
      }
    };

    // Initial update
    updateResponsiveSettings();

    // Add resize listener
    window.addEventListener("resize", updateResponsiveSettings);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  const data = [10, 4, 8, 14, 11, 16, 6, 13, 9, 6, 5, 3];
  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const colors = [
    "#00FF00", // Green
    "#FFFF00", // Yellow
    "#FF0000", // Red
  ];

  const series = [
    {
      name: "Cases",
      data,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    colors: data.map((value) => {
      if (value <= 5) return colors[0];
      if (value <= 10) return colors[1];
      return colors[2];
    }),
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      title: {
        text: "2024",
        offsetY: 5,
        style: {
          fontSize: fontSize.xaxis,
        },
      },
      labels: {
        style: {
          fontSize: fontSize.xaxis,
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Cases",
        style: {
          fontSize: fontSize.yaxis,
        },
      },
      labels: {
        style: {
          fontSize: fontSize.yaxis,
        },
      },
    },
    legend: {
      show: true,
      fontSize: fontSize.legend, // Responsive font size for legend
      markers: {
        fillColors: colors,
      },
      labels: {
        colors: ["#000"],
        useSeriesColors: false,
      },
      customLegendItems: ["≥ 10", "< 10", "≤ 5"],
      position: "top",
      horizontalAlign: "right",
    },
  };

  return (
    <div className="flex p-2 flex-col items-center">
      <div className="w-full">
        {/* Title */}
        <h2 className={`font-bold ${fontSize.title}`}>Total Case</h2>
        {/* Chart */}
        <Chart
          options={options}
          series={series}
          type="bar"
          height={chartHeight}
        />
      </div>
    </div>
  );
};

export default TotalCaseChart;

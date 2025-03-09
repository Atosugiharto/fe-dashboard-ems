/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import {
  fetchTimeApi,
  formatNumberForDisplay,
} from "../../../share-components/Helper";
import { utils, writeFile } from "xlsx";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import { baseApiUrl } from "../../../share-components/api";
import axios from "axios";
import GlobalVariable from "../../../share-components/GlobalVariable";
import { useRef } from "react";

const HourlyConsumptionTwoData = ({
  apiUrl = "",
  menu = "",
  isPressFan = false,
  isEksternal = false,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [firtsData, setfirtsData] = useState([]);
  const [secondData, setsecondData] = useState([]);
  const labelPressFan = ["PP-PF", "LP-Press Fan"];
  const labelEksternal = ["Carpool", "Koperasi"];

  const [responsive, setResponsive] = useState({
    chartHeight: 250,
    xaxis: "12px",
    yaxis: "12px",
    title: "text-lg",
  });

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        setResponsive({
          chartHeight: 500,
          xaxis: "26px",
          yaxis: "26px",
          title: "text-3xl",
        });
      } else {
        setResponsive({
          chartHeight: 250,
          xaxis: "12px",
          yaxis: "12px",
          title: "text-lg",
        });
      }
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) =>
    dayjs().hour(i).format("HH.00")
  );

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/${apiUrl}`, {
        date: selectedDate,
      });

      let actual1 = {};
      let actual2 = {};
      const result = response?.data?.data;

      if (result) {
        const pressfan1 = result["Panel PP-PF"]?.data || {};
        const pressfan2 = result["Panel LP-Press Fan"]?.data || {};

        const eksternal1 = result["Panel P-Carpool"]?.data || {};
        const eksternal2 = result["Panel P-Koperasi"]?.data || {};

        const finalData1 = isEksternal ? eksternal1 : isPressFan && pressfan1;
        const finalData2 = isEksternal ? eksternal2 : isPressFan && pressfan2;
        hours.forEach((hour) => {
          actual1[hour] = finalData1[hour]?.totalKWh ?? 0;
          actual2[hour] = finalData2[hour]?.totalKWh ?? 0;
        });
      }

      setfirtsData(hours.map((hour) => actual1[hour] || 0));
      setsecondData(hours.map((hour) => actual2[hour] || 0));
    } catch (error) {
      setfirtsData(hours.map(() => 0));
      setsecondData(hours.map(() => 0));
      console.error("Error fetching data:", error);
    }
  };

  const intervalRef = useRef(null);
  useEffect(() => {
    fetchData();

    const delay = fetchTimeApi();

    const timeoutId = setTimeout(() => {
      fetchData();
      intervalRef.current = setInterval(fetchData, 60 * 60 * 1000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedDate]);

  const series = [
    {
      name: isEksternal ? labelEksternal[0] : isPressFan && labelPressFan[0],
      data: firtsData,
    },
    {
      name: isEksternal ? labelEksternal[1] : isPressFan && labelPressFan[1],
      data: secondData,
    },
  ];

  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    colors: [
      GlobalVariable.dashboardColor.barBiru,
      GlobalVariable.dashboardColor.lineOren,
    ],
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      categories: hours,
      labels: {
        style: { colors: "#fff", fontSize: responsive.xaxis },
      },
      title: {
        text: "Hour",
        style: { color: "#fff", fontSize: responsive.xaxis },
      },
    },
    yaxis: {
      title: {
        text: "kWh",
        style: { color: "#fff", fontSize: responsive.yaxis },
      },
      labels: {
        style: { colors: "#fff", fontSize: responsive.yaxis },
        formatter: (value) => formatNumberForDisplay(value),
      },
    },
    legend: { labels: { colors: "#fff", fontSize: responsive.xaxis } },
    markers: {
      size: 4,
    },
    grid: { show: true, strokeDashArray: 2 },
  };

  const downloadExcel = () => {
    const data = hours.map((hour, index) => ({
      Date: selectedDate,
      Hour: hour,
      [isEksternal ? labelEksternal[0] : isPressFan && labelPressFan[0]]:
        series[0].data[index],
      [isEksternal ? labelEksternal[1] : isPressFan && labelPressFan[1]]:
        series[1].data[index],
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, `Hourly_${menu}`);
    writeFile(wb, `Hourly_${menu}-${selectedDate}.xlsx`);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg 4k:text-4xl font-semibold mb-2">
          Hourly Equipment Consumption
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="bg-latar-select text-white px-3 py-1 rounded-md 4k:rounded-xl text-xs 4k:text-3xl 4k:py-2 4k:px-6 font-medium"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            onClick={downloadExcel}
            className="bg-latar-icon-hijau text-white rounded p-1"
          >
            <DocumentArrowDownIcon className="h-4 w-auto 4k:h-14" />
          </button>
        </div>
      </div>
      <Chart
        options={options}
        series={series}
        type="line"
        height={responsive.chartHeight}
      />
    </div>
  );
};

export default HourlyConsumptionTwoData;

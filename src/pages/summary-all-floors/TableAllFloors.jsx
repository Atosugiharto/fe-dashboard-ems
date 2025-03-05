/* eslint-disable react/prop-types */
import { Circle, Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { formatNumberForDisplayDynamic } from "../../share-components/Helper";

const TableAllFloors = ({ data }) => {
  const [datas, setDatas] = useState([]);
  const [responsive, setResponsive] = useState({
    iconSize: 25,
  });

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        // For 4K resolution
        setResponsive({
          iconSize: 60,
        });
      } else {
        // Default settings for smaller screens
        setResponsive({
          iconSize: 25,
        });
      }
    };

    // Initial check
    updateResponsiveSettings();

    // Add resize listener
    window.addEventListener("resize", updateResponsiveSettings);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  useEffect(() => {
    const formattedData = [
      {
        label: "Total Consumption (kWh)",
        planning: formatNumberForDisplayDynamic(data?.total_plan_kW_all) || 0,
        actual: formatNumberForDisplayDynamic(data?.total_kW_all) || 0,
      },
      {
        label: "Total Cost (IDR)",
        planning: formatNumberForDisplayDynamic(data?.total_plan_cost_all) || 0,
        actual: formatNumberForDisplayDynamic(data?.total_cost_all) || 0,
      },
      {
        label: "Total Emission (Ton CO2e)",
        planning:
          formatNumberForDisplayDynamic(data?.total_plan_emisi_all) || 0,
        actual: formatNumberForDisplayDynamic(data?.total_emisi_all) || 0,
      },
      {
        label: "Evaluation",
        planning: null,
        actual: data?.eval,
      },
    ];
    setDatas(formattedData);
  }, [data]);

  return (
    <div className="w-full mx-auto text-white font-semibold rounded-lg text-sm 4k:text-4xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-latar-header-table-input-setting">
            <th className="py-3 px-4 text-left"> </th>
            <th className="py-3 px-4 text-center">Planning</th>
            <th className="py-3 px-4 text-center">Actual</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((row, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-dashboard-table-abu-tua"
                  : "bg-dashboard-table-abu"
              }
            >
              <td className="py-6 px-4 font-semibold">{row.label}</td>
              <td className="py-6 px-4 text-center">
                {row.planning !== null ? row.planning : ""}
              </td>
              <td className="py-6 px-4 text-center">
                {row.label === "Evaluation" ? (
                  row.actual === 1 ? (
                    <Circle
                      className="text-dashboard-gauge-hijau inline"
                      style={{ fontSize: responsive.iconSize }}
                    />
                  ) : row.actual === 0 ? (
                    <Close
                      className="text-dashboard-bar-merah inline"
                      style={{ fontSize: responsive.iconSize }}
                    />
                  ) : (
                    ""
                  )
                ) : (
                  row.actual
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAllFloors;

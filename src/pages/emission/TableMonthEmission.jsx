import { Circle, Close } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { baseApiUrl } from "../../share-components/api";

const TableMonthEmission = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/tableMonthlyEmisi`);
        const result = response?.data?.data;

        if (result) {
          // Struktur ulang data sesuai dengan format yang diinginkan
          const formattedData = [
            {
              label: "A. Total Emission",
              planning: result?.totalEmisi?.planEmisi || 0,
              actual: result?.totalEmisi?.totalEmisi || 0,
              eval: result?.totalEmisi?.eval,
            },
            { label: "B. Nett Off", planning: "", actual: "", eval: null },
            {
              label: " • Solar PV",
              planning: `${result?.netOff?.emisiPlanPV || 0} (${
                result?.netOff?.percentagePlanPV || 0
              }%)`,
              actual: `${result?.netOff?.emisiPV || 0} (${
                result?.netOff?.percentageActPV || 0
              }%)`,
              eval: result?.netOff?.evalPV,
            },
            {
              label: " • REC",
              planning: `${result?.netOff?.emisiPlanREC || 0} (${
                result?.netOff?.percentagePlanREC || 0
              }%)`,
              actual: `${result?.netOff?.emisiREC || 0} (${
                result?.netOff?.percentageActREC || 0
              }%)`,
              eval: result?.netOff?.evalREC,
            },
            {
              label: "Total Nett Off",
              planning: `${result?.totalNettOff?.totalPlan || 0} (${
                result?.totalNettOff?.percentageTotalPlan || 0
              }%)`,
              actual: `${result?.totalNettOff?.totalAct || 0} (${
                result?.totalNettOff?.percentageTotalActual || 0
              }%)`,
              eval: result?.totalNettOff?.eval,
            },
            {
              label: "Remaining",
              planning: result?.remaining?.planRemaining || 0,
              actual: result?.remaining?.actualRemaining || 0,
              eval: result?.remaining?.evalValue,
            },
          ];

          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto text-white font-semibold">
      <h2 className="mb-4">This Month</h2>
      <table className="w-full border-collapse text-sm 4k:text-4xl">
        <thead>
          <tr className="bg-dashboard-table-abu-muda">
            <th className="py-3 px-4 4k:py-6 4k:px-8 text-left"></th>
            <th className="py-3 px-4 4k:py-6 4k:px-8 text-center">Planning (Ton CO2e)</th>
            <th className="py-3 px-4 4k:py-6 4k:px-8 text-center">Actual (Ton CO2e)</th>
            <th className="py-3 px-4 4k:py-6 4k:px-8 text-center">EVAL</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index === data.length - 1
                    ? "bg-dashboard-table-abu-last border-t-2 border-white"
                    : index === 2 || index === 3
                    ? "bg-dashboard-table-abu-tua"
                    : index === 4
                    ? "bg-dashboard-table-abu-muda"
                    : index % 2 === 0
                    ? "bg-dashboard-table-abu-tua"
                    : "bg-dashboard-table-abu-muda"
                }`}
              >
                <td className="py-3 px-4 4k:py-6 4k:px-8 font-semibold">{row?.label}</td>
                <td className="py-3 px-4 4k:py-6 4k:px-8 text-center">{row?.planning}</td>
                <td className="py-3 px-4 4k:py-6 4k:px-8 text-center">{row?.actual}</td>
                <td className="py-3 px-4 4k:py-6 4k:px-8 text-center">
                  {row?.eval === 1 ? (
                    <Circle
                      className="text-dashboard-gauge-hijau inline"
                      size={20}
                    />
                  ) : row?.eval === 0 ? (
                    <Close
                      className="text-dashboard-bar-merah inline"
                      size={20}
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-400">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableMonthEmission;

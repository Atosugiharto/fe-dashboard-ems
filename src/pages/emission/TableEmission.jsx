import { Cloud } from "@mui/icons-material";
import { formatNumberForDisplayDynamic } from "../../share-components/Helper";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../../share-components/api";

const TableEmission = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/tableMonthlyEmisi`);
        const result = response?.data?.data;

        setData({
          label: "This Month",
          remaining: result?.remaining || 0,
          nettoff: result?.netOff || 0,
          nettoffPercentage: result?.percentageNettoff || 0,
          total: result?.total || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-white text-lg 4k:text-4xl font-semibold flex items-center mb-3">
        <span className="mr-2">
          <Cloud />
        </span>{" "}
        Emission Reduction (Ton CO2e)
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-dashboard-table-abu-muda text-white">
            <th className="py-2 px-4 text-left"></th>
            <th className="py-2 px-4 text-dashboard-bar-kuning">Total</th>
            <th className="py-2 px-4 text-dashboard-gauge-hijau">
              <p>Net Off</p>
              <p className="text-[9px]">(Solar PV + REC)</p>
            </th>
            <th className="py-2 px-4 text-dashboard-text-table-biru">Remaining</th>
          </tr>
        </thead>
        <tbody>
          {data && (
            <tr className="bg-dashboard-table-abu-tua">
              <td className="py-2 px-4 font-semibold text-white">{data.label}</td>
              <td className="py-2 px-4 text-center text-dashboard-bar-kuning">
                {formatNumberForDisplayDynamic(data.total)}
              </td>
              <td className="py-2 px-4 text-center text-dashboard-gauge-hijau border-gray-700">
                <p>{formatNumberForDisplayDynamic(data.nettoff)}</p>
                <p className="font-semibold">{`(${data.nettoffPercentage}%)`}</p>
              </td>
              <td className="py-2 px-4 text-center text-dashboard-text-table-biru">
                <p>{formatNumberForDisplayDynamic(data.remaining)}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableEmission;

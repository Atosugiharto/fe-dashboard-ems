/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  filterText,
  formatNumberForDisplayDynamic,
} from "../../share-components/Helper";

const TableEachFloor = ({ data }) => {
  const [floorsData, setFloorsData] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      setFloorsData(
        data?.map((item) => ({
          name: item?.floor || "-",
          consumption: formatNumberForDisplayDynamic(item?.total_kW) || "-",
          cost: formatNumberForDisplayDynamic(item?.total_cost) || "-",
          emission: formatNumberForDisplayDynamic(item?.total_emisi) || "-",
          rank: item?.rank || "-",
        }))
      );
    } else {
      setFloorsData([]);
    }
  }, [data]);

  return (
    <div className="w-full mx-auto text-white font-semibold rounded-md 4k:rounded-xl text-sm 4k:text-3xl max-h-72 4k:max-h-full overflow-y-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-latar-header-table-input-setting">
            <th className="py-3 px-4 text-left">Floors</th>
            <th className="py-3 px-4 text-center">Consumption (kWh)</th>
            <th className="py-3 px-4 text-center">Cost (IDR)</th>
            <th className="py-3 px-4 text-center">Emission (Ton CO2e)</th>
            <th className="py-3 px-4 text-center">Rank</th>
          </tr>
        </thead>
        <tbody>
          {floorsData.length > 0 ? (
            floorsData.map((floor, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-dashboard-table-abu-tua"
                    : "bg-dashboard-table-abu"
                }
              >
                <td className="py-3 px-4 font-semibold">
                  {filterText(floor.name)}
                </td>
                <td className="py-3 px-4 text-center">{floor.consumption}</td>
                <td className="py-3 px-4 text-center">Rp. {floor.cost}</td>
                <td className="py-3 px-4 text-center">{floor.emission}</td>
                <td className="py-3 px-4 text-center">{floor.rank}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-3 px-4 text-center text-gray-400">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableEachFloor;

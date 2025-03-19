/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  filterText,
  formatNumberForDisplayDynamic,
} from "../../share-components/Helper";

const TableEachEquipment = ({ data }) => {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      setEquipments(
        data?.map((item) => ({
          name: item?.equipment || "-",
          consumption: formatNumberForDisplayDynamic(item?.total_kW) || 0,
          cost: formatNumberForDisplayDynamic(item?.total_cost) || 0,
          emission: formatNumberForDisplayDynamic(item?.total_emisi) || 0,
          percentage: item?.percentage || 0,
        }))
      );
    } else {
      setEquipments([]);
    }
  }, [data]);

  return (
    <div className="w-full mx-auto text-white font-semibold rounded-md 4k:rounded-xl text-sm 4k:text-3xl max-h-72 4k:max-h-full overflow-y-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-latar-header-table-input-setting">
            <th className="py-3 px-4 text-left">Equipment</th>
            <th className="py-3 px-4 text-center">Consumption (kWh)</th>
            <th className="py-3 px-4 text-center">Cost (IDR)</th>
            <th className="py-3 px-4 text-center">Emission (Ton CO2e)</th>
            <th className="py-3 px-4 text-center">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {equipments?.length > 0 ? (
            equipments?.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-dashboard-table-abu-tua"
                    : "bg-dashboard-table-abu"
                }
              >
                <td className="py-3 px-4 font-semibold">
                  {filterText(item?.name)}
                </td>
                <td className="py-3 px-4 text-center">{item?.consumption}</td>
                <td className="py-3 px-4 text-center">Rp. {item?.cost}</td>
                <td className="py-3 px-4 text-center">{item?.emission}</td>
                <td className="py-3 px-4 text-center">{item?.percentage}%</td>
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

export default TableEachEquipment;

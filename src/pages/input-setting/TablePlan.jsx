import { formatNumberForDisplayDynamic } from "../../share-components/Helper";

/* eslint-disable react/prop-types */
const TablePlan = ({data}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left text-white border border-gray-700">
        <thead className="text-xs uppercase bg-latar-header-table-input-setting text-white">
          <tr>
            {[
              "Month",
              "Weekday Qty",
              "Weekday Cost (IDR)",
              "Weekday kWh",
              "Holiday Qty",
              "Holiday Cost (IDR)",
              "Holiday kWh",
              "Total Day",
              "Total Cost (IDR)",
              "Total kWh",
            ].map((header) => (
              <th key={header} className="px-4 py-3 border border-gray-600">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-latar-table-input-setting-genap"
                  : "bg-latar-table-input-setting-ganjil"
              }
            >
              {Object.values(row).map((value, idx) => (
                <td key={idx} className="px-4 py-3 border border-gray-600">
                  {formatNumberForDisplayDynamic(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePlan;
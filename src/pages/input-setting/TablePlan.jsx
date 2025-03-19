import { formatNumberForDisplayDynamic } from "../../share-components/Helper";

/* eslint-disable react/prop-types */
const TablePlan = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs 4k:text-4xl text-left text-white border border-gray-700">
        <thead className="text-xs 4k:text-3xl uppercase bg-latar-header-table-input-setting text-white">
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
          {data?.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-latar-table-input-setting-genap"
                    : "bg-latar-table-input-setting-ganjil"
                }
              >
                <td className="px-4 py-3 border border-gray-600">
                  {row?.month_name}
                </td>
                <td className="px-4 py-3 border border-gray-600">
                  {formatNumberForDisplayDynamic(row?.weekday_qty)}
                </td>
                <td className="px-4 py-3 border border-gray-600">
                  Rp.{formatNumberForDisplayDynamic(row?.weekday_cost)}
                </td>
                <td className="px-4 py-3 border border-gray-600">
                  {formatNumberForDisplayDynamic(row?.weekday_kwh)}
                </td>
                <td className="px-4 py-3 border border-gray-600">
                  {formatNumberForDisplayDynamic(row?.holiday_qty)}
                </td>
                <td className="px-4 py-3 border border-gray-600">
                  Rp.{formatNumberForDisplayDynamic(row?.holiday_cost)}
                </td>
                <td className="px-4 py-3 border border-gray-600">
                  {formatNumberForDisplayDynamic(row?.holiday_kwh)}
                </td>
                <td className="px-4 py-3 border border-gray-600">
                  {formatNumberForDisplayDynamic(row?.total_days)}
                </td>
                <td className="px-4 py-3 border border-gray-600">
                  Rp.{formatNumberForDisplayDynamic(row?.total_cost)}
                </td>
                <td className="px-4 py-3 border border-gray-600">
                  {formatNumberForDisplayDynamic(row?.total_kwh)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={10}
                className="text-center py-4 text-white font-semibold"
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePlan;

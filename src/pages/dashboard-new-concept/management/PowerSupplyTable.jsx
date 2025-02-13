import { formatNumberForDisplay } from "../../../share-components/Helper";

const PowerSupplyTable = () => {
    const data = [
      { label: "Today", pln: 5520, solarPV: 111, total: 5621 },
      { label: "This Month", pln: 224539, solarPV: 4578, total: 229117 },
      { label: "This Year", pln: 2475728, solarPV: 50666, total: 2526394 },
    ];
  
    return (
      <div className="">
        <h2 className="text-white text-lg font-semibold flex items-center mb-3">
          <span className="mr-2">⚡</span> Power Supply (kWh)
        </h2>
        <table className="w-full border border-gray-700 border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 text-left border border-gray-700"> </th>
              <th className="py-2 px-4 text-yellow-400 border border-gray-700">PLN</th>
              <th className="py-2 px-4 text-green-400 border border-gray-700">Solar PV</th>
              <th className="py-2 px-4 text-white border border-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border border-gray-700">
                <td className="py-2 px-4 font-semibold text-white border border-gray-700">{row.label}</td>
                <td className="py-2 px-4 text-center text-yellow-400 border border-gray-700">{formatNumberForDisplay(row.pln)}</td>
                <td className="py-2 px-4 text-center text-green-400 border border-gray-700">{formatNumberForDisplay(row.solarPV)}</td>
                <td className="py-2 px-4 text-center text-white border border-gray-700">{formatNumberForDisplay(row.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PowerSupplyTable;

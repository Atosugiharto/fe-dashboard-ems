import { formatNumberForDisplay } from "../../../share-components/Helper";

const CostTable = () => {
  const data = [
    { label: "Today", pln: 6168675, solarPV: 114868 },
    { label: "This Month", pln: 250959000, solarPV: 4741387 },
    { label: "This Year", pln: 2762717797, solarPV: 52478829 },
  ];

  return (
    <div className="">
      <h2 className="text-white text-lg font-semibold flex items-center mb-3">
        <span className="mr-2">💰</span> Cost (IDR)
      </h2>
      <table className="w-full border border-gray-700 border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4 text-left border border-gray-700"> </th>
            <th className="py-2 px-4 text-yellow-400 border border-gray-700">PLN</th>
            <th className="py-2 px-4 text-green-400 border border-gray-700">Solar PV</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border border-gray-700">
              <td className="py-2 px-4 font-semibold text-white border border-gray-700">{row.label}</td>
              <td className="py-2 px-4 text-center text-yellow-400 border border-gray-700">
                Rp.{formatNumberForDisplay(row.pln)}
              </td>
              <td className="py-2 px-4 text-center text-green-400 border border-gray-700">
                Rp.{formatNumberForDisplay(row.solarPV)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostTable;

import { formatNumberForDisplay } from "../../../share-components/Helper";

const EmissionReductionTable = () => {
  const data = [
    { label: "Today", rec: 4.80, solarPV: 0.18 },
    { label: "This Month", rec: 195.35, solarPV: 3.98 },
    { label: "This Year", rec: 2153.88, solarPV: 44.08 },
  ];

  return (
    <div className="">
      <h2 className="text-white text-lg font-semibold flex items-center mb-3">
        <span className="mr-2">☁️</span> Emission Reduction (Ton CO2e)
      </h2>
      <table className="w-full border border-gray-700 border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4 text-left border border-gray-700"> </th>
            <th className="py-2 px-4 text-blue-400 border border-gray-700">REC</th>
            <th className="py-2 px-4 text-green-400 border border-gray-700">Solar PV</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border border-gray-700">
              <td className="py-2 px-4 font-semibold text-white border border-gray-700">{row.label}</td>
              <td className="py-2 px-4 text-center text-blue-400 border border-gray-700">
                {formatNumberForDisplay(row.rec)}
              </td>
              <td className="py-2 px-4 text-center text-green-400 border border-gray-700">
                {formatNumberForDisplay(row.solarPV)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmissionReductionTable;

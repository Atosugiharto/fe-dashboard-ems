import GaugeChart from "react-gauge-chart";

const GaugeEei = () => {
  return (
    <div>
      <p className="text-white text-lg">
        <span role="img" aria-label="bulb">💡</span> EEI &lt; 300 kWh/m²/Year
      </p>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={20}
        arcsLength={[0.4, 0.1, 0.5]} // Membuat bagian hijau dan merah
        colors={["#008000", "#FF0000", "#333"]} // Hijau, merah, hitam
        percent={187.6 / 500}
        arcPadding={0.02}
        needleColor="white"
        textColor="white"
        formatTextValue={(value) => `${value}`}
      />
    </div>
  );
};

export default GaugeEei;

import Chart from "react-apexcharts";

const EqualizerBarChart = () => {
  // Data penjualan per bulan
  const salesData = [
    18000, 14000, 12000, 16000, 25000, 22500, 24000, 17000, 30000, 26000, 21000,
    15000,
  ];

  // Jumlah potongan per bar (menambah jumlah potongan)
  const numStacks = 10; // Semakin tinggi, semakin banyak potongan

  // Generate series dengan banyak potongan (stack)
  const series = Array.from({ length: numStacks }, (_, i) => ({
    name: `Part ${i + 1}`,
    data: salesData.map((value) =>
      value > i * 2000 ? Math.min(2000, value - i * 2000) : 0
    ),
  }));

  const options = {
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 3, // Efek rounded pada tiap potongan
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#FFA500"], // Warna solid (misalnya orange)
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: { colors: "#fff" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#fff" },
      },
    },
    grid: {
      borderColor: "#555",
    },
    legend: {
      show: false, // Sembunyikan legenda agar lebih bersih
    },
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 4, // Memberikan efek pemisahan antar potongan
      colors: ["#000"], // Efek dashed dengan warna background (hitam)
    },
  };

  return (
    <div style={{ background: "#000", padding: "20px", borderRadius: "10px" }}>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default EqualizerBarChart;

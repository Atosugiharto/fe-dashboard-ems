/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hijau: "#00FF7F",
        kuning: "#FFF100",
        abu: "#2C2F33",
        merah: "#FF3131",
        oren: "#FF6D00",
        dongker: "#2F5166",
        outlet: "#2e3545",
        sidebar: "#FBFBFC",
        kartu: "#181c25",
        "latar-bar-kuning": "#d38a0a",
        "latar-bar-abu": "#24282c",
        "latar-icon-hijau": "#11af2a",
        "latar-bar-input-setting": "#1b1b1b",
        "latar-table-input-setting-ganjil": "#1b1b1b",
        "latar-table-input-setting-genap": "#303030",
        "latar-header-table-input-setting": "#262626",
        "latar-select": "#444645",
        "latar-input": "#424a57",
        "latar-header": "#3a4c70",
        "latar-huruf": "#445888",
        "tombol-abu-tua": "#DDDCDC",
        "tulisan-tombol-abu-tua": "#71708F",
        "dashboard-bar-kuning": "#deff1c",
        "dashboard-bar-abu": "#626367",
        "dashboard-bar-merah": "#f11607",
        "dashboard-gauge-hijau": "#03cd1e",
        "dashboard-line-abu": "#bcbdbf",
        "dashboard-line-hijau": "#a3c31d",
        "dashboard-table-abu-tua": "#1a1a1a",
        "dashboard-table-abu-muda": "#252525",
        "dashboard-table-abu": "#262626",
        "dashboard-text-table-oren": "#c9850f",
        "dashboard-text-table-kuning": "#b4d218",
        "dashboard-text-table-biru": "#2f7fb2",
        "dashboard-text-table-hijau": "#0b8018",
        "dashboard-table-abu-last": "#393939",
        "latar-tombol-download": "#10d520",
        "bar-kuning-cost": "#c1dd28",
        "bar-biru-cost": "#6bb6d5",
        "cost-text-hijau": "#2f8a65",
      },
      screens: {
        "4k": "3840px", // Tambahkan breakpoint khusus untuk layar 4K
      },
    },
  },
  plugins: [],
};

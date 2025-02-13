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
        "latar-select": "#444645",
        "latar-header": "#3a4c70",
        "latar-huruf": "#445888",
        "tombol-abu-tua": "#DDDCDC",
        "tulisan-tombol-abu-tua": "#71708F",
      },
      screens: {
        "4k": "3840px", // Tambahkan breakpoint khusus untuk layar 4K
      },
    },
  },
  plugins: [],
};

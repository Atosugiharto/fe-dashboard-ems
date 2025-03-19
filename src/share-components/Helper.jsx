import moment from "moment/moment";

export function convertSecondsToTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}:${minutes}:${seconds}`;
}

export function limitDecimalPlaces(number, limit) {
  return parseFloat(number.toFixed(limit));
}

export const formatNumber = (number) => parseFloat(number.toFixed(2));

export const formatNumberForDisplay = (number) =>
  new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

export const formatNumberForDisplayDynamic = (number) => {
  if (isNaN(number) || typeof number === "string") {
    return number; // Jika bukan angka, kembalikan nilai asli
  }

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: number % 1 === 0 ? 0 : 2, // Jika desimalnya 0, tidak tampilkan
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatArrayNumber = (series) => {
  return series.map((item) => ({
    ...item,
    data: item.data.map((value) => formatNumber(value)),
  }));
};

export const formatMonth = (monthsArray) => {
  return monthsArray?.map((date) => {
    // Cek apakah format sesuai "YYYY-MM"
    const isValidFormat = moment(date, "YYYY-MM", true).isValid();
    return isValidFormat ? moment(date, "YYYY-MM").format("MMM") : date;
  });
};

export const formatFiscalYears = (fiscalYearsArray) => {
  return fiscalYearsArray?.map((fiscalYear) => {
    const yearPart = fiscalYear.split("-")[0]; // Ambil tahun pertama
    return `FY'${yearPart.slice(2)}`; // Ambil 2 digit terakhir
  });
};

export const replaceString = (data) => {
  return data?.replace(/"/g, "");
};

export const splitHour = (data) => {
  return data?.split(".")[0];
};

export const fetchTimeApi = () => {
  const now = new Date();
  const nextRun = new Date();

  nextRun.setHours(now.getHours() + 1); // Tambah 1 jam
  nextRun.setMinutes(1); // Set ke menit ke-1
  nextRun.setSeconds(0); // Set ke detik 0

  const delay = nextRun - now;

  return delay;
};

export const getCurrentFiscalRange = (ranges) => {
  const currentYear = new Date().getFullYear();

  for (const range of ranges) {
    const [start, end] = range
      .match(/\d+/g)
      .map((num) => 2000 + parseInt(num, 10));
    if (start <= currentYear && currentYear <= end) {
      return range;
    }
  }
  return null;
};

export const filterText = (text) => {
  return text
    .replace(/[^a-zA-Z0-9\s-_]/g, "") // Hapus karakter selain huruf, angka, spasi, -, _
    .replace(/[-_]+/g, " ") // Ganti semua - dan _ dengan spasi
    .replace(/([a-zA-Z])(\d)/g, "$1 $2") // Tambahkan spasi antara huruf dan angka jika angka muncul setelah huruf
    .trim(); // Hapus spasi di awal & akhir
};

export const filterArrayText = (arr) => {
  return arr?.map(
    (text) =>
      text
        .replace(/[^a-zA-Z0-9\s-_]/g, "") // Hapus karakter selain huruf, angka, spasi, -, _
        .replace(/[-_]+/g, " ") // Ganti semua - dan _ dengan spasi
        .replace(/([a-zA-Z])(\d)/g, "$1 $2") // Tambahkan spasi antara huruf dan angka jika angka muncul setelah huruf
        .trim() // Hapus spasi di awal & akhir
  );
};

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

export const formatArrayNumber = (series) => {
  return series.map((item) => ({
    ...item,
    data: item.data.map((value) => formatNumber(value)),
  }));
};

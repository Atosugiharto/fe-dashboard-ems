import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from "moment";
import { baseApiUrl } from "./api";

const useFiscalYear = () => {
  const [fiscalData, setFiscalData] = useState(null);
  const [yearsFYOption, setYearsFYOption] = useState([]);
  const [yearsRangeOption, setYearsRangeOption] = useState([]);

  const transformYearsToFiveYearRange = (years) => {
    // Extract all unique fiscal years from the given data
    const extractedYears = years.flatMap(y => y.split('-').map(Number));
    
    // Find the minimum and maximum year
    const minYear = Math.min(...extractedYears);
    const maxYear = Math.max(...extractedYears);
    
    // Generate 5-year fiscal year ranges
    const ranges = [];
    for (let startYear = minYear; startYear <= maxYear; startYear += 5) {
      const endYear = startYear + 4;
      ranges.push(`FY'${startYear % 100}-FY'${endYear % 100}`);
    }
    
    return ranges;
  };

  useEffect(() => {
    const getFiscalYear = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/checkFYDashboard`);
        if (response?.data?.success && response?.data?.data?.listFiscalYear) {
          const { listFiscalYear } = response.data.data;

          // Urutkan tahun dari terbaru ke terlama
          listFiscalYear.sort((b, a) => b.localeCompare(a));

          // Format FY'XX sebagai label, tetapi value tetap tahun asli
          const formattedYears = listFiscalYear.map((year) => {
            const [start] = year.split("-"); // Ambil tahun pertama
            return { label: `FY'${start.slice(-2)}`, value: year };
          });

          const yearsRange = transformYearsToFiveYearRange(listFiscalYear);

          setYearsFYOption(formattedYears);
          setYearsRangeOption(yearsRange);
        }

        setFiscalData(response?.data?.data || null);
      } catch (error) {
        console.error("Error fetching fiscal year:", error);
        setFiscalData(null);
        setYearsFYOption([]);
      }
    };
    getFiscalYear();
  }, []);

  const generateFiscalMonths = (tglStart, tglEnd) => {
    let startDate = moment(tglStart);
    const endDate = moment(tglEnd);
    let months = [];

    while (startDate.isSameOrBefore(endDate, "month")) {
      months.push({
        label: startDate.format("MMM"), // Apr, May, Jun, ...
        value: startDate.format("YYYY-MM-DD"), // 2024-04-01, 2024-05-01, ...
      });
      startDate.add(1, "month");
    }

    return months;
  };

  const monthsWithPayloadYYYYMM = (tglStart, tglEnd) => {
    if (
      !moment(tglStart, "YYYY-MM-DD", true).isValid() ||
      !moment(tglEnd, "YYYY-MM-DD", true).isValid()
    ) {
      console.error("Invalid fiscal year date format", tglStart, tglEnd);
      return [];
    }

    let startDate = moment(tglStart, "YYYY-MM-DD");
    const endDate = moment(tglEnd, "YYYY-MM-DD");
    let months = [];

    while (startDate.isSameOrBefore(endDate, "month")) {
      months.push({
        label: startDate.format("MMM"),
        value: startDate.format("YYYY-MM"),
      });
      startDate.add(1, "month");
    }

    return months;
  };

  const monthsFYOption = useMemo(() => {
    if (!fiscalData?.tglStart || !fiscalData?.tglEnd) return [];
    return generateFiscalMonths(fiscalData.tglStart, fiscalData.tglEnd);
  }, [fiscalData]);

  const monthsOptionWithPayloadYYYYMM = useMemo(() => {
    if (!fiscalData?.tglStart || !fiscalData?.tglEnd) return [];
    return monthsWithPayloadYYYYMM(fiscalData.tglStart, fiscalData.tglEnd);
  }, [fiscalData]);

  const tglStart = fiscalData?.tglStart || null;
  const tglEnd = fiscalData?.tglEnd || null;

  return {
    monthsFYOption,
    yearsFYOption,
    tglStart,
    tglEnd,
    monthsOptionWithPayloadYYYYMM,
    yearsRangeOption,
  };
};

export default useFiscalYear;

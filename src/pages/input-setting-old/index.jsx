/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  fiscalYearOption,
  dataHoliday,
} from "../../share-components/dummyData";
import axios from "axios";
import { baseApiUrl } from "../../share-components/api";

const InputSettingOld = () => {
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFiscalYear, setSelectedFiscalYear] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Menambahkan Hari Libur
  const addHariLibur = async (holidayDate, fiscalYear, description, state) => {
    try {
      const response = await axios.post(`${baseApiUrl}/addHariLibur`, {
        data: {
          holidaydate: holidayDate,
          fiscalYear,
          description,
          state,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding holiday:", error);
      throw error;
    }
  };

  // Menambahkan Tahun Fiskal
  const addFiscalYear = async (fiscalYear, startDate, endDate) => {
    try {
      const response = await axios.post(`${baseApiUrl}/addFiscalYear`, {
        data: {
          fisicalYear: fiscalYear,
          tglstart: startDate,
          tglend: endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding fiscal year:", error);
      throw error;
    }
  };

  // Menambahkan Rencana Biaya
  const addCostPlan = async (fiscalYear, totalCost, startDate, endDate) => {
    try {
      const response = await axios.post(`${baseApiUrl}/addCostPlan`, {
        data: {
          fisicalYear: fiscalYear,
          totalcost: totalCost,
          tglstart: startDate,
          tglend: endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding cost plan:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (
      fiscalYearOption.listFiscalYear &&
      fiscalYearOption.listFiscalYear.length > 0
    ) {
      setSelectedFiscalYear(fiscalYearOption.listFiscalYear[0]);
    }

    // Check if fiscalAktif status is "Aktif" and pre-fill the input fields
    if (fiscalYearOption.fiscalAktif.status === "Aktif") {
      const { fisical_Year, tgl_start, tgl_end } = fiscalYearOption.fiscalAktif;
      const [start, end] = fisical_Year.split("-"); // Split the fiscal year
      setStartYear(start); // Set start year
      setEndYear(end); // Set end year
      setStartDate(tgl_start);
      setEndDate(tgl_end);
    }
  }, []);

  useEffect(() => {
    // Update holidays based on selected fiscal year
    const selectedHolidays = dataHoliday.feedbackHariLibur
      .filter((holiday) => holiday.fiscal_year === selectedFiscalYear)
      .map((holiday) => holiday.holiday_date.split("T")[0]); // Extract date in YYYY-MM-DD format
    setHolidays(selectedHolidays);
  }, [selectedFiscalYear]);

  const handleDateClick = (date) => {
    if (holidays.includes(date)) {
      setHolidays(holidays.filter((d) => d !== date));
    } else {
      setHolidays([...holidays, date]);
    }
    setSelectedDate(date);
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const renderCalendar = () => {
    if (!selectedFiscalYear) return null;

    const [startYearNum, endYearNum] = selectedFiscalYear
      .split("-")
      .map(Number);
    const months = [
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
    ];
    const daysInMonth = [30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28, 31];

    // Menyesuaikan jumlah hari di bulan Februari jika tahun kabisat
    if (isLeapYear(endYearNum)) {
      daysInMonth[10] = 29; // Februari pada tahun kabisat
    }

    const weekDays = ["S", "M", "T", "W", "T", "F", "S"]; // Singkatan hari

    const monthRows = [];
    let monthIndex = 0; // Mulai dari April

    while (monthIndex < 12) {
      const monthRow = (
        <div
          key={monthIndex}
          className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4 mb-4"
        >
          {Array.from({ length: 4 }, (_, colIndex) => {
            if (monthIndex >= 12) return null; // Jika sudah lebih dari 12 bulan
            const currentMonth = months[monthIndex];
            const currentYear = monthIndex < 8 ? startYearNum : endYearNum; // April - Desember = startYear, Januari - Maret = endYear
            const monthName = `${currentMonth} ${currentYear}`;
            const days = daysInMonth[monthIndex];

            const daysGrid = Array.from({ length: days }, (_, day) => {
              const date = `${currentYear}-${String(monthIndex + 1).padStart(
                2,
                "0"
              )}-${String(day + 1).padStart(2, "0")}`;
              const isSelected = holidays.includes(date);
              const dayOfWeek = new Date(
                currentYear,
                monthIndex,
                day + 1
              ).getDay(); // Mendapatkan hari dalam seminggu

              return (
                <button
                  key={day}
                  className={`p-2 border rounded text-center ${
                    isSelected ? "bg-red-500 text-white" : "bg-white"
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {day + 1}
                </button>
              );
            });

            monthIndex++; // Pindah ke bulan berikutnya

            return (
              <div key={monthName} className="border p-2 rounded bg-white">
                <h3 className="text-lg 4k:text-4xl font-bold">{monthName}</h3>
                <div className="grid grid-cols-7 gap-1 text-center font-semibold">
                  {weekDays.map((day, i) => (
                    <span key={i} className="p-2">
                      {day}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">{daysGrid}</div>
              </div>
            );
          })}
        </div>
      );

      monthRows.push(monthRow);
    }

    return monthRows;
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Input Setting</h2>

      {/* ==================== add fiscal year ==================== */}
      <div className="mb-4">
        <label className="block mb-1">Input Fiscal Year:</label>
        <div className="lg:flex lg:space-x-2 gap-2">
          <input
            type="text"
            className="border rounded p-2"
            placeholder="2024"
            value={startYear} // Display only the start year
            onChange={(e) => setStartYear(e.target.value)}
          />
          <span className="self-center">-</span>
          <input
            type="text"
            className="border rounded p-2"
            placeholder="2025"
            value={endYear} // Display only the end year
            onChange={(e) => setEndYear(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4 lg:flex items-center gap-4">
        <label className="block mb-1">Start Date:</label>
        <input
          type="date"
          className="border rounded p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label className="block mb-1 mt-2">End Date:</label>
        <input
          type="date"
          className="border rounded p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="mt-2 bg-blue-500 text-white rounded p-2">
          Save
        </button>
      </div>

      {/* =================== add hari libur ==================== */}
      <div className="flex items-center gap-10 mb-4 mt-10">
        <h2 className="text-2xl font-bold">Input Hari Libur</h2>
        <div className="flex items-center gap-2">
          <label className="">Fiscal Year</label>
          <select
            className="border rounded p-2"
            name="holidays"
            id="holidays"
            value={selectedFiscalYear}
            onChange={(e) => setSelectedFiscalYear(e.target.value)}
          >
            <option value="" disabled hidden>
              Choose
            </option>
            {fiscalYearOption.listFiscalYear?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">{renderCalendar()}</div>

      {/* =================== add cost plan ==================== */}
      <div className="lg:flex items-center justify-between mt-10 lg:justify-start lg:gap-10">
        <div className="mb-4">
          <label className="block mb-1">Input Cost Pertahun:</label>
          <input
            type="text"
            className="border rounded p-2"
            placeholder="Rp135.000.000"
          />
          <button className="mt-2 bg-blue-500 text-white rounded p-2">
            Update
          </button>
        </div>

        {/* =================== add cap emisi carbon ==================== */}
        <div className="mb-4">
          <label className="block mb-1">Input Cap Emisi Carbon:</label>
          <input
            type="text"
            className="border rounded p-2"
            placeholder="5.000 TonCO2"
          />
          <button className="mt-2 bg-blue-500 text-white rounded p-2">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSettingOld;

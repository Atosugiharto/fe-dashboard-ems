/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  fiscalYearOption,
  dataHoliday,
} from "../../share-components/dummyData";
import axios from "axios";
import { baseApiUrl } from "../../share-components/api";
import { SaveOutlined, X } from "@mui/icons-material";
import {
  DocumentArrowDownIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { dataTable } from "./data";
import ConsumptionPlan from "./ConsumptionPlan";
import TablePlan from "./TablePlan";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const InputSetting = () => {
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFiscalYear, setSelectedFiscalYear] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(5000);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const addTotalRow = (data) => {
    if (data.some((row) => row.month === "TOTAL")) return;
    const totalRow = data.reduce(
      (acc, curr) => {
        acc.weekdayQty += curr.weekdayQty;
        acc.weekdayCost += curr.weekdayCost;
        acc.weekdayKWh += curr.weekdayKWh;
        acc.holidayQty += curr.holidayQty;
        acc.holidayCost += curr.holidayCost;
        acc.holidayKWh += curr.holidayKWh;
        acc.totalDay += curr.totalDay;
        acc.totalCost += curr.totalCost;
        acc.totalKWh += curr.totalKWh;
        return acc;
      },
      {
        month: "TOTAL",
        weekdayQty: 0,
        weekdayCost: 0,
        weekdayKWh: 0,
        holidayQty: 0,
        holidayCost: 0,
        holidayKWh: 0,
        totalDay: 0,
        totalCost: 0,
        totalKWh: 0,
      }
    );

    // Tambahkan totalRow ke dalam dataTable
    data.push(totalRow);
  };

  // Panggil fungsi untuk menambahkan baris TOTAL ke dataTable
  addTotalRow(dataTable);

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

    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const monthRows = [];
    let monthIndex = 0; // Mulai dari April

    while (monthIndex < 12) {
      const monthRow = (
        <div
          key={monthIndex}
          className="grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-4 mb-4"
        >
          {Array.from({ length: 6 }, (_, colIndex) => {
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
                  className={`rounded text-center ${
                    isSelected
                      ? " text-oren text-opacity-90 bg-oren bg-opacity-30 rounded-full"
                      : "text-white"
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {day + 1}
                </button>
              );
            });

            monthIndex++; // Pindah ke bulan berikutnya

            return (
              <div key={monthName} className="p-2 rounded bg-kartu text-white">
                <h3 className="text-md font-medium">{monthName}</h3>
                <div className="grid grid-cols-7 gap-1 text-center font-medium">
                  {weekDays.map((day, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-tombol-abu-tua text-opacity-50 py-2"
                    >
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

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataTable, {
      header: [
        "month",
        "weekdayQty",
        "weekdayCost",
        "weekdayKWh",
        "holidayQty",
        "holidayCost",
        "holidayKWh",
        "totalDay",
        "totalCost",
        "totalKWh",
      ],
    });

    // Menyesuaikan header menjadi nama yang sesuai
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Month",
          "Weekday Qty",
          "Weekday Cost (IDR)",
          "Weekday kWh",
          "Holiday Qty",
          "Holiday Cost (IDR)",
          "Holiday kWh",
          "Total Day",
          "Total Cost (IDR)",
          "Total kWh",
        ],
      ],
      { origin: "A1" }
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Result Plan");

    // Konversi ke file dan simpan
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Result_Plan_This_Year.xlsx");
  };

  return (
    <div className="text-white">
      <div className="flex items-center justify-center my-2">
        <h2 className="inline-block text-center p-2 rounded-sm bg-latar-huruf text-white font-bold text-lg 4k:text-4xl uppercase">
          Input Setting
        </h2>
      </div>

      <div className="p-6 bg-latar-bar-abu rounded-sm">
        <div className="p-6 bg-outlet rounded-sm ">
          {/* ==================== add fiscal year ==================== */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Input Fiscal Year
            </label>
            <div className="flex gap-2 items-center">
              <div>
                <select
                  className="border rounded p-2 text-black"
                  name="fiscalYear"
                  id="fiscalYear"
                  value={selectedFiscalYear}
                  onChange={(e) => setSelectedFiscalYear(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Choose
                  </option>
                  {fiscalYearOption?.listFiscalYear?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button className="bg-blue-500 text-white rounded p-2">
                  <SaveOutlined className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4 lg:flex items-center gap-6">
            {/* Cost This Year */}
            <div>
              <label className="block mb-2 font-semibold">
                Cost This Year (IDR)
              </label>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white">
                    Rp.
                  </span>
                  <input
                    type="text"
                    value={inputValue}
                    readOnly
                    className="rounded-sm p-2 pl-8 bg-latar-input"
                  />
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-latar-header text-white rounded p-2"
                >
                  <PencilIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Cap Emission Carbon */}
            <div>
              <label className="block mb-2 font-semibold">
                Cap Emission Carbon
              </label>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    readOnly
                    className="rounded-sm p-2 pr-8 bg-latar-input"
                  />
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                    TonCO2
                  </span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-latar-header text-white rounded p-2"
                >
                  <PencilIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mb-4 lg:flex items-center gap-6">
              {/* Cost This Year */}
              <div>
                <label className="block mb-2 font-semibold">
                  Cost This Year (IDR)
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black">
                      Rp.
                    </span>
                    <input
                      type="text"
                      className="rounded-sm p-2 pl-8 bg-white text-black"
                    />
                  </div>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-blue-500 text-white rounded p-2"
                  >
                    <SaveOutlined className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-red-600 text-white rounded p-2"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Cap Emission Carbon */}
              <div>
                <label className="block mb-2 font-semibold">
                  Cap Emission Carbon
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      className="rounded-sm p-2 pr-8 bg-white text-black"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black">
                      TonCO2
                    </span>
                  </div>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-blue-500 text-white rounded p-2"
                  >
                    <SaveOutlined className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-red-600 text-white rounded p-2"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="my-4">{renderCalendar()}</div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-md font-bold">Result Plan This Year</div>

            <div>
              <button
                onClick={downloadExcel}
                className="bg-latar-icon-hijau text-white rounded p-2"
              >
                <DocumentArrowDownIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
            <div className="lg:col-span-5">
              <TablePlan data={dataTable} />
            </div>

            <div className="lg:col-span-3 p-4 rounded-md 4k:rounded-xl bg-latar-bar-input-setting">
              <ConsumptionPlan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSetting;

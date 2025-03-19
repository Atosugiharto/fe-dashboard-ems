/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { baseApiUrl } from "../../share-components/api";
import { ChevronRight, ExpandMore, SaveOutlined, X } from "@mui/icons-material";
import {
  DocumentArrowDownIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
// import { dataTable, holidays } from "./data";
import ConsumptionPlan from "./ConsumptionPlan";
import TablePlan from "./TablePlan";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { formatNumberForDisplayDynamic } from "../../share-components/Helper";
import moment from "moment";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const InputSetting = () => {
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const fiscalYear = `${lastYear}-${currentYear}`;
  const [selectedFiscalYear, setSelectedFiscalYear] = useState(fiscalYear);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [totalEmisi, setTotalEmisi] = useState(0);
  const [dataPlanTable, setDataPlanTable] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [dataFYNow, setDataFYNow] = useState([]);
  const [holidaydate, setHolidaydate] = useState("");
  const [responsive, setResponsive] = useState({ iconSize: 25 });
  const [fiscalYearOption, setDatafiscalYearOption] = useState([]);

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (window.innerWidth >= 3840) {
        setResponsive({ iconSize: 55 });
      } else {
        setResponsive({ iconSize: 25 });
      }
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

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
        acc.weekday_qty += curr.weekday_qty;
        acc.weekday_cost += curr.weekday_cost;
        acc.weekday_kwh += curr.weekday_kwh;
        acc.holiday_qty += curr.holiday_qty;
        acc.holiday_cost += curr.holiday_cost;
        acc.holiday_kwh += curr.holiday_kwh;
        acc.total_days += curr.total_days;
        acc.total_cost += curr.total_cost;
        acc.total_kwh += curr.total_kwh;
        return acc;
      },
      {
        month: "TOTAL",
        weekday_qty: 0,
        weekday_cost: 0,
        weekday_kwh: 0,
        holiday_qty: 0,
        holiday_cost: 0,
        holiday_kwh: 0,
        total_days: 0,
        total_cost: 0,
        total_kwh: 0,
      }
    );

    // Tambahkan totalRow ke dalam dataTable
    data.push(totalRow);
  };

  // ===================================== get data function =====================================

  const getFiscalYear = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/checkFiscalYear`);
      const result = response?.data?.data;
      if (result) {
        setDatafiscalYearOption(result);
      }
    } catch (error) {
      console.error("Error:", error);
      setDatafiscalYearOption([]);
    }
  };

  const getCost = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/checkPlanCostKWHemisi`, {
        fiscalYear: selectedFiscalYear,
      });
      const result = response?.data?.data;
      if (result) {
        setTotalCost(parseFloat(result?.total_cost));
      }
    } catch (error) {
      console.error("Error:", error);
      setTotalCost(0);
    }
  };

  const getEmisi = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/checkEmisicap`, {
        fiscalYear: selectedFiscalYear,
      });
      const result = response?.data;
      if (result) {
        setTotalEmisi(
          typeof result?.data === "object" ? 0 : parseFloat(result?.data)
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setTotalEmisi(0);
    }
  };

  const getHolidays = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/checkHariLibur`, {
        fiscalYear: selectedFiscalYear,
      });
      const result = response?.data?.data;
      console.log(result, "holi");
      if (result) {
        setHolidays(result);
      }
    } catch (error) {
      console.error("Error:", error);
      setHolidays([]);
    }
  };

  const getTablePlan = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/checkTabelPlan`, {
        fiscalYear: selectedFiscalYear,
      });
      const result = response?.data?.data;
      if (result) {
        setDataPlanTable(result);
      }
    } catch (error) {
      console.error("Error:", error);
      setDataPlanTable([]);
    }
  };

  const getDataChart = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/checkChartPlanKWH`, {
        fiscalYear: selectedFiscalYear,
      });
      const result = response?.data?.data;
      if (result) {
        setDataChart(result);
      }
    } catch (error) {
      console.error("Error:", error);
      setDataChart([]);
    }
  };

  const checkFYNow = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/checkFYnow`, {
        fiscalYear: selectedFiscalYear,
      });
      const result = response?.data?.data;
      if (result) {
        setDataFYNow(result);
      }
    } catch (error) {
      console.error("Error:", error);
      setDataFYNow([]);
    }
  };

  useEffect(() => {
    getFiscalYear();
    getCost();
    getEmisi();
    getHolidays();
    getTablePlan();
    addTotalRow(dataPlanTable);
    getDataChart();
    checkFYNow();
  }, [selectedFiscalYear]);

  // ===================================== post data function =====================================

  const addFiscalYear = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/addFiscalYear`, {
        data: {
          fiscalYear: `${startYear}-${endYear}`,
          tglstart: moment(startDate).format("YYYY-MM-DD"),
          tglend: moment(endDate).format("YYYY-MM-DD"),
        },
      });
      toast.success("Successfully added data!", {
        duration: 2000,
        position: "top-center",
      });
      setIsCustomInput(false);
      return response.data;
    } catch (error) {
      console.error("Error adding fiscal year:", error);
      toast.error("Failed to add data!", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const addCostPlan = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/addCostPlan`, {
        data: {
          fiscalYear: selectedFiscalYear,
          totalcost: parseFloat(totalCost),
          tglstart: dataFYNow?.tglStart,
          tglend: dataFYNow?.tglEnd,
        },
      });
      toast.success("Successfully added data!", {
        duration: 2000,
        position: "top-center",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding cost plan:", error);
      toast.error("Failed to add data!", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const addEmissionPlan = async () => {
    try {
      const response = await axios.post(`${baseApiUrl}/addEmisicap`, {
        data: {
          fiscalYear: selectedFiscalYear,
          totalcost: parseFloat(totalEmisi),
          tglstart: dataFYNow?.tglStart,
          tglend: dataFYNow?.tglEnd,
        },
      });
      toast.success("Successfully added data!", {
        duration: 2000,
        position: "top-center",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding cost plan:", error);
      toast.error("Failed to add data!", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const deleteCostPlan = async () => {
    const confirmReset = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirmReset.isConfirmed) return;
    try {
      const response = await axios.post(`${baseApiUrl}/deleteCostPlan`, {
        data: {
          fiscalYear: selectedFiscalYear,
        },
      });
      toast.success("Successfully deleted data!", {
        duration: 2000,
        position: "top-center",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding cost plan:", error);
      toast.error("Failed to delete data!", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const deleteEmissionPlan = async () => {
    const confirmReset = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirmReset.isConfirmed) return;
    try {
      const response = await axios.post(`${baseApiUrl}/deleteEmisicap`, {
        data: {
          fiscalYear: selectedFiscalYear,
        },
      });
      toast.success("Successfully deleted data!", {
        duration: 2000,
        position: "top-center",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding cost plan:", error);
      toast.error("Failed to delete data!", {
        duration: 2000,
        position: "top-center",
      });
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
    if (fiscalYearOption?.status === "Aktif") {
      const { fiscalYear, tglStart, tglEnd } = fiscalYearOption;
      const [start, end] = fiscalYear.split("-"); // Split the fiscal year
      // setStartYear(start); // Set start year
      // setEndYear(end); // Set end year
      // setStartDate(tglStart);
      // setEndDate(tglEnd);
    }
  }, []);

  const handleDateClick = async (date) => {
    try {
      if (holidays.includes(date)) {
        // Jika tanggal sudah ada, panggil API delete terlebih dahulu
        await deleteHariLibur(date);
        setHolidays(holidays.filter((d) => d !== date));
      } else {
        // Jika tanggal belum ada, tambahkan ke daftar dan panggil API insert
        const newHoliday = await addHariLibur(date);
        setHolidays([...holidays, date]);
      }
      setSelectedDate(date);
    } catch (error) {
      console.error("Failed to update holiday:", error);
    }
  };

  const addHariLibur = async (holidaydate) => {
    try {
      const response = await axios.post(`${baseApiUrl}/addHariLibur`, {
        data: {
          holidaydate,
          fiscalYear: selectedFiscalYear,
          description: "",
          state: "insert",
        },
      });
      toast.success("Successfully added data!", {
        duration: 2000,
        position: "top-center",
      });
      return response.data;
    } catch (error) {
      console.error("Error adding holiday:", error);
      toast.error("Failed to add data!", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const deleteHariLibur = async (holidaydate) => {
    const confirmReset = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this holiday?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    try {
      const response = await axios.post(`${baseApiUrl}/addHariLibur`, {
        data: {
          holidaydate,
          fiscalYear: selectedFiscalYear,
          description: "",
          state: "delete",
        },
      });
      toast.success("Successfully delete data!", {
        duration: 2000,
        position: "top-center",
      });
      return response.data;
    } catch (error) {
      console.error("Error adding holiday:", error);
      toast.error("Failed to delete data!", {
        duration: 2000,
        position: "top-center",
      });
    }
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

    if (isLeapYear(endYearNum)) {
      daysInMonth[10] = 29; // Februari tahun kabisat
    }

    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {months.map((currentMonth, index) => {
          const currentYear = index < 9 ? startYearNum : endYearNum;
          const monthIndexJS = (index + 3) % 12;
          const monthName = `${currentMonth} ${currentYear}`;
          const days = daysInMonth[index];

          // ✅ Hitung hari pertama dalam bulan
          const firstDay = new Date(currentYear, monthIndexJS, 1).getDay();

          return (
            <div key={monthName} className="p-1 rounded bg-kartu text-white">
              <h3 className="text-sm font-medium mx-2">{monthName}</h3>
              <div className="grid grid-cols-7 gap-1 text-center font-medium">
                {weekDays.map((day, i) => (
                  <span
                    key={i}
                    className="text-[10px] 4k:text-2xl text-tombol-abu-tua text-opacity-50 py-1"
                  >
                    {day}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-[10px]">
                {/* ✅ Tambahkan offset untuk hari pertama */}
                {Array.from({ length: firstDay }, (_, i) => (
                  <span key={`empty-${i}`} className="text-transparent">
                    -
                  </span>
                ))}
                {Array.from({ length: days }, (_, day) => {
                  const date = `${currentYear}-${String(
                    monthIndexJS + 1
                  ).padStart(2, "0")}-${String(day + 1).padStart(2, "0")}`;
                  const isSelected = holidays.includes(date);

                  return (
                    <button
                      key={day}
                      className={`rounded text-center ${
                        isSelected
                          ? "text-oren bg-oren bg-opacity-30 rounded-full"
                          : "text-white"
                      }`}
                      onClick={() => handleDateClick(date)}
                    >
                      {day + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataPlanTable, {
      header: [
        "month_name",
        "weekday_qty",
        "weekday_cost",
        "weekday_kwh",
        "holiday_qty",
        "holiday_cost",
        "holiday_kwh",
        "total_days",
        "total_cost",
        "total_kwh",
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
    saveAs(data, `Result_Plan_${selectedFiscalYear}.xlsx`);
  };

  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customFiscalYear, setCustomFiscalYear] = useState("");

  const handleFiscalYearChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustomInput(true);
      setSelectedFiscalYear("");
    } else {
      setIsCustomInput(false);
      setSelectedFiscalYear(value);
    }
  };
  const formatNumberWithDots = (number) => {
    if (typeof number === "number") {
      number = number.toString().replace(".", ",");
    }

    let [integerPart, decimalPart] = number.split(",");

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimalPart ? `${integerPart},${decimalPart}` : integerPart;
  };

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="text-white 4k:text-4xl">
      <div className="flex items-center justify-center my-2">
        <h2 className="inline-block text-center p-2 rounded-sm bg-latar-huruf text-white font-bold text-lg 4k:text-4xl uppercase">
          Input Setting
        </h2>
      </div>

      <div className="p-6 bg-latar-bar-abu rounded-sm">
        <div className="px-6 py-2 bg-outlet rounded-sm ">
          {/* ==================== add fiscal year ==================== */}
          <div className="mb-2">
            <label className="block mb-2 font-semibold">
              Input Fiscal Year
            </label>
            <div className="flex gap-2 items-center">
              <div>
                {!isCustomInput ? (
                  <select
                    className="border rounded px-2 py-1 4k:p-4 text-black"
                    name="fiscalYear"
                    id="fiscalYear"
                    value={selectedFiscalYear}
                    onChange={handleFiscalYearChange}
                  >
                    <option value="" disabled hidden>
                      Choose
                    </option>
                    <option value="custom">Input New FY</option>
                    {fiscalYearOption?.listFiscalYear?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-black px-2 py-1">
                    <div className="mb-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          className="border rounded px-2 py-1 w-24"
                          maxLength={4}
                          placeholder="2024"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                        />
                        <span className="self-center text-white">-</span>
                        <input
                          type="text"
                          className="border rounded px-2 py-1 w-24"
                          maxLength={4}
                          placeholder="2025"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="lg:flex items-center gap-4">
                      <div className="flex items-center gap-4">
                        <label className="block text-white">Start Date:</label>
                        <input
                          type="date"
                          className="border rounded px-2 py-1"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="block text-white">End Date:</label>
                        <input
                          type="date"
                          className="border rounded px-2 py-1"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={addFiscalYear}
                          className="bg-blue-500 text-white rounded px-2 py-1 flex items-center"
                        >
                          <SaveOutlined
                            style={{ fontSize: responsive.iconSize }}
                            className="mr-1"
                          />
                        </button>
                        <button
                          onClick={() => setIsCustomInput(false)}
                          className="bg-kartu text-white p-1 4k:p-2 rounded-full"
                        >
                          <XMarkIcon className="h-4 w-auto 4k:h-10" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-2 lg:flex items-center gap-6">
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
                    value={formatNumberWithDots(totalCost)}
                    readOnly
                    className="rounded-sm px-2 py-1 4k:p-4 pl-8 bg-latar-input 4k:pl-16"
                  />
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-latar-header text-white rounded px-2 py-1 4k:p-4"
                >
                  <PencilIcon className="h-6 w-auto 4k:h-14" />
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
                    value={formatNumberWithDots(totalEmisi)}
                    readOnly
                    className="rounded-sm px-2 py-1 4k:p-4 pr-8 4k:pr-32 bg-latar-input"
                  />
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
                    TonCO2
                  </span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-latar-header text-white rounded px-2 py-1 4k:p-4"
                >
                  <PencilIcon className="h-6 w-auto 4k:h-14" />
                </button>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mb-2 lg:flex items-center gap-6">
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
                      type="number"
                      value={totalCost}
                      onChange={(e) => setTotalCost(e.target.value)}
                      className="rounded-sm px-2 py-1 4k:p-4 pl-8 4k:pl-16 bg-white text-black"
                    />
                  </div>
                  <button
                    onClick={addCostPlan}
                    className="bg-blue-500 text-white rounded px-2 py-1 4k:p-4"
                  >
                    <SaveOutlined style={{ fontSize: responsive.iconSize }} />
                  </button>
                  <button
                    onClick={deleteCostPlan}
                    className="bg-red-600 text-white rounded px-2 py-1 4k:p-4"
                  >
                    <XMarkIcon className="h-6 w-auto 4k:h-14" />
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
                      type="number"
                      value={totalEmisi}
                      onChange={(e) => setTotalEmisi(e.target.value)}
                      className="rounded-sm px-2 py-1 4k:p-4 pr-8 4k:pr-32 bg-white text-black"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black">
                      TonCO2
                    </span>
                  </div>
                  <button
                    onClick={addEmissionPlan}
                    className="bg-blue-500 text-white rounded px-2 py-1 4k:p-4"
                  >
                    <SaveOutlined style={{ fontSize: responsive.iconSize }} />
                  </button>
                  <button
                    onClick={deleteEmissionPlan}
                    className="bg-red-600 text-white rounded px-2 py-1 4k:p-4"
                  >
                    <XMarkIcon className="h-6 w-auto 4k:h-14" />
                  </button>
                  <div className="">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-kartu text-white p-1 4k:p-2 rounded-full"
                    >
                      <XMarkIcon className="h-4 w-auto 4k:h-10" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="my-2">{renderCalendar()}</div>

          <button
            className="my-2 mx-auto flex items-center justify-center py-0.5 px-1 4k:py-2 4k:px-4 rounded-md 4k:rounded-xl bg-latar-huruf text-white font-bold text-sm 4k:text-4xl"
            onClick={() => setShowMore((prev) => !prev)}
          >
            <span>{showMore ? "See Less" : "See More"}</span>
            {showMore ? (
              <ExpandMore style={{ fontSize: responsive.iconSize }} />
            ) : (
              <ChevronRight style={{ fontSize: responsive.iconSize }} />
            )}
          </button>

          {showMore && (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="text-md 4k:text-4xl font-bold">
                  Result Plan This Year
                </div>

                <button
                  onClick={downloadExcel}
                  className="bg-latar-icon-hijau text-white rounded p-1"
                >
                  <DocumentArrowDownIcon className="h-4 w-auto 4k:h-14" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
                <div className="lg:col-span-5">
                  <TablePlan data={dataPlanTable} />
                </div>

                <div className="lg:col-span-3 p-4 rounded-md 4k:rounded-xl bg-latar-bar-input-setting">
                  <ConsumptionPlan data={dataChart} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputSetting;

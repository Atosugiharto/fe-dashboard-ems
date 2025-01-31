/* eslint-disable no-unused-vars */  
import React, { useState } from 'react';  
  
const InputSetting = () => {  
  const [holidays, setHolidays] = useState([]);  
  const [selectedDate, setSelectedDate] = useState(null);  
  
  const handleDateClick = (date) => {  
    if (holidays.includes(date)) {  
      setHolidays(holidays.filter((d) => d !== date));  
    } else {  
      setHolidays([...holidays, date]);  
    }  
    setSelectedDate(date);  
  };  
  
  const renderCalendar = () => {  
    const months = [  
      'April', 'May', 'June',  
      'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March',  
    ];  
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  
  
    const monthRows = [];  
    for (let i = 0; i < months.length; i += 4) {  
      monthRows.push(  
        <div key={i} className="grid grid-cols-4 gap-4 mb-4">  
          {months.slice(i, i + 4).map((month, monthIndex) => {  
            const actualMonthIndex = i + monthIndex;  
            return (  
              <div key={month} className="border p-2 rounded bg-white">  
                <h3 className="text-lg font-bold">{month}</h3>  
                <div className="grid grid-cols-7 gap-1">  
                  {Array.from({ length: daysInMonth[actualMonthIndex] }, (_, day) => {  
                    const date = `${month} ${day + 1}`;  
                    const isSelected = holidays.includes(date);  
                    return (  
                      <button  
                        key={day}  
                        className={`p-2 border rounded ${isSelected ? 'bg-red-500 text-white' : 'bg-white'}`}  
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
    }  
  
    return monthRows;  
  };  
  
  return (  
    <div className="p-6 bg-gray-100">  
      <h2 className="text-2xl font-bold mb-4">Input Setting</h2>  
      <div className="mb-4">  
        <label className="block mb-1">Input Fiscal Year:</label>  
        <div className="flex space-x-2">  
          <input type="number" className="border rounded p-2" placeholder="2025" />  
          <span className="self-center">-</span>  
          <input type="number" className="border rounded p-2" placeholder="2026" />  
        </div>  
      </div>  
      <div className="mb-4">  
        <label className="block mb-1">Start Date:</label>  
        <input type="date" className="border rounded p-2" />  
        <label className="block mb-1 mt-2">End Date:</label>  
        <input type="date" className="border rounded p-2" />  
        <button className="mt-2 bg-blue-500 text-white rounded p-2">Save</button>  
      </div>  
      <h2 className="text-2xl font-bold mb-4">Input Hari Libur</h2>  
      <div className="mb-4">  
        {renderCalendar()}  
      </div>  
      <div className="mb-4">  
        <label className="block mb-1">Input Cost Pertahun:</label>  
        <input type="text" className="border rounded p-2" placeholder="Rp135.000.000" />  
      </div>  
      <div className="mb-4">  
        <label className="block mb-1">Input Cap Emisi Carbon:</label>  
        <input type="text" className="border rounded p-2" placeholder="5.000 TonCO2" />  
        <button className="mt-2 bg-blue-500 text-white rounded p-2">Update</button>  
      </div>  
    </div>  
  );  
};  
  
export default InputSetting;  

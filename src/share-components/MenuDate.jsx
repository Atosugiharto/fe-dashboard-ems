/* eslint-disable no-unused-vars */
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  BellIcon,
  Squares2X2Icon,
  ChartBarIcon,
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "@src/assets/logo-toyota.svg";

const Header = () => {
  const [time, setTime] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formatted = today.toLocaleDateString("en-US", options);
    setFormattedDate(formatted);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-latar-header shadow-md z-[1000] flex justify-between items-center px-6 py-3 text-white">
      <div className="flex items-center gap-2 p-2 bg-white">
        <img src={logo} alt="Toyota Indonesia" className="h-10" />
      </div>
      <h1 className="text-xl font-bold hidden lg:block absolute left-1/2 transform -translate-x-1/2">
        ENERGY MONITORING SYSTEM
      </h1>
      <div className="flex flex-col items-end relative">
        <span className="text-sm font-medium">{formattedDate}</span>
        <div className="text-2xl font-bold">{time}</div>
      </div>
    </header>
  );
};

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Header />
      <main className="p-4 bg-outlet min-h-screen bg-cover pt-20">
        <Outlet />
      </main>
      {/* Floating Menu Button */}
      <div className="fixed bottom-5 left-5 z-[1100]">
        <button
          className="bg-latar-header text-white p-3 rounded-full shadow-lg hover:bg-latar-select transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
        {menuOpen && (
          <div className="mt-2 bg-white shadow-lg rounded-lg overflow-hidden w-48 text-sm">
            <ul>
              <li>
                <Link
                  to="/dashboard-management"
                  className="flex items-center px-4 py-2 hover:bg-latar-huruf hover:text-white text-black"
                >
                  <Squares2X2Icon className="h-6 w-6 mr-2" /> Dashboard
                  Management
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard-operator"
                  className="flex items-center px-4 py-2 hover:bg-latar-huruf hover:text-white text-black"
                >
                  <ChartBarIcon className="h-5 w-5 mr-2" /> Dashboard Operator
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;

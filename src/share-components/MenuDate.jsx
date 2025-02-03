import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  BellIcon,
  Squares2X2Icon,
  ChartBarIcon,
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import logo from "@src/assets/logo-toyota.svg";
import bgImage from "@src/assets/bg-7.jpg";

const Header = () => {
  const [time, setTime] = useState("");
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

  const today = new Date();
  const formattedDate = today.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-[1000] flex justify-between items-center px-6 py-2">
      {/* Logo di kiri */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Toyota Indonesia" className="h-8" />
      </div>

      {/* Judul di tengah */}
      <h1 className="text-lg font-bold hidden lg:block absolute left-1/2 transform -translate-x-1/2">
        SUMMARY - ENERGY MANAGEMENT SYSTEM
      </h1>

      {/* Waktu dan ikon di kanan */}
      <div className="flex items-center gap-4 text-gray-700 relative">
        <span>
          {formattedDate} / {time}
        </span>
        <BellIcon className="h-6 w-6 cursor-pointer" />

        {/* Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          <Squares2X2Icon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          />

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50">
              <ul className="py-2">
                <li>
                  <Link
                    to="/dashboard-management"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <ChartBarIcon className="h-5 w-5 mr-2 text-blue-500" />
                    Dashboard Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard-operator"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <Cog6ToothIcon className="h-5 w-5 mr-2 text-green-500" />
                    Dashboard Operator
                  </Link>
                </li>
                <li>
                  <Link
                    to="/input-setting"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-red-500" />
                    Input Setting
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const Layout = () => {
  return (
    <div className="">
      <Header />
      <main
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
        className="p-4 bg-outlet min-h-screen bg-cover pt-16"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

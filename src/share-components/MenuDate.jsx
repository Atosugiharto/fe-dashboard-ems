/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  XMarkIcon,
  RectangleGroupIcon,
  HomeIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  PowerIcon,
  SunIcon,
  CloudIcon,
  BuildingOfficeIcon,
  CubeIcon,
  ClipboardDocumentIcon,
  WrenchIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import logo from "@src/assets/logo-toyota.jpg";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [time, setTime] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const today = new Date();
    setFormattedDate(
      today.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <header className="fixed top-0 w-full rounded-md 4k:rounded-xl bg-latar-header shadow-md z-[1000] flex justify-between items-center px-3 text-white mx-auto">
      <div className="flex items-center gap-2 bg-white">
        <img src={logo} alt="Toyota Indonesia" className="h-16 4k:h-32" />
      </div>
      <h1 className="text-xl 4k:text-5xl font-bold hidden lg:block absolute left-1/2 transform -translate-x-1/2">
        ENERGY MONITORING SYSTEM
      </h1>
      <div className="flex flex-col items-end">
        <span className="text-sm 4k:text-4xl font-medium">{formattedDate}</span>
        <div className="text-2xl 4k:text-5xl font-bold">{time}</div>
      </div>
    </header>
  );
};

const MenuItem = ({ label, icon: Icon, to, children }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!to) setOpen(!open);
  };

  return (
    <li>
      <div className="flex justify-between items-center w-full px-4 4k:px-8 py-2 4k:py-6 hover:bg-latar-header bg-kartu">
        <div className="flex items-center">
          <Icon className="h-6 w-auto 4k:h-12 mr-2" />
          {to ? (
            <Link to={to} className="flex-grow">
              {label}
            </Link>
          ) : (
            <span className="flex-grow" onClick={handleClick}>
              {label}
            </span>
          )}
        </div>
        {children && (
          <button onClick={handleClick}>
            <ChevronDownIcon
              className={`h-5 w-auto 4k:h-12 ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
      {children && open && <ul className="ml-6 bg-latar-header">{children}</ul>}
    </li>
  );
};

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Header />
      <main className="p-4 bg-outlet min-h-screen bg-cover pt-20 4k:pt-36">
        <Outlet />
      </main>
      <div className="fixed bottom-5 left-5 z-[1100]">
        <button
          className="bg-latar-header text-white p-3 4k:p-8 rounded-full shadow-lg hover:bg-latar-select transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-auto 4k:h-14" />
          ) : (
            <RectangleGroupIcon className="h-6 w-auto 4k:h-14 rotate-180" />
          )}
        </button>
        {menuOpen && (
          <div className="mt-2 bg-kartu text-tombol-abu-tua shadow-lg rounded-lg overflow-hidden w-60 4k:w-96 text-sm 4k:text-4xl">
            <ul>
              <MenuItem
                label="Dashboard"
                icon={HomeIcon}
                to="/dashboard-management"
              />
              <MenuItem label="PLN" icon={PowerIcon} to="/pln" />
              <MenuItem label="Solar PV" icon={SunIcon} to="/solar-pv" />
              <MenuItem label="Emission" icon={CloudIcon} to="/emission" />
              <MenuItem label="Cost" icon={CurrencyDollarIcon} to="/cost" />
              <MenuItem
                label="Summary All Floors"
                icon={BuildingOfficeIcon}
                to="/summary-all-floors"
              />
              <MenuItem label="Detail Each Floor" icon={CubeIcon}>
                {[
                  "1st Floor",
                  "1st Floor Annex",
                  "Mezzanine",
                  "Mosque",
                  "2nd Floor",
                  "2nd Floor Annex",
                  "3rd Floor",
                  "4th Floor",
                  "5th Floor",
                  "6th Floor",
                  "7th Floor",
                  "8th Floor",
                  "External",
                ].map((floor) => (
                  <li key={floor}>
                    <Link
                      to={`/detail-each-floor/${floor
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                      className="block px-4 py-2 hover:bg-latar-header bg-kartu"
                    >
                      {floor}
                    </Link>
                  </li>
                ))}
              </MenuItem>
              <MenuItem
                label="Summary All Equipment"
                icon={ClipboardDocumentIcon}
                to="/summary-all-equipment"
              />
              <MenuItem
                label="Detail Each Equipment"
                icon={WrenchIcon}
                to="/detail-each-equipment"
              />
              <MenuItem
                label="Input Setting"
                icon={CogIcon}
                to="/input-setting"
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  HomeIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon as HomeIconSolid } from "@heroicons/react/24/solid";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link, Outlet } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import logo from "@src/assets/logo-toyota.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../slices/sidebarSlice";
import Labeling from "./Labeling";
import bgImage from "@src/assets/bg-7.jpg";

const navigation = [
  { name: "Dashboard", href: "dashboard", icon: HomeIcon, current: false },
  {
    name: "Under Body",
    href: "under-body",
    icon: Squares2X2Icon,
    current: false,
  },
  {
    name: "Main Body",
    href: "main-body",
    icon: Squares2X2Icon,
    current: false,
  },
  {
    name: "Side Member",
    href: "side-member",
    icon: Squares2X2Icon,
    current: false,
  },
  {
    name: "Shell Body",
    href: "shell-body",
    icon: Squares2X2Icon,
    current: false,
  },
  { name: "Conveyor", href: "conveyor", icon: Squares2X2Icon, current: false },
  {
    name: "OHC",
    icon: Squares2X2Icon,
    current: true,
    children: [
      { name: "UBF - MBT", href: "/ohc-ubf-mbt", icon: ArrowRightIcon },
      { name: "MBT - MBR", href: "/ohc-mbt-mbr", icon: ArrowRightIcon },
      { name: "MBR - SBC", href: "/ohc-mbr-sbc", icon: ArrowRightIcon },
      { name: "SBC - WT", href: "/ohc-sbc-wt", icon: ArrowRightIcon },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hideSidebar = useSelector((state) => state.sidebar.hideSidebar);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-4 w-4 4k:h-8 4k:w-8 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="h-16 shrink-0 items-center py-2">
                      <img
                        className="h-8 w-auto"
                        src={logo}
                        alt="Toyota Indonesia"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                {!item.children ? (
                                  <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                      classNames(
                                        isActive
                                          ? "bg-sidebar"
                                          : "hover:bg-sidebar",
                                        "group flex items-center gap-x-3 rounded-md p-2 text-medium text-sm 4k:text-2xl leading-6 text-dongker"
                                      )
                                    }
                                  >
                                    <item.icon
                                      className="h-4 w-4 4k:h-8 4k:w-8 shrink-0 text-dongker"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </NavLink>
                                ) : (
                                  <Disclosure as="div">
                                    {({ open }) => (
                                      <>
                                        <Disclosure.Button
                                          className={classNames(
                                            item.current
                                              ? "bg-sidebar"
                                              : "hover:bg-sidebar",
                                            "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-medium text-sm 4k:text-2xl leading-6 text-dongker"
                                          )}
                                        >
                                          <item.icon
                                            className="h-4 w-4 4k:h-8 4k:w-8 shrink-0 text-dongker"
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                          <ChevronRightIcon
                                            className={classNames(
                                              open
                                                ? "rotate-90 text-dongker"
                                                : "text-dongker",
                                              "ml-auto h-5 w-5 shrink-0"
                                            )}
                                            aria-hidden="true"
                                          />
                                        </Disclosure.Button>
                                        <Disclosure.Panel
                                          as="ul"
                                          className="mt-1 px-2"
                                        >
                                          {item.children.map((subItem) => (
                                            <li key={subItem.name}>
                                              {/* 44px */}
                                              <NavLink
                                                to={subItem.href}
                                                className={classNames(
                                                  subItem.current
                                                    ? "bg-sidebar"
                                                    : "hover:bg-sidebar",
                                                  "block rounded-md py-2 pr-2 pl-9 text-medium text-sm 4k:text-2xl leading-6 text-dongker"
                                                )}
                                              >
                                                {subItem.name}
                                              </NavLink>
                                            </li>
                                          ))}
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div
          className={`${
            hideSidebar
              ? "hidden lg:hidden"
              : "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 4k:w-96 lg:flex-col"
          } `}
        >
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar pb-4">
            <div className="shrink-0 flex items-center justify-center bg-white py-2 ">
              <img
                className="h-8 4k:h-12 w-auto"
                src={logo}
                alt="Toyota Indonesia"
              />
            </div>
            <nav className="flex flex-1 flex-col px-6 pt-20">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1 4k:space-y-4">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        {!item.children ? (
                          <NavLink
                            to={item.href}
                            className={({ isActive }) =>
                              classNames(
                                isActive ? "bg-sidebar" : "hover:bg-sidebar",
                                "group flex items-center gap-x-3 rounded-md p-2 text-medium text-md 4k:text-3xl leading-6 text-dongker"
                              )
                            }
                          >
                            <item.icon
                              className="h-4 w-4 4k:h-8 4k:w-8 shrink-0 text-dongker"
                              aria-hidden="true"
                            />
                            {item.name}
                          </NavLink>
                        ) : (
                          <Disclosure as="div">
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={classNames(
                                    item.current
                                      ? "bg-sidebar"
                                      : "hover:bg-sidebar",
                                    "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-medium text-md 4k:text-3xl leading-6 text-dongker"
                                  )}
                                >
                                  <item.icon
                                    className="h-4 w-4 4k:h-8 4k:w-8 shrink-0 text-dongker"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                  <ChevronRightIcon
                                    className={classNames(
                                      open
                                        ? "rotate-90 text-dongker"
                                        : "text-dongker",
                                      "ml-auto h-5 w-5 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel as="ul" className="mt-1 px-2">
                                  {item.children.map((subItem) => (
                                    <li key={subItem.name}>
                                      {/* 44px */}
                                      <NavLink
                                        to={subItem.href}
                                        className={classNames(
                                          subItem.current
                                            ? "bg-sidebar"
                                            : "hover:bg-sidebar",
                                          "block rounded-md py-2 4k:py-3 pr-2 pl-9 text-medium text-md 4k:text-3xl leading-6 text-dongker items-center"
                                        )}
                                      >
                                        <subItem.icon
                                          className="h-4 w-4 4k:h-8 4k:w-8 shrink-0 text-dongker"
                                          aria-hidden="true"
                                        />
                                        {subItem.name}
                                      </NavLink>
                                    </li>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div
          className={`${
            hideSidebar ? "lg:pl-0" : "lg:pl-64 4k:pl-96"
          } bg-sidebar lg:sticky`}
        >
          <div className="top-0 z-40 flex h-16 shrink-0 items-center gap-x-4  bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-dongker lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-4 w-4 4k:h-8 4k:w-8" aria-hidden="true" />
            </button>
            <div className="ml-5 p-2.5 text-dongker hidden lg:flex lg:items-center lg:gap-x-2">
              <span className="sr-only">Logo</span>
              <img
                className={`${!hideSidebar && "hidden"} h-8 4k:h-12 w-auto`}
                src={logo}
                alt="Toyota Indonesia"
              />
            </div>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 uppercase items-center justify-center self-stretch lg:gap-x-6 text-dongker font-bold md:text-2xl 4k:text-4xl">
              {Labeling.app.title}
            </div>
          </div>

          <main
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
            className="py-4 bg-outlet min-h-screen bg-cover"
          >
            <div className="px-4 sm:px-6 lg:px-8 4k:px-10 text-dongker">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

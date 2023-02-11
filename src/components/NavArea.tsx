"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Popover, Switch } from "@headlessui/react";
import { SunIcon, MoonIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Searchbar from "./Searchbar";

const getTheme = () => {
  const theme = localStorage.getItem("theme") as "dark" | "light" | null;
  if (theme) return theme;
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const routes = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Brands", path: "/brands" },
];

const NavArea = () => {
  const [mode, modeSet] = useState("light");
  const pathname = usePathname();

  useEffect(() => {
    modeSet(getTheme());
  }, []);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const setTheme = (mode: "dark" | "light") => {
    modeSet(mode);
    localStorage.setItem("theme", mode);
  };

  return (
    <>
      <ul className="ml-4 mt-2 hidden items-end lg:flex">
        {routes.map((route) => (
          <li
            key={route.name}
            className={`mx-2 px-1 py-1 transition-colors hover:text-primary-500 ${
              route.path !== "/" && pathname?.startsWith(route.path)
                ? "text-primary-500"
                : route.path === pathname
                ? "text-primary-500"
                : ""
            }`}
          >
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
      <div className="mr-0 ml-auto flex items-center">
        <Searchbar />
        <button
          className="block rounded-full p-2 text-2xl hover:bg-primary-500 hover:bg-opacity-20 dark:hidden"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon className="h-5 w-5" />
        </button>
        <button
          className="hidden rounded-full p-2 text-2xl hover:bg-primary-500 hover:bg-opacity-20 dark:block"
          onClick={() => setTheme("light")}
        >
          <SunIcon className="h-5 w-5" />
        </button>
        <Popover className="relative lg:hidden">
          <Popover.Button
            className={
              "px-1 py-1 text-2xl transition-colors hover:bg-primary-500 hover:bg-opacity-20"
            }
          >
            <Bars3Icon className="h-8 w-8" />
          </Popover.Button>

          <Popover.Panel className="absolute right-0 z-10 bg-gray-50 shadow dark:bg-gray-800">
            <ul className="">
              {routes.map((route) => (
                <li
                  key={route.name}
                  className="mx-1 my-2 px-4 py-1 transition-colors hover:bg-primary-500 hover:bg-opacity-20"
                >
                  <Link href={route.path}>{route.name}</Link>
                </li>
              ))}
            </ul>
          </Popover.Panel>
        </Popover>
      </div>
    </>
  );
};

export default NavArea;

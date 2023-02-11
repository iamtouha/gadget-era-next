"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { SunIcon, MoonIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

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
            className={`mx-1 bg-opacity-20 px-2 py-1 transition-colors hover:bg-primary-500 hover:bg-opacity-20 ${
              route.path !== "/" && pathname?.startsWith(route.path)
                ? "bg-primary-500"
                : route.path === pathname
                ? "bg-primary-500"
                : ""
            }`}
          >
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
      <div className="mr-0 ml-auto flex items-center gap-2 md:gap-4">
        <button
          className="block h-5 w-5 dark:hidden"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
        </button>
        <button
          className="hidden h-6 w-6 dark:block"
          onClick={() => setTheme("light")}
        >
          <SunIcon />
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

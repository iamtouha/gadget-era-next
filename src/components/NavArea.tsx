"use client";
import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Searchbar from "./Searchbar";
import { useCartStore } from "@/stores/cart";

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
  const cartLength = useCartStore((state) => state.items.length);
  const [loaded, loadedSet] = useState(false);
  const [mode, modeSet] = useState("light");
  const pathname = usePathname();

  useEffect(() => {
    loadedSet(true);
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
      <div className="mr-0 ml-auto flex items-center md:gap-3">
        <Searchbar />
        <Link
          href={"/user/account"}
          className="block gap-1 p-2 hover:text-primary-500 md:flex md:items-center md:py-1 md:px-2"
        >
          <UserCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-5 md:w-5" />
          <span className="hidden md:block">Account</span>
        </Link>
        <Link
          href={"/cart"}
          className="relative block gap-1 p-2 hover:bg-opacity-20 hover:text-primary-500 md:flex md:items-center md:py-1 md:px-2"
        >
          {cartLength && loaded ? (
            <span className="absolute top-0 left-0 h-4 w-4 bg-primary-500 p-0.5 text-center text-xs leading-none text-white">
              {cartLength}
            </span>
          ) : null}
          <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-5 md:w-5" />
          <span className="hidden md:block">Cart</span>
        </Link>
        <button
          className="block p-2 hover:text-primary-500 dark:hidden"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-5 md:w-5" />
        </button>
        <button
          className="hidden p-2 hover:text-primary-500 dark:block"
          onClick={() => setTheme("light")}
        >
          <SunIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-5 md:w-5" />
        </button>
        <Menu as={"div"} className="relative lg:hidden">
          <div>
            <Menu.Button
              className={
                "px-1 py-1 transition-colors hover:bg-primary-500 hover:bg-opacity-20"
              }
            >
              <Bars3Icon className="h-7 w-7 sm:h-8 sm:w-8" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                <div className="px-1 py-1">
                  {routes.map((route) => (
                    <Menu.Item key={route.name}>
                      {({ active }) => (
                        <Link
                          href={route.path}
                          className={`${
                            active
                              ? "bg-primary-500 text-white"
                              : "text-gray-900 dark:text-gray-100"
                          } group flex w-full items-center px-2 py-2 text-sm`}
                        >
                          {route.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      </div>
    </>
  );
};

export default NavArea;

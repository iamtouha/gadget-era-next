"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Disclosure, Listbox, Switch, Transition } from "@headlessui/react";

import {
  ChevronUpIcon,
  ChevronUpDownIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import type { Brand, Category } from "@/utils/types";

type Props = {
  brands: Brand[];
  categories: Category[];
};

const FilterForm = ({ brands, categories }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, selectedCategorySet] = useState<Category | null>(
    categories.find((cat) => cat.id === searchParams?.get("category")) ?? null
  );
  const [selectedBrand, selectedBrandSet] = useState<Brand | null>(
    brands.find((item) => item.id === searchParams?.get("brand")) ?? null
  );
  const [selectedSorting, selectedSortingSet] = useState(
    searchParams?.get("sort") ?? ""
  );
  const [inStock, inStockSet] = useState(
    searchParams?.get("stock") ? true : false
  );
  const [discount, discountSet] = useState(
    searchParams?.get("discount") ? true : false
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (selectedCategory) params.set("category", selectedCategory.id);
    else params.delete("category");

    if (selectedBrand) params.set("brand", selectedBrand.id);
    else params.delete("brand");

    if (selectedSorting) params.set("sort", selectedSorting);
    else params.delete("sort");

    if (inStock) params.set("stock", "true");
    else params.delete("stock");

    if (discount) params.set("discount", "true");
    else params.delete("discount");

    router.push("/products?" + params.toString());
  }, [selectedCategory, selectedBrand, inStock, selectedSorting, discount]);

  const filtersCount = useMemo(() => {
    return (
      (selectedCategory ? 1 : 0) +
      (selectedBrand ? 1 : 0) +
      (inStock ? 1 : 0) +
      (discount ? 1 : 0)
    );
  }, [selectedCategory, selectedBrand, inStock, discount]);

  const clearFilters = () => {
    selectedCategorySet(null);
    selectedBrandSet(null);
    selectedSortingSet("");
    inStockSet(false);
    discountSet(false);
  };

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between bg-primary-500 bg-opacity-10 px-4 py-2 text-left font-medium hover:bg-primary-700 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
              Filter Products {filtersCount ? `(${filtersCount})` : ""}
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-primary-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="bg-primary-500 bg-opacity-10 p-2">
              <Listbox value={selectedCategory} onChange={selectedCategorySet}>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gray-900 sm:text-sm">
                    <span className="block truncate">
                      {selectedCategory?.name ?? (
                        <span className="text-gray-600 dark:text-gray-400">
                          Select a category
                        </span>
                      )}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm">
                      {categories.map((cat, catIdx) => (
                        <Listbox.Option
                          key={catIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-primary-500 bg-opacity-20 text-primary-900"
                                : "text-gray-900"
                            }`
                          }
                          value={cat}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate dark:text-white ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {cat.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>{" "}
              <Listbox value={selectedBrand} onChange={selectedBrandSet}>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gray-900 sm:text-sm">
                    <span className="block truncate">
                      {selectedBrand?.name ?? (
                        <span className="text-gray-600 dark:text-gray-400">
                          Select a brand
                        </span>
                      )}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm">
                      {brands.map((brand, brandIdx) => (
                        <Listbox.Option
                          key={brandIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-primary-500 bg-opacity-20 text-primary-900"
                                : "text-gray-900"
                            }`
                          }
                          value={brand}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate dark:text-white ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {brand.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <div className="mt-4 flex items-center gap-2">
                <Switch
                  checked={inStock}
                  onChange={inStockSet}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 ui-checked:bg-primary-600 dark:bg-gray-700 ui-checked:dark:bg-primary-600`}
                >
                  <span
                    className={`inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition ui-checked:translate-x-6`}
                  />
                </Switch>
                <span>Products in Stock</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Switch
                  checked={discount}
                  onChange={discountSet}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 ui-checked:bg-primary-600 dark:bg-gray-700 ui-checked:dark:bg-primary-600`}
                >
                  <span
                    className={`inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition ui-checked:translate-x-6`}
                  />
                </Switch>
                <span>Products with discount</span>
              </div>
              <button
                className="mt-2 px-2 py-1 text-sm text-primary-500 transition-colors hover:bg-primary-500 hover:bg-opacity-20"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="mt-4 flex w-full justify-between bg-primary-500 bg-opacity-10 px-4 py-2 text-left font-medium hover:bg-primary-700 hover:bg-opacity-10 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
              Sort Products
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-primary-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="bg-primary-500 bg-opacity-10 p-2">
              <div>
                <Listbox value={selectedSorting} onChange={selectedSortingSet}>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-gray-900 sm:text-sm">
                      <span className="block truncate">
                        {selectedSorting === ""
                          ? "created:desc"
                          : selectedSorting}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm">
                        <Listbox.Option
                          value={""}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-primary-500 bg-opacity-20 text-primary-900"
                                : "text-gray-900"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate dark:text-white ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                created:desc
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                        {[
                          "created:asc",
                          "price:asc",
                          "price:desc",
                          "name:asc",
                          "name:desc",
                        ].map((order, orderIdx) => (
                          <Listbox.Option
                            key={orderIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-primary-500 bg-opacity-20 text-primary-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={order}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate dark:text-white ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {order}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default FilterForm;

"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Disclosure, Listbox, Switch, Transition } from "@headlessui/react";
import type { Dispatch, SetStateAction } from "react";

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

  const [filter, setFilter] = useState<FilterObject | null>(null);
  const [sort, sortSet] = useState(() => searchParams?.get("sort") ?? "");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const keys = ["sort", "category", "brand", "stock", "discount"];
    keys.forEach((key) => {
      if (params.has(key)) params.delete(key);
    });

    if (sort) params.set("sort", sort);
    if (filter?.category) params.set("category", filter?.category);
    if (filter?.brand) params.set("brand", filter?.brand);
    if (filter?.inStock) params.set("stock", "true");
    if (filter?.discount) params.set("discount", "true");

    router.push("/products?" + params.toString());
  }, [
    router,
    sort,
    filter?.category,
    filter?.brand,
    filter?.inStock,
    filter?.discount,
  ]);

  return (
    <>
      <Disclosure as="div" className="hidden lg:block" defaultOpen={true}>
        {({ open }) => (
          <FilterComponent
            open={open}
            brands={brands}
            categories={categories}
            onFilterChange={setFilter}
          />
        )}
      </Disclosure>
      <Disclosure as="div" className="lg:hidden">
        {({ open }) => (
          <FilterComponent
            open={open}
            brands={brands}
            categories={categories}
            onFilterChange={setFilter}
          />
        )}
      </Disclosure>
      <Disclosure as="div" className="hidden lg:block" defaultOpen={true}>
        {({ open }) => (
          <SortingComponent open={open} value={sort} onChange={sortSet} />
        )}
      </Disclosure>
      <Disclosure as="div" className="lg:hidden">
        {({ open }) => (
          <SortingComponent open={open} value={sort} onChange={sortSet} />
        )}
      </Disclosure>
    </>
  );
};

export default FilterForm;

const SortingComponent = ({
  open,
  value,
  onChange,
}: {
  open: boolean;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}) => (
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
        <Listbox value={value} onChange={onChange}>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-neutral-900 sm:text-sm">
              <span className="block truncate">
                {value === "" ? "created:desc" : value}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-neutral-400"
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 sm:text-sm">
                <Listbox.Option
                  value={""}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-primary-500 bg-opacity-20 text-primary-900"
                        : "text-neutral-900"
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
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
                          : "text-neutral-900"
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
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
);

type FilterObject = {
  brand?: string;
  category?: string;
  inStock?: boolean;
  discount?: boolean;
};

const FilterComponent = ({
  open,
  brands,
  categories,
  onFilterChange,
}: {
  open: boolean;
  brands: Brand[];
  categories: Category[];
  onFilterChange: Dispatch<SetStateAction<FilterObject | null>>;
}) => {
  const searchParams = useSearchParams();
  const [category, categorySet] = useState<Category | null>(
    categories.find((cat) => cat.id === searchParams?.get("category")) ?? null
  );
  const [brand, brandSet] = useState<Brand | null>(
    brands.find((item) => item.id === searchParams?.get("brand")) ?? null
  );

  const [inStock, inStockSet] = useState(() =>
    searchParams?.get("stock") ? true : false
  );
  const [discount, discountSet] = useState(() =>
    searchParams?.get("discount") ? true : false
  );
  const filtersCount = useMemo(() => {
    return (
      (category ? 1 : 0) +
      (brand ? 1 : 0) +
      (inStock ? 1 : 0) +
      (discount ? 1 : 0)
    );
  }, [category, brand, inStock, discount]);
  useEffect(() => {
    if (!brand && !category && !discount && !inStock) {
      onFilterChange(null);
      return;
    }
    onFilterChange({
      brand: brand?.id,
      category: category?.id,
      discount,
      inStock,
    });
  }, [category, brand, inStock, discount, onFilterChange]);

  const clearFilters = () => {
    categorySet(null);
    brandSet(null);
    inStockSet(false);
    discountSet(false);
  };
  return (
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
        <Listbox value={category} onChange={categorySet}>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-neutral-900 sm:text-sm">
              <span className="block truncate">
                {category?.name ?? (
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Select a category
                  </span>
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-neutral-400"
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 sm:text-sm">
                {categories.map((cat, catIdx) => (
                  <Listbox.Option
                    key={catIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-primary-500 bg-opacity-20 text-primary-900"
                          : "text-neutral-900"
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
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
        <Listbox value={brand} onChange={brandSet}>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-neutral-900 sm:text-sm">
              <span className="block truncate">
                {brand?.name ?? (
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Select a brand
                  </span>
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-neutral-400"
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 sm:text-sm">
                {brands.map((brand, brandIdx) => (
                  <Listbox.Option
                    key={brandIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-primary-500 bg-opacity-20 text-primary-900"
                          : "text-neutral-900"
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
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
            className={`relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-300 ui-checked:bg-primary-600 dark:bg-neutral-700 ui-checked:dark:bg-primary-600`}
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
            className={`relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-300 ui-checked:bg-primary-600 dark:bg-neutral-700 ui-checked:dark:bg-primary-600`}
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
  );
};

"use client";

import { debounce } from "ts-debounce";
import { Fragment, useState, useEffect, useCallback } from "react";
import styles from "@/styles/searchbar.module.css";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

// icons imports
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3BottomLeftIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import type { Product } from "@/utils/types";

const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isError, isErrorSet] = useState(false);
  const [isLoading, isLoadingSet] = useState(false);
  const [products, productsSet] = useState<Product[]>([]);
  const router = useRouter();
  const controller = new AbortController();

  const loadResult = debounce((text: string) => {
    if (!text) {
      productsSet([]);
      return;
    }
    isErrorSet(false);
    isLoadingSet(true);
    fetch("/api/search/" + text, { signal: controller.signal })
      .then((res) => res.json())
      .then(
        (data: Product[]) => {
          productsSet(data);
        },
        (e: Error) => {
          if (e.name === "AbortError") {
            console.log("req aborted");
          } else {
            console.error(e);
            isErrorSet(true);
          }
        }
      )

      .finally(() => {
        isLoadingSet(false);
      });
  }, 200); 

  useEffect(() => {
    loadResult(query);
    return () => controller.abort();
  }, [query]);

  // handle keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);

  return (
    <>
      <button
        aria-label="search"
        aria-keyshortcuts="Ctrl K"
        onClick={() => setIsOpen(true)}
        className={styles.button}
      >
        <MagnifyingGlassIcon className={styles.buttonIcon} aria-hidden="true" />
        <span className="hidden md:block">Search</span>
      </button>
      <section aria-label="search-modal">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className={styles.dialog}
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={
                  "fixed inset-0 bg-neutral-900/80 dark:bg-neutral-700/80"
                }
              />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className={styles.dialogPanelWrapper}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel>
                    <Combobox
                      onChange={(val: Product) => {
                        setIsOpen(false);
                        router.push("/product/" + val.key);
                      }}
                    >
                      <div className={styles.inputWrapper}>
                        <Combobox.Button className={styles.iconWrapper}>
                          <MagnifyingGlassIcon
                            className={`${styles.icon} text-neutral-500`}
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                        <Combobox.Input
                          className={
                            styles.input + " bg-neutral-50 dark:bg-neutral-900"
                          }
                          placeholder={`Search Products`}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options
                          static
                          className={
                            styles.options + "  bg-white dark:bg-neutral-900"
                          }
                        >
                          {isLoading ? (
                            <div className={styles.optionLoading}>
                              <span className={styles.optionText}>
                                Loading...
                              </span>
                              <span className={`${styles.iconWrapper}`}>
                                <ArrowPathIcon
                                  className={styles.icon}
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          ) : isError ? (
                            <div className={styles.optionError}>
                              <span className={styles.optionText}>
                                An Error Occured!
                              </span>
                              <span className={`${styles.iconWrapper}`}>
                                <ExclamationTriangleIcon
                                  className={styles.icon}
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          ) : products.length === 0 && query !== "" ? (
                            <div className={styles.optionNull}>
                              <span className={styles.optionText}>
                                No item found
                              </span>
                              <span className={`${styles.iconWrapper}`}>
                                <XMarkIcon
                                  className={styles.icon}
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          ) : (
                            products.map((item) => (
                              <Combobox.Option
                                key={item.id}
                                className={`${styles.option} ui-active:bg-primary-400 ui-active:text-white`}
                                value={item}
                              >
                                <span className={styles.optionText}>
                                  {item.name}
                                </span>
                                <span
                                  className={`${styles.iconWrapper} dark:text-white`}
                                >
                                  <Bars3BottomLeftIcon
                                    className={styles.icon}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </Combobox>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </section>
    </>
  );
};

export default Searchbar;

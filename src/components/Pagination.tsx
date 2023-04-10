"use client";

import {
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  path: string;
}

const Pagination: React.FC<PaginationProps> = ({
  path,
  currentPage,
  totalPages,
}) => {
  const router = useRouter();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const pagesToShow = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page) => page > 0 && page <= totalPages
  );
  const onPageChange = (n: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", `${n}`);
    router.push(path + "?" + params.toString());
  };
  return (
    <div className="mt-6 flex justify-center lg:justify-start">
      <button
        onClick={() => onPageChange(1)}
        className={`mx-2 px-3 py-2 ${
          isFirstPage
            ? "cursor-not-allowed bg-neutral-400/40 text-neutral-500 dark:bg-neutral-800"
            : "cursor-pointer bg-primary-500/30 transition-colors hover:bg-primary-600/50"
        }`}
        disabled={isFirstPage}
      >
        <span className="hidden sm:block">First Page</span>
        <ChevronDoubleLeftIcon className="h-4 w-4 sm:hidden block" />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={`mx-1 px-3 py-2 ${
          isFirstPage
            ? "cursor-not-allowed bg-neutral-400/40 text-neutral-500 dark:bg-neutral-800"
            : "cursor-pointer bg-primary-500/30 transition-colors hover:bg-primary-600/50"
        }`}
        disabled={isFirstPage}
      >
        <span className="hidden sm:block">Prev.</span>
        <ChevronLeftIcon className="h-4 w-4 sm:hidden block" />
      </button>

      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 text-center mx-2 py-2 ${
            currentPage === page
              ? "cursor-not-allowed bg-primary-500/60"
              : "cursor-pointer bg-primary-500/30 transition-colors hover:bg-primary-600/50"
          }`}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={`mx-2 px-3 py-2 ${
          isLastPage
            ? "cursor-not-allowed bg-neutral-400/40 text-neutral-500 dark:bg-neutral-800"
            : "cursor-pointer bg-primary-500/30 transition-colors hover:bg-primary-600/50"
        }`}
        disabled={isLastPage}
      >
        <span className="hidden sm:block">Next</span>
        <ChevronRightIcon className="h-4 w-4 sm:hidden block" />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        className={`mx-1 px-3 py-2 ${
          isLastPage
            ? "cursor-not-allowed bg-neutral-400/40 text-neutral-500 dark:bg-neutral-800"
            : "cursor-pointer bg-primary-500/30 transition-colors hover:bg-primary-600/50"
        }`}
        disabled={isLastPage}
      >
        <span className="hidden sm:block">Last Page</span>
        <ChevronDoubleRightIcon className="h-4 w-4 sm:hidden block" />
      </button>
    </div>
  );
};

export default Pagination;

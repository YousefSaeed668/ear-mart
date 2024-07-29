"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
interface PaginationProps {
  numberOfResults?: number;
  numberOfPages?: number;
  currentPage?: number;
}
export function Pagination({
  numberOfResults,
  numberOfPages,
  currentPage,
}: PaginationProps) {
  if (!numberOfResults || !numberOfPages || !currentPage) {
    return null;
  }
  const maxPagesToShow = numberOfPages < 7 ? numberOfPages : 7;

  const pages =
    numberOfPages > 6
      ? [1, 2, 3, , "...", numberOfPages - 2, numberOfPages - 1, numberOfPages]
      : Array.from({ length: maxPagesToShow }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between   bg-white px-4 py-3 sm:px-6 mt-10 mb-24">
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage}</span> to{" "}
            <span className="font-medium">{numberOfPages}</span> of{" "}
            <span className="font-medium">{numberOfResults}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <Link
              href={`?page=${currentPage - 1}`}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </Link>
            {pages.map((page, index) => (
              <Link
                key={index}
                href={`?page=${page}`}
                className={`${
                  page === currentPage
                    ? "z-10 bg-[#EFF6FF] text-[#3B82F6] border-[#3B82F6] border-2"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                } relative inline-flex items-center px-4 py-2 text-sm font-medium`}
              >
                {page}
              </Link>
            ))}
            <Link
              href={`?page=${currentPage + 1}`}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

"use client";

import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (selected: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Set window width on client side
    setWindowWidth(window.innerWidth);

    // Update window width when resized
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive display settings
  const getPageRange = () => {
    if (windowWidth < 640) return 1; // Mobile
    if (windowWidth < 768) return 2; // Tablet
    return 3; // Desktop
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    if (onPageChange) {
      onPageChange(selectedItem.selected + 1);
      return;
    }

    // Create new URLSearchParams to preserve existing query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update the page parameter
    params.set("page", (selectedItem.selected + 1).toString());

    // Preserve the current path and append the updated query string
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center my-8">
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={getPageRange()}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1}
        containerClassName="flex items-center space-x-1 rtl:space-x-reverse"
        previousClassName="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        nextClassName="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        pageClassName="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        breakClassName="flex items-center justify-center w-10 h-10"
        activeClassName="!bg-gray-900 !text-white !border-gray-900 hover:!bg-gray-800"
        disabledClassName="opacity-40 cursor-not-allowed hover:bg-white"
        previousLabel={<ChevronLeft className="h-5 w-5" />}
        nextLabel={<ChevronRight className="h-5 w-5" />}
        breakLabel="..."
        renderOnZeroPageCount={null}
        nextLinkClassName="w-full h-full flex items-center justify-center cursor-pointer"
        previousLinkClassName="w-full h-full flex items-center justify-center cursor-pointer"
        pageLinkClassName="w-full h-full flex items-center justify-center cursor-pointer"
      />
    </div>
  );
};

export default Pagination;

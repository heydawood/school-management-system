import React, { useState } from 'react';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

interface CardPaginationProps {
  totalPages?: number;
  showItems?: number; // number of page buttons to show (default 4)
  onPageChange?: (page: number) => void;
}

const CardPagination: React.FC<CardPaginationProps> = ({ totalPages = 1, showItems = 4, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const renderPageNumbers = () => {
    let pages: (number | 'ellipsis')[] = [];

    if (totalPages <= showItems) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const middleCount = showItems - 2; // reserve slots for first + last
      let start = Math.max(2, currentPage - Math.floor(middleCount / 2));
      let end = Math.min(totalPages - 1, start + middleCount - 1);

      // Adjust if range is too small
      if (end - start + 1 < middleCount) {
        start = Math.max(2, end - middleCount + 1);
      }

      pages.push(1);

      if (start > 2) pages.push('ellipsis');

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push('ellipsis');

      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      page === 'ellipsis' ? (
        <span key={`ellipsis-${index}`} className="relative inline-flex items-center justify-center w-10 h-10 border border-neutral-975 bg-white text-gray-700">
          ...
        </span>
      ) : (
        <span
          key={page}
          className={`relative inline-flex items-center justify-center w-10 h-10 border border-neutral-975 text-sm font-medium cursor-pointer hover:bg-primary-25 ${
            currentPage === page ? 'z-10 bg-primary-25 text-primary-800' : 'text-gray-500 bg-white'
          }`}
          onClick={() => handlePageChange(page as number)}
        >
          {page}
        </span>
      ),
    );
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        {/* Previous */}
        <span
          className={`relative inline-flex items-center justify-center w-10 h-10 rounded-l-md text-gray-400 border border-neutral-975 hover:bg-primary-25 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
          onClick={() => {
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}
        >
          <IoMdArrowBack />
        </span>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next */}
        <span
          className={`relative inline-flex items-center justify-center w-10 h-10 rounded-r-md text-gray-400 border border-neutral-975 hover:bg-primary-25 ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
          onClick={() => {
            if (currentPage < totalPages) handlePageChange(currentPage + 1);
          }}
        >
          <IoMdArrowForward />
        </span>
      </nav>
    </div>
  );
};

export default CardPagination;

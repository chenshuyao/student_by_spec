import React from 'react';

/**
 * Props for the Pagination component.
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination component for navigating between pages.
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers to display (showing at most 5 pages at a time)
  const getPageNumbers = (): number[] => {
    const pageNumbers = [];
    
    // Start and end pages to show
    let startPage = Math.max(0, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    // Adjust if we're showing fewer than 5 pages
    if (endPage - startPage + 1 < 5 && totalPages > 5) {
      if (startPage === 0) {
        endPage = Math.min(4, totalPages - 1);
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(0, totalPages - 5);
      }
    }
    
    // Generate the page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6">
      <nav className="flex items-center" aria-label="Pagination">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className={`px-3 py-1 rounded-md mx-1 ${
            currentPage === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
          aria-label="Previous page"
        >
          上一页
        </button>

        {/* First page */}
        {getPageNumbers()[0] > 0 && (
          <>
            <button
              onClick={() => onPageChange(0)}
              className="px-3 py-1 rounded-md mx-1 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="First page"
            >
              1
            </button>
            {getPageNumbers()[0] > 1 && (
              <span className="px-2 py-1 text-gray-500 dark:text-gray-400">...</span>
            )}
          </>
        )}

        {/* Page numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md mx-1 ${
              page === currentPage
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            aria-label={`Page ${page + 1}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page + 1}
          </button>
        ))}

        {/* Last page */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 2 && (
              <span className="px-2 py-1 text-gray-500 dark:text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages - 1)}
              className="px-3 py-1 rounded-md mx-1 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Last page"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className={`px-3 py-1 rounded-md mx-1 ${
            currentPage === totalPages - 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
          aria-label="Next page"
        >
          下一页
        </button>
      </nav>
    </div>
  );
};

export default Pagination; 
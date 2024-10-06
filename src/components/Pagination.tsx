import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="text-gray-700">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

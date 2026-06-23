type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  maxButtons?: number;
  onPageChange: (page: number) => void;
};

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  maxButtons = 3,
}: PaginationControlsProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxButtons / 2),
      totalPages - maxButtons + 1,
    ),
  );
  const endPage = Math.min(
    totalPages,
    startPage + maxButtons - 1,
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className="flex flex-wrap gap-2 mt-6 pb-6 self-center items-center">
      {currentPage > 1 && totalPages > maxButtons && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          className="min-w-10 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 bg-[#cddfdf] text-[#055f61] hover:bg-[#5e9597] hover:text-[#FFFFFF]"
        >
          ←
        </button>
      )}

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`min-w-10 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
            currentPage === pageNumber
              ? "bg-[#055f61] text-white shadow-md"
              : "bg-[#cddfdf] text-[#055f61] hover:bg-[#5e9597] hover:text-[#FFFFFF]"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {currentPage < totalPages &&
        totalPages > maxButtons && (
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            className="min-w-10 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 bg-[#cddfdf] text-[#055f61] hover:bg-[#5e9597] hover:text-[#FFFFFF]"
          >
            →
          </button>
        )}
    </div>
  );
};

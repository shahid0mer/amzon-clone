const Pagination = ({ page, pages, onPageChange }) => {
  const maxButtons = 5; 
  const pageNumbers = [];

  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;

  if (endPage > pages) {
    endPage = pages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-6 space-x-2 ">
        <div className="rounded-md border border-gray-300 gap-3 shadow-md items-center">
            <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1  rounded disabled:opacity-50 hover:bg-gray-400"
      >
        Prev
      </button>

      {/* First page + ellipsis if needed */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1   hover:bg-gray-400"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Middle page buttons */}
      {pageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1   ${
            p === page ? " border border-black text-black" : "hover:bg-gray-400"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Last page + ellipsis if needed */}
      {endPage < pages && (
        <>
          {endPage < pages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(pages)}
            className="px-3 py-1   hover:bg-gray-400"
          >
            {pages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="px-3 py-1  disabled:opacity-50 hover:bg-gray-400"
      >
        Next
      </button>
        </div>
      
    </div>
  );
};

export default Pagination;

import React from "react";

const PaginationButton = ({ totalPagesArray, page, setPage }) => {
  const visiblePages = 7;
  const totalPages = totalPagesArray.length;
  let start = Math.max(1, page - Math.floor(visiblePages / 2));
  let end = start + visiblePages - 1;
  
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - visiblePages + 1);
  }
  const pages = totalPagesArray.slice(start - 1, end);

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`page-number ${
            page === pageNumber ? "active" : ""
          }`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
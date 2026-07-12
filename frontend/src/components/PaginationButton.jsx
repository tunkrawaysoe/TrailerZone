import React from "react";

const PaginationButton = ({ totalPagesArray, page, setPage }) => {
  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      {totalPagesArray.map((pageNumber) => (
        <button
          className={`page-number ${page === pageNumber ? "active" : ""}`}
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="page-btn"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
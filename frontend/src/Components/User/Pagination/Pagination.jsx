import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center m-5">
      <ul className="flex">
        {currentPage > 1 && (
          <>
            <li>
              <a
                onClick={() => paginate(1)}
                href="#!"
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-800 p-0 text-sm text-white transition duration-150 ease-in-out hover:bg-indigo-600"
              >
                <span className="material-icons text-sm">&#x219e;</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => paginate(currentPage - 1)}
                href="#!"
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-800 p-0 text-sm text-white transition duration-150 ease-in-out hover:bg-indigo-600"
              >
                <span className="material-icons text-sm">&#x2190;</span>
              </a>
            </li>
          </>
        )}
        <li>
          <a
            href="#!"
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-300 via-sky-500 to-emerald-500 p-0 text-sm text-white transition duration-150 ease-in-out"
          >
            {currentPage}
          </a>
        </li>
        {currentPage < totalPages && (
          <>
            <li>
              <a
                onClick={() => paginate(currentPage + 1)}
                href="#!"
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-800 p-0 text-sm text-white transition duration-150 ease-in-out hover:bg-indigo-600"
              >
                <span className="material-icons text-sm">&#x2192;</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => paginate(totalPages)}
                href="#!"
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-800 p-0 text-sm text-white transition duration-150 ease-in-out hover:bg-indigo-600"
              >
                <span className="material-icons text-sm">&#x21a0;</span>
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Pagination;

import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-yellow-400 inline"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a.75.75 0 0 1 .564 1.236l-1.849 1.803.438 2.558a.75.75 0 0 1-1.088.791L5.25 8.763 3.304 10.65a.75.75 0 0 1-1.088-.79l.437-2.558L.436 3.236A.75.75 0 0 1 .999 2h4.501l1.849-1.803a.75.75 0 0 1 1.201.001L9.5 2h4.5zm0 0"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-300 inline"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a.75.75 0 0 1 .564 1.236l-1.849 1.803.438 2.558a.75.75 0 0 1-1.088.791L5.25 8.763 3.304 10.65a.75.75 0 0 1-1.088-.79l.437-2.558L.436 3.236A.75.75 0 0 1 .999 2h4.501l1.849-1.803a.75.75 0 0 1 1.201.001L9.5 2h4.5zm0 0"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  }

  return <div className="inline">{stars}</div>;
};

export default StarRating;

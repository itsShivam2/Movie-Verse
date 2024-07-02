// import React from "react";

// const StarRating = ({ rating }) => {
//   const filledStars = Math.floor(rating / 2);
//   const hasHalfStar = (rating / 2) % 1 !== 0;
//   const unfilledStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

//   const Star = ({ filled }) => (
//     <svg
//       className="w-6 h-6"
//       viewBox="0 0 24 24"
//       fill={filled ? "#FFD700" : "#e4e5e9"}
//       stroke="#FFD700"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
//     </svg>
//   );

//   return (
//     <div className="flex items-center gap-2">
//     <div className="flex items-center">
//       {Array.from({ length: filledStars }).map((_, index) => (
//         <Star key={index} filled={true} />
//       ))}
//       {hasHalfStar && <Star filled={true} />}
//       {Array.from({ length: unfilledStars }).map((_, index) => (
//         <Star key={index} filled={false} />
//       ))}
//       </div>
//       <span className="text-white text-lg font-semibold font-sans">{rating?.toFixed(2)}</span>
//     </div>
//   );
// };

// export default StarRating;

import React from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const getColor = (rating) => {
  if (rating >= 8) return "#2ee65c";
  if (rating >= 6) return "#8bc34a";
  if (rating >= 4) return "#ffeb3b";
  if (rating >= 2) return "#ff9800";
  return "#f44336";
};

const StarRating = ({ rating }) => {
  const percentage = (rating / 10) * 100;
  const color = getColor(rating);

  return (
    <div className="h-16 w-16">
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          pathColor: color,
          textColor: "#fff",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      >
        <div>
          <span className="text-white text-2xl -mt-2">{rating.toFixed(1)}</span>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default StarRating;

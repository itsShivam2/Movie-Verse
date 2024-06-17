import React from "react";

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating / 2);
  const hasHalfStar = (rating / 2) % 1 !== 0;
  const unfilledStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  const Star = ({ filled }) => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill={filled ? "#FFD700" : "#e4e5e9"}
      stroke="#FFD700"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
    </svg>
  );

  return (
    <div className="flex items-center gap-2">
    <div className="flex items-center">
      {Array.from({ length: filledStars }).map((_, index) => (
        <Star key={index} filled={true} />
      ))}
      {hasHalfStar && <Star filled={true} />}
      {Array.from({ length: unfilledStars }).map((_, index) => (
        <Star key={index} filled={false} />
      ))}
      </div>
      <span className="text-white text-lg font-semibold font-sans">{rating?.toFixed(2)}</span>
    </div>
  );
};

export default StarRating;

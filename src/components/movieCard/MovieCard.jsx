import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="flex w-[320px] flex-col justify-center items-center gap-1 mx-8 mb-12 py-6 border-2 rounded-lg">
      <Link to={`/${movie.id}`}>
        <div className="flex flex-col gap-1">
          <div className="relative">
            <p className="absolute top-4 right-0 flex flex-col items-center justify-center gap-1 rounded-full bg-amber-500 h-20 w-20">
              <span></span>
              <span>{movie.vote_average}</span>
            </p>
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-auto rounded-lg"
              style={{ maxWidth: "300px" }}
            />
          </div>
          <h3 className="text-left w-fit">{movie.title}</h3>
        </div>
      </Link>
      {/* <p className="text-left">{movie.release_date}</p> */}
      {/* <p>{movie.overview}</p> */}
      {/* Add more movie details as needed */}
    </div>
  );
};

export default MovieCard;

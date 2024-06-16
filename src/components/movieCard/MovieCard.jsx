import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <h3>{movie.title}</h3>
      </Link>
      <p>{movie.overview}</p>
      {/* Add more movie details as needed */}
    </div>
  );
};

export default MovieCard;

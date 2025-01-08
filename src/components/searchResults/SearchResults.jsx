import React from 'react';
import { Link } from 'react-router-dom';

function SearchResults({ results }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {results.map((item) => (
        <Link
          key={item.id}
          to={`/${item.media_type}/${item.id}`}
          className="group relative transform transition-all duration-300 hover:scale-105"
        >
          <div className="rounded-lg overflow-hidden shadow-lg bg-white/5 backdrop-blur-sm">
            <div className="relative aspect-[2/3]">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium line-clamp-2">
                {item.title || item.name}
              </h3>
              <p className="text-white/60 text-sm mt-1 capitalize">
                {item.media_type}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
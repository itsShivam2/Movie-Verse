import React from "react";
import { Link } from "react-router-dom";

function SearchResults({ searchResults }) {
  return (
    <div className="w-full bg-gray-900 text-white py-6 px-auto">
      <h1 className="text-3xl font-bold my-4 px-4">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
        {searchResults.map((item) => (
          <Link to={`/${item.media_type}/${item.id}`} key={item.id}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="w-auto h-74 object-fit"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white">{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

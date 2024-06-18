import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center gap-4 bg-black text-white text-2xl font-[Poppins] p-5 shadow-2xl opacity-100">
      <div>
        <h2 className="font-bold font-cursive">
          <Link to="/">MovieVerse</Link>
        </h2>
      </div>
      <div className="justify-center items-center gap-8 hidden sm:visible">
        <span className="font-semibold hover:cursor-pointer hover:text-gray-400">
          <Link to="/genre">Explore</Link>
        </span>
        <span className="font-semibold hover:cursor-pointer hover:text-gray-400">
          <Link to="/watchlist">Watchlist</Link>
        </span>
      </div>
    </div>
  );
}

export default Navbar;

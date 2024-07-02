import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);
  return (
    <>
      <nav
        className={`${
          visible ? "top-0" : "-top-20"
        } navbar fixed w-full flex justify-between items-center gap-4 text-white text-2xl font-[Poppins] p-5 mb-8 shadow-2xl z-50 transition-top duration-300 bg-[#031022] bg-opacity-70`}
        style={{ transition: "top 0.3s" }}
      >
        <div>
          <h2 className="font-bold text-2xl font-cursive">
            <Link to="/">MovieVerse</Link>
          </h2>
        </div>
        <div className="flex justify-center items-center gap-8">
          <span className="font-semibold hover:cursor-pointer hover:text-gray-400 hidden sm:visible">
            <Link to="/genre">Explore</Link>
          </span>
          <span className="font-semibold hover:cursor-pointer hover:text-gray-400 hidden sm:visible">
            <Link to="/watchlist">Watchlist</Link>
          </span>
        </div>
      </nav>
      <nav>
        <div className="w-full h-0.5 bg-transparent"></div>
      </nav>
    </>
  );
}

export default Navbar;

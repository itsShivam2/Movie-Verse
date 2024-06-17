import React, { useState } from "react";
import Movie from "../../../../New folder/Movie.jpeg";
function Carousal({ movies }) {
  console.log("movies", movies);
  const [Movies, setMovies] = useState(movies);
  console.log("Movies", Movies);
  const [current, setCurrent] = useState(0);
  return (
    <section className="section">
      <div className="title">
        <h2></h2>
      </div>
      <div className="w-[80vw] h-[450px] max-w-[800px] text-center flex relative mt-16 my-0 mx-auto">
        {Movies.map((movie, index) => {
          return (
            <div key={index}>
              <img src={Movie} className="h-[320px] w-[240px]" />
              <h2>{movie.title}</h2>
            </div>
          );
        })}
        <button>Prev</button>
        <button>Next</button>
      </div>
    </section>
  );
}

export default Carousal;

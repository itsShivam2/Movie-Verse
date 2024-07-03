import React from "react";
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const List = ({ movies, mediaType }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    phablet: {
      breakpoint: { max: 768, min: 640 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <div className="my-8">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex flex-col items-center p-2">
            <Link to={`/${mediaType}/${movie.id}`}>
              <div className="flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.name || movie.title}
                  className="sm:w-60 sm:h-80 object-cover object-center rounded-lg"
                />
                <div className="absolute bottom-16 sm:bottom-14 left-4 h-16 w-16 bg-white rounded-full">
                  <CircularProgressbarWithChildren
                    value={(movie.vote_average / 10) * 100}
                    styles={buildStyles({
                      pathColor:
                        movie.vote_average >= 8
                          ? "#2ee65c"
                          : movie.vote_average >= 6
                          ? "#8bc34a"
                          : movie.vote_averagee >= 4
                          ? "#ffeb3b"
                          : movie.vote_average >= 2
                          ? "#ff9800"
                          : "#f44336",
                      textColor: "#fff",
                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  >
                    <div>
                      <span className="text-black text-2xl -mt-2">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
                <h3 className="w-full text-base text-left mt-11 sm:mt-10">
                  {movie.name || movie.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default List;

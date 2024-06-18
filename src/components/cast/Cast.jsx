import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Cast = ({ cast }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
    <div className="my-8 max-w-full overflow-hidden">
      <h2 className="text-3xl font-semibold mb-4">Cast</h2>
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
        {cast.map((c) => (
          <div key={c.id} className="flex flex-col items-center p-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
              alt={c.name}
              className="w-36 h-36 object-fit rounded-full"
            />
            <p className="mt-2 text-sm sm:text-base font-medium">{c.name}</p>
            <p className="text-xs sm:text-sm text-gray-400">{c.character}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Cast;

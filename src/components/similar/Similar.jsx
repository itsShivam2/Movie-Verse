import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Similar = ({ similar }) => {
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
        {similar.map((simi) => (
          <div
            key={simi.id}
            className="flex flex-col items-center p-2"
          >
            <div className="flex flex-col items-center">
              <div className="h-60 mb-6">
                <Link to={`/${simi.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${simi.poster_path}`}
                    alt={simi.name}
                    className="w-40 rounded-lg h-full object-cover object-center"
                  />
                </Link>
              </div>

              <h3 className="text-sm text-center">{simi.name}</h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Similar;

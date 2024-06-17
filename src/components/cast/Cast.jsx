import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Cast = ({ cast }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 480 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="my-8">
      <h2 className="text-3xl font-semibold mb-4">Cast</h2>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {cast.map((c) => (
          <div key={c.id} className="flex flex-col items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
              alt={c.name}
              className="w-28 h-28 rounded-full"
            />
            <p>{c.name}</p>
            <p>{c.character}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Cast;

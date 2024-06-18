import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const OfficialVideos = ({ videos }) => {
  const [loadedVideos, setLoadedVideos] = useState({});

  const handleThumbnailClick = (id) => {
    setLoadedVideos((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

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
        itemClass="p-2"
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
        {videos.map((video) => (
          <div key={video.id} className="flex flex-col items-center p-2">
            <div
              className="flex flex-col items-center p-4 rounded-lg shadow-md"
              onClick={() => handleThumbnailClick(video.id)}
            >
              {loadedVideos[video.id] ? (
                <div className="flex justify-center items-center">
                  <iframe
                    width="320"
                    height="150"
                    src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              ) : (
                <div className="">
                  <div className="">
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      width="320"
                      height="150"
                      className="rounded-lg cursor-pointer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-12 h-12 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.752 11.168l-5.197-3.034A1.5 1.5 0 008 9.066v5.868a1.5 1.5 0 001.555 1.502l5.197-3.034a1.5 1.5 0 000-2.6v0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              <h3 className="text-sm text-left text-white mt-2">
                {video.name}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default OfficialVideos;

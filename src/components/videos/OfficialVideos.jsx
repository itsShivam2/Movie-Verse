import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import ReactPlayer from "react-player/youtube";
import "react-multi-carousel/lib/styles.css";

const OfficialVideos = ({ videos }) => {
  const [loadedVideoId, setLoadedVideoId] = useState(null);

  const handleThumbnailClick = (id) => {
    setLoadedVideoId(id);
  };

  const closePlayer = () => {
    setLoadedVideoId(null);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    phablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <div className="my-8 max-w-full overflow-hidden relative">
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
          //one video container
          <div key={video.id} className="flex flex-col items-center p-2">
            <div
              className="relative flex flex-col items-center p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleThumbnailClick(video.id)}
            >
              {/* image */}
              <img
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt={video.name}
                className="rounded-lg h-40 w-60 object-cover object-center"
              />
              {/* svg */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="80px"
                  height="80px"
                  viewBox="0 0 213.7 213.7"
                  enableBackground="new 0 0 213.7 213.7"
                  xmlSpace="preserve"
                  color="white"
                >
                  <polygon
                    color="white"
                    className="triangle"
                    fill="none"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    points="73.5,62.5 148.5,105.8 73.5,149.1 "
                  ></polygon>
                  <circle
                    className="circle"
                    fill="none"
                    color="white"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    cx="106.8"
                    cy="106.8"
                    r="103.3"
                  ></circle>
                </svg>
              </div>
              {/* name */}
              <h3 className="text-sm text-left text-white mt-2">
                {video.name}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>

      {loadedVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative p-4 bg-black rounded-lg">
            <button
              onClick={closePlayer}
              className="absolute top-2 right-2 text-white bg-gray-700 rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${
                videos.find((video) => video.id === loadedVideoId).key
              }`}
              playing
              controls
              width="100%"
              height="100%"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficialVideos;

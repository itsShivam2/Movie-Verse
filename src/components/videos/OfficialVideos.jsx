import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const OfficialVideos = ({ videos }) => {
  return (
    <div className="my-8">
      <h2 className="text-lg font-semibold mb-4">Official Videos</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        navigation
        // pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        className="swiper-container"
      >
        {videos.map((video) => (
          <SwiperSlide key={videos.id}>
            <iframe
              width="200"
              height="150"
              src={`https://www.youtube.com/embed/${video.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>{video.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfficialVideos;

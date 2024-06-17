import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Recommendations = ({ recommendations }) => {
  return (
    <div className="my-8">
      <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
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
        {recommendations.map((recommendation) => (
          <SwiperSlide key={recommendation.id}>
            <div className="flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                alt={recommendation.title}
                className="w-40 h-60 rounded-lg mb-6"
              />
              <h3 className="text-sm text-center">{recommendation.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommendations;

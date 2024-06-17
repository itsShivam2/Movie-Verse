import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Cast = ({ cast }) => {
  return (
    <div className="my-8">
      <h2 className="text-lg font-semibold mb-4">Cast</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
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
        {cast.map((c) => (
          <SwiperSlide key={c.id}>
            <div className="flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                alt={c.name}
                className="w-20 h-20 rounded-full"
              />
              <p>{c.name}</p>
              <p>{c.character}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cast;

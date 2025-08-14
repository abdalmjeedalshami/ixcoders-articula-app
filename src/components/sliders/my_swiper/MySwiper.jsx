import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import WriterCard from "../../cards/writer_card/WriterCard";
// import "./MySwiper.css"

const MySwiper = ({ list }) => {
  return (
    <div className="position-relative">
      {/* Custom Navigation Buttons */}
      <div
        className="swiper-button-prev-custom position-absolute top-50 translate-middle-y z-3"
        style={{ left: "-9vh", color: "red", fontSize: "5rem" }}
      >
        <IoIosArrowBack />
      </div>
      <div
        className="swiper-button-next-custom position-absolute top-50 translate-middle-y z-3"
        style={{ right: "-9vh", color: "red", fontSize: "5rem" }}
      >
        <IoIosArrowForward />
      </div>

      <Swiper
      className="writers-swiper"
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={20}
        breakpoints={{
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
      >
        {list.map((writer) => (
          <SwiperSlide key={writer.id}>
            <WriterCard writer={writer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MySwiper;

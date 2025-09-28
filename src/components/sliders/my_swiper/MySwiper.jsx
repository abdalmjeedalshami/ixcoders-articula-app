import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-cube";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import WriterCard from "../../cards/writer_card/WriterCard";
import "./MySwiper.css";
import { useTranslation } from "react-i18next";

const MySwiper = ({ list }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="position-relative" dir={isArabic ? "rtl" : "ltr"}>
      {/* Custom Navigation Buttons */}
      <div
        className="swiper-button-prev-custom position-absolute top-50 translate-middle-y z-3"
        style={{
          [isArabic ? "right" : "left"]: "-9vh",
          color: "red",
          fontSize: "5rem",
        }}
      >
        {isArabic ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </div>
      <div
        className="swiper-button-next-custom position-absolute top-50 translate-middle-y z-3"
        style={{
          [isArabic ? "left" : "right"]: "-9vh",
          color: "red",
          fontSize: "5rem",
        }}
      >
        {isArabic ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </div>

      <Swiper
        key={isArabic ? "ar" : "en"}
        className="writers-swiper"
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={20}
        dir={isArabic ? "rtl" : "ltr"}
        breakpoints={{
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          // nextEl: isArabic
          //   ? ".swiper-button-prev-custom"
          //   : ".swiper-button-next-custom",

          prevEl: ".swiper-button-prev-custom",
          // prevEl: isArabic
          //   ? ".swiper-button-next-custom"
          //   : ".swiper-button-prev-custom",
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

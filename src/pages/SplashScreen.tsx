import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const splashSlides = [
  {
    id: 1,
    image: '/images/spone.jpg'
  },
  {
    id: 2,
    image: '/images/sptwo.jpg'
  },
  {
    id: 3,
    image: '/images/spthree.jpg'
  }
];

export default function SplashScreen() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const handleSkip = () => {
    navigate("/login");
  };

  const handleComplete = () => {
    if (currentSlide < 2) {
      swiper?.slideNext();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        speed={600}
        grabCursor={true}
        touchRatio={1.5}
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        className="h-full w-full"
      >
        {splashSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-screen w-screen bg-cover bg-center bg-no-repeat relative p-6"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Skip Button - Top Right */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 bg-transparent text-black text-sm font-medium px-3 py-1 rounded-full border border-black hover:bg-opacity-80"
              >
                Skip
              </button>
              {/* Next/Get Started Button - Bottom Center */}
              <button
                onClick={handleComplete}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[rgb(133,96,67)] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-opacity-80"
              >
                {currentSlide < 2 ? "Next" : "Get Started"}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

import { useState, useRef } from "react";
import bannerGrocery from "@/assets/banner-grocery.jpg";
import bannerElectronics from "@/assets/banner-electronics.jpg";
import bannerFood from "@/assets/banner-food.jpg";

const banners = [
  {
    id: 1,
    image: bannerGrocery,
    title: "Fresh Groceries",
    subtitle: "Same day delivery",
  },
  {
    id: 2,
    image: bannerElectronics,
    title: "Electronics & Gadgets",
    subtitle: "Best prices guaranteed",
  },
  {
    id: 3,
    image: bannerFood,
    title: "Traditional Food",
    subtitle: "Authentic Nepali cuisine",
  },
];

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      } else {
        // Swipe right - previous slide
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
      }
    }

    setIsDragging(false);
    setCurrentX(0);
  };

  const getTransformValue = () => {
    if (isDragging) {
      const diff = currentX - startX;
      const maxOffset = 100; // Maximum drag offset in percentage
      const offset = (diff / (carouselRef.current?.offsetWidth || 1)) * 100;
      const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, offset));
      return `translateX(calc(-${currentSlide * 100}% + ${clampedOffset}px))`;
    }
    return `translateX(-${currentSlide * 100}%)`;
  };

  return (
    <div className="px-4 mb-6">
      <div className="relative overflow-hidden rounded-2xl shadow-brand">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: getTransformValue() }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0 relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{banner.title}</h3>
                  <p className="text-sm opacity-90">{banner.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
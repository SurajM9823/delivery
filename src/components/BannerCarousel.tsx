import { useState, useEffect } from "react";
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 mb-6">
      <div className="relative overflow-hidden rounded-2xl shadow-brand">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
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
        
        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-smooth ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
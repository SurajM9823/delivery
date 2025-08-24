import { Star, MapPin, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Assuming ShadCN UI or similar for tooltips

const trendingItems = [
  {
    id: 1,
    name: "Fresh Vegetables",
    vendor: "Organic Farm",
    distance: "0.5 km",
    rating: 4.8,
    price: "₹250",
    image: "🥬",
  },
  {
    id: 2,
    name: "Smartphone",
    vendor: "Tech Store",
    distance: "1.2 km",
    rating: 4.9,
    price: "₹25,000",
    image: "📱",
  },
  {
    id: 3,
    name: "Dal Bhat Set",
    vendor: "Local Kitchen",
    distance: "0.8 km",
    rating: 4.7,
    price: "₹150",
    image: "🍛",
  },
  {
    id: 4,
    name: "Books",
    vendor: "BookShop",
    distance: "2.1 km",
    rating: 4.6,
    price: "₹500",
    image: "📚",
  },
  // Add more items if needed for better scrolling demo
  {
    id: 5,
    name: "Wireless Earbuds",
    vendor: "Audio Hub",
    distance: "1.5 km",
    rating: 4.7,
    price: "₹2,500",
    image: "🎧",
  },
  {
    id: 6,
    name: "Organic Fruits",
    vendor: "Fresh Market",
    distance: "0.7 km",
    rating: 4.9,
    price: "₹300",
    image: "🍎",
  },
];

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      ))}
      {halfStar && <Star key="half" className="h-3 w-3 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-3 w-3 stroke-yellow-400 text-transparent" />
      ))}
    </>
  );
}

export function TrendingItems() {
  return (
    <section className="px-4 sm:px-6 md:px-8 mb-6 lg:mb-8">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-foreground tracking-tight">Trending Now 🔥</h2>
      <div className="flex gap-3 sm:gap-4 overflow-x-auto custom-scrollbar pb-3 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:gap-4 md:pb-0">
        {trendingItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ scale: 1.03, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.97 }}
            className="relative min-w-[140px] sm:min-w-[160px] bg-gradient-to-br from-card/90 to-card rounded-2xl p-4 shadow-lg border border-border/20 hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer group snap-start md:min-w-0"
            onClick={() => window.location.href = `/product/${item.id}`}
            aria-label={`View ${item.name} from ${item.vendor}`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full p-1.5 shadow-md group-hover:animate-bounce">
                  <Flame className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">Hot Item!</TooltipContent>
            </Tooltip>
            <div className="text-5xl sm:text-6xl mb-3 text-center group-hover:scale-105 transition-transform duration-300 ease-in-out">
              {item.image}
            </div>
            <h3 className="font-semibold text-sm sm:text-base mb-1 text-foreground line-clamp-1">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 truncate">{item.vendor}</p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-0.5">
                {renderStars(item.rating)}
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">{item.distance}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">Distance from you</TooltipContent>
              </Tooltip>
            </div>
            <p className="font-bold text-primary text-base sm:text-lg">{item.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
import { Star, MapPin } from "lucide-react";

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
];

export function TrendingItems() {
  return (
    <div className="px-3 mb-4">
      <h2 className="text-base font-semibold mb-3 text-foreground">Trending Now</h2>
      <div className="flex gap-2.5 overflow-x-auto custom-scrollbar pb-2">
        {trendingItems.map((item) => (
          <div
            key={item.id}
            className="min-w-[110px] bg-card rounded-lg p-2.5 shadow-sm border border-border/50 hover:shadow-brand transition-smooth cursor-pointer group"
            onClick={() => window.location.href = `/product/${item.id}`}
          >
            <div className="text-2xl mb-1.5 text-center group-hover:scale-110 transition-bounce">
              {item.image}
            </div>
            <h3 className="font-medium text-xs mb-1 text-foreground line-clamp-1">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-1.5 truncate">{item.vendor}</p>
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-muted-foreground text-xs">{item.rating}</span>
              </div>
              <div className="flex items-center gap-0.5 text-muted-foreground">
                <MapPin className="h-2.5 w-2.5" />
                <span className="text-xs">{item.distance}</span>
              </div>
            </div>
            <p className="font-semibold text-primary text-sm">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
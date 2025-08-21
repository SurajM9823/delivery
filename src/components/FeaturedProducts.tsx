import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    vendor: "Fresh Farm Valley",
    price: "₹80/kg",
    originalPrice: "₹100/kg",
    discount: "20% OFF",
    rating: 4.8,
    image: "🍅",
    inStock: true,
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    vendor: "Tech Hub KTM",
    price: "₹2,500",
    originalPrice: "₹3,000",
    discount: "17% OFF",
    rating: 4.6,
    image: "🎧",
    inStock: true,
  },
  {
    id: 3,
    name: "Momo (10 pcs)",
    vendor: "Tasty Corner",
    price: "₹120",
    originalPrice: "₹150",
    discount: "20% OFF",
    rating: 4.9,
    image: "🥟",
    inStock: true,
  },
  {
    id: 4,
    name: "Gaming Mouse",
    vendor: "Gamer's Paradise",
    price: "₹1,800",
    originalPrice: "₹2,200",
    discount: "18% OFF",
    rating: 4.7,
    image: "🖱️",
    inStock: false,
  },
];

export function FeaturedProducts() {
  return (
    <div className="px-3 mb-16">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">Featured Products</h2>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg p-2.5 shadow-sm border border-border/50 hover:shadow-brand transition-smooth group cursor-pointer"
            onClick={() => window.location.href = `/product/${product.id}`}
          >
            <div className="relative">
              <div className="text-3xl mb-2 text-center group-hover:scale-105 transition-bounce">
                {product.image}
              </div>
              <button className="absolute top-0 right-0 p-0.5">
                <Heart className="h-3.5 w-3.5 text-muted-foreground hover:text-red-500 hover:fill-red-500 transition-smooth" />
              </button>
              {product.discount && (
                <div className="absolute top-0 left-0 bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded-md font-semibold">
                  {product.discount}
                </div>
              )}
            </div>
            
            <h3 className="font-medium text-xs mb-1 text-foreground line-clamp-2 leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-1.5 truncate">{product.vendor}</p>
            
            <div className="flex items-center gap-1.5 mb-2">
              <span className="font-bold text-primary text-sm">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex gap-1">
              {product.inStock ? (
                <>
                  <Button 
                    variant="brand" 
                    size="sm" 
                    className="flex-1 h-7 text-xs"
                    onClick={() => window.location.href = `/product/${product.id}`}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="px-2 h-7 text-xs"
                    onClick={() => window.location.href = `/product/${product.id}`}
                  >
                    Buy
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" className="w-full h-7 text-xs" disabled>
                  Out of Stock
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
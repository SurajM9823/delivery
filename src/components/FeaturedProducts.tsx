import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const featuredProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    vendor: "Fresh Farm Valley",
    price: "₹80/kg",
    originalPrice: "₹100/kg",
    discount: "20% OFF",
    rating: 4.8,
    image: "🍅", // Replace with image URL in production
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
  {
    id: 5,
    name: "Fresh Apples",
    vendor: "Himalayan Orchard",
    price: "₹150/kg",
    originalPrice: "₹180/kg",
    discount: "15% OFF",
    rating: 4.5,
    image: "🍎",
    inStock: true,
  },
  {
    id: 6,
    name: "Smart Watch",
    vendor: "Tech Trends",
    price: "₹3,200",
    originalPrice: "₹3,800",
    discount: "16% OFF",
    rating: 4.4,
    image: "⌚",
    inStock: true,
  },
];

export function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="px-4 py-12 mb-16 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          🌟 Featured Products
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-teal-500 text-teal-500 hover:bg-teal-50 text-sm"
        >
          View All
        </Button>
      </div>

      {/* Grid: 2 columns on mobile, 3 columns on larger screens */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02, rotate: 0.5 }}
            className="relative rounded-lg bg-white border border-gray-200 hover:border-teal-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 overflow-hidden group"
          >
            {/* Discount Badge */}
            {product.discount && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.2 }}
                className="absolute top-2 left-2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm"
              >
                {product.discount}
              </motion.span>
            )}

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-2 right-2 bg-white/90 p-1 rounded-full shadow-sm hover:scale-105 transition-transform"
            >
              <Heart
                className={`h-4 w-4 ${
                  wishlist.includes(product.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-500"
                }`}
              />
            </button>

            {/* Product Image */}
            <div className="flex items-center justify-center h-24 md:h-32 text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-105">
              {product.image}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-medium text-lg text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{product.vendor}</p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-base text-teal-600">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`text-sm ${
                      idx < Math.floor(product.rating)
                        ? "text-amber-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                {product.inStock ? (
                  <Button
                    variant="outline"
                    className="w-32 border-teal-500 text-teal-600 hover:bg-teal-50 hover:text-teal-700 rounded-full text-sm py-2 shadow-sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1.5" /> Buy
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-32 bg-gray-200 text-gray-500 cursor-not-allowed rounded-full text-sm py-2 shadow-sm"
                  >
                    Out of Stock
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
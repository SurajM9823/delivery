import { useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Wireless Earbuds", vendor: "Tech Gadgets", price: "₹1999", image: "/placeholder-earbuds.jpg", inStock: true },
    { id: 2, name: "Yoga Mat", vendor: "Fitness Pro", price: "₹799", image: "/placeholder-mat.jpg", inStock: true },
    { id: 3, name: "Coffee Beans", vendor: "Brew Masters", price: "₹450", image: "/placeholder-coffee.jpg", inStock: false },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const moveToCart = (id: number) => {
    // In a real app, this would add to cart
    console.log("Moving item to cart:", id);
    removeFromWishlist(id);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Heart className="mr-2 text-red-500" />
            Wishlist
          </h1>
          <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {wishlistItems.length} items
          </span>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border p-4 flex">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.vendor}</p>
                  <p className="font-bold text-indigo-600 mt-1">{item.price}</p>
                  <div className="flex items-center mt-2">
                    {item.inStock ? (
                      <span className="text-green-600 text-sm font-medium">In Stock</span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                    className="self-end"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    size="sm"
                    disabled={!item.inStock}
                    onClick={() => moveToCart(item.id)}
                    className={item.inStock ? "rounded-full" : "rounded-full opacity-50 cursor-not-allowed"}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
            <p className="mt-1 text-gray-500">Start adding items you love!</p>
            <Button className="mt-4 rounded-full" onClick={() => window.location.href = "/"}>
              Browse Products
            </Button>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default WishlistPage;
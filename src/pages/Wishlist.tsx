import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { state, removeFromWishlist, addToCart } = useApp();
  const { toast } = useToast();

  const wishlistItems = state.wishlist;

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  const handleMoveToCart = (id: number) => {
    const item = wishlistItems.find(item => item.id === id);
    if (item) {
      addToCart(item);
      removeFromWishlist(id);
      toast({
        title: "Added to Cart",
        description: `${item.name} has been added to your cart`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 overflow-hidden">
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center text-primary bg-gradient-to-r from-primary/10 to-primary/20 p-2 rounded-lg shadow-md">
            <Heart className="mr-2 text-red-500 animate-pulse" />
            Wishlist
          </h1>
          <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full shadow-md border border-red-200">
            {wishlistItems.length} items
          </span>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-gradient-to-r from-indigo-100 to-green-100 p-4 flex items-center transition-all duration-300 hover-scale-102 hover:bg-gradient-to-br from-white to-gray-50">
                <div className="flex-shrink-0 bg-gradient-to-br from-gray-100 to-white border-2 border-dashed rounded-xl w-20 h-20 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl animate-pulse-scale transition-transform duration-300 hover:scale-110">{item.image}</span>
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="font-semibold text-xl text-gray-900 truncate hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{item.vendor}</p>
                  <p className="font-bold text-2xl text-primary mt-1 transition-all hover:text-primary/80">{item.price}</p>
                  <div className="flex items-center mt-2">
                    {item.inStock ? (
                      <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end space-y-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-all duration-300"
                  >
                    <Trash2 className="h-6 w-6" />
                  </Button>
                  <Button
                    size="sm"
                    disabled={!item.inStock}
                    onClick={() => handleMoveToCart(item.id)}
                    className={item.inStock ? "rounded-full bg-gradient-to-r from-primary to-primary/80 text-white border-2 border-primary hover:bg-gradient-to-r hover:from-primary/90 hover:to-primary/70 hover:text-white hover:border-primary/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(148,112,100,0.6)] transition-all duration-300 shadow-md font-semibold" : "rounded-full bg-gray-300 text-gray-500 border-2 border-gray-300 cursor-not-allowed opacity-50"}
                  >
                    <ShoppingCart className="h-5 w-5 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gradient-to-r from-indigo-100 to-green-100">
            <Heart className="mx-auto h-16 w-16 text-gray-400 animate-pulse transition-transform duration-300 hover:scale-110" />
            <h3 className="mt-6 text-xl font-semibold text-gray-900">Your wishlist is empty</h3>
            <p className="mt-2 text-gray-500">Start adding items you love!</p>
            <Button
              className="mt-6 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white border-2 border-primary hover:bg-gradient-to-r hover:from-primary/90 hover:to-primary/70 hover:text-white hover:border-primary/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(148,112,100,0.6)] transition-all duration-300 shadow-md font-semibold"
              onClick={() => navigate("/")}
            >
              Browse Products
            </Button>
          </div>
        )}
      </div>
      
      <BottomNavigation />
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .animate-pulse-scale {
          animation: pulse-scale 2.5s ease-in-out infinite;
        }
        .hover-scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default WishlistPage;
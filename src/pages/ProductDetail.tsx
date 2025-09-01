import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Share, Star, MapPin, Clock, Shield, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

// Mock product data - in real app, fetch by ID
const product = {
  id: 1,
  name: "Organic Tomatoes",
  vendor: {
    name: "Fresh Farm Valley",
    rating: 4.8,
    distance: "0.5 km",
    image: "👨‍🌾",
    verified: true,
    description: "Certified organic farm serving Kathmandu Valley for 10+ years"
  },
  price: "₹80/kg",
  originalPrice: "₹100/kg",
  discount: "20% OFF",
  rating: 4.8,
  reviews: 156,
  image: "🍅",
  inStock: true,
  description: "Fresh, organic tomatoes grown without pesticides. Perfect for cooking and salads. Sourced directly from local farms in the valley.",
  features: ["Organic Certified", "Pesticide Free", "Fresh Picked", "Local Farm"],
  nutritionInfo: "Rich in Vitamin C, Lycopene, and Antioxidants",
  deliveryTime: "30-45 mins"
};

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, addToWishlist, removeFromWishlist, state } = useApp();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      // Add the product multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          vendor: product.vendor.name,
          price: product.price,
          image: product.image,
          inStock: product.inStock,
          rating: product.rating,
          description: product.description
        });
      }
      toast({
        title: "Added to Cart",
        description: `${quantity}x ${product.name} added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate("/cart"), 500);
  };

  const handleToggleFavorite = () => {
    const productData = {
      id: product.id,
      name: product.name,
      vendor: product.vendor.name,
      price: product.price,
      image: product.image,
      inStock: product.inStock,
      rating: product.rating,
      description: product.description
    };

    if (isFavorite) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} removed from your wishlist`,
      });
    } else {
      addToWishlist(productData);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} added to your wishlist`,
      });
    }
    setIsFavorite(!isFavorite);
  };

  // Check if product is in wishlist on component mount
  useState(() => {
    const inWishlist = state.wishlist.some(item => item.id === product.id);
    setIsFavorite(inWishlist);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-800" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className="rounded-full hover:bg-gray-100"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"}`} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <Share className="h-5 w-5 text-gray-800" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative bg-white p-8 text-center">
        <div className="inline-flex items-center justify-center w-48 h-48 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-100 to-red-200 shadow-lg">
          <span className="text-8xl">{product.image}</span>
        </div>
        {product.discount && (
          <Badge variant="destructive" className="absolute top-4 right-4 px-3 py-1 text-sm font-bold rounded-full">
            {product.discount}
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-6 space-y-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
        </div>
        {product.inStock && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            In Stock
          </Badge>
        )}
      </div>

      {/* Vendor Info */}
      <Card className="mx-4 my-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow" onClick={() => navigate(`/vendor/${encodeURIComponent(product.vendor.name)}`)}>
        <div className="p-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
            {product.vendor.image}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-base text-gray-900">{product.vendor.name}</h3>
              {product.vendor.verified && (
                <Shield className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{product.vendor.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{product.vendor.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{product.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Description */}
      <div className="bg-white px-4 py-6 space-y-2 shadow-sm">
        <h3 className="font-semibold text-base text-gray-900">Description</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {product.description}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Nutrition:</span> {product.nutritionInfo}
        </p>
      </div>

      {/* Features */}
      <div className="bg-white px-4 py-6 space-y-2 shadow-sm">
        <h3 className="font-semibold text-base text-gray-900">Features</h3>
        <div className="flex flex-wrap gap-2">
          {product.features.map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-700">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="bg-white px-4 py-6 flex items-center justify-between shadow-sm">
        <h3 className="font-semibold text-base text-gray-900">Quantity</h3>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            className="h-8 w-8 rounded-full"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            className="h-8 w-8 rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4">
        <div className="flex gap-3 max-w-md mx-auto">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-lg text-gray-800 font-semibold"
            onClick={handleAddToCart}
            disabled={isLoading || !product.inStock}
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
          <Button
            className="flex-1 h-12 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
            onClick={handleBuyNow}
            disabled={isLoading || !product.inStock}
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
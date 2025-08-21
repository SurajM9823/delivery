import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Share, Star, MapPin, Clock, Shield, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="p-6 text-center bg-muted/30">
        <div className="text-8xl mb-4 animate-scale-in">
          {product.image}
        </div>
        {product.discount && (
          <Badge variant="destructive" className="text-sm font-semibold">
            {product.discount}
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-foreground mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews})</span>
            </div>
          </div>
        </div>

        {/* Vendor Info */}
        <Card className="p-3" onClick={() => navigate(`/vendor/${product.vendor.name}`)}>
          <div className="flex items-center gap-3">
            <div className="text-2xl">{product.vendor.image}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{product.vendor.name}</h3>
                {product.vendor.verified && (
                  <Shield className="h-4 w-4 text-green-500" />
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
        <div>
          <h3 className="font-semibold text-sm mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold text-sm mb-2">Features</h3>
          <div className="flex flex-wrap gap-2">
            {product.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between py-4">
          <h3 className="font-semibold text-sm">Quantity</h3>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(1)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 p-4">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Add to Cart
          </Button>
          <Button variant="brand" className="flex-1">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
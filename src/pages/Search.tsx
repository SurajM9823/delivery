import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ArrowLeft, Filter, MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";

// Mock search data
const mockProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    vendor: "Fresh Farm Valley",
    price: "₹80/kg",
    image: "🍅",
    rating: 4.8,
    distance: "0.5 km",
    deliveryTime: "30-45 mins",
    inStock: true
  },
  {
    id: 2,
    name: "Fresh Milk",
    vendor: "Dairy Farm",
    price: "₹60/liter",
    image: "🥛",
    rating: 4.6,
    distance: "1.2 km",
    deliveryTime: "20-30 mins",
    inStock: true
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    vendor: "Tech Hub KTM",
    price: "₹2,500",
    image: "🎧",
    rating: 4.9,
    distance: "2.1 km",
    deliveryTime: "45-60 mins",
    inStock: true
  },
  {
    id: 4,
    name: "Momo (10 pcs)",
    vendor: "Tasty Corner",
    price: "₹120",
    image: "🥟",
    rating: 4.7,
    distance: "0.8 km",
    deliveryTime: "25-35 mins",
    inStock: true
  }
];

const mockVendors = [
  {
    id: 1,
    name: "Fresh Farm Valley",
    image: "👨‍🌾",
    rating: 4.8,
    distance: "0.5 km",
    deliveryTime: "30-45 mins",
    categories: ["Vegetables", "Fruits", "Organic"]
  },
  {
    id: 2,
    name: "Tech Hub KTM",
    image: "🛍️",
    rating: 4.9,
    distance: "2.1 km",
    deliveryTime: "45-60 mins",
    categories: ["Electronics", "Gadgets"]
  },
  {
    id: 3,
    name: "Tasty Corner",
    image: "🍽️",
    rating: 4.7,
    distance: "0.8 km",
    deliveryTime: "25-35 mins",
    categories: ["Food", "Snacks"]
  }
];

export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [searchResults, setSearchResults] = useState({
    products: mockProducts,
    vendors: mockVendors
  });
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Update URL when search query changes
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }

    // Filter results based on search query
    if (searchQuery.trim()) {
      const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredVendors = mockVendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults({ products: filteredProducts, vendors: filteredVendors });
    } else {
      setSearchResults({ products: mockProducts, vendors: mockVendors });
    }
  }, [searchQuery, setSearchParams]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleVendorClick = (vendorName: string) => {
    navigate(`/vendor/${encodeURIComponent(vendorName)}`);
  };

  const renderProducts = () => (
    <div className="space-y-3">
      {searchResults.products.map((product) => (
        <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleProductClick(product.id)}>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="text-3xl">{product.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-base mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.vendor}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{product.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{product.deliveryTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{product.price}</span>
                  <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderVendors = () => (
    <div className="space-y-3">
      {searchResults.vendors.map((vendor) => (
        <Card key={vendor.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleVendorClick(vendor.name)}>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="text-4xl">{vendor.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-base mb-1">{vendor.name}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{vendor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{vendor.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{vendor.deliveryTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {vendor.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center gap-3 p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search Tabs */}
      <div className="px-4 py-3 border-b border-border/50">
        <div className="flex gap-2">
          {[
            { id: "all", label: "All" },
            { id: "products", label: "Products" },
            { id: "vendors", label: "Vendors" }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex-1"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div className="p-4 pb-20">
        {searchQuery && (
          <p className="text-sm text-muted-foreground mb-4">
            {activeTab === "all" && `Found ${searchResults.products.length} products and ${searchResults.vendors.length} vendors`}
            {activeTab === "products" && `Found ${searchResults.products.length} products`}
            {activeTab === "vendors" && `Found ${searchResults.vendors.length} vendors`}
            {searchQuery && " for "}
            <span className="font-medium">"{searchQuery}"</span>
          </p>
        )}

        {(activeTab === "all" || activeTab === "products") && searchResults.products.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-3">Products</h2>
            {renderProducts()}
          </div>
        )}

        {(activeTab === "all" || activeTab === "vendors") && searchResults.vendors.length > 0 && (
          <div>
            <h2 className="font-semibold text-lg mb-3">Vendors</h2>
            {renderVendors()}
          </div>
        )}

        {searchQuery && searchResults.products.length === 0 && searchResults.vendors.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-lg mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try searching for products or vendors with different keywords
            </p>
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-lg mb-2">Search for anything</h3>
            <p className="text-muted-foreground">
              Find products, vendors, and more in Kathmandu Valley
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
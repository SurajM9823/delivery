import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, ShoppingBag, Heart, MapPin, CreditCard, HelpCircle, LogOut, Edit3, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";

// User data constant for better organization
const USER_PROFILE = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 9876543210",
  avatar: "/placeholder-avatar.jpg",
};

// Menu items constant for cleaner code
const MENU_ITEMS = [
  { icon: ShoppingBag, label: "My Orders", path: "/orders" },
  { icon: Heart, label: "Wishlist", path: "/wishlist" },
  { icon: MapPin, label: "Addresses", path: "/addresses" },
  { icon: CreditCard, label: "Payment Methods", path: "/payments" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

// Featured vendors for profile page
const FEATURED_VENDORS = [
  {
    id: 1,
    name: "Fresh Farm Valley",
    image: "👨‍🌾",
    rating: 4.8,
    distance: "0.5 km",
    deliveryTime: "30-45 mins",
    categories: ["Vegetables", "Fruits", "Organic"],
    description: "Certified organic farm serving Kathmandu Valley"
  },
  {
    id: 2,
    name: "Tech Hub KTM",
    image: "🛍️",
    rating: 4.9,
    distance: "2.1 km",
    deliveryTime: "45-60 mins",
    categories: ["Electronics", "Gadgets"],
    description: "Latest tech gadgets and accessories"
  },
  {
    id: 3,
    name: "Tasty Corner",
    image: "🍽️",
    rating: 4.7,
    distance: "0.8 km",
    deliveryTime: "25-35 mins",
    categories: ["Food", "Snacks"],
    description: "Delicious local cuisine and snacks"
  }
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(USER_PROFILE);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleVendorClick = (vendorName: string) => {
    navigate(`/vendor/${encodeURIComponent(vendorName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-500 p-6 pb-16 rounded-b-[2rem] shadow-2xl">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-3 border-white shadow-md object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold text-white tracking-tight">{user.name}</h2>
              <p className="text-primary/80 text-sm font-medium">{user.email}</p>
              <p className="text-primary/60 text-xs font-light">{user.phone}</p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md shadow-md transition-all duration-300 hover:scale-105"
          >
            <Edit3 className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-2 pt-10 pb-20">
        <div className="grid gap-2">
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-primary/5 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 group"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors duration-200">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-gray-800 text-base">{item.label}</span>
                </div>
                <div className="i-lucide-chevron-right h-4 w-4 text-gray-400 transform transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            );
          })}
        </div>

        {/* Featured Vendors Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-4">Featured Vendors</h2>
          <div className="space-y-3 px-4">
            {FEATURED_VENDORS.map((vendor) => (
              <Card
                key={vendor.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleVendorClick(vendor.name)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="text-4xl">{vendor.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">{vendor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{vendor.description}</p>
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
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full mt-6 mx-4 flex items-center justify-center py-6 bg-red-50/40 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span className="font-medium text-base">Logout</span>
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-xl">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default ProfilePage;
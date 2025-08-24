import { useState } from "react";
import { User, Settings, ShoppingBag, Heart, MapPin, CreditCard, HelpCircle, LogOut, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    avatar: "/placeholder-avatar.jpg"
  });

  const menuItems = [
    { icon: ShoppingBag, label: "My Orders", path: "/orders" },
    { icon: Heart, label: "Wishlist", path: "/wishlist" },
    { icon: MapPin, label: "Addresses", path: "/addresses" },
    { icon: CreditCard, label: "Payment Methods", path: "/payments" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
  ];

  const handleLogout = () => {
    // In a real app, this would clear user session
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-b-3xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-indigo-100">{user.email}</p>
            </div>
          </div>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/20 hover:bg-white/30">
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm border divide-y">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="flex items-center justify-between p-4 w-full text-left hover:bg-gray-50 transition-colors"
                onClick={() => window.location.href = item.path}
              >
                <div className="flex items-center">
                  <Icon className="h-5 w-5 text-indigo-600" />
                  <span className="ml-3 font-medium">{item.label}</span>
                </div>
                <div className="i-lucide-chevron-right h-5 w-5 text-gray-400" />
              </button>
            );
          })}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 flex items-center justify-center py-6 border-red-200 text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
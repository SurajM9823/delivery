import { Home, Search, ShoppingCart, User, Heart } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Search, label: "Search", id: "search" },
  { icon: ShoppingCart, label: "Cart", id: "cart" },
  { icon: Heart, label: "Wishlist", id: "wishlist" },
  { icon: User, label: "Profile", id: "profile" },
];

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 transition-smooth ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <item.icon
                className={`h-5 w-5 mb-1 transition-smooth ${
                  isActive ? "scale-110" : ""
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-6 h-0.5 bg-primary rounded-full animate-scale-in" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
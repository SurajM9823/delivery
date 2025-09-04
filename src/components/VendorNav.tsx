import { useLocation, useNavigate } from "react-router-dom";
import { Home, Package, BarChart3, Settings, MessageSquare } from "lucide-react";



const vendorNavigationItems = [
  { title: "Home", url: "/vendor/dashboard", icon: Home },
  { title: "Tools", url: "/vendor/place-order", icon: Package },
  { title: "Message", url: "/vendor/messages", icon: MessageSquare },
  { title: "Setting", url: "/vendor/settings", icon: Settings },
];

const VendorSidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};


// Vendor Bottom Navigation Component
const VendorBottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 p-2 flex justify-around items-center z-50">
      {vendorNavigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.url;

        return (
          <button
            key={item.title}
            onClick={() => navigate(item.url)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
              isActive
                ? 'text-orange-600 bg-orange-50'
                : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
            }`}
            aria-label={item.title}
          >
            <Icon className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">{item.title}</span>
          </button>
        );
      })}
    </nav>
  );
};

export { VendorBottomNav };
export default VendorSidebar;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import VendorProfile from "./pages/VendorProfile";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import SearchPage from "./pages/Search";
import WishlistPage from "./pages/Wishlist";
import ProfilePage from "./pages/Profile";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import CheckOut from "./pages/CheckOut";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import PaymentMethods from "./pages/PaymentMethods";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Index />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/vendor/:vendorName" element={<VendorProfile />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/payments" element={<PaymentMethods />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;

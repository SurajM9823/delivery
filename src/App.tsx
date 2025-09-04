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
// Vendor Dashboard Pages
import VendorDashboard from "./pages/vendor/VendorHome";
import VendorPlaceOrder from "./pages/vendor/ToolPage";
import VendorSales from "./pages/vendor/VendorSales";
import VendorSettings from "./pages/vendor/VendorSettings";
import Message from "./pages/vendor/Message";

// Placeholder components for new routes
const ComposeMessage = () => <div className="p-8"><h1 className="text-2xl font-bold">Compose New Message</h1><p>Coming soon...</p></div>;
const Customers = () => <div className="p-8"><h1 className="text-2xl font-bold">Customer Management</h1><p>Coming soon...</p></div>;
const Analytics = () => <div className="p-8"><h1 className="text-2xl font-bold">Message Analytics</h1><p>Coming soon...</p></div>;
const Notifications = () => <div className="p-8"><h1 className="text-2xl font-bold">Notification Settings</h1><p>Coming soon...</p></div>;
const MessageSearch = () => <div className="p-8"><h1 className="text-2xl font-bold">Search Messages</h1><p>Coming soon...</p></div>;
const MessageSettings = () => <div className="p-8"><h1 className="text-2xl font-bold">Message Settings</h1><p>Coming soon...</p></div>;

// Tool page components with dummy data
const AddProducts = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Add New Products</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Product Statistics</h3>
        <p className="text-3xl font-bold text-blue-600">24</p>
        <p className="text-sm text-gray-600">Total Products</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <p className="text-3xl font-bold text-green-600">8</p>
        <p className="text-sm text-gray-600">Active Categories</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
        <p className="text-3xl font-bold text-orange-600">3</p>
        <p className="text-sm text-gray-600">Awaiting Review</p>
      </div>
    </div>
  </div>
);

const ProductsPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Product Management</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Electronics</h3>
        <p className="text-2xl font-bold text-purple-600">12</p>
        <p className="text-sm text-gray-600">Products</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Clothing</h3>
        <p className="text-2xl font-bold text-blue-600">8</p>
        <p className="text-sm text-gray-600">Products</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Home & Garden</h3>
        <p className="text-2xl font-bold text-green-600">6</p>
        <p className="text-sm text-gray-600">Products</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Sports</h3>
        <p className="text-2xl font-bold text-orange-600">4</p>
        <p className="text-sm text-gray-600">Products</p>
      </div>
    </div>
  </div>
);

const OrdersPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Order Management</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
        <p className="text-3xl font-bold text-blue-600">156</p>
        <p className="text-sm text-gray-600">This month</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Pending</h3>
        <p className="text-3xl font-bold text-yellow-600">23</p>
        <p className="text-sm text-gray-600">Awaiting processing</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Processing</h3>
        <p className="text-3xl font-bold text-purple-600">18</p>
        <p className="text-sm text-gray-600">In progress</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Completed</h3>
        <p className="text-3xl font-bold text-green-600">115</p>
        <p className="text-sm text-gray-600">Successfully delivered</p>
      </div>
    </div>
  </div>
);

const ReturnOrders = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Return Order Management</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Return Requests</h3>
        <p className="text-3xl font-bold text-red-600">7</p>
        <p className="text-sm text-gray-600">Pending review</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Approved Returns</h3>
        <p className="text-3xl font-bold text-green-600">12</p>
        <p className="text-sm text-gray-600">This month</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Refund Amount</h3>
        <p className="text-3xl font-bold text-blue-600">₹8,450</p>
        <p className="text-sm text-gray-600">Processed</p>
      </div>
    </div>
  </div>
);

const ManageReviews = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Review Management</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
        <p className="text-3xl font-bold text-yellow-600">4.7</p>
        <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Total Reviews</h3>
        <p className="text-3xl font-bold text-blue-600">89</p>
        <p className="text-sm text-gray-600">Customer feedback</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Pending Response</h3>
        <p className="text-3xl font-bold text-orange-600">5</p>
        <p className="text-sm text-gray-600">Need attention</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Positive Reviews</h3>
        <p className="text-3xl font-bold text-green-600">76</p>
        <p className="text-sm text-gray-600">85% positive</p>
      </div>
    </div>
  </div>
);

const MyIncomePage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Income Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Today's Earnings</h3>
        <p className="text-3xl font-bold text-green-600">₹2,450</p>
        <p className="text-sm text-gray-600">+12% from yesterday</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">This Week</h3>
        <p className="text-3xl font-bold text-blue-600">₹18,320</p>
        <p className="text-sm text-gray-600">7 days total</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">This Month</h3>
        <p className="text-3xl font-bold text-purple-600">₹72,850</p>
        <p className="text-sm text-gray-600">30 days total</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Pending Payout</h3>
        <p className="text-3xl font-bold text-orange-600">₹5,200</p>
        <p className="text-sm text-gray-600">Available for withdrawal</p>
      </div>
    </div>
  </div>
);

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
            {/* Vendor Dashboard Routes */}
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/place-order" element={<VendorPlaceOrder />} />
            <Route path="/vendor/sales" element={<VendorSales />} />
            <Route path="/vendor/messages" element={<Message />} />
            <Route path="/vendor/messages/compose" element={<ComposeMessage />} />
            <Route path="/vendor/messages/search" element={<MessageSearch />} />
            <Route path="/vendor/messages/settings" element={<MessageSettings />} />
            <Route path="/vendor/customers" element={<Customers />} />
            <Route path="/vendor/analytics" element={<Analytics />} />
            <Route path="/vendor/notifications" element={<Notifications />} />
            <Route path="/vendor/add-products" element={<AddProducts />} />
            <Route path="/vendor/products" element={<ProductsPage />} />
            <Route path="/vendor/orders" element={<OrdersPage />} />
            <Route path="/vendor/return-orders" element={<ReturnOrders />} />
            <Route path="/vendor/reviews" element={<ManageReviews />} />
            <Route path="/vendor/income" element={<MyIncomePage />} />
            <Route path="/vendor/settings" element={<VendorSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;

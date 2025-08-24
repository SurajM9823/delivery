import { Home, Search, ShoppingCart, User, Heart, Trash2, CreditCard, Truck, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, BrowserRouter, useRouteError } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  vendor: string;
  price: string;
  image: string;
  quantity: number;
  originalPrice?: string;
}

const mockRecommendations: CartItem[] = [
  { id: 1001, name: "Organic Apples", vendor: "Farm Fresh", price: "₹150/kg", image: "/placeholder-apple.jpg", quantity: 1 },
  { id: 1002, name: "Wireless Earbuds", vendor: "Tech Gadgets", price: "₹1999", image: "/placeholder-earbuds.jpg", quantity: 1 },
  { id: 1003, name: "Yoga Mat", vendor: "Fitness Pro", price: "₹799", image: "/placeholder-mat.jpg", quantity: 1 },
];

const navItems = [
  { icon: Home, label: "Home", id: "home", path: "/" },
  { icon: Search, label: "Search", id: "search", path: "/search" },
  { icon: ShoppingCart, label: "Cart", id: "cart", path: "/cart" },
  { icon: Heart, label: "Wishlist", id: "wishlist", path: "/wishlist", badge: 1 },
  { icon: User, label: "Profile", id: "profile", path: "/profile" },
];

// Error Boundary for better 404 handling
function ErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600">{error?.message || "The route doesn't exist."}</p>
      <Button
        size="lg"
        className="mt-6 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-6"
        onClick={() => window.location.href = "/"}
      >
        Go to Home
      </Button>
    </div>
  );
}

function BottomNavigation({ cartItemCount }: { cartItemCount: number }) {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const handleNavigation = (id: string, path: string) => {
    setActiveTab(id);
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-indigo-100/50 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 sm:h-20 max-w-2xl mx-auto py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const badge = item.id === "cart" ? cartItemCount : item.badge;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id, item.path)}
              aria-label={`Navigate to ${item.label}`}
              className={`relative flex flex-col items-center justify-center p-2 sm:p-4 transition-all duration-300 ease-in-out group ${
                isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <item.icon
                  className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 ease-in-out ${
                    isActive
                      ? "scale-110 drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]"
                      : "group-hover:scale-105 group-hover:drop-shadow-[0_0_4px_rgba(79,70,229,0.2)]"
                  }`}
                />
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-semibold animate-pulse">
                    {badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-xs font-medium tracking-wide mt-1 font-sans">{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute bottom-0 w-8 sm:w-10 h-0.5 bg-indigo-600 rounded-full shadow-[0_0_6px_rgba(79,70,229,0.4)]"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className={`absolute inset-0 rounded-full bg-indigo-100/10 transition-all duration-300 ${
                  isActive ? "opacity-20 scale-105" : "opacity-0 group-hover:opacity-10 group-hover:scale-100"
                }`}
              />
            </button>
          );
        })}
      </div>
      <style>{`
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

function CartPage({ setCartItemCount }: { setCartItemCount: (count: number) => void }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    const storedSavedItems = localStorage.getItem("savedItems");
    if (storedSavedItems) {
      setSavedItems(JSON.parse(storedSavedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
    setCartItemCount(cartItems.length);
  }, [cartItems, savedItems, setCartItemCount]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const saveForLater = (item: CartItem) => {
    setCartItems((prev) => prev.filter((i) => i.id !== item.id));
    setSavedItems((prev) => [...prev, { ...item, quantity: 1 }]);
  };

  const moveToCart = (item: CartItem) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== item.id));
    setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("₹", "").replace("/kg", ""));
      return sum + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.05;
  const shipping = subtotal > 500 ? 0 : 50;
  const totalDiscount = subtotal * discount;
  const grandTotal = subtotal + tax + shipping - totalDiscount;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 flex items-center">
          <ShoppingCart className="w-8 h-8 mr-3 text-indigo-600" /> Your Cart
        </h2>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-100 font-medium transition-colors duration-300"
            onClick={() => navigate("/cart")}
          >
            Continue Shopping
          </Button>
          {cartItems.length > 0 && (
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full text-red-600 hover:bg-red-50 transition-colors"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          )}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 bg-white rounded-2xl shadow-xl border border-indigo-100"
        >
          <ShoppingCart className="mx-auto h-20 w-20 text-indigo-300 mb-6" />
          <p className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</p>
          <p className="text-lg text-gray-500 mb-8">Discover amazing products and start shopping!</p>
          <Button
            size="lg"
            className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-6 transition-colors"
            onClick={() => navigate("/")}
          >
            Shop Now
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 border border-gray-100"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">Sold by {item.vendor}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-indigo-600">{item.price}</p>
                        {item.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">{item.originalPrice}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        className="h-10 w-10 rounded-full text-gray-600 hover:text-indigo-600"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-lg font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        className="h-10 w-10 rounded-full text-gray-600 hover:text-indigo-600"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="flex md:flex-col gap-2 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-start">
                      <Button
                        variant="ghost"
                        className="text-indigo-600 hover:text-indigo-700 flex items-center"
                        onClick={() => saveForLater(item)}
                      >
                        <Heart className="w-4 h-4 mr-2" /> Save
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 flex items-center"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Remove
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {savedItems.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Saved for Later</h3>
                <AnimatePresence>
                  {savedItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 border border-gray-100"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">Sold by {item.vendor}</p>
                        <p className="text-lg font-bold text-indigo-600">{item.price}</p>
                      </div>
                      <Button
                        variant="outline"
                        className="rounded-full border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 w-full md:w-auto px-6 py-2"
                        onClick={() => moveToCart(item)}
                      >
                        Move to Cart
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRecommendations.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3">
                    <div className="h-40 rounded-xl overflow-hidden bg-gray-50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.vendor}</p>
                    <p className="font-bold text-indigo-600">{item.price}</p>
                    <Button
                      variant="outline"
                      className="rounded-full border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                      onClick={() => setCartItems((prev) => [...prev, item])}
                    >
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-indigo-100 h-fit"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-3 text-indigo-600" />
              Order Summary
            </h3>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span className="text-green-600">-₹{totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600" : "text-gray-600"}>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-xl text-gray-800">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex gap-2">
                <Input
                  id="promo-code"
                  name="promo-code"
                  autoComplete="off"
                  placeholder="Promo code"
                  className="rounded-full"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={applyPromo}
                >
                  Apply
                </Button>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full mt-6 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 py-6 text-lg transition-colors"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
            <div className="mt-6 space-y-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-600" />
                <span>Free shipping on orders over ₹500</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-indigo-600" />
                <span>Gift wrapping available at checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <span>Secure payment with multiple options</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export function CartApp() {
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart" element={<CartPage setCartItemCount={setCartItemCount} />} />
        <Route path="/" element={<div>Home Page Placeholder</div>} />
        <Route path="/search" element={<div>Search Page Placeholder</div>} />
        <Route path="/wishlist" element={<div>Wishlist Page Placeholder</div>} />
        <Route path="/profile" element={<div>Profile Page Placeholder</div>} />
        <Route path="*" element={<ErrorBoundary />} />
      </Routes>
      <BottomNavigation cartItemCount={cartItemCount} />
    </BrowserRouter>
  );
}
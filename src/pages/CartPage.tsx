import { ShoppingCart, Trash2, CreditCard, Truck, Gift, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  vendor: string;
  price: string;
  image: string;
  quantity: number;
  originalPrice?: string;
}

const mockCartItems: CartItem[] = [
  { 
    id: 1, 
    name: "Organic Tomatoes", 
    vendor: "Fresh Farm Valley", 
    price: "₹80/kg", 
    image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&q=80&w=400&h=400", 
    quantity: 2 
  },
  { 
    id: 2, 
    name: "Fresh Milk", 
    vendor: "Dairy Farm", 
    price: "₹60", 
    image: "https://images.unsplash.com/photo-1563630381201-57b577f0a403?auto=format&fit=crop&q=80&w=400&h=400", 
    quantity: 1 
  },
];

const mockRecommendations: CartItem[] = [
  { 
    id: 1001, 
    name: "Organic Apples", 
    vendor: "Farm Fresh", 
    price: "₹150/kg", 
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=400&h=400", 
    quantity: 1 
  },
  { 
    id: 1002, 
    name: "Wireless Earbuds", 
    vendor: "Tech Gadgets", 
    price: "₹1999", 
    image: "https://images.unsplash.com/photo-1600185365926-3a2fe30a9348?auto=format&fit=crop&q=80&w=400&h=400", 
    quantity: 1 
  },
  { 
    id: 1003, 
    name: "Yoga Mat", 
    vendor: "Fitness Pro", 
    price: "₹799", 
    image: "https://images.unsplash.com/photo-1607457561901-e6ec209a0a5f?auto=format&fit=crop&q=80&w=400&h=400", 
    quantity: 1 
  },
];

function CartPage() {
  const { state, removeFromCart, updateCartQuantity, clearCart } = useApp();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const cartItems = state.cart.length > 0 ? state.cart : mockCartItems;
  const savedItems: CartItem[] = [];

  const updateQuantity = (id: number, delta: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateCartQuantity(id, newQuantity);
      }
    }
  };

  const removeItem = (id: number) => {
    removeFromCart(id);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const saveForLater = (item: CartItem) => {
    removeFromCart(item.id);
    toast({
      title: "Feature Coming Soon",
      description: "Save for later feature will be available soon",
    });
  };

  const moveToCart = (item: CartItem) => {
    toast({
      title: "Feature Coming Soon",
      description: "Move to cart feature will be available soon",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(0.1);
      toast({
        title: "Promo Applied",
        description: "10% discount has been applied",
      });
    } else {
      setDiscount(0);
      toast({
        title: "Invalid Promo",
        description: "Please enter a valid promo code",
        variant: "destructive",
      });
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-emerald-600" /> Shopping Cart
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 font-semibold transition-all duration-300 px-4 sm:px-6 text-sm sm:text-base"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
            {cartItems.length > 0 && (
              <Button
                variant="ghost"
                size="lg"
                className="rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold transition-all duration-300 px-4 sm:px-6 text-sm sm:text-base"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-28">
        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 sm:py-20 bg-white rounded-2xl shadow-xl border border-gray-200"
          >
            <ShoppingCart className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-emerald-500 mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Your Cart is Empty</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
              Start adding items to your cart and discover amazing products!
            </p>
            <Button
              size="lg"
              className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 px-6 sm:px-8 py-5 sm:py-6 font-semibold transition-all duration-300 text-sm sm:text-lg"
              onClick={() => navigate("/")}
            >
              Explore Products
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items & Saved Items */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Cart Items */}
              <div className="space-y-4 sm:space-y-6">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border border-gray-200"
                    >
                      <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=400"; }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-3">{item.vendor}</p>
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <p className="text-lg sm:text-xl font-bold text-emerald-600">{item.price}</p>
                          {item.originalPrice && (
                            <p className="text-xs sm:text-sm text-gray-500 line-through">{item.originalPrice}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 sm:h-10 w-8 sm:w-10 rounded-full border-gray-300 text-gray-700 hover:text-emerald-600 hover:border-emerald-600 transition-colors font-bold text-base sm:text-lg"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </Button>
                        <span className="w-10 sm:w-12 text-center text-base sm:text-lg font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 sm:h-10 w-8 sm:w-10 rounded-full border-gray-300 text-gray-700 hover:text-emerald-600 hover:border-emerald-600 transition-colors font-bold text-base sm:text-lg"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="flex sm:flex-col gap-2 sm:gap-3 mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-start">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-xl"
                          onClick={() => saveForLater(item)}
                        >
                          <Heart className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" /> Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-xl"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" /> Remove
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Saved for Later */}
              {savedItems.length > 0 && (
                <div className="mt-10 sm:mt-12">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Saved for Later</h3>
                  <AnimatePresence>
                    {savedItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border border-gray-200"
                      >
                        <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=400"; }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-500 mb-3">{item.vendor}</p>
                          <p className="text-lg sm:text-xl font-bold text-emerald-600">{item.price}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="lg"
                          className="rounded-xl border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 w-full sm:w-auto px-6 sm:px-8 font-semibold transition-all duration-300 text-sm sm:text-base"
                          onClick={() => moveToCart(item)}
                        >
                          Move to Cart
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Recommendations */}
              <div className="mt-10 sm:mt-12">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Recommended for You</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {mockRecommendations.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="h-48 sm:h-56 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=400"; }}
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 mb-3">{item.vendor}</p>
                        <p className="text-base sm:text-lg font-bold text-emerald-600 mb-4">{item.price}</p>
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full rounded-xl border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 font-semibold transition-all duration-300 text-sm sm:text-base"
                          onClick={() => {
                            toast({
                              title: "Feature Coming Soon",
                              description: "Add to cart from recommendations will be available soon",
                            });
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 h-fit border border-gray-200"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <CreditCard className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3 text-emerald-600" />
                Order Summary
              </h3>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Discount</span>
                  <span className="font-semibold text-green-600">-₹{totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "font-semibold text-green-600" : "font-semibold text-gray-700"}>
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Taxes (5%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4 flex justify-between font-bold text-lg sm:text-xl text-gray-900">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Input
                    id="promo-code"
                    name="promo-code"
                    autoComplete="off"
                    placeholder="Enter Promo Code"
                    className="rounded-xl border-gray-300 focus:ring-emerald-600 focus:border-emerald-600 text-sm sm:text-base py-4 sm:py-6"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-700 font-semibold transition-all duration-300 px-4 sm:px-6 text-sm sm:text-base"
                    onClick={applyPromo}
                  >
                    Apply
                  </Button>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full mt-6 sm:mt-8 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 py-5 sm:py-6 text-sm sm:text-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Truck className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
                  <span>Free shipping on orders over ₹500</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Gift className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
                  <span>Gift wrapping available at checkout</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CreditCard className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
                  <span>Secure payment options</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
      <BottomNavigation />
    </div>
  );
}

export default CartPage;
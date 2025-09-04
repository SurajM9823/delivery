import { ShoppingCart, Trash2, CreditCard, Truck, Gift, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6baf6?auto=format&fit=crop&q=80&w=400&h=400", 
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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const navigate = useNavigate();

  const cartItems = state.cart.length > 0 ? state.cart : mockCartItems;
  const savedItems: CartItem[] = [];

  useEffect(() => {
    setSelectedIds(cartItems.map(item => item.id));
  }, [cartItems]);

  const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
  const allSelected = selectedIds.length === cartItems.length && cartItems.length > 0;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(cartItems.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

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

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach(id => removeFromCart(id));
    setSelectedIds([]);
    toast({
      title: "Items Removed",
      description: "Selected items have been removed from your cart",
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
    return selectedItems.reduce((sum, item) => {
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
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center">
            <ShoppingCart className="w-4 h-4 mr-1 text-[#856043]" />({cartItems.length})
          </h2>
          <Button
            variant="outline"
            className="border-[#856043] text-[#856043] hover:bg-[#856043]/10 hover:text-[#856043] rounded-md text-sm font-medium"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <ShoppingCart className="mx-auto h-12 w-12 text-[#856043] mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Cart is Empty</h3>
            <p className="text-sm text-gray-600 mb-6">Start adding items to your cart and discover amazing products!</p>
            <Button
              className="bg-[#856043] text-white hover:bg-[#856043]/90 rounded-md px-8 py-3 text-base font-medium"
              onClick={() => navigate("/")}
            >
              Start Shopping
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Cart Items & Saved Items */}
            <div className="lg:col-span-3 space-y-4">
              {/* Select All */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm border border-gray-200">
                <Checkbox 
                  id="select-all" 
                  checked={allSelected} 
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium text-gray-700">Select all items</label>
                <Button 
                  variant="ghost" 
                  className="text-red-600 hover:text-red-700 text-sm"
                  onClick={handleDeleteSelected}
                  disabled={selectedIds.length === 0}
                >
                  Delete selected
                </Button>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-md p-4 flex items-start gap-4 border border-gray-200 hover:border-[#856043]/20 transition-colors shadow-sm"
                    >
                      <Checkbox 
                        checked={selectedIds.includes(item.id)} 
                        onCheckedChange={() => toggleSelect(item.id)}
                        className="mt-1"
                      />
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=400"; }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">Sold by {item.vendor}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-sm font-bold text-[#856043]">{item.price}</p>
                          {item.originalPrice && (
                            <p className="text-xs text-gray-500 line-through">{item.originalPrice}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 text-gray-600 border-gray-300 hover:border-[#856043] hover:text-[#856043]"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </Button>
                          <span className="text-sm min-w-[2rem] text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 text-gray-600 border-gray-300 hover:border-[#856043] hover:text-[#856043]"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 text-xs">
                        <Button
                          variant="ghost"
                          className="p-1 text-[#856043] hover:text-[#856043]/90 hover:bg-[#856043]/5"
                          onClick={() => saveForLater(item)}
                        >
                          <Heart className="w-4 h-4 mr-1" /> Wishlist
                        </Button>
                        <Button
                          variant="ghost"
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Saved for Later */}
              {savedItems.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved for Later</h3>
                  <AnimatePresence>
                    {savedItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-md p-4 flex items-start gap-4 border border-gray-200 hover:border-[#856043]/20 transition-colors shadow-sm"
                      >
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=400"; }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-xs text-gray-500 mb-2">Sold by {item.vendor}</p>
                          <p className="text-sm font-bold text-[#856043]">{item.price}</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#856043] text-[#856043] hover:bg-[#856043]/10 hover:border-[#856043]/90 rounded-md text-sm font-medium px-4"
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
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">You May Also Like</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockRecommendations.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg border border-gray-200 hover:border-[#856043]/30 transition-all overflow-hidden shadow-sm"
                    >
                      <div className="relative h-40 overflow-hidden bg-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=400"; }}
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.vendor}</p>
                        <p className="text-sm font-bold text-[#856043]">{item.price}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-[#856043] text-[#856043] hover:bg-[#856043] hover:text-white transition-colors duration-300 rounded-md text-sm font-medium"
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
              className="lg:sticky lg:top-20 bg-white rounded-md p-4 shadow-sm border border-gray-200 h-fit"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({selectedItems.length} items)</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Discount</span>
                  <span className="font-medium text-red-600">-₹{totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "font-medium text-green-600" : "font-medium"}>
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Taxes (5%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base text-gray-900">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-2">
                  <Input
                    id="promo-code"
                    name="promo-code"
                    autoComplete="off"
                    placeholder="Enter Promo Code"
                    className="rounded-md border-gray-300 focus:ring-[#856043] focus:border-[#856043] text-sm"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    className="rounded-md border-[#856043] text-[#856043] hover:bg-[#856043]/10 hover:border-[#856043]/90 font-medium transition-all duration-300 px-4 text-sm"
                    onClick={applyPromo}
                  >
                    Apply
                  </Button>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full mt-4 rounded-md bg-[#856043] text-white hover:bg-[#856043]/90 py-3 text-base font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedItems.length === 0}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#856043]" />
                  <span>Free shipping on orders over ₹500</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#856043]" />
                  <span>Gift wrapping available at checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#856043]" />
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
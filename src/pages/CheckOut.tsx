import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Banknote, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: number;
  name: string;
  vendor: string;
  price: string;
  quantity: number;
  image: string;
}

export default function CheckOut() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    instructions: ""
  });

  // Mock cart data with prominent dummy images
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Organic Tomatoes",
      vendor: "Fresh Farm Valley",
      price: "₹80",
      quantity: 2,
      image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      id: 2,
      name: "Fresh Milk",
      vendor: "Dairy Farm",
      price: "₹60",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1563630381201-57b577f0a403?auto=format&fit=crop&q=80&w=300&h=300"
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("₹", ""));
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 300 ? 0 : 40;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const handleAddressChange = (field: string, value: string) => {
    setDeliveryAddress(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address) {
      alert("Please fill in all required delivery details");
      return;
    }
    navigate("/place-order", {
      state: {
        orderDetails: {
          items: cartItems,
          deliveryAddress,
          paymentMethod,
          totals: { subtotal, deliveryFee, tax, total }
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b py-4 px-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-all"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Checkout</h1>
          <div className="w-6" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8 pb-32">
        {/* Delivery Address */}
        <Card className="border-none shadow-xl rounded-2xl bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
              <MapPin className="h-6 w-6 text-emerald-600" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={deliveryAddress.name}
                  onChange={(e) => handleAddressChange("name", e.target.value)}
                  className="mt-1 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={deliveryAddress.phone}
                  onChange={(e) => handleAddressChange("phone", e.target.value)}
                  className="mt-1 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address *</Label>
              <Textarea
                id="address"
                placeholder="House number, street, landmark"
                value={deliveryAddress.address}
                onChange={(e) => handleAddressChange("address", e.target.value)}
                rows={4}
                className="mt-1 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all"
              />
            </div>
            <div>
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={deliveryAddress.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                className="mt-1 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all"
              />
            </div>
            <div>
              <Label htmlFor="instructions" className="text-sm font-medium text-gray-700">Delivery Instructions (Optional)</Label>
              <Textarea
                id="instructions"
                placeholder="Any special instructions for delivery"
                value={deliveryAddress.instructions}
                onChange={(e) => handleAddressChange("instructions", e.target.value)}
                rows={3}
                className="mt-1 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all"
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="border-none shadow-xl rounded-2xl bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
            <CardTitle className="text-xl font-semibold text-gray-800">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {cartItems.map((item) => {
              const unitPrice = parseFloat(item.price.replace("₹", ""));
              const itemTotal = unitPrice * item.quantity;
              return (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.vendor}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-lg text-gray-800">₹{itemTotal.toFixed(2)}</p>
                </div>
              );
            })}
            <Separator className="my-4 bg-gray-200" />
            <div className="space-y-4">
              <div className="flex justify-between text-base text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base text-gray-700">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? "text-emerald-600 font-semibold" : "text-gray-700"}>
                  {deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base text-gray-700">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2 bg-gray-200" />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="border-none shadow-xl rounded-2xl bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
              <CreditCard className="h-6 w-6 text-emerald-600" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                <RadioGroupItem value="card" id="card" className="text-emerald-600 border-gray-300" />
                <Label htmlFor="card" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span className="text-base font-medium text-gray-800">Credit/Debit Card</span>
                </Label>
              </div>
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                <RadioGroupItem value="cash" id="cash" className="text-emerald-600 border-gray-300" />
                <Label htmlFor="cash" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Banknote className="h-5 w-5 text-gray-600" />
                  <span className="text-base font-medium text-gray-800">Cash on Delivery</span>
                </Label>
              </div>
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                <RadioGroupItem value="wallet" id="wallet" className="text-emerald-600 border-gray-300" />
                <Label htmlFor="wallet" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <Wallet className="h-5 w-5 text-gray-600" />
                  <span className="text-base font-medium text-gray-800">Digital Wallet</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Action */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl py-4">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-gray-800">₹{total.toFixed(2)}</p>
          </div>
          <Button
            onClick={handlePlaceOrder}
            className="px-10 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-all shadow-md"
          >
            Place Order
          </Button>
        </div>
      </footer>
    </div>
  );
}
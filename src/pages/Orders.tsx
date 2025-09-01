import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck, MapPin, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 1250,
    items: [
      { name: "Organic Tomatoes", vendor: "Fresh Farm Valley", quantity: 2, price: 80 },
      { name: "Fresh Milk", vendor: "Dairy Farm", quantity: 1, price: 60 }
    ],
    deliveryAddress: "Thamel, Kathmandu",
    deliveryTime: "30-45 mins"
  },
  {
    id: "ORD-002",
    date: "2024-01-14",
    status: "in-transit",
    total: 850,
    items: [
      { name: "Wireless Earbuds", vendor: "Tech Hub KTM", quantity: 1, price: 850 }
    ],
    deliveryAddress: "Baneshwor, Kathmandu",
    deliveryTime: "45-60 mins"
  },
  {
    id: "ORD-003",
    date: "2024-01-13",
    status: "cancelled",
    total: 320,
    items: [
      { name: "Momo (10 pcs)", vendor: "Tasty Corner", quantity: 1, price: 320 }
    ],
    deliveryAddress: "Lazimpat, Kathmandu",
    deliveryTime: "25-35 mins"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered": return "bg-green-100 text-green-800";
    case "in-transit": return "bg-blue-100 text-blue-800";
    case "cancelled": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered": return <CheckCircle className="h-4 w-4" />;
    case "in-transit": return <Truck className="h-4 w-4" />;
    case "cancelled": return <XCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

export default function Orders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = activeTab === "all"
    ? mockOrders
    : mockOrders.filter(order => order.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg">My Orders</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-3 border-b border-border/50 bg-white">
        <div className="flex gap-2">
          {[
            { id: "all", label: "All Orders" },
            { id: "delivered", label: "Delivered" },
            { id: "in-transit", label: "In Transit" },
            { id: "cancelled", label: "Cancelled" }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 text-xs"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4 pb-20">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Order Items */}
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.vendor} × {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">₹{item.price}</p>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Total</p>
                    <p className="font-semibold">₹{order.total}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{order.deliveryAddress}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{order.deliveryTime}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {order.status === "delivered" && (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Star className="h-4 w-4 mr-1" />
                        Rate Order
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Package className="h-4 w-4 mr-1" />
                        Reorder
                      </Button>
                    </>
                  )}
                  {order.status === "in-transit" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Contact Support
                    </Button>
                  )}
                  {order.status === "cancelled" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Package className="h-4 w-4 mr-1" />
                      Order Again
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-lg mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">
              {activeTab === "all"
                ? "You haven't placed any orders yet"
                : `No ${activeTab} orders found`
              }
            </p>
            <Button onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
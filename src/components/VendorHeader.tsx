import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const notifications = [
  {
    id: 1,
    message: "New order received from John Doe",
    time: "5 min ago",
    unread: true,
    type: "order"
  },
  {
    id: 2,
    message: "Payment received for ORD-001",
    time: "2 hours ago",
    unread: true,
    type: "payment"
  },
  {
    id: 3,
    message: "Low stock alert for Product XYZ",
    time: "1 day ago",
    unread: false,
    type: "alert"
  },
  {
    id: 4,
    message: "Monthly sales report is ready",
    time: "2 days ago",
    unread: false,
    type: "report"
  },
];

interface VendorHeaderProps {
  title?: string;
  subtitle?: string;
}

export function VendorHeader({ title, subtitle }: VendorHeaderProps) {
  const [notificationsList, setNotificationsList] = useState(notifications);

  const unreadCount = notificationsList.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotificationsList(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(prev =>
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Left Section - Seller Center */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold md:text-xl text-orange-600">Seller Center</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="font-semibold">Notifications</h4>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notificationsList.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notificationsList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer ${
                        notification.unread ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.unread ? 'bg-blue-500' : 'bg-transparent'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${notification.unread ? 'font-medium' : ''}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              notification.type === 'order' ? 'border-green-200 text-green-700' :
                              notification.type === 'payment' ? 'border-blue-200 text-blue-700' :
                              notification.type === 'alert' ? 'border-red-200 text-red-700' :
                              'border-gray-200 text-gray-700'
                            }`}
                          >
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" className="w-full text-sm">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
import { useState, useRef } from "react";
import { User, Bell, Shield, CreditCard, Truck, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VendorPage } from "@/components/VendorLayout";

const settingsSections = [
  { id: "profile", title: "Profile", icon: User },
  { id: "notifications", title: "Notifications", icon: Bell },
  { id: "security", title: "Security", icon: Shield },
  { id: "payment", title: "Payment", icon: CreditCard },
  { id: "shipping", title: "Shipping", icon: Truck },
  { id: "preferences", title: "Preferences", icon: Globe },
];

export default function VendorSettings() {
  const [settings, setSettings] = useState({
    businessName: "TechTrend Store",
    ownerName: "Amit Sharma",
    email: "amit@techtrend.com",
    phone: "+91 98765 43210",
    address: "456 Market Rd, Mumbai, MH 400001",
    description: "Premium electronics and gadgets retailer",
    avatarUrl: "/placeholder-avatar.jpg",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    gstNumber: "",
    taxRate: "",
    businessHours: "Mon-Fri: 9AM-6PM",
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: false,
    defaultCurrency: "INR",
    autoPayout: true,
    defaultShipping: "standard",
    theme: "light",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setIsLoading(true);
    setMessage("");
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage("Settings saved successfully!");
    }, 1000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings((prev) => ({
          ...prev,
          avatarUrl: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setSettings((prev) => ({
      ...prev,
      avatarUrl: "/placeholder-avatar.jpg",
    }));
  };

  return (
    <VendorPage title="Settings">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mb-8 bg-white p-6 border-b">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <User className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">Account Settings</h2>
                <p className="text-gray-600">Manage your account preferences and business details</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Saving..." : <><Save className="mr-2 h-5 w-5" /> Save Changes</>}
              </Button>
            </div>
          </div>
          {message && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800 text-sm">{message}</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-4">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{section.title}</span>
                  <span className="lg:hidden">{section.title.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="profile">
            <div className="bg-white rounded-lg border p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                  <p className="text-gray-600 text-sm">Update your business details</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">AS</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full sm:w-auto"
                      >
                        Change Photo
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleRemoveAvatar}
                        className="w-full sm:w-auto"
                      >
                        Remove
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-sm font-medium">Business Name</Label>
                      <Input
                        id="businessName"
                        value={settings.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerName" className="text-sm font-medium">Owner Name</Label>
                      <Input
                        id="ownerName"
                        value={settings.ownerName}
                        onChange={(e) => handleInputChange("ownerName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                      <Input
                        id="phone"
                        value={settings.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label htmlFor="address" className="text-sm font-medium">Business Address</Label>
                    <Textarea
                      id="address"
                      value={settings.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2 mt-6">
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Textarea
                      id="description"
                      value={settings.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

        <TabsContent value="notifications">
          <div className="bg-white rounded-lg border p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                <p className="text-gray-600 text-sm">Manage your notification preferences</p>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Email Notifications</Label>
                    <p className="text-xs text-gray-500">Receive order and account updates</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                    className="self-start sm:self-center"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Push Notifications</Label>
                    <p className="text-xs text-gray-500">Receive alerts on your device</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleInputChange("pushNotifications", checked)}
                    className="self-start sm:self-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="bg-white rounded-lg border p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                <p className="text-gray-600 text-sm">Enhance your account security</p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                    <p className="text-xs text-gray-500">Add an extra layer of protection</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleInputChange("twoFactorAuth", checked)}
                    className="self-start sm:self-center"
                  />
                </div>

                <div className="border-t pt-6">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Change Password</h4>
                    <p className="text-gray-600 text-sm">Update your account password</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-sm font-medium">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={settings.currentPassword}
                        onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={settings.newPassword}
                        onChange={(e) => handleInputChange("newPassword", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={settings.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="bg-white rounded-lg border p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment Settings</h3>
                <p className="text-gray-600 text-sm">Configure your payment options</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultCurrency" className="text-sm font-medium">Default Currency</Label>
                  <Select
                    value={settings.defaultCurrency}
                    onValueChange={(value) => handleInputChange("defaultCurrency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Auto Payout</Label>
                    <p className="text-xs text-gray-500">Automatically process payouts</p>
                  </div>
                  <Switch
                    checked={settings.autoPayout}
                    onCheckedChange={(checked) => handleInputChange("autoPayout", checked)}
                    className="self-start sm:self-center"
                  />
                </div>

                <div className="border-t pt-6">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Bank Account Details</h4>
                    <p className="text-gray-600 text-sm">Add your bank details for payouts</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="accountHolderName" className="text-sm font-medium">Account Holder Name</Label>
                      <Input
                        id="accountHolderName"
                        value={settings.accountHolderName}
                        onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankName" className="text-sm font-medium">Bank Name</Label>
                      <Input
                        id="bankName"
                        value={settings.bankName}
                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber" className="text-sm font-medium">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={settings.accountNumber}
                        onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode" className="text-sm font-medium">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        value={settings.ifscCode}
                        onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shipping">
          <div className="bg-white rounded-lg border p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Shipping Settings</h3>
                <p className="text-gray-600 text-sm">Manage your shipping preferences</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultShipping" className="text-sm font-medium">Default Shipping</Label>
                  <Select
                    value={settings.defaultShipping}
                    onValueChange={(value) => handleInputChange("defaultShipping", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="bg-white rounded-lg border p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
                <p className="text-gray-600 text-sm">Customize your app experience</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme" className="text-sm font-medium">Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => handleInputChange("theme", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-6">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Business Information</h4>
                    <p className="text-gray-600 text-sm">Configure your business details</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber" className="text-sm font-medium">GST Number</Label>
                      <Input
                        id="gstNumber"
                        value={settings.gstNumber}
                        onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRate" className="text-sm font-medium">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        value={settings.taxRate}
                        onChange={(e) => handleInputChange("taxRate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="businessHours" className="text-sm font-medium">Business Hours</Label>
                    <Input
                      id="businessHours"
                      value={settings.businessHours}
                      onChange={(e) => handleInputChange("businessHours", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </VendorPage>
  );
}
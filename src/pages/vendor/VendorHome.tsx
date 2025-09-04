import React from 'react';
import { VendorPage } from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Store, Package, TrendingUp, Users, CheckCircle, MapPin, CreditCard, Upload } from "lucide-react";

const VendorHome: React.FC = () => {
  const completionSteps = [
    { id: 1, title: "Add Email", completed: true, icon: CheckCircle },
    { id: 2, title: "Add warehouse address", completed: false, icon: MapPin },
    { id: 3, title: "Add ID & Bank documents", completed: false, icon: CreditCard },
    { id: 4, title: "Upload products", completed: false, icon: Upload },
  ];

  const completedSteps = completionSteps.filter(step => step.completed).length;
  const completionPercentage = (completedSteps / completionSteps.length) * 100;

  return (
    <VendorPage title="Dashboard">
      <div className="space-y-4 pb-16">
        {/* Store Info Card */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-14 h-14 bg-[#A98D7E] rounded-xl flex items-center justify-center">
                <Store className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-bold text-gray-900 mb-1">sma.store</h2>
                <p className="text-xs text-gray-600 flex items-center justify-center sm:justify-start gap-1 mb-1">
                  <Users className="h-3 w-3" />
                  0 Followers
                </p>
                <Badge className="bg-[#A98D7E] text-white text-xs px-2 py-1">
                  Getting Started
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Today's Orders</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500 mt-0.5">+25% from yesterday</p>
                </div>
                <div className="p-2 bg-gray-100 rounded-full">
                  <Package className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹8,450</p>
                  <p className="text-xs text-gray-500 mt-0.5">+18% from last week</p>
                </div>
                <div className="p-2 bg-gray-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Products</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-xs text-gray-500 mt-0.5">3 new this week</p>
                </div>
                <div className="p-2 bg-gray-100 rounded-full">
                  <Store className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Setup Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle className="h-5 w-5" />
              Complete Your Store Setup
            </CardTitle>
            <div className="space-y-2">
              <Progress value={completionPercentage} className="h-2" />
              <p className="text-xs text-gray-600">
                {completedSteps} of {completionSteps.length} steps completed
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {completionSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${step.completed ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-700'}`}>
                      {step.title}
                    </span>
                  </div>
                  {step.completed ? (
                    <Badge className="bg-green-100 text-green-800 text-xs px-2 py-1">
                      Completed
                    </Badge>
                  ) : (
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Complete
                    </Button>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Button variant="outline" className="h-16 flex flex-col gap-2 p-3">
                <div className="p-1.5 bg-gray-100 rounded-full">
                  <Package className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-xs font-medium">Add Product</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2 p-3">
                <div className="p-1.5 bg-gray-100 rounded-full">
                  <TrendingUp className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-xs font-medium">View Analytics</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2 p-3">
                <div className="p-1.5 bg-gray-100 rounded-full">
                  <Users className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-xs font-medium">Manage Orders</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2 p-3">
                <div className="p-1.5 bg-gray-100 rounded-full">
                  <Store className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-xs font-medium">Store Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Resources */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-base">📚</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">Learning Center</h3>
                <p className="text-xs text-gray-600">Tips and guides to grow your business</p>
              </div>
              <Button size="sm" className="h-8 text-xs px-3">
                Explore
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorPage>
  );
};

export default VendorHome;
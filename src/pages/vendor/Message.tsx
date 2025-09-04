import React from 'react';
import { VendorPage } from "@/components/VendorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Inbox } from "lucide-react";

const Message: React.FC = () => {
  return (
    <VendorPage title="Messages" subtitle="Manage your customer communications">
      <div className="space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Unread Messages</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <Inbox className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Conversations</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <MessageSquare className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                </div>
                <Send className="h-6 w-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-2">No messages yet</h3>
              <p className="text-sm text-gray-600 mb-3">Your customer messages will appear here.</p>
              <Button size="sm">
                <Send className="h-3 w-3 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-14 flex flex-col gap-1.5 p-3">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">New Message</span>
              </Button>
              <Button variant="outline" className="h-14 flex flex-col gap-1.5 p-3">
                <Inbox className="h-4 w-4" />
                <span className="text-xs">Inbox</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorPage>
  );
};

export default Message;
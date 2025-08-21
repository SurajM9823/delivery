import { MapPin, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-card border-b border-border/30">
      <button className="p-1.5 hover:bg-muted rounded-lg transition-smooth">
        <Menu className="h-5 w-5 text-foreground" />
      </button>
      
      <div className="flex items-center gap-1.5">
        <MapPin className="h-4 w-4 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">Kathmandu</p>
          <p className="text-xs text-muted-foreground">Thamel, 44600</p>
        </div>
      </div>
      
      <button className="relative p-1.5 hover:bg-muted rounded-lg transition-smooth">
        <Bell className="h-5 w-5 text-foreground" />
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
          <span className="text-xs text-destructive-foreground font-bold">3</span>
        </div>
      </button>
    </div>
  );
}
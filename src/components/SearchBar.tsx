import { Search, Filter } from "lucide-react";

export function SearchBar() {
  return (
    <div className="px-3 py-2 bg-background">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products, vendors..."
            className="w-full pl-9 pr-3 py-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          />
        </div>
        <button className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth">
          <Filter className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
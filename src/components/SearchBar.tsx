import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { setSearchQuery: setGlobalSearchQuery } = useApp();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setGlobalSearchQuery(searchQuery.trim());
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      toast({
        title: "Search Query Required",
        description: "Please enter something to search for",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = () => {
    toast({
      title: "Filter Coming Soon",
      description: "Advanced filtering will be available soon",
    });
  };

  return (
    <div className="px-3 py-2 bg-background">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products, vendors..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full pl-9 pr-3 py-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          />
        </div>
        <button
          type="button"
          onClick={handleFilterClick}
          className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
        >
          <Filter className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
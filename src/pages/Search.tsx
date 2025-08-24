import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock search results
  const searchResults = [
    { id: 1, name: "Organic Apples", vendor: "Farm Fresh", price: "₹150/kg", image: "/placeholder-apple.jpg" },
    { id: 2, name: "Wireless Earbuds", vendor: "Tech Gadgets", price: "₹1999", image: "/placeholder-earbuds.jpg" },
    { id: 3, name: "Yoga Mat", vendor: "Fitness Pro", price: "₹799", image: "/placeholder-mat.jpg" },
    { id: 4, name: "Coffee Beans", vendor: "Brew Masters", price: "₹450", image: "/placeholder-coffee.jpg" },
    { id: 5, name: "Running Shoes", vendor: "Sports World", price: "₹2999", image: "/placeholder-shoes.jpg" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 bg-white border-b">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search products, vendors..."
            className="pl-10 pr-4 py-6 rounded-full bg-gray-100 border-0 focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="hidden">Search</Button>
        </form>
        
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1 rounded-full">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="flex-1 rounded-full">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Search Results</h2>
        
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border p-3">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32" />
                <h3 className="font-semibold mt-2 truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 truncate">{item.vendor}</p>
                <p className="font-bold text-indigo-600 mt-1">{item.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No results found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SearchPage;
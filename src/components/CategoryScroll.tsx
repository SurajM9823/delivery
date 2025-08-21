const categories = [
  { id: 1, name: "Groceries", icon: "🛒", color: "bg-green-50 text-green-600 border-green-200" },
  { id: 2, name: "Electronics", icon: "📱", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: 3, name: "Food", icon: "🍕", color: "bg-orange-50 text-orange-600 border-orange-200" },
  { id: 4, name: "Fashion", icon: "👕", color: "bg-purple-50 text-purple-600 border-purple-200" },
  { id: 5, name: "Home", icon: "🏠", color: "bg-teal-50 text-teal-600 border-teal-200" },
  { id: 6, name: "Books", icon: "📚", color: "bg-red-50 text-red-600 border-red-200" },
  { id: 7, name: "Health", icon: "💊", color: "bg-pink-50 text-pink-600 border-pink-200" },
  { id: 8, name: "Sports", icon: "⚽", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
];

export function CategoryScroll() {
  return (
    <div className="px-3 py-2 bg-background">
      <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`min-w-[65px] px-2 py-2 rounded-lg font-medium text-xs transition-smooth hover:scale-105 border ${category.color}`}
          >
            <div className="text-lg mb-0.5">{category.icon}</div>
            <div className="text-xs leading-tight">{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
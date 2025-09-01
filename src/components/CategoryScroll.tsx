import { motion, Reorder } from 'framer-motion';
import { useState } from 'react';

const initialCategories = [
  { id: 1, name: "Groceries", icon: "🛒", color: "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20" },
  { id: 2, name: "Electronics", icon: "📱", color: "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20" },
  { id: 3, name: "Food", icon: "🍕", color: "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200" },
  { id: 4, name: "Fashion", icon: "👕", color: "bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200" },
  { id: 5, name: "Home", icon: "🏠", color: "bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200" },
  { id: 6, name: "Books", icon: "📚", color: "bg-red-100 text-red-700 border-red-300 hover:bg-red-200" },
  { id: 7, name: "Health", icon: "💊", color: "bg-pink-100 text-pink-700 border-pink-300 hover:bg-pink-200" },
  { id: 8, name: "Sports", icon: "⚽", color: "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200" },
];

export function CategoryScroll() {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="px-2 py-2 bg-gradient-to-r from-gray-50 to-gray-100">
      <Reorder.Group
        axis="x"
        values={categories}
        onReorder={setCategories}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory overscroll-x-contain"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <Reorder.Item
            key={category.id}
            value={category}
            className="flex-none w-20"
          >
            <motion.button
              className={`w-full p-2 rounded-xl font-medium text-center transition-all duration-300 border ${category.color} shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-${category.color.split('-')[1]}-400 outline-none`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
            >
              <div className="text-xl mb-1">{category.icon}</div>
              <div className="text-xs font-semibold leading-tight">{category.name}</div>
            </motion.button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
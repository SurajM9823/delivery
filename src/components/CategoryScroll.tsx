import { motion, Reorder } from 'framer-motion';
import { useState } from 'react';

const initialCategories = [
  { id: 1, name: "Groceries", icon: "🛒" },
  { id: 2, name: "Electronics", icon: "📱" },
  { id: 3, name: "Food", icon: "🍕" },
  { id: 4, name: "Fashion", icon: "👕" },
  { id: 5, name: "Home", icon: "🏠" },
  { id: 6, name: "Books", icon: "📚" },
  { id: 7, name: "Health", icon: "💊" },
  { id: 8, name: "Sports", icon: "⚽" },
];

export function CategoryScroll() {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="px-2 py-2 bg-gray-50">
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
              className="w-full p-2 rounded-xl font-medium text-center transition-all duration-300 bg-white text-gray-800 hover:bg-gray-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
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
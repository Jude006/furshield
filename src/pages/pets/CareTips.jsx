import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiBookOpen } from 'react-icons/fi';

const careTips = [
  {
    category: 'Feeding',
    tips: [
      { title: 'Balanced Diet', content: 'Ensure your pet gets a balanced diet with proteins, carbs, and vitamins.' },
      { title: 'Feeding Schedule', content: 'Maintain a consistent feeding schedule to regulate digestion.' },
    ],
  },
  {
    category: 'Hygiene',
    tips: [
      { title: 'Regular Baths', content: 'Bathe your pet every 1-2 months to keep their coat clean.' },
      { title: 'Nail Trimming', content: 'Trim nails regularly to prevent overgrowth and discomfort.' },
    ],
  },
  {
    category: 'Exercise',
    tips: [
      { title: 'Daily Walks', content: 'Take dogs for daily walks to maintain physical health.' },
      { title: 'Playtime', content: 'Engage cats with toys to stimulate their hunting instincts.' },
    ],
  },
];

const CareTips = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTips = careTips
    .filter(
      (category) =>
        selectedCategory === 'All' || category.category === selectedCategory
    )
    .flatMap((category) =>
      category.tips.filter(
        (tip) =>
          tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tip.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 overflow-hidden">
       
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 font-display">Care Tips</h1>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 font-sans text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Feeding">Feeding</option>
                  <option value="Hygiene">Hygiene</option>
                  <option value="Exercise">Exercise</option>
                </select>
              </div>

              {filteredTips.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FiBookOpen className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No care tips found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white border shadow-sm rounded-xl border-neutral-200"
                    >
                      <h3 className="font-sans text-sm font-medium text-neutral-900">{tip.title}</h3>
                      <p className="mt-2 font-sans text-xs text-neutral-600">{tip.content}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CareTips;
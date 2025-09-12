import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiBookOpen, FiVideo, FiHelpCircle } from 'react-icons/fi';

const careTips = [
  {
    category: 'Feeding',
    tips: [
      {
        title: 'Balanced Diet',
        content: 'Ensure your pet gets a balanced diet with proteins, carbs, and vitamins to support overall health.',
        type: 'article'
      },
      {
        title: 'Feeding Schedule',
        content: 'Maintain a consistent feeding schedule to regulate digestion and prevent obesity.',
        type: 'article'
      },
      {
        title: 'How to Choose Pet Food',
        content: 'Learn how to select the right pet food for your pet’s needs.',
        type: 'video',
        mediaUrl: 'https://www.youtube.com/embed/sample-video-id'
      }
    ]
  },
  {
    category: 'Hygiene',
    tips: [
      {
        title: 'Regular Baths',
        content: 'Bathe your pet every 1-2 months to keep their coat clean and healthy.',
        type: 'article'
      },
      {
        title: 'Nail Trimming',
        content: 'Trim nails regularly to prevent overgrowth and discomfort.',
        type: 'article'
      },
      {
        title: 'Why Regular Grooming Matters',
        content: 'Understand the importance of grooming for pet health.',
        type: 'faq'
      }
    ]
  },
  {
    category: 'Exercise',
    tips: [
      {
        title: 'Daily Walks',
        content: 'Take dogs for daily walks to maintain physical health and mental stimulation.',
        type: 'article'
      },
      {
        title: 'Playtime for Cats',
        content: 'Engage cats with toys to stimulate their hunting instincts and keep them active.',
        type: 'article'
      },
      {
        title: 'Exercise Tips for Pets',
        content: 'Watch this video to learn fun exercise routines for your pet.',
        type: 'video',
        mediaUrl: 'https://www.youtube.com/embed/sample-video-id-2'
      }
    ]
  }
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
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 font-display">Care Tips</h1>
                <button
                  onClick={() => navigate('/pets-dashboard')}
                  className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                >
                  <FiArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </button>
              </div>
              <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <FiSearch className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search care tips..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                  <button
                    onClick={() => navigate('/pets-dashboard')}
                    className="px-6 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Back to Dashboard
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white border shadow-sm rounded-xl border-neutral-200 hover:shadow-md"
                    >
                      <div className="flex items-center mb-2">
                        {tip.type === 'video' ? (
                          <FiVideo className="w-5 h-5 mr-2 text-primary-600" />
                        ) : tip.type === 'faq' ? (
                          <FiHelpCircle className="w-5 h-5 mr-2 text-primary-600" />
                        ) : (
                          <FiBookOpen className="w-5 h-5 mr-2 text-primary-600" />
                        )}
                        <h3 className="font-sans text-sm font-medium text-neutral-900">{tip.title}</h3>
                      </div>
                      <p className="font-sans text-xs text-neutral-600">{tip.content}</p>
                      {tip.type === 'video' && tip.mediaUrl && (
                        <a
                          href={tip.mediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 font-sans text-sm text-primary-600 hover:underline"
                        >
                          Watch Video
                        </a>
                      )}
                      {tip.type === 'faq' && (
                        <p className="mt-2 font-sans text-xs italic text-neutral-600">
                          FAQ: Common question answered by experts.
                        </p>
                      )}
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
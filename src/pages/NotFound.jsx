import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaArrowLeft, 
  FaSearch, 
  FaPaw,
  FaExclamationTriangle
} from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden text-center bg-white shadow-xl rounded-2xl"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-700">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white rounded-full"
            >
              <FaExclamationTriangle className="w-8 h-8 text-primary-600" />
            </motion.div>
            <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl font-display">404</h1>
            <p className="text-primary-100">Page Not Found</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              <FaPaw className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
              <h2 className="mb-2 text-2xl font-bold text-neutral-900 font-display">
                Oops! Lost your way?
              </h2>
              <p className="mb-6 text-neutral-600">
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back to safety.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center px-6 py-3 transition-colors duration-200 border rounded-lg border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              >
                <FaArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
              
              <Link
                to="/"
                className="flex items-center justify-center px-6 py-3 text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700"
              >
                <FaHome className="w-4 h-4 mr-2" />
                Home Page
              </Link>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-6 mt-8 border-t border-neutral-100"
            >
              <p className="mb-4 text-sm text-neutral-500">Popular Pages</p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/services"
                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  Services
                </Link>
                <Link
                  to="/auth/login"
                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  Sign In
                </Link>
                <Link
                  to="/about"
                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  Contact
                </Link>
              </div>
            </motion.div>

            {/* Search Suggestion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="p-4 mt-8 rounded-lg bg-neutral-50"
            >
              <div className="flex items-center">
                <FaSearch className="w-4 h-4 mr-2 text-neutral-400" />
                <span className="text-sm text-neutral-600">
                  Can't find what you're looking for? Try using the search function.
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-neutral-500">
            Need help?{' '}
            <Link to="/contact" className="text-primary-600 hover:underline">
              Contact our support team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
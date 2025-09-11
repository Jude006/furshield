import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiArrowLeft, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const PetOwnerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Registration logic for pet owner
    console.log('Pet Owner Signup:', formData);
    // Redirect to appropriate dashboard
    navigate('/pets-dashboard');
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Form Section */}
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <button
              onClick={() => navigate('/auth/onboarding')}
              className="inline-flex items-center mb-6 text-sm text-neutral-600 hover:text-neutral-800"
            >
              <FiArrowLeft className="mr-2" /> Back to role selection
            </button>
            
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700">
              <FiUser className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="mb-2 text-3xl font-bold text-neutral-900">Create Pet Owner Account</h1>
            <p className="text-neutral-600">Join thousands of pet owners managing their furry friends</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  First Name *
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  Last Name *
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-neutral-700">
                Email Address *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-neutral-700">
                Contact Number *
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                <input
                  name="contactNumber"
                  type="tel"
                  required
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-neutral-700">
                Address *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your complete address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  Password *
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Create password"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  Confirm Password *
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-neutral-300"
              />
              <label className="ml-2 text-sm text-neutral-700">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-4 py-3 font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500"
            >
              Create Pet Owner Account
            </motion.button>
          </form>

          <p className="mt-8 text-sm text-center text-neutral-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="flex-1 hidden lg:block bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="flex items-center justify-center h-full p-12">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md"
            >
              <h2 className="mb-4 text-4xl font-bold">Welcome to Pet Ownership!</h2>
              <p className="mb-8 text-xl opacity-90">
                Join our community of pet lovers and give your furry friends the best care possible
              </p>
              <div className="space-y-4 text-left">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full bg-opacity-20">
                    <span className="text-lg">🐾</span>
                  </div>
                  <span>Manage multiple pet profiles</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full bg-opacity-20">
                    <span className="text-lg">📊</span>
                  </div>
                  <span>Track health records and vaccinations</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full bg-opacity-20">
                    <span className="text-lg">🛒</span>
                  </div>
                  <span>Shop for pet products and supplies</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetOwnerSignup;
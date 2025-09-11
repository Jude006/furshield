import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiMail, FiPhone, FiMapPin, FiUser, FiUsers } from 'react-icons/fi';

const ShelterSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Shelter Information
    shelterName: '',
    contactPerson: '',
    email: '',
    contactNumber: '',
    address: '',
    
    // Additional Information
    shelterType: '',
    yearEstablished: '',
    capacity: '',
    website: '',
    
    // Account Security
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
    // Registration logic for animal shelter
    console.log('Shelter Signup:', formData);
    // Redirect to shelter dashboard
    navigate('/animalShelter-dashboard');
  };

  const shelterTypes = [
    'Non-Profit Rescue',
    'Municipal Shelter',
    'Private Shelter',
    'Foster-Based Rescue',
    'Sanctuary',
    'Humane Society'
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Form Section */}
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <button
              onClick={() => navigate('/auth/onboarding')}
              className="inline-flex items-center mb-6 text-sm text-neutral-600 hover:text-neutral-800"
            >
              <FiArrowLeft className="mr-2" /> Back to role selection
            </button>
            
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600">
              <FiHome className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="mb-2 text-3xl font-bold text-neutral-900">Animal Shelter Registration</h1>
            <p className="text-neutral-600">Join our network of animal shelters and rescues</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shelter Information Section */}
            <div className="p-6 bg-white border rounded-xl border-neutral-200">
              <h2 className="flex items-center mb-4 text-xl font-semibold text-neutral-900">
                <FiHome className="w-5 h-5 mr-2 text-green-600" />
                Shelter Information
              </h2>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  Shelter Name *
                </label>
                <input
                  name="shelterName"
                  type="text"
                  required
                  value={formData.shelterName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your shelter's official name"
                />
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  Contact Person *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                  <input
                    name="contactPerson"
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Main contact person's name"
                  />
                </div>
              </div>

              <div className="mt-4">
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
                    className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="shelter.email@example.com"
                  />
                </div>
              </div>

              <div className="mt-4">
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
                    className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  Shelter Address *
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Complete shelter address"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="p-6 bg-white border rounded-xl border-neutral-200">
              <h2 className="flex items-center mb-4 text-xl font-semibold text-neutral-900">
                <FiUsers className="w-5 h-5 mr-2 text-green-600" />
                Additional Information
              </h2>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    Shelter Type *
                  </label>
                  <select
                    name="shelterType"
                    required
                    value={formData.shelterType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select shelter type</option>
                    {shelterTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    Year Established
                  </label>
                  <input
                    name="yearEstablished"
                    type="number"
                    min="1900"
                    max={currentYear}
                    value={formData.yearEstablished}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 2010"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    Animal Capacity
                  </label>
                  <input
                    name="capacity"
                    type="number"
                    min="0"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Number of animals"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    Website
                  </label>
                  <input
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://yourshelter.com"
                  />
                </div>
              </div>
            </div>

            {/* Account Security Section */}
            <div className="p-6 bg-white border rounded-xl border-neutral-200">
              <h2 className="mb-4 text-xl font-semibold text-neutral-900">Account Security</h2>
              
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
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <input
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-neutral-300"
                />
                <label className="ml-2 text-sm text-neutral-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-green-600 hover:text-green-700">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-green-600 hover:text-green-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-4 py-3 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              Register Shelter
            </motion.button>
          </form>

          <p className="mt-8 text-sm text-center text-neutral-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-green-600 hover:text-green-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="flex-1 hidden lg:block bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="flex items-center justify-center h-full p-12">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md"
            >
              <h2 className="mb-4 text-4xl font-bold">Welcome to Our Shelter Network</h2>
              <p className="mb-8 text-xl opacity-90">
                Connect with adopters and provide loving homes for animals in need
              </p>
              <div className="space-y-4 text-left">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full bg-opacity-20">
                    <span className="text-lg">🐾</span>
                  </div>
                  <span>Showcase adoptable pets with detailed profiles</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full bg-opacity-20">
                    <span className="text-lg">📋</span>
                  </div>
                  <span>Manage adoption applications and processes</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full bg-opacity-20">
                    <span className="text-lg">❤️</span>
                  </div>
                  <span>Coordinate with veterinary partners for animal care</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterSignup;
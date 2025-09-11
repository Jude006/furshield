import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiArrowLeft, FiMail, FiPhone, FiMapPin, FiBriefcase, FiClock, FiUser } from 'react-icons/fi';

const VeterinarianSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    
    // Professional Information
    specialization: '',
    experience: '',
    qualifications: '',
    licenseNumber: '',
    
    // Availability (can be enhanced later)
    availableDays: [],
    consultationFee: '',
    
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
    // Registration logic for veterinarian
    console.log('Veterinarian Signup:', formData);
    // Redirect to veterinarian dashboard
    navigate('/veterinarian-dashboard');
  };

  const specializations = [
    'Small Animals',
    'Large Animals',
    'Surgery',
    'Dentistry',
    'Dermatology',
    'Emergency Care',
    'Internal Medicine',
    'Oncology',
    'Ophthalmology',
    'Radiology'
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
            
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600">
              <FiHeart className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="mb-2 text-3xl font-bold text-neutral-900">Veterinarian Registration</h1>
            <p className="text-neutral-600">Join our network of professional veterinarians</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="p-6 bg-white border rounded-xl border-neutral-200">
              <h2 className="flex items-center mb-4 text-xl font-semibold text-neutral-900">
                <FiUser className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h2>
              
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
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Last name"
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
                    className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
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
                    className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="mt-4">
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
                    className="w-full py-3 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your clinic or practice address"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="p-6 bg-white border rounded-xl border-neutral-200">
              <h2 className="flex items-center mb-4 text-xl font-semibold text-neutral-900">
                <FiBriefcase className="w-5 h-5 mr-2 text-blue-600" />
                Professional Information
              </h2>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    Specialization *
                  </label>
                  <select
                    name="specialization"
                    required
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    Years of Experience *
                  </label>
                  <input
                    name="experience"
                    type="number"
                    required
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of years"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  Qualifications *
                </label>
                <input
                  name="qualifications"
                  type="text"
                  required
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., DVM, MVSc, etc."
                />
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  License Number *
                </label>
                <input
                  name="licenseNumber"
                  type="text"
                  required
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your veterinary license number"
                />
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-neutral-700">
                  Consultation Fee ($) *
                </label>
                <input
                  name="consultationFee"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 50.00"
                />
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
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-neutral-300"
                />
                <label className="ml-2 text-sm text-neutral-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-4 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Register as Veterinarian
            </motion.button>
          </form>

          <p className="mt-8 text-sm text-center text-neutral-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="flex-1 hidden lg:block bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="flex items-center justify-center h-full p-12">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md"
            >
              <h2 className="mb-4 text-4xl font-bold">Join Our Veterinary Network</h2>
              <p className="mb-8 text-xl opacity-90">
                Connect with pet owners and provide exceptional care to their beloved animals
              </p>
              <div className="space-y-4 text-left">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full bg-opacity-20">
                    <span className="text-lg">📅</span>
                  </div>
                  <span>Manage appointments and availability</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full bg-opacity-20">
                    <span className="text-lg">📊</span>
                  </div>
                  <span>Access comprehensive patient records</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full bg-opacity-20">
                    <span className="text-lg">💼</span>
                  </div>
                  <span>Grow your veterinary practice</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeterinarianSignup;
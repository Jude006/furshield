import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiHeart, FiHome, FiArrowRight } from 'react-icons/fi';

const Onboarding = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    {
      id: 'pet-owner',
      title: 'Pet Owner',
      icon: FiUser,
      description: 'Manage your pets, health records, appointments, and shop for pet products',
      color: 'from-primary-600 to-primary-700',
      features: ['Pet Profiles', 'Health Tracking', 'Appointments', 'Product Shopping']
    },
    {
      id: 'veterinarian', 
      title: 'Veterinarian',
      icon: FiHeart,
      description: 'Provide veterinary services, manage appointments, and access patient records',
      color: 'from-blue-600 to-blue-700',
      features: ['Appointment Management', 'Patient Records', 'Treatment Logs', 'Availability Scheduling']
    },
    {
      id: 'shelter',
      title: 'Animal Shelter',
      icon: FiHome,
      description: 'Manage shelter operations, adoptable pets, and coordinate with adopters',
      color: 'from-green-600 to-green-700',
      features: ['Adoption Listings', 'Animal Care', 'Application Management', 'Shelter Operations']
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/auth/signup/${selectedRole}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-neutral-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <Link to="/" className="inline-flex items-center mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600">
              <FiHeart className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-3xl font-bold text-neutral-900 font-display">FurShield</span>
          </Link>
          <h1 className="mb-4 text-4xl font-bold text-neutral-900">How will you use FurShield?</h1>
          <p className="max-w-2xl mx-auto text-xl text-neutral-600">
            Choose your role to get started with the perfect experience for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedRole === role.id
                  ? 'border-primary-500 shadow-xl scale-105'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
              onClick={() => handleRoleSelect(role.id)}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${role.color} flex items-center justify-center mb-6`}>
                <role.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="mb-3 text-2xl font-bold text-neutral-900">{role.title}</h3>
              <p className="mb-6 text-neutral-600">{role.description}</p>
              
              <div className="space-y-2">
                {role.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-neutral-600">
                    <div className="w-2 h-2 mr-3 rounded-full bg-primary-500"></div>
                    {feature}
                  </div>
                ))}
              </div>

              {selectedRole === role.id && (
                <div className="absolute flex items-center justify-center w-6 h-6 rounded-full top-4 right-4 bg-primary-500">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`px-8 py-4 text-lg font-medium rounded-lg transition-all ${
              selectedRole
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            Continue to Sign Up <FiArrowRight className="inline ml-2" />
          </motion.button>
          
          <p className="mt-6 text-neutral-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
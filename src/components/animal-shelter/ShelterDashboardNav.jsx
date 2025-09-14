import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FiSearch, FiBell, FiMenu, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ShelterDashboardNav = ({ setShowSideBar, showSideBar, stats }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/auth/login');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
      <div className="flex items-center">
        <button
          onClick={() => setShowSideBar(!showSideBar)}
          className="p-2 transition-colors duration-200 rounded-lg hover:bg-neutral-100 lg:hidden"
        >
          <FiMenu className="w-6 h-6 text-neutral-600" />
        </button>

        <div className="ml-4 lg:ml-0">
          <h1 className="text-xl font-semibold text-neutral-800">Shelter Dashboard</h1>
          <p className="text-sm text-neutral-500">Manage your shelter and adoptions</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="items-center hidden space-x-6 md:flex">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <FiHeart className="w-4 h-4 text-green-600" />
            <span>{stats?.animalsInCare || 0} animals in care</span>
          </div>
          <div className="w-px h-6 bg-neutral-300"></div>
          <div className="text-sm text-neutral-600">
            <span className="font-medium text-green-600">{stats?.adoptionApplications || 0}</span> pending applications
          </div>
        </div>

        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search animals..."
            className="w-64 py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <FiSearch className="w-5 h-5 text-neutral-400 absolute left-3 top-2.5" />
        </div>

        <button className="relative p-2 transition-colors duration-200 rounded-lg hover:bg-neutral-100">
          <FiBell className="w-6 h-6 text-neutral-600" />
          <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center p-2 space-x-2 transition-colors duration-200 rounded-lg hover:bg-neutral-100"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-600">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.shelterName || 'Shelter'}
                  className="object-cover w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-sm font-medium text-white">
                  {user?.shelterName?.charAt(0)?.toUpperCase() || 'S'}
                </span>
              )}
            </div>
            <span className="hidden text-sm font-medium md:block text-neutral-700">
              {user?.shelterName || 'Shelter'}
            </span>
            <svg
              className="w-4 h-4 text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white border rounded-lg shadow-lg border-neutral-200"
              >
                <Link
                  to="/animalShelter-dashboard/shelter-profile"
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Shelter Profile
                </Link>
                <Link
                  to="/animalShelter-dashboard/shelter-profile"
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Settings
                </Link>
                <div className="my-1 border-t border-neutral-200"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-neutral-100"
                >
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default ShelterDashboardNav;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardNav = ({ setShowSideBar, showSideBar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      toast.success('Successfully signed out');
      navigate('/auth/login');
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
      <div className="flex items-center">
        <button
          onClick={() => setShowSideBar()}
          className="p-2 transition-colors duration-200 rounded-lg hover:bg-neutral-100 lg:hidden"
        >
          <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="ml-4 lg:ml-0">
          <h1 className="text-xl font-semibold text-neutral-800">Pet Owner Dashboard</h1>
          <p className="text-sm text-neutral-500">Welcome back! Here's your pet care overview</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <svg className="w-5 h-5 text-neutral-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button className="relative p-2 transition-colors duration-200 rounded-lg hover:bg-neutral-100">
          <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center p-2 space-x-2 transition-colors duration-200 rounded-lg hover:bg-neutral-100"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600">
              <span className="text-sm font-medium text-white">
                {user ? user.firstName?.charAt(0)?.toUpperCase() : 'U'}
              </span>
            </div>
            <span className="hidden text-sm font-medium md:block text-neutral-700">
              {user ? `${user.firstName} ${user.lastName}` : 'User Name'}
            </span>
            <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <Link to='/pets-dashboard/profile' className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Profile</Link>
                <Link to='/pets-dashboard/profile' className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Settings</Link>
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

export default DashboardNav;
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiCalendar,
  FiClock,
  FiActivity,
  FiUser,
  FiBell,
  FiLogOut,
  FiUsers,
  FiBook,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
const VetDashboardNav = ({ setShowSideBar, showSideBar, stats }) => {
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // This would typically call a logout function from your auth context
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully");
    navigate("/login");
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
          <h1 className="text-xl font-semibold text-neutral-800">
            Veterinarian Dashboard
          </h1>
          <p className="text-sm text-neutral-500">
            Manage your practice and patient care
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="items-center hidden space-x-6 md:flex">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <FiCalendar className="w-4 h-4 text-blue-600" />
            <span>{stats?.upcoming || 0} appointments today</span>
          </div>
          <div className="w-px h-6 bg-neutral-300"></div>
          <div className="text-sm text-neutral-600">
            <span className="font-medium text-green-600">
              {stats?.totalPatients || 0}
            </span>{" "}
            total patients
          </div>
        </div>

        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-64 py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
              <span className="text-sm font-medium text-white">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <span className="hidden text-sm font-medium md:block text-neutral-700">
              Dr. {user?.firstName} {user?.lastName}
            </span>
            <svg
              className="w-4 h-4 text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
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
                  to="/veterinarian-dashboard/profile"
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/veterinarian-dashboard/availability"
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Schedule
                </Link>
                <Link
                  to="/veterinarian-dashboard/settings"
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

export default VetDashboardNav;

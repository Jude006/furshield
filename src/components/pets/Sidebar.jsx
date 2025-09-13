import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiHeart, 
  FiPlus, 
  FiBarChart2, 
  FiCalendar,
  FiBookmark,
  FiShoppingCart,
  FiShoppingBag,
  FiPackage,
  FiBookOpen,
  FiBell,
  FiUser,
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Sidebar = ({ setShowSideBar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      toast.success('Successfully signed out');
      navigate('/auth/login');
    }
  };

  const menuItems = [
    { path: '/pets-dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/pets-dashboard/my-pets', icon: FiHeart, label: 'My Pets' },
    { path: '/pets-dashboard/add-pet', icon: FiPlus, label: 'Add Pet' },
    { path: '/pets-dashboard/health-records', icon: FiBarChart2, label: 'Health Records' },
    { path: '/pets-dashboard/appointments', icon: FiCalendar, label: 'Appointments' },
    { path: '/pets-dashboard/book-appointment', icon: FiBookmark, label: 'Book Appointment' },
    { path: '/pets-dashboard/products', icon: FiShoppingBag, label: 'Products' },
    { path: '/pets-dashboard/cart', icon: FiShoppingCart, label: 'Shopping Cart' },
    { path: '/pets-dashboard/orders', icon: FiPackage, label: 'Orders' },
    { path: '/pets-dashboard/care-tips', icon: FiBookOpen, label: 'Care Tips' },
    { path: '/pets-dashboard/notifications', icon: FiBell, label: 'Notifications' },
    { path: '/pets-dashboard/profile', icon: FiUser, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r w-80 border-neutral-200">
      <div className="p-4 border-b border-neutral-200">
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600">
            <FiHeart className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-neutral-800 font-display">FurShield</span>
            <p className="text-xs text-neutral-500 py-[2px]">Pet Care Platform</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto font-sans">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                onClick={() => window.innerWidth < 1024 && setShowSideBar(false)}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-r-2 border-primary-600'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                }`}
              >
                <IconComponent 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600'
                  }`} 
                />
                <span className="ml-3">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-2 h-2 ml-auto rounded-full bg-primary-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-200">
        <Link to='/pets-dashboard/profile' className="flex items-center px-4 py-3 mb-2 transition-colors duration-200 rounded-lg hover:bg-neutral-50">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100">
            <FiUser className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1 ml-3">
            <p className="text-sm font-medium text-neutral-800">
              {user ? `${user.firstName} ${user.lastName}` : 'User Name'}
            </p>
            <p className="text-xs text-neutral-500">
              {user ? user.userType.charAt(0).toUpperCase() + user.userType.slice(1) : 'Pet Owner'}
            </p>
          </div>
        </Link>
        
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800"
        >
          <FiLogOut className="w-5 h-5 text-neutral-400" />
          <span className="ml-3">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
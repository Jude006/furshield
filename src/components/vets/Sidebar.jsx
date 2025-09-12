import React , {useState}from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  FiHome, 
  FiCalendar,
  FiClock,
  FiActivity,
  FiUser,
  FiBell,
  FiLogOut,
  FiUsers,
  FiBook
} from 'react-icons/fi';

const VetSidebar = ({ setShowSideBar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { path: '/veterinarian-dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/veterinarian-dashboard/appointments', icon: FiCalendar, label: 'My Appointments' },
    { path: '/veterinarian-dashboard/appointment-history', icon: FiClock, label: 'Appointment History' },
    { path: '/veterinarian-dashboard/patient-records', icon: FiUsers, label: 'Patient Records' },
    { path: '/veterinarian-dashboard/treatment-logs', icon: FiActivity, label: 'Treatment Logs' },
    { path: '/veterinarian-dashboard/availability', icon: FiBook, label: 'Availability Schedule' },
    { path: '/veterinarian-dashboard/notifications', icon: FiBell, label: 'Notifications' },
    { path: '/veterinarian-dashboard/profile', icon: FiUser, label: 'Profile' },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };


  return (
    <div className="flex flex-col h-full bg-white border-r w-80 border-neutral-200">
      <div className="p-6 border-b border-neutral-200">
        <Link to="/" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
            <FiUser className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-neutral-800 font-display">FurShield</span>
            <p className="text-xs text-neutral-500">Veterinarian Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
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
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                }`}
              >
                <IconComponent 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-blue-600' : 'text-neutral-400 group-hover:text-neutral-600'
                  }`} 
                />
                <span className="ml-3">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-2 h-2 ml-auto bg-blue-600 rounded-full"
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
          {/* User Profile Section */}
          <div className="flex items-center px-4 py-3 mb-2 transition-colors duration-200 rounded-lg hover:bg-neutral-50">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100">
              {user?.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={`Dr. ${user.firstName} ${user.lastName}`}
                  className="object-cover w-10 h-10 rounded-full"
                />
              ) : (
                <span className="text-lg font-medium text-blue-600">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              )}
            </div>
            <div className="flex-1 ml-3">
              <p className="text-sm font-medium text-neutral-800">
                Dr. {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-neutral-500">
                {user?.specialization || 'Veterinarian'}
                {user?.clinic && ` • ${user.clinic}`}
              </p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiLogOut className="w-5 h-5 text-neutral-400" />
            <span className="ml-3">
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </span>
          </button>
        </div>
    </div>
  );
};

export default VetSidebar;
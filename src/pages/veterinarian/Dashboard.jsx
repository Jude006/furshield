import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  FiUser, 
  FiCalendar, 
  FiActivity, 
  FiBell, 
  FiClock, 
  FiArrowRight,
  FiStar,
  FiTrendingUp,
  FiHeart,
  FiMessageSquare,
  FiSettings,
  FiPlus,
  FiFileText
} from 'react-icons/fi';
import { FaDog, FaCat, FaPaw } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    completed: 0,
    upcoming: 0,
    totalPatients: 0,
    monthlyEarnings: 0,
    rating: 4.8
  });
  const [latestAppointment, setLatestAppointment] = useState(null);
  const [recentPatient, setRecentPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to access the dashboard');
          navigate('/login');
          return;
        }

        // Fetch stats
        const statsRes = await api.get('/api/vet/dashboard-stats');
        setStats(statsRes.data.data);

        // Fetch latest appointment
        try {
          const appointmentRes = await api.get('/api/appointments?limit=1&sort=-date');
          if (appointmentRes.data.data.length > 0) {
            setLatestAppointment(appointmentRes.data.data[0]);
          }
        } catch (err) {
          console.log('Could not fetch latest appointment:', err.message);
        }

        // Fetch recent patient
        try {
          const patientRes = await api.get('/api/vet/recent-patient');
          if (patientRes.data.data) {
            setRecentPatient(patientRes.data.data);
          }
        } catch (err) {
          console.log('Could not fetch recent patient:', err.message);
        }

      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const statsCards = [
    {
      title: 'Upcoming Appointments',
      value: stats.upcoming,
      icon: FiCalendar,
      color: 'primary',
      trend: '+12% this week'
    },
    {
      title: 'Completed Appointments',
      value: stats.completed,
      icon: FiActivity,
      color: 'green',
      trend: '+8% this month'
    },
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: FiUser,
      color: 'secondary',
      trend: '+5 new patients'
    },
    {
      title: 'Average Rating',
      value: stats.rating,
      icon: FiStar,
      color: 'amber',
      trend: '98% satisfaction'
    }
  ];

  const quickActions = [
    {
      title: 'Schedule Appointment',
      description: 'Book a new appointment',
      icon: FiPlus,
      color: 'primary',
      path: '/veterinarian-dashboard/appointments/new'
    },
    {
      title: 'View Calendar',
      description: 'Check your schedule',
      icon: FiCalendar,
      color: 'secondary',
      path: '/veterinarian-dashboard/appointments'
    },
    {
      title: 'Patient Records',
      description: 'Access medical history',
      icon: FiFileText,
      color: 'green',
      path: '/veterinarian-dashboard/patient-records'
    },
    {
      title: 'Availability',
      description: 'Set working hours',
      icon: FiClock,
      color: 'blue',
      path: '/veterinarian-dashboard/availability'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-neutral-900 font-display">
            Welcome back, Dr. {user.firstName} {user.lastName}!
          </h1>
          <p className="mt-2 text-neutral-600">Here's your practice overview for today</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            const colorMap = {
              primary: 'text-primary-600 bg-primary-100',
              green: 'text-green-600 bg-green-100',
              secondary: 'text-secondary-600 bg-secondary-100',
              amber: 'text-amber-600 bg-amber-100',
              blue: 'text-blue-600 bg-blue-100'
            };

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorMap[stat.color]}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.trend}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 font-display">
                    {/* {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value} */}
                  </h3>
                  <p className="text-sm text-neutral-600">{stat.title}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
              <h2 className="mb-6 text-xl font-bold text-neutral-900 font-display">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  const colorMap = {
                    primary: 'text-primary-600 bg-primary-100',
                    secondary: 'text-secondary-600 bg-secondary-100',
                    green: 'text-green-600 bg-green-100',
                    blue: 'text-blue-600 bg-blue-100'
                  };

                  return (
                    <motion.button
                      key={action.title}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(action.path)}
                      className="flex items-center w-full p-4 transition-all duration-200 rounded-lg hover:bg-neutral-50 group"
                    >
                      <div className={`p-2 rounded-lg mr-4 ${colorMap[action.color]}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-neutral-900">{action.title}</h3>
                        <p className="text-sm text-neutral-600">{action.description}</p>
                      </div>
                      <FiArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Latest Appointment & Recent Patient */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Latest Appointment */}
            {latestAppointment && (
              <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-neutral-900 font-display">Next Appointment</h2>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                    Coming up
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${latestAppointment.pet?.species === 'Dog' ? 'bg-blue-100' : 'bg-pink-100'}`}>
                    {latestAppointment.pet?.species === 'Dog' ? (
                      <FaDog className="w-6 h-6 text-blue-600" />
                    ) : (
                      <FaCat className="w-6 h-6 text-pink-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{latestAppointment.pet?.name}</h3>
                    <p className="text-sm text-neutral-600">
                      {latestAppointment.owner?.firstName} {latestAppointment.owner?.lastName}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      {new Date(latestAppointment.date).toLocaleDateString()} at {latestAppointment.time}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/veterinarian-dashboard/appointments/${latestAppointment._id}`)}
                    className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            )}

            {/* Recent Patient */}
            {recentPatient && (
              <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
                <h2 className="mb-6 text-xl font-bold text-neutral-900 font-display">Recent Patient</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className={`p-3 rounded-lg ${recentPatient.species === 'Dog' ? 'bg-blue-100' : 'bg-pink-100'}`}>
                      {recentPatient.species === 'Dog' ? (
                        <FaDog className="w-8 h-8 text-blue-600" />
                      ) : (
                        <FaCat className="w-8 h-8 text-pink-600" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{recentPatient.name}</h3>
                    <p className="text-sm text-neutral-600">
                      {recentPatient.breed} • {recentPatient.age} years
                    </p>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-neutral-500">
                      <span>Last visit: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/veterinarian-dashboard/patient-records/${recentPatient._id}`)}
                    className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    Profile
                  </button>
                </div>
              </div>
            )}

            {/* Empty states if no data */}
            {!latestAppointment && !recentPatient && (
              <div className="p-6 bg-white rounded-xl shadow-sm border border-neutral-200 text-center">
                <FaPaw className="w-12 h-12 mx-auto text-neutral-400 mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900">No recent activity</h3>
                <p className="text-neutral-600">Schedule your first appointment to get started</p>
                <button
                  onClick={() => navigate('/veterinarian-dashboard/appointments/new')}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Schedule Appointment
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Additional Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Monthly Earnings</h3>
                {/* <p className="text-2xl font-bold">${stats.monthlyEarnings.toLocaleString()}</p> */}
                <p className="text-primary-200 text-sm mt-2">+15% from last month</p>
              </div>
              <FiTrendingUp className="w-8 h-8 text-primary-200" />
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Patient Satisfaction</h3>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-secondary-200 text-sm mt-2">Based on 124 reviews</p>
              </div>
              <FiHeart className="w-8 h-8 text-secondary-200" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
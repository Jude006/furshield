import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiUser, FiCalendar, FiActivity, FiBell, FiClock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    completed: 0,
    upcoming: 0,
    totalPatients: 0
  });
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
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to access the dashboard');
          navigate('/login');
          return;
        }

        const statsRes = await api.get('/api/vet/dashboard-stats');
        setStats(statsRes.data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-neutral-900 font-display">
            Welcome back, Dr. {user.firstName} {user.lastName}!
          </h1>
          <p className="mt-2 text-neutral-600">Here's your overview for today.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-6 my-6 md:grid-cols-3"
        >
          <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
            <div className="flex items-center mb-4">
              <FiCalendar className="w-6 h-6 mr-3 text-primary-600" />
              <h3 className="text-lg font-semibold text-neutral-900 font-display">Upcoming Appointments</h3>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{stats.upcoming}</p>
          </div>
          <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
            <div className="flex items-center mb-4">
              <FiActivity className="w-6 h-6 mr-3 text-primary-600" />
              <h3 className="text-lg font-semibold text-neutral-900 font-display">Completed Appointments</h3>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{stats.completed}</p>
          </div>
          <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
            <div className="flex items-center mb-4">
              <FiUser className="w-6 h-6 mr-3 text-primary-600" />
              <h3 className="text-lg font-semibold text-neutral-900 font-display">Total Patients</h3>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{stats.totalPatients}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
          >
            <h2 className="mb-4 text-xl font-bold text-neutral-900 font-display">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => navigate('/veterinarian-dashboard/appointments')}
                className="flex items-center px-4 py-3 font-sans text-sm rounded-lg bg-neutral-50 hover:bg-neutral-100"
              >
                <FiCalendar className="w-5 h-5 mr-3 text-primary-600" />
                Manage Appointments
              </button>
              <button
                onClick={() => navigate('/veterinarian-dashboard/availability')}
                className="flex items-center px-4 py-3 font-sans text-sm rounded-lg bg-neutral-50 hover:bg-neutral-100"
              >
                <FiClock className="w-5 h-5 mr-3 text-primary-600" />
                Update Availability
              </button>
              <button
                onClick={() => navigate('/veterinarian-dashboard/notifications')}
                className="flex items-center px-4 py-3 font-sans text-sm rounded-lg bg-neutral-50 hover:bg-neutral-100"
              >
                <FiBell className="w-5 h-5 mr-3 text-primary-600" />
                View Notifications
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
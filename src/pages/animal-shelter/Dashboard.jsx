import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiClipboard, FiUsers, FiCalendar, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

const Dashboard = () => {
  const [stats, setStats] = useState({
    animalsInCare: 0,
    adoptionApplications: 0,
    successfulAdoptions: 0,
    medicalAppointments: 0,
  });
  const [recentAdoptions, setRecentAdoptions] = useState([]);
  const [urgentTasks, setUrgentTasks] = useState([]);
  const [shelterName, setShelterName] = useState('Shelter');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const api = axios.create({
          baseURL: API_BASE_URL,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const response = await api.get('/api/shelter/dashboard');
        console.log('Dashboard data:', response.data);
        setStats(response.data.data.stats || {
          animalsInCare: 0,
          adoptionApplications: 0,
          successfulAdoptions: 0,
          medicalAppointments: 0,
        });
        setRecentAdoptions(response.data.data.recentAdoptions || []);
        setUrgentTasks(response.data.data.urgentTasks || []);
        setShelterName(response.data.data.shelterName || 'Shelter');
      } catch (error) {
        console.error('Fetch dashboard error:', error.response?.data || error);
        toast.error('Failed to load dashboard data: ' + (error.response?.data?.error || error.message));
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          window.location.href = '/auth/login';
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl"
      >
        <h1 className="mb-2 text-2xl font-bold font-display">Welcome, {shelterName}!</h1>
        <p className="opacity-90">
          You have {stats.adoptionApplications} pending adoption applications and {stats.medicalAppointments} medical appointments this week.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <FiHeart className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-neutral-800">{stats.animalsInCare}</div>
          </div>
          <h3 className="mb-1 font-medium text-neutral-700">Animals in Care</h3>
          <p className="text-sm text-green-600">+0 this week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <FiClipboard className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-neutral-800">{stats.adoptionApplications}</div>
          </div>
          <h3 className="mb-1 font-medium text-neutral-700">Adoption Applications</h3>
          <p className="text-sm text-green-600">Pending review</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <FiUsers className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-neutral-800">{stats.successfulAdoptions}</div>
          </div>
          <h3 className="mb-1 font-medium text-neutral-700">Successful Adoptions</h3>
          <p className="text-sm text-green-600">This month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <FiCalendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-neutral-800">{stats.medicalAppointments}</div>
          </div>
          <h3 className="mb-1 font-medium text-neutral-700">Medical Appointments</h3>
          <p className="text-sm text-green-600">Scheduled this week</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-800 font-display">Recent Adoptions</h2>
            <Link
              to="/animalShelter-dashboard/adoption-applications"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentAdoptions.length === 0 ? (
              <p className="text-sm text-neutral-500">No recent adoptions yet.</p>
            ) : (
              recentAdoptions.map((adoption) => (
                <div key={adoption._id} className="flex items-center p-4 border rounded-lg border-neutral-200">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-green-100 rounded-full">
                    <FiHeart className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="font-medium text-neutral-800">{adoption.name} - {adoption.species}</h3>
                    <p className="text-sm text-neutral-600">Breed: {adoption.breed}</p>
                    <p className="text-xs text-neutral-500">
                      Adopted on {new Date(adoption.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <h2 className="mb-6 text-xl font-semibold text-neutral-800 font-display">Urgent Tasks</h2>
          <div className="space-y-4">
            {urgentTasks.length === 0 ? (
              <p className="text-sm text-neutral-500">No urgent tasks at the moment.</p>
            ) : (
              urgentTasks.map((task) => (
                <div key={task._id} className="flex items-center p-4 border rounded-lg border-green-200 bg-green-50">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-green-100">
                    <FiAlertCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 ml-4">
                    <p className="text-sm font-medium text-neutral-800">{task.type}</p>
                    <p className="text-sm text-neutral-600">{task.details}</p>
                    <p className="text-xs text-green-600">
                      Due: {new Date(task.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
      >
        <h2 className="mb-6 text-xl font-semibold text-neutral-800 font-display">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link
            to="/animalShelter-dashboard/add-pet"
            className="flex flex-col items-center p-4 transition-colors duration-200 rounded-lg bg-green-50 hover:bg-green-100"
          >
            <FiHeart className="w-6 h-6 mb-2 text-green-600" />
            <span className="text-sm font-medium text-green-700">Add New Pet</span>
          </Link>
          <Link
            to="/animalShelter-dashboard/adoption-applications"
            className="flex flex-col items-center p-4 transition-colors duration-200 rounded-lg bg-green-50 hover:bg-green-100"
          >
            <FiClipboard className="w-6 h-6 mb-2 text-green-600" />
            <span className="text-sm font-medium text-green-700">View Applications</span>
          </Link>
          <Link
            to="/animalShelter-dashboard/health-records"
            className="flex flex-col items-center p-4 transition-colors duration-200 rounded-lg bg-green-50 hover:bg-green-100"
          >
            <FiCalendar className="w-6 h-6 mb-2 text-green-600" />
            <span className="text-sm font-medium text-green-700">Health Records</span>
          </Link>
          <Link
            to="/animalShelter-dashboard/care-logs"
            className="flex flex-col items-center p-4 transition-colors duration-200 rounded-lg bg-green-50 hover:bg-green-100"
          >
            <FiAlertCircle className="w-6 h-6 mb-2 text-green-600" />
            <span className="text-sm font-medium text-green-700">Care Logs</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
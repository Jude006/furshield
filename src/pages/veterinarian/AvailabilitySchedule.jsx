import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiSave, FiEdit2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const AvailabilitySchedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [availability, setAvailability] = useState([]);
  const [editingDay, setEditingDay] = useState(null);
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    slots: ''
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
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view availability');
          navigate('/login');
          return;
        }

        const availabilityRes = await api.get('/api/availability');
        setAvailability(availabilityRes.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load availability');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [navigate]);

  const handleEdit = (day) => {
    const selected = availability.find(a => a.day === day) || {
      day,
      startTime: '09:00',
      endTime: '17:00',
      slots: 8
    };
    setFormData({
      startTime: selected.startTime,
      endTime: selected.endTime,
      slots: selected.slots
    });
    setEditingDay(day);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedAvailability = await api.put('/api/availability', { day: editingDay, ...formData });
      setAvailability(availability.map(a => a.day === editingDay ? updatedAvailability.data.data : a));
      toast.success('Availability updated successfully');
      setEditingDay(null);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.error || 'Failed to update availability');
      }
    } finally {
      setLoading(false);
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
          className="flex items-center mb-6"
        >
          <button
            onClick={() => navigate('/veterinarian-dashboard')}
            className="flex items-center px-4 py-2 mr-4 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-neutral-900 font-display">Availability Schedule</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className="flex items-center justify-between">
                <p className="font-sans text-sm font-medium text-neutral-900">{day}</p>
                {editingDay === day ? (
                  <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="px-3 py-2 font-sans text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <span className="text-neutral-600">to</span>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="px-3 py-2 font-sans text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="number"
                      name="slots"
                      value={formData.slots}
                      onChange={handleInputChange}
                      min="0"
                      className="w-20 px-3 py-2 font-sans text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={loading}
                      className="px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                    >
                      <FiSave className="w-4 h-4" />
                    </motion.button>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2">
                    <p className="font-sans text-sm text-neutral-600">
                      {availability.find(a => a.day === day) ? `${availability.find(a => a.day === day).startTime} - ${availability.find(a => a.day === day).endTime} (${availability.find(a => a.day === day).slots} slots)` : 'Not Available'}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(day)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AvailabilitySchedule;
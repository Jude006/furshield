import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiPlus, FiX, FiTrash2 } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AvailabilitySchedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDate, setNewDate] = useState('');
  const [newTimeSlots, setNewTimeSlots] = useState([{ startTime: '', endTime: '' }]);
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
        if (!user || user.userType !== 'veterinarian') {
          toast.error('Please login as a veterinarian to manage availability');
          navigate('/login');
          return;
        }

        const response = await api.get(`/api/availability/vet/${user._id}`);
        setAvailabilities(response.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
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
  }, [navigate, user]);

  const handleAddTimeSlot = () => {
    setNewTimeSlots([...newTimeSlots, { startTime: '', endTime: '' }]);
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedSlots = [...newTimeSlots];
    updatedSlots[index][field] = value;
    setNewTimeSlots(updatedSlots);
  };

  const handleRemoveTimeSlot = (index) => {
    setNewTimeSlots(newTimeSlots.filter((_, i) => i !== index));
  };

  const handleAddAvailability = async () => {
    if (!newDate || newTimeSlots.some(slot => !slot.startTime || !slot.endTime)) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      const response = await api.post('/api/availability', {
        date: newDate,
        timeSlots: newTimeSlots
      });
      setAvailabilities([...availabilities, response.data.data]);
      setNewDate('');
      setNewTimeSlots([{ startTime: '', endTime: '' }]);
      toast.success('Availability added successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add availability');
    }
  };

  const handleDeleteAvailability = async (id) => {
    if (window.confirm('Are you sure you want to delete this availability?')) {
      try {
        await api.delete(`/api/availability/${id}`);
        setAvailabilities(availabilities.filter(avail => avail._id !== id));
        toast.success('Availability deleted successfully');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to delete availability');
      }
    }
  };

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
          className="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center space-x-4">
            <FaPaw className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-neutral-900 font-display">Manage Availability</h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border shadow-sm rounded-xl border-neutral-200 p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-neutral-900 font-display mb-4">Add New Availability</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-sm font-medium text-neutral-600">Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full py-2 px-3 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            {newTimeSlots.map((slot, index) => (
              <div key={index} className="flex space-x-4 items-center">
                <div className="flex-1">
                  <label className="block font-sans text-sm font-medium text-neutral-600">Start Time</label>
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                    className="w-full py-2 px-3 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-sans text-sm font-medium text-neutral-600">End Time</label>
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                    className="w-full py-2 px-3 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                {index > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveTimeSlot(index)}
                    className="text-red-600 hover:text-red-900 mt-6"
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddTimeSlot}
              className="flex items-center px-4 py-2 font-sans text-primary-600 border rounded-lg border-primary-300 hover:bg-primary-50"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Time Slot
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddAvailability}
              className="px-4 py-2 font-sans text-white rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              Save Availability
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Date</th>
                  <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Time Slots</th>
                  <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                <AnimatePresence>
                  {availabilities.length > 0 ? (
                    availabilities.map((availability) => (
                      <motion.tr
                        key={availability._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="transition-colors duration-200 hover:bg-neutral-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-sans text-sm text-neutral-900">
                          {new Date(availability.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-sans text-sm text-neutral-900">
                          {availability.timeSlots.map(slot => `${slot.startTime} - ${slot.endTime} (${slot.status})`).join(', ')}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteAvailability(availability._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 font-sans text-center text-neutral-600">
                        No availability set.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AvailabilitySchedule;
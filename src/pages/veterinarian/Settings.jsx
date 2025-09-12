import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        contactNumber: user.contactNumber || '',
        address: user.address || '',
        password: '',
      });
    } else {
      toast.error('Please login to view settings');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateUser(formData);
      if (result.success) {
        toast.success('Settings updated successfully');
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error('Update error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.error || 'Failed to update settings');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.firstName) {
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
          <h1 className="text-3xl font-bold text-neutral-900 font-display">Settings</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Phone Number</label>
                  <div className="relative">
                    <FiPhone className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Address</label>
                  <div className="relative">
                    <FiMapPin className="absolute w-5 h-5 left-3 top-3 text-neutral-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={loading}
                      rows={3}
                      className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Leave blank to keep current"
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/veterinarian-dashboard')}
                  className="px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  className="px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                >
                  <FiSave className="inline w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
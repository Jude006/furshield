import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiX,
  FiShield,
  FiAward,
} from 'react-icons/fi';

const VetProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    specialization: '',
    experience: '',
    licenseNumber: '',
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view profile');
          navigate('/auth/login');
          return;
        }

        console.log('Fetching profile for user...'); // Debug
        const userRes = await api.get('/api/users/me');
        const user = userRes.data.data;
        console.log('Fetched user:', user); // Debug
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          contactNumber: user.contactNumber || '',
          address: user.address || '',
          specialization: user.specialization || 'General', // Default to General
          experience: user.experience?.toString() || '0', // Convert to string
          licenseNumber: user.licenseNumber || '',
        });
      } catch (err) {
        console.error('Fetch profile error:', err.response?.data || err); // Debug
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/auth/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation
    if (!formData.firstName.trim() || formData.firstName.length > 50) {
      toast.error('First name is required and must be 50 characters or less');
      setLoading(false);
      return;
    }
    if (!formData.lastName.trim() || formData.lastName.length > 50) {
      toast.error('Last name is required and must be 50 characters or less');
      setLoading(false);
      return;
    }
    if (!formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      toast.error('Please provide a valid email address');
      setLoading(false);
      return;
    }
    if (!formData.contactNumber.trim()) {
      toast.error('Phone number is required');
      setLoading(false);
      return;
    }
    if (!formData.address.trim()) {
      toast.error('Address is required');
      setLoading(false);
      return;
    }
    if (!formData.specialization || formData.specialization === '') {
      toast.error('Specialization is required');
      setLoading(false);
      return;
    }
    if (!formData.experience || isNaN(parseInt(formData.experience, 10)) || parseInt(formData.experience, 10) < 0) {
      toast.error('Please provide a valid number for years of experience');
      setLoading(false);
      return;
    }
    if (!formData.licenseNumber.trim()) {
      toast.error('License number is required');
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting profile update:', {
        ...formData,
        experience: parseInt(formData.experience, 10),
      }); // Debug
      const response = await api.put('/api/users/me', {
        ...formData,
        experience: parseInt(formData.experience, 10),
      });
      console.log('Update response:', response.data); // Debug
      toast.success('Profile updated successfully');
      setFormData({
        ...formData,
        ...response.data.data, // Update formData with server response
        experience: response.data.data.experience?.toString() || '0',
      });
      setEditing(false);
    } catch (err) {
      console.error('Update profile error:', err.response?.data || err); // Debug
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/auth/login');
      } else if (err.response?.status === 400 && err.response.data.errors) {
        // Handle Mongoose validation errors
        const validationErrors = err.response.data.errors.map((error) => error.msg).join(', ');
        toast.error(validationErrors || 'Failed to update profile');
      } else {
        toast.error(err.response?.data?.error || 'Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: FiUser },
    { id: 'professional', label: 'Professional', icon: FiAward },
  ];

  if (loading && !formData.firstName) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 font-display">My Profile</h1>
          <p className="text-neutral-600">Manage your professional information</p>
        </div>
        {!editing && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setEditing(true)}
            className="flex items-center px-4 py-2 mt-4 text-white rounded-lg bg-primary-600 hover:bg-primary-700 sm:mt-0"
          >
            <FiEdit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </motion.button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
      >
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-neutral-900 font-display">
            {formData.firstName} {formData.lastName}
          </h2>
          <p className="font-medium text-primary-600">{formData.specialization || 'General'}</p>
          <div className="flex items-center justify-center mt-2 text-sm sm:justify-start text-neutral-500">
            <FiAward className="w-4 h-4 mr-1" />
            <span>{formData.experience || 0} years experience</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200"
      >
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 bg-primary-50'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </motion.div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
      >
        <form onSubmit={handleSubmit}>
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-900 font-display">Personal Information</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    required
                    maxLength={50}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    required
                    maxLength={50}
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
                      disabled={!editing}
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
                      disabled={!editing}
                      className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                      required
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
                      disabled={!editing}
                      rows={3}
                      className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'professional' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-900 font-display">Professional Information</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">License Number</label>
                  <div className="relative">
                    <FiShield className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      disabled={!editing}
                      className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    disabled={!editing}
                    min="0"
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Specialization</label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    required
                  >
                    <option value="General">General</option>
                    <option value="Small Animal Surgery">Small Animal Surgery</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Dentistry">Dentistry</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {editing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end pt-6 mt-6 space-x-3 border-t border-neutral-200"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditing(false)}
                className="px-4 py-2 font-sans border rounded-lg border-neutral-300 text-neutral-700 hover:bg-neutral-50"
              >
                <FiX className="inline w-4 h-4 mr-2" />
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="px-4 py-2 font-sans text-white rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
              >
                <FiSave className="inline w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default VetProfile;
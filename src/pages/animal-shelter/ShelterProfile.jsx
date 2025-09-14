import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiHome,
} from 'react-icons/fi';

const ShelterProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shelterName: '',
    contactPerson: '',
    email: '',
    contactNumber: '',
    address: '',
    shelterType: 'Animal Shelter', // Default value
    description: '',
    profileImage: '',
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002'; // Updated to match backend port

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

        console.log('Fetching shelter profile...');
        const userRes = await api.get('/api/users/me');
        const userData = userRes.data.data;
        console.log('Fetched shelter profile:', userData);
        setFormData({
          shelterName: userData.shelterName || '',
          contactPerson: userData.contactPerson || '',
          email: userData.email || '',
          contactNumber: userData.contactNumber || '',
          address: userData.address || '',
          shelterType: userData.shelterType || 'Animal Shelter',
          description: userData.description || '',
          profileImage: userData.profileImage || '',
        });
      } catch (err) {
        console.error('Fetch profile error:', err.response?.data || err);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation
    if (!formData.shelterName.trim() || formData.shelterName.length > 50) {
      toast.error('Shelter name is required and must be 50 characters or less');
      setLoading(false);
      return;
    }
    if (!formData.contactPerson.trim() || formData.contactPerson.length > 50) {
      toast.error('Contact person is required and must be 50 characters or less');
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
    if (!formData.shelterType.trim()) {
      toast.error('Shelter type is required');
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'profileImage') {
          form.append(key, value);
        }
      });
      if (profileImageFile) {
        form.append('profileImage', profileImageFile);
      }

      console.log('Submitting shelter profile update:', Object.fromEntries(form));
      const response = await api.put('/api/users/me', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Update response:', response.data);
      toast.success('Profile updated successfully');
      setFormData({
        ...formData,
        ...response.data.data,
        profileImage: response.data.data.profileImage || formData.profileImage,
      });
      setEditing(false);
    } catch (err) {
      console.error('Update profile error:', err.response?.data || err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/auth/login');
      } else if (err.response?.status === 400 && err.response.data.errors) {
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
    { id: 'shelter', label: 'Shelter Info', icon: FiHome },
  ];

  if (loading && !formData.shelterName) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 font-display">Shelter Profile</h1>
          <p className="text-neutral-600">Manage your shelter information</p>
        </div>
        {!editing && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setEditing(true)}
            className="flex items-center px-4 py-2 mt-4 text-white rounded-lg bg-green-600 hover:bg-green-700 sm:mt-0"
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
          <div className="flex justify-center mb-4 sm:justify-start">
            <img
              src={formData.profileImage || '/images/fallback.jpg'}
              alt={formData.shelterName}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 font-display">{formData.shelterName}</h2>
          <p className="font-medium text-green-600">{formData.shelterType}</p>
          <div className="flex items-center justify-center mt-2 text-sm sm:justify-start text-neutral-500">
            <FiMapPin className="w-4 h-4 mr-1" />
            <span>{formData.address || 'No address provided'}</span>
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
                  ? 'border-green-500 text-green-600 bg-green-50'
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
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Shelter Name</label>
                  <input
                    type="text"
                    name="shelterName"
                    value={formData.shelterName}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    required
                    maxLength={50}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-neutral-100 disabled:text-neutral-500"
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
                      className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-neutral-100 disabled:text-neutral-500"
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
                      className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-neutral-100 disabled:text-neutral-500"
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
                      className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shelter' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-900 font-display">Shelter Information</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Shelter Type</label>
                  <select
                    name="shelterType"
                    value={formData.shelterType}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    required
                  >
                    <option value="Animal Shelter">Animal Shelter</option>
                    <option value="Rescue Organization">Rescue Organization</option>
                    <option value="Foster Network">Foster Network</option>
                    <option value="Sanctuary">Sanctuary</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Shelter Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={!editing}
                    rows={4}
                    className="w-full py-2 px-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">Profile Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={!editing}
                      className="w-full py-2 px-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-neutral-100 disabled:text-neutral-500"
                    />
                    <FiCamera className="absolute w-5 h-5 transform -translate-y-1/2 right-3 top-1/2 text-neutral-400" />
                  </div>
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
                className="px-4 py-2 font-sans text-white rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50"
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

export default ShelterProfile;
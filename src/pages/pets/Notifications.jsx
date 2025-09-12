import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiBell, FiCheck } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
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
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view notifications');
          navigate('/login');
          return;
        }

        // Assuming /api/notifications endpoint exists
        const notificationsRes = await api.get('/api/notifications');
        setNotifications(notificationsRes.data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load notifications');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [navigate]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.put(`/api/notifications/${notificationId}`, { read: true });
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === notificationId ? { ...notif, read: true } : notif))
      );
      toast.success('Notification marked as read');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to mark notification as read');
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
      <div className="flex flex-col flex-1 overflow-hidden">
       
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 text-3xl font-bold text-neutral-900 font-display">Notifications</h1>
              {notifications.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FiBell className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No notifications found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-4 bg-white border shadow-sm rounded-xl border-neutral-200 ${
                        notification.read ? 'opacity-75' : 'border-l-4 border-primary-500'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <FaPaw className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-sans text-sm font-medium text-neutral-900">{notification.title}</p>
                          <p className="mt-1 font-sans text-xs text-neutral-600">{notification.message}</p>
                          <p className="mt-1 font-sans text-xs text-neutral-500">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification._id)}
                            className="p-2 rounded-lg text-primary-600 hover:bg-primary-50"
                          >
                            <FiCheck className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
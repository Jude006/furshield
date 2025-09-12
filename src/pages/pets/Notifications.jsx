import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiSearch, FiBell, FiCheckCircle } from 'react-icons/fi';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

        const notificationsRes = await api.get('/api/notifications');
        setNotifications(notificationsRes.data.data);
      } catch (err) {
        console.error('Fetch notifications error:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          toast.error('Session expired or unauthorized. Please login again.');
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
      const updatedNotification = await api.put(`/api/notifications/${notificationId}/read`);
      setNotifications(notifications.map(n => 
        n._id === notificationId ? updatedNotification.data.data : n
      ));
      toast.success('Notification marked as read');
    } catch (err) {
      console.error('Mark notification as read error:', err);
      toast.error(err.response?.data?.error || 'Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const updatedNotifications = await api.put('/api/notifications/read-all');
      setNotifications(updatedNotifications.data.data);
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Mark all notifications as read error:', err);
      toast.error(err.response?.data?.error || 'Failed to mark all notifications as read');
    }
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 font-display">Notifications</h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/pets-dashboard')}
                    className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                  >
                    <FiArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </button>
                  {notifications.some(n => !n.read) && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-primary-600 bg-primary-50 hover:bg-primary-100"
                    >
                      <FiCheckCircle className="w-4 h-4 mr-2" />
                      Mark All as Read
                    </button>
                  )}
                </div>
              </div>
              <div className="relative mb-6">
                <FiSearch className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FiBell className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No notifications found.</p>
                  <button
                    onClick={() => navigate('/pets-dashboard')}
                    className="px-6 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Back to Dashboard
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 bg-white border shadow-sm rounded-xl border-neutral-200 ${notification.read ? 'opacity-75' : 'bg-primary-50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-sans text-sm font-medium text-neutral-900">
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </p>
                          <p className="mt-1 font-sans text-xs text-neutral-600">{notification.message}</p>
                          <p className="mt-1 font-sans text-xs text-neutral-400">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification._id)}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <FiCheckCircle className="w-5 h-5" />
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
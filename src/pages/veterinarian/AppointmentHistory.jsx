import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEye, FiX } from 'react-icons/fi';
import { FaDog, FaCat, FaPaw } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AppointmentHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
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
    console.log('User:', user);
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        if (!user || user.userType !== 'veterinarian') {
          toast.error('Please login as a veterinarian to view appointment history');
          navigate('/login');
          return;
        }

        const appointmentsRes = await api.get(`/api/appointments/vet/${user._id}`);
        console.log('API Response:', appointmentsRes.data);
        setAppointments(appointmentsRes.data.data.filter((appt) => appt.status === 'completed'));
      } catch (err) {
        console.error('Fetch Error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load appointment history');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate, user]);

  const handleViewDetails = (appointment) => {
    console.log('Selected Appointment:', appointment);
    setSelectedAppointment(appointment);
    setShowDetails(true);
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
            <h1 className="text-3xl font-bold text-neutral-900 font-display">Appointment History</h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3"
        >
          <div className="p-6 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
            <div className="text-2xl font-bold text-primary-600 font-display">
              {
                appointments.filter(
                  (appt) =>
                    appt.date &&
                    new Date(appt.date).getMonth() === new Date().getMonth() &&
                    new Date(appt.date).getFullYear() === new Date().getFullYear()
                ).length
              }
            </div>
            <div className="font-sans text-sm text-neutral-600">Completed This Month</div>
          </div>
          <div className="p-6 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
            <div className="text-2xl font-bold text-green-600 font-display">{appointments.length}</div>
            <div className="font-sans text-sm text-neutral-600">Total Completed</div>
          </div>
          <div className="p-6 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
            <div className="text-2xl font-bold text-blue-600 font-display">
              {new Set(appointments.map((appt) => appt.pet?._id || '')).size}
            </div>
            <div className="font-sans text-sm text-neutral-600">Different Pets</div>
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
                  <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                    Pet & Owner
                  </th>
                  <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                    Reason
                  </th>
                  <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                    Status
                  </th>
                  <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                <AnimatePresence>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <motion.tr
                        key={appointment._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="transition-colors duration-200 hover:bg-neutral-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`p-2 rounded-lg mr-3 ${
                                appointment.pet?.species === 'Dog' ? 'bg-blue-100' : 'bg-pink-100'
                              }`}
                            >
                              {appointment.pet?.species === 'Dog' ? (
                                <FaDog className="w-5 h-5 text-blue-600" />
                              ) : (
                                <FaCat className="w-5 h-5 text-pink-600" />
                              )}
                            </div>
                            <div>
                              <div className="font-sans font-medium text-neutral-900">{appointment.pet?.name || 'N/A'}</div>
                              <div className="font-sans text-sm text-neutral-500">
                                {appointment.owner?.firstName || ''} {appointment.owner?.lastName || ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-sans text-sm text-neutral-900">
                            {appointment.date ? new Date(appointment.date).toLocaleDateString() : 'N/A'}
                          </div>
                          <div className="font-sans text-sm text-neutral-500">{appointment.time || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 font-sans text-sm whitespace-nowrap text-neutral-900">
                          {appointment.reason || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 font-sans text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                            {appointment.status || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleViewDetails(appointment)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <FiEye className="w-4 h-4" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 font-sans text-center text-neutral-600">
                        No completed appointments found.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        <AnimatePresence>
          {showDetails && selectedAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={() => setShowDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto printable"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-neutral-900 font-display">Appointment Details</h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowDetails(false)}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      <FiX className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="mb-2 font-sans text-sm font-medium text-neutral-600">Pet Information</h3>
                        <div className="flex items-center">
                          <div
                            className={`p-3 rounded-lg mr-4 ${
                              selectedAppointment.pet?.species === 'Dog' ? 'bg-blue-100' : 'bg-pink-100'
                            }`}
                          >
                            {selectedAppointment.pet?.species === 'Dog' ? (
                              <FaDog className="w-6 h-6 text-blue-600" />
                            ) : (
                              <FaCat className="w-6 h-6 text-pink-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-sans font-medium text-neutral-900">{selectedAppointment.pet?.name || 'N/A'}</p>
                            <p className="font-sans text-sm text-neutral-600">
                              {selectedAppointment.owner?.firstName || ''} {selectedAppointment.owner?.lastName || ''}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-2 font-sans text-sm font-medium text-neutral-600">Appointment Details</h3>
                        <p className="font-sans text-neutral-900">{selectedAppointment.reason || 'N/A'}</p>
                        <p className="font-sans text-sm text-neutral-600">
                          {selectedAppointment.date
                            ? `${new Date(selectedAppointment.date).toLocaleDateString()} at ${selectedAppointment.time || 'N/A'}`
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-sans text-sm font-medium text-neutral-600">Symptoms</h3>
                      <p className="font-sans text-neutral-900">
                        {selectedAppointment.symptoms?.length > 0 ? selectedAppointment.symptoms.join(', ') : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-sans text-sm font-medium text-neutral-600">Diagnosis</h3>
                      <p className="font-sans text-neutral-900">{selectedAppointment.diagnosis || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-sans text-sm font-medium text-neutral-600">Treatment</h3>
                      <p className="font-sans text-neutral-900">{selectedAppointment.treatment || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-sans text-sm font-medium text-neutral-600">Follow-Up</h3>
                      <p className="font-sans text-neutral-900">
                        {selectedAppointment.followUpRequired
                          ? `Required on ${selectedAppointment.followUpDate ? new Date(selectedAppointment.followUpDate).toLocaleDateString() : 'N/A'}`
                          : 'Not required'}
                      </p>
                    </div>
                    <div className="flex justify-end pt-4 space-x-3 border-t border-neutral-200">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDetails(false)}
                        className="px-4 py-2 font-sans border rounded-lg border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                      >
                        Close
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.print()}
                        className="px-4 py-2 font-sans text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                      >
                        Print Report
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppointmentHistory;
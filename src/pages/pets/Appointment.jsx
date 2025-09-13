import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiCalendar, FiSearch, FiArrowLeft } from 'react-icons/fi';
import { FaPaw, FaDog, FaCat } from 'react-icons/fa';

const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
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
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view appointments');
          navigate('/login');
          return;
        }

        const appointmentsRes = await api.get('/api/appointments');
        setAppointments(appointmentsRes.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load appointments');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await api.put(`/api/appointments/${appointmentId}/status`, { status: 'cancelled' });
        setAppointments((prev) =>
          prev.map((appt) => (appt._id === appointmentId ? { ...appt, status: 'cancelled' } : appt))
        );
        toast.success('Appointment cancelled');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to cancel appointment');
      }
    }
  };

  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.veterinarian?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.pet?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <FaPaw className="w-8 h-8 text-primary-600" />
                  <h1 className="text-3xl font-bold text-neutral-900 font-display">Appointments</h1>
                </div>
                <div className="flex flex-wrap space-x-3">
                  <button
                    onClick={() => navigate('/pets-dashboard')}
                    className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                  >
                    <FiArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/pets-dashboard/book-appointment')}
                    className="flex items-center px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    <FiCalendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </button>
                </div>
              </div>

              <div className="relative mb-6">
                <FiSearch className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by pet, vet, or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {filteredAppointments.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FaPaw className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No appointments found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <motion.div
                      key={appointment._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          {appointment.pet?.species === 'Dog' ? (
                            <FaDog className="w-6 h-6 text-primary-600" />
                          ) : (
                            <FaCat className="w-6 h-6 text-primary-600" />
                          )}
                          <div>
                            <p className="font-sans text-sm font-medium text-neutral-900">
                              {appointment.reason || 'Checkup'} - {appointment.pet?.name}
                            </p>
                            <p className="font-sans text-xs text-neutral-600">
                              Dr. {appointment.veterinarian?.firstName} {appointment.veterinarian?.lastName}
                            </p>
                            <p className="mt-1 font-sans text-xs text-neutral-600">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </p>
                            <p className="mt-1 font-sans text-xs text-neutral-600">Status: {appointment.status}</p>
                          </div>
                        </div>
                        {appointment.status === 'scheduled' && (
                          <button
                            onClick={() => handleCancelAppointment(appointment._id)}
                            className="px-4 py-2 font-sans text-sm font-medium text-red-600 rounded-lg bg-red-50 hover:bg-red-100"
                          >
                            Cancel
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

export default Appointment;
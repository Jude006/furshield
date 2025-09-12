import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FiHeart,
  FiCalendar,
  FiShoppingCart,
  FiBell,
  FiBookOpen,
  FiClock,
  FiMapPin,
  FiPlus,
} from 'react-icons/fi';
import { FaPaw, FaDog, FaCat } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [healthAlerts, setHealthAlerts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to access the dashboard');
          navigate('/login');
          return;
        }

        const [petsRes, appointmentsRes, ordersRes] = await Promise.all([
          api.get('/api/pets'),
          api.get('/api/appointments'),
          api.get('/api/orders'),
        ]);

        setPets(petsRes.data.data);
        setAppointments(appointmentsRes.data.data);
        const alerts = petsRes.data.data.flatMap(pet =>
          pet.vaccinations
            .filter(v => v.nextDue && new Date(v.nextDue) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
            .map(v => ({
              id: `${pet._id}-vax-${v._id}`,
              type: 'Vaccination',
              message: `Vaccination due for ${pet.name} on ${new Date(v.nextDue).toLocaleDateString()}`,
              priority: 'high',
              pet: pet.name,
            }))
        );
        setHealthAlerts(alerts);
        setOrders(ordersRes.data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/pets-dashboard/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleAddPet = () => {
    navigate('/pets-dashboard/add-pet');
  };

  const handleViewPet = (petId) => {
    navigate(`/pets-dashboard/pet/${petId}`);
  };

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      await api.put(`/api/appointments/${appointmentId}`, { status: 'approved' });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: 'approved' } : appt
        )
      );
      toast.success('Appointment confirmed');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to confirm appointment');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  const quickStats = {
    totalPets: pets.length,
    upcomingAppointments: appointments.filter((appt) => appt.status === 'pending').length,
    healthAlerts: healthAlerts.length,
    cartItems: orders.reduce((acc, order) => acc + order.items.length, 0),
  };

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
              <h1 className="mb-2 text-3xl font-bold text-neutral-900 font-display">
                Welcome back, {user ? `${user.firstName} ${user.lastName}` : 'Pet Owner'}!
              </h1>
              <p className="font-sans text-neutral-600">
                Here's what's happening with your pets today.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 my-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Total Pets', value: quickStats.totalPets, icon: FiHeart, color: 'bg-primary-100 text-primary-600' },
                { label: 'Appointments', value: quickStats.upcomingAppointments, icon: FiCalendar, color: 'bg-secondary-100 text-secondary-600' },
                { label: 'Health Alerts', value: quickStats.healthAlerts, icon: FaPaw, color: 'bg-amber-100 text-amber-600' },
                { label: 'Cart Items', value: quickStats.cartItems, icon: FiShoppingCart, color: 'bg-emerald-100 text-emerald-600' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-4 bg-white border shadow-sm rounded-xl border-neutral-200"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <p className="font-sans text-sm font-medium text-neutral-600">{stat.label}</p>
                      <p className="text-xl font-bold text-neutral-900 font-display">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-neutral-900 font-display">My Pets</h2>
                    <button
                      onClick={handleAddPet}
                      className="flex items-center px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                    >
                      <FiPlus className="w-4 h-4 mr-2" />
                      Add Pet
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {pets.length === 0 ? (
                      <p className="font-sans text-neutral-600 col-span-full">No pets added yet.</p>
                    ) : (
                      pets.map((pet, index) => (
                        <motion.div
                          key={pet._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 border rounded-lg cursor-pointer border-neutral-200 hover:shadow-md"
                          onClick={() => handleViewPet(pet._id)}
                        >
                          <div className="flex items-center mb-3">
                            {pet.images.length > 0 ? (
                              <img
                                src={`${API_BASE_URL}${pet.images[0].url}`}
                                alt={pet.name}
                                className="object-cover w-12 h-12 mr-3 rounded-lg"
                              />
                            ) : (
                              pet.species === 'dog' ? (
                                <FaDog className="w-6 h-6 mr-3 text-primary-600" />
                              ) : (
                                <FaCat className="w-6 h-6 mr-3 text-primary-600" />
                              )
                            )}
                            <div>
                              <h3 className="font-bold text-neutral-900 font-display">{pet.name}</h3>
                              <p className="font-sans text-sm text-neutral-600">{pet.breed}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center font-sans text-neutral-600">
                              <FiHeart className="w-4 h-4 mr-1" />
                              <span>{pet.weight || 'N/A'} kg</span>
                            </div>
                            <div className="flex items-center font-sans text-neutral-600">
                              <FiBell className="w-4 h-4 mr-1" />
                              <span>Vax: {pet.vaccinations.length > 0 ? new Date(pet.vaccinations[0].nextDue).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div className="flex items-center font-sans text-neutral-600">
                              <FaPaw className="w-4 h-4 mr-1" />
                              <span>Checkup: {pet.medicalHistory.length > 0 ? new Date(pet.medicalHistory[0].date).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div className="flex items-center font-sans text-neutral-600">
                              <FiClock className="w-4 h-4 mr-1" />
                              <span>{pet.age} years</span>
                            </div>
                          </div>
                          <button className="w-full py-2 mt-3 font-sans text-sm font-medium rounded-lg text-primary-600 bg-primary-50 hover:bg-primary-100">
                            View Details
                          </button>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-neutral-900 font-display">Upcoming Appointments</h2>
                    <button
                      onClick={() => navigate('/pets-dashboard/appointments')}
                      className="font-sans font-medium text-primary-600 hover:text-primary-700"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {appointments.filter((appt) => appt.status === 'pending').length === 0 ? (
                      <p className="font-sans text-neutral-600">No upcoming appointments.</p>
                    ) : (
                      appointments
                        .filter((appt) => appt.status === 'pending')
                        .map((appointment, index) => (
                          <motion.div
                            key={appointment._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 border rounded-lg border-neutral-200 hover:shadow-md"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bold text-neutral-900 font-display">{appointment.reason || 'Checkup'}</h3>
                                <p className="font-sans text-sm text-neutral-600">{appointment.vet?.firstName} {appointment.vet?.lastName}</p>
                                <div className="flex items-center mt-1 font-sans text-sm text-neutral-600">
                                  <FiMapPin className="w-4 h-4 mr-1" />
                                  <span>{appointment.location || 'Clinic'}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-sans font-medium text-neutral-900">
                                  {new Date(appointment.appointmentTime).toLocaleDateString()}
                                </p>
                                <p className="font-sans text-sm text-neutral-600">
                                  {new Date(appointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            <div className="flex mt-4 space-x-2">
                              <button
                                onClick={() => handleConfirmAppointment(appointment._id)}
                                className="flex-1 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => navigate(`/pets-dashboard/appointments/${appointment._id}/reschedule`)}
                                className="flex-1 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                              >
                                Reschedule
                              </button>
                            </div>
                          </motion.div>
                        ))
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
                  <h2 className="mb-4 text-xl font-bold text-neutral-900 font-display">Health Alerts</h2>
                  <div className="space-y-3">
                    {healthAlerts.length === 0 ? (
                      <p className="font-sans text-neutral-600">No health alerts at this time.</p>
                    ) : (
                      healthAlerts.map((alert, index) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg border-l-4 ${
                            alert.priority === 'high'
                              ? 'bg-red-50 border-red-500'
                              : alert.priority === 'medium'
                              ? 'bg-amber-50 border-amber-500'
                              : 'bg-primary-50 border-primary-500'
                          }`}
                        >
                          <div className="flex items-start">
                            <div
                              className={`p-1 rounded-full ${
                                alert.priority === 'high'
                                  ? 'bg-red-100 text-red-600'
                                  : alert.priority === 'medium'
                                  ? 'bg-amber-100 text-amber-600'
                                  : 'bg-primary-100 text-primary-600'
                              }`}
                            >
                              <FaPaw className="w-4 h-4" />
                            </div>
                            <div className="ml-3">
                              <p className="font-sans text-sm font-medium text-neutral-900">{alert.type}</p>
                              <p className="font-sans text-xs text-neutral-600">{alert.message}</p>
                              <p className="mt-1 font-sans text-xs text-neutral-500">For: {alert.pet}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                  <button
                    onClick={() => navigate('/pets-dashboard/notifications')}
                    className="flex items-center justify-center w-full py-2 mt-4 font-sans text-sm font-medium rounded-lg text-primary-600 bg-primary-50 hover:bg-primary-100"
                  >
                    View All Alerts
                  </button>
                </div>

                <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
                  <h2 className="mb-4 text-xl font-bold text-neutral-900 font-display">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Book Appointment', icon: FiCalendar, path: '/pets-dashboard/book-appointment' },
                      { label: 'Shop Products', icon: FiShoppingCart, path: '/pets-dashboard/products' },
                      { label: 'Health Records', icon: FaPaw, path: '/pets-dashboard/health-records' },
                      { label: 'Care Tips', icon: FiBookOpen, path: '/pets-dashboard/care-tips' },
                    ].map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(action.path)}
                        className="flex flex-col items-center p-3 font-sans text-sm rounded-lg bg-neutral-50 hover:bg-neutral-100"
                      >
                        <div className="flex items-center justify-center w-8 h-8 mb-2 rounded-full bg-primary-100 text-primary-600">
                          <action.icon className="w-4 h-4" />
                        </div>
                        <span>{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
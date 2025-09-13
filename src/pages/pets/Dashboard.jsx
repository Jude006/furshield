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
  FiSearch,
  FiPlus,
  FiAlertCircle,
} from 'react-icons/fi';
import { FaPaw, FaDog, FaCat } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [healthAlerts, setHealthAlerts] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

        const [petsRes, appointmentsRes, cartRes] = await Promise.all([
          api.get('/api/pets'),
          api.get('/api/appointments'),
          api.get('/api/orders/cart'),
        ]);

        setPets(petsRes.data.data);
        setAppointments(appointmentsRes.data.data);
        setCart(cartRes.data.data);

        const alerts = petsRes.data.data.flatMap(pet => {
          const petAlerts = [];
          
          pet.vaccinations.forEach(vaccination => {
            if (vaccination.nextDue && new Date(vaccination.nextDue) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
              petAlerts.push({
                id: `${pet._id}-vax-${vaccination._id}`,
                type: 'Vaccination Due',
                message: `${vaccination.vaccine} vaccination due for ${pet.name}`,
                priority: 'high',
                pet: pet.name,
                date: vaccination.nextDue
              });
            }
          });

          pet.medicalHistory.forEach(record => {
            if (record.followUpRequired && record.followUpDate && new Date(record.followUpDate) <= new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)) {
              petAlerts.push({
                id: `${pet._id}-med-${record._id}`,
                type: 'Follow-up Required',
                message: `Follow-up needed for ${record.condition}`,
                priority: 'medium',
                pet: pet.name,
                date: record.followUpDate
              });
            }
          });

          return petAlerts;
        });

        setHealthAlerts(alerts);
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
      await api.put(`/api/appointments/${appointmentId}/status`, { status: 'confirmed' });
      setAppointments(prev => prev.map(appt => 
        appt._id === appointmentId ? { ...appt, status: 'confirmed' } : appt
      ));
      toast.success('Appointment confirmed successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to confirm appointment');
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await api.put(`/api/appointments/${appointmentId}/status`, { status: 'cancelled' });
      setAppointments(prev => prev.filter(appt => appt._id !== appointmentId));
      toast.success('Appointment cancelled successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to cancel appointment');
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
          <p className="text-neutral-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const quickStats = {
    totalPets: pets.length,
    upcomingAppointments: appointments.filter(appt => 
      ['scheduled', 'confirmed'].includes(appt.status) && 
      new Date(appt.date) >= new Date()
    ).length,
    healthAlerts: healthAlerts.length,
    cartItems: cart?.items?.length || 0,
  };

  const upcomingAppointments = appointments
    .filter(appt => 
      ['scheduled', 'confirmed'].includes(appt.status) && 
      new Date(appt.date) >= new Date() &&
      new Date(appt.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b shadow-sm border-neutral-200">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 font-display">
                Welcome back, {user ? `${user.firstName} ${user.lastName}` : 'Pet Owner'}!
              </h1>
              <p className="text-neutral-600">
                Here's what's happening with your pets today
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <FiSearch className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
            </form>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { 
              label: 'Total Pets', 
              value: quickStats.totalPets, 
              icon: FiHeart, 
              color: 'bg-primary-100 text-primary-600',
              onClick: () => navigate('/pets-dashboard/my-pets')
            },
            { 
              label: 'Upcoming Appointments', 
              value: quickStats.upcomingAppointments, 
              icon: FiCalendar, 
              color: 'bg-secondary-100 text-secondary-600',
              onClick: () => navigate('/pets-dashboard/appointments')
            },
            { 
              label: 'Health Alerts', 
              value: quickStats.healthAlerts, 
              icon: FiAlertCircle, 
              color: 'bg-amber-100 text-amber-600',
              onClick: () => navigate('/pets-dashboard/health-records')
            },
            { 
              label: 'Cart Items', 
              value: quickStats.cartItems, 
              icon: FiShoppingCart, 
              color: 'bg-emerald-100 text-emerald-600',
              onClick: () => navigate('/pets-dashboard/cart')
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              onClick={stat.onClick}
              className="p-6 transition-shadow bg-white border shadow-sm cursor-pointer rounded-xl border-neutral-200 hover:shadow-md"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900">My Pets</h2>
                <button
                  onClick={handleAddPet}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Pet
                </button>
              </div>

              {pets.length === 0 ? (
                <div className="py-8 text-center">
                  <FaPaw className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
                  <p className="mb-4 text-neutral-600">No pets added yet</p>
                  <button
                    onClick={handleAddPet}
                    className="px-6 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Add Your First Pet
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {pets.slice(0, 4).map((pet, index) => (
                    <motion.div
                      key={pet._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleViewPet(pet._id)}
                      className="p-4 transition-shadow border rounded-lg cursor-pointer border-neutral-200 hover:shadow-md"
                    >
                      <div className="flex items-center mb-3">
                        {pet.images && pet.images.length > 0 ? (
                          <img
                            src={`${API_BASE_URL}${pet.images[0].url}`}
                            alt={pet.name}
                            className="object-cover w-12 h-12 mr-3 rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/48x48?text=🐾';
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-12 h-12 mr-3 rounded-lg bg-primary-100">
                            {pet.species === 'dog' ? (
                              <FaDog className="w-6 h-6 text-primary-600" />
                            ) : (
                              <FaCat className="w-6 h-6 text-primary-600" />
                            )}
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-neutral-900">{pet.name}</h3>
                          <p className="text-sm text-neutral-600">{pet.breed}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center text-neutral-600">
                          <FiHeart className="w-3 h-3 mr-1" />
                          <span>{pet.weight || 'N/A'} kg</span>
                        </div>
                        <div className="flex items-center text-neutral-600">
                          <FiClock className="w-3 h-3 mr-1" />
                          <span>{pet.age} years</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900">Upcoming Appointments</h2>
                <button
                  onClick={() => navigate('/pets-dashboard/appointments')}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View All
                </button>
              </div>

              {upcomingAppointments.length === 0 ? (
                <div className="py-8 text-center">
                  <FiCalendar className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
                  <p className="mb-4 text-neutral-600">No upcoming appointments</p>
                  <button
                    onClick={() => navigate('/pets-dashboard/book-appointment')}
                    className="px-6 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Book Appointment
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg border-neutral-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-neutral-900">{appointment.reason}</h3>
                          <p className="text-sm text-neutral-600">
                            With Dr. {appointment.veterinarian?.firstName} {appointment.veterinarian?.lastName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-neutral-900">
                            {new Date(appointment.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {new Date(appointment.date).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleConfirmAppointment(appointment._id)}
                          className="flex-1 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment._id)}
                          className="flex-1 py-2 text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
              <h2 className="mb-6 text-xl font-bold text-neutral-900">Health Alerts</h2>
              
              {healthAlerts.length === 0 ? (
                <div className="py-8 text-center">
                  <FiBell className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
                  <p className="text-neutral-600">No health alerts at this time</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {healthAlerts.slice(0, 5).map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.priority === 'high'
                          ? 'bg-red-50 border-red-500'
                          : 'bg-amber-50 border-amber-500'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-1 rounded-full ${
                          alert.priority === 'high'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-amber-100 text-amber-600'
                        }`}>
                          <FiAlertCircle className="w-4 h-4" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-neutral-900">{alert.type}</p>
                          <p className="text-xs text-neutral-600">{alert.message}</p>
                          <p className="text-xs text-neutral-500">For: {alert.pet}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
              <h2 className="mb-6 text-xl font-bold text-neutral-900">Quick Actions</h2>
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
                    className="flex flex-col items-center p-3 text-sm transition-colors rounded-lg bg-neutral-50 hover:bg-neutral-100"
                  >
                    <div className="flex items-center justify-center w-8 h-8 mb-2 rounded-full bg-primary-100 text-primary-600">
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiHeart } from 'react-icons/fi';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pet: '',
    veterinarian: '',
    date: '',
    time: '',
    reason: '',
    symptoms: ''
  });
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // Generate time slots (9 AM to 5 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to book an appointment');
        navigate('/login');
        return;
      }

      const [petsRes, vetsRes] = await Promise.all([
        api.get('/api/pets'),
        api.get('/api/users/veterinarians'),
      ]);

      setPets(petsRes.data.data);
      setVets(vetsRes.data.data);
      
      if (vetsRes.data.data.length === 0) {
        toast.info('No veterinarians are currently available');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.error || 'Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.veterinarian) {
      toast.error('Please select a veterinarian');
      return;
    }

    if (!formData.pet) {
      toast.error('Please select a pet');
      return;
    }

    setSubmitting(true);

    try {
      const appointmentData = {
        pet: formData.pet,
        veterinarian: formData.veterinarian,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        symptoms: formData.symptoms.split(',').map(s => s.trim()).filter(s => s)
      };

      await api.post('/api/appointments', appointmentData);
      toast.success('Appointment booked successfully!');
      navigate('/pets-dashboard/appointments');
    } catch (err) {
      console.error('Booking error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.error || 'Failed to book appointment');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
          <p className="text-neutral-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm border-neutral-200">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/pets-dashboard/appointments')}
              className="flex items-center transition-colors text-neutral-600 hover:text-neutral-800"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Appointments
            </button>
            
            <h1 className="flex items-center text-2xl font-bold text-neutral-900 font-display">
              <FiHeart className="w-6 h-6 mr-2 text-primary-600" />
              Book Appointment
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
            {vets.length === 0 ? (
              <div className="py-8 text-center">
                <FiUser className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">No Veterinarians Available</h3>
                <p className="mb-4 text-neutral-600">
                  There are currently no veterinarians available for appointments. 
                  Please check back later or contact support.
                </p>
                <button
                  onClick={() => navigate('/pets-dashboard')}
                  className="px-6 py-2 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pet Selection */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    <FiHeart className="inline w-4 h-4 mr-1" />
                    Select Pet
                  </label>
                  <select
                    name="pet"
                    value={formData.pet}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Choose your pet</option>
                    {pets.map((pet) => (
                      <option key={pet._id} value={pet._id}>
                        {pet.name} - {pet.breed} ({pet.species})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Veterinarian Selection */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    <FiUser className="inline w-4 h-4 mr-1" />
                    Select Veterinarian
                  </label>
                  <select
                    name="veterinarian"
                    value={formData.veterinarian}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Choose a veterinarian</option>
                    {vets.map((vet) => (
                      <option key={vet._id} value={vet._id}>
                        Dr. {vet.firstName} {vet.lastName} 
                        {vet.specialization && ` - ${vet.specialization}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">
                      <FiCalendar className="inline w-4 h-4 mr-1" />
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">
                      <FiClock className="inline w-4 h-4 mr-1" />
                      Appointment Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reason and Symptoms */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    Reason for Appointment
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    placeholder="Please describe the reason for this appointment..."
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">
                    Symptoms (comma separated)
                  </label>
                  <input
                    type="text"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    placeholder="e.g., fever, coughing, loss of appetite"
                    className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4 space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/pets-dashboard/appointments')}
                    className="px-6 py-3 transition-colors rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center px-6 py-3 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiCalendar className="w-4 h-4 mr-2" />
                    {submitting ? 'Booking...' : 'Book Appointment'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookAppointment;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiTrash2, FiPlus, FiHeart, FiClock } from 'react-icons/fi';
import { FaDog, FaCat, FaPaw } from 'react-icons/fa';

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view pets');
          navigate('/login');
          return;
        }
        const petsRes = await api.get('/api/pets');
        setPets(petsRes.data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load pets');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [navigate]);

  const handleDeletePet = async (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await api.delete(`/api/pets/${petId}`);
        setPets(pets.filter(pet => pet._id !== petId));
        toast.success('Pet deleted successfully');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to delete pet');
      }
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 font-display">Manage Pets</h2>
                <button
                  onClick={() => navigate('/pets-dashboard/add-pet')}
                  className="flex items-center px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Pet
                </button>
              </div>
              {pets.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FaPaw className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No pets added yet.</p>
                  <button
                    onClick={() => navigate('/pets-dashboard/add-pet')}
                    className="px-6 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Add Your First Pet
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pets.map((pet, index) => (
                    <motion.div
                      key={pet._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white border shadow-sm rounded-xl border-neutral-200"
                    >
                      <div className="flex items-center mb-3">
                        {pet.images.length > 0 ? (
                          <img
                            src={`${API_BASE_URL}${pet.images[0].url}`}
                            alt={pet.name}
                            className="object-cover w-12 h-12 mr-3 rounded-lg"
                          />
                        ) : pet.species === 'dog' ? (
                          <FaDog className="w-6 h-6 mr-3 text-primary-600" />
                        ) : (
                          <FaCat className="w-6 h-6 mr-3 text-primary-600" />
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
                          <FiClock className="w-4 h-4 mr-1" />
                          <span>{pet.age} years</span>
                        </div>
                      </div>
                      <div className="flex mt-4 space-x-2">
                        <button
                          onClick={() => navigate(`/pets-dashboard/pet/${pet._id}`)}
                          className="flex-1 py-2 font-sans text-sm font-medium rounded-lg text-primary-600 bg-primary-50 hover:bg-primary-100"
                        >
                          View/Edit
                        </button>
                        <button
                          onClick={() => handleDeletePet(pet._id)}
                          className="flex-1 py-2 font-sans text-sm font-medium text-red-600 rounded-lg bg-red-50 hover:bg-red-100"
                        >
                          <FiTrash2 className="inline w-4 h-4 mr-1" />
                          Delete
                        </button>
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

export default MyPets;
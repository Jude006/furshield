import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiHeart } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

const Adopters = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const api = axios.create({
          baseURL: API_BASE_URL,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const response = await api.get('/api/shelter/pets');
        console.log('Fetched pets:', response.data);
        setPets(response.data.data || []);
      } catch (error) {
        console.error('Fetch pets error:', error.response?.data || error);
        toast.error('Failed to load pets: ' + (error.response?.data?.error || error.message));
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [navigate]);

  const handleDelete = async (petId) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      const api = axios.create({
        baseURL: API_BASE_URL,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      await api.delete(`/api/shelter/pets/${petId}`);
      setPets(pets.filter((pet) => pet._id !== petId));
      toast.success('Pet deleted successfully');
    } catch (error) {
      console.error('Delete pet error:', error.response?.data || error);
      toast.error('Failed to delete pet: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 font-display">Adoptable Pets</h1>
          <p className="text-neutral-600">Manage your shelter's adoptable pets</p>
        </div>
        <Link
          to="/animalShelter-dashboard/add-pet"
          className="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          <FiHeart className="w-5 h-5 mr-2" />
          Add New Pet
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border shadow-sm rounded-xl border-neutral-200"
      >
        {pets.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-neutral-500">No pets available. Add a pet to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <motion.div
                key={pet._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white border rounded-lg border-neutral-200"
              >
                <img
                  src={pet.images[0] || '/images/pet-placeholder.jpg'}
                  alt={pet.name}
                  className="object-cover w-full h-48 rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-neutral-800">{pet.name}</h3>
                  <p className="text-sm text-neutral-600">{pet.species} - {pet.breed}</p>
                  <p className="text-sm text-neutral-500">Status: {pet.status}</p>
                  <div className="flex mt-4 space-x-2">
                    <Link
                      to={`/animalShelter-dashboard/edit-pet/${pet._id}`}
                      className="flex items-center px-3 py-2 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50"
                    >
                      <FiEdit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(pet._id)}
                      className="flex items-center px-3 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                    >
                      <FiTrash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Adopters;
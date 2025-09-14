import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash, FiEye } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/shelter/pets', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setPets(response.data.data);
      } catch (error) {
        toast.error('Failed to load pets');
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await axios.delete(`/api/shelter/pets/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setPets(pets.filter(pet => pet._id !== id));
        toast.success('Pet deleted successfully');
      } catch (error) {
        toast.error('Failed to delete pet');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">My Pets</h1>
          <Link to="/animalShelter-dashboard/add-pet" className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600">
            Add New Pet
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <div key={pet._id} className="p-4 border rounded-lg border-neutral-200">
              <img src={pet.images[0]} alt={pet.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="font-medium text-neutral-800">{pet.name}</h3>
              <p className="text-sm text-neutral-600">{pet.species} - {pet.breed}</p>
              <p className="text-sm text-neutral-600">Status: {pet.status}</p>
              <div className="flex space-x-2 mt-4">
                <Link to={`/animalShelter-dashboard/pets/${pet._id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <FiEdit />
                </Link>
                <button onClick={() => handleDelete(pet._id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <FiTrash />
                </button>
                <Link to={`/animalShelter-dashboard/pets/${pet._id}/care`} className="p-2 text-green-600 hover:bg-green-50 rounded">
                  <FiEye />
                </Link>
              </div>
            </div>
          ))}
        </div>
        {pets.length === 0 && <p className="text-center text-neutral-600">No pets added yet</p>}
      </motion.div>
    </div>
  );
};

export default PetList;
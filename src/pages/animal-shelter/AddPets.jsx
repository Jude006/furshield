import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCamera, FiSave, FiX } from 'react-icons/fi';
import { FaDog, FaCat, FaPaw } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

const AddPets = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    description: '',
    status: 'available',
    location: '',
    medicalHistory: '',
    specialNeeds: '',
    color: '',
    weight: '',
    tags: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files.slice(0, 5 - images.length)]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation
    if (!formData.name.trim()) {
      toast.error('Pet name is required');
      setLoading(false);
      return;
    }
    if (!formData.species) {
      toast.error('Species is required');
      setLoading(false);
      return;
    }
    if (!formData.breed.trim()) {
      toast.error('Breed is required');
      setLoading(false);
      return;
    }
    if (!formData.age || formData.age <= 0) {
      toast.error('Valid age is required');
      setLoading(false);
      return;
    }
    if (!formData.gender) {
      toast.error('Gender is required');
      setLoading(false);
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      setLoading(false);
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Location is required');
      setLoading(false);
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    images.forEach((image) => {
      form.append('images', image);
    });

    try {
      const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Submitting new pet:', Object.fromEntries(form));
      const response = await api.post('/api/shelter/pets', form);
      console.log('Add pet response:', response.data);
      toast.success('Pet added successfully');
      navigate('/animalShelter-dashboard/adoptable-pets');
    } catch (error) {
      console.error('Add pet error:', error.response?.data || error.message);
      toast.error('Failed to add pet: ' + (error.response?.data?.error || error.message));
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/auth/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => navigate('/animalShelter-dashboard/adoptable-pets')}
              className="p-2 mr-4 rounded-lg hover:bg-neutral-100"
            >
              <FiArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 font-display">Add New Pet</h1>
              <p className="mt-2 text-neutral-600">Add pet details for adoption</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white shadow-sm rounded-xl"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-xl font-semibold text-neutral-900 font-display">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">Pet Name *</label>
                  <input
                    type="text"
                    name="name"
                     value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter pet name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">Species *</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, species: 'dog' })}
                      className={`p-4 border-2 rounded-lg text-center ${
                        formData.species === 'dog' ? 'border-green-500 bg-green-50' : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <FaDog className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <span className="font-semibold">Dog</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, species: 'cat' })}
                      className={`p-4 border-2 rounded-lg text-center ${
                        formData.species === 'cat' ? 'border-green-500 bg-green-50' : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <FaCat className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <span className="font-semibold">Cat</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, species: 'other' })}
                      className={`p-4 border-2 rounded-lg text-center ${
                        formData.species === 'other' ? 'border-green-500 bg-green-50' : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <FaPaw className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <span className="font-semibold">Other</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">Breed *</label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter breed"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Age *</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Golden"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 25"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-xl font-semibold text-neutral-900 font-display">Media & Details</h2>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-neutral-700">Pet Photos (Max 5)</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="object-cover w-full h-24 rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label className="flex flex-col items-center justify-center border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer hover:border-neutral-400">
                      <FiCamera className="w-6 h-6 mb-2 text-neutral-400" />
                      <span className="text-sm text-neutral-600">Add Photo</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe the pet's personality, habits, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Shelter location"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., friendly, energetic"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-neutral-200 lg:col-span-2">
              <h2 className="mb-4 text-xl font-semibold text-neutral-900 font-display">Health Information</h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">Medical History</label>
                  <textarea
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Vaccinations, treatments, etc."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-neutral-700">Special Needs</label>
                  <textarea
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any special care requirements"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 mt-8 space-x-4 border-t border-neutral-200 lg:col-span-2">
              <button
                type="button"
                onClick={() => navigate('/animalShelter-dashboard/adoptable-pets')}
                className="px-6 py-3 font-semibold text-neutral-700 border border-neutral-300 rounded-lg hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <FiSave className="mr-2" />
                {loading ? 'Adding...' : 'Add Pet'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPets;
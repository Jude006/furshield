import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUpload, 
  FiX,
  FiSave,
  FiArrowLeft,
  FiCamera,
  FiInfo
} from 'react-icons/fi';
import { FaDog, FaCat, FaPaw } from 'react-icons/fa';

const AddPetForAdoption = () => {
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
    specialNeeds: ''
  });

  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files.slice(0, 5 - images.length)]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button className="p-2 mr-4 rounded-lg hover:bg-gray-100">
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add Pet for Adoption</h1>
              <p className="mt-2 text-gray-600">Add a new pet to your adoption listings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white shadow-sm rounded-xl"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column - Basic Info */}
            <div>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter pet name"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Species *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, species: 'dog'})}
                      className={`p-4 border-2 rounded-lg text-center ${
                        formData.species === 'dog' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <FaDog className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <span className="font-semibold">Dog</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, species: 'cat'})}
                      className={`p-4 border-2 rounded-lg text-center ${
                        formData.species === 'cat' 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <FaCat className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                      <span className="font-semibold">Cat</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Breed *
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter breed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Age *
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 2 years"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Media & Additional Info */}
            <div>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Media & Details</h2>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Pet Photos (Max 5)
                </label>
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
                    <label className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400">
                      <FiCamera className="w-6 h-6 mb-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Add Photo</span>
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

              {/* Additional Info */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the pet's personality, habits, etc."
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Shelter location"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Medical & Special Needs */}
          <div className="pt-6 mt-8 border-t border-gray-200">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Health Information</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Vaccinations, treatments, etc."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Special Needs
                </label>
                <textarea
                  name="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special care requirements"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 mt-8 space-x-4 border-t border-gray-200">
            <button className="px-6 py-3 font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button className="flex items-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <FiSave className="mr-2" />
              Add Pet
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPetForAdoption;
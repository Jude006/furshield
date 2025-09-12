import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiPlus, 
  FiFilter, 
  FiHeart,
  FiMapPin,
  FiCalendar,
  FiArrowRight,
  FiTag
} from 'react-icons/fi';
import { FaDog, FaCat, FaPaw } from 'react-icons/fa';

const AdoptablePets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    species: '',
    breed: '',
    age: '',
    gender: '',
    status: 'available'
  });

  // Sample data for demonstration
  const pets = [
    {
      id: 1,
      name: 'Buddy',
      species: 'dog',
      breed: 'Golden Retriever',
      age: '2 years',
      gender: 'male',
      status: 'available',
      location: 'New York Shelter',
      image: '/api/placeholder/300/200',
      description: 'Friendly and energetic golden retriever looking for a forever home.'
    },
    {
      id: 2,
      name: 'Luna',
      species: 'cat',
      breed: 'Siamese',
      age: '1 year',
      gender: 'female',
      status: 'available',
      location: 'Los Angeles Shelter',
      image: '/api/placeholder/300/200',
      description: 'Gentle siamese cat who loves cuddles and quiet environments.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Adoptable Pets</h1>
              <p className="mt-2 text-gray-600">Manage and showcase pets available for adoption</p>
            </div>
            <button className="flex items-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <FiPlus className="mr-2" />
              Add New Pet
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search pets by name, breed, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-3 font-semibold bg-gray-100 rounded-lg hover:bg-gray-200">
              <FiFilter className="mr-2" />
              Filters
            </button>
          </div>

          {/* Filter options */}
          <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">All Species</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="other">Other</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">All Breeds</option>
              <option value="retriever">Golden Retriever</option>
              <option value="siamese">Siamese</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Any Age</option>
              <option value="puppy">Puppy/Kitten</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Any Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md"
            >
              <div className="relative">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="object-cover w-full h-48"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    pet.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {pet.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                  {pet.species === 'dog' ? (
                    <FaDog className="w-6 h-6 text-blue-600" />
                  ) : (
                    <FaCat className="w-6 h-6 text-orange-600" />
                  )}
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FiTag className="w-4 h-4 mr-2" />
                    <span>{pet.breed}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    <span>{pet.age} • {pet.gender}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    <span>{pet.location}</span>
                  </div>
                </div>

                <p className="mb-4 text-sm text-gray-600">{pet.description}</p>

                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    View Details
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <FiHeart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {pets.length === 0 && (
          <div className="py-12 text-center">
            <FaPaw className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No pets available</h3>
            <p className="mb-4 text-gray-600">There are currently no pets available for adoption.</p>
            <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Add First Pet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptablePets;
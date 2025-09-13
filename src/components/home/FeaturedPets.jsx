import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiX, FiMapPin, FiClock, FiUser, FiInfo, FiFilter } from 'react-icons/fi';
import petsData from '../../data/pets.json';

const FeaturedPets = () => {
  const [filters, setFilters] = useState({
    species: '',
    breed: '',
    age: '',
    location: '',
    size: '',
    gender: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
 
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setAllPets(petsData);
      setLoading(false);
    };
    fetchPets();
  }, []);

  const filterOptions = useMemo(() => {
    const species = [...new Set(petsData.map(pet => pet.species))];
    const breeds = [...new Set(petsData.map(pet => pet.breed))];
    const locations = [...new Set(petsData.map(pet => pet.location))];
    return { species, breeds, locations };
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      species: '',
      breed: '',
      age: '',
      location: '',
      size: '',
      gender: ''
    });
    setSearchQuery('');
  };

  const filteredPets = useMemo(() => {
    return allPets.filter(pet => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          pet.name.toLowerCase().includes(query) ||
          pet.breed.toLowerCase().includes(query) ||
          pet.species.toLowerCase().includes(query) ||
          pet.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        if (key === 'age') return pet.ageCategory === value;
        return pet[key].toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [allPets, filters, searchQuery]);

  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchQuery;

  const viewPetDetails = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPet(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  if (loading) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-primary-500 border-t-transparent animate-spin"></div>
              <p className="text-neutral-600">Loading adorable pets...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl font-display">
            Find Your Perfect <span className="text-primary-600">Companion</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-neutral-600 md:text-xl">
            Browse adorable pets waiting for their forever homes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 mb-6 bg-white border shadow-sm rounded-2xl border-neutral-200"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search pets by name, breed, or location..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 font-medium text-primary-600 border border-primary-500 rounded-lg hover:bg-primary-50"
              >
                Clear All
              </button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-neutral-200"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Species</label>
                    <select
                      value={filters.species}
                      onChange={(e) => handleFilterChange('species', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Species</option>
                      {filterOptions.species.map(species => (
                        <option key={species} value={species}>{species}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Breed</label>
                    <select
                      value={filters.breed}
                      onChange={(e) => handleFilterChange('breed', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Breeds</option>
                      {filterOptions.breeds.map(breed => (
                        <option key={breed} value={breed}>{breed}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Age</label>
                    <select
                      value={filters.age}
                      onChange={(e) => handleFilterChange('age', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Ages</option>
                      <option value="puppy">Puppy/Kitten (0-1)</option>
                      <option value="young">Young (1-3)</option>
                      <option value="adult">Adult (3-7)</option>
                      <option value="senior">Senior (7+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Size</label>
                    <select
                      value={filters.size}
                      onChange={(e) => handleFilterChange('size', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Sizes</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Gender</label>
                    <select
                      value={filters.gender}
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Genders</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Location</label>
                    <select
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Locations</option>
                      {filterOptions.locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-neutral-600">
                {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'} found
              </span>
            </div>
          )}
        </motion.div>

        {filteredPets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 text-center bg-white border rounded-2xl border-neutral-200"
          >
            <div className="w-20 h-20 mx-auto mb-6 text-neutral-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.87-6.09 2.29M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-neutral-900">
              {hasActiveFilters ? 'No pets found matching your criteria' : 'No pets available'}
            </h3>
            <p className="mb-6 text-neutral-600">
              {hasActiveFilters ? 'Try adjusting your filters or search terms' : 'Check back later for new pets'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 font-medium transition-colors duration-300 border rounded-lg text-primary-600 border-primary-500 hover:bg-primary-50"
              >
                Show All Pets
              </button>
            )}
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredPets.map((pet) => (
                <motion.div
                  key={pet.id}
                  variants={itemVariants}
                  className="overflow-hidden transition-all duration-300 bg-white border shadow-sm rounded-2xl border-neutral-200 hover:shadow-xl group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                     
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-primary-500">
                        {pet.species}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-neutral-900 font-display">
                      {pet.name}
                    </h3>
                    <div className="space-y-2 text-sm text-neutral-600">
                      <p className="flex items-center">
                        <FiUser className="mr-2" />
                        Breed: {pet.breed}
                      </p>
                      <p className="flex items-center">
                        <FiClock className="mr-2" />
                        Age: {pet.age} years
                      </p>
                      <p className="flex items-center">
                        <FiInfo className="mr-2" />
                        Size: {pet.size}
                      </p>
                      <p className="flex items-center">
                        <FiMapPin className="mr-2" />
                        Location: {pet.location}
                      </p>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => viewPetDetails(pet)}
                        className="w-full px-4 py-3 font-medium text-center text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <p className="text-neutral-600">
                Showing {filteredPets.length} of {allPets.length} pets
                {hasActiveFilters && ' matching your criteria'}
              </p>
              <Link
                to="/auth/register"
                className="inline-flex items-center mt-4 px-8 py-4 font-semibold text-white transition-colors duration-300 rounded-lg shadow-md bg-secondary-500 hover:bg-secondary-600 hover:shadow-lg"
              >
                Sign Up to Adopt
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </>
        )}

        <AnimatePresence>
          {showModal && selectedPet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={closeModal}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <FiX size={20} className="text-neutral-600" />
                </button>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src={selectedPet.image}
                      alt={selectedPet.name}
                      className="object-cover w-full h-64 md:h-full"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300';
                      }}
                    />
                  </div>
                  <div className="p-6 md:w-1/2">
                    <div className="mb-4">
                      <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-primary-500">
                        {selectedPet.species}
                      </span>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-neutral-900 font-display">{selectedPet.name}</h2>
                    <div className="space-y-3 text-sm text-neutral-600">
                      <p className="flex items-center">
                        <FiUser className="mr-2" />
                        <span className="font-medium">Breed:</span> {selectedPet.breed}
                      </p>
                      <p className="flex items-center">
                        <FiClock className="mr-2" />
                        <span className="font-medium">Age:</span> {selectedPet.age} years ({selectedPet.ageCategory})
                      </p>
                      <p className="flex items-center">
                        <FiInfo className="mr-2" />
                        <span className="font-medium">Size:</span> {selectedPet.size}
                      </p>
                      <p className="flex items-center">
                        <FiInfo className="mr-2" />
                        <span className="font-medium">Gender:</span> {selectedPet.gender}
                      </p>
                      <p className="flex items-center">
                        <FiMapPin className="mr-2" />
                        <span className="font-medium">Location:</span> {selectedPet.location}
                      </p>
                    </div>
                    <div className="mt-6">
                      <h3 className="mb-2 text-lg font-semibold text-neutral-900">About {selectedPet.name}</h3>
                      <p className="text-sm text-neutral-600">{selectedPet.description || 'No description available.'}</p>
                    </div>
                    <div className="mt-6">
                      <Link
                        to="/auth/register"
                        className="w-full px-4 py-3 font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-center"
                      >
                        Contact Shelter
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedPets;
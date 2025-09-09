import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedPets = () => {
  const [filters, setFilters] = useState({
    species: '',
    breed: '',
    age: '',
    location: '',
    size: '',
    gender: ''
  });

  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch - Replace with actual API call later
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPets = [
        {
          id: 1,
          name: "Buddy",
          species: "Dog",
          breed: "Golden Retriever",
          age: "2",
          ageCategory: "young",
          location: "New York, NY",
          image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300",
          gender: "Male",
          size: "Large"
        },
        {
          id: 2,
          name: "Luna",
          species: "Cat",
          breed: "Siamese",
          age: "1",
          ageCategory: "young",
          location: "Los Angeles, CA",
          image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300",
          gender: "Female",
          size: "Small"
        },
        {
          id: 3,
          name: "Charlie",
          species: "Dog",
          breed: "Beagle",
          age: "3",
          ageCategory: "young",
          location: "Chicago, IL",
          image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=300",
          gender: "Male",
          size: "Medium"
        },
        {
          id: 4,
          name: "Daisy",
          species: "Bird",
          breed: "Parakeet",
          age: "0.5",
          ageCategory: "puppy",
          location: "Miami, FL",
          image: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&q=80&w=300",
          gender: "Female",
          size: "Small"
        },
        {
          id: 5,
          name: "Max",
          species: "Dog",
          breed: "Labrador",
          age: "5",
          ageCategory: "adult",
          location: "Austin, TX",
          image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300",
          gender: "Male",
          size: "Large"
        },
        {
          id: 6,
          name: "Bella",
          species: "Cat",
          breed: "Maine Coon",
          age: "4",
          ageCategory: "adult",
          location: "Seattle, WA",
          image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=300",
          gender: "Female",
          size: "Medium"
        },
        {
          id: 7,
          name: "Rocky",
          species: "Dog",
          breed: "Bulldog",
          age: "8",
          ageCategory: "senior",
          location: "Boston, MA",
          image: "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&fit=crop&q=80&w=300",
          gender: "Male",
          size: "Medium"
        },
        {
          id: 8,
          name: "Coco",
          species: "Rabbit",
          breed: "Holland Lop",
          age: "2",
          ageCategory: "young",
          location: "Denver, CO",
          image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=300",
          gender: "Female",
          size: "Small"
        }
      ];
      
      setAllPets(mockPets);
      setLoading(false);
    };

    fetchPets();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
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
  };

  const filteredPets = allPets.filter(pet => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      
      if (key === 'age') {
        return pet.ageCategory === value;
      }
      
      return pet[key].toLowerCase().includes(value.toLowerCase());
    });
  });

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
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
        {/* Section Header */}
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

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 mb-8 bg-white border shadow-sm rounded-2xl border-neutral-200"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <select
              value={filters.species}
              onChange={(e) => handleFilterChange('species', e.target.value)}
              className="px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Species</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
              <option value="Bird">Birds</option>
              <option value="Rabbit">Rabbits</option>
            </select>

            <select
              value={filters.breed}
              onChange={(e) => handleFilterChange('breed', e.target.value)}
              className="px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Breeds</option>
              <option value="Golden Retriever">Golden Retriever</option>
              <option value="Siamese">Siamese</option>
              <option value="Beagle">Beagle</option>
              <option value="Parakeet">Parakeet</option>
              <option value="Labrador">Labrador</option>
              <option value="Maine Coon">Maine Coon</option>
              <option value="Bulldog">Bulldog</option>
              <option value="Holland Lop">Holland Lop</option>
            </select>

            <select
              value={filters.age}
              onChange={(e) => handleFilterChange('age', e.target.value)}
              className="px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Age</option>
              <option value="puppy">Puppy/Kitten (0-1)</option>
              <option value="young">Young (1-3)</option>
              <option value="adult">Adult (3-7)</option>
              <option value="senior">Senior (7+)</option>
            </select>

            <select
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
              className="px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>

            <select
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              type="text"
              placeholder="Location or Zipcode"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-neutral-600">
                {filteredPets.length} pets found
              </span>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Pets Grid or Empty State */}
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
              No pets found matching your criteria
            </h3>
            <p className="mb-6 text-neutral-600">
              Try adjusting your filters or browse all available pets
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 font-medium transition-colors duration-300 border rounded-lg text-primary-600 border-primary-500 hover:bg-primary-50"
            >
              Show All Pets
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {filteredPets.map((pet) => (
                <motion.div
                  key={pet.id}
                  variants={itemVariants}
                  className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl group"
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
                      <p>Breed: {pet.breed}</p>
                      <p>Age: {pet.age} years</p>
                      <p>Size: {pet.size}</p>
                      <p>Location: {pet.location}</p>
                    </div>

                    <div className="mt-6">
                      <Link
                        to="/auth/register"
                        className="block w-full px-4 py-3 font-medium text-center text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <p className="mb-6 text-lg text-neutral-600">
                Found a pet you love? Sign up to see more details and start the adoption process
              </p>
              <Link
                to="/auth/register"
                className="inline-flex items-center px-8 py-4 font-semibold text-white transition-colors duration-300 rounded-lg shadow-md bg-secondary-500 hover:bg-secondary-600 hover:shadow-lg"
              >
                Sign Up to Adopt
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedPets;
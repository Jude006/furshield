import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiEdit,
  FiHeart,
  FiShare2,
  FiMapPin,
  FiCalendar,
  FiTag,
  FiUsers,
  FiArrowLeft,
  FiMail,
  FiPhone
} from 'react-icons/fi';
import { FaDog, FaCat, FaPaw, FaSyringe, FaNotesMedical } from 'react-icons/fa';

const ShelterPetProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample pet data
  const pet = {
    id: 1,
    name: 'Buddy',
    species: 'dog',
    breed: 'Golden Retriever',
    age: '2 years',
    gender: 'male',
    status: 'available',
    location: 'New York Shelter',
    description: 'Friendly and energetic golden retriever looking for a forever home. Buddy loves playing fetch and going for long walks. He gets along well with children and other dogs.',
    images: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    medicalHistory: [
      { date: '2024-01-15', procedure: 'Vaccination', details: 'Rabies vaccine' },
      { date: '2024-01-10', procedure: 'Checkup', details: 'Routine health check' }
    ],
    temperament: ['Friendly', 'Energetic', 'Playful', 'Good with kids'],
    requirements: ['Regular exercise', 'Large living space', 'Family environment']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button className="p-2 mr-4 rounded-lg hover:bg-gray-100">
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Pet Profile</h1>
              <p className="mt-2 text-gray-600">Manage and view pet details</p>
            </div>
            <div className="flex space-x-3">
              <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200">
                <FiEdit className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200">
                <FiShare2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden bg-white shadow-sm rounded-xl"
        >
          {/* Hero Section */}
          <div className="relative">
            <img
              src={pet.images[0]}
              alt={pet.name}
              className="object-cover w-full h-64"
            />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                pet.status === 'available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {pet.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Left Column - Pet Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{pet.name}</h2>
                    <div className="flex items-center mt-2 text-gray-600">
                      {pet.species === 'dog' ? (
                        <FaDog className="w-5 h-5 mr-2 text-blue-600" />
                      ) : (
                        <FaCat className="w-5 h-5 mr-2 text-orange-600" />
                      )}
                      <span>{pet.breed}</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Adopt Me
                  </button>
                </div>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <FiCalendar className="w-5 h-5 mr-3 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Age</p>
                      <p className="font-semibold">{pet.age}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <FiTag className="w-5 h-5 mr-3 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-semibold capitalize">{pet.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <FiMapPin className="w-5 h-5 mr-3 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">{pet.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <FaPaw className="w-5 h-5 mr-3 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Species</p>
                      <p className="font-semibold capitalize">{pet.species}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">About {pet.name}</h3>
                  <p className="leading-relaxed text-gray-600">{pet.description}</p>
                </div>

                {/* Additional Images */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Gallery</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {pet.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${pet.name} ${index + 2}`}
                        className="object-cover w-full h-24 rounded-lg cursor-pointer hover:opacity-80"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Adoption Info */}
              <div className="w-full lg:w-80">
                <div className="p-6 mb-6 rounded-lg bg-blue-50">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Adoption Process</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-blue-600 rounded-full">
                        1
                      </div>
                      <span className="text-sm">Submit application</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-blue-600 rounded-full">
                        2
                      </div>
                      <span className="text-sm">Meet & greet</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-blue-600 rounded-full">
                        3
                      </div>
                      <span className="text-sm">Home visit</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-blue-600 rounded-full">
                        4
                      </div>
                      <span className="text-sm">Adoption finalization</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Shelter</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <FiMail className="w-4 h-4 mr-2" />
                      <span>shelter@example.com</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiPhone className="w-4 h-4 mr-2" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      <span>123 Shelter St, New York</span>
                    </div>
                  </div>
                  <button className="w-full py-3 mt-4 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Contact About Adoption
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="pt-6 mt-8 border-t border-gray-200">
              <div className="flex mb-6 space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 font-semibold ${
                    activeTab === 'overview'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('medical')}
                  className={`pb-2 font-semibold ${
                    activeTab === 'medical'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Medical History
                </button>
                <button
                  onClick={() => setActiveTab('temperament')}
                  className={`pb-2 font-semibold ${
                    activeTab === 'temperament'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Temperament
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">Requirements</h4>
                    <ul className="space-y-2">
                      {pet.requirements.map((req, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 mr-3 bg-blue-600 rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-semibold text-gray-900">Ideal Home</h4>
                    <p className="text-gray-600">
                      {pet.name} would thrive in a home with plenty of space to play and a family that enjoys outdoor activities. He would do best with experienced pet owners who can provide consistent training and plenty of attention.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'medical' && (
                <div>
                  <div className="flex items-center mb-4">
                    <FaSyringe className="w-5 h-5 mr-2 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Medical Records</h4>
                  </div>
                  <div className="space-y-3">
                    {pet.medicalHistory.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-semibold">{record.procedure}</p>
                          <p className="text-sm text-gray-600">{record.details}</p>
                        </div>
                        <span className="text-sm text-gray-500">{record.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'temperament' && (
                <div>
                  <div className="flex items-center mb-4">
                    <FaNotesMedical className="w-5 h-5 mr-2 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Behavior & Personality</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pet.temperament.map((trait, index) => (
                      <span key={index} className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    {pet.name} is a very social and affectionate dog. He loves meeting new people and gets along well with other dogs. He's house-trained and knows basic commands like sit, stay, and come. He can be energetic but responds well to positive reinforcement training.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShelterPetProfile;
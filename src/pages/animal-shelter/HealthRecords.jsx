import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter,
  FiCalendar,
  FiPlus,
  FiDownload,
  FiEye,
  FiEdit,
  FiAlertTriangle,
  FiCheckCircle
} from 'react-icons/fi';
import { FaDog, FaCat, FaSyringe, FaNotesMedical } from 'react-icons/fa';

const HealthRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPet, setSelectedPet] = useState(null);

  const pets = [
    {
      id: 1,
      name: 'Buddy',
      species: 'dog',
      breed: 'Golden Retriever',
      age: '2 years',
      healthStatus: 'healthy',
      lastCheckup: '2024-01-10',
      nextVaccination: '2024-04-15',
      medicalHistory: [
        { date: '2024-01-10', type: 'Vaccination', description: 'Rabies vaccine', vet: 'Dr. Smith' },
        { date: '2023-12-15', type: 'Checkup', description: 'Annual physical exam', vet: 'Dr. Johnson' },
        { date: '2023-11-20', type: 'Treatment', description: 'Deworming treatment', vet: 'Dr. Williams' }
      ]
    },
    {
      id: 2,
      name: 'Luna',
      species: 'cat',
      breed: 'Siamese',
      age: '1 year',
      healthStatus: 'needs_attention',
      lastCheckup: '2023-12-20',
      nextVaccination: '2024-03-10',
      medicalHistory: [
        { date: '2023-12-20', type: 'Vaccination', description: 'FVRCP vaccine', vet: 'Dr. Brown' },
        { date: '2023-11-05', type: 'Treatment', description: 'Flea treatment', vet: 'Dr. Davis' }
      ]
    }
  ];

  const statusColors = {
    healthy: 'bg-green-100 text-green-800',
    needs_attention: 'bg-amber-100 text-amber-800',
    critical: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    healthy: FiCheckCircle,
    needs_attention: FiAlertTriangle,
    critical: FiAlertTriangle
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm border-neutral-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 font-display">Health Records</h1>
              <p className="mt-2 text-neutral-600">Manage pet medical records and health status</p>
            </div>
            <button className="flex items-center px-6 py-3 font-semibold text-white rounded-lg bg-primary-600 hover:bg-primary-700">
              <FiPlus className="mr-2" />
              New Record
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <FiSearch className="absolute transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search pets or medical records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="needs_attention">Needs Attention</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet, index) => {
            const StatusIcon = statusIcons[pet.healthStatus];
            return (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 font-display">
                        {pet.name}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {pet.breed} • {pet.age}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center ${statusColors[pet.healthStatus]}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {pet.healthStatus.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Species Icon */}
                  <div className="flex justify-center mb-4">
                    {pet.species === 'dog' ? (
                      <FaDog className="w-12 h-12 text-primary-600" />
                    ) : (
                      <FaCat className="w-12 h-12 text-secondary-600" />
                    )}
                  </div>

                  {/* Health Info */}
                  <div className="mb-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Last Checkup:</span>
                      <span className="font-semibold">{pet.lastCheckup}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Next Vaccination:</span>
                      <span className="font-semibold text-primary-600">{pet.nextVaccination}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Medical Records:</span>
                      <span className="font-semibold">{pet.medicalHistory.length} entries</span>
                    </div>
                  </div>

                  {/* Recent History */}
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-neutral-900">Recent History</h4>
                    <div className="space-y-2">
                      {pet.medicalHistory.slice(0, 2).map((record, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            record.type === 'Vaccination' ? 'bg-green-500' :
                            record.type === 'Checkup' ? 'bg-blue-500' : 'bg-amber-500'
                          }`} />
                          <span className="text-neutral-600">{record.date}: {record.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex items-center justify-center flex-1 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-primary-600 hover:bg-primary-700">
                      <FiEye className="w-4 h-4 mr-1" />
                      View Records
                    </button>
                    <button className="p-2 transition-colors rounded-lg bg-neutral-100 hover:bg-neutral-200">
                      <FiEdit className="w-4 h-4 text-neutral-600" />
                    </button>
                    <button className="p-2 transition-colors rounded-lg bg-neutral-100 hover:bg-neutral-200">
                      <FiDownload className="w-4 h-4 text-neutral-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {pets.length === 0 && (
          <div className="py-12 text-center bg-white shadow-sm rounded-xl">
            <FaNotesMedical className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <h3 className="mb-2 text-lg font-semibold text-neutral-900">No health records found</h3>
            <p className="mb-4 text-neutral-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria'
                : 'No health records have been added yet'
              }
            </p>
            <button className="px-6 py-2 font-semibold text-white rounded-lg bg-primary-600 hover:bg-primary-700">
              Add First Record
            </button>
          </div>
        )}

        {/* Statistics Overview */}
        <div className="p-6 mt-8 bg-white shadow-sm rounded-xl">
          <h3 className="mb-4 text-lg font-semibold text-neutral-900">Health Overview</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-green-50">
              <div className="flex items-center">
                <FiCheckCircle className="w-8 h-8 mr-3 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-800">1</p>
                  <p className="text-sm text-green-600">Healthy Pets</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-amber-50">
              <div className="flex items-center">
                <FiAlertTriangle className="w-8 h-8 mr-3 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold text-amber-800">1</p>
                  <p className="text-sm text-amber-600">Need Attention</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50">
              <div className="flex items-center">
                <FaSyringe className="w-8 h-8 mr-3 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-800">2</p>
                  <p className="text-sm text-blue-600">Upcoming Vaccinations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
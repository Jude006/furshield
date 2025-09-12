import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter,
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiCheck,
  FiX,
  FiEye,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import { FaDog, FaCat, FaHeart } from 'react-icons/fa';

const AdoptionApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const applications = [
    {
      id: 1,
      applicant: {
        name: 'Sarah Johnson',
        email: 'sarah@email.com',
        phone: '(555) 123-4567',
        address: '123 Main St, New York, NY'
      },
      pet: {
        name: 'Buddy',
        species: 'dog',
        breed: 'Golden Retriever',
        image: '/api/placeholder/80/80'
      },
      status: 'pending',
      submitted: '2024-01-15',
      notes: 'Looking for family pet, has large backyard'
    },
    {
      id: 2,
      applicant: {
        name: 'Mike Chen',
        email: 'mike@email.com',
        phone: '(555) 987-6543',
        address: '456 Oak Ave, Los Angeles, CA'
      },
      pet: {
        name: 'Luna',
        species: 'cat',
        breed: 'Siamese',
        image: '/api/placeholder/80/80'
      },
      status: 'approved',
      submitted: '2024-01-10',
      notes: 'Experienced cat owner, works from home'
    },
    {
      id: 3,
      applicant: {
        name: 'Emily Davis',
        email: 'emily@email.com',
        phone: '(555) 456-7890',
        address: '789 Pine Rd, Chicago, IL'
      },
      pet: {
        name: 'Max',
        species: 'dog',
        breed: 'Labrador',
        image: '/api/placeholder/80/80'
      },
      status: 'rejected',
      submitted: '2024-01-08',
      notes: 'Apartment too small for large dog'
    }
  ];

  const statusColors = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    processing: 'bg-blue-100 text-blue-800'
  };

  const filteredApplications = applications.filter(app => 
    (statusFilter === 'all' || app.status === statusFilter) &&
    (app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm border-neutral-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 font-display">Adoption Applications</h1>
              <p className="mt-2 text-neutral-600">Manage and review pet adoption requests</p>
            </div>
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
                placeholder="Search applicants or pets..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredApplications.map((application, index) => (
            <motion.div
              key={application.id}
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
                      {application.applicant.name}
                    </h3>
                    <p className="text-sm text-neutral-600">Applied for {application.pet.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[application.status]}`}>
                    {application.status}
                  </span>
                </div>

                {/* Pet Info */}
                <div className="flex items-center p-3 mb-4 rounded-lg bg-neutral-50">
                  <img
                    src={application.pet.image}
                    alt={application.pet.name}
                    className="object-cover w-12 h-12 mr-3 rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900">{application.pet.name}</p>
                    <p className="text-sm text-neutral-600">
                      {application.pet.breed} • {application.pet.species}
                    </p>
                  </div>
                </div>

                {/* Applicant Details */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center text-sm text-neutral-600">
                    <FiMail className="w-4 h-4 mr-2" />
                    {application.applicant.email}
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <FiPhone className="w-4 h-4 mr-2" />
                    {application.applicant.phone}
                  </div>
                  <div className="flex items-center text-sm text-neutral-600">
                    <FiHome className="w-4 h-4 mr-2" />
                    {application.applicant.address}
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between mb-4 text-sm text-neutral-600">
                  <div className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-1" />
                    Applied {application.submitted}
                  </div>
                </div>

                {/* Notes */}
                {application.notes && (
                  <div className="p-3 mb-4 border-l-4 rounded-r-lg bg-primary-50 border-primary-500">
                    <p className="text-sm text-primary-800">{application.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 text-sm font-semibold text-white rounded-lg bg-primary-600 hover:bg-primary-700">
                    <FiEye className="inline w-4 h-4 mr-1" />
                    Review
                  </button>
                  {application.status === 'pending' && (
                    <>
                      <button className="p-2 text-green-800 bg-green-100 rounded-lg hover:bg-green-200">
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-800 bg-red-100 rounded-lg hover:bg-red-200">
                        <FiX className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 && (
          <div className="py-12 text-center bg-white shadow-sm rounded-xl">
            <FaHeart className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <h3 className="mb-2 text-lg font-semibold text-neutral-900">No applications found</h3>
            <p className="mb-4 text-neutral-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria'
                : 'No adoption applications have been submitted yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionApplications;
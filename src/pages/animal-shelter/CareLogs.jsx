import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter,
  FiCalendar,
  FiPlus,
  FiCheckSquare,
  FiClock,
  FiUser,
  FiEdit,
  FiTrash2,
  FiMapPin
} from 'react-icons/fi';
import { FaDog, FaCat, FaPaw } from 'react-icons/fa';

const CareLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('today');

  const careLogs = [
    {
      id: 1,
      pet: {
        name: 'Buddy',
        species: 'dog',
        breed: 'Golden Retriever'
      },
      activity: 'Feeding',
      description: 'Morning meal - 2 cups kibble',
      time: '2024-01-20 08:30',
      status: 'completed',
      caregiver: 'Sarah Johnson',
      notes: 'Ate all food, good appetite'
    },
    {
      id: 2,
      pet: {
        name: 'Luna',
        species: 'cat',
        breed: 'Siamese'
      },
      activity: 'Medication',
      description: 'Give flea treatment',
      time: '2024-01-20 09:00',
      status: 'pending',
      caregiver: 'Mike Chen',
      notes: 'Due for monthly treatment'
    },
    {
      id: 3,
      pet: {
        name: 'Max',
        species: 'dog',
        breed: 'Labrador'
      },
      activity: 'Exercise',
      description: '30 minute walk',
      time: '2024-01-20 10:00',
      status: 'scheduled',
      caregiver: 'Emily Davis',
      notes: 'Needs leash training'
    },
    {
      id: 4,
      pet: {
        name: 'Coco',
        species: 'dog',
        breed: 'Poodle'
      },
      activity: 'Grooming',
      description: 'Bath and haircut',
      time: '2024-01-19 14:00',
      status: 'missed',
      caregiver: 'John Smith',
      notes: 'Rescheduled for next week'
    }
  ];

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-amber-100 text-amber-800',
    scheduled: 'bg-blue-100 text-blue-800',
    missed: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    completed: <FiCheckSquare className="w-4 h-4" />,
    pending: <FiClock className="w-4 h-4" />,
    scheduled: <FiCalendar className="w-4 h-4" />,
    missed: <FiClock className="w-4 h-4" />
  };

  const activityIcons = {
    Feeding: <FiCheckSquare className="w-4 h-4" />,
    Medication: <FiPlus className="w-4 h-4" />,
    Exercise: <FiMapPin className="w-4 h-4" />,
    Grooming: <FiCheckSquare className="w-4 h-4" />
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm border-neutral-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 font-display">Care Logs</h1>
              <p className="mt-2 text-neutral-600">Track and manage daily pet care activities</p>
            </div>
            <button className="flex items-center px-6 py-3 font-semibold text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700">
              <FiPlus className="mr-2" />
              New Log Entry
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
                placeholder="Search pets or activities..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="missed">Missed</option>
            </select>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-3 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-5 bg-white shadow-sm rounded-xl">
            <div className="flex items-center">
              <div className="p-3 mr-4 text-green-600 bg-green-100 rounded-full">
                <FiCheckSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Completed</p>
                <h3 className="text-2xl font-bold text-neutral-900">12</h3>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white shadow-sm rounded-xl">
            <div className="flex items-center">
              <div className="p-3 mr-4 rounded-full bg-amber-100 text-amber-600">
                <FiClock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Pending</p>
                <h3 className="text-2xl font-bold text-neutral-900">5</h3>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white shadow-sm rounded-xl">
            <div className="flex items-center">
              <div className="p-3 mr-4 text-blue-600 bg-blue-100 rounded-full">
                <FiCalendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Scheduled</p>
                <h3 className="text-2xl font-bold text-neutral-900">8</h3>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white shadow-sm rounded-xl">
            <div className="flex items-center">
              <div className="p-3 mr-4 text-red-600 bg-red-100 rounded-full">
                <FiClock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Missed</p>
                <h3 className="text-2xl font-bold text-neutral-900">2</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Care Logs List */}
        <div className="space-y-4">
          {careLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                {/* Left Side - Pet Info */}
                <div className="flex items-start flex-1 space-x-4">
                  <div className="flex-shrink-0">
                    {log.pet.species === 'dog' ? (
                      <FaDog className="w-8 h-8 text-primary-600" />
                    ) : (
                      <FaCat className="w-8 h-8 text-secondary-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2 space-x-3">
                      <h3 className="text-lg font-semibold text-neutral-900">{log.pet.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[log.status]}`}>
                        {log.status}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-neutral-600">{log.pet.breed}</p>
                    <div className="flex items-center mb-1 text-sm text-neutral-600">
                      <div className="flex items-center mr-4">
                        <div className="mr-1 text-primary-600">
                          {activityIcons[log.activity]}
                        </div>
                        <span className="font-medium">{log.activity}:</span>
                        <span className="ml-1">{log.description}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-neutral-500">
                      <div className="flex items-center">
                        <FiClock className="mr-1" />
                        <span>{log.time}</span>
                      </div>
                      <div className="flex items-center">
                        <FiUser className="mr-1" />
                        <span>{log.caregiver}</span>
                      </div>
                    </div>
                    {log.notes && (
                      <div className="p-3 mt-3 rounded-lg bg-neutral-50">
                        <p className="text-sm text-neutral-700">
                          <span className="font-medium">Notes:</span> {log.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side - Actions */}
                <div className="flex items-center space-x-2">
                  <button className="p-2 transition-colors rounded-lg text-neutral-500 hover:text-primary-600 hover:bg-primary-50">
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button className="p-2 transition-colors rounded-lg text-neutral-500 hover:text-red-600 hover:bg-red-50">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {careLogs.length === 0 && (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-neutral-100">
              <FaPaw className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-neutral-900">No care logs found</h3>
            <p className="mb-6 text-neutral-600">Try adjusting your search or filter to find what you're looking for.</p>
            <button className="flex items-center px-6 py-3 mx-auto font-semibold text-white rounded-lg bg-primary-600 hover:bg-primary-700">
              <FiPlus className="mr-2" />
              Add New Log
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareLogs;
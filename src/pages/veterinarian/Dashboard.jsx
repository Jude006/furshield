import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCalendar, 
  FiClock, 
  FiDollarSign, 
  FiUsers, 
  FiPlus,
  FiArrowRight
} from 'react-icons/fi';
import { FaDog, FaCat, FaNotesMedical } from 'react-icons/fa';

const StatCard = ({ icon: Icon, title, value, trend, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-600">{title}</p>
        <p className="text-2xl font-bold text-neutral-900">{value}</p>
        {trend && (
          <p className={`text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {trend} from last week
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

// Appointment Card Component
const AppointmentCard = ({ appointment, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center p-4 transition-colors duration-200 border rounded-lg border-neutral-200 hover:bg-neutral-50"
    whileHover={{ scale: 1.02 }}
  >
    <div className={`p-3 rounded-lg mr-4 ${
      appointment.species === 'dog' ? 'bg-blue-100' : 'bg-pink-100'
    }`}>
      {appointment.species === 'dog' ? (
        <FaDog className="w-6 h-6 text-blue-600" />
      ) : (
        <FaCat className="w-6 h-6 text-pink-600" />
      )}
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-neutral-900">{appointment.petName}</h3>
      <p className="text-sm text-neutral-600">{appointment.ownerName}</p>
      <p className="text-sm text-neutral-500">{appointment.type}</p>
    </div>
    <div className="text-right">
      <p className="font-medium text-neutral-900">{appointment.time}</p>
      <button className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
        Details <FiArrowRight className="w-3 h-3 ml-1" />
      </button>
    </div>
  </motion.div>
);

// Patient Card Component
const PatientCard = ({ patient, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center p-4 transition-colors duration-200 border rounded-lg border-neutral-200 hover:bg-neutral-50"
    whileHover={{ scale: 1.02 }}
  >
    <div className={`p-3 rounded-lg mr-4 ${
      patient.species === 'dog' ? 'bg-blue-100' : 'bg-pink-100'
    }`}>
      {patient.species === 'dog' ? (
        <FaDog className="w-6 h-6 text-blue-600" />
      ) : (
        <FaCat className="w-6 h-6 text-pink-600" />
      )}
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-neutral-900">{patient.name}</h3>
      <p className="text-sm text-neutral-600">{patient.breed}</p>
      <p className="text-sm text-neutral-500">
        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
      </p>
    </div>
    <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
      View Record
    </button>
  </motion.div>
);

// Quick Action Button Component
const QuickActionButton = ({ label, icon: Icon, color }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center p-4 transition-colors duration-200 rounded-lg bg-neutral-50 hover:bg-primary-50"
  >
    <div className={`p-3 rounded-lg mb-2 ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <span className="text-sm font-medium text-neutral-700">{label}</span>
  </motion.button>
);

const Dashboard = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      petName: 'Max',
      ownerName: 'Sarah Johnson',
      time: '10:00 AM',
      type: 'Routine Checkup',
      species: 'dog'
    },
    {
      id: 2,
      petName: 'Whiskers',
      ownerName: 'Mike Chen',
      time: '11:30 AM',
      type: 'Vaccination',
      species: 'cat'
    },
    {
      id: 3,
      petName: 'Buddy',
      ownerName: 'Emily Davis',
      time: '2:00 PM',
      type: 'Dental Cleaning',
      species: 'dog'
    }
  ]);

  const [recentPatients, setRecentPatients] = useState([
    {
      id: 1,
      name: 'Bella',
      species: 'dog',
      breed: 'Golden Retriever',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15'
    },
    {
      id: 2,
      name: 'Luna',
      species: 'cat',
      breed: 'Siamese',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-04-10'
    },
    {
      id: 3,
      name: 'Charlie',
      species: 'dog',
      breed: 'Labrador',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-03-08'
    }
  ]);

  const quickActions = [
    { label: 'New Appointment', icon: FiPlus, color: 'bg-blue-500' },
    { label: 'View Schedule', icon: FiCalendar, color: 'bg-green-500' },
    { label: 'Add Treatment', icon: FaNotesMedical, color: 'bg-purple-500' },
    { label: 'Check Messages', icon: FiUsers, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 font-display">Welcome back, Dr. Smith</h1>
          <p className="text-neutral-600">Here's what's happening with your practice today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <p className="text-sm text-neutral-500">Today: {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FiCalendar}
          title="Today's Appointments"
          value="8"
          trend="+2"
          color="bg-blue-500"
        />
        <StatCard
          icon={FiUsers}
          title="Total Patients"
          value="156"
          trend="+5"
          color="bg-green-500"
        />
        <StatCard
          icon={FiDollarSign}
          title="Monthly Earnings"
          value="$3,240"
          trend="+12%"
          color="bg-purple-500"
        />
        <StatCard
          icon={FiClock}
          title="Avg. Wait Time"
          value="15 min"
          trend="-3 min"
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 font-display">Upcoming Appointments</h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <AppointmentCard key={appointment.id} appointment={appointment} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Recent Patients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 font-display">Recent Patients</h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentPatients.map((patient, index) => (
              <PatientCard key={patient.id} patient={patient} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
      >
        <h2 className="mb-6 text-lg font-semibold text-neutral-900 font-display">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickActions.map((action, index) => (
            <QuickActionButton
              key={index}
              label={action.label}
              icon={action.icon}
              color={action.color}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
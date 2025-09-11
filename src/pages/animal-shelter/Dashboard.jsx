import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiHeart,
  FiUsers,
  FiClipboard,
  FiCalendar,
  FiArrowUp,
  FiAlertCircle
} from 'react-icons/fi';

const Dashboard = () => {
  // Sample data
  const stats = [
    { label: 'Animals in Care', value: '24', icon: FiHeart, color: 'green', change: '+3 this week' },
    { label: 'Adoption Applications', value: '8', icon: FiClipboard, color: 'blue', change: 'Pending review' },
    { label: 'Successful Adoptions', value: '12', icon: FiUsers, color: 'purple', change: 'This month' },
    { label: 'Medical Appointments', value: '5', icon: FiCalendar, color: 'amber', change: 'Scheduled this week' },
  ];

  const recentAdoptions = [
    { pet: 'Max', type: 'Golden Retriever', adopter: 'Sarah Johnson', date: '2 days ago' },
    { pet: 'Bella', type: 'Siamese Cat', adopter: 'Mike Chen', date: '5 days ago' },
    { pet: 'Charlie', type: 'Labrador', adopter: 'Emily Davis', date: '1 week ago' },
  ];

  const urgentTasks = [
    { task: 'Vaccination due', pet: 'Luna (German Shepherd)', time: 'Tomorrow' },
    { task: 'Medical checkup', pet: 'Coco (Persian Cat)', time: 'In 2 days' },
    { task: 'Adoption interview', pet: 'Rocky (Husky)', time: 'Today 3 PM' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl"
      >
        <h1 className="mb-2 text-2xl font-bold">Welcome, Happy Paws Shelter!</h1>
        <p className="opacity-90">You have 8 pending adoption applications and 5 medical appointments this week.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl font-bold text-neutral-800">{stat.value}</div>
              </div>
              <h3 className="mb-1 font-medium text-neutral-700">{stat.label}</h3>
              <p className={`text-sm text-${stat.color}-600`}>{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Adoptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-800">Recent Adoptions</h2>
            <Link to="/animalShelter-dashboard/adoption-applications" className="text-sm font-medium text-green-600 hover:text-green-700">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentAdoptions.map((adoption, index) => (
              <div key={index} className="flex items-center p-4 border rounded-lg border-neutral-200">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-green-100 rounded-full">
                  <FiHeart className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-medium text-neutral-800">{adoption.pet} - {adoption.type}</h3>
                  <p className="text-sm text-neutral-600">Adopted by {adoption.adopter}</p>
                  <p className="text-xs text-neutral-500">{adoption.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Urgent Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <h2 className="mb-6 text-xl font-semibold text-neutral-800">Urgent Tasks</h2>
          <div className="space-y-4">
            {urgentTasks.map((task, index) => (
              <div key={index} className="flex items-center p-4 border rounded-lg border-amber-200 bg-amber-50">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-amber-100">
                  <FiAlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 ml-4">
                  <p className="text-sm font-medium text-neutral-800">{task.task}</p>
                  <p className="text-sm text-neutral-600">{task.pet}</p>
                  <p className="text-xs text-amber-600">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
      >
        <h2 className="mb-6 text-xl font-semibold text-neutral-800">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link
            to="/animalShelter-dashboard/add-pet"
            className="flex flex-col items-center p-4 transition-colors duration-200 rounded-lg bg-green-50 hover:bg-green-100"
          >
            <FiHeart className="w-6 h-6 mb-2 text-green-600" />
            <span className="text-sm font-medium text-green-700">Add New Pet</span>
          </Link>
          <Link
            to="/animalShelter-dashboard/adoption-applications"
            className="flex flex-col items-center p-4 transition-colors duration-200 rounded-lg bg-blue-50 hover:bg-blue-100"
          >
            <FiClipboard className="w-6 h-6 mb-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">View Applications</span>
          </Link>
          <Link
            to="/animalShelter-dashboard/health-records"
            className="flex flex-col items-center p-4 transition-colors duration-200 rounded-lg bg-purple-50 hover:bg-purple-100"
          >
            <FiCalendar className="w-6 h-6 mb-2 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Health Records</span>
          </Link>
          <Link
            to="/animalShelter-dashboard/care-logs"
            className="flex flex-col items-center p-4 transition-colors duration-200 rounded-lg bg-amber-50 hover:bg-amber-100"
          >
            <FiAlertCircle className="w-6 h-6 mb-2 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Care Logs</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
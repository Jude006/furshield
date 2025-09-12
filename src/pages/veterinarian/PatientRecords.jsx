// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { FiArrowLeft, FiSearch, FiAlertCircle, FiFileText, FiShield ,FiActivity, FiUser} from 'react-icons/fi';
// import { GiSyringe, GiPill } from "react-icons/gi";
// import { useAuth } from '../../context/AuthContext';

// const PatientRecords = () => {
//   const { petId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [patient, setPatient] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('medicalHistory');
//   const [loading, setLoading] = useState(true);
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });

//   useEffect(() => {
//     const fetchPatientRecords = async () => {
//       try {
//         setLoading(true);
//         if (!user || user.userType !== 'veterinarian') {
//           toast.error('Please login as a veterinarian to view patient records');
//           navigate('/login');
//           return;
//         }

//         const patientRes = await api.get(`/api/health/vet/${petId}`);
//         setPatient(patientRes.data.data);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           localStorage.removeItem('token');
//           localStorage.removeItem('userId');
//           toast.error('Session expired. Please login again.');
//           navigate('/login');
//         } else {
//           toast.error(err.response?.data?.error || 'Failed to load patient records');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientRecords();
//   }, [petId, navigate, user]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-neutral-50">
//         <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
//       </div>
//     );
//   }

//   const tabs = [
//     { id: 'medicalHistory', label: 'Medical History', icon: FiActivity },
//     { id: 'vaccinations', label: 'Vaccinations', icon: GiSyringe },
//     { id: 'allergies', label: 'Allergies', icon: FiAlertCircle },
//     { id: 'medications', label: 'Medications', icon: GiPill },
//     { id: 'documents', label: 'Documents', icon: FiFileText },
//     { id: 'insurance', label: 'Insurance', icon: FiShield },
//   ];

//   const filteredData = (data) => data.filter(item => {
//     return Object.values(item).some(val => val?.toString().toLowerCase().includes(searchTerm.toLowerCase()));
//   });

//   return (
//     <div className="flex min-h-screen bg-neutral-50">
//       <div className="flex flex-col flex-1 p-6 overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex items-center mb-6"
//         >
//           <button
//             onClick={() => navigate('/veterinarian-dashboard/appointments')}
//             className="flex items-center px-4 py-2 mr-4 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
//           >
//             <FiArrowLeft className="w-4 h-4 mr-2" />
//             Back to Appointments
//           </button>
//           <h1 className="text-3xl font-bold text-neutral-900 font-display">Patient Records</h1>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
//         >
//           <div className="flex items-center">
//             <div className="p-3 mr-4 rounded-lg bg-primary-100">
//               <FiUser className="w-6 h-6 text-primary-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-neutral-900 font-display">{patient.name}</h2>
//               <p className="font-sans text-sm text-neutral-600">{patient.species} - {patient.breed}</p>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="mt-6 overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200"
//         >
//           <nav className="flex overflow-x-auto">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm ${
//                   activeTab === tab.id
//                     ? 'border-primary-500 text-primary-600 bg-primary-50'
//                     : 'border-transparent text-neutral-500 hover:text-neutral-700'
//                 }`}
//               >
//                 <tab.icon className="w-4 h-4 mr-2" />
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="p-6 mt-6 bg-white border shadow-sm rounded-xl border-neutral-200"
//         >
//           <div className="relative mb-6">
//             <FiSearch className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
//             <input
//               type="text"
//               placeholder="Search records..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>
//           <div className="space-y-4">
//             {filteredData(patient[activeTab] || []).length === 0 ? (
//               <div className="p-8 text-center rounded-lg bg-neutral-50">
//                 <FaPaw className="mx-auto mb-4 text-4xl text-neutral-400" />
//                 <p className="font-sans text-neutral-600">No {activeTab} found.</p>
//               </div>
//             ) : (
//               filteredData(patient[activeTab] || []).map((record, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="p-4 border rounded-lg border-neutral-200"
//                 >
//                   <p className="font-sans text-sm font-medium text-neutral-900">{record.title || record.name || record.condition}</p>
//                   <p className="font-sans text-xs text-neutral-600">{record.content || record.description || record.diagnosis}</p>
//                 </motion.div>
//               ))
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default PatientRecords;

import React from 'react'

const PatientRecords = () => {
  return (
    <div>
      
    </div>
  )
}

export default PatientRecords

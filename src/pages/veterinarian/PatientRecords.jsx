import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEye, FiArrowLeft, FiSearch, FiAlertCircle, FiFileText, FiShield, FiActivity, FiUser } from 'react-icons/fi';
import { GiSyringe, GiPill } from 'react-icons/gi';
import { FaPaw } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const PatientRecords = () => {
  const { petId: paramPetId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(paramPetId || new URLSearchParams(location.search).get('petId') || '');
  const [patient, setPatient] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('healthRecords');
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('PatientRecords - Route:', window.location.pathname); // Debug
        console.log('PatientRecords - Pet ID from params:', paramPetId); // Debug
        console.log('PatientRecords - Current user:', user); // Debug

        if (!user) {
          console.log('No user found, redirecting to login');
          toast.error('Please login to view patient records');
          navigate('/auth/login');
          return;
        }

        if (user.userType !== 'veterinarian') {
          console.log('User is not a veterinarian, redirecting to unauthorized');
          toast.error('Access restricted to veterinarians');
          navigate('/unauthorized');
          return;
        }

        console.log('Fetching pets for vet ID:', user.id); // Debug
        // Fetch pets via appointments
        const appointmentsRes = await api.get('/api/appointments', {
          params: { veterinarian: user.id, status: ['scheduled', 'confirmed', 'completed'] }
        });
        const petIds = [...new Set(appointmentsRes.data.data.map(app => app.pet.toString()))];
        console.log('Pet IDs from appointments:', petIds); // Debug

        // Fetch pets
        let petsRes;
        if (petIds.length > 0) {
          petsRes = await api.get('/api/pets', { params: { petIds: petIds.join(',') } });
        } else {
          petsRes = await api.get('/api/pets');
        }
        const fetchedPets = petsRes.data.data || [];
        console.log('Fetched pets:', fetchedPets); // Debug
        setPets(fetchedPets);

        if (!selectedPetId && fetchedPets.length > 0) {
          setSelectedPetId(fetchedPets[0]._id);
          navigate(`/veterinarian-dashboard/patient-records/${fetchedPets[0]._id}`);
        }

        if (selectedPetId) {
          try {
            // Fetch pet details
            const patientRes = await api.get(`/api/health/vet/${selectedPetId}`);
            console.log('Fetched patient:', patientRes.data.data); // Debug
            setPatient(patientRes.data.data || null);

            // Fetch health records
            const healthRecordsRes = await api.get(`/api/health-records/pet/${selectedPetId}`);
            console.log('Fetched health records:', healthRecordsRes.data.data); // Debug
            setHealthRecords(healthRecordsRes.data.data || []);
          } catch (err) {
            console.error('Error fetching pet data:', err);
            toast.warn(`No data found for pet ID ${selectedPetId}`);
            setPatient(null);
            setHealthRecords([]);
          }
        } else if (fetchedPets.length === 0) {
          toast.info('No pets available. Please ensure appointments are scheduled.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          console.log('401 error, clearing token and redirecting to login');
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/auth/login');
        } else if (err.response?.status === 404) {
          console.log('404 error, pet not found');
          toast.warn('Pet data not found');
          setPatient(null);
          setHealthRecords([]);
        } else {
          toast.error(err.response?.data?.error || 'Failed to load patient records');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPetId, navigate, user]);

  const handlePetChange = (e) => {
    const newPetId = e.target.value;
    console.log('Selected pet ID:', newPetId); // Debug
    setSelectedPetId(newPetId);
    navigate(`/veterinarian-dashboard/patient-records/${newPetId}`);
  };

  const tabs = [
    { id: 'healthRecords', label: 'Health Records', icon: FiActivity },
    { id: 'medicalHistory', label: 'Medical History', icon: FiActivity },
    { id: 'vaccinations', label: 'Vaccinations', icon: GiSyringe },
    { id: 'allergies', label: 'Allergies', icon: FiAlertCircle },
    { id: 'medications', label: 'Medications', icon: GiPill },
    { id: 'documents', label: 'Documents', icon: FiFileText },
    { id: 'insurance', label: 'Insurance', icon: FiShield },
  ];

  const filteredData = (data) => data.filter(item =>
    Object.values(item).some(val => val?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/veterinarian-dashboard/appointments')}
            className="flex items-center px-4 py-2 mr-4 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Appointments
          </motion.button>
          <h1 className="text-3xl font-bold text-neutral-900 font-display">Patient Records</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <select
            value={selectedPetId}
            onChange={handlePetChange}
            className="w-full max-w-xs px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select a Pet</option>
            {pets.map(pet => (
              <option key={pet._id} value={pet._id}>{pet.name} ({pet.species})</option>
            ))}
          </select>
        </motion.div>

        {!patient && selectedPetId && (
          <div className="p-8 text-center rounded-lg bg-neutral-50">
            <FaPaw className="mx-auto mb-4 text-4xl text-neutral-400" />
            <p className="font-sans text-neutral-600">No data available for this pet.</p>
          </div>
        )}

        {selectedPetId && patient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200 mb-6"
          >
            <div className="flex items-center">
              <div className="p-3 mr-4 rounded-lg bg-primary-100">
                <FiUser className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 font-display">{patient.name}</h2>
                <p className="font-sans text-sm text-neutral-600">{patient.species} - {patient.breed}</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 bg-primary-50'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 mt-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <div className="relative mb-6">
            <FiSearch className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          {activeTab === 'healthRecords' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Date</th>
                    <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Symptoms</th>
                    <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Diagnosis</th>
                    <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Treatment</th>
                    <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Lab Results</th>
                    <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Prescriptions</th>
                    <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  <AnimatePresence>
                    {filteredData(healthRecords).length > 0 ? (
                      filteredData(healthRecords).map((record) => (
                        <motion.tr
                          key={record._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="transition-colors duration-200 hover:bg-neutral-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-sans text-sm text-neutral-900">
                            {new Date(record.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-sans text-sm text-neutral-900">
                            {record.symptoms?.join(', ') || 'N/A'}
                          </td>
                          <td className="px-6 py-4 font-sans text-sm text-neutral-900">{record.diagnosis || 'N/A'}</td>
                          <td className="px-6 py-4 font-sans text-sm text-neutral-900">{record.treatment || 'N/A'}</td>
                          <td className="px-6 py-4 font-sans text-sm text-neutral-900">{record.labResults || 'N/A'}</td>
                          <td className="px-6 py-4 font-sans text-sm text-neutral-900">{record.prescriptions || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => navigate(`/health-records/${record._id}`)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <FiEye className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 font-sans text-center text-neutral-600">
                          No health records found.
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredData(patient?.[activeTab] || (activeTab === 'insurance' ? (patient?.insurance ? [patient.insurance] : []) : [])).length === 0 ? (
                <div className="p-8 text-center rounded-lg bg-neutral-50">
                  <FaPaw className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No {activeTab} found.</p>
                </div>
              ) : (
                filteredData(patient?.[activeTab] || (activeTab === 'insurance' ? (patient?.insurance ? [patient.insurance] : []) : [])).map((record, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg border-neutral-200"
                  >
                    <p className="font-sans text-sm font-medium text-neutral-900">
                      {record.vaccine || record.allergen || record.name || record.condition || record.type || record.policyNumber || 'Record'}
                    </p>
                    <p className="font-sans text-xs text-neutral-600">
                      {record.diagnosis || record.description || record.reaction || record.dosage || record.coverage || 'No details'}
                    </p>
                    {(record.date || record.startDate || record.uploadDate || record.expiryDate) && (
                      <p className="font-sans text-xs text-neutral-600">
                        Date: {new Date(record.date || record.startDate || record.uploadDate || record.expiryDate).toLocaleDateString()}
                      </p>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PatientRecords;
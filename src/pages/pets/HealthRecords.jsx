import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiPlus, FiSearch, FiArrowLeft, FiSave } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const HealthRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentId } = useParams();
  const petId = new URLSearchParams(location.search).get('petId');
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(petId || '');
  const [healthData, setHealthData] = useState({
    medicalHistory: [],
    vaccinations: [],
    allergies: [],
    medications: [],
    documents: [],
    insurance: [],
  });
  const [treatmentForm, setTreatmentForm] = useState({
    symptoms: '',
    diagnosis: '',
    treatment: '',
    followUpRequired: false,
    followUpDate: '',
  });
  const [activeTab, setActiveTab] = useState('medicalHistory');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [noHealthData, setNoHealthData] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view health records');
          navigate('/login');
          return;
        }

        if (user.userType === 'veterinarian' && !petId && !appointmentId) {
          toast.error('Please select a pet or appointment');
          navigate('/veterinarian-dashboard');
          return;
        }

        const requests = [api.get('/api/pets')];
        if (user.userType === 'veterinarian') {
          if (petId) {
            requests.push(api.get(`/api/health/vet/${petId}`));
          }
          if (appointmentId) {
            requests.push(api.get(`/api/appointments/${appointmentId}`));
          }
        } else {
          requests.push(api.get(`/api/health${petId ? `?petId=${petId}` : ''}`));
        }

        const responses = await Promise.all(requests.map(req => req.catch(err => ({ error: err }))));

        const petsRes = responses[0];
        const healthRes = responses[1];
        const appointmentRes = responses[2];

        if (petsRes.error) {
          throw petsRes.error;
        }
        setPets(petsRes.data.data || []);

        if (healthRes.error) {
          console.error('Health API error:', healthRes.error.response?.data);
          setNoHealthData(true);
          setHealthData({
            medicalHistory: [],
            vaccinations: [],
            allergies: [],
            medications: [],
            documents: [],
            insurance: [],
          });
        } else if (healthRes.data?.data) {
          console.log('Health API response:', JSON.stringify(healthRes.data.data, null, 2));
          let data;
          if (user.userType === 'veterinarian') {
            data = healthRes.data.data; // Single pet object
          } else {
            // Handle both array and object cases
            const responseData = healthRes.data.data;
            if (Array.isArray(responseData)) {
              data = petId ? responseData.find(p => p._id === petId) || responseData[0] : responseData[0];
            } else {
              data = responseData; // Single pet object
            }
          }
          if (!data) {
            console.warn('No valid health data found');
            setNoHealthData(true);
          } else {
            setHealthData({
              medicalHistory: data.medicalHistory || [],
              vaccinations: data.vaccinations || [],
              allergies: data.allergies || [],
              medications: data.medications || [],
              documents: data.documents || [],
              insurance: Array.isArray(data.insurance) ? data.insurance : data.insurance ? [data.insurance] : [],
            });
          }
        } else {
          console.warn('No health data in response');
          setNoHealthData(true);
        }

        if (appointmentRes && !appointmentRes.error) {
          setAppointment(appointmentRes.data.data);
          setTreatmentForm({
            symptoms: appointmentRes.data.data.symptoms || '',
            diagnosis: appointmentRes.data.data.diagnosis || '',
            treatment: appointmentRes.data.data.treatment || '',
            followUpRequired: appointmentRes.data.data.followUpRequired || false,
            followUpDate: appointmentRes.data.data.followUpDate || '',
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load health records');
          setNoHealthData(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, petId, appointmentId, user]);

  const handlePetChange = (e) => {
    const newPetId = e.target.value;
    setSelectedPet(newPetId);
    setActiveTab('medicalHistory');
    navigate(`/pets-dashboard/health-records${newPetId ? `?petId=${newPetId}` : ''}`);
  };

  const handleAddRecord = (type) => {
    if (!selectedPet && user.userType !== 'veterinarian') {
      toast.error('Please select a pet first');
      return;
    }
    navigate(`/pets-dashboard/health-records/add/${type}?petId=${selectedPet}`);
  };

  const handleTreatmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/api/health/vet/log-treatment/${appointmentId}`, treatmentForm);
      toast.success('Treatment logged successfully');
      navigate('/veterinarian-dashboard/appointments');
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.error || 'Failed to log treatment');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTreatmentInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTreatmentForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const tabs = [
    { id: 'medicalHistory', label: 'Medical History', icon: FaPaw },
    { id: 'vaccinations', label: 'Vaccinations', icon: FaPaw },
    { id: 'allergies', label: 'Allergies', icon: FaPaw },
    { id: 'medications', label: 'Medications', icon: FaPaw },
    { id: 'documents', label: 'Documents', icon: FaPaw },
    { id: 'insurance', label: 'Insurance', icon: FaPaw },
    ...(user.userType === 'veterinarian' && appointmentId ? [{ id: 'treatmentLog', label: 'Treatment Log', icon: FaPaw }] : []),
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 font-display">
                  {user.userType === 'veterinarian' ? 'Patient Records' : 'Health Records'}
                </h1>
                <div className="flex space-x-3">
                  {user.userType !== 'veterinarian' && (
                    <select
                      value={selectedPet}
                      onChange={handlePetChange}
                      className="px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a Pet</option>
                      {pets.map((pet) => (
                        <option key={pet._id} value={pet._id}>
                          {pet.name}
                        </option>
                      ))}
                    </select>
                  )}
                  <button
                    onClick={() => navigate(user.userType === 'veterinarian' ? '/veterinarian-dashboard' : '/pets-dashboard')}
                    className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                  >
                    <FiArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                </div>
              </div>

              {noHealthData && (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FaPaw className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No health records available. Please add records to view them.</p>
                </div>
              )}

              {!noHealthData && (
                <>
                  <div className="mb-6">
                    <div className="flex border-b border-neutral-200">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-4 py-2 font-sans text-sm font-medium transition-colors ${
                            activeTab === tab.id
                              ? 'text-primary-600 border-b-2 border-primary-600'
                              : 'text-neutral-600 hover:text-primary-600'
                          }`}
                        >
                          <tab.icon className="inline-block w-4 h-4 mr-2" />
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeTab !== 'treatmentLog' && (
                    <div className="relative mb-6">
                      <FiSearch className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  )}

                  {activeTab === 'treatmentLog' && user.userType === 'veterinarian' && appointmentId ? (
                    <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
                      <form onSubmit={handleTreatmentSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label className="block font-sans text-sm font-medium text-neutral-600">Symptoms</label>
                            <textarea
                              name="symptoms"
                              value={treatmentForm.symptoms}
                              onChange={handleTreatmentInputChange}
                              className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              rows="3"
                              placeholder="Enter symptoms"
                            ></textarea>
                          </div>
                          <div>
                            <label className="block font-sans text-sm font-medium text-neutral-600">Diagnosis</label>
                            <textarea
                              name="diagnosis"
                              value={treatmentForm.diagnosis}
                              onChange={handleTreatmentInputChange}
                              className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              rows="3"
                              placeholder="Enter diagnosis"
                            ></textarea>
                          </div>
                          <div>
                            <label className="block font-sans text-sm font-medium text-neutral-600">Treatment</label>
                            <textarea
                              name="treatment"
                              value={treatmentForm.treatment}
                              onChange={handleTreatmentInputChange}
                              className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              rows="3"
                              placeholder="Enter treatment"
                            ></textarea>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="followUpRequired"
                              checked={treatmentForm.followUpRequired}
                              onChange={handleTreatmentInputChange}
                              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                            />
                            <label className="font-sans text-sm font-medium text-neutral-600">Follow-up Required</label>
                          </div>
                          {treatmentForm.followUpRequired && (
                            <div>
                              <label className="block font-sans text-sm font-medium text-neutral-600">Follow-up Date</label>
                              <input
                                type="date"
                                name="followUpDate"
                                value={treatmentForm.followUpDate}
                                onChange={handleTreatmentInputChange}
                                required
                                className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                          )}
                          <div className="flex justify-end mt-6 space-x-3">
                            <button
                              type="button"
                              onClick={() => navigate('/veterinarian-dashboard/appointments')}
                              className="px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={loading}
                              className={`px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 font-sans ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <FiSave className="inline-block w-4 h-4 mr-2" />
                              {loading ? 'Saving...' : 'Save Treatment Log'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {[
                        {
                          title: 'Medical History',
                          id: 'medicalHistory',
                          data: healthData.medicalHistory,
                          fields: ['condition', 'diagnosis', 'treatment', 'date'],
                        },
                        {
                          title: 'Vaccinations',
                          id: 'vaccinations',
                          data: healthData.vaccinations,
                          fields: ['vaccine', 'date', 'nextDue'],
                        },
                        {
                          title: 'Allergies',
                          id: 'allergies',
                          data: healthData.allergies,
                          fields: ['allergen', 'reaction', 'severity'],
                        },
                        {
                          title: 'Medications',
                          id: 'medications',
                          data: healthData.medications,
                          fields: ['name', 'dosage', 'frequency', 'startDate', 'endDate'],
                        },
                        {
                          title: 'Documents',
                          id: 'documents',
                          data: healthData.documents,
                          fields: ['type', 'url', 'description', 'uploadDate'],
                        },
                        {
                          title: 'Insurance',
                          id: 'insurance',
                          data: healthData.insurance,
                          fields: ['policyNumber', 'provider', 'coverage', 'expiryDate'],
                        },
                      ]
                        .filter((section) => section.id === activeTab)
                        .map((section, index) => (
                          <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <FaPaw className="w-6 h-6 mr-2 text-primary-600" />
                                <h2 className="text-xl font-bold text-neutral-900 font-display">{section.title}</h2>
                              </div>
                              {user.userType !== 'veterinarian' && selectedPet && (
                                <button
                                  onClick={() => handleAddRecord(section.id)}
                                  className="flex items-center px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                                >
                                  <FiPlus className="w-4 h-4 mr-2" />
                                  Add {section.title.slice(0, -1)}
                                </button>
                              )}
                            </div>
                            <div className="space-y-3">
                              {section.data.length === 0 ? (
                                <p className="font-sans text-neutral-600">No {section.title.toLowerCase()} available.</p>
                              ) : (
                                section.data
                                  .filter((item) =>
                                    section.fields.some((field) =>
                                      item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                  )
                                  .map((item, i) => (
                                    <div key={i} className="p-3 border rounded-lg border-neutral-200">
                                      <p className="font-sans text-sm font-medium text-neutral-900">
                                        {item.condition || item.vaccine || item.allergen || item.name || item.type || item.policyNumber || 'Record'}
                                      </p>
                                      {section.fields.map((field) => (
                                        item[field] && (
                                          <p key={field} className="font-sans text-xs text-neutral-600">
                                            {field.charAt(0).toUpperCase() + field.slice(1)}: {['date', 'nextDue', 'startDate', 'endDate', 'uploadDate', 'expiryDate'].includes(field)
                                              ? new Date(item[field]).toLocaleDateString()
                                              : item[field]}
                                          </p>
                                        )
                                      ))}
                                    </div>
                                  ))
                              )}
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthRecords;
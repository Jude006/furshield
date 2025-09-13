import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FiUpload,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiCalendar,
  FiAlertCircle,
  FiHeart,
  FiShield,
} from 'react-icons/fi';
import {
  FaDog,
  FaCat,
  FaSyringe,
  FaNotesMedical,
  FaPaw,
  FaWeight,
  FaUserMd,
} from 'react-icons/fa';

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center p-3 space-x-3 rounded-lg bg-gray-50">
    <Icon className="text-xl text-primary-600" />
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium text-gray-900">{value || 'N/A'}</p>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
  </div>
);

const ErrorDisplay = ({ error, navigate }) => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="text-center">
      <FiAlertCircle className="mx-auto mb-4 text-4xl text-red-600" />
      <p className="mb-4 text-lg text-gray-900">{error}</p>
      <button
        onClick={() => navigate('/pets-dashboard/my-pets')}
        className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
      >
        Back to Pets
      </button>
    </div>
  </div>
);

const NotFound = ({ navigate }) => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="text-center">
      <FiAlertCircle className="mx-auto mb-4 text-4xl text-yellow-600" />
      <p className="mb-4 text-lg text-gray-900">Pet not found</p>
      <button
        onClick={() => navigate('/pets-dashboard/my-pets')}
        className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
      >
        Back to Pets
      </button>
    </div>
  </div>
);

const OverviewTab = ({ pet }) => (
  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
    <h2 className="mb-4 text-xl font-semibold text-gray-900">Overview</h2>
    <div className="grid grid-cols-2 gap-4">
      <InfoCard icon={FaPaw} label="Species" value={pet.species} />
      <InfoCard icon={FaWeight} label="Weight" value={pet.weight ? `${pet.weight} kg` : 'N/A'} />
      <InfoCard icon={FiHeart} label="Age" value={pet.age ? `${pet.age} years` : 'N/A'} />
      <InfoCard
        icon={FaUserMd}
        label="Last Vet Visit"
        value={pet.lastCheckup ? new Date(pet.lastCheckup).toLocaleDateString() : 'Never'}
      />
      <InfoCard icon={FaDog} label="Breed" value={pet.breed} />
      <InfoCard icon={FaCat} label="Gender" value={pet.gender} />
      <InfoCard icon={FaPaw} label="Color" value={pet.color} />
      <InfoCard
        icon={FaNotesMedical}
        label="Birth Date"
        value={pet.birthDate ? new Date(pet.birthDate).toLocaleDateString() : 'N/A'}
      />
    </div>
  </div>
);

const MedicalTab = ({ pet, api, setPet }) => {
  const [medicalRecord, setMedicalRecord] = useState({ condition: '', diagnosis: '', treatment: '', date: '' });
  const [loading, setLoading] = useState(false);

  const handleMedicalInputChange = (e) => {
    const { name, value } = e.target;
    setMedicalRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMedicalRecord = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const recordData = { ...medicalRecord };
      if (recordData.date === '') delete recordData.date;
      await api.post(`/api/pets/${pet._id}/medical-records`, recordData);
      toast.success('Medical record added');
      setMedicalRecord({ condition: '', diagnosis: '', treatment: '', date: '' });
      const petRes = await api.get(`/api/pets/${pet._id}`);
      setPet(petRes.data.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add medical record');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedicalRecord = async (recordId) => {
    try {
      setLoading(true);
      await api.delete(`/api/pets/${pet._id}/medical-records/${recordId}`);
      toast.success('Medical record deleted');
      const petRes = await api.get(`/api/pets/${pet._id}`);
      setPet(petRes.data.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete medical record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Medical History</h2>
        <button
          onClick={() => document.getElementById('medical-form').scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center text-primary-600 hover:text-primary-700"
        >
          <FiPlus className="mr-1" /> Add Record
        </button>
      </div>
      <form id="medical-form" onSubmit={handleAddMedicalRecord} className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Condition</label>
            <input
              type="text"
              name="condition"
              value={medicalRecord.condition}
              onChange={handleMedicalInputChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter condition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Diagnosis</label>
            <textarea
              name="diagnosis"
              value={medicalRecord.diagnosis}
              onChange={handleMedicalInputChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows="3"
              placeholder="Enter diagnosis"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Treatment</label>
            <textarea
              name="treatment"
              value={medicalRecord.treatment}
              onChange={handleMedicalInputChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows="3"
              placeholder="Enter treatment"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={medicalRecord.date}
              onChange={handleMedicalInputChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding...' : 'Add Medical Record'}
          </button>
        </div>
      </form>
      {pet.medicalHistory?.length > 0 ? (
        <div className="space-y-3">
          {pet.medicalHistory.map((record, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 border rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{record.condition}</h4>
                  <p className="text-sm text-gray-600">Diagnosis: {record.diagnosis}</p>
                  <p className="text-sm text-gray-600">Treatment: {record.treatment}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
                  </p>
                  {record.vet && (
                    <p className="text-sm text-gray-500">
                      Vet: {record.vet.firstName} {record.vet.lastName}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteMedicalRecord(record._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No medical records found</p>
      )}
    </div>
  );
};

const VaccinationsTab = ({ pet, api, setPet }) => {
  const [vaccination, setVaccination] = useState({ vaccine: '', date: '', nextDue: '' });
  const [loading, setLoading] = useState(false);

  const handleVaccinationInputChange = (e) => {
    const { name, value } = e.target;
    setVaccination((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVaccination = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const vaccineData = { ...vaccination };
      if (vaccineData.date === '') delete vaccineData.date;
      if (vaccineData.nextDue === '') delete vaccineData.nextDue;
      await api.post(`/api/pets/${pet._id}/vaccinations`, vaccineData);
      toast.success('Vaccination added');
      setVaccination({ vaccine: '', date: '', nextDue: '' });
      const petRes = await api.get(`/api/pets/${pet._id}`);
      setPet(petRes.data.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add vaccination');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVaccination = async (vaccinationId) => {
    try {
      setLoading(true);
      await api.delete(`/api/pets/${pet._id}/vaccinations/${vaccinationId}`);
      toast.success('Vaccination deleted');
      const petRes = await api.get(`/api/pets/${pet._id}`);
      setPet(petRes.data.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete vaccination');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Vaccinations</h2>
        <button
          onClick={() => document.getElementById('vaccination-form').scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center text-primary-600 hover:text-primary-700"
        >
          <FiPlus className="mr-1" /> Add Vaccination
        </button>
      </div>
      <form id="vaccination-form" onSubmit={handleAddVaccination} className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Vaccine</label>
            <input
              type="text"
              name="vaccine"
              value={vaccination.vaccine}
              onChange={handleVaccinationInputChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter vaccine name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={vaccination.date}
              onChange={handleVaccinationInputChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Next Due</label>
            <input
              type="date"
              name="nextDue"
              value={vaccination.nextDue}
              onChange={handleVaccinationInputChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding...' : 'Add Vaccination'}
          </button>
        </div>
      </form>
      {pet.vaccinations?.length > 0 ? (
        <div className="space-y-3">
          {pet.vaccinations.map((vaccine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 border rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{vaccine.vaccine}</h4>
                  <p className="text-sm text-gray-600">
                    Date: {vaccine.date ? new Date(vaccine.date).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Next Due: {vaccine.nextDue ? new Date(vaccine.nextDue).toLocaleDateString() : 'N/A'}
                  </p>
                  {vaccine.administeredBy && (
                    <p className="text-sm text-gray-500">
                      Administered By: {vaccine.administeredBy.firstName} {vaccine.administeredBy.lastName}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteVaccination(vaccine._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No vaccinations found</p>
      )}
    </div>
  );
};

const AppointmentsTab = ({ timeline }) => (
  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
    <h2 className="mb-4 text-xl font-semibold text-gray-900">Appointments</h2>
    {timeline.filter((item) => item.type === 'appointment').length > 0 ? (
      <div className="space-y-3">
        {timeline
          .filter((item) => item.type === 'appointment')
          .map((appt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 border rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{appt.title}</h4>
                  <p className="text-sm text-gray-600">{appt.description}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {appt.date ? new Date(appt.date).toLocaleDateString() : 'N/A'}
                  </p>
                  {appt.data.veterinarian && (
                    <p className="text-sm text-gray-500">
                      Vet: {appt.data.veterinarian.firstName} {appt.data.veterinarian.lastName} (
                      {appt.data.veterinarian.specialization || 'N/A'})
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    ) : (
      <p className="text-gray-500">No appointments found</p>
    )}
  </div>
);

const DocumentsTab = ({ pet, apiMultipart, setPet }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleUploadImages = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      imageFiles.forEach((image) => data.append('images', image));
      await apiMultipart.post(`/api/pets/${pet._id}/upload-image`, data);
      toast.success('Images uploaded successfully');
      setImageFiles([]);
      setImagePreviews([]);
      const petRes = await apiMultipart.get(`/api/pets/${pet._id}`);
      setPet(petRes.data.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to upload images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Documents</h2>
      <form onSubmit={handleUploadImages} className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Add New Images</label>
        <div className="flex items-center justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <FiUpload className="w-12 h-12 mx-auto text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="images"
                className="relative font-medium bg-white rounded-md cursor-pointer text-primary-600 hover:text-primary-700"
              >
                <span>Upload images</span>
                <input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-24 rounded-lg"
              />
            ))}
          </div>
        )}
        {imagePreviews.length > 0 && (
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Uploading...' : 'Upload Images'}
          </button>
        )}
      </form>
      {pet.images?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {pet.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <img
                src={`${apiMultipart.defaults.baseURL}${image.url}`}
                alt={image.caption || `Pet image ${index + 1}`}
                className="object-cover w-full h-32 rounded-lg"
              />
              {image.caption && (
                <p className="mt-1 text-xs text-gray-600">{image.caption}</p>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No images uploaded</p>
      )}
    </div>
  );
};

const TimelineTab = ({ timeline }) => (
  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
    <h2 className="mb-4 text-xl font-semibold text-gray-900">Timeline</h2>
    {timeline.length > 0 ? (
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="py-2 pl-4 border-l-4"
            style={{
              borderLeftColor:
                item.type === 'medical'
                  ? '#ef4444'
                  : item.type === 'vaccination'
                  ? '#3b82f6'
                  : '#10b981',
            }}
          >
            <h4 className="font-medium text-gray-900">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm text-gray-500">
              {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
            </p>
            {item.type === 'medical' && item.data.vet && (
              <p className="text-sm text-gray-500">
                Vet: {item.data.vet.firstName} {item.data.vet.lastName}
              </p>
            )}
            {item.type === 'vaccination' && item.data.administeredBy && (
              <p className="text-sm text-gray-500">
                Administered By: {item.data.administeredBy.firstName} {item.data.administeredBy.lastName}
              </p>
            )}
            {item.type === 'appointment' && item.data.veterinarian && (
              <p className="text-sm text-gray-500">
                Vet: {item.data.veterinarian.firstName} {item.data.veterinarian.lastName} (
                {item.data.veterinarian.specialization || 'N/A'})
              </p>
            )}
          </motion.div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No timeline events found</p>
    )}
  </div>
);

const PetProfile = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    color: '',
    weight: '',
    birthDate: '',
  });
  const [editing, setEditing] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const apiMultipart = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiMultipart.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const fetchPetAndTimeline = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view pet details');
          navigate('/login');
          return;
        }

        const petResponse = await api.get(`/api/pets/${petId}`);
        const petData = petResponse.data.data || petResponse.data;
        if (!petData) {
          throw new Error('No pet data received from server');
        }
        setPet(petData);
        setFormData({
          name: petData.name,
          species: petData.species,
          breed: petData.breed,
          age: petData.age || '',
          gender: petData.gender,
          color: petData.color || '',
          weight: petData.weight || '',
          birthDate: petData.birthDate ? petData.birthDate.split('T')[0] : '',
        });

        const timelineResponse = await api.get(`/api/pets/${petId}/timeline`);
        setTimeline(timelineResponse.data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load pet details');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPetAndTimeline();
  }, [petId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updateData = {
        ...formData,
        species: formData.species.toLowerCase(),
        gender: formData.gender.toLowerCase(),
      };
      await api.put(`/api/pets/${petId}`, updateData);
      toast.success('Pet updated successfully');
      setEditing(false);
      const petRes = await api.get(`/api/pets/${petId}`);
      setPet(petRes.data.data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update pet');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePet = async () => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        setLoading(true);
        await api.delete(`/api/pets/${petId}`);
        toast.success('Pet deleted successfully');
        navigate('/pets-dashboard/my-pets');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to delete pet');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && !pet) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} navigate={navigate} />;
  if (!pet) return <NotFound navigate={navigate} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/pets-dashboard/my-pets')}
              className="mr-4 text-primary-600 hover:text-primary-700"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{pet.name}'s Profile</h1>
          </div>
          <div className="flex items-center space-x-3">
            {pet.insurance && (
              <div className="flex items-center px-3 py-2 rounded-lg bg-blue-50">
                <FiShield className="mr-2 text-blue-600" />
                <span className="text-sm text-blue-800">Insured</span>
              </div>
            )}
            <button
              onClick={handleDeletePet}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <FiTrash2 className="mr-1" /> Delete Pet
            </button>
          </div>
        </div>

        <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <nav className="flex px-6 space-x-8">
            {['overview', 'medical', 'vaccinations', 'appointments', 'documents', 'timeline'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {pet.species === 'dog' ? (
                        <FaDog className="w-8 h-8 mr-3 text-primary-600" />
                      ) : (
                        <FaCat className="w-8 h-8 mr-3 text-primary-600" />
                      )}
                      <h2 className="text-xl font-bold text-gray-900">{pet.name}</h2>
                    </div>
                    {!editing && (
                      <button
                        onClick={() => setEditing(true)}
                        className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                      >
                        <FiEdit className="inline mr-1" /> Edit
                      </button>
                    )}
                  </div>
                  {editing ? (
                    <form onSubmit={handleUpdatePet}>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Species</label>
                          <select
                            name="species"
                            value={formData.species}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="">Select species</option>
                            {['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'reptile', 'other'].map((s) => (
                              <option key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Breed</label>
                          <input
                            type="text"
                            name="breed"
                            value={formData.breed}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Age</label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                            min="0"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Gender</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Color</label>
                          <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Weight (kg)</label>
                          <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600">Birth Date</label>
                          <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-6 space-x-3">
                        <button
                          type="button"
                          onClick={() => setEditing(false)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className={`px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <OverviewTab pet={pet} />
                  )}
                </div>
              </div>
            )}
            {activeTab === 'medical' && <MedicalTab pet={pet} api={api} setPet={setPet} />}
            {activeTab === 'vaccinations' && <VaccinationsTab pet={pet} api={api} setPet={setPet} />}
            {activeTab === 'appointments' && <AppointmentsTab timeline={timeline} />}
            {activeTab === 'documents' && <DocumentsTab pet={pet} apiMultipart={apiMultipart} setPet={setPet} />}
            {activeTab === 'timeline' && <TimelineTab timeline={timeline} />}
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Health Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Checkup</span>
                  <span className="text-sm font-medium">
                    {pet.lastCheckup ? new Date(pet.lastCheckup).toLocaleDateString() : 'Never'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Vaccinations</span>
                  <span className="text-sm font-medium">{pet.vaccinations?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Medications</span>
                  <span className="text-sm font-medium">{pet.medications?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Allergies</span>
                  <span className="text-sm font-medium">{pet.allergies?.length || 0}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Upcoming</h3>
              {pet.vaccinations?.filter((v) => new Date(v.nextDue) > new Date()).length > 0 ? (
                <div className="space-y-2">
                  {pet.vaccinations
                    .filter((v) => new Date(v.nextDue) > new Date())
                    .slice(0, 3)
                    .map((vaccine, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <FiCalendar className="mr-2 text-yellow-600" />
                        <span>
                          {vaccine.vaccine} due {new Date(vaccine.nextDue).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No upcoming reminders</p>
              )}s
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Allergies</h3>
              {pet.allergies?.length > 0 ? (
                <div className="space-y-2">
                  {pet.allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <FiAlertCircle className="mr-2 text-red-600" />
                      <span>
                        {allergy.allergen} ({allergy.severity})
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No allergies recorded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
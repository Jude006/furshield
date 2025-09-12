import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { GiSyringe } from 'react-icons/gi';
import { FaPaw } from 'react-icons/fa';


const HealthRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const petId = new URLSearchParams(location.search).get('petId');
  const [pets, setPets] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
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

        const [petsRes, recordsRes] = await Promise.all([
          api.get('/api/pets'),
          api.get(`/api/health-records${petId ? `?petId=${petId}` : ''}`),
        ]);

        setPets(petsRes.data.data);
        setHealthRecords(recordsRes.data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load health records');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, petId]);

  const handleAddRecord = () => {
    navigate(`/pets-dashboard/health-records/add${petId ? `?petId=${petId}` : ''}`);
  };

  const filteredRecords = healthRecords.filter(
    (record) =>
      record.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.treatment?.toLowerCase().includes(searchTerm.toLowerCase())
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
     
      <div className="flex flex-col flex-1 overflow-hidden">
     

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 font-display">Health Records</h1>
                <button
                  onClick={handleAddRecord}
                  className="flex items-center px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                >
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add Record
                </button>
              </div>

              {filteredRecords.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FaPaw className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No health records found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRecords.map((record) => (
                    <motion.div
                      key={record._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <GiSyringe className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-sans text-sm font-medium text-neutral-900">
                            {record.diagnosis || 'Checkup'} - {pets.find((p) => p._id === record.pet)?.name}
                          </p>
                          <p className="font-sans text-xs text-neutral-600">{new Date(record.visitDate).toLocaleDateString()}</p>
                          <p className="mt-1 font-sans text-xs text-neutral-600">Treatment: {record.treatment || 'None'}</p>
                          {record.vaccinations?.length > 0 && (
                            <p className="mt-1 font-sans text-xs text-neutral-600">
                              Vaccinations: {record.vaccinations.map((v) => v.name).join(', ')}
                            </p>
                          )}
                          {record.allergies?.length > 0 && (
                            <p className="mt-1 font-sans text-xs text-neutral-600">Allergies: {record.allergies.join(', ')}</p>
                          )}
                          {record.certificates?.length > 0 && (
                            <p className="mt-1 font-sans text-xs text-neutral-600">Certificates: {record.certificates.join(', ')}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthRecords;
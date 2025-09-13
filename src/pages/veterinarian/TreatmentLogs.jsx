import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiSave, FiPlus, FiTrash2, FiEdit, FiEye } from 'react-icons/fi';

const TreatmentLogs = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    symptoms: '',
    diagnosis: '',
    treatment: '',
    labResults: '',
    followUpRequired: false,
    followUpDate: '',
    medications: ['']
  });
  const [appointment, setAppointment] = useState(null);
  const [pastTreatments, setPastTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

      // Validate appointmentId
      if (!appointmentId || appointmentId === 'undefined') {
        console.error('Invalid appointmentId:', appointmentId);
        toast.error('Invalid appointment ID. Please select a valid appointment.');
        setLoading(false); // Stop loading to show error UI
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to log treatments');
        navigate('/login');
        return;
      }

      // Fetch appointment
      const appointmentRes = await api.get(`/api/appointments/${appointmentId}`);
      const appointmentData = appointmentRes.data.data;
      setAppointment(appointmentData);

      // Fetch past treatments for the pet
      const pastTreatmentsRes = await api.get(`/api/appointments/pet/${appointmentData.pet._id}/treatments`);
      setPastTreatments(pastTreatmentsRes.data.data);

      // Initialize form data
      setFormData({
        symptoms: Array.isArray(appointmentData.symptoms) ? appointmentData.symptoms.join(', ') : '',
        diagnosis: appointmentData.diagnosis || '',
        treatment: appointmentData.treatment || '',
        labResults: appointmentData.labResults || '',
        followUpRequired: appointmentData.followUpRequired || false,
        followUpDate: appointmentData.followUpDate ? new Date(appointmentData.followUpDate).toISOString().split('T')[0] : '',
        medications: Array.isArray(appointmentData.medications) && appointmentData.medications.length > 0 
          ? appointmentData.medications 
          : ['']
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else if (err.response?.status === 404) {
        toast.error('Appointment not found');
        setLoading(false); // Stop loading to show error UI
      } else {
        toast.error(err.response?.data?.error || 'Failed to load data');
        setLoading(false);
      }
    }
  };

  fetchData();
}, [appointmentId, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMedicationChange = (index, value) => {
    const newMedications = [...formData.medications];
    newMedications[index] = value;
    setFormData(prev => ({ ...prev, medications: newMedications }));
  };

  const addMedicationField = () => {
    setFormData(prev => ({ ...prev, medications: [...prev.medications, ''] }));
  };

  const removeMedicationField = (index) => {
    if (formData.medications.length > 1) {
      const newMedications = formData.medications.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, medications: newMedications }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const treatmentData = {
        symptoms: formData.symptoms.split(',').map(s => s.trim()).filter(s => s),
        diagnosis: formData.diagnosis,
        treatment: formData.treatment,
        labResults: formData.labResults,
        followUpRequired: formData.followUpRequired,
        followUpDate: formData.followUpDate,
        medications: formData.medications.filter(m => m.trim())
      };

      await api.put(`/api/appointments/${appointmentId}/treatment`, treatmentData);
      toast.success('Treatment logged successfully!');
      navigate('/veterinarian-dashboard/appointment-history');
    } catch (err) {
      console.error('Error logging treatment:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.error || 'Failed to log treatment');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 mr-4 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 font-display">Log Treatment</h1>
            {appointment && (
              <p className="text-neutral-600">
                For {appointment.pet?.name} - {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-auto flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700"
          >
            {isEditing ? <FiEye className="w-4 h-4 mr-2" /> : <FiEdit className="w-4 h-4 mr-2" />}
            {isEditing ? 'View Mode' : 'Edit Mode'}
          </button>
        </motion.div>

        {/* Past Treatments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 mb-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          <h2 className="text-lg font-semibold text-neutral-900 font-display mb-4">Past Treatments</h2>
          {pastTreatments.length > 0 ? (
            <div className="space-y-4">
              {pastTreatments.map(treatment => (
                <div key={treatment._id} className="p-4 border rounded-lg border-neutral-200">
                  <p><strong>Date:</strong> {new Date(treatment.date).toLocaleDateString()}</p>
                  <p><strong>Symptoms:</strong> {treatment.symptoms?.join(', ') || 'N/A'}</p>
                  <p><strong>Diagnosis:</strong> {treatment.diagnosis || 'N/A'}</p>
                  <p><strong>Treatment:</strong> {treatment.treatment || 'N/A'}</p>
                  <p><strong>Lab Results:</strong> {treatment.labResults || 'N/A'}</p>
                  <p><strong>Medications:</strong> {treatment.medications?.join(', ') || 'N/A'}</p>
                  <p><strong>Follow-up:</strong> {treatment.followUpRequired ? `Required on ${new Date(treatment.followUpDate).toLocaleDateString()}` : 'Not required'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-600">No past treatments found for this pet.</p>
          )}
        </motion.div>

        {/* Treatment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
        >
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Symptoms */}
              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">
                  Symptoms (comma separated)
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Fever, Cough, Loss of appetite..."
                  className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">
                  Diagnosis
                </label>
                <textarea
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter diagnosis..."
                  className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Treatment */}
              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">
                  Treatment Plan
                </label>
                <textarea
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe the treatment provided..."
                  className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Lab Results */}
              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">
                  Lab Results
                </label>
                <textarea
                  name="labResults"
                  value={formData.labResults}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter lab results..."
                  className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Medications */}
              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">
                  Medications Prescribed
                </label>
                {formData.medications.map((medication, index) => (
                  <div key={index} className="flex items-center mb-2 space-x-2">
                    <input
                      type="text"
                      value={medication}
                      onChange={(e) => handleMedicationChange(index, e.target.value)}
                      placeholder={`Medication ${index + 1}`}
                      className="flex-1 px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    {formData.medications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicationField(index)}
                        className="p-2 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMedicationField}
                  className="flex items-center px-4 py-2 mt-2 text-sm font-medium text-primary-600 rounded-lg hover:bg-primary-50"
                >
                  <FiPlus className="w-4 h-4 mr-1" />
                  Add Medication
                </button>
              </div>

              {/* Follow-up */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="followUpRequired"
                    checked={formData.followUpRequired}
                    onChange={handleInputChange}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label className="font-sans text-sm font-medium text-neutral-700">
                    Follow-up Required
                  </label>
                </div>
                {formData.followUpRequired && (
                  <div>
                    <label className="block mb-2 font-sans text-sm font-medium text-neutral-700">
                      Follow-up Date
                    </label>
                    <input
                      type="date"
                      name="followUpDate"
                      value={formData.followUpDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                )}
              </div>

              {/* Submit buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-neutral-200">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={saving}
                  className="flex items-center px-6 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                >
                  <FiSave className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Treatment'}
                </motion.button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-sans text-sm font-medium text-neutral-700">Symptoms</h3>
                <p className="text-neutral-900">{formData.symptoms || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-sans text-sm font-medium text-neutral-700">Diagnosis</h3>
                <p className="text-neutral-900">{formData.diagnosis || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-sans text-sm font-medium text-neutral-700">Treatment Plan</h3>
                <p className="text-neutral-900">{formData.treatment || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-sans text-sm font-medium text-neutral-700">Lab Results</h3>
                <p className="text-neutral-900">{formData.labResults || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-sans text-sm font-medium text-neutral-700">Medications Prescribed</h3>
                <ul className="list-disc list-inside">
                  {formData.medications.map((med, index) => (
                    <li key={index} className="text-neutral-900">{med || 'N/A'}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-sans text-sm font-medium text-neutral-700">Follow-up</h3>
                <p className="text-neutral-900">
                  {formData.followUpRequired ? `Required on ${formData.followUpDate}` : 'Not required'}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TreatmentLogs;
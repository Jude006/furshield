import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateCare = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    details: '',
  });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`/api/shelter/pets/${petId}/carelogs`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setLogs(response.data.data);
      } catch (error) {
        toast.error('Failed to load care logs');
      }
    };
    fetchLogs();
  }, [petId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/shelter/pets/${petId}/carelogs`, formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Care log added');
      setFormData({ type: '', details: '' });
      // Refresh logs
      const response = await axios.get(`/api/shelter/pets/${petId}/carelogs`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setLogs(response.data.data);
    } catch (error) {
      toast.error('Failed to add care log');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8"
      >
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/animalShelter-dashboard')} className="p-2 mr-4 rounded-lg hover:bg-neutral-100">
            <FiArrowLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <h1 className="text-2xl font-bold text-neutral-900">Update Care Status</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-neutral-700">Log Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select type</option>
              <option value="feeding">Feeding</option>
              <option value="grooming">Grooming</option>
              <option value="medical">Medical</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-neutral-700">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter care details"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors duration-300"
          >
            Add Log
          </button>
        </form>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-neutral-900">Care Logs</h2>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log._id} className="p-4 border rounded-lg border-neutral-200">
                <p className="font-medium text-neutral-800 capitalize">{log.type}</p>
                <p className="text-sm text-neutral-600">{log.details}</p>
                <p className="text-xs text-neutral-500">{new Date(log.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateCare;
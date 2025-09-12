// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { FiUpload, FiPlus, FiMinus } from 'react-icons/fi';

// const AddPets = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     species: '',
//     breed: '',
//     age: '',
//     gender: '',
//     color: '',
//     weight: '',
//     birthDate: '',
//     medicalHistory: [{ condition: '', diagnosis: '', treatment: '', date: '' }],
//   });
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     if (name.startsWith('medicalHistory')) {
//       const field = name.split('.')[1];
//       const newMedicalHistory = [...formData.medicalHistory];
//       newMedicalHistory[index] = { ...newMedicalHistory[index], [field]: value };
//       setFormData({ ...formData, medicalHistory: newMedicalHistory });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const addMedicalRecord = () => {
//     setFormData({
//       ...formData,
//       medicalHistory: [...formData.medicalHistory, { condition: '', diagnosis: '', treatment: '', date: '' }],
//     });
//   };

//   const removeMedicalRecord = (index) => {
//     setFormData({
//       ...formData,
//       medicalHistory: formData.medicalHistory.filter((_, i) => i !== index),
//     });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles(files);
//     const previews = files.map(file => URL.createObjectURL(file));
//     setImagePreviews(previews);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('Please login to add a pet');
//         navigate('/login');
//         return;
//       }
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === 'medicalHistory') {
//           const filteredHistory = value.filter(record => 
//             record.condition || record.diagnosis || record.treatment || record.date
//           );
//           if (filteredHistory.length > 0) {
//             data.append(key, JSON.stringify(filteredHistory));
//           }
//         } else if (value) {
//           data.append(key, value);
//         }
//       });
//       imageFiles.forEach(file => data.append('images', file));
//       await api.post('/api/pets', data);
//       toast.success('Pet added successfully');
//       navigate('/pets-dashboard/my-pets');
//     } catch (err) {
//       console.error('Add pet error:', err);
//       if (err.response?.status === 401) {
//         localStorage.removeItem('token');
//         toast.error('Session expired. Please login again.');
//         navigate('/login');
//       } else {
//         toast.error(err.response?.data?.error || 'Failed to add pet');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-neutral-50">
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <main className="flex-1 p-6 overflow-y-auto">
//           <div className="container max-w-3xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
//                 <form onSubmit={handleSubmit}>
//                   <h2 className="mb-6 text-xl font-bold text-neutral-900 font-display">Pet Details</h2>
//                   <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         placeholder="Enter pet name"
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Species</label>
//                       <select
//                         name="species"
//                         value={formData.species}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                       >
//                         <option value="">Select species</option>
//                         {['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'reptile', 'other'].map(s => (
//                           <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Breed</label>
//                       <input
//                         type="text"
//                         name="breed"
//                         value={formData.breed}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         placeholder="Enter breed"
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Age</label>
//                       <input
//                         type="number"
//                         name="age"
//                         value={formData.age}
//                         onChange={handleInputChange}
//                         required
//                         min="0"
//                         className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         placeholder="Enter age"
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Gender</label>
//                       <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                       >
//                         <option value="">Select gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Color</label>
//                       <input
//                         type="text"
//                         name="color"
//                         value={formData.color}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         placeholder="Enter color (optional)"
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Weight (kg)</label>
//                       <input
//                         type="number"
//                         name="weight"
//                         value={formData.weight}
//                         onChange={handleInputChange}
//                         min="0"
//                         className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         placeholder="Enter weight (optional)"
//                       />
//                     </div>
//                     <div>
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Birth Date</label>
//                       <input
//                         type="date"
//                         name="birthDate"
//                         value={formData.birthDate}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                       />
//                     </div>
//                     <div className="col-span-2">
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Medical History</label>
//                       {formData.medicalHistory.map((record, index) => (
//                         <div key={index} className="p-4 mt-2 border rounded-lg border-neutral-300">
//                           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                             <div>
//                               <label className="block font-sans text-sm font-medium text-neutral-600">Condition</label>
//                               <input
//                                 type="text"
//                                 name={`medicalHistory.condition`}
//                                 value={record.condition}
//                                 onChange={e => handleInputChange(e, index)}
//                                 className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                                 placeholder="Enter condition"
//                               />
//                             </div>
//                             <div>
//                               <label className="block font-sans text-sm font-medium text-neutral-600">Diagnosis</label>
//                               <input
//                                 type="text"
//                                 name={`medicalHistory.diagnosis`}
//                                 value={record.diagnosis}
//                                 onChange={e => handleInputChange(e, index)}
//                                 className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                                 placeholder="Enter diagnosis"
//                               />
//                             </div>
//                             <div>
//                               <label className="block font-sans text-sm font-medium text-neutral-600">Treatment</label>
//                               <input
//                                 type="text"
//                                 name={`medicalHistory.treatment`}
//                                 value={record.treatment}
//                                 onChange={e => handleInputChange(e, index)}
//                                 className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                                 placeholder="Enter treatment"
//                               />
//                             </div>
//                             <div>
//                               <label className="block font-sans text-sm font-medium text-neutral-600">Date</label>
//                               <input
//                                 type="date"
//                                 name={`medicalHistory.date`}
//                                 value={record.date}
//                                 onChange={e => handleInputChange(e, index)}
//                                 className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                               />
//                             </div>
//                           </div>
//                           {formData.medicalHistory.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => removeMedicalRecord(index)}
//                               className="mt-2 font-sans text-sm text-red-600 hover:text-red-700"
//                             >
//                               <FiMinus className="inline mr-1" /> Remove
//                             </button>
//                           )}
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={addMedicalRecord}
//                         className="mt-2 font-sans text-sm text-primary-600 hover:text-primary-700"
//                       >
//                         <FiPlus className="inline mr-1" /> Add Another Record
//                       </button>
//                     </div>
//                     <div className="col-span-2">
//                       <label className="block font-sans text-sm font-medium text-neutral-600">Upload Images</label>
//                       <div className="flex items-center justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed rounded-lg border-neutral-300">
//                         <div className="space-y-1 text-center">
//                           <FiUpload className="w-12 h-12 mx-auto text-neutral-400" />
//                           <div className="flex font-sans text-sm text-neutral-600">
//                             <label
//                               htmlFor="images"
//                               className="relative font-medium bg-white rounded-md cursor-pointer text-primary-600 hover:text-primary-700"
//                             >
//                               <span>Upload images</span>
//                               <input
//                                 id="images"
//                                 name="images"
//                                 type="file"
//                                 multiple
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 className="sr-only"
//                               />
//                             </label>
//                           </div>
//                           <p className="font-sans text-xs text-neutral-500">PNG, JPG up to 10MB</p>
//                         </div>
//                       </div>
//                       {imagePreviews.length > 0 && (
//                         <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
//                           {imagePreviews.map((preview, index) => (
//                             <img
//                               key={index}
//                               src={preview}
//                               alt={`Preview ${index + 1}`}
//                               className="object-cover w-full h-24 rounded-lg"
//                             />
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex justify-end mt-6 space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => navigate('/pets-dashboard/my-pets')}
//                       className="px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className={`px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 font-sans ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     >
//                       {loading ? 'Adding...' : 'Add Pet'}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AddPets;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiUpload, FiPlus, FiMinus } from 'react-icons/fi';

const AddPets = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    color: '',
    weight: '',
    birthDate: '',
    medicalHistory: [{ condition: '', diagnosis: '', treatment: '', date: '' }],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('medicalHistory')) {
      const field = name.split('.')[1];
      const newMedicalHistory = [...formData.medicalHistory];
      newMedicalHistory[index] = { ...newMedicalHistory[index], [field]: value };
      setFormData({ ...formData, medicalHistory: newMedicalHistory });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addMedicalRecord = () => {
    setFormData({
      ...formData,
      medicalHistory: [...formData.medicalHistory, { condition: '', diagnosis: '', treatment: '', date: '' }],
    });
  };

  const removeMedicalRecord = (index) => {
    setFormData({
      ...formData,
      medicalHistory: formData.medicalHistory.filter((_, i) => i !== index),
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add a pet');
        navigate('/login');
        return;
      }
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'medicalHistory') {
          const filteredHistory = value.filter(record => 
            record.condition || record.diagnosis || record.treatment || record.date
          );
          if (filteredHistory.length > 0) {
            data.append(key, JSON.stringify(filteredHistory));
          }
        } else if (value) {
          data.append(key, value);
        }
      });
      imageFiles.forEach(file => data.append('images', file));
      await api.post('/api/pets', data);
      toast.success('Pet added successfully');
      navigate('/pets-dashboard/my-pets');
    } catch (err) {
      console.error('Add pet error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.error || 'Failed to add pet');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
                <form onSubmit={handleSubmit}>
                  <h2 className="mb-6 text-xl font-bold text-neutral-900 font-display">Pet Details</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block font-sans text-sm font-medium text-neutral-600">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter pet name"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-neutral-600">Species</label>
                      <select
                        name="species"
                        value={formData.species}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select species</option>
                        {['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Fish', 'Reptile', 'Other'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-neutral-600">Breed</label>
                      <input
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter breed"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-neutral-600">Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter age"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-neutral-600">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-neutral-600">Color</label>
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter color (optional)"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-neutral-600">Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter weight (optional)"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm font-medium text-neutral-600">Birth Date</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block font-sans text-sm font-medium text-neutral-600">Medical History</label>
                      {formData.medicalHistory.map((record, index) => (
                        <div key={index} className="p-4 mt-2 border rounded-lg border-neutral-300">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <label className="block font-sans text-sm font-medium text-neutral-600">Condition</label>
                              <input
                                type="text"
                                name={`medicalHistory.condition`}
                                value={record.condition}
                                onChange={e => handleInputChange(e, index)}
                                className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Enter condition"
                              />
                            </div>
                            <div>
                              <label className="block font-sans text-sm font-medium text-neutral-600">Diagnosis</label>
                              <input
                                type="text"
                                name={`medicalHistory.diagnosis`}
                                value={record.diagnosis}
                                onChange={e => handleInputChange(e, index)}
                                className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Enter diagnosis"
                              />
                            </div>
                            <div>
                              <label className="block font-sans text-sm font-medium text-neutral-600">Treatment</label>
                              <input
                                type="text"
                                name={`medicalHistory.treatment`}
                                value={record.treatment}
                                onChange={e => handleInputChange(e, index)}
                                className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Enter treatment"
                              />
                            </div>
                            <div>
                              <label className="block font-sans text-sm font-medium text-neutral-600">Date</label>
                              <input
                                type="date"
                                name={`medicalHistory.date`}
                                value={record.date}
                                onChange={e => handleInputChange(e, index)}
                                className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>
                          </div>
                          {formData.medicalHistory.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMedicalRecord(index)}
                              className="mt-2 font-sans text-sm text-red-600 hover:text-red-700"
                            >
                              <FiMinus className="inline mr-1" /> Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addMedicalRecord}
                        className="mt-2 font-sans text-sm text-primary-600 hover:text-primary-700"
                      >
                        <FiPlus className="inline mr-1" /> Add Another Record
                      </button>
                    </div>
                    <div className="col-span-2">
                      <label className="block font-sans text-sm font-medium text-neutral-600">Upload Images</label>
                      <div className="flex items-center justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed rounded-lg border-neutral-300">
                        <div className="space-y-1 text-center">
                          <FiUpload className="w-12 h-12 mx-auto text-neutral-400" />
                          <div className="flex font-sans text-sm text-neutral-600">
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
                          <p className="font-sans text-xs text-neutral-500">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
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
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 space-x-3">
                    <button
                      type="button"
                      onClick={() => navigate('/pets-dashboard/my-pets')}
                      className="px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 font-sans ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading ? 'Adding...' : 'Add Pet'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddPets;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
// import { FaPaw } from 'react-icons/fa';

// const BookAppointment = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     pet: '',
//     veterinarian: '',
//     date: '',
//     time: '',
//     reason: '',
//   });
//   const [pets, setPets] = useState([]);
//   const [vets, setVets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [noVetsAvailable, setNoVetsAvailable] = useState(false);
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('token');
//         if (!token) {
//           toast.error('Please login to book an appointment');
//           navigate('/login');
//           return;
//         }

//         const [petsRes, vetsRes] = await Promise.all([
//           api.get('/api/pets'),
//           api.get('/api/users?vets=true'),
//         ]);

//         setPets(petsRes.data.data);
//         setVets(vetsRes.data.data);
//         if (vetsRes.data.data.length === 0) {
//           setNoVetsAvailable(true);
//         }
//       } catch (err) {
//         if (err.response?.status === 401) {
//           localStorage.removeItem('token');
//           toast.error('Session expired. Please login again.');
//           navigate('/login');
//         } else {
//           toast.error(err.response?.data?.error || 'Failed to load data');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const appointmentData = {
//         ...formData,
//         appointmentTime: `${formData.date}T${formData.time}:00.000Z`,
//       };
//       await api.post('/api/appointments', appointmentData);
//       toast.success('Appointment booked successfully');
//       navigate('/pets-dashboard/appointments');
//     } catch (err) {
//       if (err.response?.status === 401) {
//         localStorage.removeItem('token');
//         toast.error('Session expired. Please login again.');
//         navigate('/login');
//       } else {
//         toast.error(err.response?.data?.error || 'Failed to book appointment');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-neutral-50">
//         <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-neutral-50">
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <main className="flex-1 p-6 overflow-y-auto">
//           <div className="container max-w-2xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-4">
//                   <FaPaw className="w-8 h-8 text-primary-600" />
//                   <h1 className="text-3xl font-bold text-neutral-900 font-display">Book Appointment</h1>
//                 </div>
//                 <button
//                   onClick={() => navigate('/pets-dashboard/appointments')}
//                   className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
//                 >
//                   <FiArrowLeft className="w-4 h-4 mr-2" />
//                   Back to Appointments
//                 </button>
//               </div>
//               <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
//                 {noVetsAvailable ? (
//                   <div className="text-center">
//                     <p className="mb-4 font-sans text-neutral-600">
//                       No veterinarians are currently available. Please try again later or contact support.
//                     </p>
//                     <button
//                       onClick={() => navigate('/pets-dashboard')}
//                       className="px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
//                     >
//                       Return to Dashboard
//                     </button>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                       <div>
//                         <label className="block font-sans text-sm font-medium text-neutral-600">Pet</label>
//                         <select
//                           name="pet"
//                           value={formData.pet}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         >
//                           <option value="">Select pet</option>
//                           {pets.map((pet) => (
//                             <option key={pet._id} value={pet._id}>
//                               {pet.name} ({pet.species})
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block font-sans text-sm font-medium text-neutral-600">Veterinarian</label>
//                         <select
//                           name="veterinarian"
//                           value={formData.veterinarian}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         >
//                           <option value="">Select vet</option>
//                           {vets.map((vet) => (
//                             <option key={vet._id} value={vet._id}>
//                               Dr. {vet.firstName} {vet.lastName} ({vet.specialization})
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block font-sans text-sm font-medium text-neutral-600">Date</label>
//                         <input
//                           type="date"
//                           name="date"
//                           value={formData.date}
//                           onChange={handleInputChange}
//                           required
//                           min={new Date().toISOString().split('T')[0]}
//                           className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block font-sans text-sm font-medium text-neutral-600">Time</label>
//                         <input
//                           type="time"
//                           name="time"
//                           value={formData.time}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                         />
//                       </div>
//                       <div className="col-span-2">
//                         <label className="block font-sans text-sm font-medium text-neutral-600">Reason</label>
//                         <textarea
//                           name="reason"
//                           value={formData.reason}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                           rows="4"
//                           placeholder="Enter reason for appointment"
//                         ></textarea>
//                       </div>
//                     </div>
//                     <div className="flex justify-end mt-6 space-x-3">
//                       <button
//                         type="button"
//                         onClick={() => navigate('/pets-dashboard/appointments')}
//                         className="px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className={`px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                       >
//                         <FiCalendar className="inline w-4 h-4 mr-2" />
//                         {loading ? 'Booking...' : 'Book Appointment'}
//                       </button>
//                     </div>
//                   </form>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default BookAppointment;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pet: '',
    veterinarian: '',
    date: '',
    time: '',
    reason: '',
  });
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noVetsAvailable, setNoVetsAvailable] = useState(false);
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
          toast.error('Please login to book an appointment');
          navigate('/login');
          return;
        }

        const [petsRes, vetsRes] = await Promise.all([
          api.get('/api/pets'),
          api.get('/api/users?vets=true'),
        ]);

        setPets(petsRes.data.data);
        setVets(vetsRes.data.data);
        if (vetsRes.data.data.length === 0) {
          setNoVetsAvailable(true);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.veterinarian) {
      toast.error('Please select a veterinarian');
      return;
    }
    setLoading(true);

    try {
      const appointmentData = {
        ...formData,
        appointmentTime: `${formData.date}T${formData.time}:00.000Z`,
      };
      await api.post('/api/appointments', appointmentData);
      toast.success('Appointment booked successfully');
      navigate('/pets-dashboard/appointments');
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.error || 'Failed to book appointment');
      }
    } finally {
      setLoading(false);
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
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <FaPaw className="w-8 h-8 text-primary-600" />
                  <h1 className="text-3xl font-bold text-neutral-900 font-display">Book Appointment</h1>
                </div>
                <button
                  onClick={() => navigate('/pets-dashboard/appointments')}
                  className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                >
                  <FiArrowLeft className="w-4 h-4 mr-2" />
                  Back to Appointments
                </button>
              </div>
              <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
                {noVetsAvailable ? (
                  <div className="text-center">
                    <p className="mb-4 font-sans text-neutral-600">
                      No veterinarians are currently available. Please try again later or contact support.
                    </p>
                    <button
                      onClick={() => navigate('/pets-dashboard')}
                      className="px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="block font-sans text-sm font-medium text-neutral-600">Pet</label>
                        <select
                          name="pet"
                          value={formData.pet}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="">Select pet</option>
                          {pets.map((pet) => (
                            <option key={pet._id} value={pet._id}>
                              {pet.name} ({pet.species})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-sans text-sm font-medium text-neutral-600">Veterinarian</label>
                        <select
                          name="veterinarian"
                          value={formData.veterinarian}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="">Select vet</option>
                          {vets.map((vet) => (
                            <option key={vet._id} value={vet._id}>
                              Dr. {vet.firstName} {vet.lastName} ({vet.specialization || 'General'})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-sans text-sm font-medium text-neutral-600">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-sm font-medium text-neutral-600">Time</label>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block font-sans text-sm font-medium text-neutral-600">Reason</label>
                        <textarea
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 mt-1 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          rows="4"
                          placeholder="Enter reason for appointment"
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6 space-x-3">
                      <button
                        type="button"
                        onClick={() => navigate('/pets-dashboard/appointments')}
                        className="px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <FiCalendar className="inline w-4 h-4 mr-2" />
                        {loading ? 'Booking...' : 'Book Appointment'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookAppointment;
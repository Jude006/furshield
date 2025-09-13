import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEye, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { FaDog, FaCat, FaPaw } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AppointmentHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        if (!user) {
          toast.error("Please login to view appointment history");
          navigate("/auth/login");
          return;
        }

        const endpoint =
          user.userType === "veterinarian"
            ? `/api/appointments/vet/${user._id}`
            : `/api/appointments`;

        const response = await api.get(endpoint);
        const allAppointments = response.data.data || [];

        const completed = allAppointments.filter(
          (appt) => appt.status?.toLowerCase().trim() === "completed"
        );

        setAppointments(allAppointments);
        setCompletedAppointments(completed);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate, user]);

  const handleError = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      toast.error("Session expired. Please login again.");
      navigate("/auth/login");
    } else {
      toast.error(err.response?.data?.error || "Failed to load appointments");
    }
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "no-show":
        return "bg-red-100 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-800";
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
      <div className="flex flex-col flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center space-x-4">
            <FaPaw className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-neutral-900 font-display">
              Appointment History
            </h1>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {completedAppointments.length} completed appointments
            </span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3"
        >
          <div className="p-6 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
            <div className="text-2xl font-bold text-primary-600 font-display">
              {
                completedAppointments.filter((appt) => {
                  const apptDate = new Date(appt.date);
                  return (
                    apptDate.getMonth() === new Date().getMonth() &&
                    apptDate.getFullYear() === new Date().getFullYear()
                  );
                }).length
              }
            </div>
            <div className="font-sans text-sm text-neutral-600">
              Completed This Month
            </div>
          </div>
          <div className="p-6 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
            <div className="text-2xl font-bold text-green-600 font-display">
              {completedAppointments.length}
            </div>
            <div className="font-sans text-sm text-neutral-600">
              Total Completed
            </div>
          </div>
          <div className="p-6 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
            <div className="text-2xl font-bold text-blue-600 font-display">
              {new Set(appointments.map((appt) => appt.pet?._id)).size}
            </div>
            <div className="font-sans text-sm text-neutral-600">
              Different Pets
            </div>
          </div>
        </motion.div>

        {/* Table */}
        {appointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200"
          >
            <FaPaw className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <h3 className="text-lg font-medium text-neutral-900">
              No appointments found
            </h3>
            <p className="text-neutral-600">
              You don&apos;t have any appointments yet.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                        Pet & Owner
                      </th>
                      <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                        Reason
                      </th>
                      <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                        Status
                      </th>
                      <th className="px-6 py-3 font-sans text-xs font-medium tracking-wider text-left uppercase text-neutral-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    <AnimatePresence>
                      {currentAppointments.map((appointment) => (
                        <motion.tr
                          key={appointment._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="transition-colors duration-200 hover:bg-neutral-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div
                                className={`p-2 rounded-lg mr-3 ${
                                  appointment.pet?.species === "Dog"
                                    ? "bg-blue-100"
                                    : "bg-pink-100"
                                }`}
                              >
                                {appointment.pet?.species === "Dog" ? (
                                  <FaDog className="w-5 h-5 text-blue-600" />
                                ) : (
                                  <FaCat className="w-5 h-5 text-pink-600" />
                                )}
                              </div>
                              <div>
                                <div className="font-sans font-medium text-neutral-900">
                                  {appointment.pet?.name || "N/A"}
                                </div>
                                <div className="font-sans text-sm text-neutral-500">
                                  {appointment.owner?.firstName}{" "}
                                  {appointment.owner?.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-sans text-sm text-neutral-900">
                              {appointment.date
                                ? new Date(
                                    appointment.date
                                  ).toLocaleDateString()
                                : "N/A"}
                            </div>
                            <div className="font-sans text-sm text-neutral-500">
                              {appointment.time || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-sans text-sm whitespace-nowrap text-neutral-900">
                            {appointment.reason}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 font-sans text-xs font-medium rounded-full ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleViewDetails(appointment)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <FiEye className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mt-6"
            >
              <div className="font-sans text-sm text-neutral-700">
                Showing{" "}
                <span className="font-medium">{currentAppointments.length}</span>{" "}
                of <span className="font-medium">{appointments.length}</span>{" "}
                results
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-1 font-sans text-sm font-medium bg-white border rounded-md border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
                >
                  <FiChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-1 font-sans text-sm font-medium bg-white border rounded-md border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
                >
                  Next
                  <FiChevronRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}

        {/* Details Modal */}
        <AnimatePresence>
          {showDetails && selectedAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={() => setShowDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-neutral-900 font-display">
                      Appointment Details
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowDetails(false)}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      <FiX className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <div className="space-y-6">
                    <p className="text-neutral-700 text-sm">
                      Pet: {selectedAppointment.pet?.name} (
                      {selectedAppointment.pet?.species})
                    </p>
                    <p className="text-neutral-700 text-sm">
                      Owner: {selectedAppointment.owner?.firstName}{" "}
                      {selectedAppointment.owner?.lastName}
                    </p>
                    <p className="text-neutral-700 text-sm">
                      Date:{" "}
                      {selectedAppointment.date
                        ? new Date(
                            selectedAppointment.date
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="text-neutral-700 text-sm">
                      Status: {selectedAppointment.status}
                    </p>
                    <p className="text-neutral-700 text-sm">
                      Reason: {selectedAppointment.reason || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppointmentHistory;

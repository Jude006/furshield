import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiSearch, FiFilter, FiEye, FiChevronLeft, FiChevronRight, FiX, FiCalendar, FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaDog, FaCat, FaPaw } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const MyAppointments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
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
          toast.error("Please login to view appointments");
          navigate("/auth/login");
          return;
        }

        const endpoint =
          user.userType === "veterinarian"
            ? `/api/appointments/vet/${user._id}`
            : `/api/appointments`;
        const response = await api.get(endpoint);
        // Filter for upcoming appointments (date >= today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setAppointments(
          response.data.data.filter((appt) => new Date(appt.date) >= today)
        );
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

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      await api.put(`/api/appointments/${appointmentId}/status`, { status });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status } : appt
        )
      );
      toast.success(`Appointment ${status}`);
    } catch (err) {
      toast.error(
        err.response?.data?.error || `Failed to update appointment status`
      );
    }
  };

  const handleReschedule = async (appointmentId) => {
    if (!rescheduleDate || !rescheduleTime) {
      toast.error("Please provide both date and time for rescheduling");
      return;
    }
    try {
      await api.put(`/api/appointments/${appointmentId}`, {
        date: rescheduleDate,
        time: rescheduleTime,
      });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId
            ? { ...appt, date: rescheduleDate, time: rescheduleTime }
            : appt
        )
      );
      setRescheduleAppointment(null);
      setRescheduleDate("");
      setRescheduleTime("");
      toast.success("Appointment rescheduled successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to reschedule appointment"
      );
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await api.delete(`/api/appointments/${appointmentId}`);
        setAppointments((prev) =>
          prev.filter((appt) => appt._id !== appointmentId)
        );
        toast.success("Appointment deleted");
      } catch (err) {
        toast.error(
          err.response?.data?.error || "Failed to delete appointment"
        );
      }
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesFilter = filter === "all" || appointment.status === filter;
    const matchesSearch =
      (appointment.pet?.name?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (appointment.owner?.firstName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (appointment.owner?.lastName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      );
    return matchesFilter && matchesSearch;
  });

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusColor = (status) => {
    switch (status) {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center space-x-4">
            <FaPaw className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-neutral-900 font-display">
              My Appointments
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4"
        >
          <div className="relative flex-1">
            <FiSearch className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by pet or owner name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              <option value="no-show">No-show</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-4 py-2 font-sans border rounded-lg border-neutral-300 hover:bg-neutral-50"
            >
              <FiFilter className="w-4 h-4 mr-2" />
              Filter
            </motion.button>
          </div>
        </motion.div>

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
                  {currentAppointments.length > 0 ? (
                    currentAppointments.map((appointment) => (
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
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="font-sans text-sm text-neutral-500">
                            {appointment.time}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-sans text-sm whitespace-nowrap text-neutral-900">
                          {appointment.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.userType === "veterinarian" ? (
                            <select
                              value={appointment.status}
                              onChange={(e) =>
                                handleUpdateStatus(
                                  appointment._id,
                                  e.target.value
                                )
                              }
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                appointment.status
                              )} font-sans`}
                            >
                              <option value="scheduled">Scheduled</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                                <option value="completed">Completed</option>
                              <option value="no-show">No-show</option>
                            </select>
                          ) : (
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                appointment.status
                              )} font-sans`}
                            >
                              {appointment.status}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                navigate(`/appointments/${appointment._id}`)
                              }
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <FiEye className="w-4 h-4" />
                            </motion.button>
                            {user.userType === "veterinarian" &&
                              appointment.status !== "cancelled" && (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() =>
                                      setRescheduleAppointment(appointment)
                                    }
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    <FiCalendar className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() =>
                                      navigate(
                                        `/veterinarian-dashboard/treatment-logs/${appointment._id}`
                                      )
                                    }
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    <FiEdit className="w-4 h-4" />
                                  </motion.button>
                                </>
                              )}
                            {user.userType !== "veterinarian" &&
                              appointment.status === "scheduled" && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    handleDeleteAppointment(appointment._id)
                                  }
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </motion.button>
                              )}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 font-sans text-center text-neutral-600"
                      >
                        No upcoming appointments found.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mt-6"
        >
          <div className="font-sans text-sm text-neutral-700">
            Showing{" "}
            <span className="font-medium">{currentAppointments.length}</span> of{" "}
            <span className="font-medium">{filteredAppointments.length}</span>{" "}
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

        <AnimatePresence>
          {rescheduleAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={() => setRescheduleAppointment(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-neutral-900 font-display">
                    Reschedule Appointment
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRescheduleAppointment(null)}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <FiX className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block font-sans text-sm font-medium text-neutral-600">
                      New Date
                    </label>
                    <input
                      type="date"
                      value={rescheduleDate}
                      onChange={(e) => setRescheduleDate(e.target.value)}
                      className="w-full py-2 px-3 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm font-medium text-neutral-600">
                      New Time
                    </label>
                    <input
                      type="time"
                      value={rescheduleTime}
                      onChange={(e) => setRescheduleTime(e.target.value)}
                      className="w-full py-2 px-3 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRescheduleAppointment(null)}
                      className="px-4 py-2 font-sans border rounded-lg border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleReschedule(rescheduleAppointment._id)
                      }
                      className="px-4 py-2 font-sans text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                    >
                      Save
                    </motion.button>
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

export default MyAppointments;

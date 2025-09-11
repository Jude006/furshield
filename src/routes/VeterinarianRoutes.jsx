import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../pages/veterinarian/DashboardLayout";
import Dashboard from "../pages/veterinarian/Dashboard";
import MyAppointments from "../pages/veterinarian/MyAppointments";
import AppointmentHistory from "../pages/veterinarian/AppointmentHistory";
import PatientRecords from "../pages/veterinarian/PatientRecords";
import TreatmentLogs from "../pages/veterinarian/TreatmentLogs";
import AvailabilitySchedule from "../pages/veterinarian/AvailabilitySchedule";
import VetProfile from "../pages/veterinarian/VetProfile";
import EarningsReports from "../pages/veterinarian/EarningsReports";
import Settings from "../pages/veterinarian/Settings";
import Notifications from "../pages/veterinarian/Notifications";


const VeterinarianRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<MyAppointments />} />
        <Route path="appointment-history" element={<AppointmentHistory />} />
        <Route path="patient-records" element={<PatientRecords />} />
        <Route path="treatment-logs" element={<TreatmentLogs />} />
        <Route path="availability" element={<AvailabilitySchedule />} />
        <Route path="profile" element={<VetProfile />} />
        <Route path="earnings" element={<EarningsReports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default VeterinarianRoutes;
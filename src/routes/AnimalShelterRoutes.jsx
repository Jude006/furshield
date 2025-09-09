import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../pages/animal-shelter/DashboardLayout";
import Dashboard from "../pages/animal-shelter/Dashboard";
import AdoptablePets from "../pages/animal-shelter/AdoptablePets";
import AddPetForAdoption from "../pages/animal-shelter/AddPetForAdoption";
import ShelterPetProfile from "../pages/animal-shelter/ShelterPetProfile";
import AdoptionApplications from "../pages/animal-shelter/AdoptablePets";
import HealthRecords from "../pages/animal-shelter/HealthRecords";
import CareLogs from "../pages/animal-shelter/CareLogs";
import StaffManagement from "../pages/animal-shelter/StaffManagement";
import ShelterProfile from "../pages/animal-shelter/ShelterProfile";
import Reports from "../pages/animal-shelter/Reports";
import Settings from "../pages/animal-shelter/Settings";
import Notifications from "../pages/animal-shelter/Notifications";

const AnimalShelterRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="adoptable-pets" element={<AdoptablePets />} />
        <Route path="add-pet" element={<AddPetForAdoption />} />
        <Route path="pet/:petId" element={<ShelterPetProfile />} />
        <Route path="adoption-applications" element={<AdoptionApplications />} />
        <Route path="health-records" element={<HealthRecords />} />
        <Route path="care-logs" element={<CareLogs />} />
        <Route path="staff-management" element={<StaffManagement />} />
        <Route path="shelter-profile" element={<ShelterProfile />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default AnimalShelterRoutes;
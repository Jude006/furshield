import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../pages/animal-shelter/DashboardLayout";
import Dashboard from "../pages/animal-shelter/Dashboard";
import ShelterProfile from "../pages/animal-shelter/ShelterProfile";
import Adopters from "../pages/animal-shelter/Adopters";
import UpdateCare from "../pages/animal-shelter/UpdateCare";
import EditPet from "../pages/animal-shelter/EditPet";
import AddPet from "../pages/animal-shelter/AddPets";
import HealthRecords from "../pages/animal-shelter/HealthRecords";
import CareLogs from "../pages/animal-shelter/CareLogs";

const AnimalShelterRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pets/:id/edit" element={<EditPet />} />
        <Route path="/pets/:id/care" element={<UpdateCare />} />
        <Route path="/pets/:petId/adopters" element={<Adopters />} />
        <Route path="/shelter-profile" element={<ShelterProfile />} />
        <Route path="/adoptable-pets" element={<Adopters />} />
        <Route path="/health-records" element={<HealthRecords />} />
        <Route path="/care-logs" element={<CareLogs />} />
      </Route>
    </Routes>
  );
};

export default AnimalShelterRoutes;

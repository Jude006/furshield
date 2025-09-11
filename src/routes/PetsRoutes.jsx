import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../pages/pets/DashboardLayout";
import Dashboard from "../pages/pets/Dashboard";
import MyPets from "../pages/pets/MyPets";
import AddPets from "../pages/pets/AddPets";
import PetProfile from "../pages/pets/PetProfile";
import HealthRecords from "../pages/pets/HealthRecords";
import Appointment from "../pages/pets/Appointment";
import BookAppointment from "../pages/pets/BookAppointment";
import ShoppingCart from "../pages/pets/ShoppingCart";
import Orders from "../pages/pets/Orders";
import CareTips from "../pages/pets/CareTips";
import Settings from "../pages/pets/Settings";
import Notifications from "../pages/pets/Notifications";
import ProductCatalog from "../pages/pets/ProductCatalog";
x
const PetsRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/my-pets" element={<MyPets />} />
        <Route path="/add-pet" element={<AddPets />} />
        <Route path="/pet/:petId" element={<PetProfile />} />
        <Route path="/health-records" element={<HealthRecords />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/care-tips" element={<CareTips />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default PetsRoutes;
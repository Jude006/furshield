import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import VeterinarianRoutes from "./VeterinarianRoutes";
import PetsRoutes from "./PetsRoutes";
import AnimalShelterRoutes from "./AnimalShelterRoutes";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Unauthorized from "../pages/Unauthorized"; 
import AppLayout from "../layouts/AppLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/services" element={<Services />} /> 
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route element={<ProtectedRoutes allowedRoles={["pets"]} />}>
          <Route path="/pets-dashboard/*" element={<PetsRoutes />} />
        </Route>
        
        <Route element={<ProtectedRoutes allowedRoles={["veterinarian"]} />}>
          <Route path="/veterinarian-dashboard/*" element={<VeterinarianRoutes />} />
        </Route>
        
        <Route element={<ProtectedRoutes allowedRoles={["animal"]} />}>
          <Route path="/animalShelter-dashboard/*" element={<AnimalShelterRoutes />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} /> 
                   <Route path="/auth/*" element={<AuthRoutes />} />
          <Route element={<ProtectedRoutes />} allowedRoles={["buyer"]}>
            <Route path="/buyer-dashboard/*" element={<BuyerRoutes />} />
          </Route>
          <Route element={<ProtectedRoutes />} allowedRoles={["farmer"]}>
            <Route path="/farmer-dashboard/*" element={<FarmerRoutes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;

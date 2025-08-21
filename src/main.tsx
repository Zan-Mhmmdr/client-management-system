import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserLogin, UserRegister, Layout } from "./features/authentication";
import DashboardLayout from "./layouts/DashboardLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>

        <Route path="users">

        </Route>
        <Route path="contacts">

        </Route>
      
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

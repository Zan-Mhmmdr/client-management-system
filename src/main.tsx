import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import DashboardLayout from "./layouts/DashboardLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  UserLogin,
  UserRegister,
  Layout,
  UserLogout,
  ProtectedLayout,
} from "./features/authentication";
import {
  ContactCreate,
  ContactDetail,
  ContactEdit,
  ContactList,
  UserProfile,
} from "./features/contacts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/logout" element={<UserLogout />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users">
            <Route path="profile" element={<UserProfile />} />
          </Route>

          <Route path="contacts">
            <Route index element={<ContactList />} />
            <Route path="create" element={<ContactCreate />} />
            <Route path=":id">
              <Route index element={<ContactDetail />} />
              <Route path="edit" element={<ContactEdit />} />

            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

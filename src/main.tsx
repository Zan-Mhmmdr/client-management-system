import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import UserLogin from "./components/User/UserLogin";
import "./style/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<UserLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

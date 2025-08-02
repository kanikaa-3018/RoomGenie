import React from "react";
import MainLayout from "../../client/src/Layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

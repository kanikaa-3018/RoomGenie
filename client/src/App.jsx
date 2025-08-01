import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import React from "react";
import OnboardingForm from "./components/OnboardingForm.jsx";
import LoginPage from "./components/Login.jsx";
import AICallWaiting from "./pages/AICallWaiting.jsx";
import PostCallAnalysis from "./pages/PostCallAnalysis.jsx";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<OnboardingForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ai-call" element={<AICallWaiting />} />
        <Route path="/post-call" element={<PostCallAnalysis />} />
        <Route path="/events" element={<Home />} />
        <Route path="/sponsors" element={<Home />} />
        <Route path="/gallery" element={<Home />} />
        <Route path="/contact" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

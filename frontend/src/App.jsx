import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PredictionHistory from "./pages/PredictionHistory";
import ResumeScores from "./pages/ResumeScores";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import CareerPrediction from "./pages/CareerPrediction";
import SkillAssessment from "./pages/SkillAssessment";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import Roadmap from "./pages/Roadmap";
import MockInterview from "./pages/MockInterview";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import Portfolio from "./pages/Portfolio";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";

// Pages that have their own full-screen layout (no footer)
const FULLSCREEN_ROUTES = ["/login", "/signup"];

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test" element={<Test />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/career" element={<CareerPrediction />} />
          <Route path="/skills" element={<SkillAssessment />} />
          <Route path="/analytics" element={<DashboardAnalytics />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/interview" element={<MockInterview />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/prediction-history" element={<PredictionHistory />} />
          <Route path="/resume-scores" element={<ResumeScores />} />
          <Route path="/analytics-page" element={<AnalyticsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

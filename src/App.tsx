import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ContactPage from './pages/ContactPage';
import DemoPage from './pages/DemoPage';
import SettingsPage from './pages/SettingsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LearningDashboard from './pages/LearningDashboard';
import CoursePage from './pages/CoursePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<RegistrationPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/learning" element={<LearningDashboard />} />
        <Route path="/learning/course/:courseId" element={<CoursePage />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import ContactPage from './pages/ContactPage';
import DemoPage from './pages/DemoPage';
import SettingsPage from './pages/SettingsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LearningDashboard from './pages/LearningDashboard';
import CourseOverviewPage from './pages/CourseOverviewPage';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<RegistrationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/settings" element={
            <ErrorBoundary>
              <SettingsPage />
            </ErrorBoundary>
          } />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/learning" element={
            <ErrorBoundary>
              <LearningDashboard />
            </ErrorBoundary>
          } />
          <Route path="/course-overview/:courseId" element={
            <ErrorBoundary>
              <CourseOverviewPage />
            </ErrorBoundary>
          } />
          <Route path="/learning/course/:courseId" element={
            <ErrorBoundary>
              <CoursePage />
            </ErrorBoundary>
          } />
          <Route path="/learning/lesson/:lessonId" element={
            <ErrorBoundary>
              <LessonPage />
            </ErrorBoundary>
          } />
          <Route path="/blog" element={
            <ErrorBoundary>
              <BlogPage />
            </ErrorBoundary>
          } />
          <Route path="/blog/:slug" element={
            <ErrorBoundary>
              <BlogPostPage />
            </ErrorBoundary>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
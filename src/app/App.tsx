import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { Layout } from '@/app/components/Layout';
import { Dashboard } from '@/app/components/pages/Dashboard';
import { MyCourses } from '@/app/components/pages/MyCourses';
import { Explore } from '@/app/components/pages/Explore';
import { LearningPage } from '@/app/components/pages/LearningPage';
import { Profile } from '@/app/components/pages/Profile';
import { Achievements } from '@/app/components/pages/Achievements';
import { Settings } from '@/app/components/pages/Settings';
import { CourseDetail } from '@/app/components/pages/CourseDetail';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/learning/:courseId" element={<LearningPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

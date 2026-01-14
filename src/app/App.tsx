import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { Layout } from '@/app/components/Layout';
import { Dashboard } from '@/app/components/pages/Dashboard';
import { MyCourses } from '@/app/components/pages/MyCourses';
import { Explore } from '@/app/components/pages/Explore';
import { LearningPage } from '@/app/components/pages/LearningPage';
import { Profile } from '@/app/components/pages/Profile';
import { Achievements } from '@/app/components/pages/Achievements';
import { Settings } from '@/app/components/pages/Settings';
import { CourseDetail } from '@/app/components/pages/CourseDetail';
import { Cart } from '@/app/components/pages/Cart';
import { Order } from '@/app/components/pages/Order';
import { Login } from '@/app/components/pages/Login';
import { Register } from '@/app/components/pages/Register';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Routes that require authentication
function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

      {/* Routes available for both logged in and non-logged in users */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/explore" element={<Layout><Explore /></Layout>} />
      <Route path="/course/:courseId" element={<Layout><CourseDetail /></Layout>} />

      {/* Protected routes - only for authenticated users */}
      <Route path="/my-courses" element={<ProtectedRoute><Layout><MyCourses /></Layout></ProtectedRoute>} />
      <Route path="/learning/:courseId" element={<ProtectedRoute><Layout><LearningPage /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/achievements" element={<ProtectedRoute><Layout><Achievements /></Layout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><Layout><Cart /></Layout></ProtectedRoute>} />
      <Route path="/order" element={<ProtectedRoute><Layout><Order /></Layout></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

import React, { useState } from 'react';
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

type Page = 'dashboard' | 'my-courses' | 'explore' | 'learning' | 'profile' | 'achievements' | 'settings' | 'course-detail';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

  const handleNavigate = (page: string, courseId?: string) => {
    setCurrentPage(page as Page);
    if (courseId) {
      setSelectedCourseId(courseId);
    }
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'my-courses':
        return <MyCourses onNavigate={handleNavigate} />;
      case 'explore':
        return <Explore onNavigate={handleNavigate} />;
      case 'learning':
        return <LearningPage courseId={selectedCourseId || '1'} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      case 'achievements':
        return <Achievements onNavigate={handleNavigate} />;
      case 'settings':
        return <Settings />;
      case 'course-detail':
        return <CourseDetail courseId={selectedCourseId || '1'} onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <Layout currentPage={currentPage} onNavigate={handleNavigate}>
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
}

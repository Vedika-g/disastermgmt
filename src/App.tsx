import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EmergencyProvider } from './context/EmergencyContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { NotificationsDrawer } from './components/layout/NotificationsDrawer';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { LiveGisPage } from './pages/LiveGisPage';
import { RiskAnalysisPage } from './pages/RiskAnalysisPage';
import { AlertsPage } from './pages/AlertsPage';
import { EvacuationPage } from './pages/EvacuationPage';
import { TeamsPage } from './pages/TeamsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { FieldReportsPage } from './pages/FieldReportsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { IntelligencePage } from './pages/IntelligencePage';
import { FieldMobileView } from './pages/FieldMobileView';

export const AppContent: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Persistent Global Header */}
      <Header onOpenNotifications={() => setIsNotificationsOpen(true)} />

      <div className="flex-1 flex w-full relative">
        {/* Navigation Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isMobileOpen={isMobileDrawerOpen}
          setIsMobileOpen={setIsMobileDrawerOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-16 md:pb-6 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/map" element={<LiveGisPage />} />
            <Route path="/risk-analysis" element={<RiskAnalysisPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/evacuation" element={<EvacuationPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/infrastructure" element={<InfrastructurePage />} />
            <Route path="/field-reports" element={<FieldReportsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/intelligence" element={<IntelligencePage />} />
            <Route path="/field-mode" element={<FieldMobileView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav onOpenMenu={() => setIsMobileDrawerOpen(true)} />
    </div>
  );
};

export default function App() {
  return (
    <EmergencyProvider>
      <Router>
        <AppContent />
      </Router>
    </EmergencyProvider>
  );
}

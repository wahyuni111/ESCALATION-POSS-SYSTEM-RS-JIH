import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { PageId } from './components/layout/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { SearchPage } from './pages/SearchPage';
import { RiskDetailPage } from './pages/RiskDetailPage';
import { GuidelinePage } from './pages/GuidelinePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ModelManagerPage } from './pages/ModelManagerPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc-01');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={setCurrentPage}
            onSelectScenario={setSelectedScenarioId}
          />
        );
      case 'search':
        return (
          <SearchPage
            onNavigate={setCurrentPage}
            onSelectScenario={setSelectedScenarioId}
          />
        );
      case 'risk-detail':
        return (
          <RiskDetailPage
            scenarioId={selectedScenarioId}
            onNavigate={setCurrentPage}
            onSelectScenario={setSelectedScenarioId}
          />
        );
      case 'guideline':
        return (
          <GuidelinePage
            scenarioId={selectedScenarioId}
            onSelectScenario={setSelectedScenarioId}
          />
        );
      case 'analytics':
        return (
          <AnalyticsPage
            onNavigate={setCurrentPage}
            onSelectScenario={setSelectedScenarioId}
          />
        );
      case 'model-manager':
        return <ModelManagerPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardPage
            onNavigate={setCurrentPage}
            onSelectScenario={setSelectedScenarioId}
          />
        );
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderCurrentPage()}
    </Layout>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

import React, { useState } from 'react';
import { ActiveTab, UserProfile, HistoricalReport, AIModel, NotificationItem } from './types';
import { initialUser, sampleHistory, sampleLeaderboard, sampleNotifications } from './mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroHome } from './components/HeroHome';
import { DashboardView } from './components/DashboardView';
import { GeneralChat } from './components/GeneralChat';
import { AIChatInterview } from './components/AIChatInterview';
import { VoiceInterview } from './components/VoiceInterview';
import { VideoInterview } from './components/VideoInterview';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { ATSChecker } from './components/ATSChecker';
import { CodingInterview } from './components/CodingInterview';
import { SystemDesignView } from './components/SystemDesignView';
import { BehavioralInterview } from './components/BehavioralInterview';
import { HRInterview } from './components/HRInterview';
import { AnalyticsView } from './components/AnalyticsView';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { ExportReportModal } from './components/ExportReportModal';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini-3.6-flash');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUser);
  const [history, setHistory] = useState<HistoricalReport[]>(sampleHistory);
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [reportModalData, setReportModalData] = useState<any | null>(null);

  const handleGenerateFinalReport = (data: any) => {
    setReportModalData(data);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-900">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        user={userProfile}
        notifications={notifications}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          setUserProfile((prev) => ({ ...prev, isLoggedIn: false }));
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {activeTab === 'home' && (
          <HeroHome
            setActiveTab={setActiveTab}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeTab === 'general-chat' && <GeneralChat />}

        {activeTab === 'dashboard' && (
          <DashboardView
            user={userProfile}
            history={history}
            leaderboard={sampleLeaderboard}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'chat-interview' && (
          <AIChatInterview onGenerateFinalReport={handleGenerateFinalReport} />
        )}

        {activeTab === 'voice-interview' && <VoiceInterview />}

        {activeTab === 'video-interview' && <VideoInterview />}

        {activeTab === 'resume-analyzer' && <ResumeAnalyzer />}

        {activeTab === 'ats-checker' && <ATSChecker />}

        {activeTab === 'coding-interview' && <CodingInterview />}

        {activeTab === 'system-design' && <SystemDesignView />}

        {(activeTab === 'behavioral' || activeTab === 'behavioral-interview') && <BehavioralInterview />}

        {activeTab === 'hr-interview' && <HRInterview />}

        {activeTab === 'analytics' && <AnalyticsView />}

        {(activeTab === 'admin' || activeTab === 'admin-panel') && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Auth Modal */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(userData) => {
            setUserProfile((prev) => ({
              ...prev,
              name: userData.name || prev.name,
              email: userData.email || prev.email,
            }));
            setIsAuthOpen(false);
          }}
        />
      )}

      {/* Final Performance Assessment Certificate Modal */}
      {reportModalData && (
        <ExportReportModal
          data={reportModalData}
          onClose={() => setReportModalData(null)}
        />
      )}
    </div>
  );
}

export default App;

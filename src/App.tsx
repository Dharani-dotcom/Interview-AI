import React, { useState, useEffect } from 'react';
import { ActiveTab, UserProfile, HistoricalReport, AIModel, NotificationItem, UserUsageState } from './types';
import { initialUser, sampleHistory, sampleLeaderboard, sampleNotifications, defaultUserUsage } from './mockData';
import { auth, testConnection, signOutUser, subscribeToUserUsage, consumeFeatureUsage, getUserProfileFromFirestore } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroHome } from './components/HeroHome';
import { DashboardView } from './components/DashboardView';
import { GeneralChat } from './components/GeneralChat';
import { AIChatInterview } from './components/AIChatInterview';
import { VoiceInterview } from './components/VoiceInterview';
import { VoiceCodeTutor } from './components/VoiceCodeTutor';
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
import { SubscriptionModal } from './components/SubscriptionModal';
import { ShieldCheck, Sparkles, Zap, AlertTriangle } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini-3.6-flash');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUser);
  const [userUsage, setUserUsage] = useState<UserUsageState>(defaultUserUsage);
  const [history, setHistory] = useState<HistoricalReport[]>(sampleHistory);
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [blockedFeatureName, setBlockedFeatureName] = useState<string>('');
  const [reportModalData, setReportModalData] = useState<any | null>(null);
  const [showAdminToast, setShowAdminToast] = useState(false);
  const [usageToast, setUsageToast] = useState<{ show: boolean; msg: string; type: 'success' | 'warn' }>({
    show: false,
    msg: '',
    type: 'success',
  });

  // Test Firestore connection on boot and listen to Auth state changes
  useEffect(() => {
    testConnection();

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const firestoreProfile = await getUserProfileFromFirestore(fbUser.uid);
        setUserProfile((prev) => ({
          ...prev,
          id: fbUser.uid,
          name: fbUser.displayName || firestoreProfile?.name || prev.name || 'Candidate',
          email: fbUser.email || firestoreProfile?.email || prev.email || 'user@interviewai.pro',
          avatar: fbUser.photoURL || firestoreProfile?.avatar || prev.avatar,
          targetRole: firestoreProfile?.targetRole || prev.targetRole || 'Senior Full Stack / AI Engineer',
          dailyStreak: firestoreProfile?.dailyStreak || prev.dailyStreak || 1,
          overallScore: firestoreProfile?.overallScore || prev.overallScore || 88,
          totalInterviews: firestoreProfile?.totalInterviews || prev.totalInterviews || 1,
          isLoggedIn: true,
        }));
      } else {
        setUserProfile((prev) => ({
          ...prev,
          isLoggedIn: false,
        }));
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen in real-time to User's Usage and Subscription status in Firestore
  useEffect(() => {
    const currentUid = auth.currentUser?.uid || userProfile.id;
    const emailKey = userProfile.email || 'candidate@techlead.io';
    const userId = currentUid || (userProfile.email ? userProfile.email.replace(/[^a-zA-Z0-9]/g, '_') : 'default-candidate');
    
    const unsubscribeUsage = subscribeToUserUsage(userId, emailKey, (usage) => {
      setUserUsage(usage);
    });

    return () => {
      if (unsubscribeUsage) unsubscribeUsage();
    };
  }, [userProfile.email, userProfile.id]);

  // Global Ctrl + Shift + A shortcut handler for Admin View
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setActiveTab('admin-panel');
        setShowAdminToast(true);
        setTimeout(() => setShowAdminToast(false), 4000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Gatekeeper: Check login status & remaining quota before running any feature
  const verifyAndConsumeUsage = async (featureName: string): Promise<boolean> => {
    // 1. Mandatory Sign In / Sign Up Gate
    if (!userProfile.isLoggedIn && !auth.currentUser) {
      setIsAuthOpen(true);
      setUsageToast({
        show: true,
        msg: `Please sign in with Google or create an account to start! 1 Free practice session included upon sign up.`,
        type: 'warn',
      });
      setTimeout(() => setUsageToast((p) => ({ ...p, show: false })), 5000);
      return false;
    }

    const currentUid = auth.currentUser?.uid || userProfile.id;
    const emailKey = auth.currentUser?.email || userProfile.email || 'candidate@interviewai.pro';
    const userId = currentUid || (emailKey ? emailKey.replace(/[^a-zA-Z0-9]/g, '_') : 'guest-candidate');

    const result = await consumeFeatureUsage(userId, emailKey, featureName);
    if (!result.allowed) {
      setBlockedFeatureName(featureName);
      setIsSubscriptionOpen(true);
      setUsageToast({
        show: true,
        msg: result.message || `Free trial limit reached (1/1 uses). Please unlock a monthly subscription plan (₹99 Starter for 10 uses/mo, ₹699 Medium for 30 uses/mo, or ₹1299 Unlimited/mo).`,
        type: 'warn',
      });
      setTimeout(() => setUsageToast((p) => ({ ...p, show: false })), 5000);
      return false;
    }

    if (!result.isUnlimited) {
      setUsageToast({
        show: true,
        msg: `Session started (${featureName}). ${result.remainingUses} uses remaining in your ${userUsage.planName}.`,
        type: 'success',
      });
      setTimeout(() => setUsageToast((p) => ({ ...p, show: false })), 4000);
    }
    return true;
  };

  const handleGenerateFinalReport = (data: any) => {
    setReportModalData(data);
  };

  const handleLogout = async () => {
    await signOutUser();
    setUserProfile((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-900 relative">
      {/* Usage feedback Toast */}
      {usageToast.show && (
        <div className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
          usageToast.type === 'warn'
            ? 'bg-rose-950 text-white border-rose-500/50'
            : 'bg-slate-900 text-white border-emerald-500/40'
        }`}>
          <div className={`p-2 rounded-xl ${usageToast.type === 'warn' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {usageToast.type === 'warn' ? <AlertTriangle className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-xs font-bold">{usageToast.type === 'warn' ? 'Usage Limit Reached' : 'Real-time Quota Update'}</p>
            <p className="text-[11px] text-slate-300">{usageToast.msg}</p>
          </div>
        </div>
      )}

      {/* Admin shortcut activation toast */}
      {showAdminToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-sky-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold flex items-center gap-1.5">
              <span>Admin Portal Activated!</span>
              <span className="px-1.5 py-0.5 rounded bg-sky-500/30 text-sky-300 text-[10px] font-mono">Ctrl+Shift+A</span>
            </p>
            <p className="text-[11px] text-slate-300">Switched to hidden Admin View management panel.</p>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        user={userProfile}
        userUsage={userUsage}
        notifications={notifications}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSubscription={() => {
          setBlockedFeatureName('');
          setIsSubscriptionOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* TOP LIVE METRICS TICKER MOVING LEFT TO RIGHT */}
      <div className="w-full bg-slate-900 text-slate-200 border-b border-slate-800 py-1.5 overflow-hidden shadow-xs relative z-20">
        <div className="animate-marquee-ltr flex items-center gap-8 text-[11px] font-semibold select-none whitespace-nowrap">
          {/* Set 1 */}
          <span className="inline-flex items-center gap-1.5 text-sky-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <strong className="text-white">98.4%</strong> Offer Success Rate
          </span>
          <span className="inline-flex items-center gap-1.5 text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <strong className="text-white">120K+</strong> Mock Sessions Run
          </span>
          <span className="inline-flex items-center gap-1.5 text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <strong className="text-white">50+ Roles</strong> Software, AI, HR & Systems
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <strong className="text-white">&lt; 1 sec</strong> Real-time AI Latency
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <strong className="text-white">$185k</strong> Avg FAANG Package
          </span>
          <span className="inline-flex items-center gap-1.5 text-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <strong className="text-white">4.9 / 5.0</strong> Candidate Rating
          </span>
          <span className="inline-flex items-center gap-1.5 text-teal-300">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            <strong className="text-white">850+</strong> Hiring Partners
          </span>

          {/* Set 2 (Duplicate for smooth continuous marquee) */}
          <span className="inline-flex items-center gap-1.5 text-sky-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <strong className="text-white">98.4%</strong> Offer Success Rate
          </span>
          <span className="inline-flex items-center gap-1.5 text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <strong className="text-white">120K+</strong> Mock Sessions Run
          </span>
          <span className="inline-flex items-center gap-1.5 text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <strong className="text-white">50+ Roles</strong> Software, AI, HR & Systems
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <strong className="text-white">&lt; 1 sec</strong> Real-time AI Latency
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <strong className="text-white">$185k</strong> Avg FAANG Package
          </span>
          <span className="inline-flex items-center gap-1.5 text-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <strong className="text-white">4.9 / 5.0</strong> Candidate Rating
          </span>
          <span className="inline-flex items-center gap-1.5 text-teal-300">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            <strong className="text-white">850+</strong> Hiring Partners
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {activeTab === 'home' && (
          <HeroHome
            setActiveTab={setActiveTab}
            user={userProfile}
            userUsage={userUsage}
            onOpenSubscription={() => {
              setBlockedFeatureName('');
              setIsSubscriptionOpen(true);
            }}
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
            userUsage={userUsage}
            onOpenSubscription={() => {
              setBlockedFeatureName('');
              setIsSubscriptionOpen(true);
            }}
          />
        )}

        {activeTab === 'chat-interview' && (
          <AIChatInterview 
            onGenerateFinalReport={handleGenerateFinalReport}
            onVerifyUsage={() => verifyAndConsumeUsage('AI Interview Chat')}
          />
        )}

        {activeTab === 'voice-tutor' && (
          <VoiceCodeTutor 
            onVerifyUsage={() => verifyAndConsumeUsage('AI Voice Code Tutor')}
          />
        )}

        {activeTab === 'voice-interview' && (
          <VoiceInterview 
            onVerifyUsage={() => verifyAndConsumeUsage('AI Voice Interview')}
          />
        )}

        {activeTab === 'video-interview' && (
          <VideoInterview 
            onVerifyUsage={() => verifyAndConsumeUsage('AI Video Interview')}
          />
        )}

        {activeTab === 'resume-analyzer' && (
          <ResumeAnalyzer 
            onVerifyUsage={() => verifyAndConsumeUsage('Resume Analyzer')}
          />
        )}

        {activeTab === 'ats-checker' && (
          <ATSChecker 
            onVerifyUsage={() => verifyAndConsumeUsage('ATS Match Checker')}
          />
        )}

        {activeTab === 'coding-interview' && (
          <CodingInterview 
            userUsage={userUsage}
            onVerifyUsage={() => verifyAndConsumeUsage('Coding Sandbox & Tests')}
            onOpenSubscription={() => {
              setBlockedFeatureName('Coding Sandbox & LeetCode Tests');
              setIsSubscriptionOpen(true);
            }}
          />
        )}

        {activeTab === 'system-design' && (
          <SystemDesignView 
            onVerifyUsage={() => verifyAndConsumeUsage('System Design Evaluation')}
          />
        )}

        {(activeTab === 'behavioral' || activeTab === 'behavioral-interview') && (
          <BehavioralInterview 
            onVerifyUsage={() => verifyAndConsumeUsage('Behavioral STAR Assessment')}
          />
        )}

        {activeTab === 'hr-interview' && (
          <HRInterview 
            onVerifyUsage={() => verifyAndConsumeUsage('HR Mock Interview')}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsView />}

        {(activeTab === 'admin' || activeTab === 'admin-panel') && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Subscription Paywall Modal (1 Free Use, ₹499 / ₹1299 / ₹2000 with UPI QR Code) */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        userUsage={userUsage}
        userProfile={userProfile}
        featureBlockedName={blockedFeatureName}
        onSuccess={() => {
          setUsageToast({
            show: true,
            msg: `Subscription payment registered in real-time Firestore database! Your quota has been refreshed.`,
            type: 'success',
          });
          setTimeout(() => setUsageToast((p) => ({ ...p, show: false })), 6000);
        }}
      />

      {/* Auth Modal with Firebase Google OAuth & Firestore Database */}
      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          user={userProfile}
          userUsage={userUsage}
          setUser={setUserProfile}
          onOpenSubscription={() => {
            setIsAuthOpen(false);
            setIsSubscriptionOpen(true);
          }}
          onSuccess={(userData) => {
            setUserProfile((prev) => ({
              ...prev,
              name: userData.name || prev.name,
              email: userData.email || prev.email,
              avatar: userData.avatar || prev.avatar,
              isLoggedIn: true,
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


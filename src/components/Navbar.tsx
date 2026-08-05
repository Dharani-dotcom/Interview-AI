import React, { useState } from 'react';
import { ActiveTab, AIModel, UserProfile, NotificationItem } from '../types';
import {
  Sparkles,
  Bot,
  Mic,
  Video,
  FileText,
  Target,
  Code2,
  Cpu,
  Award,
  BarChart3,
  UserCheck,
  Shield,
  Bell,
  ChevronDown,
  Menu,
  X,
  Layers,
  Heart,
  User,
  LogOut,
  Brain,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedModel: AIModel;
  setSelectedModel: (model: AIModel) => void;
  user: UserProfile;
  notifications: NotificationItem[];
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedModel = 'gemini-3.6-flash',
  setSelectedModel = (_m: AIModel) => {},
  user,
  notifications = [],
  onOpenAuth,
  onLogout = () => {},
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const safeNotifications = notifications || [];
  const unreadCount = safeNotifications.filter((n) => !n.read).length;

  const models: { id: AIModel; label: string; desc: string; badge?: string }[] = [
    { id: 'gemini-3.6-flash', label: 'AI Pro Engine', desc: 'Fastest reasoning & evaluation (Active)', badge: 'Default' },
    { id: 'gpt-4o', label: 'OpenAI GPT-4o', desc: 'Versatile language model', badge: 'Popular' },
    { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', desc: 'Nuanced code & analysis' },
    { id: 'deepseek-r1', label: 'DeepSeek R1', desc: 'Deep technical reasoning' },
    { id: 'groq-llama3', label: 'Groq Llama 3', desc: 'Ultra-low latency responses' },
  ];

  const primaryNavItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'general-chat', label: 'General Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'chat-interview', label: 'Interview Chat', icon: <Bot className="w-4 h-4" /> },
    { id: 'voice-interview', label: 'AI Voice', icon: <Mic className="w-4 h-4" /> },
    { id: 'video-interview', label: 'AI Video', icon: <Video className="w-4 h-4" /> },
    { id: 'resume-analyzer', label: 'Resume', icon: <FileText className="w-4 h-4" /> },
    { id: 'coding-interview', label: 'Coding', icon: <Code2 className="w-4 h-4" /> },
    { id: 'system-design', label: 'System Design', icon: <Cpu className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const secondaryNavItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'ats-checker', label: 'ATS Checker', icon: <Target className="w-4 h-4" /> },
    { id: 'behavioral-interview', label: 'Behavioral', icon: <Heart className="w-4 h-4" /> },
    { id: 'hr-interview', label: 'HR Interview', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'certificate', label: 'Certificates', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sky-600 group-hover:bg-sky-50 transition-colors">
              <Brain className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                AI Interview <span className="text-sky-700">Prep</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium block -mt-1">
                AI Interview & Career Assistant
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            {primaryNavItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-white text-sky-700 shadow-xs border border-slate-200 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Controls Right */}
          <div className="flex items-center gap-2">

            {/* Model Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium transition-colors"
                title="Select AI Model Engine"
              >
                <Bot className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden sm:inline font-mono">{selectedModel === 'gemini-3.6-flash' ? 'AI Pro Engine' : selectedModel}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {showModelDropdown && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-semibold text-slate-900">Select AI Engine</p>
                    <p className="text-[11px] text-slate-500">Powers responses & evaluation engines</p>
                  </div>
                  {models.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedModel(m.id);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between group transition-colors ${
                        selectedModel === m.id
                          ? 'bg-sky-50 text-sky-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{m.label}</span>
                          {m.badge && (
                            <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-sky-100 text-sky-700">
                              {m.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{m.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Icon */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 relative transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
                )}
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-semibold text-slate-900">Notifications</span>
                    <span className="text-[10px] text-sky-600 font-semibold">{unreadCount} unread</span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {safeNotifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                        <p className="font-semibold text-slate-800">{n.title}</p>
                        <p className="text-slate-600 text-[11px] mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 block mt-1">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Auth Button */}
            {user.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-sky-500"
                  />
                  <span className="text-xs font-semibold text-slate-800 hidden md:inline">{user.name}</span>
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50">
                    <div className="p-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-sky-50 text-sky-700 font-semibold border border-sky-200">
                        Pro Member • {user.dailyStreak} Day Streak 🔥
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-sky-600" /> Profile Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="gradient-btn px-4 py-1.5 rounded-lg text-xs font-semibold text-white shadow-xs"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white p-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2">Primary Modules</p>
          <div className="grid grid-cols-2 gap-2">
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
                  activeTab === item.id
                    ? 'bg-sky-50 text-sky-700 border border-sky-200 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 pt-2">Specialized Labs</p>
          <div className="grid grid-cols-2 gap-2">
            {secondaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
                  activeTab === item.id
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

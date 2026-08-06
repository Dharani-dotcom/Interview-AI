import React, { useState, useEffect } from 'react';
import { ActiveTab, WebinarItem } from '../types';
import {
  Sparkles,
  MessageSquare,
  Mic,
  Video,
  FileText,
  Target,
  Code2,
  Cpu,
  Heart,
  UserCheck,
  BarChart3,
  Award,
  ArrowRight,
  CheckCircle2,
  Zap,
  Play,
  Bot,
  Calendar,
  ExternalLink,
  DollarSign,
  X,
  FileSpreadsheet,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';

interface HeroHomeProps {
  setActiveTab: (tab: ActiveTab) => void;
  onQuickDemo?: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ setActiveTab }) => {
  const [webinars, setWebinars] = useState<WebinarItem[]>([]);
  const [loadingWebinars, setLoadingWebinars] = useState(false);

  // Candidate Registration Modal State
  const [selectedWebinar, setSelectedWebinar] = useState<WebinarItem | null>(null);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('Software Engineer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  useEffect(() => {
    const loadWebinars = async () => {
      try {
        setLoadingWebinars(true);
        const res = await fetch('/api/webinars');
        if (res.ok) {
          const data = await res.json();
          setWebinars(data);
        }
      } catch (err) {
        console.error('Failed to load webinars:', err);
      } finally {
        setLoadingWebinars(false);
      }
    };
    loadWebinars();
  }, []);

  const handleOpenRegisterModal = (w: WebinarItem) => {
    setSelectedWebinar(w);
    setRegSubmitted(false);
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setRegRole('Software Engineer');
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWebinar || !regName.trim() || !regEmail.trim()) {
      alert('Please enter your Name and Email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/webinar-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webinarId: selectedWebinar.id,
          webinarName: selectedWebinar.name,
          userName: regName.trim(),
          userEmail: regEmail.trim(),
          userPhone: regPhone.trim(),
          userRole: regRole.trim(),
        }),
      });

      if (res.ok) {
        setRegSubmitted(true);
        setRegisteredIds((prev) => [...prev, selectedWebinar.id]);
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Network error during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      id: 'general-chat',
      title: 'General AI Chat',
      desc: 'Normal conversation, career tips, salary advice, and technical explanations with AI Assistant.',
      icon: <MessageSquare className="w-5 h-5 text-sky-600" />,
      tag: 'AI Assistant'
    },
    {
      id: 'chat-interview',
      tab: 'chat',
      title: 'AI Chat Interview',
      desc: 'Interactive chat simulations for Software, AI, ML, Data, HR & Business roles with single-question focus & feedback.',
      icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
      tag: 'Multi-Role'
    },
    {
      id: 'voice-interview',
      tab: 'voice',
      title: 'AI Voice Interview',
      desc: 'Real-time voice conversation assessing confidence, grammar, filler word count, speaking speed & fluency.',
      icon: <Mic className="w-5 h-5 text-indigo-600" />,
      tag: 'Speech AI'
    },
    {
      id: 'video-interview',
      tab: 'video',
      title: 'AI Video Interview',
      desc: 'Webcam-based avatar simulation tracking eye contact, posture, smile detection & professional visual cues.',
      icon: <Video className="w-5 h-5 text-purple-600" />,
      tag: 'Vision & Pose'
    },
    {
      id: 'resume-analyzer',
      title: 'Resume Analyzer',
      desc: 'Deep AI resume review extracting skills, missing keywords, grammar fixes, and downloadable improved formats.',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      tag: 'ATS Optimization'
    },
    {
      id: 'ats-checker',
      title: 'ATS Score Checker',
      desc: 'Compare your resume against target Job Descriptions to get instant match % and missing keyword suggestions.',
      icon: <Target className="w-5 h-5 text-emerald-600" />,
      tag: 'Job Matching'
    },
    {
      id: 'coding-interview',
      tab: 'code',
      title: 'Coding Interview',
      desc: 'Built-in code editor supporting Python, Java, C++, JS, SQL with hidden test cases and time complexity analysis.',
      icon: <Code2 className="w-5 h-5 text-amber-600" />,
      tag: 'IDE Engine'
    },
    {
      id: 'system-design',
      title: 'System Design',
      desc: 'Interactive whiteboard to construct architecture nodes, DB caching strategies, and scale bottleneck evaluation.',
      icon: <Cpu className="w-5 h-5 text-teal-600" />,
      tag: 'Architecture'
    },
    {
      id: 'behavioral-interview',
      title: 'Behavioral Interview',
      desc: 'STAR method (Situation, Task, Action, Result) breakdown with leadership & conflict resolution scoring.',
      icon: <Heart className="w-5 h-5 text-rose-600" />,
      tag: 'STAR Framework'
    },
    {
      id: 'hr-interview',
      title: 'HR Interview',
      desc: 'Realistic human resources questions evaluating salary negotiations, culture fit, and professional soft skills.',
      icon: <UserCheck className="w-5 h-5 text-fuchsia-600" />,
      tag: 'Culture Fit'
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboard',
      desc: 'Weekly/monthly radar charts tracking strengths, weaknesses, overall score trends, and recommended topics.',
      icon: <BarChart3 className="w-5 h-5 text-sky-600" />,
      tag: 'Deep Insights'
    },
    {
      id: 'certificate',
      title: 'Certificates',
      desc: 'Earn verified Certificates of Completion with unique verification IDs and PDF export for LinkedIn profile.',
      icon: <Award className="w-5 h-5 text-amber-600" />,
      tag: 'Verification'
    },
  ];

  return (
    <div className="space-y-16 pt-4">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700 shadow-xs">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>AI-Powered Interview Platform</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-center">
            <span className="gradient-text">Master Every Technical & Behavioral Interview</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base text-slate-600 font-normal leading-relaxed">
            Practice technical, HR and behavioral interviews through AI Chat, AI Voice and AI Video simulations.
            Get real-time feedback, resume ATS scans, and normal AI conversation.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('general-chat')}
              className="w-full sm:w-auto gradient-btn px-8 py-3 rounded-xl font-bold text-xs text-white shadow-md flex items-center justify-center gap-2 group"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Normal AI Chat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('chat-interview')}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 text-sky-600 fill-sky-600" />
              <span>Mock Interview</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
            <div className="p-4 rounded-xl glass-card border-slate-200 shadow-xs">
              <p className="text-2xl font-bold text-sky-600">98.4%</p>
              <p className="text-xs text-slate-500 mt-1">Offer Success Rate</p>
            </div>
            <div className="p-4 rounded-xl glass-card border-slate-200 shadow-xs">
              <p className="text-2xl font-bold text-blue-600">120K+</p>
              <p className="text-xs text-slate-500 mt-1">Mock Sessions Run</p>
            </div>
            <div className="p-4 rounded-xl glass-card border-slate-200 shadow-xs">
              <p className="text-2xl font-bold text-indigo-600">50+ Roles</p>
              <p className="text-xs text-slate-500 mt-1">Tech & Executive</p>
            </div>
            <div className="p-4 rounded-xl glass-card border-slate-200 shadow-xs">
              <p className="text-2xl font-bold text-emerald-600">&lt; 1 sec</p>
              <p className="text-xs text-slate-500 mt-1">AI Response Latency</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900">Professional Interview Preparation Modules</h2>
          <p className="text-slate-500 text-xs max-w-xl mx-auto">
            Everything you need to prepare for top tech companies and accelerate your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className="glass-card glass-card-hover p-6 rounded-2xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-sky-400 transition-colors">
                    {item.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-700">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600 group-hover:translate-x-1 transition-transform">
                <span>Open Module</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE WEBINARS & MASTERCLASSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white shadow-xl border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-bold border border-sky-500/30 mb-3">
                <Video className="w-3.5 h-3.5 text-sky-400" />
                <span>Live Masterclasses & Career Webinars</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Upcoming Live Webinars
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Learn directly from industry leaders, senior engineering directors, and talent executives.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Total Webinars Scheduled: </span>
              <span className="text-sm font-bold text-sky-400">{webinars.length}</span>
            </div>
          </div>

          {loadingWebinars ? (
            <div className="py-12 text-center text-xs text-slate-400 animate-pulse">
              Loading live upcoming webinars...
            </div>
          ) : webinars.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No upcoming webinars scheduled at the moment. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinars.map((w) => {
                const isRegistered = registeredIds.includes(w.id);

                return (
                  <div
                    key={w.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-all hover:shadow-lg hover:shadow-sky-500/5 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          w.price.toLowerCase() === 'free'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {w.price} Ticket
                        </span>
                        <span className="text-[10px] text-sky-400 font-semibold flex items-center gap-1">
                          <Video className="w-3 h-3" /> Live Session
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                        {w.name}
                      </h3>

                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span className="text-[11px] font-medium">{w.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="text-[11px] text-slate-300">Host: <strong className="text-white">{w.sourceManName}</strong></span>
                        </div>
                      </div>

                      {w.gformLink && (
                        <div className="pt-1">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
                            <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                            Google Form Registration Included
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <button
                        onClick={() => handleOpenRegisterModal(w)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all ${
                          isRegistered
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'gradient-btn text-white hover:opacity-95'
                        }`}
                      >
                        {isRegistered ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Registered — View Details</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-3.5 h-3.5" />
                            <span>Register for Webinar</span>
                          </>
                        )}
                      </button>

                      {w.meetingLink && (
                        <a
                          href={w.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-[11px] font-medium flex items-center justify-center gap-1.5 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 text-purple-400" />
                          <span>Direct Meeting URL</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CANDIDATE WEBINAR REGISTRATION MODAL */}
        {selectedWebinar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="glass-card max-w-md w-full p-6 rounded-3xl border-slate-700 bg-slate-900 text-white shadow-2xl relative space-y-5">
              {/* Close button */}
              <button
                onClick={() => setSelectedWebinar(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {!regSubmitted ? (
                <>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/30">
                      <Video className="w-3 h-3 text-sky-400" />
                      <span>Webinar Registration</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white leading-snug">
                      {selectedWebinar.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Hosted by <strong className="text-white">{selectedWebinar.sourceManName}</strong> • {selectedWebinar.date}
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-emerald-400" /> Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-indigo-400" /> Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 000-1234"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                      />
                    </div>

                    {/* Target Job Role */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-purple-400" /> Target Job Role / Focus
                      </label>
                      <input
                        type="text"
                        value={regRole}
                        onChange={(e) => setRegRole(e.target.value)}
                        placeholder="e.g. Fullstack Engineer, Data Scientist, HR Manager"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl gradient-btn text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Registering...' : 'Complete Registration'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="space-y-5 text-center py-2 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Registration Successful!</h3>
                    <p className="text-xs text-slate-300">
                      Thank you, <strong className="text-white">{regName}</strong>! You have successfully registered for:
                    </p>
                    <p className="text-xs font-semibold text-sky-300 py-1">{selectedWebinar.name}</p>
                    <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 text-[11px] text-emerald-300 flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>You will get notified in email at <strong className="text-white font-mono">{regEmail}</strong> before the event starts.</span>
                    </div>
                  </div>

                  {selectedWebinar.gformLink && (
                    <div className="pt-1">
                      <a
                        href={selectedWebinar.gformLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-colors"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Optional: Fill Google Form</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedWebinar(null)}
                    className="w-full py-3 rounded-xl gradient-btn text-white text-xs font-bold shadow-lg hover:opacity-95 transition-all mt-2"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

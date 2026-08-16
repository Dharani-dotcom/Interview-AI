import React, { useState, useEffect } from 'react';
import { ActiveTab, WebinarItem, UserUsageState, UserProfile } from '../types';
import { pricingPlans } from '../mockData';
import { subscribeToWebinars, saveWebinarRegistrationToFirestore } from '../lib/firebase';
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
  Briefcase,
  QrCode,
  BookOpen,
  Copy,
  Check,
  IndianRupee,
  ShieldCheck,
  Smartphone,
  Lock,
  CheckCheck
} from 'lucide-react';

interface HeroHomeProps {
  setActiveTab: (tab: ActiveTab) => void;
  onQuickDemo?: () => void;
  userUsage?: UserUsageState;
  user?: UserProfile;
  onOpenSubscription?: () => void;
  onOpenAuth?: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ 
  setActiveTab, 
  userUsage, 
  user,
  onOpenSubscription = () => {},
  onOpenAuth = () => {} 
}) => {
  const [webinars, setWebinars] = useState<WebinarItem[]>([]);
  const [loadingWebinars, setLoadingWebinars] = useState(false);

  // Candidate Registration Modal State
  const [selectedWebinar, setSelectedWebinar] = useState<WebinarItem | null>(null);
  const [regStep, setRegStep] = useState<'details' | 'payment' | 'submitted'>('details');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('Software Engineer');
  const [regUtr, setRegUtr] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  useEffect(() => {
    setLoadingWebinars(true);
    // Real-time listener: Any change made by Admin on ANY phone/device in the universe is reflected here immediately!
    const unsubscribe = subscribeToWebinars((data) => {
      setWebinars(data);
      setLoadingWebinars(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleOpenRegisterModal = (w: WebinarItem) => {
    setSelectedWebinar(w);
    setRegStep('details');
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setRegRole('Software Engineer');
    setRegUtr('');
    setCopiedUpi(false);
  };

  const handleDetailsNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWebinar || !regName.trim() || !regEmail.trim()) {
      alert('Please enter your Name and Email address.');
      return;
    }

    if (selectedWebinar.price && selectedWebinar.price.toLowerCase() !== 'free') {
      setRegStep('payment');
    } else {
      executeRegistrationSubmit('Free', '');
    }
  };

  const executeRegistrationSubmit = async (amount: string, utrVal: string) => {
    if (!selectedWebinar) return;

    if (selectedWebinar.price && selectedWebinar.price.toLowerCase() !== 'free') {
      if (!utrVal || utrVal.trim().length < 4) {
        alert('Please enter your UPI Transaction / UTR Reference ID (found in your UPI app payment receipt) to complete registration.');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const regPayload = {
        webinarId: selectedWebinar.id,
        webinarName: selectedWebinar.name,
        userName: regName.trim(),
        userEmail: regEmail.trim().toLowerCase(),
        userPhone: regPhone.trim(),
        userRole: regRole.trim(),
        utr: utrVal.trim() || 'UPI_QR_SCANNED',
        amountPaid: amount || selectedWebinar.price || '₹100',
        paymentRecipient: 'priyadha1988@oksbi (priyadha 1988)',
        registeredAt: new Date().toISOString()
      };

      // 1. Save directly to Firestore for instantaneous Admin visibility on all devices
      await saveWebinarRegistrationToFirestore(regPayload);

      // 2. Also notify server as backup
      try {
        await fetch('/api/webinar-registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regPayload),
        });
      } catch (err) {
        // Fallback
      }

      setRegStep('submitted');
      setRegisteredIds((prev) => [...prev, selectedWebinar.id]);
    } catch (err) {
      console.error('Registration error:', err);
      alert('Network error during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText('priyadha1988@oksbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const features = [
    {
      id: 'voice-tutor',
      tab: 'voice-tutor',
      title: 'AI Voice Tutor & Code Board',
      desc: 'AI Voice teacher explaining Java, Python, RAG, Gen AI, SQL & System Design on an interactive virtual code whiteboard.',
      icon: <BookOpen className="w-5 h-5 text-sky-600" />,
      tag: 'Voice Code Board'
    },
    {
      id: 'general-chat',
      title: 'General AI Chat',
      desc: 'Unlimited free conversations, career tips, salary advice, code snippets, and technical explanations with AI Assistant.',
      icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
      tag: '100% Free'
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
            {!user?.isLoggedIn ? (
              <>
                <button
                  onClick={onOpenAuth}
                  className="w-full sm:w-auto gradient-btn px-8 py-3.5 rounded-xl font-bold text-xs text-white shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Sign In / Sign Up (1 Free Practice Included)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('general-chat')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-sky-600" />
                  <span>Normal AI Chat</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('chat-interview')}
                  className="w-full sm:w-auto gradient-btn px-8 py-3.5 rounded-xl font-bold text-xs text-white shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Start Mock Interview</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('coding-interview')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Code2 className="w-4 h-4 text-sky-600" />
                  <span>Coding Sandbox & LeetCode</span>
                </button>
              </>
            )}
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
              onClick={() => {
                if (!user?.isLoggedIn && item.id !== 'general-chat') {
                  onOpenAuth();
                } else {
                  setActiveTab(item.id as ActiveTab);
                }
              }}
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
                <span>
                  {item.id === 'general-chat'
                    ? 'Open Free Chat'
                    : user?.isLoggedIn
                    ? 'Open Module'
                    : 'Sign In to Unlock (1 Free Use)'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SUBSCRIPTION PLANS & UPI QR PRICING TIERS SECTION         */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 relative overflow-hidden space-y-8">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Simple Transparent Pricing • Real-time UPI QR Activation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Unlock Full AI Interview & Coding Access
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Start with 1 free trial session across any module. Upgrade anytime to access coding sandboxes, mock voice/video interviews, ATS resume diagnostics, and system design evaluations.
              </p>
            </div>

            {userUsage && (
              <div className="bg-slate-950/80 border border-slate-700/80 p-3.5 rounded-2xl flex items-center gap-3 shrink-0">
                <div className={`p-2 rounded-xl ${
                  userUsage.isUnlimited ? 'bg-purple-500/20 text-purple-400' : userUsage.remainingUses > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Your Active Plan</p>
                  <p className="text-xs font-bold text-white">
                    {userUsage.planName} ({userUsage.isUnlimited ? 'Unlimited' : `${userUsage.remainingUses}/${userUsage.totalAllowedUses} uses left`})
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pricing cards grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => {
              const isCurrent = userUsage?.planId === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all relative ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-sky-950/80 to-slate-950 border-sky-500/60 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-[10px] font-extrabold shadow-md tracking-wider uppercase">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">{plan.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-semibold">
                        {plan.badge || 'Monthly'}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">₹{plan.price}</span>
                        <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
                      </div>
                      <p className="text-xs font-semibold text-amber-300 mt-1 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>{plan.allowedUses === -1 ? 'Unlimited Uses (All Modules)' : `${plan.allowedUses} Uses / Month`}</span>
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-800/80">
                    <button
                      onClick={onOpenSubscription}
                      className={`w-full py-3 rounded-2xl text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : plan.isPopular
                            ? 'gradient-btn text-white hover:opacity-95'
                            : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-amber-300" />
                      <span>{isCurrent ? 'Current Plan (Renew / Manage)' : `Subscribe for ₹${plan.price}`}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                All payments are verified in the real-time Firestore database using UPI ID: <strong className="text-amber-300 font-mono">priyadha1988@oksbi</strong>.
              </span>
            </div>
            <button
              onClick={onOpenSubscription}
              className="text-sky-400 hover:text-sky-300 font-bold underline shrink-0 cursor-pointer"
            >
              Open Payment Scanner & UTR Form →
            </button>
          </div>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
            <div className="glass-card max-w-md w-full p-6 rounded-3xl border-slate-700 bg-slate-900 text-white shadow-2xl relative space-y-5 my-8">
              {/* Close button */}
              <button
                onClick={() => setSelectedWebinar(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* STEP 1: CANDIDATE DETAILS FORM */}
              {regStep === 'details' && (
                <>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/30">
                      <Video className="w-3 h-3 text-sky-400" />
                      <span>Webinar Registration</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white leading-snug">
                      {selectedWebinar.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Hosted by <strong className="text-white">{selectedWebinar.sourceManName}</strong></span>
                      <span className="font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {selectedWebinar.price || '₹100'}
                      </span>
                    </p>
                  </div>

                  <form onSubmit={handleDetailsNext} className="space-y-4">
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
                        placeholder="e.g. +91 98765 43210"
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
                      className="w-full py-3 rounded-xl gradient-btn text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all"
                    >
                      {selectedWebinar.price && selectedWebinar.price.toLowerCase() !== 'free' ? (
                        <>
                          <QrCode className="w-4 h-4 text-amber-300" />
                          <span>Proceed to Pay {selectedWebinar.price || '₹100'} via UPI QR</span>
                        </>
                      ) : (
                        <span>Complete Free Registration</span>
                      )}
                    </button>
                  </form>
                </>
              )}

              {/* STEP 2: UPI QR PAYMENT SCREEN */}
              {regStep === 'payment' && (
                <div className="space-y-4 text-center animate-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <button
                      onClick={() => setRegStep('details')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      ← Back
                    </button>
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5" /> Amount: {selectedWebinar.price || '₹100'}
                    </span>
                  </div>

                  {/* Google Pay / UPI Card matching user's exact uploaded image */}
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 shadow-inner space-y-4 relative overflow-hidden">
                    {/* Top profile avatar */}
                    <div className="flex flex-col items-center space-y-1.5">
                      <div className="w-10 h-10 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-sm shadow-md border border-slate-600">
                        p
                      </div>
                      <h4 className="text-sm font-bold text-slate-100 tracking-wide">
                        priyadha 1988
                      </h4>
                    </div>

                    {/* QR Code Container with Center Logo & White Card background */}
                    <div className="bg-white rounded-2xl p-4 shadow-xl inline-block mx-auto relative group">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                          `upi://pay?pa=priyadha1988@oksbi&pn=priyadha%201988&am=${
                            selectedWebinar.price?.replace(/[^0-9]/g, '') || '100'
                          }&cu=INR&tn=Webinar%20Registration`
                        )}`}
                        alt="Scan to pay with any UPI app"
                        className="w-52 h-52 object-contain mx-auto rounded"
                      />
                      {/* Center GPay style badge */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-9 h-9 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center p-1">
                          <span className="text-[10px] font-extrabold tracking-tighter text-blue-600">GPay</span>
                        </div>
                      </div>
                    </div>

                    {/* UPI ID Info & Copy Button */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs font-mono font-semibold text-slate-300 bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-800">
                          UPI ID: <strong className="text-amber-300">priyadha1988@oksbi</strong>
                        </span>
                        <button
                          onClick={copyUpiId}
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                          title="Copy UPI ID"
                        >
                          {copiedUpi ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-400 font-medium">
                        Scan to pay with any UPI app (GPay, PhonePe, Paytm, BHIM)
                      </p>
                    </div>

                    {/* Direct mobile deep link */}
                    <a
                      href={`upi://pay?pa=priyadha1988@oksbi&pn=priyadha%201988&am=${
                        selectedWebinar.price?.replace(/[^0-9]/g, '') || '100'
                      }&cu=INR&tn=Webinar%20Registration`}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open UPI App on Phone (Pay {selectedWebinar.price || '₹100'})</span>
                    </a>
                  </div>

                  {/* Transaction ID / UTR (Required) */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[11px] font-semibold text-slate-200 flex items-center justify-between">
                      <span>Enter Transaction ID / UTR Ref No <span className="text-rose-400 font-bold">*</span></span>
                      <span className="text-[10px] text-amber-400 font-normal">Required to confirm payment</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regUtr}
                      onChange={(e) => setRegUtr(e.target.value)}
                      placeholder="e.g. 12-digit UTR No from GPay / PhonePe"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500 font-mono focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                    <p className="text-[10px] text-slate-400 leading-tight">
                      * Open your UPI app (GPay/PhonePe/Paytm), complete payment to <span className="text-slate-200 font-mono">priyadha1988@oksbi</span>, then copy & paste the 12-digit Transaction/UTR No above.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      executeRegistrationSubmit(selectedWebinar.price || '₹100', regUtr)
                    }
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl gradient-btn text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>{isSubmitting ? 'Verifying Payment...' : `Verify Transaction & Complete Registration`}</span>
                  </button>
                </div>
              )}

              {/* STEP 3: REGISTRATION SUCCESSFUL */}
              {regStep === 'submitted' && (
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

                    <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-center gap-2 shadow-sm">
                      <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>You will get notified in email at <strong className="text-white font-mono">{regEmail}</strong> before the event starts.</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-300 space-y-1 text-left font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Transaction ID:</span>
                        <strong className="text-amber-300">{regUtr || 'UPI_QR_SCANNED'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Amount Paid:</span>
                        <span className="text-emerald-400 font-bold">{selectedWebinar.price || '₹100'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Paid To:</span>
                        <span className="text-slate-200">priyadha1988@oksbi</span>
                      </div>
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

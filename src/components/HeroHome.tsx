import React, { useState, useEffect } from 'react';
import { ActiveTab, WebinarItem, UserUsageState, UserProfile } from '../types';
import { pricingPlans } from '../mockData';
import { subscribeToWebinars, saveWebinarRegistrationToFirestore } from '../lib/firebase';
import { launchUpiPaymentApp, getUniversalUpiUri } from '../lib/upiPayment';
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
  CheckCheck,
  Brain,
  GraduationCap,
  Bug
} from 'lucide-react';
import { InterviewProductShowcase } from './InterviewProductShowcase';

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
  const [clickedModuleId, setClickedModuleId] = useState<string | null>(null);

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
        paymentRecipient: 'Vettingly Direct UPI (Protected Merchant)',
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
    launchUpiPaymentApp('gpay', selectedWebinar?.price?.replace(/[^0-9]/g, '') || '100', 'Vettingly Webinar Registration');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const features = [
    {
      id: 'debug-interview',
      tab: 'debug-interview',
      title: 'AI Bug-Hunting & Fix Wrong Code (32 Qs)',
      desc: 'Given broken production & interview code across 32 Basic-to-High challenges (Python, JS, Java, C++, SQL). Spot the buggy line, fix the code, and get live Socratic AI help!',
      icon: <Bug className="w-5 h-5 text-rose-600" />,
      tag: '32 Bug Challenges'
    },
    {
      id: 'aptitude-reasoning',
      tab: 'aptitude-reasoning',
      title: 'Aptitude & Reasoning Arena',
      desc: 'Company-specific Quantitative Aptitude, Logical Reasoning, Verbal Ability & Core ECE/EEE questions from Google, Microsoft, TCS, Infosys & Honeywell.',
      icon: <GraduationCap className="w-5 h-5 text-amber-500" />,
      tag: 'Company Tests'
    },
    {
      id: 'ai-coach',
      tab: 'ai-coach',
      title: 'AI Coach: Agent Masterclass',
      desc: 'Interactive video-style animated flowcharts teaching Autonomous AI Agents, ReAct loops, multi-agent supervisors & memory grounding with live code and AI speech.',
      icon: <Brain className="w-5 h-5 text-sky-600" />,
      tag: 'New Flowchart Video'
    },
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
        {/* Dynamic Background Aura & Suited Executive Figure Moving Behind Headline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          {/* Ambient Radial Glow Backdrop */}
          <div className="absolute w-[600px] h-[350px] bg-gradient-to-r from-sky-300/25 via-indigo-300/20 to-purple-300/25 rounded-full blur-3xl animate-suit-glow transform -translate-y-6" />

          {/* Suited Person Moving Left-to-Right Behind Headline */}
          <div className="animate-suit-person relative flex flex-col items-center justify-center opacity-30 sm:opacity-40 hover:opacity-75 transition-opacity duration-700 select-none transform -translate-y-4">
            
            {/* Suited Professional Silhouette & Render */}
            <div className="relative w-48 sm:w-64 h-64 sm:h-80 flex flex-col items-center justify-end">
              {/* Head & Hair */}
              <div className="w-16 sm:w-20 h-20 sm:h-24 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-2xl relative flex items-center justify-center overflow-hidden">
                {/* Hair cut contour */}
                <div className="absolute top-0 inset-x-0 h-7 bg-slate-950 rounded-b-xl" />
                {/* Subtle Facial silhouette features */}
                <div className="w-8 h-8 rounded-full bg-slate-700/60 border border-slate-600/40 mt-3" />
                {/* Executive Headset / Mic indicator */}
                <div className="absolute right-1 bottom-4 w-4 h-1.5 bg-sky-400 rounded-full animate-pulse shadow-sm" />
              </div>

              {/* Collar & Tie Layer */}
              <div className="w-20 sm:w-24 h-8 bg-slate-100 flex items-center justify-center relative -mt-2 rounded-t-lg z-10 shadow-md">
                {/* White Dress Shirt V-Neck */}
                <div className="w-8 h-full bg-white flex justify-center">
                  {/* Sky/Indigo Striped Silk Tie */}
                  <div className="w-3.5 h-12 bg-gradient-to-b from-sky-600 to-indigo-800 rounded-b-md shadow-xs" />
                </div>
              </div>

              {/* Bespoke Black Suit Blazer / Torso */}
              <div className="w-44 sm:w-56 h-40 sm:h-48 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-t-3xl border-t-2 border-x-2 border-slate-700/80 shadow-2xl relative flex justify-between px-3 pt-2">
                {/* Left Lapel */}
                <div className="w-10 sm:w-12 h-32 bg-slate-900 border-r border-slate-800 transform rotate-6 rounded-tl-xl shadow-md flex items-start justify-center pt-3">
                  {/* Pocket Square */}
                  <div className="w-4 h-1.5 bg-sky-400 rounded-xs shadow-xs" />
                </div>

                {/* Center Buttons & Slit */}
                <div className="flex flex-col items-center justify-start gap-4 pt-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-600 shadow-inner" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-600 shadow-inner" />
                </div>

                {/* Right Lapel */}
                <div className="w-10 sm:w-12 h-32 bg-slate-900 border-l border-slate-800 transform -rotate-6 rounded-tr-xl shadow-md" />
              </div>

              {/* Floating Coach Role Badge */}
              <div className="absolute -top-4 px-3 py-1 rounded-full bg-slate-900/90 text-sky-300 border border-sky-500/40 text-[10px] font-mono font-bold tracking-wide shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                <span>AI Interviewer & Coach</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50/90 backdrop-blur-xs border border-sky-200 text-xs font-bold text-sky-700 shadow-xs">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>AI-Powered Interview Platform</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] text-center drop-shadow-xs">
            <span className="gradient-text">Master Every Technical & Behavioral Interview</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base text-slate-700 font-medium leading-relaxed bg-white/60 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none rounded-xl p-2 sm:p-0">
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
                  <span>Sign In / Sign Up (2 Free Practices Included)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('general-chat')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-sky-600" />
                  <span>Normal AI Chat</span>
                </button>

                <button
                  onClick={() => setActiveTab('debug-interview')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Bug className="w-4 h-4 text-rose-100" />
                  <span>Fix Wrong Code (32 Qs)</span>
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

                <button
                  onClick={() => setActiveTab('debug-interview')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Bug className="w-4 h-4 text-rose-100" />
                  <span>Fix Wrong Code (32 Qs)</span>
                </button>
              </>
            )}
          </div>

          {/* JUMPING & ANIMATED STATS CARDS */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
            <div className="p-4 rounded-xl glass-card border-sky-200/80 shadow-sm transition-all hover:scale-105 animate-jump group cursor-default">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>
              <p className="text-3xl font-extrabold text-sky-600 tracking-tight group-hover:text-sky-500 transition-colors">
                98.4%
              </p>
              <p className="text-xs font-semibold text-slate-700 mt-1">Offer Success Rate</p>
              <p className="text-[10px] text-slate-400">FAANG & Top Tech</p>
            </div>

            <div className="p-4 rounded-xl glass-card border-blue-200/80 shadow-sm transition-all hover:scale-105 animate-jump-delayed-1 group cursor-default">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Active
                </span>
              </div>
              <p className="text-3xl font-extrabold text-blue-600 tracking-tight group-hover:text-blue-500 transition-colors">
                120K+
              </p>
              <p className="text-xs font-semibold text-slate-700 mt-1">Mock Sessions Run</p>
              <p className="text-[10px] text-slate-400">Global Candidates</p>
            </div>

            <div className="p-4 rounded-xl glass-card border-indigo-200/80 shadow-sm transition-all hover:scale-105 animate-jump-delayed-2 group cursor-default">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                  Coverage
                </span>
              </div>
              <p className="text-3xl font-extrabold text-indigo-600 tracking-tight group-hover:text-indigo-500 transition-colors">
                50+ Roles
              </p>
              <p className="text-xs font-semibold text-slate-700 mt-1">Tech & Executive</p>
              <p className="text-[10px] text-slate-400">Junior to Staff Level</p>
            </div>

            <div className="p-4 rounded-xl glass-card border-emerald-200/80 shadow-sm transition-all hover:scale-105 animate-jump-delayed-3 group cursor-default">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Real-time
                </span>
              </div>
              <p className="text-3xl font-extrabold text-emerald-600 tracking-tight group-hover:text-emerald-500 transition-colors">
                &lt; 1 sec
              </p>
              <p className="text-xs font-semibold text-slate-700 mt-1">AI Response Latency</p>
              <p className="text-[10px] text-slate-400">Instant Lip-Sync & Speech</p>
            </div>
          </div>
        </div>

        {/* CONTINUOUS LEFT-TO-RIGHT LIVE METRICS TICKER MARQUEE */}
        <div className="mt-8 border-y border-slate-200/80 bg-gradient-to-r from-sky-50/70 via-indigo-50/50 to-purple-50/70 py-3 overflow-hidden shadow-inner relative">
          {/* Subtle gradient side fades */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Left-to-Right Moving Ribbon */}
          <div className="animate-marquee-ltr flex items-center gap-6 text-xs font-bold text-slate-700 select-none">
            {/* Set 1 */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-300 text-sky-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <span className="font-extrabold text-sky-800">98.4%</span> Offer Success Rate
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-300 text-blue-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-extrabold text-blue-800">120k+</span> Candidates Prepared
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-indigo-300 text-indigo-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-extrabold text-indigo-800">50+ Roles</span> Covered
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-300 text-emerald-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-extrabold text-emerald-800">&lt; 1s Latency</span> Instant AI
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-extrabold text-amber-800">$185k</span> Avg FAANG Offer
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose-300 text-rose-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-extrabold text-rose-800">4.9 / 5.0</span> User Rating
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-teal-300 text-teal-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              <span className="font-extrabold text-teal-800">850+</span> Hiring Companies
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-300 text-purple-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="font-extrabold text-purple-800">99.2%</span> ATS Resume Pass
            </span>

            {/* Set 2 (Duplicate for seamless loop) */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-300 text-sky-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <span className="font-extrabold text-sky-800">98.4%</span> Offer Success Rate
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-300 text-blue-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-extrabold text-blue-800">120k+</span> Candidates Prepared
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-indigo-300 text-indigo-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-extrabold text-indigo-800">50+ Roles</span> Covered
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-300 text-emerald-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-extrabold text-emerald-800">&lt; 1s Latency</span> Instant AI
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-extrabold text-amber-800">$185k</span> Avg FAANG Offer
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose-300 text-rose-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-extrabold text-rose-800">4.9 / 5.0</span> User Rating
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-teal-300 text-teal-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              <span className="font-extrabold text-teal-800">850+</span> Hiring Companies
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-300 text-purple-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="font-extrabold text-purple-800">99.2%</span> ATS Resume Pass
            </span>
          </div>
        </div>
      </section>

      {/* LATEST 2026 INTERVIEW STYLE SPOTLIGHT (ABOVE CODE CORRECTION & MODULES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Latest 2026 Interview Style • Industry Standard</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Experience the New 2026 Tech Interview Format (Above Code Correction)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Modern hiring at Google, Meta, OpenAI, Stripe &amp; Amazon has shifted beyond static whiteboard memorization. Practice the <strong className="text-white">4 Latest Interview Styles</strong> right above our 32-Question Code Correction Arena: <strong className="text-indigo-300">1. AI Co-Pilot Hallucination Audit</strong>, <strong className="text-emerald-300">2. Live GitHub PR Code Review</strong>, <strong className="text-rose-300">3. SEV-1 Production Incident Triage</strong>, and <strong className="text-amber-300">4. Dynamic Mid-Interview Requirement Twists</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('debug-interview')}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Launch 2026 Interview Style + Fix Wrong Code (32 Qs)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" />
            <span>Interactive Interview Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Professional Interview Preparation Modules
          </h2>
          <p className="text-slate-600 text-xs max-w-xl mx-auto">
            Click any module below to practice live — cards feature dynamic interactive jump feedback and instant AI evaluation!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const isJustClicked = clickedModuleId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => {
                  setClickedModuleId(item.id);
                  setTimeout(() => {
                    setClickedModuleId(null);
                    if (!user?.isLoggedIn && item.id !== 'general-chat' && item.id !== 'ai-coach' && item.id !== 'aptitude-reasoning' && item.id !== 'debug-interview') {
                      onOpenAuth();
                    } else {
                      setActiveTab(item.id as ActiveTab);
                    }
                  }, 300);
                }}
                className={`glass-card p-6 rounded-2xl cursor-pointer group flex flex-col justify-between transition-all duration-300 transform select-none ${
                  isJustClicked
                    ? 'animate-click-jump ring-4 ring-sky-400 bg-sky-50/90 shadow-2xl scale-105'
                    : 'hover:-translate-y-2.5 hover:shadow-xl hover:border-sky-400 active:scale-95'
                }`}
                style={{
                  animationDelay: `${(index % 3) * 0.15}s`
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-sky-400 group-hover:bg-sky-50 transition-colors">
                      {item.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-700 group-hover:bg-sky-100 group-hover:text-sky-800 transition-colors">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-2 flex items-center justify-between">
                    <span>{item.title}</span>
                    <span className="text-xs text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity">⚡ Click to Jump</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600 group-hover:translate-x-1.5 transition-transform">
                  <span className="flex items-center gap-1.5">
                    {item.id === 'general-chat' || item.id === 'ai-coach' || item.id === 'aptitude-reasoning' || item.id === 'debug-interview'
                      ? 'Open Free Arena'
                      : user?.isLoggedIn
                      ? 'Open Module'
                      : 'Sign In to Unlock (2 Free Uses)'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* APPSMITH-STYLE INTERACTIVE PRODUCT SUITE SHOWCASE            */}
      {/* ============================================================ */}
      <InterviewProductShowcase setActiveTab={setActiveTab} />

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
                <span>Direct UPI Payment (GPay / PhonePe) • Medium Plan ₹299 & Unlimited ₹699</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Unlock Full AI Interview, Company Mock Tests & Coding Access
              </h2>

              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Start with 2 free trial sessions across any module. Upgrade anytime with Medium Plan (₹299 for 45 uses) or Unlimited Plan (₹699) via Direct UPI (Google Pay, PhonePe, Paytm).
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
                All payments are processed directly via <strong className="text-amber-300">Google Pay (GPay), PhonePe, Paytm &amp; BHIM UPI</strong> with instant quota activation.
              </span>
            </div>
            <button
              onClick={onOpenSubscription}
              className="text-sky-400 hover:text-sky-300 font-bold underline shrink-0 cursor-pointer"
            >
              Pay with GPay / PhonePe &amp; Unlock Now →
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
          <div
            onClick={() => setSelectedWebinar(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-md w-full p-6 rounded-3xl border-slate-700 bg-slate-900 text-white shadow-2xl relative space-y-5 my-8"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedWebinar(null)}
                aria-label="Close registration modal"
                className="absolute top-4 right-4 px-2.5 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-colors cursor-pointer"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>

              {/* STEP 1: CANDIDATE DETAILS FORM */}
              {regStep === 'details' && (
                <>
                  <div className="space-y-1 pr-16">
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
                      className="w-full py-3 rounded-xl gradient-btn text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer"
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

                    <button
                      type="button"
                      onClick={() => setSelectedWebinar(null)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel & Close</span>
                    </button>
                  </form>
                </>
              )}

              {/* STEP 2: UPI QR PAYMENT SCREEN */}
              {regStep === 'payment' && (
                <div className="space-y-4 text-center animate-in zoom-in-95 pt-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <button
                      type="button"
                      onClick={() => setRegStep('details')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5" /> Amount: {selectedWebinar.price || '₹100'}
                    </span>
                  </div>

                  {/* Google Pay / PhonePe / Paytm Direct UPI Card (Merchant Number Hidden) */}
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 shadow-inner space-y-4 relative overflow-hidden">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-sm shadow-md border border-sky-500/30">
                        V
                      </div>
                      <h4 className="text-sm font-bold text-slate-100 tracking-wide">
                        Vettingly Verified Merchant
                      </h4>
                      <span className="text-[10px] text-emerald-400 font-medium">
                        Merchant Number Privacy Protected
                      </span>
                    </div>

                    {/* 1-Click Direct UPI App Launchers */}
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          launchUpiPaymentApp(
                            'gpay',
                            selectedWebinar.price?.replace(/[^0-9]/g, '') || '100',
                            `Vettingly Webinar: ${selectedWebinar.name}`
                          )
                        }
                        className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Pay {selectedWebinar.price || '₹100'} with Google Pay (GPay)</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            launchUpiPaymentApp(
                              'phonepe',
                              selectedWebinar.price?.replace(/[^0-9]/g, '') || '100',
                              `Vettingly Webinar: ${selectedWebinar.name}`
                            )
                          }
                          className="py-2 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>PhonePe</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            launchUpiPaymentApp(
                              'paytm',
                              selectedWebinar.price?.replace(/[^0-9]/g, '') || '100',
                              `Vettingly Webinar: ${selectedWebinar.name}`
                            )
                          }
                          className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Paytm / UPI</span>
                        </button>
                      </div>
                    </div>

                    {/* QR Code Container */}
                    <div className="bg-white rounded-2xl p-3.5 shadow-xl inline-block mx-auto relative group">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                          getUniversalUpiUri(
                            selectedWebinar.price?.replace(/[^0-9]/g, '') || '100',
                            'Vettingly Webinar Registration'
                          )
                        )}`}
                        alt="Scan to pay with any UPI app"
                        className="w-44 h-44 object-contain mx-auto rounded"
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium">
                      Click Google Pay / PhonePe above or scan QR with any UPI app
                    </p>
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
                      * Complete your payment in GPay, PhonePe, or Paytm, then paste the 12-digit Transaction/UTR No above.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      executeRegistrationSubmit(selectedWebinar.price || '₹100', regUtr)
                    }
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl gradient-btn text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>{isSubmitting ? 'Verifying Payment...' : `Verify Transaction & Complete Registration`}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedWebinar(null)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel & Close Payment</span>
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
                        <span className="text-slate-200">Vettingly Verified Merchant (UPI)</span>
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

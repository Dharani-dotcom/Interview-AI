import React, { useState } from 'react';
import { ActiveTab } from '../types';
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
  Bot
} from 'lucide-react';

interface HeroHomeProps {
  setActiveTab: (tab: ActiveTab) => void;
  onQuickDemo: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ setActiveTab, onQuickDemo }) => {
  const [activeFeatureTab, setActiveFeatureTab] = useState<'chat' | 'voice' | 'video' | 'code'>('chat');

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
    </div>
  );
};

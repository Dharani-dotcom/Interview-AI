import React from 'react';
import { ActiveTab } from '../types';
import { Brain, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-600 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <Brain className="w-4 h-4 text-sky-600" />
            </div>
            <span className="font-bold text-slate-900 text-base">AI Interview Prep</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            The ultimate AI-powered interview prep platform. Master technical, HR, behavioral, coding, and system design interviews with real-time feedback.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>AI Models Live • AI Engine Active</span>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">AI Modules</p>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('general-chat')} className="hover:text-sky-600 transition-colors">
                General AI Chat
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('chat-interview')} className="hover:text-sky-600 transition-colors">
                AI Chat Interview
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('voice-interview')} className="hover:text-sky-600 transition-colors">
                AI Voice Interview
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('video-interview')} className="hover:text-sky-600 transition-colors">
                AI Video Interview
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('coding-interview')} className="hover:text-sky-600 transition-colors">
                Coding Interview
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Tools & Insights</p>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('system-design')} className="hover:text-sky-600 transition-colors">
                System Design Whiteboard
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('resume-analyzer')} className="hover:text-sky-600 transition-colors">
                Resume Analyzer
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('ats-checker')} className="hover:text-sky-600 transition-colors">
                ATS Score Checker
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('analytics')} className="hover:text-sky-600 transition-colors">
                Analytics & Radar Charts
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('certificate')} className="hover:text-sky-600 transition-colors">
                Verification Certificates
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Enterprise Security</p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-sky-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Private & Encrypted</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Your audio, video, and resume uploads are analyzed securely in ephemeral sandboxes.
            </p>
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for job seekers worldwide.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 AI Interview Prep Platform. All rights reserved.</p>
        <p className="flex items-center gap-4">
          <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-700 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-slate-700 cursor-pointer">Security Whitepaper</span>
        </p>
      </div>
    </footer>
  );
};

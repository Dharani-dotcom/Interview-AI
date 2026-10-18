import React from 'react';
import { ActiveTab } from '../types';
import { Brain, ShieldCheck, Heart, Scale, Cookie, FileText, Lock } from 'lucide-react';
import { LegalTabType } from './LegalComplianceModal';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenLegalModal?: (tab: LegalTabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenLegalModal }) => {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-600 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <Brain className="w-4 h-4 text-sky-600" />
            </div>
            <span className="font-extrabold text-slate-900 text-base tracking-tight">
              Vetting<span className="text-sky-600">ly</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
            Vettingly is the AI-powered interview &amp; candidate vetting platform. Master technical, HR, behavioral, coding, company mock tests, and system design interviews with real-time feedback.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>AI Models Live · CyberShield WAF v2.4 Active</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5 shadow-2xs max-w-sm">
            <div className="flex items-center gap-2 text-sky-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Private, Encrypted & DPDP Act Compliant</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Your audio, video, and resume uploads are analyzed securely in ephemeral sandboxes. Payments secured via Razorpay India PCI-DSS Level 1.
            </p>
          </div>
        </div>

        {/* Col 2: AI Modules */}
        <div>
          <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">AI Modules</p>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('general-chat')} className="hover:text-sky-600 transition-colors cursor-pointer">
                General AI Chat
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('chat-interview')} className="hover:text-sky-600 transition-colors cursor-pointer">
                AI Chat Interview
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('voice-interview')} className="hover:text-sky-600 transition-colors cursor-pointer">
                AI Voice Interview
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('video-interview')} className="hover:text-sky-600 transition-colors cursor-pointer">
                AI Video Interview
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('coding-interview')} className="hover:text-sky-600 transition-colors cursor-pointer">
                Coding Interview
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('aptitude-reasoning')} className="hover:text-sky-600 transition-colors cursor-pointer">
                Company Mock Tests
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Tools & Insights */}
        <div>
          <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Tools & Insights</p>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('system-design')} className="hover:text-sky-600 transition-colors cursor-pointer">
                System Design Whiteboard
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('resume-analyzer')} className="hover:text-sky-600 transition-colors cursor-pointer">
                Resume Analyzer
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('ats-checker')} className="hover:text-sky-600 transition-colors cursor-pointer">
                ATS Score Checker
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('analytics')} className="hover:text-sky-600 transition-colors cursor-pointer">
                Analytics & Radar Charts
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('certificate')} className="hover:text-sky-600 transition-colors cursor-pointer">
                Verification Certificates
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal, Privacy & Cookies */}
        <div>
          <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Legal & Privacy</p>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal?.('privacy')}
                className="hover:text-sky-600 transition-colors flex items-center gap-1.5 cursor-pointer font-medium text-slate-700"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal?.('terms')}
                className="hover:text-sky-600 transition-colors flex items-center gap-1.5 cursor-pointer font-medium text-slate-700"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                Terms & Conditions
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal?.('cookies')}
                className="hover:text-sky-600 transition-colors flex items-center gap-1.5 cursor-pointer font-medium text-slate-700"
              >
                <Cookie className="w-3.5 h-3.5 text-amber-600" />
                Cookie Policy & Settings
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal?.('security')}
                className="hover:text-sky-600 transition-colors flex items-center gap-1.5 cursor-pointer font-medium text-slate-700"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                Security & Refund Policy
              </button>
            </li>
          </ul>

          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-5">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for job seekers worldwide.
          </p>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 Vettingly. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => onOpenLegalModal?.('privacy')}
            className="hover:text-slate-900 underline-offset-4 hover:underline transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => onOpenLegalModal?.('terms')}
            className="hover:text-slate-900 underline-offset-4 hover:underline transition-colors cursor-pointer"
          >
            Terms & Conditions
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => onOpenLegalModal?.('cookies')}
            className="hover:text-slate-900 underline-offset-4 hover:underline transition-colors cursor-pointer flex items-center gap-1"
          >
            <Cookie className="w-3.5 h-3.5 text-amber-600" />
            Cookie Preferences
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => onOpenLegalModal?.('security')}
            className="hover:text-slate-900 underline-offset-4 hover:underline transition-colors cursor-pointer flex items-center gap-1"
          >
            <Scale className="w-3.5 h-3.5 text-sky-600" />
            Refund & Security Policy
          </button>
        </div>
      </div>
    </footer>
  );
};

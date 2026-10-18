import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Cookie,
  Lock,
  CheckCircle2,
  Scale,
  Server,
  CreditCard,
  Share2,
  UserCheck,
  Database,
  Eye,
  Trash2,
  Download,
  RefreshCw,
  AlertCircle,
  Check,
  Globe
} from 'lucide-react';

export type LegalTabType = 'privacy' | 'terms' | 'cookies' | 'security';

export interface CookiePreferences {
  essential: boolean; // Always true
  functional: boolean;
  analytics: boolean;
  social: boolean;
  updatedAt: string;
  consented: boolean;
}

export const COOKIE_STORAGE_KEY = 'interviewai_cookie_consent_v1';

export const getStoredCookiePreferences = (): CookiePreferences => {
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        essential: true,
        functional: parsed.functional ?? true,
        analytics: parsed.analytics ?? true,
        social: parsed.social ?? true,
        updatedAt: parsed.updatedAt || new Date().toISOString(),
        consented: Boolean(parsed.consented),
      };
    }
  } catch {
    // Ignore storage parse errors
  }
  return {
    essential: true,
    functional: true,
    analytics: true,
    social: false,
    updatedAt: new Date().toISOString(),
    consented: false,
  };
};

export const saveCookiePreferences = (prefs: CookiePreferences): void => {
  try {
    localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        ...prefs,
        essential: true,
        updatedAt: new Date().toISOString(),
        consented: true,
      })
    );
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: prefs }));
  } catch {
    // Ignore storage write errors
  }
};

interface LegalComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTabType;
  onCookiePreferencesSaved?: (prefs: CookiePreferences) => void;
}

export const LegalComplianceModal: React.FC<LegalComplianceModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
  onCookiePreferencesSaved,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);
  const [cookiePrefs, setCookiePrefs] = useState<CookiePreferences>(getStoredCookiePreferences);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setCookiePrefs(getStoredCookiePreferences());
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleSaveCookies = (customPrefs?: CookiePreferences, message = 'Cookie preferences saved successfully.') => {
    const finalPrefs: CookiePreferences = {
      ...(customPrefs || cookiePrefs),
      essential: true,
      updatedAt: new Date().toISOString(),
      consented: true,
    };
    setCookiePrefs(finalPrefs);
    saveCookiePreferences(finalPrefs);
    onCookiePreferencesSaved?.(finalPrefs);
    setSaveToast(message);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleAcceptAllCookies = () => {
    handleSaveCookies(
      {
        essential: true,
        functional: true,
        analytics: true,
        social: true,
        updatedAt: new Date().toISOString(),
        consented: true,
      },
      'All cookie categories enabled and saved.'
    );
  };

  const handleRejectNonEssential = () => {
    handleSaveCookies(
      {
        essential: true,
        functional: false,
        analytics: false,
        social: false,
        updatedAt: new Date().toISOString(),
        consented: true,
      },
      'Only strictly necessary security cookies are active.'
    );
  };

  const handleResetConsentBanner = () => {
    try {
      localStorage.removeItem(COOKIE_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('cookie-consent-updated'));
      setSaveToast('Cookie consent reset. The cookie banner will reappear.');
      setTimeout(() => setSaveToast(null), 3500);
    } catch {
      // ignore
    }
  };

  const handlePrintPolicy = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                Legal, Privacy & Cookie Compliance Center
              </h2>
              <p className="text-xs text-slate-400">
                Effective Date: October 2026 · Compliant with India DPDP Act 2023, IT Rules & GDPR
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPolicy}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              Print / PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'privacy'
                ? 'bg-white text-sky-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            Privacy Policy
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'terms'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            Terms & Conditions
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'cookies'
                ? 'bg-white text-amber-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Cookie className="w-4 h-4 text-amber-600" />
            Cookie Policy & Settings
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'security'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-600" />
            Security & Refund Policy
          </button>
        </div>

        {/* Toast Feedback */}
        {saveToast && (
          <div className="mx-6 mt-4 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between shrink-0">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              {saveToast}
            </span>
            <button onClick={() => setSaveToast(null)} className="text-emerald-600 hover:text-emerald-800">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed flex-1">
          {/* ================================================================ */}
          {/* TAB 1: PRIVACY POLICY                                            */}
          {/* ================================================================ */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Privacy Policy & Personal Data Protection Notice</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    How Vettingly collects, processes, encrypts, and protects your personal and assessment data.
                  </p>
                </div>
                <div className="text-xs text-sky-800 font-medium shrink-0">
                  DPDP Act 2023 · GDPR Compliant
                </div>
              </div>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-sky-600" />
                  1. Information We Collect
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We collect only the minimum information required to deliver personalized AI interview preparation, coding evaluations, and company mock tests:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <strong className="text-slate-800">Account & Identity Data:</strong> Your name, email address, profile photo, and target job role when you sign in via Google OAuth 2.0 or create a user profile.
                  </li>
                  <li>
                    <strong className="text-slate-800">Assessment & Interview Data:</strong> Your mock test responses, sectional scores (Aptitude, Logical, Verbal, Technical), coding sandbox submissions, and text/voice/video interview transcripts generated during practice sessions.
                  </li>
                  <li>
                    <strong className="text-slate-800">Resume & Career Documents:</strong> Resumes or job descriptions uploaded to the Resume Analyzer and ATS Match Checker for keyword, formatting, and role-alignment scoring.
                  </li>
                  <li>
                    <strong className="text-slate-800">Payment &amp; Subscription Verification Data:</strong> UPI Reference/UTR numbers and selected subscription tier (`₹60` Starter, `₹299` Medium, or `₹699` Pro). <strong className="text-slate-900">We never collect or store your bank account numbers, card details, or UPI PINs on our servers.</strong>
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-sky-600" />
                  2. How We Process Audio, Video & AI Interactions
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our platform utilizes enterprise AI models to simulate technical, HR, behavioral, and system design interviews:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <strong className="text-slate-800">Ephemeral Camera & Microphone Streams:</strong> During Voice and Video Interviews, webcam frames and microphone audio are processed in real time inside your browser and ephemeral memory to provide eye-contact, posture, and speech-fluency feedback. Raw video recordings are never permanently stored on external servers.
                  </li>
                  <li>
                    <strong className="text-slate-800">Zero Foundation Model Training on Your Resume:</strong> Your private resumes, cover letters, and personal interview answers are used strictly to generate your feedback report and are never sold to third-party data brokers or recruiters.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Server className="w-4 h-4 text-sky-600" />
                  3. Third-Party Sub-Processors & Integrations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                      Direct UPI Payment Network (NPCI)
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Processes INR payments directly via Google Pay (GPay), PhonePe, Paytm, and BHIM UPI with privacy-protected merchant routing and 12-digit UTR verification.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-emerald-600" />
                      Vettingly Encrypted Cloud Storage
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Provides Google OAuth 2.0 authentication and encrypted database persistence for your subscription quota, mock test history, and certificates.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      CyberShield WAF v2.4
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Inspects incoming HTTP traffic for SQL injection, XSS, and brute-force anomalies using anonymized IP rate-limiting.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-sky-600" />
                  4. Your Data Principal Rights (India DPDP Act & GDPR)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You retain full ownership of your personal data and may exercise the following rights at any time:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li><strong className="text-slate-800">Right to Access & Portability:</strong> Export your complete interview reports, radar analytics, and verification certificates as PDF.</li>
                  <li><strong className="text-slate-800">Right to Correction & Erasure:</strong> Update your profile details or disconnect your LinkedIn profile and clear local session history at any time.</li>
                  <li><strong className="text-slate-800">Right to Withdraw Cookie Consent:</strong> Modify or revoke non-essential cookies anytime in the <em>Cookie Policy & Settings</em> tab.</li>
                  <li><strong className="text-slate-800">Grievance Officer / Privacy Contact:</strong> For data deletion or privacy inquiries, contact <span className="font-mono text-sky-700">privacy@vettingly.in</span>.</li>
                </ul>
              </section>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: TERMS & CONDITIONS                                        */}
          {/* ================================================================ */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Terms and Conditions of Use</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Binding agreement governing access to Vettingly, Company Mock Tests, and Subscription Plans.
                  </p>
                </div>
                <div className="text-xs text-indigo-800 font-medium shrink-0">
                  Version 2.4 · Governing Law: India
                </div>
              </div>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">1. Acceptance of Terms & Eligibility</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  By accessing or using the Vettingly platform ("Platform"), you agree to be bound by these Terms & Conditions, our Privacy Policy, and our Cookie Policy. You must be at least 16 years of age (or have parental consent under applicable law) to register an account or purchase a subscription.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">2. Free Trial Quota & Paid Subscription Tiers</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <strong className="text-slate-800">Free Evaluation Quota:</strong> Every new user receives 1 complimentary feature evaluation to test the AI Interviewer, Resume Analyzer, or Mock Test engine before upgrading.
                  </li>
                  <li>
                    <strong className="text-slate-800">Paid Plans (INR):</strong> We offer three transparent plans:
                    <span className="block mt-1 pl-2 text-slate-700">
                      • <strong>Starter Pass (₹60):</strong> 10 AI feature uses across interviews, resume analysis, and aptitude practice.<br />
                      • <strong>Medium Pro Plan (₹299):</strong> 45 AI feature uses + full 50-question Company Mock Tests.<br />
                      • <strong>Unlimited Career Pro (₹699):</strong> Unlimited AI interviews, coding sandboxes, mock tests, and priority AI Coach access.
                    </span>
                  </li>
                  <li>
                    <strong className="text-slate-800">Payment Verification:</strong> Direct UPI payments via Google Pay (GPay), PhonePe, Paytm, or BHIM are verified using your 12-digit UPI UTR reference number for immediate quota activation.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">3. Fair Usage, Assessment Integrity &amp; Anti-Cheating</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To maintain leaderboard accuracy and certificate credibility:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>Accounts are strictly for individual use by a single candidate and may not be shared among multiple users.</li>
                  <li>Automated scraping, bot-driven question harvesting, or attempting to bypass timer constraints in the 50-Question Company Mock Tests is strictly prohibited.</li>
                  <li>Note that company names (e.g., Google, Microsoft, Amazon, TCS, Infosys, Goldman Sachs) referenced in Mock Tests are used solely to indicate exam syllabus patterns; the Platform is an independent preparation tool and is not affiliated with or endorsed by those employers.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">5. CyberShield WAF & Prohibited Security Conduct</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our platform is protected by CyberShield WAF v2.4. Any attempt to execute SQL injection (SQLi), Cross-Site Scripting (XSS), path traversal, forged payment webhooks, or denial-of-service floods will result in automatic IP blocking and permanent account termination without refund.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900">6. Limitation of Liability & Disclaimer</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  AI-generated interview scores, ATS match percentages, and coaching recommendations are educational estimates designed to improve candidate readiness. We do not guarantee job placement or specific hiring outcomes with any third-party company.
                </p>
              </section>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: COOKIE POLICY & INTERACTIVE PREFERENCES                   */}
          {/* ================================================================ */}
          {activeTab === 'cookies' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-amber-600" />
                    Cookie Policy & Granular Consent Manager
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Customize how cookies and browser local storage are used on your device.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleRejectNonEssential}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Essential Only
                  </button>
                  <button
                    onClick={handleAcceptAllCookies}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Accept All
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                We use cookies and HTML5 <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono">localStorage</code> to keep your account signed in securely, guard against payment tampering, remember your interview history, and streamline social sharing. Toggle individual categories below:
              </p>

              {/* Category Cards */}
              <div className="space-y-3">
                {/* 1. Strictly Necessary */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">1. Strictly Necessary & CyberShield Security Cookies</span>
                      <span className="text-[11px] font-semibold text-emerald-700">Always Active</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Required for Google OAuth session tokens, CyberShield WAF rate-limit verification, CSRF protection, and Direct UPI checkout integrity. The platform cannot function securely without these.
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono pt-0.5">
                      Keys: vettingly_auth_session · interviewai_cookie_consent_v1
                    </p>
                  </div>
                  <div className="shrink-0 pt-1">
                    <div className="w-11 h-6 rounded-full bg-emerald-600 flex items-center justify-end px-1 opacity-80 cursor-not-allowed">
                      <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                    </div>
                  </div>
                </div>

                {/* 2. Functional & Preferences */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900">2. Functional & Workspace Preference Storage</span>
                    <p className="text-xs text-slate-600">
                      Remembers your preferred programming language in the Coding Arena (Python, Java, C++, JS), selected AI Interviewer voice persona, target job role, and saved practice drafts.
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono pt-0.5">
                      Keys: interviewai_user_usage_v1 · coding_preferred_lang · ai_coach_history
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCookiePrefs((p) => ({ ...p, functional: !p.functional }))}
                    className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors cursor-pointer shrink-0 mt-1 ${
                      cookiePrefs.functional ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                    aria-label="Toggle Functional Cookies"
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                {/* 3. Analytics & Performance */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900">3. Performance, Radar Analytics & Percentile Benchmarks</span>
                    <p className="text-xs text-slate-600">
                      Stores your historical Company Mock Test scores, sectional accuracy breakdowns, and Radar Chart skill metrics so you can track improvement over time and compare against anonymized peer percentiles.
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono pt-0.5">
                      Keys: interviewai_mock_scores · radar_skill_telemetry
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCookiePrefs((p) => ({ ...p, analytics: !p.analytics }))}
                    className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors cursor-pointer shrink-0 mt-1 ${
                      cookiePrefs.analytics ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                    aria-label="Toggle Analytics Cookies"
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Last updated: <span className="font-medium text-slate-700">{new Date(cookiePrefs.updatedAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={handleResetConsentBanner}
                    className="px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset Consent Banner
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveCookies()}
                    className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    Save Cookie Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: SECURITY & REFUND POLICY                                  */}
          {/* ================================================================ */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Cyber Security Architecture & Refund Policy</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Enterprise defense-in-depth measures and transparent Direct UPI subscription billing terms.
                  </p>
                </div>
                <div className="text-xs text-emerald-800 font-medium shrink-0">
                  CyberShield WAF v2.4 Active
                </div>
              </div>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  1. Defense-in-Depth Cyber Security Controls
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <strong className="text-slate-800">Content Security Policy (CSP) &amp; Headers:</strong> All responses enforce strict <code className="font-mono text-slate-800">X-Frame-Options</code>, <code className="font-mono text-slate-800">X-Content-Type-Options: nosniff</code>, HSTS, and whitelisted script origins (<code className="font-mono text-slate-800">apis.google.com</code>).
                  </li>
                  <li>
                    <strong className="text-slate-800">Privacy-Protected Direct UPI Verification:</strong> Every UPI transaction is verified against your 12-digit UTR reference number with server-authoritative plan pricing.
                  </li>
                  <li>
                    <strong className="text-slate-800">Automated Payload Sanitization:</strong> Incoming API payloads are recursively sanitized against SQL Injection, NoSQL Injection, XSS, and Prototype Pollution.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  2. Subscription Billing, Cancellation &amp; Refund Policy
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <strong className="text-slate-800">No Auto-Recurring Hidden Charges:</strong> All plans (`₹60`, `₹299`, and `₹699`) are one-time prepaid passes with zero unexpected auto-debits.
                  </li>
                  <li>
                    <strong className="text-slate-800">Duplicate Payment Protection:</strong> If your bank account or UPI app is debited twice for the same order due to a network timeout, you may submit the UTR in the Subscription Modal for immediate credit activation or refund within 5–7 business days.
                  </li>
                  <li>
                    <strong className="text-slate-800">Unused Pass Refund Window:</strong> If you have purchased a plan and have consumed zero (0) AI credits from that pass within 48 hours of purchase, you may request a full refund by emailing <span className="font-mono text-emerald-700">billing@vettingly.in</span> with your 12-digit UPI UTR.
                  </li>
                </ul>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span>Protected by CyberShield WAF v2.4 · Direct UPI Verified · DPDP Act 2023</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

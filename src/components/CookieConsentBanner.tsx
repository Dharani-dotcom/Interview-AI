import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Settings, Check, X } from 'lucide-react';
import {
  LegalTabType,
  getStoredCookiePreferences,
  saveCookiePreferences,
} from './LegalComplianceModal';

interface CookieConsentBannerProps {
  onOpenLegalModal: (tab: LegalTabType) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenLegalModal,
}) => {
  const [visible, setVisible] = useState(false);

  const checkConsentStatus = () => {
    const prefs = getStoredCookiePreferences();
    setVisible(!prefs.consented);
  };

  useEffect(() => {
    checkConsentStatus();
    const handleUpdate = () => checkConsentStatus();
    window.addEventListener('cookie-consent-updated', handleUpdate);
    return () => window.removeEventListener('cookie-consent-updated', handleUpdate);
  }, []);

  if (!visible) return null;

  const handleAcceptAll = () => {
    saveCookiePreferences({
      essential: true,
      functional: true,
      analytics: true,
      social: true,
      updatedAt: new Date().toISOString(),
      consented: true,
    });
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    saveCookiePreferences({
      essential: true,
      functional: false,
      analytics: false,
      social: false,
      updatedAt: new Date().toISOString(),
      consented: true,
    });
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 pointer-events-none animate-fade-in">
      <div className="max-w-6xl mx-auto bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl pointer-events-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left Copy */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-amber-400" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                We Value Your Privacy & Cookie Preferences
              </h3>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                DPDP Act 2023 & GDPR Compliant
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              We use strictly necessary cookies for Google authentication, CyberShield WAF security, and Direct UPI checkout integrity, plus optional cookies for workspace preferences and mock test analytics. Read our{' '}
              <button
                type="button"
                onClick={() => onOpenLegalModal('privacy')}
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2 font-medium cursor-pointer"
              >
                Privacy Policy
              </button>
              ,{' '}
              <button
                type="button"
                onClick={() => onOpenLegalModal('terms')}
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2 font-medium cursor-pointer"
              >
                Terms & Conditions
              </button>
              , and{' '}
              <button
                type="button"
                onClick={() => onOpenLegalModal('cookies')}
                className="text-sky-400 hover:text-sky-300 underline underline-offset-2 font-medium cursor-pointer"
              >
                Cookie Policy
              </button>
              .
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={() => onOpenLegalModal('cookies')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            Customize Cookies
          </button>

          <button
            type="button"
            onClick={handleEssentialOnly}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Essential Only
          </button>

          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            Accept All Cookies
          </button>

          <button
            type="button"
            onClick={handleEssentialOnly}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer lg:ml-1"
            aria-label="Dismiss cookie banner with essential cookies only"
            title="Dismiss (Essential Only)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

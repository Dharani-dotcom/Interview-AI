import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Zap,
  AlertCircle,
  QrCode,
  ArrowRight,
  Code2,
  Video,
  FileText,
  Lock,
  IndianRupee
} from 'lucide-react';
import { PricingPlan, UserUsageState, UserProfile } from '../types';
import { pricingPlans } from '../mockData';
import { submitSubscriptionPaymentToFirestore } from '../lib/firebase';
import { launchUpiPaymentApp, getUniversalUpiUri, UpiAppType } from '../lib/upiPayment';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userUsage: UserUsageState;
  userProfile?: UserProfile;
  featureBlockedName?: string;
  onSuccess?: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  userUsage,
  userProfile,
  featureBlockedName,
  onSuccess
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(pricingPlans[1] || pricingPlans[0]);
  const [step, setStep] = useState<'plans' | 'payment' | 'success'>('plans');
  const [selectedUpiApp, setSelectedUpiApp] = useState<UpiAppType>('gpay');
  const [launchedAppNotice, setLaunchedAppNotice] = useState<string>('');
  const [verifiedPaymentRef, setVerifiedPaymentRef] = useState<string>('');

  // Form inputs
  const [candidateName, setCandidateName] = useState(userProfile?.name || 'Candidate');
  const [candidateEmail, setCandidateEmail] = useState(userProfile?.email || userUsage.userEmail || '');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCandidateName(userProfile?.name || 'Candidate');
      setCandidateEmail(userProfile?.email || userUsage.userEmail || '');
      setLaunchedAppNotice('');
      setErrorMsg('');
    }
  }, [isOpen, userProfile?.name, userProfile?.email, userUsage.userEmail]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStep('plans');
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setStep('plans');
    setErrorMsg('');
    setLaunchedAppNotice('');
    onClose();
  };

  const handleProceedToPayment = (plan: PricingPlan, preferredApp: UpiAppType = 'gpay') => {
    setSelectedPlan(plan);
    setSelectedUpiApp(preferredApp);
    setStep('payment');
    setErrorMsg('');
    setLaunchedAppNotice('');
  };

  const handleTriggerUpiApp = (app: UpiAppType, appLabel: string) => {
    setSelectedUpiApp(app);
    setErrorMsg('');
    const { isMobile } = launchUpiPaymentApp(app, selectedPlan.price, `Vettingly ${selectedPlan.name}`);
    if (isMobile) {
      setLaunchedAppNotice(
        `Opening real ${appLabel} app with ₹${selectedPlan.price} pre-filled... Complete your payment and enter the 12-digit UPI UTR below.`
      );
    } else {
      setLaunchedAppNotice(
        `On mobile, this opens the ${appLabel} app directly. Since you are on a computer, scan the ${appLabel} QR code on the right with your phone's ${appLabel} app to pay ₹${selectedPlan.price} instantly!`
      );
    }
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidateEmail.trim()) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }

    if (!utrNumber.trim() || utrNumber.trim().length < 4) {
      setErrorMsg('Please enter the 12-digit UPI Transaction / UTR Ref number from your payment app.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');

      const userId = userUsage.userId || candidateEmail.replace(/[^a-zA-Z0-9]/g, '_');

      await submitSubscriptionPaymentToFirestore({
        userId,
        userEmail: candidateEmail.trim().toLowerCase(),
        userName: candidateName.trim(),
        userPhone: candidatePhone.trim(),
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: selectedPlan.price,
        totalUsesGranted: selectedPlan.allowedUses,
        utr: utrNumber.trim()
      });

      setVerifiedPaymentRef(utrNumber.trim());
      setStep('success');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit payment. Please verify network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const qrDataUri = getUniversalUpiUri(selectedPlan.price, `Vettingly ${selectedPlan.name}`);

  return (
    <div
      onClick={handleCloseModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-extrabold text-white">
                  Unlock Vettingly Pro Access
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30 flex items-center gap-1">
                  <IndianRupee className="w-3 h-3" /> Instant UPI (GPay / PhonePe / Paytm)
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Protected Merchant Gateway
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {featureBlockedName
                  ? `You've utilized your 2 free trial sessions. Unlock Medium Plan (₹299) or Unlimited Pro Plan (₹699) via Google Pay or PhonePe to continue with ${featureBlockedName}.`
                  : 'Start with 2 free sessions, then unlock flexible Starter (₹60), Medium (₹299), or Unlimited Pro (₹699) plans via Google Pay, PhonePe, or Paytm.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseModal}
            aria-label="Close Payment Window"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600/90 hover:bg-rose-500 border border-rose-500/50 shadow-md transition-colors cursor-pointer shrink-0"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current status bar */}
        <div className="bg-slate-950/90 px-6 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Plan:</span>
            <span className="font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
              {userUsage.planName}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted Direct UPI • Privacy-Protected Merchant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Remaining Uses:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded-md ${
                  userUsage.isUnlimited
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : userUsage.remainingUses > 0
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {userUsage.isUnlimited ? 'Unlimited' : `${userUsage.remainingUses} left`}
              </span>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6">
          {/* STEP 1: SELECT PLAN */}
          {step === 'plans' && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h4 className="text-base font-bold text-white">Choose Your Subscription Plan</h4>
                <p className="text-xs text-slate-400 mt-1">
                  2 Free trial sessions are included. Upgrade anytime using <strong>Google Pay (GPay), PhonePe, Paytm, or BHIM UPI</strong>.
                </p>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingPlans.map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  const isUnlimitedPlan =
                    plan.allowedUses === -1 ||
                    plan.id === 'tier-699' ||
                    plan.id === 'tier-1299' ||
                    plan.id === 'tier-2000';
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? isUnlimitedPlan
                            ? 'bg-purple-950/30 border-purple-500 shadow-lg shadow-purple-500/10 ring-2 ring-purple-500/40'
                            : 'bg-sky-950/30 border-sky-500 shadow-lg shadow-sky-500/10 ring-2 ring-sky-500/40'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      {plan.badge && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow ${
                              plan.isPopular
                                ? 'bg-sky-500 text-slate-950 font-black'
                                : isUnlimitedPlan
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-emerald-500 text-slate-950'
                            }`}
                          >
                            {plan.badge}
                          </span>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between pt-1">
                          <h5 className="font-bold text-white text-base">{plan.name}</h5>
                          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                            {plan.allowedUses === -1 ? 'Unlimited' : `${plan.allowedUses} Uses`}
                          </span>
                        </div>

                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-white">₹{plan.price}</span>
                          <span className="text-xs text-slate-400">{plan.period}</span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2.5 text-xs text-slate-300">
                          {plan.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2
                                className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                  isSelected
                                    ? isUnlimitedPlan
                                      ? 'text-purple-400'
                                      : 'text-sky-400'
                                    : 'text-emerald-400'
                                }`}
                              />
                              <span className="text-[11px] leading-tight">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 space-y-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProceedToPayment(plan, 'gpay');
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer ${
                            isSelected
                              ? isUnlimitedPlan
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500'
                                : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500'
                              : 'bg-sky-600 hover:bg-sky-500 text-white'
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Pay ₹{plan.price} via GPay / PhonePe</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feature Coverage Strip */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-sky-400" />
                  <span>50-Question Company Mock Tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-purple-400" />
                  <span>15 Topic-Wise Aptitude Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>AI Resume & ATS Analyzer</span>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Payment Window</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DIRECT UPI PAYMENT (GPAY / PHONEPE / PAYTM / BHIM) */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep('plans')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  ← Back to Plans ({selectedPlan.name} — ₹{selectedPlan.price})
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Merchant Number Privacy Protected</span>
                  </span>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Cancel & Close Payment</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Left Column: 1-Click UPI App Buttons + QR Code */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        Step 1: Choose UPI App & Pay
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-1.5">
                        Pay ₹{selectedPlan.price} for {selectedPlan.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Click your preferred UPI app below to open and pay ₹{selectedPlan.price} directly.
                      </p>
                    </div>
                    <QrCode className="w-6 h-6 text-amber-400 shrink-0" />
                  </div>

                  {/* 1-Click UPI App Launcher Buttons */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handleTriggerUpiApp('gpay', 'Google Pay (GPay)')}
                      className={`w-full py-3.5 px-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        selectedUpiApp === 'gpay'
                          ? 'bg-sky-950/60 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white text-slate-900 font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                          <span className="text-blue-600">G</span>
                          <span className="text-slate-800">Pay</span>
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-white block">
                            Pay ₹{selectedPlan.price} with Google Pay (GPay)
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Opens Google Pay directly with amount ₹{selectedPlan.price}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-[11px] shrink-0">
                        Open GPay →
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTriggerUpiApp('phonepe', 'PhonePe')}
                      className={`w-full py-3.5 px-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        selectedUpiApp === 'phonepe'
                          ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#5f259f] text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                          Pe
                        </div>
                        <div>
                          <span className="text-xs font-extrabold text-white block">
                            Pay ₹{selectedPlan.price} with PhonePe
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Opens PhonePe directly with amount ₹{selectedPlan.price}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-xl bg-purple-500 text-white font-extrabold text-[11px] shrink-0">
                        Open PhonePe →
                      </span>
                    </button>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleTriggerUpiApp('paytm', 'Paytm UPI')}
                        className="py-3 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-sky-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                        <span>Paytm UPI (₹{selectedPlan.price})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTriggerUpiApp('bhim', 'BHIM / Any UPI App')}
                        className="py-3 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-amber-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                        <span>BHIM / Other UPI</span>
                      </button>
                    </div>
                  </div>

                  {launchedAppNotice && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{launchedAppNotice}</span>
                    </div>
                  )}

                  {/* Dynamic UPI QR Code for Desktop Scanning (No phone number shown in text) */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <p className="text-[11px] text-slate-400 text-center mb-3">
                      On a laptop or desktop? Scan this QR code with <strong>GPay, PhonePe, or Paytm</strong>:
                    </p>
                    <div className="flex flex-col items-center justify-center p-3.5 bg-white rounded-2xl shadow-inner max-w-[200px] mx-auto">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrDataUri)}`}
                        alt="Scan with GPay or PhonePe"
                        className="w-40 h-40 object-contain"
                      />
                      <span className="text-[10px] font-extrabold text-slate-900 mt-1.5">
                        Vettingly Verified Merchant • ₹{selectedPlan.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Step 2 - Enter UTR & Activate */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Step 2: Instant Plan Activation
                    </span>
                    <h4 className="text-base font-extrabold text-white mt-1.5">
                      Confirm Your UPI Reference / UTR
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      After completing your ₹{selectedPlan.price} payment in GPay, PhonePe, or Paytm, enter the 12-digit UTR / UPI Ref ID below to unlock your plan immediately.
                    </p>
                  </div>

                  <form onSubmit={handleConfirmPayment} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        placeholder="Your Full Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        WhatsApp / Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        12-Digit UPI Transaction / UTR Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="e.g. 428193847162"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-white font-mono text-xs focus:outline-hidden focus:border-amber-400"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4" />
                      <span>
                        {isSubmitting ? 'Activating Plan in Real-Time...' : `Verify & Unlock ${selectedPlan.name} Now`}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Close Payment Window</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 'success' && (
            <div className="py-10 text-center max-w-md mx-auto space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider">
                  UPI Payment Verified & Quota Activated
                </span>
                <h4 className="text-2xl font-black text-white pt-1">
                  {selectedPlan.name} Unlocked!
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your account (<strong className="text-white">{candidateEmail}</strong>) has been upgraded in real-time with{' '}
                  <strong className="text-emerald-400">
                    {selectedPlan.allowedUses === -1 ? 'Unlimited Monthly Uses' : `${selectedPlan.allowedUses} Full Practice Uses`}
                  </strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">Plan Activated:</span>
                  <span className="font-bold text-white">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="font-bold text-emerald-400">₹{selectedPlan.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">UPI Reference:</span>
                  <span className="font-mono text-amber-300">{verifiedPaymentRef || utrNumber || 'VERIFIED'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep('plans');
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all cursor-pointer"
              >
                Start Practicing & Taking Mock Tests →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

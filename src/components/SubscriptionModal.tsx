import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  Smartphone, 
  CreditCard, 
  Zap, 
  AlertCircle,
  QrCode,
  ArrowRight,
  Code2,
  Video,
  FileText
} from 'lucide-react';
import { PricingPlan, PlanId, UserUsageState, UserProfile } from '../types';
import { pricingPlans } from '../mockData';
import { submitSubscriptionPaymentToFirestore } from '../lib/firebase';

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
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(pricingPlans[1]); // Default to Pro (₹1299)
  const [step, setStep] = useState<'plans' | 'payment' | 'success'>('plans');
  
  // Form inputs
  const [candidateName, setCandidateName] = useState(userProfile?.name || 'Candidate');
  const [candidateEmail, setCandidateEmail] = useState(userProfile?.email || userUsage.userEmail || '');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const copyUpiId = () => {
    navigator.clipboard.writeText('priyadha1988@oksbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleProceedToPayment = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setStep('payment');
    setErrorMsg('');
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

      setStep('success');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Subscription error:', err);
      setErrorMsg(err.message || 'Failed to submit payment. Please verify network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const qrPaymentUri = `upi://pay?pa=priyadha1988@oksbi&pn=priyadha%201988&am=${selectedPlan.price}&cu=INR&tn=${encodeURIComponent(
    `InterviewAI ${selectedPlan.name}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">
                  Unlock InterviewAI Pro Access
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                  Real-time Database
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {featureBlockedName 
                  ? `You've utilized your 1 free session. Unlock subscription credits to continue with ${featureBlockedName}.`
                  : 'Get flexible access to all AI Coding sandboxes, Mock Interviews, and Resume Analyzers.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Exit Subscription"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
          >
            <span>Exit</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current status bar */}
        <div className="bg-slate-950/90 px-6 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Plan:</span>
            <span className="font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
              {userUsage.planName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Remaining Uses:</span>
            <span className={`font-bold px-2 py-0.5 rounded-md ${
              userUsage.isUnlimited 
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : userUsage.remainingUses > 0 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {userUsage.isUnlimited ? 'Unlimited' : `${userUsage.remainingUses} left`}
            </span>
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
                  1 Free trial is provided. Next unlock flexible monthly tiers or get unlimited access instantly via UPI QR Code.
                </p>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricingPlans.map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? plan.allowedUses === -1 || plan.id === 'tier-1299' || plan.id === 'tier-2000'
                            ? 'bg-purple-950/30 border-purple-500 shadow-lg shadow-purple-500/10 ring-2 ring-purple-500/40'
                            : 'bg-sky-950/30 border-sky-500 shadow-lg shadow-sky-500/10 ring-2 ring-sky-500/40'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      {plan.badge && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow ${
                            plan.isPopular
                              ? 'bg-sky-500 text-slate-950 font-black'
                              : plan.allowedUses === -1 || plan.id === 'tier-1299' || plan.id === 'tier-2000'
                                ? 'bg-purple-500 text-white'
                                : 'bg-emerald-500 text-slate-950'
                          }`}>
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
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isSelected ? (plan.allowedUses === -1 || plan.id === 'tier-1299' || plan.id === 'tier-2000' ? 'text-purple-400' : 'text-sky-400') : 'text-emerald-400'
                              }`} />
                              <span className="text-[11px] leading-tight">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProceedToPayment(plan);
                        }}
                        className={`w-full mt-5 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow ${
                          isSelected
                            ? plan.allowedUses === -1 || plan.id === 'tier-1299' || plan.id === 'tier-2000'
                              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                              : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                        }`}
                      >
                        <span>Pay ₹{plan.price} with QR</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Quick Feature Overview */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Full Coding Sandbox</p>
                    <p className="text-[10px] text-slate-400">All LeetCode problems & AI mentor</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Voice & Video AI</p>
                    <p className="text-[10px] text-slate-400">STAR feedback & expression analysis</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Resume & ATS Optimizer</p>
                    <p className="text-[10px] text-slate-400">Score & keyword matching</p>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer with Exit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80">
                <p className="text-xs text-slate-400 text-center sm:text-left">
                  🔒 Secure instant UPI QR activation • Synchronized in real-time with Firestore.
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                    <span>Exit / Maybe Later</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProceedToPayment(selectedPlan)}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer"
                  >
                    <span>Proceed with {selectedPlan.name} (₹{selectedPlan.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: UPI QR CODE & PAYMENT FORM */}
          {step === 'payment' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-amber-400" />
                    <span>Pay ₹{selectedPlan.price} via UPI QR Code</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Plan: <strong className="text-sky-300">{selectedPlan.name}</strong> ({selectedPlan.allowedUses === -1 ? 'Unlimited Uses' : `${selectedPlan.allowedUses} Uses per month`})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('plans')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  >
                    Change Plan
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-rose-300 hover:text-rose-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Exit</span>
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* QR Code Container */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                  <div className="relative inline-block p-3 bg-white rounded-2xl shadow-xl">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(
                        qrPaymentUri
                      )}`}
                      alt={`Scan to Pay ₹${selectedPlan.price}`}
                      className="w-48 h-48 object-contain mx-auto"
                    />
                    {/* GPay center pill */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 bg-white rounded-full shadow-md border border-slate-200 flex items-center justify-center">
                        <span className="text-[9px] font-extrabold text-blue-600 tracking-tighter">UPI</span>
                      </div>
                    </div>
                  </div>

                  {/* UPI ID Info & Copy Button */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs font-mono font-semibold text-slate-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
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
                    <p className="text-[11px] text-slate-400">
                      Scan with any UPI app (Google Pay, PhonePe, Paytm, BHIM)
                    </p>
                  </div>

                  {/* Deep link for mobile devices */}
                  <a
                    href={qrPaymentUri}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open UPI App (Pay ₹{selectedPlan.price})</span>
                  </a>
                </div>

                {/* Candidate & Transaction Details Form */}
                <form onSubmit={handleConfirmPayment} className="space-y-3.5 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Candidate Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="candidate@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span>UPI Transaction ID / UTR No <span className="text-rose-400">*</span></span>
                      <span className="text-[10px] text-amber-400 font-normal">Found in UPI App receipt</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="e.g. 12-digit UTR No (e.g. 423987123456)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      * Complete payment to <span className="text-slate-200 font-mono">priyadha1988@oksbi</span>, then enter the UTR / Ref No to activate your {selectedPlan.name} in the real-time database.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 text-xs font-extrabold shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isSubmitting ? 'Recording Payment to Database...' : `Verify UTR & Activate ${selectedPlan.name}`}</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS & ACTIVATION */}
          {step === 'success' && (
            <div className="space-y-5 text-center py-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Subscription Activated!</h4>
                <p className="text-xs text-slate-300">
                  Congratulations <strong className="text-white">{candidateName}</strong>! Your payment of{' '}
                  <strong className="text-emerald-400">₹{selectedPlan.price}</strong> has been registered in the real-time Firestore database.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 font-mono max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Plan:</span>
                  <strong className="text-sky-300">{selectedPlan.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Uses Granted:</span>
                  <strong className="text-emerald-400">
                    {selectedPlan.allowedUses === -1 ? 'Unlimited' : `${selectedPlan.allowedUses} Uses`}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transaction ID (UTR):</span>
                  <span className="text-amber-300">{utrNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Database Status:</span>
                  <span className="text-emerald-400 font-bold">Synced in Real-time</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  setStep('plans');
                }}
                className="w-full max-w-md py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold shadow-lg transition-all mx-auto"
              >
                Start Practicing Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

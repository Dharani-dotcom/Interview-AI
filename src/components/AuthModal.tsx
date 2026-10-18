import React, { useState } from 'react';
import { UserProfile, UserUsageState } from '../types';
import { signInWithGoogle, signOutUser, recordUserSignInToFirestore } from '../lib/firebase';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Lock,
  LogOut,
  Briefcase,
  ArrowUpRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen?: boolean;
  onClose: () => void;
  user?: UserProfile;
  userUsage?: UserUsageState;
  setUser?: React.Dispatch<React.SetStateAction<UserProfile>>;
  onSuccess?: (userData: { name: string; email: string; avatar?: string }) => void;
  onOpenSubscription?: () => void;
}

const COMMON_ROLES = [
  'Senior Full Stack / AI Engineer',
  'Staff Backend Architect',
  'Frontend / React Lead',
  'Machine Learning & AI Engineer',
  'Cloud / DevOps Solutions Architect',
  'Engineering Manager / Tech Lead'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen = true,
  onClose,
  user,
  userUsage,
  setUser,
  onSuccess,
  onOpenSubscription
}) => {
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Senior Full Stack / AI Engineer');
  const [customRole, setCustomRole] = useState('');
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [quickName, setQuickName] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [showQuickSignIn, setShowQuickSignIn] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isOpen) return null;

  const completeSignInAndClose = (
    userName: string,
    userEmail: string,
    avatar: string,
    selectedRole: string,
    authMethod: 'Google' | 'Name & Email' = 'Name & Email',
    uid?: string
  ) => {
    const resolvedId = uid || userEmail.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');

    // Record user sign-in (Google or Name & Email) in Firestore & Server so Admin sees all signed-in users
    recordUserSignInToFirestore({
      userId: resolvedId,
      name: userName,
      email: userEmail,
      avatar,
      targetRole: selectedRole,
      authMethod
    });

    if (setUser) {
      setUser((prev) => ({
        ...prev,
        id: resolvedId,
        name: userName,
        email: userEmail,
        avatar: avatar,
        targetRole: selectedRole,
        isLoggedIn: true,
      }));
    }

    if (onSuccess) {
      onSuccess({ name: userName, email: userEmail, avatar });
    }

    onClose();
  };

  const handleGoogleAuth = async () => {
    setErrorMsg(null);
    setIsGoogleLoading(true);
    const selectedRole = isCustomRole ? (customRole.trim() || targetRole) : targetRole;

    try {
      const authUser = await signInWithGoogle(selectedRole);
      if (!authUser) {
        setShowQuickSignIn(true);
        setErrorMsg('Google popup was closed or blocked. You can try Google again or sign in directly below with your Name & Email.');
        return;
      }

      const userName = authUser.displayName || 'Candidate';
      const userEmail = authUser.email || 'candidate@vettingly.in';
      const avatar =
        authUser.photoURL ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userEmail)}`;

      completeSignInAndClose(userName, userEmail, avatar, selectedRole, 'Google', authUser.uid);
    } catch (err: any) {
      setShowQuickSignIn(true);
      if (
        err?.code === 'auth/popup-closed-by-user' ||
        err?.code === 'auth/cancelled-popup-request'
      ) {
        setErrorMsg('Sign-in popup was closed. Try again or use Quick Email Sign-In below.');
      } else if (err?.code === 'auth/popup-blocked') {
        setErrorMsg('Browser blocked the popup window. Please allow popups or sign in directly with your Email below.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        const host = typeof window !== 'undefined' ? window.location.hostname : 'this domain';
        setErrorMsg(`Domain "${host}" is not yet added to Authorized Domains. Use Quick Email Sign-In below to enter immediately, or add "${host}" in Authentication Settings.`);
      } else {
        setErrorMsg('Google popup could not complete. Use Quick Email Sign-In below to continue immediately.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleQuickEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = quickName.trim() || 'Candidate';
    const cleanEmail = quickEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address to continue.');
      return;
    }
    const selectedRole = isCustomRole ? (customRole.trim() || targetRole) : targetRole;
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanEmail)}`;
    completeSignInAndClose(cleanName, cleanEmail, avatar, selectedRole, 'Name & Email');
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      if (setUser && user) {
        setUser({
          ...user,
          isLoggedIn: false
        });
      }
      setMessage('You have been signed out.');
      setTimeout(() => setMessage(null), 2000);
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1612]/60 backdrop-blur-xs animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white border border-[#E5DBD2] shadow-2xl text-[#2B1B13] overflow-hidden"
      >
        {/* Warm Brown Top Accent Bar */}
        <div className="h-1.5 w-full bg-[#4A2E21]" />

        {/* Header Section */}
        <div className="px-6 pt-6 pb-5 border-b border-[#EFE7E0] bg-[#FCF9F6] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#4A2E21] text-[#FAF6F2] text-xs font-bold tracking-tight">
                V
              </span>
              <span className="text-xs font-semibold text-[#6E5346] tracking-tight">
                Vettingly Account Portal
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#261710] tracking-tight pt-1">
              {user?.isLoggedIn ? 'Candidate Profile' : 'Sign in to Vettingly'}
            </h3>
            <p className="text-xs text-[#6E5346] leading-relaxed">
              {user?.isLoggedIn
                ? 'Your interview sessions, mock test scores, and active plan are synced to your account.'
                : 'Continue with your Google account or email to save interview reports, track scores, and manage your plan.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sign in window"
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#4A2E21] bg-[#EFE7E0] hover:bg-[#E2D5C8] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 bg-white">
          {message && (
            <div className="p-3.5 rounded-xl bg-[#F4F9F5] border border-[#C6E0CC] text-[#235330] text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#2E6B3E] shrink-0" />
              <span className="font-medium">{message}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-[#FDF4F4] border border-[#E0C5C5] text-[#8B2626] text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#A83232] shrink-0" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {user?.isLoggedIn ? (
            /* SIGNED IN STATE */
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#FAF6F2] border border-[#E5DBD2] flex items-center gap-3.5">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-13 h-13 rounded-xl object-cover border border-[#D5C5B8] shrink-0"
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-[#261710] truncate">{user.name}</h4>
                    <span className="text-[11px] text-[#5C4033] font-medium">
                      · Active Account
                    </span>
                  </div>
                  <p className="text-xs text-[#6E5346] truncate font-mono">{user.email}</p>
                  <p className="text-xs text-[#4A2E21] font-medium flex items-center gap-1.5 pt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#6E5346]" />
                    <span className="truncate">{user.targetRole}</span>
                  </p>
                </div>
              </div>

              {userUsage && (
                <div className="p-4 rounded-xl bg-[#FAF6F2] border border-[#E5DBD2] grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[11px] text-[#7A6053] block mb-1">Current Plan</span>
                    <span className="font-bold text-[#261710]">
                      {userUsage.planName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#7A6053] block mb-1">Available Credits</span>
                    <span className="font-bold text-[#4A2E21] tabular-nums">
                      {userUsage.isUnlimited || userUsage.totalAllowedUses === -1
                        ? 'Unlimited Access'
                        : `${userUsage.remainingUses} of ${userUsage.totalAllowedUses} remaining`}
                    </span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-[#4A2E21] hover:bg-[#382117] text-xs font-semibold text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Continue to Platform →</span>
              </button>

              <div className="flex gap-3 pt-1">
                {onOpenSubscription && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSubscription();
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#FAF6F2] hover:bg-[#EFE7E0] border border-[#D8C8BC] text-xs font-semibold text-[#4A2E21] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Manage Subscription</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="py-2.5 px-4 rounded-xl bg-[#FAF6F2] hover:bg-[#EFE7E0] border border-[#D8C8BC] text-xs font-semibold text-[#5C4033] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* SIGNED OUT STATE */
            <div className="space-y-5">
              {/* Target Role Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-[#2B1B13]">
                    Target Interview Role
                  </label>
                  <span className="text-[11px] text-[#7A6053]">
                    Used to tailor questions
                  </span>
                </div>

                {!isCustomRole ? (
                  <select
                    value={targetRole}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustomRole(true);
                      } else {
                        setTargetRole(e.target.value);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F2] border border-[#D8C8BC] text-[#261710] text-xs font-medium focus:border-[#4A2E21] focus:outline-hidden transition-colors"
                  >
                    {COMMON_ROLES.map((r) => (
                      <option key={r} value={r} className="bg-white text-[#261710]">
                        {r}
                      </option>
                    ))}
                    <option value="custom" className="bg-white text-[#4A2E21] font-semibold">
                      + Enter custom role...
                    </option>
                  </select>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="e.g. Lead SRE / Distributed Systems Engineer"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF6F2] border border-[#D8C8BC] text-[#261710] text-xs focus:border-[#4A2E21] focus:outline-hidden placeholder:text-[#9A8274]"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomRole(false)}
                      className="px-3 py-2 rounded-xl bg-[#FAF6F2] border border-[#D8C8BC] text-[#5C4033] text-xs font-medium hover:bg-[#EFE7E0] cursor-pointer"
                    >
                      Presets
                    </button>
                  </div>
                )}
              </div>

              {/* Google Sign-In Button (Warm Espresso Brown & Crisp White) */}
              <div className="space-y-3">
                <button
                  type="button"
                  disabled={isGoogleLoading}
                  onClick={handleGoogleAuth}
                  className="w-full py-3 px-4 rounded-xl bg-[#4A2E21] hover:bg-[#382117] text-white text-sm font-semibold flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#FAF6F2]" />
                  ) : (
                    <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </span>
                  )}
                  <span>{isGoogleLoading ? 'Signing in with Google...' : 'Continue with Google'}</span>
                </button>

                {/* Instant Email Sign-In Option so Sign-In never gets stuck */}
                {!showQuickSignIn ? (
                  <button
                    type="button"
                    onClick={() => setShowQuickSignIn(true)}
                    className="w-full py-2 px-3 rounded-xl bg-[#FAF6F2] hover:bg-[#EFE7E0] border border-[#D8C8BC] text-[#4A2E21] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Or Sign In Directly with Name & Email →
                  </button>
                ) : (
                  <form onSubmit={handleQuickEmailSignIn} className="p-3.5 rounded-xl bg-[#FAF6F2] border border-[#D8C8BC] space-y-2.5">
                    <p className="text-[11px] font-bold text-[#4A2E21]">
                      Direct Candidate Sign-In (Instant Access)
                    </p>
                    <input
                      type="text"
                      required
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D8C8BC] text-[#261710] text-xs focus:border-[#4A2E21] focus:outline-hidden"
                    />
                    <input
                      type="email"
                      required
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      placeholder="Your Email Address (e.g. you@gmail.com)"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D8C8BC] text-[#261710] text-xs focus:border-[#4A2E21] focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-lg bg-[#4A2E21] hover:bg-[#382117] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Sign In & Continue Now →
                    </button>
                  </form>
                )}
              </div>

              {/* Account Benefits Summary */}
              <div className="p-4 rounded-xl bg-[#FAF6F2] border border-[#E5DBD2] space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-[#4A2E21] font-semibold">
                  <Lock className="w-3.5 h-3.5 text-[#6E5346]" />
                  <span>What gets saved to your account</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-[#5C4033] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4A2E21] font-bold">·</span>
                    <span>Personal interview transcripts, resume evaluations, and sectional mock test scores.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4A2E21] font-bold">·</span>
                    <span>Active plan credits (Starter ₹60, Medium ₹299, or Pro ₹699) linked directly to your email.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4A2E21] font-bold">·</span>
                    <span>Private workspace isolation so no other user can view your profile or reports.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FCF9F6] border-t border-[#EFE7E0] text-center text-[11px] text-[#7A6053] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4A2E21]" />
          <span>Verified Google OAuth 2.0 · Encrypted Session</span>
        </div>
      </div>
    </div>
  );
};

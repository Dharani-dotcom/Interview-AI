import React, { useState } from 'react';
import { UserProfile, UserUsageState } from '../types';
import { signInWithGoogle, signOutUser } from '../lib/firebase';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  Zap, 
  Database, 
  Lock, 
  LogOut, 
  Briefcase,
  Layers,
  ArrowRight,
  UserCheck
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
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setErrorMsg(null);
    setIsGoogleLoading(true);
    const selectedRole = isCustomRole ? (customRole.trim() || targetRole) : targetRole;

    try {
      const fbUser = await signInWithGoogle(selectedRole);
      const userName = fbUser.displayName || 'Candidate';
      const userEmail = fbUser.email || 'candidate@interviewai.pro';
      const avatar = fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userEmail)}`;

      if (setUser && user) {
        setUser({
          ...user,
          name: userName,
          email: userEmail,
          avatar: avatar,
          targetRole: selectedRole,
          isLoggedIn: true,
        });
      }

      if (onSuccess) {
        onSuccess({ name: userName, email: userEmail, avatar });
      }

      setMessage(`Welcome, ${userName}! Verified with Google & Firestore.`);
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error('Google sign in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Google Sign-In popup was closed before completing. Please try again.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setErrorMsg('Sign-in operation cancelled. Please try again.');
      } else {
        setErrorMsg(err.message || 'Google Sign-In encountered an issue. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
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
      setMessage('Successfully signed out.');
      setTimeout(() => setMessage(null), 2000);
    } catch (e) {
      console.error('Sign out error:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Ambient glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[2px] mx-auto shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-sky-400" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            {user?.isLoggedIn ? 'Verified Candidate Profile' : 'Sign In with Google'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {user?.isLoggedIn 
              ? 'Your account and subscription quotas are synchronized in real-time with Firebase Cloud Database.'
              : 'Direct verified Google Authentication. Protects your interview quotas, active subscriptions & career reports.'}
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{message}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {/* IF USER IS ALREADY SIGNED IN */}
        {user?.isLoggedIn ? (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-sky-500/40 shrink-0 shadow-md"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white truncate">{user.name}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Google Account
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate font-mono">{user.email}</p>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[11px] text-sky-400 font-semibold flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {user.targetRole}
                  </span>
                </div>
              </div>
            </div>

            {/* Quota overview */}
            {userUsage && (
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-0.5">Active Plan Tier</span>
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    {userUsage.planName}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block mb-0.5">Remaining Interview Quota</span>
                  <span className="font-bold text-emerald-400">
                    {userUsage.isUnlimited || userUsage.totalAllowedUses === -1
                      ? 'Unlimited Access'
                      : `${userUsage.remainingUses} of ${userUsage.totalAllowedUses} uses left`}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {onOpenSubscription && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSubscription();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl gradient-btn text-xs font-bold text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Manage / Upgrade Subscription</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-rose-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* IF USER IS NOT SIGNED IN */
          <div className="space-y-5">
            
            {/* Target Role Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Select Target Engineering Role</span>
                <span className="text-[10px] text-sky-400 font-normal">Saved to Firestore Profile</span>
              </label>

              {!isCustomRole ? (
                <div className="space-y-2">
                  <select
                    value={targetRole}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustomRole(true);
                      } else {
                        setTargetRole(e.target.value);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-sky-500 focus:outline-hidden"
                  >
                    {COMMON_ROLES.map((r) => (
                      <option key={r} value={r} className="bg-slate-900 text-white">
                        {r}
                      </option>
                    ))}
                    <option value="custom" className="bg-slate-900 text-sky-400">
                      + Enter Custom Engineering Role...
                    </option>
                  </select>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="e.g. Lead SRE / Distributed Systems Engineer"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-sky-500 focus:outline-hidden placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomRole(false)}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                  >
                    List
                  </button>
                </div>
              )}
            </div>

            {/* Primary Google Sign In Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isGoogleLoading}
                onClick={handleGoogleAuth}
                className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 text-sm font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-sky-500/10 hover:shadow-sky-500/20 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-sky-600" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                )}
                <span>{isGoogleLoading ? 'Connecting to Google & Firestore...' : 'Continue with Google'}</span>
              </button>
            </div>

            {/* Why Google Auth + Database Explanation Card */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-[11px]">
                <Database className="w-3.5 h-3.5" />
                <span>Verified Cloud Database & Subscription Security</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Genuine Authentication</strong>: Verified email via Google OAuth prevents unauthorized quota usage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Subscription Protection</strong>: Your UPI QR purchases (₹499 / ₹1299 / ₹2000) are securely linked to your unique Google UID.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Cross-Device Persistence</strong>: Access your DSA codes, voice interview records, and score breakdowns anywhere.</span>
                </li>
              </ul>
            </div>

          </div>
        )}

        <div className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Protected with Firebase Enterprise Security & Google Identity Services</span>
        </div>
      </div>
    </div>
  );
};

import { UserProfile, HistoricalReport, CodingProblem, NotificationItem, PricingPlan, UserUsageState } from './types';
import { codingProblemsData } from './codingProblemsData';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'tier-99',
    name: 'Starter Plan',
    price: 99,
    period: '/ month',
    allowedUses: 10,
    features: [
      '10 Full Uses per Month',
      'All Features: Coding, Mock Interview & Resume Analyzer',
      'Real-time Code Test Execution & AI Debugger',
      'AI Voice & Video Interview with Real-time Scoring',
      'ATS Resume Optimization & Keyword Matcher',
      'Instant UPI QR Activation'
    ],
    badge: 'Starter • 10 Uses / Mo',
    color: 'emerald'
  },
  {
    id: 'tier-699',
    name: 'Medium Plan',
    price: 699,
    period: '/ month',
    allowedUses: 30,
    features: [
      '30 Full Uses per Month',
      'All Premium Modules Unlocked',
      'Deep LeetCode Coding Sandbox with AI Socratic Mentor',
      'Voice & Video AI Mock Interviews (Technical + HR)',
      'Advanced ATS Resume & Job Description Analyzer',
      'Detailed Performance Assessment Certificate',
      'Priority AI Speed & Response Times'
    ],
    isPopular: true,
    badge: 'Most Popular • 30 Uses / Mo',
    color: 'sky'
  },
  {
    id: 'tier-1299',
    name: 'Unlimited Plan',
    price: 1299,
    period: '/ month',
    allowedUses: -1,
    features: [
      'Unlimited Uses per Month (Zero Restrictions)',
      'Unlimited Coding Problems & Test Simulations',
      'Unlimited Voice, Video & Chat AI Interviews',
      'Unlimited Resume Analysis & ATS Match Reports',
      'All System Design & Behavioral STAR modules',
      'Direct Real-time Cloud Synchronization',
      'Admin Priority Support'
    ],
    badge: 'Best Value • Unlimited / Mo',
    color: 'purple'
  }
];

export const defaultUserUsage: UserUsageState = {
  userId: 'default-candidate',
  userEmail: 'candidate@techlead.io',
  planId: 'free',
  planName: 'Free Trial',
  totalAllowedUses: 1,
  usedCount: 0,
  remainingUses: 1,
  isUnlimited: false
};


export const initialUser: UserProfile = {
  name: "Candidate",
  email: "",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "Software Engineer",
  targetRole: "Senior Full Stack / AI Engineer",
  dailyStreak: 0,
  overallScore: 0,
  totalInterviews: 0,
  isLoggedIn: false,
  isProUser: false,
};

export const sampleNotifications: NotificationItem[] = [
  { id: '1', title: 'Daily Streak Milestone!', message: 'You reached 7 consecutive days of practice!', time: '10m ago', read: false },
  { id: '2', title: 'New Mock Assessment Ready', message: 'Google System Design assessment is now available.', time: '2h ago', read: false },
  { id: '3', title: 'Resume ATS Score Updated', message: 'Your ATS match score increased to 88%!', time: '1d ago', read: true },
];

export const sampleHistory: HistoricalReport[] = [
  {
    id: 'rep-101',
    date: '2026-08-04',
    type: 'AI Chat Interview',
    role: 'AI Engineer',
    score: 92,
    durationMinutes: 25,
    summary: 'Excellent grasp of RAG architecture and LLM fine-tuning concepts.',
    strengths: ['RAG Pipeline optimization', 'Transformer architecture knowledge', 'Clear technical explanations'],
    weaknesses: ['Could elaborate more on cost trade-offs between fine-tuning and prompt engineering'],
  },
  {
    id: 'rep-102',
    date: '2026-08-02',
    type: 'Voice Interview',
    role: 'Software Engineer',
    score: 85,
    durationMinutes: 18,
    summary: 'Good confidence and articulation. Low filler word count.',
    strengths: ['Confident tone', 'Strong STAR framework execution'],
    weaknesses: ['Slightly fast speaking speed during complexity discussion'],
  },
  {
    id: 'rep-103',
    date: '2026-07-30',
    type: 'Coding Interview',
    role: 'Frontend Engineer',
    score: 95,
    durationMinutes: 30,
    summary: 'Solved Two Sum & LRU Cache efficiently with clean O(1) operations.',
    strengths: ['Optimal space complexity', 'Edge case handling', 'Clean code structure'],
    weaknesses: ['Initial variable naming was verbose'],
  },
  {
    id: 'rep-104',
    date: '2026-07-28',
    type: 'Video Interview',
    role: 'HR & Behavioral',
    score: 88,
    durationMinutes: 20,
    summary: 'Strong eye contact and steady composure during conflict resolution scenarios.',
    strengths: ['Maintained 90%+ eye contact', 'Positive smile and body posture'],
    weaknesses: ['Try pausing briefly before answering tough behavioral questions'],
  },
];

export const sampleCodingProblems: CodingProblem[] = codingProblemsData;

export const sampleLeaderboard = [
  { rank: 1, name: 'Elena Rostova', score: 98, role: 'Staff AI Engineer', streak: 18 },
  { rank: 2, name: 'Candidate (You)', score: 88, role: 'Senior Frontend', streak: 7 },
  { rank: 3, name: 'Marcus Chen', score: 87, role: 'Backend Lead', streak: 12 },
  { rank: 4, name: 'Sarah Jenkins', score: 84, role: 'Data Analyst', streak: 5 },
  { rank: 5, name: 'David Kumar', score: 81, role: 'Embedded Systems', streak: 9 },
];

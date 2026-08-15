export type ActiveTab =
  | 'home'
  | 'dashboard'
  | 'general-chat'
  | 'chat-interview'
  | 'voice-interview'
  | 'video-interview'
  | 'voice-tutor'
  | 'resume-analyzer'
  | 'ats-checker'
  | 'coding-interview'
  | 'system-design'
  | 'behavioral-interview'
  | 'hr-interview'
  | 'analytics'
  | 'certificate'
  | 'admin-panel';

export interface VoiceTutorLesson {
  id: string;
  topic: string; // 'Java', 'Python', 'RAG & Gen AI', 'SQL & Database', 'System Design'
  title: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  code: string;
  language: 'java' | 'python' | 'javascript' | 'sql' | 'text';
  audioExplanation: string;
  keyPoints: string[];
  asciiDiagram?: string;
}

export type AIModel = 'gemini-3.6-flash' | 'gpt-4o' | 'claude-3-5-sonnet' | 'deepseek-r1' | 'groq-llama3';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  targetRole: string;
  dailyStreak: number;
  overallScore: number;
  totalInterviews: number;
  isLoggedIn: boolean;
  isProUser: boolean;
}

export interface InterviewConfig {
  jobRole: string;
  experience: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  language: string;
  interviewType: 'Technical' | 'HR' | 'Behavioral' | 'Coding' | 'System Design';
  techStack?: string; // e.g. Java, C++, Python, SQL & Database, JavaScript / React, Data Structures
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  evaluation?: {
    score: number;
    mistakes: string[];
    betterAnswer: string;
  };
}

export interface VoiceAnalysisResult {
  overallScore: number;
  metrics: {
    confidence: number;
    grammar: number;
    speakingSpeed: string;
    fluency: number;
    pronunciation: number;
  };
  fillerWordsCount: number;
  detectedFillerWords: string[];
  feedback: string;
  improvedAnswer: string;
}

export interface VideoAnalysisResult {
  confidenceScore: number;
  communicationScore: number;
  professionalismScore: number;
  bodyLanguageScore: number;
  eyeContactEstimation: string;
  smileAndFacialExpression: string;
  postureFeedback: string;
  verbalResponse?: string;
  followUpQuestion?: string;
  suggestions: string[];
  summary: string;
}

export interface ResumeAnalysisResult {
  atsScore: number;
  extractedSkills: string[];
  missingKeywords: string[];
  grammarRating: number;
  formattingScore: number;
  topAchievements: string[];
  recommendations: string[];
  improvedResumeSummary: string;
}

export interface ATSCheckResult {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestedKeywords: string[];
  actionableTips: string[];
}

export interface CodingProblem {
  id: string;
  leetcodeNumber?: number | string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  experienceLevel: 'Fresher (0-1 yrs)' | 'Mid-Level (1-3 yrs)' | 'Experienced (3+ yrs)' | 'All Levels';
  role: string;
  category: string;
  description: string;
  starterCode: Record<string, string>;
  solutions: Record<string, string>;
  hints: string[];
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  testCases: { input: string; expected: string }[];
}

export interface CodingMentorMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  hints?: string[];
}

export interface SystemDesignNode {
  id: string;
  label: string;
  type: 'client' | 'api-gateway' | 'service' | 'database' | 'cache' | 'queue' | 'cdn';
  x: number;
  y: number;
}

export interface SystemDesignConnection {
  from: string;
  to: string;
  label?: string;
}

export interface HistoricalReport {
  id: string;
  date: string;
  type: string;
  role: string;
  score: number;
  durationMinutes: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface WebinarItem {
  id: string;
  name: string;
  date: string;
  sourceManName: string;
  meetingLink: string;
  gformLink?: string;
  price: string;
  createdAt?: string;
}

export interface WebinarRegistration {
  id: string;
  webinarId: string;
  webinarName: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  userRole?: string;
  utr?: string;
  amountPaid?: string;
  paymentRecipient?: string;
  status?: string;
  registeredAt: string;
}

export type PlanId = 'free' | 'tier-99' | 'tier-699' | 'tier-1299' | 'tier-499' | 'tier-2000';

export interface PricingPlan {
  id: PlanId;
  name: string;
  price: number; // in INR
  period: string;
  allowedUses: number; // -1 for unlimited
  features: string[];
  isPopular?: boolean;
  badge?: string;
  color: string;
}

export interface UserUsageState {
  userId: string;
  userEmail?: string;
  planId: PlanId;
  planName: string;
  totalAllowedUses: number; // 1 for free, 5 for 99, 25 for 699, -1 for 1299
  usedCount: number;
  remainingUses: number;
  isUnlimited: boolean;
  expiresAt?: string;
  updatedAt?: string;
}

export interface SubscriptionPaymentRecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  planId: PlanId;
  planName: string;
  amount: number;
  totalUsesGranted: number;
  utr: string;
  status: 'pending' | 'verified' | 'rejected';
  paidTo: string;
  createdAt: string;
  verifiedAt?: string;
}


export type ActiveTab =
  | 'home'
  | 'dashboard'
  | 'general-chat'
  | 'chat-interview'
  | 'voice-interview'
  | 'video-interview'
  | 'resume-analyzer'
  | 'ats-checker'
  | 'coding-interview'
  | 'system-design'
  | 'behavioral-interview'
  | 'hr-interview'
  | 'analytics'
  | 'certificate'
  | 'admin-panel';

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
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: Record<string, string>;
  testCases: { input: string; expected: string }[];
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
  registeredAt: string;
}

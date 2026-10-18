import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Volume2,
  VolumeX,
  Briefcase,
  Layers,
  ChevronRight,
  FileCheck2,
  HelpCircle,
  Copy,
  Check,
  TrendingUp,
  Sliders,
  Play,
  Settings2,
  BookOpen,
  Target,
  Hash
} from 'lucide-react';
import { NeatRomanText, cleanNeatRomanText } from '../lib/neatText';

interface AIChatInterviewProps {
  onGenerateFinalReport?: (data: any) => void;
  onVerifyUsage?: () => Promise<boolean>;
  onOpenSubscription?: () => void;
}

interface Message {
  id: string;
  sender: 'interviewer' | 'candidate';
  text: string;
  timestamp: string;
  evaluation?: {
    score: number;
    mistakes: string[];
    betterAnswer: string;
  };
}

const ROLES = [
  'Full Stack Engineer',
  'Frontend Developer (React/TS)',
  'Backend Developer (Node/Go/Python)',
  'Java & Spring Boot Engineer',
  'Python / Data Science / ML Engineer',
  'AI & Prompt Engineer / LLM Specialist',
  'DevOps, SRE & Cloud Architect (AWS/GCP)',
  'Mobile App Developer (React Native/Flutter/iOS/Android)',
  'Cybersecurity & Pen-Testing Analyst',
  'Database Administrator & SQL Architect',
  'QA Automation & Performance Test Engineer',
  'System Architect & Distributed Systems Lead',
  'Product Manager (Tech / B2B SaaS)',
  'Project Manager & Scrum Master',
  'Engineering Manager / Tech Lead',
  'HR & Talent Acquisition Specialist',
  'UI/UX Product Designer & Design Systems Lead',
  'Data Analyst & Business Intelligence Specialist',
  'Customer Success & Solutions Architect'
];

const SENIORITIES = ['Intern / Entry-Level', 'Junior (0-2 yrs)', 'Mid-Level (2-5 yrs)', 'Senior (5-8 yrs)', 'Staff / Principal (8+ yrs)', 'Director / Executive'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'FAANG / Elite Level'];
const QUESTION_COUNTS = [3, 5, 8, 10, 15];

const SUGGESTED_QUESTIONS_BY_TYPE: Record<string, string[]> = {
  Technical: [
    'How do you design high-throughput cache invalidation with Redis?',
    'Explain microservices communication: REST vs gRPC vs Kafka event-driven architecture.',
    'Walk me through optimizing SQL slow queries, composite indexing, and database locks.',
    'How do you handle zero-downtime database migrations in production?',
    'Describe how you debug a production memory leak or CPU spike under high traffic.'
  ],
  HR: [
    'Walk me through your background and why this specific role matches your career trajectory.',
    'Tell me about a high-stakes disagreement with a coworker or manager and how you resolved it.',
    'What are your salary expectations and criteria for choosing your next company?',
    'How do you prioritize multiple urgent deadlines without burning out?',
    'Describe a situation where you received difficult critical feedback and acted upon it.'
  ],
  Behavioral: [
    'Tell me about a project that failed or missed its delivery deadline. What did you learn? (STAR)',
    'Describe a time you navigated severe ambiguity with minimal product requirements.',
    'Give an example of how you advocated for customer experience when pressured to cut corners.',
    'Tell me about a time you mentored an underperforming team member to success.',
    'Describe how you made a trade-off between technical perfection and business speed.'
  ]
};

const INTERVIEW_TYPES = [
  { id: 'Technical', label: 'Technical & Architecture', desc: 'Algorithms, system design, framework internals, edge cases' },
  { id: 'HR', label: 'HR & Culture Fit', desc: 'Compensation, motivation, teamwork, conflict resolution' },
  { id: 'Behavioral', label: 'Behavioral (STAR)', desc: 'Situational leadership, adversity, decision-making' }
];

export const AIChatInterview: React.FC<AIChatInterviewProps> = ({
  onGenerateFinalReport,
  onVerifyUsage,
  onOpenSubscription
}) => {
  // Session Configuration State
  const [inSession, setInSession] = useState(false);
  const [role, setRole] = useState('Full Stack Engineer');
  const [customRole, setCustomRole] = useState('');
  const [experience, setExperience] = useState('Mid-Level (2-5 yrs)');
  const [difficulty, setDifficulty] = useState('Medium');
  const [interviewType, setInterviewType] = useState('Technical');
  const [techStack, setTechStack] = useState('React, TypeScript, Node.js, PostgreSQL');
  const [customTopic, setCustomTopic] = useState('');
  const [specificQuestions, setSpecificQuestions] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(5);

  // Interview Execution State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalScore, setTotalScore] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Audio Speech Recognition & TTS
  const [isRecording, setIsRecording] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle Starting Interview
  const handleStartInterview = async () => {
    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    setLoading(true);
    setInSession(true);
    setMessages([]);
    setQuestionNumber(1);
    setTotalScore([]);
    setIsFinished(false);

    const activeRole = role === 'Other' && customRole.trim() ? customRole.trim() : role;

    try {
      const res = await fetch('/api/gemini/chat-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: activeRole,
          experience,
          difficulty,
          language: 'English',
          interviewType,
          techStack,
          customTopic: customTopic.trim(),
          specificQuestions: specificQuestions.trim(),
          totalQuestions,
          questionNumber: 1,
          userResponse: '',
        }),
      });

      const data = await res.json();
      const questionText = data.nextQuestion || `Welcome to your ${activeRole} interview! Let's start with your background and core architectural experience.`;

      setMessages([
        {
          id: 'q1',
          sender: 'interviewer',
          text: (data.greeting ? `${data.greeting}\n\n` : '') + questionText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        {
          id: 'q1',
          sender: 'interviewer',
          text: `Welcome! Let's begin your mock interview for ${activeRole}. Can you explain a complex project you recently architected and the key technical trade-offs you made?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Submit Candidate Answer
  const handleSendAnswer = async () => {
    const answerText = inputAnswer.trim();
    if (!answerText || loading) return;

    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    const candidateMsg: Message = {
      id: `cand-${Date.now()}`,
      sender: 'candidate',
      text: answerText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, candidateMsg];
    setMessages(newHistory);
    setInputAnswer('');
    setLoading(true);

    const activeRole = role === 'Other' && customRole.trim() ? customRole.trim() : role;

    try {
      const res = await fetch('/api/gemini/chat-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: activeRole,
          experience,
          difficulty,
          language: 'English',
          interviewType,
          techStack,
          customTopic: customTopic.trim(),
          specificQuestions: specificQuestions.trim(),
          totalQuestions,
          questionNumber,
          userResponse: answerText,
          history: newHistory,
        }),
      });

      const data = await res.json();

      if (data.evaluation?.score) {
        setTotalScore((prev) => [...prev, data.evaluation.score]);
      }

      const evalData = data.evaluation
        ? {
            score: data.evaluation.score || 80,
            mistakes: data.evaluation.mistakes || [],
            betterAnswer: data.evaluation.betterAnswer || '',
          }
        : undefined;

      // Update candidate message with evaluation
      setMessages((prev) =>
        prev.map((m) => (m.id === candidateMsg.id ? { ...m, evaluation: evalData } : m))
      );

      // Add Next Question from Interviewer
      if (data.nextQuestion) {
        const nextQNum = questionNumber + 1;
        setQuestionNumber(nextQNum);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `q-${nextQNum}`,
              sender: 'interviewer',
              text: data.nextQuestion,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);

          if (data.isFinished || nextQNum >= totalQuestions) {
            setIsFinished(true);
          }
        }, 600);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `q-fallback`,
          sender: 'interviewer',
          text: `Thank you for sharing. Building on that, how do you approach monitoring, observability, and failure recovery in high-throughput production environments?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Speech to text toggle
  const toggleSpeechRecognition = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported on this browser. Please type your answer.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setInputAnswer(transcript.trim());
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  // TTS Read out question
  const handleSpeak = (text: string, id: string) => {
    if (!window.speechSynthesis) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Copy
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Average Score
  const avgScore =
    totalScore.length > 0
      ? Math.round(totalScore.reduce((a, b) => a + b, 0) / totalScore.length)
      : null;

  // Complete and Generate Comprehensive Report
  const handleFinishAndReport = () => {
    if (onGenerateFinalReport) {
      onGenerateFinalReport({
        role: role === 'Other' ? customRole : role,
        experience,
        difficulty,
        interviewType,
        totalScore: avgScore || 85,
        questionCount: questionNumber,
        messages,
      });
    }
  };

  // ==========================================
  // VIEW 1: INTERVIEW CONFIGURATION / SETUP
  // ==========================================
  if (!inSession) {
    return (
      <div className="space-y-6 py-6 max-w-4xl mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header Banner */}
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
            AI Mock Interview Simulation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Realistic AI Chat Interview
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Simulate real hiring rounds with an intelligent AI interviewer. Get scored on technical depth, soft skills, and receive instantaneous model answers.
          </p>
        </div>

        {/* Configuration Card */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Role */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>Target Role</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#1c1c22] text-white text-xs sm:text-sm border border-white/10 rounded-xl px-3.5 py-2.5 focus:border-purple-500 outline-none"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
                <option value="Other">Other (Custom Role)</option>
              </select>
              {role === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter custom role title..."
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="w-full mt-2 bg-[#1c1c22] text-white text-xs border border-white/10 rounded-xl px-3.5 py-2 outline-none"
                />
              )}
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                <span>Seniority Level</span>
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-[#1c1c22] text-white text-xs sm:text-sm border border-white/10 rounded-xl px-3.5 py-2.5 focus:border-purple-500 outline-none"
              >
                {SENIORITIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interview Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Interview Round Type</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INTERVIEW_TYPES.map((t) => {
                const isSelected = interviewType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setInterviewType(t.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                        : 'bg-[#1a1a20] border-white/5 text-slate-400 hover:border-white/10'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-white">{t.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty, Question Count & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span>Difficulty</span>
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-[#1c1c22] text-white text-xs sm:text-sm border border-white/10 rounded-xl px-3 py-2.5 focus:border-purple-500 outline-none"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-purple-400" />
                <span>Number of Questions</span>
              </label>
              <div className="flex gap-1.5">
                {QUESTION_COUNTS.map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setTotalQuestions(cnt)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      totalQuestions === cnt
                        ? 'bg-purple-600 border-purple-500 text-white shadow-sm'
                        : 'bg-[#1c1c22] border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cnt}Q
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Settings2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Tech Stack (Optional)</span>
              </label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g. React, Node, System Design, SQL"
                className="w-full bg-[#1c1c22] text-white text-xs sm:text-sm border border-white/10 rounded-xl px-3.5 py-2 outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* User Choice: Custom Specific Topic or Custom Question Choice */}
          <div className="p-4 bg-[#181820] border border-purple-500/20 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Manual User Choice & Question Customization
                </span>
              </div>
              <span className="text-[10px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                Tailor Questions to Your Goals
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Specific Focus Topic */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Custom Focus Area / Specific Topic</span>
                  <span className="text-[10px] text-slate-400">Optional</span>
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g. Microservices Distributed Tracing, Salary Negotiation, STAR leadership"
                  className="w-full bg-[#141418] text-white text-xs border border-white/10 rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-500"
                />
              </div>

              {/* Specific Questions candidate wants asked */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Specific Questions You Want To Practice</span>
                  <span className="text-[10px] text-slate-400">Optional</span>
                </label>
                <input
                  type="text"
                  value={specificQuestions}
                  onChange={(e) => setSpecificQuestions(e.target.value)}
                  placeholder="e.g. How do you design Redis caching with TTL? / Tell me about a failure"
                  className="w-full bg-[#141418] text-white text-xs border border-white/10 rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Quick-Pick Sample Questions based on current interview type */}
            <div className="space-y-2 pt-1 border-t border-white/5">
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>Quick-Pick Suggested Questions (Click to append):</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(SUGGESTED_QUESTIONS_BY_TYPE[interviewType] || []).map((sampleQ, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSpecificQuestions((prev) =>
                        prev ? `${prev} | ${sampleQ}` : sampleQ
                      );
                    }}
                    className="text-[11px] text-left bg-white/5 hover:bg-purple-600/20 hover:text-purple-200 border border-white/5 hover:border-purple-500/30 px-2.5 py-1 rounded-lg text-slate-300 transition-colors cursor-pointer"
                  >
                    + {sampleQ}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-4 flex items-center justify-between border-t border-white/5">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-time AI Gemini 3.7 Evaluator Ready</span>
            </div>

            <button
              onClick={handleStartInterview}
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/20 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Interview Session</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: ACTIVE MOCK INTERVIEW ROOM
  // ==========================================
  return (
    <div className="space-y-4 py-4 max-w-4xl mx-auto font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Session Status Bar */}
      <div className="bg-[#141418] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{role === 'Other' && customRole ? customRole : role}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                {interviewType}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>{experience} • {difficulty}</span>
              {customTopic && (
                <span className="text-purple-300 font-medium truncate max-w-[180px]">
                  • Focus: {customTopic}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Question Counter Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-900/40 border border-purple-500/30 text-xs text-purple-200">
            <Hash className="w-3.5 h-3.5 text-purple-400" />
            <span>Question {Math.min(questionNumber, totalQuestions)} of {totalQuestions}</span>
          </div>

          {avgScore !== null && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs">
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-slate-300">Avg Score:</span>
              <span className="font-bold text-purple-300">{avgScore}/100</span>
            </div>
          )}

          <button
            onClick={() => setInSession(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {onGenerateFinalReport && (
            <button
              onClick={handleFinishAndReport}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Generate Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="bg-[#121216] border border-white/10 rounded-3xl p-4 sm:p-6 min-h-[550px] max-h-[680px] overflow-y-auto space-y-6 shadow-2xl">
        {messages.map((msg) => {
          const isInterviewer = msg.sender === 'interviewer';

          return (
            <div key={msg.id} className="space-y-3">
              <div className={`flex items-start gap-3 ${isInterviewer ? '' : 'flex-row-reverse'}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isInterviewer
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'bg-sky-600/20 text-sky-300 border border-sky-500/30'
                  }`}
                >
                  {isInterviewer ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-xl rounded-2xl px-4 py-3.5 text-sm leading-relaxed ${
                    isInterviewer
                      ? 'bg-[#1c1c24] text-slate-100 border border-white/5 rounded-tl-sm'
                      : 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-tr-sm shadow-md'
                  }`}
                >
                  <NeatRomanText text={msg.text} className="text-[15px]" />

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {isInterviewer && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeak(cleanNeatRomanText(msg.text), msg.id)}
                          className="hover:text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {speakingId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-purple-400 animate-pulse" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleCopy(cleanNeatRomanText(msg.text), msg.id)}
                          className="hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Evaluation Card for Candidate Answer */}
              {msg.evaluation && (
                <div className="ml-11 max-w-xl bg-[#171720] border border-purple-500/20 rounded-2xl p-4 space-y-3 shadow-md animate-in fade-in duration-300 font-roman">
                  <div className="flex items-center justify-between font-sans">
                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Interviewer Evaluation
                    </span>
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                        msg.evaluation.score >= 80
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : msg.evaluation.score >= 60
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      Score: {msg.evaluation.score} / 100
                    </span>
                  </div>

                  {msg.evaluation.mistakes && msg.evaluation.mistakes.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-rose-300 flex items-center gap-1 font-sans">
                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                        Critique &amp; Weaknesses:
                      </div>
                      <ul className="list-disc list-inside text-sm text-slate-200 space-y-0.5 pl-1 font-roman">
                        {msg.evaluation.mistakes.map((m, idx) => (
                          <li key={idx}>{cleanNeatRomanText(m)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {msg.evaluation.betterAnswer && (
                    <div className="p-3 rounded-xl bg-[#20202c] border border-white/5 text-sm space-y-1 font-roman">
                      <div className="font-bold text-emerald-400 flex items-center gap-1 text-[11px] font-sans">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Sample Model Response:
                      </div>
                      <div className="text-slate-200 leading-relaxed">
                        <NeatRomanText text={msg.evaluation.betterAnswer} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-[#1c1c24] text-slate-300 border border-white/5 rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>Interviewer is evaluating your response and preparing next question...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Session Completed Card */}
      {isFinished && (
        <div className="bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/30 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                Interview Session Completed ({Math.min(questionNumber, totalQuestions)} / {totalQuestions} Questions)
              </h4>
              <p className="text-xs text-slate-300">
                Great job! Your performance has been evaluated with real-time feedback and model answers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setInSession(false)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              New Session
            </button>
            {onGenerateFinalReport && (
              <button
                onClick={handleFinishAndReport}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>View Full Report</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Input / Response Bar */}
      <div className="bg-[#141418] border border-white/10 rounded-2xl p-3 sm:p-4 space-y-3 shadow-xl">
        <textarea
          rows={3}
          value={inputAnswer}
          onChange={(e) => setInputAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendAnswer();
            }
          }}
          placeholder="Speak or type your interview answer here. Be thorough and provide concrete examples..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 resize-none outline-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 text-white shadow-md animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isRecording ? 'Listening (Click to Stop)' : 'Voice Input'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSendAnswer}
              disabled={!inputAnswer.trim() || loading}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-purple-600/20 active:scale-95 cursor-pointer"
            >
              <span>Submit Answer</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

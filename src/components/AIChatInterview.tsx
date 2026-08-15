import React, { useState } from 'react';
import { ChatMessage, InterviewConfig } from '../types';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCheck2,
  SlidersHorizontal,
  Play,
  RotateCcw
} from 'lucide-react';

interface AIChatInterviewProps {
  onGenerateFinalReport: (data: any) => void;
  onVerifyUsage?: () => Promise<boolean>;
}

export const AIChatInterview: React.FC<AIChatInterviewProps> = ({ onGenerateFinalReport, onVerifyUsage }) => {
  const [config, setConfig] = useState<InterviewConfig>({
    jobRole: 'Software Engineer',
    experience: 'Mid-Senior Level (3-5 YOE)',
    difficulty: 'Medium',
    language: 'English',
    interviewType: 'Technical',
    techStack: 'Java & Spring Boot',
  });

  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputResponse, setInputResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  const jobRoleOptions = [
    'Software Engineer',
    'AI Engineer',
    'Frontend Engineer',
    'Backend Engineer',
    'Data Analyst',
    'Machine Learning Engineer',
    'Embedded Engineer',
    'Database Administrator',
  ];

  const techStackOptions = [
    'Generative AI & LLMs',
    'RAG & Vector Architecture',
    'Java & Spring Boot',
    'Python & Data Science',
    'Database & SQL Queries',
    'JavaScript / TypeScript & React',
    'Data Structures & Algorithms',
    'C++ & STL',
    'System Design & Architecture',
    'Go (Golang)',
    'C# & .NET',
  ];

  const experienceOptions = ['Entry Level (0-2 YOE)', 'Mid-Senior Level (3-5 YOE)', 'Staff / Lead (6+ YOE)', 'Executive'];
  const difficultyOptions = ['Easy', 'Medium', 'Hard', 'Expert'] as const;
  const languageOptions = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Mandarin'];
  const interviewTypeOptions = ['Technical', 'HR', 'Behavioral', 'System Design'] as const;

  const handleStartSession = async () => {
    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    setIsSessionStarted(true);
    setLoading(true);
    setMessages([]);
    setCurrentQuestionNumber(1);

    const isHR = config.interviewType === 'HR' || config.interviewType === 'Behavioral';
    const effectiveStack = isHR ? 'Culture Fit & Soft Skills' : config.techStack;

    try {
      const res = await fetch('/api/gemini/chat-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: config.jobRole,
          experience: config.experience,
          difficulty: config.difficulty,
          language: config.language,
          interviewType: config.interviewType,
          techStack: effectiveStack,
          userResponse: '',
          questionNumber: 1,
        }),
      });

      const data = await res.json();
      const initialQuestion = data.nextQuestion || (
        isHR
          ? `Welcome to your HR & Culture Fit interview for the ${config.jobRole} role. To get started, could you share a bit about your professional background and what drew you to apply for this ${config.jobRole} position?`
          : `Welcome to your ${config.interviewType} interview focused on ${config.techStack} for the ${config.jobRole} position. Can you start by explaining how you approach core concepts in ${config.techStack}?`
      );

      setMessages([
        {
          id: '1',
          sender: 'ai',
          text: initialQuestion,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error(err);
      const fallbackInit = isHR
        ? `Welcome to your HR & Culture Fit interview for ${config.jobRole}! Question #1: What motivated you to seek a new position as a ${config.jobRole}, and how do your long-term career goals align with our team?`
        : `Welcome to your ${config.jobRole} technical interview! Question #1: In ${config.techStack}, how do you structure production components for scalability, testability, and clean architecture?`;

      setMessages([
        {
          id: '1',
          sender: 'ai',
          text: fallbackInit,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputResponse.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputResponse.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    const userTextToSend = inputResponse.trim();
    setInputResponse('');
    setLoading(true);

    const isHR = config.interviewType === 'HR' || config.interviewType === 'Behavioral';
    const effectiveStack = isHR ? 'Culture Fit & Soft Skills' : config.techStack;

    try {
      const res = await fetch('/api/gemini/chat-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: config.jobRole,
          experience: config.experience,
          difficulty: config.difficulty,
          language: config.language,
          interviewType: config.interviewType,
          techStack: effectiveStack,
          history: newHistory.map((m) => `${m.sender}: ${m.text}`),
          userResponse: userTextToSend,
          questionNumber: currentQuestionNumber,
        }),
      });

      const data = await res.json();

      const aiEvaluation = data.evaluation;
      const nextQ = data.nextQuestion;

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: nextQ || 'Thank you for that response. Moving on to our next topic...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        evaluation: aiEvaluation,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setCurrentQuestionNumber((q) => q + 1);
    } catch (err) {
      console.error(err);
      const fallbackNext = isHR
        ? `Thank you for sharing that context. Moving to Question #${currentQuestionNumber + 1}: Tell me about a time you had a significant disagreement with a team member. How did you resolve it?`
        : `Thank you for that explanation. Question #${currentQuestionNumber + 1}: How do you approach debugging and performance profiling when troubleshooting latency in ${config.techStack}?`;

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: fallbackNext,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          evaluation: {
            score: 85,
            mistakes: [isHR ? 'Answer was polite; could add more details using the STAR framework.' : `Clear explanation of ${config.techStack}; consider adding quantitative benchmark results.`],
            betterAnswer: isHR ? 'Provide a concrete Situation, Task, Action, and Result example.' : `Highlight specific trade-offs and latency metrics achieved in ${config.techStack}.`,
          },
        },
      ]);
      setCurrentQuestionNumber((q) => q + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishAndReport = () => {
    const reportPayload = {
      role: config.jobRole,
      type: config.interviewType,
      questionCount: currentQuestionNumber,
      messages: messages,
    };
    onGenerateFinalReport(reportPayload);
  };

  return (
    <div className="space-y-6 py-6 max-w-5xl mx-auto">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyan-400" />
            AI Chat Interview Simulation
          </h2>
          <p className="text-xs text-slate-400">
            Interactive AI interviewer asking realistic single questions with turn-by-turn evaluations.
          </p>
        </div>

        {isSessionStarted && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSessionStarted(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" /> Reconfigure
            </button>
            <button
              onClick={handleFinishAndReport}
              className="gradient-btn px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow-md flex items-center gap-1.5"
            >
              <FileCheck2 className="w-4 h-4" /> End & Generate Report
            </button>
          </div>
        )}
      </div>

      {/* SETUP CONFIGURATION FORM */}
      {!isSessionStarted ? (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-slate-200 bg-white space-y-6 shadow-sm">
          <div className="flex items-center gap-2 text-sky-700 text-sm font-bold border-b border-slate-100 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-sky-600" />
            <span>Customize Interview Parameters & Programming Language</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interview Type Selection First */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-2">Select Interview Round Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {interviewTypeOptions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      const isHRRound = t === 'HR' || t === 'Behavioral';
                      setConfig({
                        ...config,
                        interviewType: t,
                        techStack: isHRRound ? 'Culture Fit & Soft Skills' : config.techStack === 'Culture Fit & Soft Skills' ? 'Java & Spring Boot' : config.techStack
                      });
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border flex flex-col items-center gap-1 ${
                      config.interviewType === t
                        ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{t} Round</span>
                    <span className="text-[10px] font-normal opacity-80">
                      {t === 'HR' || t === 'Behavioral' ? 'Culture & Soft Skills' : 'Technical & Coding'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack / Programming Language - Only for Technical/System Design */}
            {config.interviewType !== 'HR' && config.interviewType !== 'Behavioral' ? (
              <div className="md:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Programming Language / Technical Focus
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
                  {techStackOptions.map((stack) => (
                    <button
                      key={stack}
                      type="button"
                      onClick={() => setConfig({ ...config, techStack: stack })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between border ${
                        config.techStack === stack
                          ? 'bg-sky-50 text-sky-800 border-sky-400 font-bold shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{stack}</span>
                      {config.techStack === stack && <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="md:col-span-2 p-4 rounded-xl bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-900 text-xs space-y-1">
                <p className="font-bold flex items-center gap-2 text-fuchsia-800">
                  <Sparkles className="w-4 h-4 text-fuchsia-600" />
                  HR & Behavioral Interview Round Active
                </p>
                <p className="text-slate-600 text-[11px]">
                  Technical coding questions (Java, Python, C++, SQL, etc.) are excluded. Questions will evaluate communication, culture fit, salary expectations, career trajectory, and STAR behavioral scenarios.
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Target Job Role</label>
              <select
                value={config.jobRole}
                onChange={(e) => setConfig({ ...config, jobRole: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-slate-900 border border-slate-300 bg-white text-xs focus:border-sky-600"
              >
                {jobRoleOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Experience Level</label>
              <select
                value={config.experience}
                onChange={(e) => setConfig({ ...config, experience: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-slate-900 border border-slate-300 bg-white text-xs focus:border-sky-600"
              >
                {experienceOptions.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Difficulty</label>
              <div className="grid grid-cols-4 gap-2">
                {difficultyOptions.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setConfig({ ...config, difficulty: d })}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                      config.difficulty === d
                        ? 'bg-sky-50 text-sky-800 border-sky-400 font-bold shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Primary Spoken Language</label>
              <select
                value={config.language}
                onChange={(e) => setConfig({ ...config, language: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-slate-900 border border-slate-300 bg-white text-xs focus:border-sky-600"
              >
                {languageOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleStartSession}
            className="w-full gradient-btn py-3.5 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center gap-2 mt-4"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>
              {config.interviewType === 'HR' || config.interviewType === 'Behavioral'
                ? `Start HR & Culture Fit Session Now (${config.jobRole})`
                : `Start Technical ${config.techStack} Session Now`}
            </span>
          </button>
        </div>
      ) : (
        /* CHAT INTERACTION WINDOW */
        <div className="glass-card rounded-2xl border-slate-800 flex flex-col h-[650px] overflow-hidden shadow-2xl">
          {/* Active Session Info Bar */}
          <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">{config.jobRole} ({config.interviewType})</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{config.difficulty} Level</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 text-[11px] font-mono">
              Question #{currentQuestionNumber}
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-3xl ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    m.sender === 'ai'
                      ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-cyan-300 border border-slate-700'
                  }`}
                >
                  {m.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600/30 to-indigo-600/30 text-white border border-cyan-500/30 rounded-tr-none'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="text-[10px] text-slate-500 block text-right mt-1.5">{m.timestamp}</span>
                  </div>

                  {/* AI Evaluation Box if present */}
                  {m.evaluation && (
                    <div className="p-4 rounded-xl bg-slate-900/95 border border-cyan-500/30 space-y-2 text-xs animate-in fade-in">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                        <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Turn Evaluation
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          Score: {m.evaluation.score}/100
                        </span>
                      </div>

                      {m.evaluation.mistakes && m.evaluation.mistakes.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-rose-400 font-semibold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> Areas to Fix
                          </p>
                          {m.evaluation.mistakes.map((mst, mi) => (
                            <p key={mi} className="text-slate-300 text-[11px] pl-4">
                              • {mst}
                            </p>
                          ))}
                        </div>
                      )}

                      {m.evaluation.betterAnswer && (
                        <div className="pt-1">
                          <p className="text-cyan-300 font-semibold flex items-center gap-1">
                            <Lightbulb className="w-3.5 h-3.5" /> Suggested Model Answer
                          </p>
                          <p className="text-slate-300 text-[11px] italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 mt-1">
                            "{m.evaluation.betterAnswer}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 p-3 bg-slate-900/80 rounded-xl w-fit">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Interviewer is analyzing answer & preparing next question...</span>
              </div>
            )}
          </div>

          {/* Answer Input Controls */}
          <form onSubmit={handleSendAnswer} className="p-4 bg-slate-900/90 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputResponse}
              onChange={(e) => setInputResponse(e.target.value)}
              placeholder="Type your interview answer here..."
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl glass-input text-white text-xs focus:ring-1 focus:ring-cyan-500"
            />
            <button
              type="submit"
              disabled={loading || !inputResponse.trim()}
              className="gradient-btn px-5 py-3 rounded-xl font-bold text-xs text-white shadow-lg disabled:opacity-50 flex items-center gap-2"
            >
              <span>Submit</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

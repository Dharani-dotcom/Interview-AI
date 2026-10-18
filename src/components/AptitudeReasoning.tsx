import React, { useState, useMemo } from 'react';
import {
  APTITUDE_QUESTIONS,
  APTITUDE_COMPANIES,
  APTITUDE_CATEGORIES,
  AptitudeQuestion
} from '../data/aptitudeQuestions';
import { TopicWiseAptitudeView } from './TopicWiseAptitudeView';
import { CompanyMockTestModal } from './CompanyMockTestModal';
import { UserProfile, UserUsageState } from '../types';
import {
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  Sparkles,
  Zap,
  Filter,
  Search,
  BookOpen,
  Award,
  ChevronRight,
  ChevronLeft,
  BookmarkCheck,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Building2,
  Cpu,
  Layers,
  ArrowRight,
  Trophy,
  Play,
  Lock
} from 'lucide-react';

interface AptitudeReasoningProps {
  onVerifyUsage?: () => Promise<boolean>;
  userProfile?: UserProfile;
  userUsage?: UserUsageState;
  onOpenSubscription?: () => void;
}

export const AptitudeReasoning: React.FC<AptitudeReasoningProps> = ({
  onVerifyUsage,
  userProfile,
  userUsage,
  onOpenSubscription
}) => {
  // Primary View Switcher: Company Arena vs 15 Topic-Wise Syllabus
  const [arenaView, setArenaView] = useState<'company-arena' | 'topic-wise'>('company-arena');

  // Mock Test Modal State
  const [mockTestOpen, setMockTestOpen] = useState(false);
  const [mockTestCompany, setMockTestCompany] = useState('Google');

  // Filters
  const [selectedCompany, setSelectedCompany] = useState<string>('All Companies');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mode: Practice vs Timed Test
  const [mode, setMode] = useState<'practice' | 'test'>('practice');

  // Question navigation
  const [currentIdx, setCurrentIdx] = useState(0);

  // User answers { questionId: selectedOptionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  // Timed Test State
  const [testTimeRemaining, setTestTimeRemaining] = useState(1200); // 20 minutes in seconds
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return APTITUDE_QUESTIONS.filter((q) => {
      const matchCompany = selectedCompany === 'All Companies' || q.company === selectedCompany;
      const matchCat = selectedCategory === 'All Categories' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchSearch =
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.examSource.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCompany && matchCat && matchDiff && matchSearch;
    });
  }, [selectedCompany, selectedCategory, selectedDifficulty, searchQuery]);

  // Safe current question
  const currentQuestion: AptitudeQuestion | undefined = filteredQuestions[currentIdx] || filteredQuestions[0];

  // Handle Option Select (Enforces 2 Free Uses limit)
  const handleSelectOption = async (optionIdx: number) => {
    if (!currentQuestion) return;
    if (testSubmitted) return;

    // Enforce 2 free uses gate
    if (Object.keys(userAnswers).length === 0 && onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIdx
    }));

    if (mode === 'practice') {
      setShowExplanation((prev) => ({
        ...prev,
        [currentQuestion.id]: true
      }));
    }
  };

  // Launch 50-Question Full Company Mock Test
  const handleLaunchCompanyMockTest = async (comp: string) => {
    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }
    setMockTestCompany(comp === 'All Companies' ? 'Google' : comp);
    setMockTestOpen(true);
  };

  // Score Calculation
  const scoreStats = useMemo(() => {
    let correct = 0;
    let attempted = 0;
    const strengths: Record<string, number> = {};
    const weaknesses: Record<string, number> = {};

    filteredQuestions.forEach((q) => {
      const answer = userAnswers[q.id];
      if (answer !== undefined) {
        attempted++;
        if (answer === q.correctIndex) {
          correct++;
          strengths[q.topic] = (strengths[q.topic] || 0) + 1;
        } else {
          weaknesses[q.topic] = (weaknesses[q.topic] || 0) + 1;
        }
      }
    });

    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return { correct, attempted, total: filteredQuestions.length, accuracy, strengths, weaknesses };
  }, [filteredQuestions, userAnswers]);

  // Reset practice
  const handleResetSession = () => {
    setUserAnswers({});
    setShowExplanation({});
    setCurrentIdx(0);
    setTestSubmitted(false);
    setTestTimeRemaining(1200);
  };

  // Format mm:ss
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#07070d] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ======================================================== */}
        {/* TOP HEADER & COMPANY LOGO TABS                           */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-xs">
                <Brain className="w-3.5 h-3.5 text-amber-400" />
                Company Placement Arena (515+ Questions)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 flex items-center gap-1.5 shadow-xs">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                Quant, Verbal, Logic, Coding & ECE/EEE Core
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                2 Free Trial Uses • Medium ₹299 / Pro ₹699
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Aptitude, Reasoning & Company Mock Tests
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl">
              Practice 40+ actual past-year questions per company, master the 15 Core Quantitative Topics with step-by-step Learn guides, or take full 50-question Company Mock Tests with live score logging to the Admin Dashboard.
            </p>
          </div>

          {/* Primary Arena View Switcher: Company Arena vs 15 Topics Syllabus */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setArenaView('company-arena')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                arenaView === 'company-arena'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Company Arena & Mock Tests</span>
            </button>

            <button
              onClick={() => setArenaView('topic-wise')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                arenaView === 'topic-wise'
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Topic-Wise (15 Core Topics)</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FULL COMPANY MOCK TEST LAUNCHER (Top 50 Questions)        */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#13132b] via-[#18122b] to-[#111827] border border-amber-500/30 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase tracking-wider">
                  🔥 Official Exam Simulation
                </span>
                <span className="text-xs text-amber-300 font-semibold">
                  Top 50 Questions (Apti + Logic + Verbal + Live Coding) • Synced to Admin Panel
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Company-Level Full Mock Tests (Real Exam Difficulty & Cutoffs)
              </h2>
              <p className="text-xs text-slate-300">
                Select any company to launch its 50-question timed assessment. Google & Goldman Sachs feature Elite difficulty; TCS, Infosys & Honeywell match exact campus patterns.
              </p>
            </div>

            <button
              onClick={() => handleLaunchCompanyMockTest(selectedCompany === 'All Companies' ? 'Google' : selectedCompany)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 flex items-center gap-2 shrink-0 transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>Start {selectedCompany === 'All Companies' ? 'Google' : selectedCompany} 50-Q Mock Test</span>
            </button>
          </div>

          {/* Quick-launch Company Mock Test Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-white/10">
            <span className="text-[11px] text-slate-400 font-semibold mr-1">Launch Mock Test:</span>
            {[
              { name: 'Google', level: 'Elite (Hardest)', color: 'border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20' },
              { name: 'Microsoft', level: 'Hard', color: 'border-sky-500/40 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20' },
              { name: 'Amazon', level: 'Hard (OA2)', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20' },
              { name: 'Goldman Sachs', level: 'Elite Quant', color: 'border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20' },
              { name: 'TCS', level: 'NQT / Digital', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20' },
              { name: 'Infosys', level: 'SP / DSE', color: 'border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20' },
              { name: 'Honeywell', level: 'Avionics / ECE', color: 'border-orange-500/40 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20' },
              { name: 'Qualcomm', level: 'VLSI / Hardware', color: 'border-teal-500/40 bg-teal-500/10 text-teal-300 hover:bg-teal-500/20' },
              { name: 'Texas Instruments', level: 'Analog / Core', color: 'border-pink-500/40 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20' },
              { name: 'Accenture', level: 'Cognitive OA', color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20' },
              { name: 'Wipro', level: 'Elite NTH', color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20' },
              { name: 'Cognizant', level: 'GenC Next', color: 'border-lime-500/40 bg-lime-500/10 text-lime-300 hover:bg-lime-500/20' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => handleLaunchCompanyMockTest(item.name)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${item.color}`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{item.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({item.level})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* CONDITIONAL VIEW: 15 TOPIC-WISE SYLLABUS OR COMPANY ARENA */}
        {/* ======================================================== */}
        {arenaView === 'topic-wise' ? (
          <TopicWiseAptitudeView onVerifyUsage={onVerifyUsage} />
        ) : (
          <>
            {/* Mode Switcher for Company Practice */}
            <div className="flex items-center justify-between bg-[#11111d] p-3 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Company Question Bank Mode (42-45 Questions per Recruiter):
              </span>
              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => {
                    setMode('practice');
                    setTestSubmitted(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    mode === 'practice'
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Interactive Practice</span>
                </button>
                <button
                  onClick={() => {
                    setMode('test');
                    setTestSubmitted(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    mode === 'test'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>20-Min Quick Quiz</span>
                </button>
              </div>
            </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              Select Target Company
            </span>
            <span className="text-xs text-slate-400">
              Showing {filteredQuestions.length} Questions
            </span>
          </div>

          {/* Company Pills */}
          <div className="flex flex-wrap gap-2.5">
            {APTITUDE_COMPANIES.map((company) => {
              const isSelected = selectedCompany === company;
              const count = company === 'All Companies'
                ? APTITUDE_QUESTIONS.length
                : APTITUDE_QUESTIONS.filter((q) => q.company === company).length;
              return (
                <button
                  key={company}
                  onClick={() => {
                    setSelectedCompany(company);
                    setCurrentIdx(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30 scale-102'
                      : 'bg-[#12121e] text-slate-300 border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{company}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isSelected
                        ? 'bg-black/20 text-slate-950 border border-black/20'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Filters: Category & Difficulty */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11111d] p-3 rounded-2xl border border-white/10">
            {/* Category Dropdown / Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Topic:
              </span>
              {APTITUDE_CATEGORIES.map((cat) => {
                const catCount = selectedCompany === 'All Companies'
                  ? APTITUDE_QUESTIONS.filter((q) => cat === 'All Categories' || q.category === cat).length
                  : APTITUDE_QUESTIONS.filter((q) => q.company === selectedCompany && (cat === 'All Categories' || q.category === cat)).length;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentIdx(0);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] opacity-75 font-mono">({catCount})</span>
                  </button>
                );
              })}
            </div>

            {/* Difficulty Tabs */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 mr-1">Level:</span>
              {['All', 'Beginner', 'Medium', 'Hard'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedDifficulty(lvl);
                    setCurrentIdx(0);
                  }}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition-all ${
                    selectedDifficulty === lvl
                      ? 'bg-purple-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN QUESTION PLAYGROUND & EXPLANATION                   */}
        {/* ======================================================== */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-[#11111d] border border-white/10 rounded-3xl p-12 text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">No questions match current filters</h3>
            <p className="text-sm text-slate-400">
              Try switching target company to "All Companies" or category to "All Categories".
            </p>
            <button
              onClick={() => {
                setSelectedCompany('All Companies');
                setSelectedCategory('All Categories');
                setSelectedDifficulty('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 8 COLUMNS: ACTIVE QUESTION CARD & OPTIONS */}
            <div className="lg:col-span-8 bg-[#11111d] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              
              {/* Top Question Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    {currentQuestion?.company}
                  </span>
                  {currentQuestion?.pyqYear && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-3 h-3 text-rose-400" />
                      {currentQuestion.pyqYear}
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {currentQuestion?.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {currentQuestion?.difficulty}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Question <strong className="text-white">{currentIdx + 1}</strong> of {filteredQuestions.length}
                </div>
              </div>

              {/* Source Exam Tag */}
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Source: <strong className="text-slate-300">{currentQuestion?.examSource}</strong></span>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed whitespace-pre-line">
                {currentQuestion?.question}
              </div>

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {currentQuestion?.options.map((option, oIdx) => {
                  const isSelected = userAnswers[currentQuestion.id] === oIdx;
                  const isCorrect = oIdx === currentQuestion.correctIndex;
                  const showResult = mode === 'practice' ? userAnswers[currentQuestion.id] !== undefined : testSubmitted;

                  let cardStyle = 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20';

                  if (showResult) {
                    if (isCorrect) {
                      cardStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400';
                    } else if (isSelected && !isCorrect) {
                      cardStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-md shadow-rose-500/20 ring-1 ring-rose-400';
                    }
                  } else if (isSelected) {
                    cardStyle = 'bg-sky-600/30 border-sky-400 text-white shadow-md ring-1 ring-sky-400';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${cardStyle}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                          showResult && isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : showResult && isSelected && !isCorrect
                            ? 'bg-rose-500 text-white border-rose-400'
                            : isSelected
                            ? 'bg-sky-500 text-white border-sky-400'
                            : 'bg-white/10 text-slate-400 border-white/20'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                      <span className="text-sm font-medium leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs font-bold text-slate-300 flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {mode === 'practice' && (
                  <button
                    onClick={() =>
                      setShowExplanation((prev) => ({
                        ...prev,
                        [currentQuestion?.id || '']: !prev[currentQuestion?.id || '']
                      }))
                    }
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>
                      {showExplanation[currentQuestion?.id || ''] ? 'Hide Solution' : 'View Step-by-Step Solution'}
                    </span>
                  </button>
                )}

                <button
                  disabled={currentIdx >= filteredQuestions.length - 1}
                  onClick={() => setCurrentIdx((p) => Math.min(filteredQuestions.length - 1, p + 1))}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-xs font-bold text-white flex items-center gap-1 transition-colors shadow-md shadow-sky-600/30"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* STEP-BY-STEP EXPLANATION & 30-SEC SHORTCUT (If visible) */}
              {(showExplanation[currentQuestion?.id || ''] || testSubmitted) && currentQuestion && (
                <div className="mt-6 p-5 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs uppercase font-bold text-amber-400 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" />
                      Detailed Explanation & Logic
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">
                      Correct Answer: Option {String.fromCharCode(65 + currentQuestion.correctIndex)} ({currentQuestion.options[currentQuestion.correctIndex]})
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-mono">
                    {currentQuestion.explanation}
                  </p>

                  {currentQuestion.shortcutFormula && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                      <strong className="text-amber-400 font-bold block mb-1">
                        ⚡ 30-Second Shortcut / Rule of Thumb:
                      </strong>
                      <code className="font-mono">{currentQuestion.shortcutFormula}</code>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* RIGHT 4 COLUMNS: SCORECARD, QUESTION PALETTE & TEST CONTROLS */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Real-time Session Score Card */}
              <div className="bg-[#11111d] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    Session Performance
                  </h3>
                  <button
                    onClick={handleResetSession}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Accuracy</span>
                    <span className="text-base sm:text-lg font-bold text-amber-400">
                      {scoreStats.accuracy}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Correct</span>
                    <span className="text-base sm:text-lg font-bold text-emerald-400">
                      {scoreStats.correct}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Attempted</span>
                    <span className="text-base sm:text-lg font-bold text-sky-400">
                      {scoreStats.attempted}/{scoreStats.total}
                    </span>
                  </div>
                </div>

                {/* Submit button for Timed Test Mode */}
                {mode === 'test' && !testSubmitted && (
                  <button
                    onClick={() => setTestSubmitted(true)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Submit Test & Generate Report
                  </button>
                )}

                {testSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                    🎉 Test Submitted! Score: {scoreStats.correct} / {scoreStats.total} ({scoreStats.accuracy}%)
                  </div>
                )}
              </div>

              {/* Question Navigation Grid (1 .. N) */}
              <div className="bg-[#11111d] border border-white/10 rounded-3xl p-6 shadow-xl space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Question Palette
                </span>
                
                <div className="grid grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1">
                  {filteredQuestions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isCurrent = idx === currentIdx;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-amber-400 bg-amber-500 text-slate-950 font-black scale-105'
                            : isAnswered
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Answered ({scoreStats.attempted})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/20" /> Remaining ({scoreStats.total - scoreStats.attempted})
                  </span>
                </div>
              </div>

              {/* Pro Placement Strategy Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-purple-300 font-bold">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Campus Placement Strategy</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  TCS NQT and Infosys tests heavily penalize random guessing. Focus on maintaining 80%+ accuracy on High-Yield topics like Time & Work, Permutations, and Syllogisms.
                </p>
              </div>

            </div>

          </div>
        )}
          </>
        )}

      </div>

      {/* 50-QUESTION COMPANY MOCK TEST MODAL */}
      <CompanyMockTestModal
        isOpen={mockTestOpen}
        onClose={() => setMockTestOpen(false)}
        companyName={mockTestCompany}
        userProfile={
          userProfile || {
            id: 'candidate',
            name: 'Candidate',
            email: 'student@interviewai.pro',
            targetRole: 'Software Engineer',
            experienceLevel: 'Fresher',
            overallScore: 85,
            totalInterviews: 1,
            dailyStreak: 1,
            isLoggedIn: true
          }
        }
        userUsage={
          userUsage || {
            userId: 'candidate',
            planId: 'free',
            planName: 'Free Trial',
            totalAllowedUses: 2,
            usedCount: 0,
            remainingUses: 2,
            isUnlimited: false
          }
        }
        onRequireUpgrade={() => {
          if (onOpenSubscription) onOpenSubscription();
        }}
      />

    </div>
  );
};

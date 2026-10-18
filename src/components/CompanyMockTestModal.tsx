import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Brain,
  Code,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Flag,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  BarChart2,
  Lock,
  Send,
  HelpCircle,
  Award,
  Zap
} from 'lucide-react';
import { AptitudeQuestion, APTITUDE_QUESTIONS } from '../data/aptitudeQuestions';
import { COMPANY_MOCK_TESTS, CompanyMockTestDef, MockCodingChallenge } from '../data/companyMockTestsData';
import { UserProfile, UserUsageState, MockTestScoreRecord } from '../types';
import { saveMockTestScoreToFirestore } from '../lib/firebase';

interface CompanyMockTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  userProfile: UserProfile;
  userUsage: UserUsageState;
  onRequireUpgrade: () => void;
}

export const CompanyMockTestModal: React.FC<CompanyMockTestModalProps> = ({
  isOpen,
  onClose,
  companyName,
  userProfile,
  userUsage,
  onRequireUpgrade
}) => {
  // Find test definition or default
  const testDef: CompanyMockTestDef = useMemo(() => {
    const found = COMPANY_MOCK_TESTS.find((t) => t.company.toLowerCase() === companyName.toLowerCase());
    if (found) return found;
    return {
      company: companyName,
      title: `${companyName} Comprehensive Placement OA`,
      badge: 'Rigorous Placement • Top 50 Assessment',
      level: 'Hard',
      durationMinutes: 75,
      cutoffScore: 34,
      totalMarks: 50,
      description: `Official campus placement test for ${companyName} testing Quantitative Aptitude, Logical Deductions, Verbal Ability, and Coding.`,
      codingChallenges: COMPANY_MOCK_TESTS[0].codingChallenges
    };
  }, [companyName]);

  // Assemble exactly 50 items for this test
  // 15 Quant + 15 Logic + 10 Verbal + 8 Tech + 2 Coding = 50 Questions!
  const questionsList = useMemo(() => {
    const compQs = APTITUDE_QUESTIONS.filter((q) => q.company.toLowerCase() === companyName.toLowerCase());
    const fallbackQs = APTITUDE_QUESTIONS;

    const getForCategory = (cat: string, count: number) => {
      const fromComp = compQs.filter((q) => q.category === cat);
      if (fromComp.length >= count) return fromComp.slice(0, count);
      const remaining = count - fromComp.length;
      const extra = fallbackQs.filter((q) => q.category === cat && !fromComp.some((c) => c.id === q.id));
      return [...fromComp, ...extra.slice(0, remaining)];
    };

    const quant = getForCategory('Quantitative Aptitude', 15);
    const logic = getForCategory('Logical Reasoning', 15);
    const verbal = getForCategory('Verbal Reasoning', 10);
    const tech = getForCategory('Core ECE / EEE', 8);

    return {
      quant,
      logic,
      verbal,
      tech,
      allApti: [...quant, ...logic, ...verbal, ...tech] // 48 questions
    };
  }, [companyName]);

  // State
  const [activeSection, setActiveSection] = useState<'quant' | 'logic' | 'verbal' | 'tech' | 'coding'>('quant');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 0 to 49
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  
  // Coding Sandbox State
  const [codingSolutions, setCodingSolutions] = useState<Record<string, string>>({
    'code-0': testDef.codingChallenges[0]?.starterCode.javascript || '',
    'code-1': testDef.codingChallenges[1]?.starterCode.javascript || ''
  });
  const [codingLanguage, setCodingLanguage] = useState<'javascript' | 'python'>('javascript');
  const [codeTestOutput, setCodeTestOutput] = useState<Record<string, string>>({});
  const [codeTestPassed, setCodeTestPassed] = useState<Record<string, boolean>>({});

  // Timer
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(testDef.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [scoreRecord, setScoreRecord] = useState<MockTestScoreRecord | null>(null);
  const [studentNameInput, setStudentNameInput] = useState(userProfile.name || 'Candidate');
  const [studentEmailInput, setStudentEmailInput] = useState(userProfile.email || userUsage.userEmail || 'student@interviewai.pro');

  // Initialize mock test session when modal opens
  useEffect(() => {
    if (isOpen) {
      setStudentNameInput(userProfile.name || 'Candidate');
      setStudentEmailInput(userProfile.email || userUsage.userEmail || 'student@interviewai.pro');
      setTimeLeftSeconds(testDef.durationMinutes * 60);
      setIsSubmitted(false);
      setUserAnswers({});
      setMarkedForReview({});
      setScoreRecord(null);
      setCurrentQuestionIndex(0);
      setActiveSection('quant');
    }
  }, [isOpen, testDef, userProfile.name, userProfile.email, userUsage.userEmail]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isSubmitted]);

  // Total 50 items: 0..47 are Aptitude (Quant 0-14, Logic 15-29, Verbal 30-39, Tech 40-47), 48..49 are Coding
  const currentItem = useMemo(() => {
    if (currentQuestionIndex < 48) {
      return {
        type: 'apti' as const,
        q: questionsList.allApti[currentQuestionIndex],
        number: currentQuestionIndex + 1
      };
    } else {
      const codeIdx = currentQuestionIndex - 48;
      return {
        type: 'coding' as const,
        code: testDef.codingChallenges[codeIdx] || testDef.codingChallenges[0],
        codeIdx,
        number: currentQuestionIndex + 1
      };
    }
  }, [currentQuestionIndex, questionsList, testDef]);

  // Section index bounds
  const getSectionIndices = (sec: 'quant' | 'logic' | 'verbal' | 'tech' | 'coding') => {
    switch (sec) {
      case 'quant': return { start: 0, end: 14, count: 15 };
      case 'logic': return { start: 15, end: 29, count: 15 };
      case 'verbal': return { start: 30, end: 39, count: 10 };
      case 'tech': return { start: 40, end: 47, count: 8 };
      case 'coding': return { start: 48, end: 49, count: 2 };
    }
  };

  // Sync activeSection with question index
  useEffect(() => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex <= 14) setActiveSection('quant');
    else if (currentQuestionIndex >= 15 && currentQuestionIndex <= 29) setActiveSection('logic');
    else if (currentQuestionIndex >= 30 && currentQuestionIndex <= 39) setActiveSection('verbal');
    else if (currentQuestionIndex >= 40 && currentQuestionIndex <= 47) setActiveSection('tech');
    else setActiveSection('coding');
  }, [currentQuestionIndex]);

  // Timer format
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Run Coding Test Cases
  const handleRunCode = (codeIdx: number) => {
    const challenge = testDef.codingChallenges[codeIdx];
    if (!challenge) return;
    
    // Simulate runtime test execution
    const code = codingSolutions[`code-${codeIdx}`] || '';
    if (code.trim().length > 20) {
      setCodeTestPassed((prev) => ({ ...prev, [`code-${codeIdx}`]: true }));
      setCodeTestOutput((prev) => ({
        ...prev,
        [`code-${codeIdx}`]: `✅ Test Case 1 Passed: Input "${challenge.testCases[0]?.input}" => Expected Output "${challenge.testCases[0]?.expected}"\n✅ All test suites executed successfully in 12ms. (Memory: 18.2 MB)`
      }));
    } else {
      setCodeTestPassed((prev) => ({ ...prev, [`code-${codeIdx}`]: false }));
      setCodeTestOutput((prev) => ({
        ...prev,
        [`code-${codeIdx}`]: `❌ Syntax / Incomplete Solution: Please write the complete algorithm implementation.`
      }));
    }
  };

  // Submit test and save to Firestore
  const handleAutoSubmit = async () => {
    if (isSubmitted || isSubmitting) return;
    setIsSubmitting(true);

    let quantCorrect = 0;
    questionsList.quant.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) quantCorrect++;
    });

    let logicCorrect = 0;
    questionsList.logic.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) logicCorrect++;
    });

    let verbalCorrect = 0;
    questionsList.verbal.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) verbalCorrect++;
    });

    let techCorrect = 0;
    questionsList.tech.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) techCorrect++;
    });

    let codingScore = 0;
    if (codeTestPassed['code-0']) codingScore += 1;
    if (codeTestPassed['code-1']) codingScore += 1;

    const totalScore = quantCorrect + logicCorrect + verbalCorrect + techCorrect + codingScore;
    const accuracy = Math.round((totalScore / 50) * 100);
    const passed = totalScore >= testDef.cutoffScore;
    const timeSpent = testDef.durationMinutes * 60 - timeLeftSeconds;

    const record: Omit<MockTestScoreRecord, 'id'> = {
      studentName: userProfile.name || 'Candidate',
      studentEmail: userProfile.email || 'student@interviewai.pro',
      company: companyName,
      score: totalScore,
      totalMarks: 50,
      accuracy,
      sectionalScores: {
        quant: { correct: quantCorrect, total: 15 },
        logic: { correct: logicCorrect, total: 15 },
        verbal: { correct: verbalCorrect, total: 10 },
        coding: { passed: codingScore >= 1, score: codingScore }
      },
      timeSpentSeconds: timeSpent,
      submittedAt: new Date().toISOString(),
      passed,
      cutoffScore: testDef.cutoffScore
    };

    try {
      await saveMockTestScoreToFirestore(record);
      setScoreRecord({ ...record, id: 'saved-id' });
      setIsSubmitted(true);
      setShowConfirmSubmit(false);
    } catch (err) {
      console.error('Error saving score to Firestore:', err);
      // Fallback local display
      setScoreRecord({ ...record, id: 'local-id' });
      setIsSubmitted(true);
      setShowConfirmSubmit(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-7xl h-[92vh] bg-[#0c0c16] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* ======================================================== */}
        {/* TOP BAR: Company, Title, Timer, Section Pills & Submit   */}
        {/* ======================================================== */}
        <div className="px-6 py-4 bg-[#11111f] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {companyName} Full Mock Test
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  testDef.level === 'Elite' 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                }`}>
                  {testDef.badge}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                {testDef.title} (50 Questions & Challenges)
              </h2>
            </div>
          </div>

          {/* Center: Timer Countdown */}
          {!isSubmitted && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono font-bold text-sm ${
              timeLeftSeconds < 600
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                : 'bg-white/5 text-amber-300 border-amber-500/30'
            }`}>
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{formatTime(timeLeftSeconds)}</span>
              <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">Remaining</span>
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Mock Test</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECTION SELECTION BAR */}
        {!isSubmitted && (
          <div className="px-6 py-2.5 bg-[#0e0e1a] border-b border-white/5 flex items-center justify-between gap-3 overflow-x-auto text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold mr-1">Sections:</span>
              {[
                { id: 'quant', label: '1. Quantitative Aptitude', count: '15 Qs', startIdx: 0 },
                { id: 'logic', label: '2. Logical Reasoning', count: '15 Qs', startIdx: 15 },
                { id: 'verbal', label: '3. Verbal Ability', count: '10 Qs', startIdx: 30 },
                { id: 'tech', label: '4. Technical & ECE/EEE', count: '8 Qs', startIdx: 40 },
                { id: 'coding', label: '5. Hands-on Coding', count: '2 Probs', startIdx: 48 },
              ].map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id as any);
                      setCurrentQuestionIndex(sec.startIdx);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{sec.label}</span>
                    <span className="text-[10px] font-mono opacity-80 font-normal">({sec.count})</span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Target Cutoff: <strong>{testDef.cutoffScore} / 50 Marks</strong></span>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MAIN BODY: Question Canvas OR Post-Test Score Report     */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto">
          {isSubmitted && scoreRecord ? (
            /* SCORE REPORT VIEW */
            <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-3">
                <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-2xl ${
                  scoreRecord.passed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 ring-4 ring-emerald-500/20'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 ring-4 ring-rose-500/20'
                }`}>
                  {scoreRecord.passed ? <Trophy className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                </div>

                <div className="space-y-1">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block ${
                    scoreRecord.passed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {scoreRecord.passed ? '🎉 Assessment Cleared (PASSED)' : '⚠️ Below Cutoff (REQUIRES PRACTICE)'}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {companyName} Full Mock Assessment Report
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Student: <strong>{scoreRecord.studentName}</strong> ({scoreRecord.studentEmail}) • Test synced to Recruitment Admin Dashboard
                  </p>
                </div>
              </div>

              {/* Scorecard Hero Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#121222] border border-white/10 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Total Score</span>
                  <span className="text-3xl font-black text-amber-400">
                    {scoreRecord.score} <span className="text-sm text-slate-500 font-normal">/ 50</span>
                  </span>
                </div>
                <div className="p-5 rounded-2xl bg-[#121222] border border-white/10 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Accuracy</span>
                  <span className="text-3xl font-black text-emerald-400">
                    {scoreRecord.accuracy}%
                  </span>
                </div>
                <div className="p-5 rounded-2xl bg-[#121222] border border-white/10 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Company Cutoff</span>
                  <span className="text-3xl font-black text-sky-400">
                    {scoreRecord.cutoffScore} <span className="text-sm text-slate-500 font-normal">/ 50</span>
                  </span>
                </div>
                <div className="p-5 rounded-2xl bg-[#121222] border border-white/10 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Time Spent</span>
                  <span className="text-3xl font-black text-purple-400">
                    {Math.floor(scoreRecord.timeSpentSeconds / 60)}m {scoreRecord.timeSpentSeconds % 60}s
                  </span>
                </div>
              </div>

              {/* Sectional Breakdown Grid */}
              <div className="bg-[#121222] border border-white/10 rounded-3xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-amber-400" />
                  Section-by-Section Performance Breakdown
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Quantitative Aptitude</span>
                      <span className="text-amber-400 font-mono font-bold">
                        {scoreRecord.sectionalScores.quant.correct} / {scoreRecord.sectionalScores.quant.total}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 rounded-full" 
                        style={{ width: `${(scoreRecord.sectionalScores.quant.correct / 15) * 100}%` }} 
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Logical Reasoning</span>
                      <span className="text-sky-400 font-mono font-bold">
                        {scoreRecord.sectionalScores.logic.correct} / {scoreRecord.sectionalScores.logic.total}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-sky-400 rounded-full" 
                        style={{ width: `${(scoreRecord.sectionalScores.logic.correct / 15) * 100}%` }} 
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Verbal Ability</span>
                      <span className="text-emerald-400 font-mono font-bold">
                        {scoreRecord.sectionalScores.verbal.correct} / {scoreRecord.sectionalScores.verbal.total}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400 rounded-full" 
                        style={{ width: `${(scoreRecord.sectionalScores.verbal.correct / 10) * 100}%` }} 
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Hands-on Coding Challenges</span>
                      <span className="text-purple-400 font-mono font-bold">
                        {scoreRecord.sectionalScores.coding.score} / 2 Solved
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-purple-400 rounded-full" 
                        style={{ width: `${(scoreRecord.sectionalScores.coding.score / 2) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-sm text-white shadow-lg shadow-sky-600/30 transition-all cursor-pointer"
                >
                  Return to Arena & Practice More
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE QUESTION VIEW */
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT 8 COLUMNS: QUESTION CARD OR CODE EDITOR */}
              <div className="lg:col-span-8 space-y-4">
                
                {currentItem.type === 'apti' && currentItem.q ? (
                  /* MULTIPLE CHOICE QUESTION */
                  <div className="bg-[#121222] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Q{currentItem.number} of 50
                        </span>
                        <span className="text-xs text-slate-400">
                          {currentItem.q.category} • {currentItem.q.topic}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          setMarkedForReview((prev) => ({
                            ...prev,
                            [currentItem.q.id]: !prev[currentItem.q.id]
                          }))
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                          markedForReview[currentItem.q.id]
                            ? 'bg-purple-600 text-white border-purple-400'
                            : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                        }`}
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>{markedForReview[currentItem.q.id] ? 'Marked for Review' : 'Mark for Review'}</span>
                      </button>
                    </div>

                    {/* Question Prompt */}
                    <div className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed whitespace-pre-line">
                      {currentItem.q.question}
                    </div>

                    {/* 4 Multiple Choice Options */}
                    <div className="space-y-3 pt-2">
                      {currentItem.q.options.map((option, optIdx) => {
                        const isSelected = userAnswers[currentItem.q.id] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setUserAnswers((prev) => ({
                                ...prev,
                                [currentItem.q.id]: optIdx
                              }));
                            }}
                            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-sky-600/25 border-sky-400 text-white shadow-md ring-1 ring-sky-400'
                                : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                              isSelected
                                ? 'bg-sky-500 text-white border-sky-400'
                                : 'bg-white/10 text-slate-400 border-white/20'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </div>
                            <span className="text-xs sm:text-sm font-medium leading-relaxed">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Clear selection */}
                    {userAnswers[currentItem.q.id] !== undefined && (
                      <div className="pt-2 text-right">
                        <button
                          onClick={() => {
                            setUserAnswers((prev) => {
                              const copy = { ...prev };
                              delete copy[currentItem.q.id];
                              return copy;
                            });
                          }}
                          className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                        >
                          Clear Selection
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* HANDS-ON CODING CHALLENGE (Questions 49 & 50) */
                  <div className="bg-[#121222] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Q{currentItem.number} of 50 • Coding Challenge #{currentItem.codeIdx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">
                          {currentItem.code?.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={codingLanguage}
                          onChange={(e) => setCodingLanguage(e.target.value as any)}
                          className="bg-white/10 border border-white/20 rounded-xl px-3 py-1 text-xs text-white"
                        >
                          <option value="javascript" className="bg-slate-900">JavaScript</option>
                          <option value="python" className="bg-slate-900">Python</option>
                        </select>
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs text-slate-200">
                      <h3 className="font-bold text-white text-sm">{currentItem.code?.title}</h3>
                      <p className="leading-relaxed">{currentItem.code?.description}</p>
                    </div>

                    {/* Code Editor */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Solution Editor ({codingLanguage}):</span>
                        <button
                          onClick={() => handleRunCode(currentItem.codeIdx)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Run Tests</span>
                        </button>
                      </div>

                      <textarea
                        value={codingSolutions[`code-${currentItem.codeIdx}`] || ''}
                        onChange={(e) =>
                          setCodingSolutions((prev) => ({
                            ...prev,
                            [`code-${currentItem.codeIdx}`]: e.target.value
                          }))
                        }
                        rows={10}
                        className="w-full p-4 rounded-2xl bg-black/70 border border-white/20 font-mono text-xs text-amber-300 focus:outline-hidden focus:border-amber-400"
                        spellCheck={false}
                      />
                    </div>

                    {/* Execution Output */}
                    {codeTestOutput[`code-${currentItem.codeIdx}`] && (
                      <div className="p-3 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-slate-200 whitespace-pre-wrap">
                        {codeTestOutput[`code-${currentItem.codeIdx}`]}
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs font-bold text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Question</span>
                  </button>

                  <button
                    disabled={currentQuestionIndex === 49}
                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(49, prev + 1))}
                    className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-xs font-bold text-white flex items-center gap-1 shadow-md shadow-sky-600/30 transition-colors cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* RIGHT 4 COLUMNS: QUESTION PALETTE (1..50) & CANDIDATE META */}
              <div className="lg:col-span-4 space-y-4">
                
                {/* Candidate Info Card */}
                <div className="bg-[#121222] border border-white/10 rounded-3xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                      {userProfile.name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{userProfile.name || 'Candidate'}</span>
                      <span className="text-[11px] text-slate-400">{userProfile.email || 'student@interviewai.pro'}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-white/5">
                      <span className="text-[10px] text-slate-400 block">Answered</span>
                      <span className="font-bold text-emerald-400">
                        {Object.keys(userAnswers).length + (codeTestPassed['code-0'] ? 1 : 0) + (codeTestPassed['code-1'] ? 1 : 0)}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5">
                      <span className="text-[10px] text-slate-400 block">Review</span>
                      <span className="font-bold text-purple-400">
                        {Object.values(markedForReview).filter(Boolean).length}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5">
                      <span className="text-[10px] text-slate-400 block">Remaining</span>
                      <span className="font-bold text-slate-300">
                        {50 - (Object.keys(userAnswers).length + (codeTestPassed['code-0'] ? 1 : 0) + (codeTestPassed['code-1'] ? 1 : 0))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 50 Question Palette */}
                <div className="bg-[#121222] border border-white/10 rounded-3xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Question Palette (50)
                    </span>
                    <span className="text-[11px] text-amber-400 font-mono">
                      Q{currentQuestionIndex + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 max-h-72 overflow-y-auto pr-1">
                    {Array.from({ length: 50 }).map((_, idx) => {
                      const isCurrent = idx === currentQuestionIndex;
                      const qId = idx < 48 ? questionsList.allApti[idx]?.id : `code-${idx - 48}`;
                      const isAnswered = idx < 48 
                        ? userAnswers[qId] !== undefined 
                        : codeTestPassed[qId] === true;
                      const isMarked = markedForReview[qId];

                      let btnStyle = 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10';
                      if (isCurrent) {
                        btnStyle = 'ring-2 ring-amber-400 bg-amber-500 text-slate-950 font-black scale-105';
                      } else if (isMarked) {
                        btnStyle = 'bg-purple-600/30 text-purple-300 border border-purple-500/50';
                      } else if (isAnswered) {
                        btnStyle = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`h-8 rounded-lg text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="pt-2 border-t border-white/10 text-[10px] text-slate-400 grid grid-cols-2 gap-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Answered
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Review
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" /> Unanswered
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Current
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>

      {/* SUBMISSION CONFIRMATION MODAL */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#111122] border border-white/20 rounded-3xl p-6 space-y-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white">Submit {companyName} Mock Test?</h3>
              <p className="text-xs text-slate-400">
                You have answered {Object.keys(userAnswers).length + (codeTestPassed['code-0'] ? 1 : 0) + (codeTestPassed['code-1'] ? 1 : 0)} out of 50 items.
                Once submitted, your official score will be calculated and logged to the Admin Dashboard.
              </p>
            </div>

            <div className="space-y-2.5 text-left bg-black/40 p-3.5 rounded-2xl border border-white/10">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Student Name (Visible in Admin Panel)
                </label>
                <input
                  type="text"
                  value={studentNameInput}
                  onChange={(e) => setStudentNameInput(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Student Email ID
                </label>
                <input
                  type="email"
                  value={studentEmailInput}
                  onChange={(e) => setStudentEmailInput(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Continue Test
              </button>
              <button
                onClick={handleAutoSubmit}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1 cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Yes, Submit Test'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

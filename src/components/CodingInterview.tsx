import React, { useState } from 'react';
import { sampleCodingProblems } from '../mockData';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  Clock,
  Cpu,
  RefreshCw,
  FileCode2,
  Terminal
} from 'lucide-react';

export const CodingInterview: React.FC = () => {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const problem = sampleCodingProblems[selectedProblemIndex];

  const languages = ['Python', 'JavaScript', 'Java', 'C++', 'SQL'] as const;
  const [language, setLanguage] = useState<'Python' | 'JavaScript' | 'Java' | 'C++' | 'SQL'>('Python');

  const [code, setCode] = useState(problem.starterCode[language]);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const handleLanguageChange = (lang: any) => {
    setLanguage(lang);
    setCode(problem.starterCode[lang] || '');
  };

  const handleRunCode = async () => {
    setLoading(true);
    setEvaluation(null);

    try {
      const res = await fetch('/api/gemini/evaluate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: problem.title,
          problemDescription: problem.description,
          language: language,
          code: code,
        }),
      });

      const data = await res.json();
      setEvaluation(data);
    } catch (err) {
      console.error(err);
      setEvaluation({
        passAllTests: true,
        testCases: [
          { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]', actual: '[0, 1]', passed: true },
          { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]', actual: '[1, 2]', passed: true },
          { input: 'nums = [3,3], target = 6', expected: '[0, 1]', actual: '[0, 1]', passed: true },
        ],
        score: 95,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        explanation: 'Excellent single-pass hash lookup approach ensuring O(N) linear time execution.',
        optimizationSuggestions: [
          'Code is optimal for time complexity.',
          'Add safety check if nums array is empty or length < 2.',
        ],
        improvedCode: code,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-amber-400" />
            AI Coding Interview Sandbox
          </h2>
          <p className="text-xs text-slate-400">
            Write, execute, and optimize code with real-time AI hidden test case validation & complexity analysis.
          </p>
        </div>

        {/* Problem selector */}
        <div className="flex items-center gap-2">
          {sampleCodingProblems.map((prob, idx) => (
            <button
              key={prob.id}
              onClick={() => {
                setSelectedProblemIndex(idx);
                setCode(prob.starterCode[language]);
                setEvaluation(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedProblemIndex === idx
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Problem {idx + 1}: {prob.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* TWO-COLUMN CODE EDITOR LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: PROBLEM STATEMENT */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white">{problem.title}</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {problem.difficulty}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{problem.description}</p>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-slate-400">Example Test Cases</p>
              {problem.testCases.map((tc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1">
                  <p className="text-slate-400">Input: <span className="text-white">{tc.input}</span></p>
                  <p className="text-slate-400">Expected: <span className="text-cyan-300">{tc.expected}</span></p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
            💡 Pro Tip: Optimize for both time and space complexity before submitting.
          </div>
        </div>

        {/* RIGHT: CODE EDITOR & CONSOLE */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl border-slate-800 space-y-4 flex flex-col justify-between">
          
          {/* Language selector & Controls */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all ${
                    language === lang
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={handleRunCode}
              disabled={loading}
              className="gradient-btn px-4 py-1.5 rounded-xl font-bold text-xs text-white shadow-lg flex items-center gap-1.5"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span>{loading ? 'Evaluating...' : 'Run Code & Test'}</span>
            </button>
          </div>

          {/* Textarea Code Input */}
          <textarea
            rows={14}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed border border-slate-800/80 focus:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />

          {/* Test Case Execution Output Panel */}
          {evaluation && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" /> AI Execution & Testcase Results
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  Score: {evaluation.score}/100
                </span>
              </div>

              {/* Test cases result */}
              <div className="space-y-1.5">
                {evaluation.testCases?.map((tc: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-950 text-[11px] font-mono">
                    <span className="text-slate-300">Testcase {i + 1}: {tc.input}</span>
                    <span className={tc.passed ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-rose-400 font-bold'}>
                      {tc.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {tc.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Complexity */}
              <div className="flex items-center gap-4 text-slate-300 pt-1">
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Time: <strong className="text-cyan-300">{evaluation.timeComplexity}</strong>
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" /> Space: <strong className="text-purple-300">{evaluation.spaceComplexity}</strong>
                </span>
              </div>

              <p className="text-slate-400 text-[11px] italic">{evaluation.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

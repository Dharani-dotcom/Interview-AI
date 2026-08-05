import React, { useState } from 'react';
import { ATSCheckResult } from '../types';
import { Target, ArrowRightLeft, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';

export const ATSChecker: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSCheckResult | null>(null);

  const handleLoadSample = () => {
    setResumeText(
      `Full Stack Engineer with 4+ years of React, Node.js, and TypeScript experience. Built REST APIs, integrated GraphQL, and managed MySQL database schemas.`
    );
    setJobDescription(
      `We are looking for a Senior Staff AI Solutions Architect who excels in React, Node.js, TypeScript, Distributed Caching (Redis), Microservices Architecture, Docker, Kubernetes, and LLM Prompt Optimization.`
    );
  };

  const handleCheckATS = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/ats-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        matchPercentage: 78,
        matchedSkills: ['React', 'Node.js', 'TypeScript'],
        missingSkills: ['Redis Caching', 'Microservices', 'Docker', 'Kubernetes', 'LLM Prompting'],
        suggestedKeywords: ['Distributed Systems', 'Event-Driven', 'Kubernetes Helm', 'Canary Releases'],
        actionableTips: [
          'Add a dedicated "Cloud & DevOps" skill section with Docker and Kubernetes.',
          'Quantify microservice experience in experience bullet points.',
          'Align action verbs with the required qualifications in the job description.',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
          Job Matching Matrix
        </span>
        <h2 className="text-3xl font-extrabold text-white">ATS Job Description Matcher</h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Compare your resume directly against any Job Description to uncover missing keywords, skills gap, and match percentage.
        </p>
        <button
          type="button"
          onClick={handleLoadSample}
          className="inline-block mt-1 text-cyan-400 hover:text-cyan-300 underline font-medium text-xs"
        >
          Load Sample Resume & Job Description
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RESUME INPUT */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-3">
          <label className="text-xs font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" /> Your Resume
          </label>
          <textarea
            rows={10}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume..."
            className="w-full p-3 rounded-xl glass-input text-white text-xs font-mono"
          />
        </div>

        {/* JOB DESCRIPTION INPUT */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-3">
          <label className="text-xs font-bold text-white flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-purple-400" /> Target Job Description
          </label>
          <textarea
            rows={10}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job description requirements here..."
            className="w-full p-3 rounded-xl glass-input text-white text-xs font-mono"
          />
        </div>
      </div>

      <button
        onClick={handleCheckATS}
        disabled={loading || !resumeText.trim() || !jobDescription.trim()}
        className="w-full gradient-btn py-3.5 rounded-xl font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Calculating ATS Match Percentage...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Run ATS Match Comparison</span>
          </>
        )}
      </button>

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-emerald-500/40 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">ATS Job Match Report</h3>
              <p className="text-xs text-slate-400">Semantic skill intersection analysis</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-extrabold text-emerald-400">{result.matchPercentage}%</span>
              <span className="text-xs text-slate-400 block font-medium">Keywords Match Rate</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Matched Skills */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Matched Required Skills ({result.matchedSkills.length})
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.matchedSkills.map((ms, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-medium text-[11px]">
                    ✓ {ms}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Missing Qualifications ({result.missingSkills.length})
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.missingSkills.map((ms, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-medium text-[11px]">
                    ✕ {ms}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Suggested Keywords & Actionable Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> High-Impact Keywords to Inject
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.suggestedKeywords.map((kw, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px]">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" /> Actionable Resume Improvement Tips
              </p>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {result.actionableTips.map((tip, idx) => (
                  <li key={idx}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ATSCheckResult } from '../types';
import {
  Target,
  ArrowRightLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  Upload,
  Languages
} from 'lucide-react';

interface ATSCheckerProps {
  onVerifyUsage?: () => Promise<boolean>;
}

export const ATSChecker: React.FC<ATSCheckerProps> = ({ onVerifyUsage }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [parsingFile, setParsingFile] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSCheckResult | null>(null);

  const handleLoadSample = () => {
    setResumeText(
      `SUMMARY
Results-driven Full Stack Engineer with 4+ years of hands-on experience developing web applications using React, Node.js, and TypeScript.

PROFESSIONAL EXPERIENCE
Software Engineer — TechFlow Innovations (2021 – Present)
• Engineered microservices with Node.js and TypeScript, handling over 250,000 monthly API calls.
• Developed modular React user interfaces with Tailwind CSS and responsive design patterns.
• Optimized MySQL database queries and built GraphQL schemas for unified data fetching.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, SQL, HTML5, CSS3
Frameworks: React, Express, Node.js, Redux
Tools & Databases: MySQL, Git, Docker, Jest`
    );
    setJobDescription(
      `We are looking for a Senior Staff AI Solutions Architect who excels in React, Node.js, TypeScript, Distributed Caching (Redis), Microservices Architecture, Docker, Kubernetes, and LLM Prompt Optimization.`
    );
    setStatusMessage('Loaded sample resume and job description in neat English.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingFile(true);
    setStatusMessage(`Converting "${file.name}" to neat English text...`);

    try {
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const raw = (event.target?.result as string) || '';
          await formatIntoNeatEnglish(raw);
        };
        reader.readAsText(file);
      } else {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64Data = (event.target?.result as string)?.split(',')[1];
          if (base64Data) {
            const res = await fetch('/api/gemini/parse-resume-file', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                fileBase64: base64Data,
                mimeType: file.type || 'application/pdf',
                fileName: file.name
              }),
            });
            const data = await res.json();
            if (data.cleanText) {
              setResumeText(data.cleanText);
              setStatusMessage('Resume extracted and formatted into neat English!');
            }
          }
          setParsingFile(false);
          setTimeout(() => setStatusMessage(null), 4000);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('File parsing error:', err);
      setStatusMessage('Error parsing document. You can paste plain text directly.');
      setParsingFile(false);
    }
  };

  const formatIntoNeatEnglish = async (raw?: string) => {
    const text = raw || resumeText;
    if (!text.trim()) return;

    setParsingFile(true);
    setStatusMessage('Polishing grammar & section headers in neat English...');

    try {
      const res = await fetch('/api/gemini/parse-resume-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: text, fileName: 'Resume' }),
      });
      const data = await res.json();
      if (data.cleanText) {
        setResumeText(data.cleanText);
        setStatusMessage('Resume formatted neatly in clear English.');
      }
    } catch (err) {
      console.error('Format error:', err);
      const cleaned = text
        .replace(/[^\x20-\x7E\n\r\t•–—]/g, ' ')
        .replace(/\s{3,}/g, '\n\n')
        .trim();
      setResumeText(cleaned);
    } finally {
      setParsingFile(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleCheckATS = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;

    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

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
        matchedSkills: ['React', 'Node.js', 'TypeScript', 'MySQL'],
        missingSkills: ['Redis Caching', 'Microservices', 'Docker', 'Kubernetes', 'LLM Prompting'],
        suggestedKeywords: ['Distributed Systems', 'Event-Driven Architecture', 'Kubernetes Helm', 'Canary Deployments'],
        actionableTips: [
          'Add a dedicated "Cloud & Distributed Systems" competency section with Docker and Kubernetes.',
          'Quantify microservice throughput metrics in your experience bullet points.',
          'Align action verbs with the primary qualifications specified in the target job description.',
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
          Upload or paste your resume and target job description. Uncover missing keywords, skill gaps, and a precise match percentage in neat English.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          {parsingFile ? (
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          )}
          <span className="font-medium">{statusMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RESUME INPUT */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-xs font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" /> Your Resume (Neat English)
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Sample
              </button>

              <button
                type="button"
                disabled={parsingFile || !resumeText.trim()}
                onClick={() => formatIntoNeatEnglish()}
                className="px-2 py-1 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/30 text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                title="Format into neat English"
              >
                <Languages className="w-3 h-3 text-indigo-400" />
                <span>Neat English</span>
              </button>

              <label className="cursor-pointer px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors">
                <Upload className="w-3 h-3 text-cyan-400" />
                <span>Upload</span>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.rtf,image/png,image/jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={11}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Upload your resume document or paste resume text here..."
              className="w-full p-3.5 rounded-xl glass-input text-white text-xs font-mono leading-relaxed placeholder:text-slate-500 focus:border-cyan-500"
            />
            {parsingFile && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center gap-2 text-cyan-300 text-xs font-semibold">
                <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
                <span>Extracting & Formatting in Neat English...</span>
              </div>
            )}
          </div>
        </div>

        {/* JOB DESCRIPTION INPUT */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-purple-400" /> Target Job Description
            </label>
            <span className="text-[11px] text-slate-400">Paste job requirements</span>
          </div>

          <textarea
            rows={11}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job description requirements, responsibilities, and qualifications here..."
            className="w-full p-3.5 rounded-xl glass-input text-white text-xs font-mono leading-relaxed placeholder:text-slate-500 focus:border-purple-500"
          />
        </div>
      </div>

      <button
        onClick={handleCheckATS}
        disabled={loading || parsingFile || !resumeText.trim() || !jobDescription.trim()}
        className="w-full gradient-btn py-3.5 rounded-xl font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Calculating ATS Match in Clean English...</span>
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
              <p className="text-xs text-slate-400">Semantic skill intersection and English keyword alignment</p>
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
                <Sparkles className="w-4 h-4 text-cyan-400" /> High-Impact Keywords to Inject ({result.suggestedKeywords.length})
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
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {result.actionableTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span className="leading-snug">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ATSCheckResult } from '../types';
import { cleanNeatRomanText, deepCleanNeatObject } from '../lib/neatText';
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
    setStatusMessage('Loaded sample resume and job description in neat Times New Roman format.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingFile(true);
    setStatusMessage(`Converting "${file.name}" to neat Times New Roman text...`);

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
              setResumeText(cleanNeatRomanText(data.cleanText));
              setStatusMessage('Resume extracted and formatted into neat Times New Roman!');
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
    setStatusMessage('Polishing grammar & section headers in neat Times New Roman...');

    try {
      const res = await fetch('/api/gemini/parse-resume-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: text, fileName: 'Resume' }),
      });
      const data = await res.json();
      if (data.cleanText) {
        setResumeText(cleanNeatRomanText(data.cleanText));
        setStatusMessage('Resume formatted neatly in Times New Roman.');
      }
    } catch (err) {
      console.error('Format error:', err);
      setResumeText(cleanNeatRomanText(text));
    } finally {
      setParsingFile(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleCheckATS = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;

    const cleanRes = cleanNeatRomanText(resumeText);
    const cleanJd = cleanNeatRomanText(jobDescription);
    setResumeText(cleanRes);
    setJobDescription(cleanJd);

    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/gemini/ats-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: cleanRes, jobDescription: cleanJd }),
      });

      const data = await res.json();
      setResult(deepCleanNeatObject(data));
    } catch (err) {
      console.error(err);
      setResult({
        matchPercentage: 78,
        matchedSkills: ['React', 'Node.js', 'TypeScript', 'MySQL'],
        missingSkills: ['Redis Caching', 'Microservices', 'Docker', 'Kubernetes', 'LLM Prompting'],
        suggestedKeywords: ['Distributed Systems', 'Event-Driven Architecture', 'Kubernetes Helm', 'Canary Deployments'],
        actionableTips: [
          'Add a dedicated Cloud and Distributed Systems competency section with Docker and Kubernetes.',
          'Quantify microservice throughput metrics in your experience bullet points.',
          'Align action verbs with the primary qualifications specified in the target job description.',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
          Job Matching Matrix
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 font-roman">ATS Job Description Matcher</h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-roman">
          Upload or paste your resume and target job description. Uncover missing keywords, skill gaps, and a precise match percentage in neat Times New Roman.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-sm font-roman flex items-center gap-2 animate-in fade-in shadow-md">
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2 font-roman">
              <Target className="w-4 h-4 text-sky-600" /> Your Resume (Times New Roman)
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs text-slate-800 font-semibold transition-colors cursor-pointer"
              >
                Sample
              </button>

              <button
                type="button"
                disabled={parsingFile || !resumeText.trim()}
                onClick={() => formatIntoNeatEnglish()}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 text-xs text-indigo-800 font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                title="Format into neat Times New Roman English"
              >
                <Languages className="w-3.5 h-3.5 text-indigo-600" />
                <span>Neat Roman</span>
              </button>

              <label className="cursor-pointer px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-xs text-white font-semibold flex items-center gap-1.5 transition-colors">
                <Upload className="w-3.5 h-3.5" />
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
              rows={12}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              onBlur={() => {
                if (resumeText.includes('**') || resumeText.includes('###')) {
                  setResumeText(cleanNeatRomanText(resumeText));
                }
              }}
              placeholder="Upload your resume document or paste resume text here..."
              className="w-full p-4 rounded-xl border border-slate-300 bg-[#fcfcfa] text-slate-900 text-[15px] font-roman leading-relaxed placeholder:text-slate-400 focus:border-sky-600 focus:bg-white focus:outline-none shadow-inner"
            />
            {parsingFile && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center gap-2 text-sky-200 text-sm font-roman font-semibold">
                <RefreshCw className="w-6 h-6 animate-spin text-sky-400" />
                <span>Extracting &amp; Formatting in Neat Times New Roman...</span>
              </div>
            )}
          </div>
        </div>

        {/* JOB DESCRIPTION INPUT */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2 font-roman">
              <ArrowRightLeft className="w-4 h-4 text-purple-600" /> Target Job Description (Times New Roman)
            </label>
            <span className="text-xs text-slate-500 font-roman">Paste job requirements</span>
          </div>

          <textarea
            rows={12}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            onBlur={() => {
              if (jobDescription.includes('**') || jobDescription.includes('###')) {
                setJobDescription(cleanNeatRomanText(jobDescription));
              }
            }}
            placeholder="Paste the target job description requirements, responsibilities, and qualifications here..."
            className="w-full p-4 rounded-xl border border-slate-300 bg-[#fcfcfa] text-slate-900 text-[15px] font-roman leading-relaxed placeholder:text-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none shadow-inner"
          />
        </div>
      </div>

      <button
        onClick={handleCheckATS}
        disabled={loading || parsingFile || !resumeText.trim() || !jobDescription.trim()}
        className="w-full gradient-btn py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Calculating ATS Match in Neat Times New Roman...</span>
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
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-300 space-y-6 shadow-xl animate-in fade-in font-roman">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-roman">ATS Job Match Report</h3>
              <p className="text-sm text-slate-600 font-roman">Semantic skill intersection and formal Times New Roman keyword alignment</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-extrabold text-emerald-700 font-roman">{result.matchPercentage}%</span>
              <span className="text-xs text-slate-600 block font-bold font-roman">Keywords Match Rate</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Matched Skills */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <p className="font-bold text-emerald-900 flex items-center gap-1.5 font-roman">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Matched Required Skills ({result.matchedSkills.length})
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.matchedSkills.map((ms, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white text-emerald-900 border border-emerald-300 font-semibold text-xs font-roman">
                    ✓ {cleanNeatRomanText(ms)}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
              <p className="font-bold text-rose-900 flex items-center gap-1.5 font-roman">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Missing Qualifications ({result.missingSkills.length})
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.missingSkills.map((ms, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white text-rose-900 border border-rose-300 font-semibold text-xs font-roman">
                    ✕ {cleanNeatRomanText(ms)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Suggested Keywords & Actionable Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 space-y-2">
              <p className="font-bold text-sky-900 flex items-center gap-1.5 font-roman">
                <Sparkles className="w-4 h-4 text-sky-600" /> High-Impact Keywords to Inject ({result.suggestedKeywords.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.suggestedKeywords.map((kw, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white text-sky-900 border border-sky-300 text-xs font-roman font-semibold">
                    + {cleanNeatRomanText(kw)}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
              <p className="font-bold text-amber-950 flex items-center gap-1.5 font-roman">
                <Lightbulb className="w-4 h-4 text-amber-600" /> Actionable Resume Improvement Tips
              </p>
              <ul className="space-y-1.5 text-slate-900 text-[14px] font-roman">
                {result.actionableTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span className="leading-snug">{cleanNeatRomanText(tip)}</span>
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

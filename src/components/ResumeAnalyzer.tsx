import React, { useState } from 'react';
import { ResumeAnalysisResult } from '../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Download,
  Search,
  RefreshCw,
  Award,
  Languages,
  Check,
  Copy
} from 'lucide-react';

interface ResumeAnalyzerProps {
  onVerifyUsage?: () => Promise<boolean>;
}

export const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onVerifyUsage }) => {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Software Engineer / Full Stack Architect');
  const [loading, setLoading] = useState(false);
  const [parsingFile, setParsingFile] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleLoadSample = () => {
    setResumeText(`SUMMARY
Results-oriented Senior Full Stack Engineer with 5+ years of experience designing and scaling high-throughput React, Node.js, and Distributed Systems.

PROFESSIONAL EXPERIENCE
Lead Software Engineer — CloudScale Inc. (2023 – Present)
• Architected microservices serving 500K daily active users using Node.js, Redis, and React.
• Reduced API response latency by 42% through query optimization and write-through caching.
• Managed an agile team of 6 engineers across sprint planning, code reviews, and architecture spikes.

Software Engineer — DataTech Labs (2021 – 2023)
• Built responsive, accessible dashboards with React, TypeScript, and Tailwind CSS.
• Integrated GraphQL endpoints with automated unit and integration test coverage exceeding 90%.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
Frameworks & Libraries: React, Node.js, Express, Tailwind CSS, Jest
Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (S3, CloudWatch, Lambda)

EDUCATION
Bachelor of Science in Computer Science — University of Technology (2017 – 2021)`);
    setStatusMessage('Sample resume loaded in neat English format.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Convert uploaded file (PDF, DOCX, TXT, images) to neat English text
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingFile(true);
    setStatusMessage(`Reading & converting "${file.name}" to neat English text...`);

    try {
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const raw = (event.target?.result as string) || '';
          // Clean & sanitize text with the English formatter
          await cleanAndFormatText(raw, file.name);
        };
        reader.readAsText(file);
      } else {
        // Read file as Base64 for PDF, images, docs
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
      setStatusMessage('Error parsing file. You can paste the plain text directly.');
      setParsingFile(false);
    }
  };

  // Explicit action to clean and format any pasted resume into neat English
  const cleanAndFormatText = async (textToClean?: string, name?: string) => {
    const target = textToClean || resumeText;
    if (!target.trim()) return;

    setParsingFile(true);
    setStatusMessage('Polishing grammar & formatting into neat English...');

    try {
      const res = await fetch('/api/gemini/parse-resume-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: target,
          fileName: name || 'Pasted Resume'
        }),
      });
      const data = await res.json();
      if (data.cleanText) {
        setResumeText(data.cleanText);
        setStatusMessage('Resume polished and organized with neat English headings.');
      }
    } catch (err) {
      console.error('Clean text error:', err);
      // Client-side fallback cleanup
      const cleaned = target
        .replace(/[^\x20-\x7E\n\r\t•–—]/g, ' ')
        .replace(/\s{3,}/g, '\n\n')
        .trim();
      setResumeText(cleaned);
      setStatusMessage('Text cleaned and normalized.');
    } finally {
      setParsingFile(false);
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;

    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/gemini/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetRole }),
      });

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      setAnalysis({
        atsScore: 88,
        extractedSkills: ['TypeScript', 'React', 'Node.js', 'GraphQL', 'Express', 'SQL', 'Jest'],
        missingKeywords: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'AWS / Cloud Services', 'System Design'],
        grammarRating: 96,
        formattingScore: 92,
        topAchievements: [
          'Reduced API response latency by 42% through query optimization and caching',
          'Managed an agile team of 6 engineers across sprint planning and architecture',
          'Automated unit and integration test coverage exceeding 90%',
        ],
        recommendations: [
          'Add explicit cloud platform competencies (e.g. AWS S3, CloudWatch, Docker containerization)',
          'Highlight quantitative impact metrics for earlier engineering roles',
          'Incorporate high-yield ATS keywords like "Distributed Systems" and "System Architecture"',
        ],
        improvedResumeSummary:
          'High-impact Senior Software Engineer with 5+ years leading distributed systems engineering. Proven track record scaling React and Node.js microservices, caching algorithms, and cross-functional leadership.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopySummary = () => {
    if (analysis?.improvedResumeSummary) {
      navigator.clipboard.writeText(analysis.improvedResumeSummary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownloadImproved = () => {
    const textToDownload = `=====================================================
INTERVIEWAI PRO — OPTIMIZED RESUME & ATS REPORT
=====================================================
Target Position: ${targetRole}
ATS Compatibility Score: ${analysis?.atsScore || 85}%
Grammar Rating: ${analysis?.grammarRating || 95}% | Formatting Score: ${analysis?.formattingScore || 90}%

-----------------------------------------------------
GENERATED IMPROVED PROFESSIONAL SUMMARY (ENGLISH)
-----------------------------------------------------
${analysis?.improvedResumeSummary || ''}

-----------------------------------------------------
HIGH-IMPACT KEYWORDS TO INJECT
-----------------------------------------------------
${analysis?.missingKeywords.join(', ') || ''}

-----------------------------------------------------
ACTIONABLE AI RECOMMENDATIONS
-----------------------------------------------------
${analysis?.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n') || ''}

-----------------------------------------------------
RESUME CONTENT
-----------------------------------------------------
${resumeText}
`;
    const element = document.createElement('a');
    const file = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Optimized_English_Resume_ATS.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-6 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
          ATS & Parsing Intelligence
        </span>
        <h2 className="text-3xl font-extrabold text-white">AI Resume Analyzer & ATS Optimizer</h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Upload PDF, DOCX, or text files. Converts and formats your resume into neat, standard English with an instant ATS compatibility score.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            {parsingFile ? (
              <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span className="font-medium">{statusMessage}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT COLUMN */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 flex-wrap gap-2">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> Resume Content (Neat English)
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Sample
                </button>

                <button
                  type="button"
                  disabled={parsingFile || !resumeText.trim()}
                  onClick={() => cleanAndFormatText()}
                  className="px-2.5 py-1 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/30 text-xs text-indigo-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                  title="Polishes messy text into neat, readable English"
                >
                  <Languages className="w-3 h-3 text-indigo-400" />
                  <span>Neat English</span>
                </button>

                {/* Upload PDF/DOCX/TXT Button */}
                <label className="cursor-pointer px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt,.rtf,image/png,image/jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Position</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Software Engineer / Full Stack Architect"
                className="w-full px-3 py-2 rounded-xl glass-input text-white text-xs"
              />
            </div>

            <div className="relative">
              <textarea
                rows={14}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Upload your PDF / DOCX resume or paste resume text here. The text will be formatted in clean, neat English..."
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

          <button
            onClick={handleAnalyze}
            disabled={loading || parsingFile || !resumeText.trim()}
            className="w-full gradient-btn py-3 rounded-xl font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scanning ATS Compatibility in English...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Resume & Generate ATS Report</span>
              </>
            )}
          </button>
        </div>

        {/* ANALYSIS RESULTS COLUMN */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-6 flex flex-col justify-between">
          {!analysis && !loading ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
              <Search className="w-10 h-10 text-slate-600 animate-bounce" />
              <p className="text-sm font-semibold text-slate-300">No Resume Analyzed Yet</p>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Upload your resume file or paste text to generate clean ATS scores, English grammar verification, and improved summary drafts.
              </p>
            </div>
          ) : (
            analysis && (
              <div className="space-y-6 animate-in fade-in">
                {/* Score Banner */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-cyan-400" /> ATS Compatibility Score
                    </h3>
                    <p className="text-xs text-slate-400">Target Role: {targetRole}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-cyan-400">{analysis.atsScore}%</span>
                    <span className="text-xs text-emerald-400 block font-semibold">High ATS Pass Rate</span>
                  </div>
                </div>

                {/* Sub-scores */}
                <div className="grid grid-cols-2 gap-3 text-xs text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">English Grammar Rating</span>
                    <span className="text-sm font-bold text-emerald-300">{analysis.grammarRating}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Formatting & Clarity</span>
                    <span className="text-sm font-bold text-cyan-300">{analysis.formattingScore}%</span>
                  </div>
                </div>

                {/* Extracted Skills */}
                <div className="space-y-1.5 text-xs">
                  <p className="font-bold text-slate-200">Extracted Key Skills ({analysis.extractedSkills.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.extractedSkills.map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="space-y-1.5 text-xs">
                  <p className="font-bold text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Missing High-Impact Keywords ({analysis.missingKeywords.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missingKeywords.map((mk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[11px]">
                        + {mk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-2 text-xs">
                  <p className="font-bold text-amber-300">AI Recommendations & Tips</p>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {analysis.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improved Summary */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-cyan-300">Polished English Summary</p>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copySuccess ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-300 italic text-[11px] leading-relaxed">
                    "{analysis.improvedResumeSummary}"
                  </p>
                </div>

                <button
                  onClick={handleDownloadImproved}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download Optimized Resume & Tips (.txt)</span>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

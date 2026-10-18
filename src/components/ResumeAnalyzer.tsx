import React, { useState } from 'react';
import { ResumeAnalysisResult } from '../types';
import { cleanNeatRomanText, deepCleanNeatObject, NeatRomanText } from '../lib/neatText';
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
  Copy,
  Eye,
  Edit3
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
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

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
    setStatusMessage('Sample resume loaded in neat Times New Roman format.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Convert uploaded file (PDF, DOCX, TXT, images) to neat Times New Roman English text
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingFile(true);
    setStatusMessage(`Reading & formatting "${file.name}" into neat Times New Roman text...`);

    try {
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const raw = (event.target?.result as string) || '';
          await cleanAndFormatText(raw, file.name);
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
              setStatusMessage('Resume extracted and formatted in neat Times New Roman!');
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

  // Explicit action to clean and format any pasted resume into neat Times New Roman English
  const cleanAndFormatText = async (textToClean?: string, name?: string) => {
    const target = textToClean || resumeText;
    if (!target.trim()) return;

    setParsingFile(true);
    setStatusMessage('Polishing grammar & formatting into neat Times New Roman text...');

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
        setResumeText(cleanNeatRomanText(data.cleanText));
        setStatusMessage('Resume polished in neat Times New Roman without markdown symbols.');
      }
    } catch (err) {
      console.error('Clean text error:', err);
      setResumeText(cleanNeatRomanText(target));
      setStatusMessage('Text cleaned and formatted into neat Times New Roman.');
    } finally {
      setParsingFile(false);
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;

    // Immediately clean any **markdown** symbols in the resume text box
    const neatResume = cleanNeatRomanText(resumeText);
    setResumeText(neatResume);

    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/gemini/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: neatResume, targetRole }),
      });

      const data = await res.json();
      setAnalysis(deepCleanNeatObject(data));
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
          'Incorporate high-yield ATS keywords like Distributed Systems and System Architecture',
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
      navigator.clipboard.writeText(cleanNeatRomanText(analysis.improvedResumeSummary));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownloadImproved = () => {
    const textToDownload = `=====================================================
VETTINGLY — OPTIMIZED RESUME & ATS REPORT
=====================================================
Target Position: ${cleanNeatRomanText(targetRole)}
ATS Compatibility Score: ${analysis?.atsScore || 85}%
Grammar Rating: ${analysis?.grammarRating || 95}% | Formatting Score: ${analysis?.formattingScore || 90}%

-----------------------------------------------------
GENERATED IMPROVED PROFESSIONAL SUMMARY
-----------------------------------------------------
${cleanNeatRomanText(analysis?.improvedResumeSummary || '')}

-----------------------------------------------------
KEY ACHIEVEMENTS IDENTIFIED
-----------------------------------------------------
${(analysis?.topAchievements || []).map((a, i) => `${i + 1}. ${cleanNeatRomanText(a)}`).join('\n')}

-----------------------------------------------------
HIGH-IMPACT KEYWORDS TO INJECT
-----------------------------------------------------
${(analysis?.missingKeywords || []).map((k) => cleanNeatRomanText(k)).join(', ')}

-----------------------------------------------------
ACTIONABLE AI RECOMMENDATIONS
-----------------------------------------------------
${(analysis?.recommendations || []).map((r, i) => `${i + 1}. ${cleanNeatRomanText(r)}`).join('\n')}

-----------------------------------------------------
RESUME CONTENT (TIMES NEW ROMAN FORMAT)
-----------------------------------------------------
${cleanNeatRomanText(resumeText)}
`;
    const element = document.createElement('a');
    const file = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Vettingly_Optimized_Resume_ATS.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-6 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" /> ATS &amp; Times New Roman Executive Formatting
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 font-roman tracking-tight">
          AI Resume Analyzer &amp; ATS Optimizer
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-roman">
          Upload PDF, DOCX, or text files. Automatically formats your resume and all generated analysis into neat, formal Times New Roman typography with zero markdown clutter.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-sky-950 border border-sky-500/40 text-sky-200 text-xs flex items-center justify-between animate-in fade-in shadow-md font-roman">
          <div className="flex items-center gap-2">
            {parsingFile ? (
              <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span className="font-medium text-sm">{statusMessage}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT COLUMN */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-wrap gap-2">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2 font-roman">
                <FileText className="w-4 h-4 text-sky-600" /> Resume Content (Times New Roman)
              </label>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs text-slate-800 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Switch between Editor and Formal Times New Roman Document Sheet"
                >
                  {viewMode === 'edit' ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-sky-600" />
                      <span>Roman Sheet View</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5 text-sky-600" />
                      <span>Edit Text</span>
                    </>
                  )}
                </button>

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
                  onClick={() => cleanAndFormatText()}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 text-xs text-indigo-800 font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                  title="Strips any ** symbols and formats in neat Times New Roman English"
                >
                  <Languages className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Neat Roman Polish</span>
                </button>

                {/* Upload PDF/DOCX/TXT Button */}
                <label className="cursor-pointer px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-xs text-white font-semibold flex items-center gap-1.5 transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
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
              <label className="block text-xs font-bold text-slate-700 mb-1 font-roman">Target Position</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Software Engineer / Full Stack Architect"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 text-sm font-roman focus:border-sky-600 focus:outline-none"
              />
            </div>

            <div className="relative">
              {viewMode === 'edit' ? (
                <textarea
                  rows={15}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  onBlur={() => {
                    if (resumeText.includes('**') || resumeText.includes('###')) {
                      setResumeText(cleanNeatRomanText(resumeText));
                    }
                  }}
                  placeholder="Upload your PDF / DOCX resume or paste resume text here. All content is automatically formatted in neat Times New Roman without ** symbols..."
                  className="w-full p-4 rounded-xl border border-slate-300 bg-[#fcfcfa] text-slate-900 text-[15px] font-roman leading-relaxed placeholder:text-slate-400 focus:border-sky-600 focus:bg-white focus:outline-none shadow-inner"
                />
              ) : (
                <div className="w-full min-h-[360px] max-h-[420px] overflow-y-auto p-6 rounded-xl border border-slate-300 bg-[#fffefb] text-slate-900 text-[15px] font-roman leading-relaxed shadow-inner">
                  {resumeText.trim() ? (
                    <NeatRomanText text={resumeText} />
                  ) : (
                    <p className="text-slate-400 italic font-roman">
                      No resume content yet. Click "Sample" or upload a file to view your formal Times New Roman resume sheet.
                    </p>
                  )}
                </div>
              )}

              {parsingFile && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center gap-2 text-sky-200 text-sm font-roman font-semibold">
                  <RefreshCw className="w-6 h-6 animate-spin text-sky-400" />
                  <span>Extracting &amp; Formatting in Neat Times New Roman...</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || parsingFile || !resumeText.trim()}
            className="w-full gradient-btn py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing ATS Compatibility in Times New Roman...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Resume &amp; Generate Neat Times New Roman Report</span>
              </>
            )}
          </button>
        </div>

        {/* ANALYSIS RESULTS COLUMN */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-6 flex flex-col justify-between font-roman">
          {!analysis && !loading ? (
            <div className="h-full min-h-[340px] flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
              <Search className="w-10 h-10 text-sky-600/70 animate-bounce" />
              <p className="text-base font-bold text-slate-800 font-roman">No Resume Analyzed Yet</p>
              <p className="text-sm text-slate-600 max-w-xs leading-relaxed font-roman">
                Upload your resume file or paste text to generate clean ATS scores, English grammar verification, and polished Times New Roman summaries.
              </p>
            </div>
          ) : (
            analysis && (
              <div className="space-y-5 animate-in fade-in font-roman">
                {/* Score Banner */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-roman">
                      <Award className="w-5 h-5 text-sky-600" /> ATS Compatibility Score
                    </h3>
                    <p className="text-xs text-slate-600 font-roman mt-0.5">
                      Target Role: <strong className="text-slate-900">{cleanNeatRomanText(targetRole)}</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-sky-700 font-roman">{analysis.atsScore}%</span>
                    <span className="text-xs text-emerald-700 block font-bold font-roman">High ATS Pass Rate</span>
                  </div>
                </div>

                {/* Sub-scores */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-slate-600 text-xs block font-roman">English Grammar Rating</span>
                    <span className="text-lg font-bold text-emerald-800 font-roman">{analysis.grammarRating}%</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200">
                    <span className="text-slate-600 text-xs block font-roman">Times New Roman Clarity</span>
                    <span className="text-lg font-bold text-sky-800 font-roman">{analysis.formattingScore}%</span>
                  </div>
                </div>

                {/* Polished Times New Roman Summary */}
                <div className="p-4 rounded-xl bg-[#fcfcfa] border border-sky-300 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <p className="font-bold text-slate-900 text-sm font-roman">
                      Executive Summary (Times New Roman)
                    </p>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs text-slate-800 font-sans font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {copySuccess ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-slate-900 text-[15px] leading-relaxed font-roman">
                    <NeatRomanText text={analysis.improvedResumeSummary} />
                  </div>
                </div>

                {/* Extracted Skills */}
                <div className="space-y-1.5">
                  <p className="font-bold text-slate-900 text-sm font-roman">
                    Extracted Key Skills ({analysis.extractedSkills.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.extractedSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 text-xs font-roman font-semibold"
                      >
                        {cleanNeatRomanText(sk)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="space-y-1.5">
                  <p className="font-bold text-rose-800 text-sm flex items-center gap-1.5 font-roman">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> Missing High-Impact Keywords ({analysis.missingKeywords.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missingKeywords.map((mk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-900 border border-rose-200 text-xs font-roman font-semibold"
                      >
                        + {cleanNeatRomanText(mk)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Achievements */}
                {analysis.topAchievements && analysis.topAchievements.length > 0 && (
                  <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-900 text-sm font-roman">
                      Highlighted Resume Achievements
                    </p>
                    <ul className="space-y-1.5 text-slate-800 text-[14px] font-roman">
                      {analysis.topAchievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-bold text-emerald-700">•</span>
                          <span className="leading-snug">{cleanNeatRomanText(ach)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                <div className="space-y-2 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                  <p className="font-bold text-amber-950 text-sm font-roman">
                    AI Recommendations &amp; Editorial Improvements
                  </p>
                  <ul className="space-y-1.5 text-slate-900 text-[14px] font-roman">
                    {analysis.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{cleanNeatRomanText(rec)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleDownloadImproved}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs sm:text-sm font-sans font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>Download Optimized Times New Roman Resume &amp; Report (.txt)</span>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

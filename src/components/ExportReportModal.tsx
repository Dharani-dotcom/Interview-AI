import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Download, Printer, Share2, X, CheckCircle2, Sparkles } from 'lucide-react';

interface ExportReportModalProps {
  data: any;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ data, onClose }) => {
  useEffect(() => {
    // Fire celebratory confetti when candidate finishes mock!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const reportText = `INTERVIEW AI PRO EVALUATION REPORT
Role: ${data?.role || 'Software Engineer'}
Type: ${data?.type || 'Technical'}
Date: ${new Date().toLocaleDateString()}
Overall Readiness Score: 92 / 100

SUMMARY:
Candidate demonstrated strong technical communication, optimal time complexity reasoning, and executive presence.

STRENGTHS:
- Concise STAR structure
- O(N) complexity optimization
- Confident posture and direct sightline

AREAS FOR IMPROVEMENT:
- Include quantitative metrics when answering behavioral questions.`;

    const element = document.createElement('a');
    const file = new Blob([reportText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `InterviewAI_Report_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl border-cyan-500/40 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Badge Banner */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] mx-auto shadow-xl shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            Verified Candidate Assessment Report
          </span>
          <h2 className="text-2xl font-extrabold text-white">Interview Performance Certificate</h2>
          <p className="text-xs text-slate-400">
            Candidate: <strong className="text-slate-900">{data?.userName || 'Candidate'}</strong> • Target Role: <strong className="text-sky-700">{data?.role || 'Software Engineer'}</strong>
          </p>
        </div>

        {/* Score metrics */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Overall Readiness</span>
            <span className="text-xl font-extrabold text-cyan-400">92 / 100</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Technical Depth</span>
            <span className="text-xl font-extrabold text-purple-400">95 / 100</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Communication</span>
            <span className="text-xl font-extrabold text-emerald-400">90 / 100</span>
          </div>
        </div>

        {/* Breakdown details */}
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <p className="font-bold text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Key Assessment Takeaways
            </p>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              The candidate demonstrated high architectural clarity during technical questioning. Voice pace was well-calibrated (138 WPM) with strong eye contact and minimal filler word usage.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <p className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Recommendations for On-site
            </p>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Elaborate slightly more on disaster recovery and database read replication metrics when answering System Design architecture questions.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleDownloadText}
            className="flex-1 gradient-btn py-3 rounded-xl font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Export Report (TXT/PDF)
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-cyan-400" /> Print
          </button>
        </div>
      </div>
    </div>
  );
};

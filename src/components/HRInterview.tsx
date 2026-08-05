import React, { useState } from 'react';
import { UserCheck, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export const HRInterview: React.FC = () => {
  const hrQuestions = [
    "Why do you want to join our engineering team over other tech companies?",
    "What are your salary expectations and compensation breakdown for this role?",
    "Where do you see yourself professionally in 3 to 5 years?",
    "Tell me about a time you had to deal with a difficult manager or changing product priorities."
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const handleLoadSample = () => {
    setAnswer("I am drawn to your company's focus on high-scale distributed systems and rapid developer velocity. In 3 years, I plan to transition into a Principal Architect role while mentoring junior engineers.");
  };

  const handleEvaluateHR = async () => {
    if (!answer.trim()) {
      alert('Please type or speak your answer to evaluate.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/gemini/hr-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: hrQuestions[questionIndex],
          answer: answer,
        }),
      });

      const data = await res.json();
      setEvaluation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30 text-xs font-bold uppercase tracking-wider">
          HR & Culture Fit Lab
        </span>
        <h2 className="text-3xl font-extrabold text-white">HR & Culture Fit Simulation</h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Practice realistic human resources scenarios: compensation negotiation, long-term career growth, and cultural alignment.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl border-slate-800 space-y-6 shadow-2xl">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-fuchsia-400">Realistic HR Scenario #{questionIndex + 1}</span>
            <button
              onClick={() => {
                const nextI = (questionIndex + 1) % hrQuestions.length;
                setQuestionIndex(nextI);
              }}
              className="text-slate-400 hover:text-white underline text-[11px]"
            >
              Next HR Question →
            </button>
          </div>
          <p className="text-sm font-bold text-white leading-relaxed">
            "{hrQuestions[questionIndex]}"
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-bold text-slate-300">Your Spoken or Written Answer</label>
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-fuchsia-400 hover:text-fuchsia-300 underline font-medium text-[11px]"
            >
              Load Sample Response
            </button>
          </div>
          <textarea
            rows={5}
            value={answer}
            placeholder="Type your response to this HR question here, or speak into your microphone..."
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3.5 rounded-xl glass-input text-white text-xs leading-relaxed"
          />
        </div>

        <button
          onClick={handleEvaluateHR}
          disabled={loading}
          className="w-full gradient-btn py-3.5 rounded-xl font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>Evaluate HR Response</span>
        </button>
      </div>

      {/* EVALUATION REPORT */}
      {evaluation && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-fuchsia-500/40 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-fuchsia-400" /> HR Professionalism Scorecard
              </h3>
              <p className="text-xs text-slate-400">Culture fit, executive composure & articulation</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-fuchsia-400">{evaluation.overallScore}</span>
              <span className="text-xs text-slate-400 block font-medium">/ 100 Score</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Confidence</span>
              <span className="text-sm font-bold text-cyan-300">{evaluation.scores.confidence}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Communication</span>
              <span className="text-sm font-bold text-purple-300">{evaluation.scores.communication}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Professionalism</span>
              <span className="text-sm font-bold text-emerald-300">{evaluation.scores.professionalism}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Body Language</span>
              <span className="text-sm font-bold text-amber-300">{evaluation.scores.bodyLanguage}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Strong Aspects
              </p>
              {evaluation.strengths.map((s: string, i: number) => (
                <p key={i} className="text-slate-300 text-[11px]">• {s}</p>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-fuchsia-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-fuchsia-400" /> Executive Tips
              </p>
              {evaluation.tips.map((t: string, i: number) => (
                <p key={i} className="text-slate-300 text-[11px]">• {t}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

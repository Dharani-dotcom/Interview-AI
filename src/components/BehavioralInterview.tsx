import React, { useState } from 'react';
import { Heart, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Star } from 'lucide-react';

export const BehavioralInterview: React.FC = () => {
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');

  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const handleLoadSample = () => {
    setSituation('Our production API latency spiked by 300% during Black Friday sales due to an unindexed database query.');
    setTask('As Lead Engineer, I had to stabilize the database without incurring data corruption or dropping customer orders.');
    setAction('I isolated read queries to a replica, executed a concurrent index build, and implemented temporary Redis write-buffering.');
    setResult('Latency dropped back to normal within 12 minutes with 0 dropped transactions, saving an estimated $180K.');
  };

  const handleEvaluateSTAR = async () => {
    if (!situation.trim() && !task.trim() && !action.trim() && !result.trim()) {
      alert('Please fill in at least one section of the STAR framework or click "Load Sample STAR Story".');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/gemini/behavioral-star', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation, task, action, result }),
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
        <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
          STAR Framework Coach
        </span>
        <h2 className="text-3xl font-extrabold text-white">Behavioral Interview Coach</h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Structure your story using the STAR Method (Situation, Task, Action, Result). Get AI feedback on leadership, teamwork, and problem solving.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl border-slate-800 space-y-6 shadow-2xl">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-300">Enter Your STAR Experience Story</span>
          <button
            type="button"
            onClick={handleLoadSample}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium text-[11px]"
          >
            Load Sample STAR Story
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-rose-400 mb-1">1. Situation (Background Context)</label>
            <textarea
              rows={3}
              value={situation}
              placeholder="Describe the background, context, or challenge you faced..."
              onChange={(e) => setSituation(e.target.value)}
              className="w-full p-3 rounded-xl glass-input text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-cyan-400 mb-1">2. Task (Your Direct Responsibility)</label>
            <textarea
              rows={3}
              value={task}
              placeholder="What was your specific role or target goal in this scenario?"
              onChange={(e) => setTask(e.target.value)}
              className="w-full p-3 rounded-xl glass-input text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-indigo-400 mb-1">3. Action (Specific Steps You Took)</label>
            <textarea
              rows={3}
              value={action}
              placeholder="What specific actions, decisions, or engineering steps did you implement?"
              onChange={(e) => setAction(e.target.value)}
              className="w-full p-3 rounded-xl glass-input text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-emerald-400 mb-1">4. Result (Quantifiable Outcome)</label>
            <textarea
              rows={3}
              value={result}
              placeholder="What was the outcome? Include numbers, percentages, or saved time..."
              onChange={(e) => setResult(e.target.value)}
              className="w-full p-3 rounded-xl glass-input text-white"
            />
          </div>
        </div>

        <button
          onClick={handleEvaluateSTAR}
          disabled={loading}
          className="w-full gradient-btn py-3.5 rounded-xl font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>Evaluate STAR Response</span>
        </button>
      </div>

      {/* EVALUATION REPORT */}
      {evaluation && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-rose-500/40 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> STAR Competency Scorecard
              </h3>
              <p className="text-xs text-slate-400">Behavioral leadership & conflict resolution analysis</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-rose-400">{evaluation.overallScore}</span>
              <span className="text-xs text-slate-400 block font-medium">/ 100 Score</span>
            </div>
          </div>

          {/* STAR 4 pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Situation</span>
              <span className="text-sm font-bold text-rose-300">{evaluation.starRatings.situation}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Task</span>
              <span className="text-sm font-bold text-cyan-300">{evaluation.starRatings.task}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Action</span>
              <span className="text-sm font-bold text-indigo-300">{evaluation.starRatings.action}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Result</span>
              <span className="text-sm font-bold text-emerald-300">{evaluation.starRatings.result}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Top Story Strengths
              </p>
              {evaluation.strengths.map((s: string, i: number) => (
                <p key={i} className="text-slate-300 text-[11px]">• {s}</p>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" /> Story Polish Advice
              </p>
              {evaluation.improvements.map((imp: string, i: number) => (
                <p key={i} className="text-slate-300 text-[11px]">• {imp}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

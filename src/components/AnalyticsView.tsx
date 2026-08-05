import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar
} from 'recharts';
import { BarChart3, TrendingUp, Target, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const weeklyProgress = [
    { day: 'Mon', score: 78, interviews: 2 },
    { day: 'Tue', score: 82, interviews: 3 },
    { day: 'Wed', score: 80, interviews: 1 },
    { day: 'Thu', score: 88, interviews: 4 },
    { day: 'Fri', score: 85, interviews: 2 },
    { day: 'Sat', score: 92, interviews: 5 },
    { day: 'Sun', score: 95, interviews: 3 },
  ];

  const skillRadar = [
    { category: 'System Design', score: 92 },
    { category: 'Algorithms', score: 88 },
    { category: 'Behavioral', score: 85 },
    { category: 'Voice Pace', score: 82 },
    { category: 'Pose / Eye Contact', score: 90 },
    { category: 'ATS Matching', score: 94 },
  ];

  const monthlyTrend = [
    { month: 'Apr', avgScore: 72 },
    { month: 'May', avgScore: 78 },
    { month: 'Jun', avgScore: 83 },
    { month: 'Jul', avgScore: 88 },
    { month: 'Aug', avgScore: 92 },
  ];

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            Performance & Skill Analytics Engine
          </h2>
          <p className="text-xs text-slate-400">
            Real-time score trends, skill radar, weekly progress metrics, and weak topic breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
            Average Score: 88.4 / 100
          </span>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* WEEKLY PROGRESS AREA CHART */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Weekly Score Trend
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">+14% Growth</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProgress}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis domain={[60, 100]} stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SKILL RADAR CHART */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" /> Multi-Domain Skill Radar
            </h3>
            <span className="text-xs text-cyan-300 font-semibold">Top 10% Candidate</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillRadar}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="category" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" fontSize={10} />
                <Radar name="Candidate Skill" dataKey="score" stroke="#c084fc" fill="#c084fc" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MONTHLY IMPROVEMENT TREND BAR CHART */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" /> Monthly Score Progression
            </h3>
            <span className="text-xs text-slate-400">Past 5 Months</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="avgScore" fill="#34d399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* WEAK TOPICS BREAKDOWN */}
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Sparkles className="w-4 h-4 text-amber-400" /> Targeted Remediation Areas
            </h3>
            <div className="space-y-3 pt-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-200">Distributed Cache Stampede Mitigation</span>
                  <span className="text-amber-400">76% Score</span>
                </div>
                <p className="text-slate-400 text-[11px]">Recommended: Practice Mutex Single-flight pattern in System Design lab.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-200">High-Pace Voice Articulation</span>
                  <span className="text-indigo-400">80% Score</span>
                </div>
                <p className="text-slate-400 text-[11px]">Recommended: Conduct 2 more Voice Interviews with pace monitoring enabled.</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>AI Coach Estimate: 3 more practice sessions will bring all sub-scores above 90%.</span>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { UserProfile, HistoricalReport, ActiveTab } from '../types';
import {
  Trophy,
  Flame,
  Target,
  BarChart2,
  TrendingUp,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  BookOpen,
  Calendar,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
  history: HistoricalReport[];
  leaderboard: { rank: number; name: string; score: number; role: string; streak: number }[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  history,
  leaderboard,
  setActiveTab,
}) => {
  const skillProgress = [
    { skill: 'System Design Architecture', score: 92, color: 'from-cyan-500 to-blue-600' },
    { skill: 'Data Structures & Algorithms', score: 88, color: 'from-purple-500 to-indigo-600' },
    { skill: 'Behavioral & STAR Execution', score: 85, color: 'from-rose-500 to-pink-600' },
    { skill: 'Voice Articulation & Pacing', score: 82, color: 'from-amber-500 to-orange-600' },
    { skill: 'Video Posture & Eye Contact', score: 90, color: 'from-emerald-500 to-teal-600' },
  ];

  const recommendedTopics = [
    { title: 'Distributed Mutex & Cache Stampede', category: 'System Design', difficulty: 'Hard', duration: '15 mins' },
    { title: 'STAR Framework for Leadership Conflicts', category: 'Behavioral', difficulty: 'Medium', duration: '10 mins' },
    { title: 'LRU Cache O(1) Double Linked List', category: 'Coding', difficulty: 'Medium', duration: '20 mins' },
    { title: 'Mock HR Negotiation & Equity Discussion', category: 'HR Interview', difficulty: 'Easy', duration: '12 mins' },
  ];

  const upcomingMocks = [
    { title: 'Google L6 Staff AI Architect Mock', date: 'Tomorrow, 10:00 AM', interviewer: 'AI Lead Avatar', type: 'Video + System Design' },
    { title: 'Meta Coding Round - Dynamic Programming', date: 'Thursday, 3:00 PM', interviewer: 'Code AI Engine', type: 'Coding Sandbox' },
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="rounded-2xl glass-card border-slate-800 p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              Target Role: {user.targetRole}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-purple-400" />
              {user.dailyStreak} Day Streak
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome back, <span className="gradient-text">{user.name}</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            You are performing in the top 10% of candidates for {user.targetRole}. Your readiness score is currently high.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => setActiveTab('chat-interview')}
            className="gradient-btn px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-cyan-200 fill-cyan-200" />
            <span>Launch Quick Mock</span>
          </button>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-xl border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{user.overallScore}/100</p>
            <p className="text-xs text-slate-400">Interview Overall Score</p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <BarChart2 className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{user.totalInterviews}</p>
            <p className="text-xs text-slate-400">Completed Mock Sessions</p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Flame className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{user.dailyStreak} Days</p>
            <p className="text-xs text-slate-400">Active Practice Streak</p>
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Award className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">Verified</p>
            <p className="text-xs text-slate-400">Skill Certifications Earned</p>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN DASHBOARD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT 2 COLS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Skill Progress Bar Breakdown */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Skill Mastery & Domain Breakdown
              </h3>
              <button onClick={() => setActiveTab('analytics')} className="text-xs text-cyan-400 hover:underline">
                View Full Analytics →
              </button>
            </div>

            <div className="space-y-4">
              {skillProgress.map((sk, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-200">{sk.skill}</span>
                    <span className="text-cyan-300 font-bold">{sk.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full bg-gradient-to-r ${sk.color} rounded-full transition-all duration-500`}
                      style={{ width: `${sk.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths vs Weaknesses Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl glass-card border-emerald-500/30 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Identified Key Strengths
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Deep knowledge of microservice cache coherence & Redis eviction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>High eye contact stability (90%+) and confident voice tone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Optimal O(1) space/time implementation during coding rounds.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl glass-card border-rose-500/30 space-y-3">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Focus Areas & Weaknesses
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Slight speaking speed acceleration during high-pressure questions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Elaborate more on STAR framework "Quantifiable Results" in HR round.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Practice rate limiting algorithm variants (Token Bucket vs Leaky Bucket).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Recent Interview History List */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                Recent Interview History
              </h3>
              <button onClick={() => setActiveTab('analytics')} className="text-xs text-slate-400 hover:text-white">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{item.role}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-300 border border-slate-700">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.summary}</p>
                    <p className="text-[10px] text-slate-500">{item.date} • {item.durationMinutes} mins</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-lg font-bold text-cyan-400">{item.score}</span>
                    <span className="text-[10px] text-slate-400 block">/100 Score</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          
          {/* Upcoming Mock Interviews */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Calendar className="w-4 h-4 text-purple-400" />
              Upcoming Mock Interviews
            </h3>
            <div className="space-y-3">
              {upcomingMocks.map((mc, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                  <p className="font-bold text-slate-200">{mc.title}</p>
                  <p className="text-cyan-400 text-[11px] font-medium">{mc.date}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>{mc.type}</span>
                    <button
                      onClick={() => setActiveTab('video-interview')}
                      className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 font-semibold"
                    >
                      Join Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Topics */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Recommended Practice Topics
            </h3>
            <div className="space-y-2.5">
              {recommendedTopics.map((tp, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTab('chat-interview')}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors text-xs flex items-center justify-between group"
                >
                  <div>
                    <p className="font-semibold text-slate-200 group-hover:text-cyan-300">{tp.title}</p>
                    <span className="text-[10px] text-slate-400">{tp.category} • {tp.duration}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Leaderboard */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Trophy className="w-4 h-4 text-amber-400" />
              Global Peer Leaderboard
            </h3>
            <div className="space-y-2.5">
              {leaderboard.map((lb) => (
                <div
                  key={lb.rank}
                  className={`p-2.5 rounded-xl text-xs flex items-center justify-between ${
                    lb.rank === 2
                      ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-200 font-semibold'
                      : 'bg-slate-900/50 border border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        lb.rank === 1
                          ? 'bg-amber-400 text-slate-950'
                          : lb.rank === 2
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {lb.rank}
                    </span>
                    <div>
                      <p className="text-white text-xs">{lb.name}</p>
                      <p className="text-[10px] text-slate-400">{lb.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-cyan-400">{lb.score} pts</span>
                    <span className="text-[10px] text-slate-500 block">{lb.streak}d streak</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

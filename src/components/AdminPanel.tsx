import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  FileQuestion,
  BarChart,
  Plus,
  Trash2,
  CheckCircle2,
  Database
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'questions' | 'users' | 'metrics'>('questions');

  const [questionsList, setQuestionsList] = useState([
    { id: '1', role: 'Software Engineer', type: 'System Design', title: 'Design a Realtime Collaborative Canvas Engine' },
    { id: '2', role: 'AI Engineer', type: 'Technical', title: 'Explain Transformer Attention Mechanism & Key/Value Caching' },
    { id: '3', role: 'HR Manager', type: 'HR', title: 'How do you handle team salary benchmarking and merit adjustments?' },
  ]);

  const [newRole, setNewRole] = useState('Frontend Engineer');
  const [newType, setNewType] = useState('Technical');
  const [newTitle, setNewTitle] = useState('');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setQuestionsList([
      ...questionsList,
      { id: Date.now().toString(), role: newRole, type: newType, title: newTitle.trim() },
    ]);
    setNewTitle('');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestionsList((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-6 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-cyan-400" />
            AI Interview Prep Admin Portal
          </h2>
          <p className="text-xs text-slate-400">
            Manage question banks, platform users, active prompt configurations, and enterprise usage metrics.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'questions' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
            }`}
          >
            Questions Bank
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'users' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'metrics' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
            }`}
          >
            System Metrics
          </button>
        </div>
      </div>

      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Add Question Form */}
          <form onSubmit={handleAddQuestion} className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" /> Add Custom Question to AI Bank
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Job Role"
                className="px-3 py-2 rounded-xl glass-input text-white text-xs"
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="px-3 py-2 rounded-xl glass-input text-white text-xs"
              >
                <option value="Technical" className="bg-slate-900">Technical</option>
                <option value="System Design" className="bg-slate-900">System Design</option>
                <option value="Behavioral" className="bg-slate-900">Behavioral</option>
                <option value="HR" className="bg-slate-900">HR</option>
              </select>
              <button
                type="submit"
                className="gradient-btn py-2 rounded-xl text-xs font-bold text-white shadow-lg flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter question text or prompt..."
              className="w-full px-3 py-2.5 rounded-xl glass-input text-white text-xs"
            />
          </form>

          {/* Question List */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
              Active Question Bank ({questionsList.length})
            </h3>
            <div className="space-y-2">
              {questionsList.map((q) => (
                <div key={q.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{q.title}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px]">{q.type}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Target: {q.role}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" /> Platform Registered Users (2,410)
          </h3>
          <div className="space-y-2 text-xs">
            {['Candidate User (Pro Tier)', 'Sarah Jenkins (Enterprise)', 'Michael Chen (Free Trial)', 'Elena Rostova (Pro Tier)'].map((usr, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200 font-medium">{usr}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" /> Server & API Telemetry
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-slate-400 text-[10px]">AI API Requests (24h)</p>
              <p className="text-2xl font-bold text-cyan-400">14,280</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-slate-400 text-[10px]">Average Response Latency</p>
              <p className="text-2xl font-bold text-emerald-400">420ms</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-slate-400 text-[10px]">Active WebSocket Concurrency</p>
              <p className="text-2xl font-bold text-purple-400">894</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Users,
  FileQuestion,
  BarChart,
  Plus,
  Trash2,
  CheckCircle2,
  Database,
  Video,
  Calendar,
  UserCheck,
  Link,
  IndianRupee,
  Sparkles,
  ExternalLink,
  Mail,
  Phone,
  FileSpreadsheet
} from 'lucide-react';
import { WebinarItem, WebinarRegistration } from '../types';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'webinars' | 'registrations' | 'questions' | 'users' | 'metrics'>('webinars');

  // Webinars state
  const [webinarsList, setWebinarsList] = useState<WebinarItem[]>([]);
  const [webinarLoading, setWebinarLoading] = useState(false);
  const [webinarSuccessMsg, setWebinarSuccessMsg] = useState('');

  // Registrations state
  const [registrationsList, setRegistrationsList] = useState<WebinarRegistration[]>([]);
  const [regLoading, setRegLoading] = useState(false);

  // Webinar form state
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [sourceManName, setSourceManName] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [gformLink, setGformLink] = useState('');
  const [price, setPrice] = useState('Free');

  // Questions state
  const [questionsList, setQuestionsList] = useState([
    { id: '1', role: 'Software Engineer', type: 'System Design', title: 'Design a Realtime Collaborative Canvas Engine with Operational Transformation' },
    { id: '2', role: 'AI Engineer', type: 'Technical', title: 'Explain Transformer Attention Mechanism, FlashAttention & Key/Value Caching' },
    { id: '3', role: 'Full Stack Developer', type: 'Coding', title: 'Implement an LRU Cache with O(1) Time Complexity in TypeScript / Python' },
    { id: '4', role: 'Frontend Engineer', type: 'Technical', title: 'How does React Virtual DOM reconciliation diffing algorithm work under the hood?' },
    { id: '5', role: 'Backend Engineer', type: 'System Design', title: 'Design a High-Throughput Distributed Rate Limiter & Token Bucket Algorithm' },
    { id: '6', role: 'Data Engineer', type: 'Technical', title: 'SQL: Find Top 3 Earners Per Department Using DENSE_RANK() Window Function' },
    { id: '7', role: 'HR Manager', type: 'HR', title: 'How do you handle team salary benchmarking, equity packages, and merit adjustments?' },
    { id: '8', role: 'Engineering Lead', type: 'Behavioral', title: 'Describe a situation where you managed architectural tech debt vs product delivery deadline.' },
    { id: '9', role: 'DevOps Engineer', type: 'System Design', title: 'Architect a Zero-Downtime Blue/Green Kubernetes Deployment Pipeline' },
    { id: '10', role: 'Mobile Developer', type: 'Technical', title: 'Explain React Native / Flutter Bridge vs JSI Architecture & Memory Optimization' },
    { id: '11', role: 'Security Engineer', type: 'Technical', title: 'How do you mitigate OAuth 2.0 PKCE grant vulnerabilities & JWT session hijacking?' },
    { id: '12', role: 'Product Manager', type: 'Behavioral', title: 'How do you prioritize feature requests when engineering capacity is constrained?' },
    { id: '13', role: 'Full Stack Engineer', type: 'Coding', title: 'Trapping Rain Water: Calculate total water trapped in O(N) time and O(1) space' },
    { id: '14', role: 'ML Ops Engineer', type: 'Technical', title: 'How do you setup Continuous Training & Model Drift Monitoring for LLM pipelines?' },
    { id: '15', role: 'Senior Architect', type: 'System Design', title: 'Design a Global Event-Driven Notification System with Idempotent Delivery' },
  ]);

  const [newRole, setNewRole] = useState('Frontend Engineer');
  const [newType, setNewType] = useState('Technical');
  const [newTitle, setNewTitle] = useState('');

  // Fetch webinars on mount
  const fetchWebinars = async () => {
    try {
      setWebinarLoading(true);
      const res = await fetch('/api/webinars');
      if (res.ok) {
        const data = await res.json();
        setWebinarsList(data);
      }
    } catch (err) {
      console.error('Error fetching webinars:', err);
    } finally {
      setWebinarLoading(false);
    }
  };

  // Fetch candidate registrations
  const fetchRegistrations = async () => {
    try {
      setRegLoading(true);
      const res = await fetch('/api/webinar-registrations');
      if (res.ok) {
        const data = await res.json();
        setRegistrationsList(data);
      }
    } catch (err) {
      console.error('Error fetching webinar registrations:', err);
    } finally {
      setRegLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinars();
    fetchRegistrations();
  }, []);

  const handleAddWebinar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date.trim() || !sourceManName.trim()) {
      alert('Please fill out all required webinar fields (Name, Date, Speaker).');
      return;
    }

    try {
      setWebinarLoading(true);
      const res = await fetch('/api/webinars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          date: date.trim(),
          sourceManName: sourceManName.trim(),
          meetingLink: meetingLink.trim(),
          gformLink: gformLink.trim(),
          price: price.trim() || 'Free',
        }),
      });

      if (res.ok) {
        const newWebinar = await res.json();
        setWebinarsList((prev) => [newWebinar, ...prev]);
        setName('');
        setDate('');
        setSourceManName('');
        setMeetingLink('');
        setGformLink('');
        setPrice('Free');
        setWebinarSuccessMsg('Webinar successfully published! It is live on the Home Page.');
        setTimeout(() => setWebinarSuccessMsg(''), 4000);
      }
    } catch (err) {
      console.error('Error adding webinar:', err);
    } finally {
      setWebinarLoading(false);
    }
  };

  const handleDeleteWebinar = async (id: string) => {
    if (!confirm('Are you sure you want to delete this webinar?')) return;
    try {
      const res = await fetch(`/api/webinars/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setWebinarsList((prev) => prev.filter((w) => w.id !== id));
      }
    } catch (err) {
      console.error('Error deleting webinar:', err);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    try {
      const res = await fetch(`/api/webinar-registrations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRegistrationsList((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error('Error deleting registration:', err);
    }
  };

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
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-sky-400" />
              AI Interview Prep Admin Portal
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-500/30">
              Ctrl + Shift + A
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage webinars, Google Form links, candidate registrations, and system telemetry.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('webinars')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'webinars' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Webinars ({webinarsList.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('registrations');
              fetchRegistrations();
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'registrations' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Registrations ({registrationsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'questions' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileQuestion className="w-3.5 h-3.5" />
            <span>Questions</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'users' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'metrics' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Metrics</span>
          </button>
        </div>
      </div>

      {/* WEBINARS TAB */}
      {activeTab === 'webinars' && (
        <div className="space-y-6">
          {webinarSuccessMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{webinarSuccessMsg}</span>
            </div>
          )}

          {/* Add Webinar Form */}
          <form onSubmit={handleAddWebinar} className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-400" />
                Add New Career Webinar / Masterclass
              </h3>
              <span className="text-[11px] text-slate-400">Live on Home Page instantly</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Webinar Name */}
              <div className="space-y-1 md:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-300">Webinar Title / Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cracking System Design & AI Technical Interviews"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                />
              </div>

              {/* Date & Time */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-sky-400" /> Date & Time *
                </label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. Aug 25, 2026 at 6:00 PM EST"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                />
              </div>

              {/* Source Man Name (Speaker/Host) */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-indigo-400" /> Host / Speaker Name *
                </label>
                <input
                  type="text"
                  required
                  value={sourceManName}
                  onChange={(e) => setSourceManName(e.target.value)}
                  placeholder="e.g. Dr. Alex Vance (Ex-Google Principal Engineer)"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                />
              </div>

              {/* Meeting Link */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <Link className="w-3 h-3 text-purple-400" /> Live Meeting URL / Join Link (Optional)
                </label>
                <input
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/abc-defg-hij or Zoom link (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                />
              </div>

              {/* Google Form Link */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <FileSpreadsheet className="w-3 h-3 text-emerald-400" /> Google Form Registration Link (Optional)
                </label>
                <input
                  type="url"
                  value={gformLink}
                  onChange={(e) => setGformLink(e.target.value)}
                  placeholder="https://docs.google.com/forms/d/e/.../viewform"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                />
              </div>

              {/* Price */}
              <div className="space-y-1 md:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-emerald-400" /> Ticket Price (₹ / Free)
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Free or ₹499, ₹1,499"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={webinarLoading}
                className="gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Webinar to Home Page</span>
              </button>
            </div>
          </form>

          {/* List of Active Webinars */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-sky-400" />
                Active Published Webinars ({webinarsList.length})
              </h3>
              <button
                onClick={fetchWebinars}
                className="text-[11px] text-sky-400 hover:underline font-semibold"
              >
                Refresh List
              </button>
            </div>

            {webinarsList.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-slate-400">No webinars published yet.</p>
                <p className="text-[11px] text-slate-500">Fill out the form above to publish a webinar to the Home Page.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {webinarsList.map((webinar) => (
                  <div
                    key={webinar.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm">{webinar.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          webinar.price.toLowerCase() === 'free'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {webinar.price}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1 text-sky-300">
                          <Calendar className="w-3 h-3 text-sky-400" /> {webinar.date}
                        </span>
                        <span className="flex items-center gap-1 text-indigo-300">
                          <UserCheck className="w-3 h-3 text-indigo-400" /> Host: {webinar.sourceManName}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-[11px]">
                        <a
                          href={webinar.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-mono hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Meeting: {webinar.meetingLink}
                        </a>

                        {webinar.gformLink && (
                          <a
                            href={webinar.gformLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-mono hover:underline"
                          >
                            <FileSpreadsheet className="w-3 h-3" />
                            Google Form: {webinar.gformLink}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleDeleteWebinar(webinar.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 text-xs"
                        title="Delete Webinar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* REGISTRATIONS TAB */}
      {activeTab === 'registrations' && (
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                Registered Candidates Log ({registrationsList.length})
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                All names, emails, phone numbers, and target roles of users who registered for webinars.
              </p>
            </div>
            <button
              onClick={fetchRegistrations}
              className="text-[11px] text-emerald-400 hover:underline font-semibold"
            >
              Refresh Registrations
            </button>
          </div>

          {regLoading ? (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">Loading registrations...</div>
          ) : registrationsList.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No candidates registered for webinars yet. When users register on the home page, their details will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {registrationsList.map((reg) => (
                <div
                  key={reg.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">{reg.userName}</span>
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-medium border border-sky-500/30">
                        {reg.userRole || 'Candidate'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(reg.registeredAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      Webinar: <span className="text-white">{reg.webinarName}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-[11px] pt-1">
                      <span className="flex items-center gap-1 text-emerald-300 font-mono">
                        <Mail className="w-3 h-3 text-emerald-400" /> {reg.userEmail}
                      </span>
                      {reg.userPhone && (
                        <span className="flex items-center gap-1 text-indigo-300 font-mono">
                          <Phone className="w-3 h-3 text-indigo-400" /> {reg.userPhone}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteRegistration(reg.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 text-xs self-end sm:self-center"
                    title="Remove Registration"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* QUESTIONS TAB */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Add Question Form */}
          <form onSubmit={handleAddQuestion} className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-sky-400" /> Add Custom Question to AI Bank
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
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 text-[10px]">{q.type}</span>
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

      {/* USERS TAB */}
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

      {/* METRICS TAB */}
      {activeTab === 'metrics' && (
        <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" /> Server & API Telemetry
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-slate-400 text-[10px]">AI API Requests (24h)</p>
              <p className="text-2xl font-bold text-sky-400">14,280</p>
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


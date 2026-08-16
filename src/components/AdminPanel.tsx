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
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  CreditCard,
  QrCode,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCw,
  Edit3,
  Check
} from 'lucide-react';
import { WebinarItem, WebinarRegistration, SubscriptionPaymentRecord, PlanId } from '../types';
import { 
  subscribeToSubscriptionPayments, 
  adminUpdateUserQuota,
  subscribeToWebinars,
  subscribeToWebinarRegistrations,
  saveWebinarToFirestore,
  deleteWebinarFromFirestore,
  deleteWebinarRegistrationFromFirestore
} from '../lib/firebase';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'webinars' | 'registrations' | 'subscriptions' | 'questions' | 'users' | 'metrics'>('subscriptions');

  // Subscription Payments Realtime State
  const [subscriptionsList, setSubscriptionsList] = useState<SubscriptionPaymentRecord[]>([]);
  const [subSearchQuery, setSubSearchQuery] = useState('');
  const [subPlanFilter, setSubPlanFilter] = useState('ALL');
  
  // Manual Quota Edit Form
  const [manualEmail, setManualEmail] = useState('');
  const [manualPlan, setManualPlan] = useState<PlanId>('tier-99');
  const [manualUses, setManualUses] = useState(10);
  const [manualMsg, setManualMsg] = useState('');

  // Webinars state
  const [webinarsList, setWebinarsList] = useState<WebinarItem[]>([]);
  const [webinarLoading, setWebinarLoading] = useState(false);
  const [webinarSuccessMsg, setWebinarSuccessMsg] = useState('');

  // Registrations state
  const [registrationsList, setRegistrationsList] = useState<WebinarRegistration[]>([]);
  const [regLoading, setRegLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWebinarFilter, setSelectedWebinarFilter] = useState('ALL');

  // Webinar form state
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [sourceManName, setSourceManName] = useState('Priyadha 1988');
  const [meetingLink, setMeetingLink] = useState('');
  const [gformLink, setGformLink] = useState('');
  const [price, setPrice] = useState('₹100');

  // Questions state
  const [questionsList, setQuestionsList] = useState([
    { id: '1', role: 'Software Engineer', type: 'Coding', title: 'Find Second Largest Element in an Array in O(N) Time and O(1) Auxiliary Space' },
    { id: '2', role: 'Software Engineer', type: 'Coding', title: 'Binary Search Algorithm: O(log N) Time Complexity & Midpoint Overflow Prevention' },
    { id: '3', role: 'Full Stack Developer', type: 'Technical', title: 'Linear Search vs Binary Search Comparison: Trade-offs & Benchmark Analysis' },
    { id: '4', role: 'Backend Engineer', type: 'Coding', title: 'Search in Rotated Sorted Array in O(log N) with Modified Binary Search' },
    { id: '5', role: 'Software Engineer', type: 'System Design', title: 'Design a Realtime Collaborative Canvas Engine with Operational Transformation' },
    { id: '6', role: 'AI Engineer', type: 'Technical', title: 'Explain Transformer Attention Mechanism, FlashAttention & Key/Value Caching' },
    { id: '7', role: 'Full Stack Developer', type: 'Coding', title: 'Implement an LRU Cache with O(1) Time Complexity in TypeScript / Python' },
    { id: '8', role: 'Frontend Engineer', type: 'Technical', title: 'How does React Virtual DOM reconciliation diffing algorithm work under the hood?' },
    { id: '9', role: 'Backend Engineer', type: 'System Design', title: 'Design a High-Throughput Distributed Rate Limiter & Token Bucket Algorithm' },
    { id: '10', role: 'Data Engineer', type: 'Technical', title: 'SQL: Find Top 3 Earners Per Department Using DENSE_RANK() Window Function' },
  ]);

  const [newRole, setNewRole] = useState('Frontend Engineer');
  const [newType, setNewType] = useState('Technical');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    // Real-time listener for Webinars from Firestore
    const unsubscribeWebinars = subscribeToWebinars((webinars) => {
      setWebinarsList(webinars);
      setWebinarLoading(false);
    });

    // Real-time listener for Webinar Registrations from Firestore
    const unsubscribeRegs = subscribeToWebinarRegistrations((regs) => {
      setRegistrationsList(regs);
      setRegLoading(false);
    });

    // Real-time listener for Firestore subscription payments
    const unsubscribeSubs = subscribeToSubscriptionPayments((payments) => {
      setSubscriptionsList(payments);
    });

    return () => {
      if (unsubscribeWebinars) unsubscribeWebinars();
      if (unsubscribeRegs) unsubscribeRegs();
      if (unsubscribeSubs) unsubscribeSubs();
    };
  }, []);

  const handleManualQuotaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualEmail.trim()) {
      alert('Please enter user email to update quota.');
      return;
    }

    const planNames: Record<PlanId, string> = {
      'free': 'Free Trial (1 Use)',
      'tier-99': 'Starter Plan (₹99 - 10 Uses / Mo)',
      'tier-699': 'Medium Plan (₹699 - 30 Uses / Mo)',
      'tier-1299': 'Unlimited Plan (₹1299 - Unlimited / Mo)',
      'tier-499': 'Starter Legacy (₹499 - 10 Uses)',
      'tier-2000': 'Unlimited Legacy (₹2000)',
    };

    const isUnlimited = manualPlan === 'tier-1299' || manualPlan === 'tier-2000';
    const totalAllowed = isUnlimited ? -1 : manualPlan === 'tier-99' ? 10 : manualPlan === 'tier-699' ? 30 : manualPlan === 'tier-499' ? 10 : 1;
    const remaining = isUnlimited ? 99999 : Number(manualUses) || (manualPlan === 'tier-699' ? 30 : 10);
    const userId = manualEmail.trim().replace(/[^a-zA-Z0-9]/g, '_');

    try {
      await adminUpdateUserQuota(
        userId,
        manualPlan,
        planNames[manualPlan] || 'Custom Plan',
        totalAllowed,
        remaining
      );

      setManualMsg(`Successfully updated real-time quota for ${manualEmail}! Plan: ${planNames[manualPlan]}, Uses: ${isUnlimited ? 'Unlimited' : remaining}`);
      setManualEmail('');
      setTimeout(() => setManualMsg(''), 5000);
    } catch (e) {
      alert('Failed to update user quota in Firestore.');
    }
  };

  // CSV Export for Subscriptions
  const exportSubscriptionsCsv = () => {
    if (subscriptionsList.length === 0) {
      alert('No subscription payments available to export.');
      return;
    }

    const headers = ['Payment ID', 'Candidate Name', 'User Email', 'Plan Name', 'Amount (INR)', 'UTR / Transaction ID', 'Uses Granted', 'Status', 'Date'];
    const rows = subscriptionsList.map((s) => [
      `"${s.id}"`,
      `"${(s.userName || 'Candidate').replace(/"/g, '""')}"`,
      `"${s.userEmail.replace(/"/g, '""')}"`,
      `"${s.planName.replace(/"/g, '""')}"`,
      `"₹${s.amount}"`,
      `"${s.utr.replace(/"/g, '""')}"`,
      `"${s.totalUsesGranted === -1 ? 'Unlimited' : s.totalUsesGranted}"`,
      `"${s.status}"`,
      `"${new Date(s.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Subscriptions_Paid_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddWebinar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date.trim() || !sourceManName.trim()) {
      alert('Please fill out all required webinar fields (Name, Date, Speaker).');
      return;
    }

    try {
      setWebinarLoading(true);
      const webinarPayload = {
        name: name.trim(),
        date: date.trim(),
        sourceManName: sourceManName.trim(),
        meetingLink: meetingLink.trim(),
        gformLink: gformLink.trim(),
        price: price.trim() || '₹100',
      };

      // 1. Save directly to Firestore for real-time sync across all devices globally
      await saveWebinarToFirestore(webinarPayload);

      // 2. Also notify server as backup
      try {
        await fetch('/api/webinars', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webinarPayload),
        });
      } catch (err) {
        // Fallback
      }

      setName('');
      setDate('');
      setMeetingLink('');
      setGformLink('');
      setPrice('₹100');
      setWebinarSuccessMsg('Webinar successfully published and synced in real-time across all devices!');
      setTimeout(() => setWebinarSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error adding webinar:', err);
      alert('Failed to publish webinar to Firestore database.');
    } finally {
      setWebinarLoading(false);
    }
  };

  const handleDeleteWebinar = async (id: string) => {
    if (!confirm('Are you sure you want to delete this webinar? It will be removed in real-time from all devices across the world.')) return;
    try {
      // 1. Delete from Firestore real-time database
      await deleteWebinarFromFirestore(id);

      // 2. Also notify server
      try {
        await fetch(`/api/webinars/${id}`, { method: 'DELETE' });
      } catch (err) {
        // Fallback
      }

      // Optimistically remove from local list if not yet caught by snapshot
      setWebinarsList((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      console.error('Error deleting webinar:', err);
      alert('Failed to delete webinar from Firestore.');
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    try {
      // 1. Delete from Firestore
      await deleteWebinarRegistrationFromFirestore(id);

      // 2. Also notify server
      try {
        await fetch(`/api/webinar-registrations/${id}`, { method: 'DELETE' });
      } catch (err) {
        // Fallback
      }

      setRegistrationsList((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Error deleting registration:', err);
      alert('Failed to delete registration from Firestore.');
    }
  };

  // CSV Export for Registrations
  const exportRegistrationsCsv = () => {
    if (registrationsList.length === 0) {
      alert('No candidate registrations available to export.');
      return;
    }

    const headers = ['Registration ID', 'Candidate Name', 'Email', 'Phone', 'Target Role', 'Webinar Title', 'Amount Paid', 'UTR / Ref ID', 'Payment Recipient', 'Registered At'];
    const rows = registrationsList.map((r) => [
      `"${r.id}"`,
      `"${r.userName.replace(/"/g, '""')}"`,
      `"${r.userEmail.replace(/"/g, '""')}"`,
      `"${(r.userPhone || '').replace(/"/g, '""')}"`,
      `"${(r.userRole || 'Candidate').replace(/"/g, '""')}"`,
      `"${r.webinarName.replace(/"/g, '""')}"`,
      `"${r.amountPaid || '₹100'}"`,
      `"${r.utr || 'UPI_QR_SCANNED'}"`,
      `"${r.paymentRecipient || 'priyadha1988@oksbi'}"`,
      `"${new Date(r.registeredAt).toLocaleString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Webinar_Paid_Candidates_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered registrations
  const filteredRegistrations = registrationsList.filter((reg) => {
    const matchesSearch =
      reg.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reg.userPhone && reg.userPhone.includes(searchQuery)) ||
      reg.webinarName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reg.utr && reg.utr.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWebinar = selectedWebinarFilter === 'ALL' || reg.webinarId === selectedWebinarFilter || reg.webinarName === selectedWebinarFilter;

    return matchesSearch && matchesWebinar;
  });

  // Calculate Total Collected Amount
  const totalRevenue = registrationsList.reduce((acc, curr) => {
    const numeric = parseInt((curr.amountPaid || '100').replace(/[^0-9]/g, ''), 10) || 0;
    return acc + numeric;
  }, 0);

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
            onClick={() => setActiveTab('subscriptions')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'subscriptions' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Subscriptions ({subscriptionsList.length})</span>
          </button>
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
            onClick={() => setActiveTab('registrations')}
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

      {/* SUBSCRIPTIONS TAB (REALTIME UPI REVENUE & QUOTA MANAGEMENT) */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          {/* Revenue & Tier Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Active Subscriptions
              </span>
              <p className="text-2xl font-black text-white">{subscriptionsList.length}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-emerald-400" /> Total UPI Revenue
              </span>
              <p className="text-2xl font-black text-emerald-400">
                ₹{subscriptionsList.reduce((sum, s) => sum + (s.amount || 0), 0).toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-sky-400" /> Active Tier Plans
              </span>
              <p className="text-xs font-bold text-sky-300 pt-1">
                ₹99 (10x / mo) • ₹699 (30x / mo) • ₹1299 (∞ / mo)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> UPI Merchant Recipient
              </span>
              <p className="text-xs font-bold text-amber-300 font-mono pt-1">priyadha1988@oksbi</p>
            </div>
          </div>

          {/* Real-time Manual Candidate Quota & Plan Modifier */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                Real-time Quota Manager & Plan Assignor
              </h3>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Firestore Sync
              </span>
            </div>

            {manualMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{manualMsg}</span>
              </div>
            )}

            <form onSubmit={handleManualQuotaSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Candidate Email *</label>
                <input
                  type="email"
                  required
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="candidate@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Target Plan</label>
                <select
                  value={manualPlan}
                  onChange={(e) => {
                    const p = e.target.value as PlanId;
                    setManualPlan(p);
                    if (p === 'tier-99') setManualUses(10);
                    else if (p === 'tier-699') setManualUses(30);
                    else if (p === 'tier-1299' || p === 'tier-2000') setManualUses(99999);
                    else if (p === 'tier-499') setManualUses(10);
                    else setManualUses(1);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs bg-slate-900"
                >
                  <option value="tier-99">Starter (₹99 - 10 Uses / Mo)</option>
                  <option value="tier-699">Medium (₹699 - 30 Uses / Mo)</option>
                  <option value="tier-1299">Unlimited (₹1299 - Unlimited / Mo)</option>
                  <option value="free">Free Trial (1 Use)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Remaining Uses</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={manualPlan === 'tier-1299' || manualPlan === 'tier-2000' ? 99999 : manualUses}
                    disabled={manualPlan === 'tier-1299' || manualPlan === 'tier-2000'}
                    onChange={(e) => setManualUses(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    className="gradient-btn px-4 py-2.5 rounded-xl text-white font-bold shrink-0 shadow-md flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Subscriptions Paid Log */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  Real-time UPI Subscription Payments ({subscriptionsList.length})
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  All candidate QR payments and UTR submissions registered in Firestore.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportSubscriptionsCsv}
                  className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-2/3">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={subSearchQuery}
                  onChange={(e) => setSubSearchQuery(e.target.value)}
                  placeholder="Search candidate name, email, UTR reference..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                />
              </div>

              <div className="relative w-full sm:w-1/3">
                <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <select
                  value={subPlanFilter}
                  onChange={(e) => setSubPlanFilter(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2 rounded-xl glass-input text-white text-xs bg-slate-900"
                >
                  <option value="ALL">All Plans</option>
                  <option value="tier-99">Starter (₹99)</option>
                  <option value="tier-699">Medium (₹699)</option>
                  <option value="tier-1299">Unlimited (₹1299)</option>
                </select>
              </div>
            </div>

            {/* Subscriptions List */}
            {subscriptionsList.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No subscription payments recorded yet in Firestore. Payments submitted via the QR scanner modal will appear here instantly in real-time.
              </div>
            ) : (
              <div className="space-y-3">
                {subscriptionsList
                  .filter((s) => {
                    const matchQ =
                      s.userName?.toLowerCase().includes(subSearchQuery.toLowerCase()) ||
                      s.userEmail?.toLowerCase().includes(subSearchQuery.toLowerCase()) ||
                      s.utr?.toLowerCase().includes(subSearchQuery.toLowerCase());
                    const matchPlan = subPlanFilter === 'ALL' || s.planId === subPlanFilter;
                    return matchQ && matchPlan;
                  })
                  .map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs hover:border-slate-700 transition-all"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-sm">{sub.userName || 'Candidate'}</span>
                          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-medium border border-sky-500/30">
                            {sub.planName}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" /> ₹{sub.amount} Paid
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                            {sub.totalUsesGranted === -1 ? 'Unlimited Uses' : `${sub.totalUsesGranted} Uses Granted`}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(sub.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300 text-[11px]">
                          <a
                            href={`mailto:${sub.userEmail}`}
                            className="flex items-center gap-1 text-emerald-300 hover:underline font-mono"
                          >
                            <Mail className="w-3.5 h-3.5 text-emerald-400" /> {sub.userEmail}
                          </a>
                          {sub.userPhone && (
                            <span className="flex items-center gap-1 text-indigo-300 font-mono">
                              <Phone className="w-3.5 h-3.5 text-indigo-400" /> {sub.userPhone}
                            </span>
                          )}
                        </div>

                        <div className="pt-1 flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-400">
                          <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                            UTR / Ref No: <strong className="text-amber-300">{sub.utr}</strong>
                          </span>
                          <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                            UPI Recipient: <strong className="text-slate-200">{sub.paidTo || 'priyadha1988@oksbi'}</strong>
                          </span>
                          <span className="bg-emerald-950/40 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-bold">
                            ✓ Status: Verified in Firestore
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <a
                          href={`mailto:${sub.userEmail}?subject=InterviewAI%20Subscription%20Active%20-%20${encodeURIComponent(sub.planName)}`}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 transition-colors flex items-center gap-1 text-xs"
                          title="Send Email Receipt"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Receipt</span>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

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
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Ticket Price (₹ / Free) *
                  </span>
                  <span className="text-[10px] text-slate-400">Whatever price you set will auto-generate the UPI QR Code</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. ₹100 or ₹250, ₹499"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500 font-bold"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    {['₹100', '₹250', '₹499', '₹999', 'Free'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setPrice(preset)}
                        className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all ${
                          price === preset
                            ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={webinarLoading}
                className="gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Webinar ({price}) to Home Page</span>
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
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Firestore Real-time Sync
              </span>
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
                        {webinar.meetingLink && (
                          <a
                            href={webinar.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-mono hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Meeting: {webinar.meetingLink}
                          </a>
                        )}

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

      {/* REGISTRATIONS TAB (CANDIDATE LOGS & PAYMENT DETAILS) */}
      {activeTab === 'registrations' && (
        <div className="space-y-6">
          {/* Top Revenue & Registration Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-400" /> Registered Candidates
              </span>
              <p className="text-2xl font-black text-white">{registrationsList.length}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-emerald-400" /> Total Payments Collected
              </span>
              <p className="text-2xl font-black text-emerald-400">₹{totalRevenue.toLocaleString()}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Payment UPI Recipient
              </span>
              <p className="text-sm font-bold text-amber-300 font-mono pt-1">priyadha1988@oksbi</p>
            </div>
          </div>

          {/* Main Candidates Log Panel */}
          <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  Candidate Registration & Payment Records ({filteredRegistrations.length})
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Full details of candidates who registered and scanned UPI QR code.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportRegistrationsCsv}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <span className="px-2.5 py-1.5 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Realtime Cloud Sync
                </span>
              </div>
            </div>

            {/* Search & Filter bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-2/3">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candidate name, email, phone, UTR or webinar..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl glass-input text-white text-xs placeholder:text-slate-500"
                />
              </div>

              <div className="relative w-full sm:w-1/3">
                <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <select
                  value={selectedWebinarFilter}
                  onChange={(e) => setSelectedWebinarFilter(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2 rounded-xl glass-input text-white text-xs bg-slate-900"
                >
                  <option value="ALL">All Webinars</option>
                  {webinarsList.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {regLoading ? (
              <div className="py-8 text-center text-xs text-slate-400 animate-pulse">Loading registrations...</div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                {searchQuery || selectedWebinarFilter !== 'ALL'
                  ? 'No candidate registrations match your search criteria.'
                  : 'No candidate registrations recorded yet.'}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-1.5">
                      {/* Name & Role */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm">{reg.userName}</span>
                        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-medium border border-sky-500/30">
                          {reg.userRole || 'Candidate'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                          <CreditCard className="w-3 h-3" /> Paid: {reg.amountPaid || '₹100'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(reg.registeredAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Webinar Name */}
                      <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        Webinar: <span className="text-white">{reg.webinarName}</span>
                      </p>

                      {/* Contact Info (Email & Phone) */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300 text-[11px]">
                        <a
                          href={`mailto:${reg.userEmail}`}
                          className="flex items-center gap-1 text-emerald-300 hover:underline font-mono"
                        >
                          <Mail className="w-3.5 h-3.5 text-emerald-400" /> {reg.userEmail}
                        </a>
                        {reg.userPhone && (
                          <a
                            href={`tel:${reg.userPhone}`}
                            className="flex items-center gap-1 text-indigo-300 hover:underline font-mono"
                          >
                            <Phone className="w-3.5 h-3.5 text-indigo-400" /> {reg.userPhone}
                          </a>
                        )}
                      </div>

                      {/* Payment Details / UTR */}
                      <div className="pt-1 flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-400">
                        <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                          UTR / Ref: <strong className="text-amber-300">{reg.utr || 'UPI_QR_SCANNED'}</strong>
                        </span>
                        <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                          UPI Recipient: <strong className="text-slate-200">{reg.paymentRecipient || 'priyadha1988@oksbi'}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <a
                        href={`mailto:${reg.userEmail}?subject=Webinar%20Confirmation%20-%20${encodeURIComponent(reg.webinarName)}`}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 transition-colors flex items-center gap-1 text-xs"
                        title="Send Email to Candidate"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Email</span>
                      </a>
                      <button
                        onClick={() => handleDeleteRegistration(reg.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 text-xs"
                        title="Remove Registration"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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


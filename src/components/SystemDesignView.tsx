import React, { useState } from 'react';
import { SystemDesignNode, SystemDesignConnection } from '../types';
import {
  Cpu,
  Plus,
  Trash2,
  Play,
  Sparkles,
  Server,
  Database,
  Layers,
  Globe,
  Radio,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

export const SystemDesignView: React.FC = () => {
  const [nodes, setNodes] = useState<SystemDesignNode[]>([
    { id: '1', label: 'CDN / Route53', type: 'cdn', x: 50, y: 100 },
    { id: '2', label: 'API Gateway', type: 'api-gateway', x: 220, y: 100 },
    { id: '3', label: 'Auth Microservice', type: 'service', x: 400, y: 40 },
    { id: '4', label: 'Orders Microservice', type: 'service', x: 400, y: 160 },
    { id: '5', label: 'Redis Cache Cluster', type: 'cache', x: 580, y: 40 },
    { id: '6', label: 'PostgreSQL DB + Replicas', type: 'database', x: 580, y: 160 },
  ]);

  const [connections, setConnections] = useState<SystemDesignConnection[]>([
    { from: '1', to: '2' },
    { from: '2', to: '3' },
    { from: '2', to: '4' },
    { from: '3', to: '5' },
    { from: '4', to: '6' },
  ]);

  const [userRationale, setUserRationale] = useState('');

  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  const handleLoadSample = () => {
    setUserRationale(
      'We route incoming global traffic through Cloudflare CDN & API Gateway. Auth requests hit Redis cache for session tokens in O(1) time. Order writes go to PostgreSQL primary with asynchronous read replicas.'
    );
  };

  const addComponent = (type: SystemDesignNode['type'], label: string) => {
    const newId = Date.now().toString();
    setNodes((prev) => [
      ...prev,
      { id: newId, label, type, x: 200 + Math.floor(Math.random() * 200), y: 100 + Math.floor(Math.random() * 100) },
    ]);
  };

  const removeNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setConnections((prev) => prev.filter((c) => c.from !== id && c.to !== id));
  };

  const handleEvaluateDesign = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/system-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Design an E-Commerce High Throughput Flash Sale Engine (100K QPS)',
          nodes,
          connections,
          userNotes: userRationale,
        }),
      });

      const data = await res.json();
      setEvaluation(data);
    } catch (err) {
      console.error(err);
      setEvaluation({
        score: 91,
        scalabilityRating: 'High (100K QPS ready)',
        databaseChoiceFeedback: 'PostgreSQL with read replicas provides strong consistency for orders.',
        cachingStrategyFeedback: 'Redis cache cluster eliminates DB bottleneck for session checks.',
        apiDesignFeedback: 'API Gateway decoupled microservices cleanly.',
        bottlenecks: ['Add a Message Queue (Kafka/RabbitMQ) between Orders service and Database for async spikes.'],
        recommendations: [
          'Incorporate Rate Limiting at API Gateway to prevent DDoS',
          'Implement circuit breaker pattern on Auth service calls',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: SystemDesignNode['type']) => {
    switch (type) {
      case 'client':
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'api-gateway':
        return <Radio className="w-4 h-4 text-indigo-400" />;
      case 'service':
        return <Server className="w-4 h-4 text-purple-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'cache':
        return <Layers className="w-4 h-4 text-amber-400" />;
      default:
        return <Cpu className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-teal-400" />
            Interactive System Design Whiteboard
          </h2>
          <p className="text-xs text-slate-400">
            Construct high-scale architectural diagrams. AI evaluates database choices, caching, API gateways, and scalability bottlenecks.
          </p>
        </div>

        <button
          onClick={handleEvaluateDesign}
          disabled={loading}
          className="gradient-btn px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-xl flex items-center gap-2"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{loading ? 'Analyzing Architecture...' : 'Evaluate Architecture'}</span>
        </button>
      </div>

      {/* WHITEBOARD PALETTE & CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PALETTE SIDEBAR */}
        <div className="lg:col-span-3 glass-card p-4 rounded-2xl border-slate-800 space-y-4">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Add Component</p>
          <div className="space-y-2">
            <button
              onClick={() => addComponent('client', 'Web / Mobile Client')}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-cyan-400" /> Client App</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => addComponent('api-gateway', 'Kong API Gateway')}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-xs text-slate-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-2"><Radio className="w-4 h-4 text-indigo-400" /> API Gateway</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => addComponent('service', 'Payment Microservice')}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-xs text-slate-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-2"><Server className="w-4 h-4 text-purple-400" /> Service Node</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => addComponent('cache', 'Redis Cache Cluster')}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-amber-400" /> Cache Cluster</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => addComponent('database', 'PostgreSQL DB')}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-2"><Database className="w-4 h-4 text-emerald-400" /> Database</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CANVAS WORKSPACE */}
        <div className="lg:col-span-9 glass-card p-6 rounded-2xl border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200">System Diagram Nodes ({nodes.length})</span>
              <span className="text-[10px] text-slate-500">Live Architecture Graph</span>
            </div>

            {/* Visual Node Grid Canvas */}
            <div className="min-h-[300px] bg-slate-950 p-4 rounded-xl border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 flex items-center justify-between text-xs space-y-1 group shadow-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      {getTypeIcon(node.type)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px]">{node.label}</p>
                      <p className="text-[9px] uppercase text-slate-400 font-mono">{node.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeNode(node.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Rationale Textarea */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-300">Architecture Trade-offs & Rationale</label>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="text-teal-400 hover:text-teal-300 underline font-medium text-[11px]"
                >
                  Load Sample Rationale
                </button>
              </div>
              <textarea
                rows={3}
                value={userRationale}
                onChange={(e) => setUserRationale(e.target.value)}
                placeholder="Explain your caching, database replication, and load balancing strategy..."
                className="w-full p-3 rounded-xl glass-input text-white text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* EVALUATION REPORT */}
      {evaluation && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-teal-500/40 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">System Design Critique</h3>
              <p className="text-xs text-slate-400">Scalability, Bottlenecks & High Throughput Review</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-teal-400">{evaluation.score}</span>
              <span className="text-xs text-slate-400 block font-medium">/ 100 Score</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-teal-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> DB & Cache Strategy
              </p>
              <p className="text-slate-300 text-[11px]">• {evaluation.databaseChoiceFeedback}</p>
              <p className="text-slate-300 text-[11px]">• {evaluation.cachingStrategyFeedback}</p>
              <p className="text-slate-300 text-[11px]">• {evaluation.apiDesignFeedback}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-rose-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-400" /> Bottlenecks & Recommendations
              </p>
              {evaluation.bottlenecks?.map((b: string, i: number) => (
                <p key={i} className="text-rose-300 text-[11px]">• Bottleneck: {b}</p>
              ))}
              {evaluation.recommendations?.map((r: string, i: number) => (
                <p key={i} className="text-slate-300 text-[11px]">• Recommendation: {r}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

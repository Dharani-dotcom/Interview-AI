import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import {
  Video,
  Code2,
  BookOpen,
  Brain,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Terminal,
  Activity,
  Cpu,
  Eye,
  Volume2,
  Zap,
  Layers,
  ChevronRight,
  Maximize2,
  RefreshCw,
  FileCode,
  ShieldCheck,
  Award
} from 'lucide-react';

interface InterviewProductShowcaseProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export interface ShowcaseTabItem {
  id: string;
  tabKey: ActiveTab;
  tabLabel: string;
  headline: string;
  description: string;
  ctaText: string;
  badge: string;
  highlights: string[];
}

export const SHOWCASE_TABS: ShowcaseTabItem[] = [
  {
    id: 'video-interview',
    tabKey: 'video-interview',
    tabLabel: 'AI Video Interview',
    headline: 'Simulate high-stakes technical video rounds with live biometric eye contact and speech AI coaching',
    description: 'Face interactive AI interviewers tailored to top tech companies. Get instant feedback on your posture, eye contact consistency, filler words, speaking cadence, and answer depth.',
    ctaText: 'Launch Video Mock Round',
    badge: 'Real-time Computer Vision & Speech',
    highlights: [
      'Live webcam eye-contact tracking & posture feedback',
      'Realistic lip-syncing AI interviewer avatar',
      'Instant post-round rubric scorecard with strengths & weaknesses',
      '15-20 questions per tier (Beginner, Medium, Hard)'
    ]
  },
  {
    id: 'coding-interview',
    tabKey: 'coding-interview',
    tabLabel: 'Live Coding Sandbox',
    headline: 'Solve LeetCode-style algorithmic challenges in a full-fledged IDE with instant test execution',
    description: 'Code solutions in TypeScript, JavaScript, Python, or Java. Run automated test suites with sub-second feedback, line-by-line linting, and automated Big-O time and space complexity audits.',
    ctaText: 'Open Coding Sandbox',
    badge: 'Automated Test Runner & AST Audit',
    highlights: [
      'Multi-language code editor with syntax highlighting',
      'Interactive test case validation with edge case fuzzing',
      'AI code optimization suggestions and hint reveals',
      'Big-O runtime & memory efficiency ranking'
    ]
  },
  {
    id: 'voice-tutor',
    tabKey: 'voice-tutor',
    tabLabel: 'Voice Tutor & Code Board',
    headline: 'Interactive AI voice mentor teaching system design and core algorithms on a dynamic whiteboard',
    description: 'Listen to step-by-step natural voice explanations while code snippets, ASCII architecture diagrams, and system design pipelines render dynamically on an interactive blackboard.',
    ctaText: 'Start Voice Tutor Session',
    badge: 'Interactive Audio & Virtual Whiteboard',
    highlights: [
      'Natural spoken voice commentary with pause & replay',
      'Interactive virtual whiteboard rendering architecture diagrams',
      'Covers Java, Python, RAG, Gen AI, SQL & Distributed Systems',
      'Self-paced interactive quiz checks after each lesson'
    ]
  },
  {
    id: 'ai-coach',
    tabKey: 'ai-coach',
    tabLabel: 'Agentic AI Masterclass',
    headline: 'Master Autonomous AI Agents with animated flowchart video lessons and live runtime execution traces',
    description: 'Watch step-by-step flowchart lessons teaching ReAct loops, multi-agent supervisor swarms, and tri-tier memory architecture with real-time video playback and copyable LangGraph code.',
    ctaText: 'Watch Flowchart Masterclass',
    badge: 'Animated Video Flowchart Engine',
    highlights: [
      'Continuous second-by-second flowchart playback with scrubber',
      'Live runtime execution console streaming agent tool calls',
      'Production LangGraph & Pydantic code architecture snippets',
      'Senior & Staff-level interview signal breakdowns'
    ]
  }
];

export const InterviewProductShowcase: React.FC<InterviewProductShowcaseProps> = ({ setActiveTab }) => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [codeRunState, setCodeRunState] = useState<'idle' | 'running' | 'passed'>('passed');

  const currentTab = SHOWCASE_TABS[activeTabIdx];

  // Auto-cycle tabs every 3 seconds (as requested: fast 3 sec per node/tab)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % SHOWCASE_TABS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" />
          <span>Interactive Simulation Suite • 3s Fast Live Transition</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Everything you need to conquer your dream tech offer.
        </h2>

        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Explore our real-time interactive interview engines, live sandbox environments, and automated coaching tools.
        </p>
      </div>

      {/* TOP TABS NAVIGATION BAR (APPSMITH-STYLE CLEAN PILL / UNDERLINE TABS) */}
      <div className="border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-8 min-w-max px-2">
          {SHOWCASE_TABS.map((tab, idx) => {
            const isActive = idx === activeTabIdx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`group relative pb-4 pt-2 text-sm sm:text-base font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'text-sky-700'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {idx === 0 && <Video className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'}`} />}
                {idx === 1 && <Code2 className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'}`} />}
                {idx === 2 && <BookOpen className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'}`} />}
                {idx === 3 && <Brain className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'}`} />}
                
                <span>{tab.tabLabel}</span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* APPSMITH-STYLE SPLIT SHOWCASE STAGE */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative text-white">
        
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* LEFT 5 COLUMNS: PUNCHY HEADLINE, BULLETS & ACTION BUTTON */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentTab.badge}</span>
            </div>

            {/* Bold Punchy Headline (Appsmith style) */}
            <h3 className="text-2xl sm:text-3xl lg:text-3.5xl font-extrabold text-white leading-tight tracking-tight">
              {currentTab.headline}
            </h3>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentTab.description}
            </p>

            {/* Feature Bullets */}
            <ul className="space-y-2.5 pt-2">
              {currentTab.highlights.map((item, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Main Action Button */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab(currentTab.tabKey)}
                className="gradient-btn px-7 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg flex items-center gap-2 group cursor-pointer hover:opacity-95 transition-all"
              >
                <span>{currentTab.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <span className="text-xs text-slate-400">
                Included with free trial (2 full sessions)
              </span>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT 7 COLUMNS: RICH INTERACTIVE SOFTWARE WINDOW        */}
          {/* ======================================================== */}
          <div className="lg:col-span-7">
            <div className="bg-[#12121d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Studio Window Titlebar */}
              <div className="bg-[#181827] px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-slate-300 hidden sm:inline">
                    InterviewAI Studio / {currentTab.tabLabel}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Live Engine Active
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono border border-white/10">
                    Gemini 3.8
                  </span>
                </div>
              </div>

              {/* DYNAMIC SCREENSHOT WORKSPACE PREVIEWS BASED ON ACTIVE TAB */}
              <div className="p-4 sm:p-6 bg-[#0a0a12] min-h-[360px] sm:min-h-[400px] flex flex-col justify-center">
                
                {/* -------------------------------------------------- */}
                {/* PREVIEW 1: AI VIDEO MOCK INTERVIEW                 */}
                {/* -------------------------------------------------- */}
                {activeTabIdx === 0 && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    {/* Top video preview split: Candidate Cam & AI Interviewer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Interviewer Box */}
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-purple-500/40 shadow-inner">
                        <img
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                          alt="AI Interviewer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                          AI Interviewer: Dr. Sarah Jenkins
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] px-2 py-1 rounded bg-black/75 backdrop-blur-md">
                          <span className="text-emerald-400 flex items-center gap-1 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Speaking...
                          </span>
                          <span className="text-slate-400">1080p HD</span>
                        </div>
                      </div>

                      {/* Candidate Box with Live Biometric Eye Contact HUD */}
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-cyan-500/40 shadow-inner">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                          alt="Candidate Cam"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-semibold text-cyan-300 border border-cyan-500/30">
                          Candidate Feed (You)
                        </div>
                        {/* Biometric Eye Overlay */}
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold flex items-center gap-1">
                          <Eye className="w-2.5 h-2.5" />
                          <span>98.4% Eye Contact</span>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] px-2 py-1 rounded bg-black/75 backdrop-blur-md font-mono">
                          <span className="text-slate-300">Pace: 138 wpm</span>
                          <span className="text-emerald-400">0 Fillers</span>
                        </div>
                      </div>

                    </div>

                    {/* Active Question Bar */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-purple-300 font-bold uppercase tracking-wider">
                        <span>Question 4 of 15 (Senior System Design)</span>
                        <span className="text-cyan-400 font-mono">Time: 01:24</span>
                      </div>
                      <p className="text-slate-100 font-medium">
                        "How would you design a distributed rate limiter that handles 100,000 req/sec across multi-region Redis clusters?"
                      </p>
                    </div>

                    {/* Live Metrics Ticker */}
                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Eye Contact</span>
                        <span className="text-emerald-400 font-bold">98%</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Confidence</span>
                        <span className="text-sky-400 font-bold">94%</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Clarity</span>
                        <span className="text-purple-400 font-bold">9.2/10</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Verdict</span>
                        <span className="text-emerald-400 font-bold">STRONG HIRE</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* PREVIEW 2: LIVE CODING & LEETCODE SANDBOX          */}
                {/* -------------------------------------------------- */}
                {activeTabIdx === 1 && (
                  <div className="space-y-3 font-mono text-xs animate-in fade-in zoom-in-95 duration-300">
                    {/* IDE Top Bar */}
                    <div className="flex items-center justify-between bg-black/60 p-2 rounded-lg border border-white/10 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-300">
                        <FileCode className="w-3.5 h-3.5 text-sky-400" />
                        <span>LRU_Cache.ts</span>
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] border border-amber-500/30">
                          Hard LeetCode #146
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setCodeRunState('running');
                          setTimeout(() => setCodeRunState('passed'), 600);
                        }}
                        className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Run Test Suite</span>
                      </button>
                    </div>

                    {/* Code Snippet */}
                    <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 text-slate-300 overflow-x-auto text-[11px] leading-relaxed shadow-inner">
                      <span className="text-slate-500">// O(1) Doubly-Linked List + HashMap implementation</span><br/>
                      <span className="text-purple-400">class</span> <span className="text-cyan-300">LRUCache</span> {'{'}<br/>
                      &nbsp;&nbsp;<span className="text-purple-400">private</span> capacity: <span className="text-amber-300">number</span>;<br/>
                      &nbsp;&nbsp;<span className="text-purple-400">private</span> map: <span className="text-cyan-300">Map</span>&lt;<span className="text-amber-300">number</span>, <span className="text-cyan-300">Node</span>&gt;;<br/>
                      &nbsp;&nbsp;<span className="text-purple-400">constructor</span>(capacity: <span className="text-amber-300">number</span>) {'{'}&nbsp;...&nbsp;{'}'}<br/>
                      &nbsp;&nbsp;<span className="text-emerald-400">get</span>(key: <span className="text-amber-300">number</span>): <span className="text-amber-300">number</span> {'{'}&nbsp;...&nbsp;{'}'}<br/>
                      &nbsp;&nbsp;<span className="text-emerald-400">put</span>(key: <span className="text-amber-300">number</span>, val: <span className="text-amber-300">number</span>): <span className="text-purple-400">void</span> {'{'}&nbsp;...&nbsp;{'}'}<br/>
                      {'}'}
                    </div>

                    {/* Test Results Output */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/10">
                        <span className="flex items-center gap-1.5 font-bold text-slate-200">
                          <Terminal className="w-3 h-3 text-emerald-400" />
                          Test Execution Console
                        </span>
                        <span className="text-emerald-400 font-bold">
                          {codeRunState === 'running' ? '⏳ Executing tests...' : '✔ 3 / 3 Test Cases Passed'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-emerald-400 flex items-center justify-between">
                          <span>✔ Case 1: get(1) returns 1</span>
                          <span className="text-slate-400">3.2ms</span>
                        </div>
                        <div className="text-emerald-400 flex items-center justify-between">
                          <span>✔ Case 2: put(3, 3) evicts LRU key 2</span>
                          <span className="text-slate-400">4.1ms</span>
                        </div>
                        <div className="text-emerald-400 flex items-center justify-between">
                          <span>✔ Case 3: get(2) returns -1 (Evicted)</span>
                          <span className="text-slate-400">2.8ms</span>
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
                        <span>⚡ Runtime: 10ms (Beats 98.4%)</span>
                        <span>💾 Memory: 41.2 MB (Beats 94.1%)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* PREVIEW 3: VOICE TUTOR & VIRTUAL BOARD             */}
                {/* -------------------------------------------------- */}
                {activeTabIdx === 2 && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    {/* Voice Tutor Header Bar */}
                    <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-xl border border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-sky-400 animate-pulse" />
                        <span className="font-bold text-white">Coach Alex: RAG & Hybrid Retrieval</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        Speaking Lesson 3
                      </div>
                    </div>

                    {/* Virtual Whiteboard Architecture Canvas */}
                    <div className="p-4 rounded-xl bg-black/85 border border-white/10 font-mono text-[10px] sm:text-[11px] text-emerald-300 leading-relaxed shadow-inner overflow-x-auto">
                      <div className="text-slate-400 mb-2">// Dynamic Virtual Whiteboard Diagram: Hybrid RAG Pipeline</div>
                      <pre className="text-slate-200">
{`[User Query] ──► [Query Rewriter] ──┬─► [Dense Vector DB: HNSW Cosine] ──┐
                                     └─► [Sparse Index: BM25 Keywords]  ──┴─► [Cross-Encoder Reranker]
                                                                                       │
                                                                                       ▼
[Grounded LLM Generation] ◄── [Context Window Injection: Top-4 Chunks] ◄────────────────┘`}
                      </pre>
                    </div>

                    {/* Spoken Narration Subtitle */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 leading-relaxed flex items-start gap-2">
                      <Volume2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <p>
                        "In production RAG systems, never rely solely on dense embeddings for exact acronyms or part numbers. Always interleave dense semantic search with BM25 lexical keyword matching."
                      </p>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* PREVIEW 4: AGENTIC AI MASTERCLASS FLOWCHART        */}
                {/* -------------------------------------------------- */}
                {activeTabIdx === 3 && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    {/* Video Masterclass Header */}
                    <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-xl border border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
                        <span className="font-bold text-white">Track 1: Single-Agent ReAct Cognitive Loop</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                        Node 3 of 7 Active
                      </span>
                    </div>

                    {/* Animated Flowchart Nodes */}
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-emerald-500/40 text-slate-200">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                          ✔
                        </span>
                        <span className="text-[10px] font-bold block">1. User Goal</span>
                        <span className="text-[9px] text-slate-400">Ingress</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/5 border border-emerald-500/40 text-slate-200">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                          ✔
                        </span>
                        <span className="text-[10px] font-bold block">2. Perception</span>
                        <span className="text-[9px] text-slate-400">Context</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-purple-950/80 border-2 border-purple-400 text-white shadow-lg shadow-purple-600/40 animate-pulse scale-105">
                        <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                          3
                        </span>
                        <span className="text-[10px] font-bold block">3. ReAct Thought</span>
                        <span className="text-[9px] text-purple-300">Active</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400">
                        <span className="w-5 h-5 rounded-full bg-white/10 text-slate-400 text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                          4
                        </span>
                        <span className="text-[10px] font-bold block">4. Tool Action</span>
                        <span className="text-[9px] text-slate-500">API Call</span>
                      </div>
                    </div>

                    {/* Runtime Execution Console */}
                    <div className="p-3 rounded-xl bg-black/85 border border-white/10 font-mono text-[10px] text-slate-300 space-y-1">
                      <div className="text-purple-300 font-bold border-b border-white/10 pb-1 mb-1">
                        › Agent State Log: Step 3 (Reasoning Phase)
                      </div>
                      <div className="text-slate-300">
                        [00:32] 🧠 Thought: "Must invoke SEC 10-Q filing tool to compute YoY revenue growth"
                      </div>
                      <div className="text-cyan-300">
                        [00:35] ⚡ Emitting Tool Call: `fetch_earnings(ticker='AAPL', quarter='Q3')`
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Workspace Status Bar */}
              <div className="bg-[#141422] px-4 py-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Full Stack Simulation Engine • Unlimited Practice
                </span>
                <button
                  onClick={() => setActiveTab(currentTab.tabKey)}
                  className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Open {currentTab.tabLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

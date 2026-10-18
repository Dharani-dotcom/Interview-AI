import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Sparkles,
  Brain,
  Layers,
  Cpu,
  Terminal,
  Code2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  MessageSquare,
  HelpCircle,
  Eye,
  Activity,
  Zap,
  BookmarkCheck,
  RefreshCw,
  Maximize2,
  Minimize2,
  Video,
  FastForward,
  Rewind,
  Radio,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { InterviewerAvatar, INTERVIEWER_PERSONAS } from './InterviewerAvatar';
import { NeatRomanText } from '../lib/neatText';

export interface FlowchartNode {
  id: string;
  label: string;
  sublabel: string;
  role: string;
  iconType: 'user' | 'brain' | 'tool' | 'memory' | 'check' | 'loop' | 'shield' | 'eye';
  status: 'idle' | 'active' | 'completed';
  narratorText: string;
  architectureDetails: string;
  durationSeconds: number; // Duration of this node in the video timeline
  executionLogs: string[];
  codeSnippet: {
    language: string;
    code: string;
  };
  interviewTip: string;
  commonMistake: string;
}

export interface CoachTrack {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  totalDurationFormatted: string;
  description: string;
  nodes: FlowchartNode[];
  quizQuestions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

export const COACH_TRACKS: CoachTrack[] = [
  {
    id: 'single-react-loop',
    title: 'Track 1: Single-Agent ReAct Loop',
    subtitle: 'Perception -> Reasoning (Thought) -> Tool Calling (Action) -> Environment Feedback',
    badge: 'Fundamental',
    totalDurationFormatted: '01:45',
    description: 'Master the foundational Thought-Action-Observation cognitive loop that powers autonomous AI agents.',
    nodes: [
      {
        id: 'input',
        label: '1. User Goal / Task Prompt',
        sublabel: 'Ingress & Intent',
        role: 'High-level objective provided by the user',
        iconType: 'user',
        status: 'idle',
        durationSeconds: 15,
        executionLogs: [
          '📥 [00:01] Ingress User Prompt received into agent orchestrator queue',
          '🔒 [00:03] Running prompt injection & toxicity guardrails: PASSED',
          '📋 [00:05] Initializing agent state object with user goal and system prompt'
        ],
        narratorText: 'Every agent starts with an ingress goal. The user specifies what needs to be achieved, such as researching a market, fixing a code bug, or booking a flight.',
        architectureDetails: 'The input is ingested into the agent state machine alongside system instructions, role personas, and available tool schema declarations.',
        codeSnippet: {
          language: 'python',
          code: `# Ingress User Prompt & State Initialization
initial_state = {
    "messages": [HumanMessage(content="Analyze Apple Q3 earnings and calculate YoY growth.")],
    "iteration_count": 0,
    "tool_history": []
}`
        },
        interviewTip: 'Senior engineers ensure input sanitization and guardrails check for prompt injection before triggering the agent loop.',
        commonMistake: 'Passing untrusted user input directly to shell or database execution tools without validation.'
      },
      {
        id: 'perception',
        label: '2. Perception & Context Assembly',
        sublabel: 'Token Budget & Memory',
        role: 'Assembles working context, episodic history, and active tool schemas',
        iconType: 'eye',
        status: 'idle',
        durationSeconds: 15,
        executionLogs: [
          '🔍 [00:16] Retrieving relevant past session history from vector store',
          '📐 [00:18] Computing token budget: 1,420 tokens used of 128k context window',
          '🧰 [00:20] Binding 6 authorized JSON tool schemas to LLM inference client'
        ],
        narratorText: 'The perception layer compiles the active context: recent chat history, relevant long-term memory retrieved from a vector database, and the exact JSON schemas of allowed tools.',
        architectureDetails: 'Enforces context window token budgeting, sliding window pruning, and dynamic tool selection so the LLM is not cognitively overloaded.',
        codeSnippet: {
          language: 'python',
          code: `# Dynamic Tool & Context Assembly
tools = [fetch_earnings_report, financial_calculator]
llm_with_tools = model.bind_tools(tools)`
        },
        interviewTip: 'Explain how passing too many tools (50+) degrades tool-selection accuracy; highlight two-stage semantic tool retrieval.',
        commonMistake: 'Stuffing thousands of tokens of raw tool history into every turn, causing context overflow and quadratic token cost.'
      },
      {
        id: 'reasoning',
        label: '3. LLM Core Reasoning (Thought)',
        sublabel: 'ReAct Brain / Decision',
        role: 'Predicts internal thought and determines whether a tool is required',
        iconType: 'brain',
        status: 'idle',
        durationSeconds: 16,
        executionLogs: [
          '🧠 [00:32] LLM Inference: temperature=0.1, thinking tokens active',
          '💡 [00:34] Thought: "I need to retrieve Apple 10-Q filing before computing YoY numbers"',
          '⚙️ [00:37] Decision: Emit JSON tool_call `fetch_earnings_report(ticker=\'AAPL\', quarter=\'Q3\')`'
        ],
        narratorText: 'The LLM formulates a Thought. It evaluates current progress toward the goal and either decides to call an external tool with arguments, or produce the final response.',
        architectureDetails: 'Uses low temperature (0.0 - 0.2) and grammar-constrained decoding to output valid tool_call objects matching the tool schema.',
        codeSnippet: {
          language: 'python',
          code: `# ReAct Thought Formulation
response = llm_with_tools.invoke(state["messages"])
# If response.tool_calls exists, route to Tool Executor
if response.tool_calls:
    return {"action": "execute_tool", "calls": response.tool_calls}`
        },
        interviewTip: 'Highlight why temperature should be near zero for deterministic reasoning and schema adherence.',
        commonMistake: 'Allowing the LLM to guess math or sorting in natural language instead of routing to deterministic code tools.'
      },
      {
        id: 'tools',
        label: '4. Tool Execution (Action)',
        sublabel: 'APIs, Web, SQL & Code',
        role: 'Runtime executes external tools in safe isolated environments',
        iconType: 'tool',
        status: 'idle',
        durationSeconds: 16,
        executionLogs: [
          '⚡ [00:48] Dispatching tool call to isolated gVisor sandbox container',
          '🌐 [00:50] Executing SEC EDGAR REST API request for AAPL 10-Q',
          '📦 [00:53] Received 200 OK: Revenue $81.8B, Net Income $19.9B (28ms latency)'
        ],
        narratorText: 'The runtime intercepts the tool_call, executes the real API, database query, or sandboxed Python script, and captures the raw environmental output.',
        architectureDetails: 'The host application executes the function on behalf of the model. Employs async parallel execution (Promise.all/asyncio.gather) when multiple calls are returned.',
        codeSnippet: {
          language: 'python',
          code: `# Tool Executor Node
def call_tools(state):
    tool_calls = state["messages"][-1].tool_calls
    results = []
    for call in tool_calls:
        res = tool_registry[call["name"]].invoke(call["args"])
        results.append(ToolMessage(content=str(res), tool_call_id=call["id"]))
    return {"messages": results}`
        },
        interviewTip: 'Emphasize sandboxing: code execution tools must run inside gVisor, WebAssembly, or ephemeral containers with strict timeouts.',
        commonMistake: 'Running tool executions directly on the main host server thread without time limits, freezing the event loop.'
      },
      {
        id: 'observation',
        label: '5. Observation & State Ingestion',
        sublabel: 'Feedback & Payload Truncation',
        role: 'Parses tool outputs and injects them back into the agent conversation',
        iconType: 'check',
        status: 'idle',
        durationSeconds: 14,
        executionLogs: [
          '📊 [01:04] Tool payload received: 4.8 KB structured JSON',
          '✂️ [01:06] Applying sliding window compaction: truncated redundant header metadata',
          '📥 [01:08] Appending ToolMessage payload back into active conversation state'
        ],
        narratorText: 'The observation is appended to the agent state. Raw tool outputs are sanitized and summarized to keep the context window lean.',
        architectureDetails: 'Transforms massive 500-line JSON outputs into concise key-value summaries to preserve token budgets.',
        codeSnippet: {
          language: 'python',
          code: `# Ingesting Observation into State
state["messages"].append(tool_output)
state["iteration_count"] += 1`
        },
        interviewTip: 'Discuss truncating high-volume API responses to prevent context bloat.',
        commonMistake: 'Dumping 1MB raw HTML or SQL outputs into the message stream, wasting tokens.'
      },
      {
        id: 'reflection',
        label: '6. Self-Reflection & Termination Check',
        sublabel: 'Guardrail & Convergence',
        role: 'Checks whether goal is satisfied or if another loop iteration is needed',
        iconType: 'loop',
        status: 'idle',
        durationSeconds: 15,
        executionLogs: [
          '🔄 [01:19] Evaluating convergence condition: iteration 1 of max 10',
          '🔍 [01:21] Verifying all sub-goals: Revenue and YoY growth computed',
          '✅ [01:23] Halting criteria satisfied: routed to final synthesis delivery'
        ],
        narratorText: 'The agent evaluates if the user goal has been accomplished. If more information is needed, it loops back to step 3. If finished, it outputs the final verified answer.',
        architectureDetails: 'Monitors iteration counts against max_iterations (e.g. 10) and checks action hashes to terminate infinite loops early.',
        codeSnippet: {
          language: 'python',
          code: `# Conditional Routing in LangGraph
def should_continue(state):
    if state["iteration_count"] >= 10:
        return "end" # Guardrail against infinite loops
    last_msg = state["messages"][-1]
    if last_msg.tool_calls:
        return "tools"
    return "end"`
        },
        interviewTip: 'Always mention setting hard max_iterations and action deduplication to prevent runaway billing loops.',
        commonMistake: 'Omitting iteration caps, letting an agent burn thousands of dollars in an infinite failure loop.'
      },
      {
        id: 'final',
        label: '7. Final Verified Delivery',
        sublabel: 'Synthesized Solution',
        role: 'Delivers grounded, accurate response with citations to user',
        iconType: 'shield',
        status: 'idle',
        durationSeconds: 14,
        executionLogs: [
          '✨ [01:34] Formatting final synthesized markdown output with source citations',
          '🛡️ [01:36] Final security scan: zero hallucinated financial figures detected',
          '🚀 [01:38] Emitted final streaming response to client UI (Task COMPLETED)'
        ],
        narratorText: 'The final answer is synthesized with evidence from all tool observations, verified against safety guardrails, and delivered to the user.',
        architectureDetails: 'Includes citations, confidence scores, and structured JSON outputs ready for UI display.',
        codeSnippet: {
          language: 'python',
          code: `# Final Answer Output
return {"final_response": response.content, "status": "COMPLETED"}`
        },
        interviewTip: 'Mention formatting citations and linking back to the exact tool sources.',
        commonMistake: 'Letting the agent output un-cited claims that cannot be traced to observations.'
      }
    ],
    quizQuestions: [
      {
        question: 'What are the three core phases of the ReAct prompting framework?',
        options: [
          'Request, Response, Retry',
          'Thought (Reasoning), Action (Tool Call), Observation (Environment Feedback)',
          'Prompt, Embed, Retrieve',
          'Tokenize, Attend, Sample'
        ],
        correctIndex: 1,
        explanation: 'ReAct interleaves internal reasoning (Thought) with external tool calls (Action) and environmental results (Observation) to systematically solve problems.'
      },
      {
        question: 'Why should you set an explicit max_iterations limit on autonomous agent loops?',
        options: [
          'To speed up GPU compilation',
          'To prevent runaway infinite execution loops and unexpected token billing costs',
          'Because LLMs cannot run more than 3 steps',
          'To force the agent to use higher temperature'
        ],
        correctIndex: 1,
        explanation: 'Without a hard iteration cap, an agent encountering ambiguous queries or failing tools can loop endlessly, consuming massive token budgets.'
      }
    ]
  },
  {
    id: 'multi-agent-supervisor',
    title: 'Track 2: Multi-Agent Supervisor & Swarms',
    subtitle: 'Hierarchical Orchestrator -> Specialist Workers -> State Synthesis -> Human-in-the-Loop',
    badge: 'Advanced',
    totalDurationFormatted: '01:40',
    description: 'Learn how to coordinate teams of specialized agents with supervisor delegation and human review.',
    nodes: [
      {
        id: 'supervisor',
        label: '1. Chief Supervisor / Router Agent',
        sublabel: 'Meta-Controller & Orchestrator',
        role: 'Analyzes global task, delegates to specialists, and synthesizes output',
        iconType: 'brain',
        status: 'idle',
        durationSeconds: 20,
        executionLogs: [
          '👔 [00:01] Supervisor initialized: analyzing multi-faceted enterprise prompt',
          '📋 [00:05] Decomposing task into sub-tasks: [1: Market Research, 2: Script Implementation]',
          '👉 [00:10] Routing sub-task 1 to Specialist Researcher Node'
        ],
        narratorText: 'The Supervisor acts as engineering team lead: it breaks down the goal, delegates sub-tasks to specialized worker agents, and coordinates state synthesis.',
        architectureDetails: 'Uses structured routing (e.g. NextAction: "RESEARCH" | "CODE" | "AUDIT" | "FINISH") to pass execution control across specialized worker nodes.',
        codeSnippet: {
          language: 'python',
          code: `# Supervisor Routing Logic
class RouterOutput(BaseModel):
    next_worker: Literal["researcher", "coder", "auditor", "FINISH"]
    instructions: str

supervisor_prompt = "You are team lead. Choose which specialist should act next."`
        },
        interviewTip: 'Explain why the Supervisor Pattern avoids exponential N^2 communication chaos of decentralized swarms.',
        commonMistake: 'Allowing all worker agents to message all other agents simultaneously, polluting context windows.'
      },
      {
        id: 'researcher',
        label: '2. Specialist Researcher Agent',
        sublabel: 'Information Gathering',
        role: 'Queries Vector DBs, web APIs, and documentation',
        iconType: 'eye',
        status: 'idle',
        durationSeconds: 20,
        executionLogs: [
          '🔎 [00:22] Researcher activated with specialized search tools',
          '🌐 [00:28] Scraped 4 competitor whitepapers and summarized key metrics',
          '📤 [00:35] Appending distilled bullet points to shared blackboard state'
        ],
        narratorText: 'The Researcher agent has dedicated search and retrieval tools. It works in an isolated context, returning concise factual findings to the shared state.',
        architectureDetails: 'Has its own focused prompt and specialized tools (Tavily search, Arxiv API, internal Docs) with zero coding tools.',
        codeSnippet: {
          language: 'python',
          code: `# Researcher Specialist Node
researcher_tools = [web_search, query_vector_store]
researcher_agent = create_react_agent(model, researcher_tools)`
        },
        interviewTip: 'Isolating specialist tools prevents cognitive overload and tool hallucinations.',
        commonMistake: 'Giving the researcher code execution tools that distract it from research.'
      },
      {
        id: 'coder',
        label: '3. Specialist Developer Agent',
        sublabel: 'Code Generation & Execution',
        role: 'Writes, executes, and unit tests code in isolated sandboxes',
        iconType: 'tool',
        status: 'idle',
        durationSeconds: 20,
        executionLogs: [
          '💻 [00:42] Coder agent ingested research requirements',
          '📝 [00:48] Synthesized TypeScript client module with unit tests',
          '🧪 [00:54] Executed pytest in sandbox: 4 tests PASSED (0 failures)'
        ],
        narratorText: 'The Coder agent receives specifications from the supervisor and researcher findings, writes modular code, and executes unit tests in a secure sandbox.',
        architectureDetails: 'Equipped with AST parsing, code execution sandboxes, and file system tools.',
        codeSnippet: {
          language: 'python',
          code: `# Coder Specialist Node
coder_tools = [python_repl, write_file, run_pytest]
coder_agent = create_react_agent(model, coder_tools)`
        },
        interviewTip: 'Emphasize that the coder should verify code via unit tests before returning results to supervisor.',
        commonMistake: 'Returning un-tested code with syntax errors directly to the end user.'
      },
      {
        id: 'critic',
        label: '4. Security & QA Critic Agent',
        sublabel: 'Red Team / Verifier',
        role: 'Adversarial audit for security flaws, edge cases, and hallucinations',
        iconType: 'shield',
        status: 'idle',
        durationSeconds: 20,
        executionLogs: [
          '🛡️ [01:03] Critic Node triggered for adversarial code audit',
          '⚠️ [01:09] Flagged potential SQL injection vulnerability in raw parameter string',
          '🔧 [01:15] Forced patch: sanitized parameter using prepared statements'
        ],
        narratorText: 'The Critic acts as an adversarial auditor: it checks for vulnerabilities, edge cases, memory leaks, and fact-checks citations before release.',
        architectureDetails: 'Uses contrastive prompts instructing the model to find flaws rather than defend decisions, overcoming confirmation bias.',
        codeSnippet: {
          language: 'python',
          code: `# Critic Node with Verification Rubric
critic_prompt = "Audit this implementation for OWASP security flaws, edge cases, and compliance."`
        },
        interviewTip: 'Multi-agent debate (Proposer vs Critic) significantly reduces hallucinations compared to single-agent self-review.',
        commonMistake: 'Skipping the critic node to save tokens, allowing hallucinations into production.'
      },
      {
        id: 'hitl',
        label: '5. Human-in-the-Loop Approval',
        sublabel: 'Breakpoint & Authorize',
        role: 'Pauses workflow before high-stakes mutations (deployments, payments)',
        iconType: 'user',
        status: 'idle',
        durationSeconds: 20,
        executionLogs: [
          '🛑 [01:23] Breakpoint reached: mutating production database schema',
          '📱 [01:28] Emitted Webhook notification to engineering admin',
          '✅ [01:34] Human Admin clicked APPROVE in dashboard: execution completed'
        ],
        narratorText: 'Before executing irreversible mutations like database changes or financial wire transfers, the system pauses at a breakpoint for human authorization.',
        architectureDetails: 'Uses LangGraph checkpointer interrupts to serialize state to database, awaiting approval webhook or UI button click.',
        codeSnippet: {
          language: 'python',
          code: `# LangGraph Breakpoint Interrupt
workflow.compile(checkpointer=memory, interrupt_before=["deploy_action"])`
        },
        interviewTip: 'Explain how durable execution (Temporal / LangGraph) allows an agent to sleep for days awaiting approval without consuming RAM.',
        commonMistake: 'Allowing agents autonomous write permissions to production databases without human gatekeeping.'
      }
    ],
    quizQuestions: [
      {
        question: 'Why is the Supervisor Pattern preferred over decentralized peer-to-peer swarms for enterprise tasks?',
        options: [
          'It is cheaper because it uses no LLMs',
          'It centralizes decision-making, prevents circular messaging deadlocks, and keeps worker contexts clean',
          'It requires no code',
          'It only runs on single threads'
        ],
        correctIndex: 1,
        explanation: 'Centralized supervisor orchestration prevents decentralized livelocks, provides clear audit trails, and isolates token contexts.'
      }
    ]
  },
  {
    id: 'agentic-memory-arch',
    title: 'Track 3: Tri-Tier Memory Architecture',
    subtitle: 'Working Memory (Context) -> Semantic Memory (Vector DB) -> Episodic Memory (Experiences)',
    badge: 'Deep Tech',
    totalDurationFormatted: '01:20',
    description: 'Design robust memory architectures that allow agents to learn from past trajectories and remember across sessions.',
    nodes: [
      {
        id: 'working',
        label: '1. Working Memory (Active Context)',
        sublabel: 'Token Context Window',
        role: 'Active conversation, current scratchpad, and immediate tool feedback',
        iconType: 'brain',
        status: 'idle',
        durationSeconds: 20,
        executionLogs: [
          '⚡ [00:01] Ingesting short-term conversational scratchpad into active prompt',
          '✂️ [00:08] Applying token eviction policy: pruned turns 1-3 to prevent context overflow',
          '📌 [00:15] Active scratchpad: tracking 4 open variables for immediate execution'
        ],
        narratorText: 'Working memory lives directly in the active LLM context window. It stores immediate scratchpad thoughts, active tool calls, and recent user exchanges.',
        architectureDetails: 'Subject to hard token limits. Managed via sliding-window pruning and compaction.',
        codeSnippet: {
          language: 'python',
          code: `# Working Memory State
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    scratchpad: str`
        },
        interviewTip: 'Explain that working memory is transient and disappears when the process terminates unless check-pointed.',
        commonMistake: 'Treating the context window as a database and stuffing it with unbounded historical logs.'
      },
      {
        id: 'semantic',
        label: '2. Semantic Memory (Knowledge Store)',
        sublabel: 'Vector DB & Hybrid Search',
        role: 'Stores domain facts, APIs, enterprise documentation, and schemas',
        iconType: 'memory',
        status: 'idle',
        durationSeconds: 20,
        executionLogs: [
          '📚 [00:23] Vector database query: generating 1536-dim dense text-embedding-3',
          '🔍 [00:29] Executing Hybrid Search: 70% dense cosine similarity + 30% BM25 keyword matching',
          '✅ [00:36] Retrieved top 3 authoritative enterprise policy chunks'
        ],
        narratorText: 'Semantic memory stores factual knowledge and technical documentation in vector databases like Pinecone or Chroma, retrieved via dense embeddings.',
        architectureDetails: 'Chunked and indexed via HNSW algorithms with metadata filtering.',
        codeSnippet: {
          language: 'python',
          code: `# Semantic Memory Retrieval
retriever = vector_store.as_retriever(search_kwargs={"k": 4})
relevant_docs = retriever.invoke(current_query)`
        },
        interviewTip: 'Explain Hybrid Search (Dense Vectors + BM25) for combining semantic meaning with exact keyword matching.',
        commonMistake: 'Relying exclusively on dense vectors for exact part numbers, acronyms, or SKU codes.'
      },
      {
        id: 'episodic',
        label: '3. Episodic Memory (Experience Trajectories)',
        sublabel: 'Past Successes & Failures',
        role: 'Indexes past task trajectories and user corrections for few-shot guidance',
        iconType: 'check',
        status: 'idle',
        durationSeconds: 20,
        executionLogs: [
          '🕰️ [00:43] Checking past episodic trajectory logs for similar task hashes',
          '💡 [00:49] Found prior run from 3 days ago: "User rejected tool A, preferred tool B"',
          '🎯 [00:55] Injected dynamic few-shot correction to prevent repeating past failure'
        ],
        narratorText: 'Episodic memory records past successful and failed task trajectories. When facing a new problem, the agent retrieves how it solved a similar problem in the past.',
        architectureDetails: 'Summarizes completed runs into (Goal, Plan, Reflection, Verdict) tuples, embedded and queried before new tasks.',
        codeSnippet: {
          language: 'python',
          code: `# Storing Experience in Episodic Store
episodic_db.add({
    "goal": task_goal,
    "trajectory": summary_of_steps,
    "outcome": "SUCCESS",
    "learnings": "Used tool X instead of Y for 3x speedup."
})`
        },
        interviewTip: 'Reflexion agents use episodic memory to learn from prior mistakes without fine-tuning model weights.',
        commonMistake: 'Repeating identical failed attempts because the agent has no memory of prior trials.'
      },
      {
        id: 'procedural',
        label: '4. Procedural Memory (Reusable Skills)',
        sublabel: 'Automated Tool Scripts',
        role: 'Library of compiled code routines that execute without re-reasoning',
        iconType: 'tool',
        status: 'idle',
        durationSeconds: 20,
        executionLogs: [
          '📦 [01:03] Loading procedural skill library: voyager_skills_v2',
          '⚡ [01:09] Executing pre-compiled Python script `deploy_k8s_cluster()` directly',
          '🚀 [01:16] Saved 1,200 LLM reasoning tokens by executing proven procedural routine'
        ],
        narratorText: 'Procedural memory stores proven, automated code templates and tool scripts that the agent can execute directly without wasting reasoning tokens.',
        architectureDetails: 'Voyager (Minecraft agent) pioneered procedural skill libraries: agents write Python functions for learned skills and store them in a skill library.',
        codeSnippet: {
          language: 'python',
          code: `# Procedural Skill Library
def deploy_to_staging(artifact_path):
    # Reusable procedural script
    docker_build(artifact_path)
    k8s_apply("staging")`
        },
        interviewTip: 'Mention Voyager (Wang et al., 2023) as the premier example of procedural skill acquisition in agents.',
        commonMistake: 'Re-inventing simple deterministic workflows from scratch in natural language on every run.'
      }
    ],
    quizQuestions: [
      {
        question: 'Which tier of agent memory stores personal past task trajectories and historical user corrections?',
        options: [
          'Episodic Memory',
          'Semantic Memory',
          'L1 CPU Cache',
          'Procedural Memory'
        ],
        correctIndex: 0,
        explanation: 'Episodic memory stores chronological personal experiences and past task trajectories, allowing agents to retrieve past successes and failures.'
      }
    ]
  }
];

interface AICoachProps {
  onVerifyUsage?: () => boolean;
}

export const AICoach: React.FC<AICoachProps> = ({ onVerifyUsage }) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const currentTrack = COACH_TRACKS[selectedTrackIndex] || COACH_TRACKS[0];

  // Video playback timing states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoLayout, setVideoLayout] = useState<'split' | 'cinema' | 'pip'>('split');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Inspector and tabs state
  const [activeTab, setActiveTab] = useState<'inspector' | 'code' | 'logs' | 'quiz'>('inspector');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: "👋 Welcome to the AI Coach Masterclass! I'm Dr. Sarah Jenkins, Principal AI Agent Architect. Press the big 'Play Flowchart Video' button above to watch this interactive lesson with real-time video flowcharts, audio commentary, and live code traces!"
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<any>(null);
  const lastSpokenNodeIndexRef = useRef<number>(-1);

  // Simulation Pace Mode: 3s fast node transition (default), 8s normal, or 15s deep dive
  const [nodeSpeedMode, setNodeSpeedMode] = useState<'3s' | '8s' | '15s'>('3s');

  const getNodeDuration = (node: any) => {
    if (nodeSpeedMode === '3s') return 3;
    if (nodeSpeedMode === '8s') return 8;
    return node.durationSeconds || 15;
  };

  // Calculate total seconds for current track
  const totalTrackSeconds = useMemo(() => {
    return currentTrack.nodes.reduce((acc, node) => acc + getNodeDuration(node), 0);
  }, [currentTrack, nodeSpeedMode]);

  // Calculate which node is active based on currentSeconds
  const activeNodeIndex = useMemo(() => {
    let accumulated = 0;
    for (let i = 0; i < currentTrack.nodes.length; i++) {
      accumulated += getNodeDuration(currentTrack.nodes[i]);
      if (currentSeconds < accumulated) {
        return i;
      }
    }
    return Math.max(0, currentTrack.nodes.length - 1);
  }, [currentSeconds, currentTrack, nodeSpeedMode]);

  const activeNode = currentTrack.nodes[activeNodeIndex] || currentTrack.nodes[0];

  // Calculate start and end seconds for each node
  const nodeTimeWindows = useMemo(() => {
    let start = 0;
    return currentTrack.nodes.map(node => {
      const dur = getNodeDuration(node);
      const window = { start, end: start + dur, duration: dur };
      start += dur;
      return window;
    });
  }, [currentTrack, nodeSpeedMode]);

  // Speech synthesis safe helper
  const speakNarration = (text: string) => {
    if (!audioEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utteranceText = nodeSpeedMode === '3s'
        ? `${activeNode.label}: ${activeNode.narratorText.split('.')[0]}`
        : text;
      const utterance = new SpeechSynthesisUtterance(utteranceText);
      utterance.rate = nodeSpeedMode === '3s' ? 1.25 : Math.min(1.5, Math.max(0.8, playbackSpeed));
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(
        v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Female'))
      ) || voices[0];
      if (naturalVoice) utterance.voice = naturalVoice;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // Speech failed gracefully without breaking video playback
    }
  };

  // High-frequency playback timer (ticks every 100ms for ultra-smooth video & scrubber motion!)
  useEffect(() => {
    if (isPlaying) {
      // Check if we started at the end, restart
      if (currentSeconds >= totalTrackSeconds) {
        setCurrentSeconds(0);
        lastSpokenNodeIndexRef.current = -1;
      }

      intervalRef.current = setInterval(() => {
        setCurrentSeconds(prev => {
          const next = prev + 0.1 * playbackSpeed;
          if (next >= totalTrackSeconds) {
            setIsPlaying(false);
            return totalTrackSeconds;
          }
          return next;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playbackSpeed, totalTrackSeconds]);

  // Trigger audio narration whenever activeNodeIndex changes during playback
  useEffect(() => {
    if (isPlaying && activeNodeIndex !== lastSpokenNodeIndexRef.current) {
      lastSpokenNodeIndexRef.current = activeNodeIndex;
      speakNarration(activeNode.narratorText);
    }
  }, [activeNodeIndex, isPlaying]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (onVerifyUsage && !isPlaying && currentSeconds === 0) {
      const allowed = onVerifyUsage();
      if (!allowed) return;
    }

    if (!isPlaying && currentSeconds >= totalTrackSeconds) {
      setCurrentSeconds(0);
      lastSpokenNodeIndexRef.current = -1;
    }

    if (!isPlaying) {
      lastSpokenNodeIndexRef.current = activeNodeIndex;
      speakNarration(activeNode.narratorText);
    }

    setIsPlaying(!isPlaying);
  };

  // Jump to specific node
  const handleJumpToNode = (index: number) => {
    const targetStart = nodeTimeWindows[index]?.start ?? 0;
    setCurrentSeconds(targetStart + 0.1);
    lastSpokenNodeIndexRef.current = index;
    if (isPlaying || audioEnabled) {
      speakNarration(currentTrack.nodes[index].narratorText);
    }
  };

  // Timeline scrubber click
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newSeconds = ratio * totalTrackSeconds;
    setCurrentSeconds(newSeconds);
  };

  // Step 5 seconds backward/forward
  const handleStepTime = (delta: number) => {
    setCurrentSeconds(prev => Math.max(0, Math.min(totalTrackSeconds, prev + delta)));
  };

  // Reset to start
  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentSeconds(0);
    lastSpokenNodeIndexRef.current = -1;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Helper formatting mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Chat with AI Coach
  const handleSendChat = async (questionText?: string) => {
    const textToSend = questionText || chatInput;
    if (!textToSend.trim() || isChatLoading) return;

    const userMsg = { sender: 'user' as const, text: textToSend };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/gemini/agent-coach-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: chatMessages.slice(-6),
          currentTrackId: currentTrack.title,
          currentNodeId: activeNode.label
        })
      });
      const data = await res.json();
      setChatMessages(prev => [
        ...prev,
        { sender: 'ai', text: data.reply || 'Great question! In agent architectures, state isolation and guardrails are paramount.' }
      ]);
    } catch (err: any) {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `In agentic design: always interleave Thought, Action, and Observation. For production systems, remember to implement hard iteration caps and track action-observation hashes to prevent infinite tool loops!`
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const progressPercent = totalTrackSeconds > 0 ? (currentSeconds / totalTrackSeconds) * 100 : 0;

  // Selected persona for instructor webcam
  const instructorPersona = INTERVIEWER_PERSONAS[0];

  return (
    <div className="min-h-screen bg-[#07070c] text-slate-100 py-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER & TRACK SELECTOR */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5 shadow-sm shadow-purple-500/20">
                <Video className="w-3.5 h-3.5 text-purple-400" />
                Masterclass Video Simulator
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 shadow-sm shadow-cyan-500/20">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Live Animated Flowchart Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
              AI Coach: Autonomous AI Agents Video Masterclass
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Watch interactive video-style lessons teaching autonomous AI agents, ReAct loops, multi-agent swarms, and tri-tier memory with live animated flowcharts and audio commentary.
            </p>
          </div>

          {/* Track Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {COACH_TRACKS.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => {
                  setSelectedTrackIndex(idx);
                  setCurrentSeconds(0);
                  setIsPlaying(false);
                  lastSpokenNodeIndexRef.current = -1;
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                  selectedTrackIndex === idx
                    ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/40 scale-102'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 text-purple-300" />
                <span>{track.title.split(':')[0]}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-purple-200 border border-white/10">
                  {track.totalDurationFormatted}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MASTERCLASS VIDEO PLAYER & FLOWCHART THEATER CANVAS         */}
        {/* ============================================================ */}
        <div
          ref={videoContainerRef}
          className={`bg-[#0d0d16] border border-white/15 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-black' : ''
          }`}
        >
          {/* Top Video Broadcast Bar */}
          <div className="bg-[#141422] px-4 sm:px-6 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Title & Live Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-bold tracking-wider uppercase text-[10px]">
                <span className={`w-2 h-2 rounded-full bg-red-500 ${isPlaying ? 'animate-ping' : ''}`} />
                {isPlaying ? '● LIVE PLAYING' : '❚❚ PAUSED'}
              </div>

              <div className="hidden sm:block">
                <span className="font-bold text-white text-sm">{currentTrack.title}</span>
                <span className="text-slate-400 ml-2 font-mono text-[11px]">
                  Step {activeNodeIndex + 1} of {currentTrack.nodes.length}: <strong className="text-purple-300">{activeNode.label}</strong>
                </span>
              </div>
            </div>

            {/* Video Layout Mode & Resolution Badge */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 text-[10px] font-mono border border-white/10 hidden md:inline">
                1080p 60fps HD
              </span>

              {/* Layout Switcher */}
              <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/10 text-[11px]">
                <button
                  onClick={() => setVideoLayout('split')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    videoLayout === 'split' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Split view (Flowchart + Presenter Webcam)"
                >
                  Dual View
                </button>
                <button
                  onClick={() => setVideoLayout('cinema')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    videoLayout === 'cinema' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Flowchart Cinema Theater"
                >
                  Full Flowchart
                </button>
                <button
                  onClick={() => setVideoLayout('pip')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    videoLayout === 'pip' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Presenter Focus"
                >
                  Presenter PIP
                </button>
              </div>
            </div>
          </div>

          {/* MAIN VIDEO STAGE (Cinema Screen) */}
          <div className="relative bg-[#090910] min-h-[440px] sm:min-h-[500px] flex flex-col justify-between overflow-hidden">
            
            {/* Subtle Video Grid & Radial Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e1834_1px,transparent_1px)] [background-size:28px_28px] opacity-60 pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Video Content Grid: Flowchart Canvas + Presenter Webcam Box */}
            <div className="relative z-10 p-4 sm:p-6 flex-1 flex flex-col lg:flex-row gap-5 items-stretch justify-center">
              
              {/* LEFT / CENTER: Dynamic Animated Flowchart Stage */}
              <div
                className={`flex-1 flex flex-col justify-between rounded-2xl bg-[#11111d]/90 border border-white/10 p-4 sm:p-6 transition-all relative overflow-x-auto ${
                  videoLayout === 'cinema' ? 'w-full' : ''
                }`}
              >
                {/* Live Data Pulse Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Activity className={`w-4 h-4 ${isPlaying ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
                    <span className="text-xs font-semibold text-slate-300">
                      Cognitive Pipeline Flow • Step {activeNodeIndex + 1}/{currentTrack.nodes.length}
                    </span>
                  </div>

                  {/* Active Step Telemetry */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                      State: {isPlaying ? 'EXECUTING' : 'READY'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                      {formatTime(currentSeconds)} / {formatTime(totalTrackSeconds)}
                    </span>
                  </div>
                </div>

                {/* THE INTERACTIVE FLOWCHART PIPELINE */}
                <div className="my-auto py-4 flex flex-wrap md:flex-nowrap items-center justify-center gap-3 sm:gap-4 w-full">
                  {currentTrack.nodes.map((node, idx) => {
                    const isActive = idx === activeNodeIndex;
                    const isPassed = idx < activeNodeIndex;

                    return (
                      <React.Fragment key={node.id}>
                        {/* Flowchart Node Card */}
                        <div
                          onClick={() => handleJumpToNode(idx)}
                          className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-3.5 sm:p-4 flex flex-col items-center text-center w-full sm:w-44 min-w-[140px] border select-none ${
                            isActive
                              ? 'bg-gradient-to-b from-purple-900/90 to-[#221340] border-purple-400 shadow-2xl shadow-purple-600/60 scale-105 ring-2 ring-purple-400/80 z-20'
                              : isPassed
                              ? 'bg-[#181826]/80 border-emerald-500/40 text-slate-200 hover:border-emerald-400'
                              : 'bg-[#13131e]/70 border-white/10 hover:border-white/30 text-slate-400'
                          }`}
                        >
                          {/* Step Pill */}
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-colors ${
                              isActive
                                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/50'
                                : isPassed
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                                : 'bg-white/10 text-slate-400'
                            }`}
                          >
                            {isPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : idx + 1}
                          </div>

                          {/* Node Title */}
                          <span className={`text-xs font-bold leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                            {node.label}
                          </span>

                          {/* Sublabel */}
                          <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                            {node.sublabel}
                          </span>

                          {/* Pulsing Aura if Active */}
                          {isActive && (
                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500" />
                            </span>
                          )}

                          {/* Live Progress Bar within this node */}
                          {isActive && isPlaying && (
                            <div className="w-full mt-2 bg-purple-950 rounded-full h-1 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-purple-400 to-cyan-400 h-full transition-all duration-100"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      ((currentSeconds - (nodeTimeWindows[idx]?.start || 0)) /
                                        (node.durationSeconds || 15)) *
                                        100
                                    )
                                  )}%`
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Animated Connection Arrow / Beam */}
                        {idx < currentTrack.nodes.length - 1 && (
                          <div className="hidden md:flex flex-col items-center justify-center relative">
                            {/* SVG Connection with animated glowing particles */}
                            <svg className="w-8 sm:w-10 h-6 overflow-visible" viewBox="0 0 40 24">
                              <line
                                x1="0"
                                y1="12"
                                x2="32"
                                y2="12"
                                stroke={idx < activeNodeIndex ? '#10b981' : idx === activeNodeIndex && isPlaying ? '#a855f7' : 'rgba(255,255,255,0.2)'}
                                strokeWidth="2.5"
                                strokeDasharray={idx === activeNodeIndex && isPlaying ? '4,4' : 'none'}
                                className={idx === activeNodeIndex && isPlaying ? 'animate-pulse' : ''}
                              />
                              <polygon
                                points="32,8 40,12 32,16"
                                fill={idx < activeNodeIndex ? '#10b981' : idx === activeNodeIndex && isPlaying ? '#a855f7' : 'rgba(255,255,255,0.2)'}
                              />
                            </svg>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Simulated Real-Time Execution Console (Live Video Logs) */}
                <div className="mt-4 bg-black/60 border border-white/10 rounded-xl p-3 font-mono text-[11px] text-slate-300 space-y-1 overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-1 mb-1.5">
                    <span className="flex items-center gap-1.5 font-bold text-purple-300">
                      <Terminal className="w-3.5 h-3.5 text-purple-400" />
                      Runtime Agent Execution Stream
                    </span>
                    <span className="text-cyan-400">Node: {activeNode.id}</span>
                  </div>
                  <div className="space-y-1 max-h-16 overflow-y-auto">
                    {activeNode.executionLogs.map((log, lIdx) => (
                      <div key={lIdx} className="flex items-center gap-2 text-slate-200">
                        <span className="text-purple-400 font-bold">›</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT: AI Coach Presenter Video Webcam Box */}
              {videoLayout !== 'cinema' && (
                <div className="lg:w-80 shrink-0 bg-[#121220] border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-xl">
                  {/* Instructor Webcam Frame */}
                  <div>
                    <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/10 text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-purple-400" />
                        AI Presenter Webcam
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        HD Cam
                      </span>
                    </div>

                    {/* Animated Avatar / Instructor */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-[#1e1335] border border-purple-500/30 aspect-video flex items-center justify-center shadow-inner">
                      <InterviewerAvatar
                        isSpeaking={isPlaying}
                        isListening={false}
                        selectedPersona={instructorPersona}
                        audioLevel={isPlaying ? 65 : 0}
                      />

                      {/* Instructor Name Tag Overlay */}
                      <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-[10px]">
                        <span className="font-bold text-white">Dr. Sarah Jenkins</span>
                        <span className="text-purple-300">Principal AI Architect</span>
                      </div>
                    </div>
                  </div>

                  {/* Narration Subtitle Box */}
                  <div className="mt-3 bg-black/40 border border-purple-500/20 rounded-xl p-3 text-xs leading-relaxed">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-purple-300 mb-1">
                      <Volume2 className="w-3 h-3 text-purple-400" />
                      Narration Transcript
                    </div>
                    <p className="text-slate-200 line-clamp-4 font-medium italic">
                      "{activeNode.narratorText}"
                    </p>
                  </div>

                  {/* Audio Status */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
                    <span>Voice Audio:</span>
                    <button
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      className="text-purple-300 font-bold hover:underline flex items-center gap-1"
                    >
                      {audioEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                      {audioEnabled ? 'Voice Enabled' : 'Muted'}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* BIG CENTER PLAY BUTTON OVERLAY (When paused) */}
            {!isPlaying && (
              <div
                onClick={handleTogglePlay}
                className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer group transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-purple-600/70 border-2 border-white/40 group-hover:scale-110 transition-transform">
                  <Play className="w-9 h-9 fill-white ml-1.5" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-md">
                    {currentSeconds > 0 ? 'Click to Resume Video' : 'Click to Play Flowchart Video Lesson'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                    Watch the live animated data flow, listen to AI narration, and master agent loops step-by-step.
                  </p>
                </div>
              </div>
            )}

            {/* VIDEO TIMELINE SCRUBBER (Clickable anywhere!) */}
            <div
              onClick={handleTimelineClick}
              className="relative w-full h-3 bg-slate-900 cursor-pointer group select-none"
              title="Click anywhere to jump in video"
            >
              {/* Node Chapter Markers */}
              {nodeTimeWindows.map((w, idx) => (
                <div
                  key={idx}
                  className="absolute top-0 bottom-0 w-0.5 bg-white/30 z-10"
                  style={{ left: `${(w.start / totalTrackSeconds) * 100}%` }}
                />
              ))}

              {/* Progress Bar */}
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-100 relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-purple-600 group-hover:scale-125 transition-transform" />
              </div>
            </div>

            {/* BOTTOM VIDEO TRANSPORT TOOLBAR */}
            <div className="bg-[#10101c] px-4 sm:px-6 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              
              {/* Left: Playback Controls */}
              <div className="flex items-center gap-2">
                {/* Restart */}
                <button
                  onClick={handleRestart}
                  title="Restart Track (00:00)"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Rewind 5s */}
                <button
                  onClick={() => handleStepTime(-5)}
                  title="Rewind 5s"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                {/* Play / Pause Main Button */}
                <button
                  onClick={handleTogglePlay}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-purple-600/40 active:scale-95 transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  <span>{isPlaying ? 'Pause Lesson' : 'Play Flowchart Video'}</span>
                </button>

                {/* Fast Forward 5s */}
                <button
                  onClick={() => handleStepTime(5)}
                  title="Forward 5s"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                >
                  <FastForward className="w-4 h-4" />
                </button>

                {/* Time Display */}
                <div className="font-mono text-xs text-slate-300 ml-2">
                  <span className="text-white font-bold">{formatTime(currentSeconds)}</span>
                  <span className="text-slate-500"> / {formatTime(totalTrackSeconds)}</span>
                </div>
              </div>

              {/* Right: Audio, Speed & Fullscreen */}
              <div className="flex items-center gap-2">
                {/* Audio Mute/Unmute */}
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  title={audioEnabled ? 'Mute AI Narration' : 'Enable AI Narration'}
                  className={`p-2 rounded-xl transition-colors ${
                    audioEnabled ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Node Transition Pace: 3s Fast Sim / 8s Normal / 15s Full */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden text-xs">
                  <button
                    onClick={() => {
                      setNodeSpeedMode('3s');
                      setCurrentSeconds(0);
                    }}
                    title="Fast 3 seconds per node simulation"
                    className={`px-2.5 py-1 transition-all font-mono font-bold flex items-center gap-1 cursor-pointer ${
                      nodeSpeedMode === '3s'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-xs'
                        : 'text-amber-400 hover:text-amber-300'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>3s Fast Sim</span>
                  </button>
                  <button
                    onClick={() => {
                      setNodeSpeedMode('8s');
                      setCurrentSeconds(0);
                    }}
                    title="8 seconds per node transition"
                    className={`px-2 py-1 transition-colors font-mono cursor-pointer ${
                      nodeSpeedMode === '8s' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    8s
                  </button>
                  <button
                    onClick={() => {
                      setNodeSpeedMode('15s');
                      setCurrentSeconds(0);
                    }}
                    title="15 seconds deep dive per node"
                    className={`px-2 py-1 transition-colors font-mono cursor-pointer ${
                      nodeSpeedMode === '15s' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    15s
                  </button>
                </div>

                {/* Speed Multiplier */}
                <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden text-xs">
                  {[1, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-1 transition-colors font-mono cursor-pointer ${
                        playbackSpeed === spd ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={handleToggleFullscreen}
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* BELOW-VIDEO DEEP DIVES: ARCHITECTURE, CODE & LIVE COACH CHAT */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT 7 COLUMNS: ARCHITECTURE INSPECTOR / PRODUCTION CODE / QUIZ */}
          <div className="lg:col-span-7 bg-[#11111d] border border-white/10 rounded-3xl p-6 shadow-xl">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
              <button
                onClick={() => setActiveTab('inspector')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'inspector'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Architecture Inspector</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'code'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Production Code (LangGraph)</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Quiz ({currentTrack.quizQuestions.length})</span>
              </button>
            </div>

            {/* TAB 1: ARCHITECTURE INSPECTOR */}
            {activeTab === 'inspector' && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs uppercase font-bold text-purple-400 tracking-wider">
                    Active Step Analysis
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {activeNode.label}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {activeNode.architectureDetails}
                  </p>
                </div>

                {/* Pro Interview Tip */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    Senior / Staff Interview Key Signal
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                    {activeNode.interviewTip}
                  </p>
                </div>

                {/* Common Architecture Pitfall */}
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    Architecture Pitfall to Avoid
                  </div>
                  <p className="text-xs sm:text-sm text-rose-200 leading-relaxed">
                    {activeNode.commonMistake}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCTION CODE */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    langgraph_agent_node.py
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                    Python 3.11+
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto leading-relaxed shadow-inner">
                  <pre>{activeNode.codeSnippet.code}</pre>
                </div>
                <p className="text-xs text-slate-400">
                  💡 This code showcases the production pattern used in enterprise agent workflows using LangGraph and Pydantic schemas.
                </p>
              </div>
            )}

            {/* TAB 3: QUIZ */}
            {activeTab === 'quiz' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    Knowledge Check: {currentTrack.title}
                  </h3>
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setShowQuizResults(false);
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset Quiz
                  </button>
                </div>

                {currentTrack.quizQuestions.map((qItem, qIdx) => {
                  const selected = quizAnswers[qIdx];
                  const isAnswered = selected !== undefined;
                  const isCorrect = selected === qItem.correctIndex;

                  return (
                    <div key={qIdx} className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <p className="text-sm font-semibold text-slate-100">
                        {qIdx + 1}. {qItem.question}
                      </p>
                      <div className="space-y-2">
                        {qItem.options.map((opt, oIdx) => {
                          const isOptionSelected = selected === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                              className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm transition-all border ${
                                isOptionSelected
                                  ? showQuizResults
                                    ? isCorrect
                                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                                      : 'bg-rose-500/20 border-rose-500 text-rose-200'
                                    : 'bg-purple-600/30 border-purple-400 text-white'
                                  : 'bg-black/20 border-white/5 text-slate-300 hover:bg-white/5'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showQuizResults && (
                        <div className={`p-3 rounded-xl text-xs ${isCorrect ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
                          <span className="font-bold">{isCorrect ? '✅ Correct! ' : '❌ Incorrect. '}</span>
                          {qItem.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}

                <button
                  onClick={() => setShowQuizResults(true)}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-purple-600/30"
                >
                  Verify Answers & View Explanations
                </button>
              </div>
            )}
          </div>

          {/* RIGHT 5 COLUMNS: INTERACTIVE AI COACH CHAT */}
          <div className="lg:col-span-5 bg-[#11111d] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col h-[580px]">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  Dr. Sarah Jenkins
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-xs text-slate-400">
                  Principal AI Agent Architect • Online
                </p>
              </div>
            </div>

            {/* Quick Starter Chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {[
                'How to prevent infinite loops?',
                'LangGraph vs simple chains?',
                'Explain ReAct vs Plan-and-Solve'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendChat(chip)}
                  className="px-2.5 py-1 rounded-full text-[11px] bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Messages Scroll Container */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs sm:text-sm">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none text-[15px] font-roman'
                    }`}
                  >
                    <NeatRomanText text={msg.text} />
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex gap-2 items-center text-slate-400 text-xs italic">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  Dr. Sarah is formulating advice...
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat();
              }}
              className="mt-4 flex items-center gap-2 pt-3 border-t border-white/10"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Dr. Sarah about agent design or code..."
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isChatLoading}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-all shadow-md shadow-purple-600/30 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

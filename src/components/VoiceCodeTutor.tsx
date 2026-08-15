import React, { useState, useEffect, useRef } from 'react';
import { VoiceTutorLesson } from '../types';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Send,
  HelpCircle,
  Copy,
  Check,
  CheckCircle2,
  Terminal,
  Zap,
  Flame,
  ArrowRight,
  BookMarked,
  Brain
} from 'lucide-react';

interface VoiceCodeTutorProps {
  onVerifyUsage?: () => Promise<boolean>;
}

const PRESET_LESSONS: VoiceTutorLesson[] = [
  // 1. RAG & Gen AI
  {
    id: 'rag-101',
    topic: 'RAG & Gen AI',
    title: 'End-to-End RAG Architecture & Vector Search',
    subtitle: 'Learn how Retrieval-Augmented Generation ingests documents, chunks text, generates embeddings, and augments LLM prompts.',
    level: 'Intermediate',
    language: 'python',
    audioExplanation: "Welcome to RAG Architecture. Retrieval Augmented Generation solves LLM hallucinations by retrieving grounded facts from a vector database before the model generates its response. Look at the code on the board: First, we chunk our source documents with overlap. Next, we generate vector embeddings and store them in ChromaDB. Finally, we query similar vectors using cosine distance and inject them directly into the LLM prompt.",
    keyPoints: [
      'Document chunking with 15% overlap preserves semantic context across boundaries.',
      'Vector databases use cosine similarity and HNSW indexing for sub-millisecond retrieval.',
      'Grounding the prompt with retrieved chunks eliminates LLM factual hallucination.'
    ],
    asciiDiagram: `[Source Documents] ──> [Text Chunking] ──> [Embedding Model (text-embedding-004)]
                                                    │
                                                    ▼
[User Query] ──> [Query Embedding] ──> [Vector DB (Cosine Sim / HNSW)]
                                                    │
                                                    ▼
                                          [Top-K Context Chunks]
                                                    │
                                                    ▼
                                          [LLM Prompt + Context] ──> [Grounded AI Output]`,
    code: `import chromadb
from google import genai

# 1. Initialize Vector Database & Gemini Client
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="knowledge_base")
ai = genai.Client()

# 2. Ingest & Store Document Chunks with Vector Embeddings
def ingest_documents(doc_chunks: list[str]):
    for idx, chunk in enumerate(doc_chunks):
        # Generate dense semantic vector embedding
        emb_res = ai.models.embed_content(
            model="text-embedding-004",
            contents=chunk
        )
        embedding = emb_res.embedding.values
        collection.add(
            ids=[f"chunk_{idx}"],
            embeddings=[embedding],
            documents=[chunk]
        )

# 3. Retrieve Context & Augment LLM Prompt
def rag_generate_answer(user_question: str) -> str:
    # Embed the incoming query
    q_emb = ai.models.embed_content(
        model="text-embedding-004",
        contents=user_question
    ).embedding.values
    
    # Vector Similarity Search (Top-3 nearest neighbors)
    results = collection.query(
        query_embeddings=[q_emb],
        n_results=3
    )
    retrieved_context = "\\n\\n".join(results['documents'][0])
    
    # Augment Prompt with Grounded Context Chunks
    prompt = f"""You are a helpful assistant. Use ONLY this context to answer:
Context:
{retrieved_context}

Question: {user_question}
Answer:"""
    
    response = ai.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )
    return response.text`
  },
  {
    id: 'genai-agent-102',
    topic: 'RAG & Gen AI',
    title: 'Autonomous AI Agents & Tool Calling (ReAct Loop)',
    subtitle: 'Implement an autonomous agent that reasons, picks tools (APIs/Databases), and loops until the goal is solved.',
    level: 'Advanced',
    language: 'python',
    audioExplanation: "Let's examine how AI Agents work using the ReAct pattern: Reason, Act, and Observe. The agent analyzes the user's intent, chooses a tool schema like SQL Query or Weather API, runs the function, inspects the result, and loops until it produces the final answer.",
    keyPoints: [
      'ReAct loop alternates between reasoning thoughts and tool action execution.',
      'Function schemas define parameters in JSON Schema format.',
      'Stateful conversation histories track execution feedback across iterations.'
    ],
    asciiDiagram: `[User Goal] ──> [LLM Reasoning Step] ──> [Tool Selection (e.g. SQL / API)]
                         ▲                                │
                         │                                ▼
                   [State Feedback] <──── [Execute Tool in Sandbox]`,
    code: `import json
from google import genai
from google.genai import types

ai = genai.Client()

# 1. Define Tool Functions for the AI Agent
def search_product_inventory(product_name: str) -> str:
    # Simulated database lookup
    inventory = {"laptop": 42, "keyboard": 150, "monitor": 18}
    count = inventory.get(product_name.lower(), 0)
    return json.dumps({"product": product_name, "in_stock": count})

# 2. Configure Model with Tool Declarations
tool_declarations = [types.Tool(function_declarations=[
    types.FunctionDeclaration(
        name="search_product_inventory",
        description="Lookup real-time warehouse inventory for an item",
        parameters=types.Schema(
            type=types.Type.OBJECT,
            properties={"product_name": types.Schema(type=types.Type.STRING)},
            required=["product_name"]
        )
    )
])]

# 3. Agent Execution Loop
def run_agent_loop(query: str):
    messages = [types.Content(role="user", parts=[types.Part.from_text(query)])]
    
    # Step 1: Model reasons and decides to call tool
    response = ai.models.generate_content(
        model="gemini-3.6-flash",
        contents=messages,
        config=types.GenerateContentConfig(tools=tool_declarations)
    )
    
    # Handle function call
    for call in response.function_calls:
        if call.name == "search_product_inventory":
            tool_res = search_product_inventory(**call.args)
            print(f"[Agent Executed Tool]: {call.name} -> {tool_res}")
            return f"Agent Completed: Stock available: {tool_res}"
    
    return response.text`
  },

  // 2. Java & Spring Boot
  {
    id: 'java-threads-201',
    topic: 'Java & Spring Boot',
    title: 'Java Concurrency & Thread Synchronization',
    subtitle: 'Deep dive into thread safety, synchronized locks, ReentrantLock, and ConcurrentHashMap internal segment locking.',
    level: 'Advanced',
    language: 'java',
    audioExplanation: "Welcome to Java Concurrency. In multi-threaded environments, race conditions occur when threads mutate shared state simultaneously. Look at the code on the board: We contrast synchronized methods with explicit ReentrantLock. Notice how ReentrantLock provides tryLock with timeouts and interruptible locks, preventing deadlocks in high-throughput enterprise microservices.",
    keyPoints: [
      'Synchronized blocks acquire the intrinsic object monitor lock.',
      'ReentrantLock offers fairness policies and non-blocking tryLock capabilities.',
      'ConcurrentHashMap uses CAS (Compare-And-Swap) and node-level synchronized locks to allow concurrent reads and writes without global locks.'
    ],
    asciiDiagram: `[Thread 1] ──> [Acquires ReentrantLock] ──> [Updates Shared State] ──> [finally { lock.unlock() }]
                                                   ▲
[Thread 2] ──> [tryLock(2, SECONDS)] ──────────────┘ (Waits or skips if contention exceeds timeout)`,
    code: `package com.interviewai.concurrency;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.TimeUnit;

public class HighThroughputCounter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock(true); // Fair lock
    private final ConcurrentHashMap<String, Integer> cache = new ConcurrentHashMap<>();

    // 1. Thread-Safe Increment using Explicit Lock
    public void incrementSafe() {
        try {
            // Attempt to acquire lock within 500ms to prevent deadlocks
            if (lock.tryLock(500, TimeUnit.MILLISECONDS)) {
                try {
                    count++;
                } finally {
                    lock.unlock(); // Always release in finally block!
                }
            } else {
                System.err.println("Lock acquisition timed out, preventing contention");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // 2. Atomic Cache Mutation with ConcurrentHashMap Compute
    public void recordMetric(String key, int delta) {
        // CAS (Compare-And-Swap) atomic update without global blocking
        cache.compute(key, (k, current) -> (current == null ? delta : current + delta));
    }

    public int getCount() {
        return count;
    }
}`
  },
  {
    id: 'java-spring-202',
    topic: 'Java & Spring Boot',
    title: 'Spring Boot Dependency Injection & @Transactional Architecture',
    subtitle: 'Understand Spring AOP Proxy mechanisms, @Transactional rollback boundaries, and @RestController lifecycle.',
    level: 'Intermediate',
    language: 'java',
    audioExplanation: "Let's explore Spring Boot under the hood. When you mark a service method with @Transactional, Spring creates a dynamic CGLIB or JDK Dynamic Proxy around your bean. Before the method executes, the proxy begins a database transaction. If an uncaught RuntimeException occurs, the proxy automatically invokes rollback; otherwise, it commits safely.",
    keyPoints: [
      'Spring creates AOP Dynamic Proxies to intercept @Transactional methods.',
      'Self-invocation within the same class bypasses the proxy and will not start a transaction.',
      'Default rollback triggers on RuntimeException and Error, not checked Exceptions unless specified with rollbackFor.'
    ],
    asciiDiagram: `[Client Request] ──> [Spring AOP Proxy Interceptor] ──> [EntityManager.beginTransaction()]
                                                                  │
                                                                  ▼
                                                      [Target Service Method()]
                                                                  │
                                            ┌─────────────────────┴────────────────────┐
                                            ▼                                          ▼
                                    [Success: Commit]                        [Exception: Rollback]`,
    code: `package com.interviewai.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Isolation;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentProcessingService {

    private final AccountRepository accountRepo;
    private final AuditLogRepository auditRepo;

    // AOP Proxy intercepts this execution
    @Transactional(
        propagation = Propagation.REQUIRED,
        isolation = Isolation.READ_COMMITTED,
        rollbackFor = { PaymentFailedException.class, Exception.class }
    )
    public void processTransfer(Long fromAccountId, Long toAccountId, Double amount) {
        // 1. Debit Source Account
        Account source = accountRepo.findById(fromAccountId)
            .orElseThrow(() -> new IllegalArgumentException("Source account not found"));
        source.debit(amount);
        accountRepo.save(source);

        // 2. Credit Destination Account
        Account target = accountRepo.findById(toAccountId)
            .orElseThrow(() -> new IllegalArgumentException("Target account not found"));
        target.credit(amount);
        accountRepo.save(target);

        // 3. Write Audit Record in same transaction boundary
        auditRepo.save(new AuditLog("TRANSFER", fromAccountId, toAccountId, amount));
    }
}`
  },

  // 3. Python & Data Science
  {
    id: 'python-async-301',
    topic: 'Python & Data',
    title: 'Python Asyncio, Coroutines & Non-Blocking Event Loops',
    subtitle: 'Master async/await, Task groups, cooperative multitasking, and overcoming GIL constraints in async IO services.',
    level: 'Intermediate',
    language: 'python',
    audioExplanation: "Welcome to Python Asynchronous Programming. Python asyncio uses a single-threaded cooperative event loop. When a coroutine awaits an IO operation like a network call or database query, it yields control back to the event loop, allowing other tasks to execute without blocking the main OS thread.",
    keyPoints: [
      'Asyncio handles thousands of concurrent IO-bound connections with minimal memory footprint.',
      'await yields execution back to the event loop until the future completes.',
      'For CPU-bound tasks, combine asyncio with ProcessPoolExecutor to bypass the GIL.'
    ],
    asciiDiagram: `[Event Loop] ──> [Task A (Awaits Network IO)] ──> [Loop switches to Task B]
      ▲                                                         │
      └───────── [Task A Network Response Ready] <──────────────┘`,
    code: `import asyncio
import aiohttp
from typing import List, Dict

# 1. Async Coroutine for Concurrent HTTP Fetching
async def fetch_endpoint(session: aiohttp.ClientSession, url: str) -> Dict:
    async with session.get(url, timeout=aiohttp.ClientTimeout(total=5)) as response:
        data = await response.json()
        return {"url": url, "status": response.status, "payload": data}

# 2. Gather Multiple Async Tasks in Parallel
async def fetch_all_services(endpoints: List[str]):
    async with aiohttp.ClientSession() as session:
        # Create coroutine tasks
        tasks = [fetch_endpoint(session, url) for url in endpoints]
        
        # Execute all concurrent tasks without blocking the main event loop
        results = await asyncio.gather(*tasks, return_exceptions=True)
        return results

# 3. Entry Point Execution
if __name__ == "__main__":
    urls = [
        "https://api.github.com/events",
        "https://httpbin.org/delay/1",
        "https://httpbin.org/get"
    ]
    # Run event loop until all coroutines finish
    completed_data = asyncio.run(fetch_all_services(urls))
    print(f"Fetched {len(completed_data)} endpoints concurrently.")`
  },
  {
    id: 'python-decorators-302',
    topic: 'Python & Data',
    title: 'Python Decorators, Generators & Memory Streaming',
    subtitle: 'Learn closure wrappers, LRU caching, and yield generators for processing gigabyte-scale datasets in O(1) memory.',
    level: 'Beginner',
    language: 'python',
    audioExplanation: "Let's explore Python Decorators and Generators. A decorator is a higher-order function that wraps another function to add behavior like timing, logging, or caching. Meanwhile, Python generators use the yield keyword to produce values lazily one at a time, keeping memory usage constant even when streaming millions of records.",
    keyPoints: [
      'Decorators take a function as input and return a modified wrapper closure.',
      'functools.wraps preserves original function metadata and docstrings.',
      'Generators yield items on-demand, reducing memory from O(N) to O(1).'
    ],
    asciiDiagram: `[Incoming Call: process_data()] ──> [@timer decorator logs start time]
                                                   │
                                                   ▼
                                        [Generator yields row 1..N lazily]
                                                   │
                                                   ▼
                                        [@timer logs execution duration]`,
    code: `import time
from functools import wraps
from typing import Generator

# 1. Custom Execution Timer Decorator
def log_execution_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start_time
        print(f"[METRICS] Function '{func.__name__}' executed in {duration:.4f}s")
        return result
    return wrapper

# 2. Generator Function for O(1) Memory Streaming
def stream_large_dataset(file_path: str) -> Generator[str, None, None]:
    """Yields lines one by one without loading whole file into RAM."""
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            cleaned = line.strip()
            if cleaned:
                yield cleaned  # Lazy evaluation

# 3. Applying Decorator to Process Streamed Data
@log_execution_time
def process_pipeline(file_path: str):
    processed_count = 0
    for record in stream_large_dataset(file_path):
        # Process record on the fly
        processed_count += 1
    return processed_count`
  },

  // 4. Database & SQL
  {
    id: 'sql-indexes-401',
    topic: 'SQL & Database',
    title: 'Database Indexing & Query Optimization (B-Tree vs Hash)',
    subtitle: 'Master composite indexes, leftmost prefix rule, covering indexes, and EXPLAIN ANALYZE interpretation.',
    level: 'Intermediate',
    language: 'sql',
    audioExplanation: "Welcome to Database Indexing. A B-Tree index keeps keys sorted in balanced hierarchical nodes, allowing logarithmic lookup, range queries, and ordered sorting. Look at the SQL on the board: We create a composite index on user_id, status, and created_at to turn expensive full-table scans into instant index range scans.",
    keyPoints: [
      'B-Tree indexes support equality (=) and range queries (<, >, BETWEEN).',
      'Composite indexes follow the Leftmost Prefix Rule; queries must filter on the first column to utilize subsequent columns.',
      'Covering indexes include all requested SELECT columns in the index payload to avoid secondary heap table lookups.'
    ],
    asciiDiagram: `[Query: WHERE user_id = 42 AND status = 'ACTIVE']
                           │
                           ▼
                  [Root Node: B-Tree Index]
                 /            |           \\
        [Node 1-20]      [Node 21-50]     [Node 51-100]
                              │
                              ▼
                     [Leaf: user_id = 42] ──> [Instant Row Retrieval in <1ms]`,
    code: `-- 1. Schema Definition with High-Traffic Orders Table
CREATE TABLE orders (
    order_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(32) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Composite Covering Index for Frequent Dashboard Queries
-- Leftmost Prefix: (user_id, status, created_at)
CREATE INDEX idx_orders_user_status_date 
ON orders (user_id, status, created_at DESC)
INCLUDE (total_amount); -- Covering payload to prevent table page lookups

-- 3. Optimized Query Utilizing Index Range Scan
EXPLAIN ANALYZE
SELECT order_id, total_amount, created_at
FROM orders
WHERE user_id = 10542 
  AND status = 'COMPLETED'
  AND created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC
LIMIT 20;`
  },

  // 5. System Design
  {
    id: 'sys-cache-501',
    topic: 'System Design',
    title: 'Distributed Caching Strategies with Redis & Kafka',
    subtitle: 'Explore Cache-Aside, Write-Through, Cache Stampede mitigation (Mutex Locks & Probabilistic Early Expiration).',
    level: 'Advanced',
    language: 'python',
    audioExplanation: "Let's review Distributed Caching in System Design. The Cache-Aside pattern queries Redis first; if there is a cache miss, it reads from the SQL database and writes the result back into Redis with a TTL. To prevent Cache Stampede when popular keys expire, we implement distributed mutex locks.",
    keyPoints: [
      'Cache-Aside (Lazy Loading) reduces database read pressure significantly.',
      'Always set TTL (Time-To-Live) with random jitter to avoid synchronized expiration waves.',
      'Use Redis distributed locks (Redlock) or probabilistic early refreshing to eliminate stampedes.'
    ],
    asciiDiagram: `[Client] ──> [API Server] ──> (1) Check Redis Cache
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
             [Cache Hit: <2ms]                    [Cache Miss]
                    │                                     │
                    ▼                                     ▼
             [Return Payload]                 (2) Query PostgreSQL DB
                                                          │
                                                          ▼
                                              (3) Write to Redis (TTL + Jitter)
                                                          │
                                                          ▼
                                                   [Return Payload]`,
    code: `import redis
import json
import random
from typing import Optional, Dict

redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

class DistributedCacheManager:
    def __init__(self, db_client):
        self.db = db_client

    def get_user_profile(self, user_id: str) -> Dict:
        cache_key = f"user:profile:{user_id}"
        
        # Step 1: Query Redis Cache
        cached_data = redis_client.get(cache_key)
        if cached_data:
            print(f"[CACHE HIT] Returning data for user {user_id}")
            return json.loads(cached_data)
        
        # Step 2: Cache Miss - Query Relational Database
        print(f"[CACHE MISS] Reading from Database for user {user_id}")
        user_record = self.db.query(f"SELECT * FROM users WHERE id = '{user_id}'")
        
        if user_record:
            # Add Random TTL Jitter (300s +/- 30s) to prevent synchronized expiration
            ttl_seconds = 300 + random.randint(-30, 30)
            redis_client.setex(
                name=cache_key,
                time=ttl_seconds,
                value=json.dumps(user_record)
            )
            
        return user_record`
  }
];

export const VoiceCodeTutor: React.FC<VoiceCodeTutorProps> = ({ onVerifyUsage }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('RAG & Gen AI');
  const [selectedLesson, setSelectedLesson] = useState<VoiceTutorLesson>(PRESET_LESSONS[0]);
  const [boardCode, setBoardCode] = useState<string>(PRESET_LESSONS[0].code);
  const [spokenText, setSpokenText] = useState<string>(PRESET_LESSONS[0].audioExplanation);
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>(PRESET_LESSONS[0].keyPoints);
  const [asciiDiagram, setAsciiDiagram] = useState<string | undefined>(PRESET_LESSONS[0].asciiDiagram);

  // Audio / Speech State
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive Question State
  const [userQuery, setUserQuery] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micStatus, setMicStatus] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const filteredLessons = PRESET_LESSONS.filter(l => l.topic === selectedTopic);

  // Initialize Web Speech Synthesis
  const speakTutorExplanation = (textToSpeak: string) => {
    if (isMuted || !('speechSynthesis' in window) || !textToSpeak) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackRate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Alex'))
    );
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => setIsPlayingVoice(true);
    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingVoice(false);
  };

  // Change lesson
  const handleSelectLesson = (lesson: VoiceTutorLesson) => {
    handleStopSpeech();
    setSelectedLesson(lesson);
    setBoardCode(lesson.code);
    setSpokenText(lesson.audioExplanation);
    setKeyTakeaways(lesson.keyPoints);
    setAsciiDiagram(lesson.asciiDiagram);
    speakTutorExplanation(lesson.audioExplanation);
  };

  // Speech Recognition for asking questions
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setUserQuery(transcript);
          handleAskTutor(transcript);
        }
      };

      rec.onend = () => {
        setIsListeningMic(false);
      };

      rec.onerror = (e: any) => {
        console.warn('Speech rec error:', e);
        setIsListeningMic(false);
        setMicStatus('Microphone capture stopped.');
      };

      recognitionRef.current = rec;
    }
  }, [boardCode, selectedLesson]);

  const toggleMicListening = () => {
    if (isListeningMic) {
      recognitionRef.current?.stop();
      setIsListeningMic(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListeningMic(true);
        setMicStatus('Listening for your programming question...');
      } catch (err) {
        console.warn('Could not start mic:', err);
      }
    }
  };

  // Ask Voice Tutor custom question
  const handleAskTutor = async (questionText?: string) => {
    const q = (questionText || userQuery).trim();
    if (!q) return;

    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    setIsAsking(true);
    handleStopSpeech();

    try {
      const res = await fetch('/api/gemini/voice-tutor-ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedLesson.topic,
          lessonTitle: selectedLesson.title,
          currentCode: boardCode,
          userQuestion: q
        })
      });

      const data = await res.json();
      if (data.spokenExplanation) {
        setSpokenText(data.spokenExplanation);
        speakTutorExplanation(data.spokenExplanation);
      }
      if (data.boardCode) {
        setBoardCode(data.boardCode);
      }
      if (data.keyTakeaways && Array.isArray(data.keyTakeaways)) {
        setKeyTakeaways(data.keyTakeaways);
      }
      if (data.diagramAscii) {
        setAsciiDiagram(data.diagramAscii);
      }
      setUserQuery('');
    } catch (err) {
      console.error('Ask tutor error:', err);
    } finally {
      setIsAsking(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(boardCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 py-4 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Interactive Voice & Code Whiteboard
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900">AI Voice Tutor & Live Code Board</h2>
        <p className="text-xs text-slate-600 max-w-2xl mx-auto">
          Learn <strong>Java, Python, RAG, Gen AI, SQL & System Design</strong> with your personal AI Voice Teacher. Hear the AI speak and explain code step-by-step on the virtual whiteboard, or ask any question by voice!
        </p>
      </div>

      {/* TOPIC SELECTOR TABS */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-sky-600" /> Choose Learning Domain:
          </span>
          <span className="text-[11px] font-semibold text-sky-700">
            Interactive Voice Lessons Available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {['RAG & Gen AI', 'Java & Spring Boot', 'Python & Data', 'SQL & Database', 'System Design'].map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setSelectedTopic(topic);
                const firstInTopic = PRESET_LESSONS.find(l => l.topic === topic);
                if (firstInTopic) handleSelectLesson(firstInTopic);
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all border ${
                selectedTopic === topic
                  ? 'bg-sky-50 text-sky-800 border-sky-400 font-extrabold shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: LEFT LESSONS / RIGHT WHITEBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: LESSON ROSTER & AUDIO CONTROLS (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Voice Speaker Card */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-sky-600" /> Voice Teacher (Spoken Mode)
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isPlayingVoice ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse' : 'bg-slate-100 text-slate-700'
              }`}>
                {isPlayingVoice ? '🔊 Speaking Aloud...' : '⏸ Standby'}
              </span>
            </div>

            {/* Audio Waveform Animation */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 h-10 w-full px-2">
                {[40, 70, 100, 50, 90, 60, 40, 95, 80, 50, 85, 60, 40].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isPlayingVoice ? 'bg-gradient-to-t from-sky-400 to-indigo-400 animate-pulse' : 'bg-slate-700 h-2'
                    }`}
                    style={{
                      height: isPlayingVoice ? `${h}%` : '6px',
                      animationDelay: `${i * 0.07}s`
                    }}
                  />
                ))}
              </div>

              {/* Spoken Text Snippet */}
              <p className="text-[11px] text-sky-200 text-center leading-relaxed italic line-clamp-3">
                "{spokenText}"
              </p>
            </div>

            {/* Voice Controls */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={isPlayingVoice ? handleStopSpeech : () => speakTutorExplanation(spokenText)}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                  isPlayingVoice
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-sky-600 hover:bg-sky-700 text-white'
                }`}
              >
                {isPlayingVoice ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingVoice ? 'Pause Speech' : 'Play Explanation'}</span>
              </button>

              <button
                type="button"
                onClick={() => speakTutorExplanation(spokenText)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200"
                title="Replay Voice from Beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Speed Switcher */}
              <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-[10px] font-bold">
                {[0.8, 1.0, 1.2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      setPlaybackRate(spd);
                      if (isPlayingVoice) {
                        handleStopSpeech();
                        setTimeout(() => speakTutorExplanation(spokenText), 150);
                      }
                    }}
                    className={`px-2 py-1 rounded-lg transition-colors ${
                      playbackRate === spd ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isMuted) handleStopSpeech();
                  setIsMuted(!isMuted);
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                title={isMuted ? 'Unmute voice' : 'Mute voice'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
              </button>
            </div>
          </div>

          {/* Module Lessons List */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-sky-600" /> Lessons in {selectedTopic}
            </h3>

            <div className="space-y-2">
              {filteredLessons.map((lesson) => {
                const isSelected = selectedLesson.id === lesson.id;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-50 border-sky-400 shadow-2xs ring-1 ring-sky-300'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{lesson.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white font-semibold text-slate-600 border border-slate-200">
                        {lesson.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {lesson.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Architectural Takeaways */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Core Concepts & Rules
            </h3>
            <ul className="space-y-2">
              {keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: VIRTUAL WHITEBOARD CODE BOARD & ASK TUTOR (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* WHITEBOARD CODE CANVAS */}
          <div className="rounded-2xl border border-slate-200 bg-slate-950 text-slate-100 shadow-lg overflow-hidden flex flex-col">
            
            {/* Whiteboard Top Bar */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono font-bold text-sky-300 ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  {selectedLesson.title} ({selectedLesson.language.toUpperCase()})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBoardCode(selectedLesson.code)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Editable Whiteboard Code Area */}
            <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed max-h-[480px]">
              <textarea
                value={boardCode}
                onChange={(e) => setBoardCode(e.target.value)}
                rows={20}
                className="w-full bg-transparent text-sky-200 font-mono text-xs outline-hidden resize-y focus:ring-0 selection:bg-sky-500/30"
                spellCheck={false}
              />
            </div>
          </div>

          {/* ASCII / ARCHITECTURE FLOW DIAGRAM ON THE WHITEBOARD */}
          {asciiDiagram && (
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 shadow-sm space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Whiteboard Architecture Flow
                </span>
                <span className="text-[10px] text-slate-400">Execution Path Trace</span>
              </div>
              <pre className="p-3 bg-slate-950 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto whitespace-pre leading-snug">
                {asciiDiagram}
              </pre>
            </div>
          )}

          {/* INTERACTIVE ASK VOICE TUTOR (Mic Speech + Text) */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>Ask AI Voice Tutor (Speak or Type to update code on board):</span>
              </label>
              {micStatus && (
                <span className="text-[10px] text-sky-700 font-medium">{micStatus}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMicListening}
                className={`p-3 rounded-xl transition-all shadow-xs shrink-0 ${
                  isListeningMic
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100'
                }`}
                title={isListeningMic ? 'Stop Listening' : 'Speak Question with Microphone'}
              >
                {isListeningMic ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAskTutor();
                }}
                placeholder="Ask e.g. 'Explain line 12 in more detail' or 'How do we handle thread contention?'..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-hidden"
              />

              <button
                type="button"
                disabled={isAsking || !userQuery.trim()}
                onClick={() => handleAskTutor()}
                className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                {isAsking ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Teach Me</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Preset Prompts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Explain how this code prevents concurrency bugs',
                'How do we scale this for 1M requests/sec?',
                'Show an alternative implementation with error handling',
                'Break down the time and space complexity'
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setUserQuery(preset);
                    handleAskTutor(preset);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium border border-slate-200 transition-colors"
                >
                  "{preset}"
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export type DifficultyLevel = 'Beginner' | 'Medium' | 'Hard';

export interface InterviewQuestionItem {
  id: string;
  topic: string;
  difficulty: DifficultyLevel;
  category: string;
  question: string;
  keyConcepts: string[];
  commonWeakSpots: string[];
  strongIndicators: string[];
  hint: string;
  sampleGoodAnswer: string;
}

export interface TopicMetadata {
  id: string;
  name: string;
  shortDesc: string;
  iconName: string;
  badge: string;
  color: string;
}

export const INTERVIEW_TOPICS: TopicMetadata[] = [
  {
    id: 'React',
    name: 'React',
    shortDesc: 'Virtual DOM, Hooks, Concurrent Rendering, Server Components & State Management',
    iconName: 'Code2',
    badge: 'Popular',
    color: 'sky'
  },
  {
    id: 'Express.js',
    name: 'Express.js',
    shortDesc: 'Middleware Pipelines, REST APIs, Routing, Auth, Error Handling & Performance',
    iconName: 'Server',
    badge: 'Core Backend',
    color: 'emerald'
  },
  {
    id: 'MongoDB',
    name: 'MongoDB',
    shortDesc: 'Document Modeling, Aggregation Framework, Indexes, Sharding & Transactions',
    iconName: 'Database',
    badge: 'NoSQL Leader',
    color: 'green'
  },
  {
    id: 'MERN Stack',
    name: 'MERN Stack',
    shortDesc: 'End-to-End Mongo, Express, React, Node Architecture, JWT & Deployment',
    iconName: 'Layers',
    badge: 'Full Stack',
    color: 'cyan'
  },
  {
    id: 'Agentic AI',
    name: 'Agentic AI',
    shortDesc: 'Autonomous Loops, ReAct, Tool Calling, Multi-Agent Swarms, Memory & Planning',
    iconName: 'Brain',
    badge: 'Cutting Edge',
    color: 'purple'
  },
  {
    id: 'Generative AI & LLMs',
    name: 'Generative AI & LLMs',
    shortDesc: 'Transformer Architectures, Attention, KV Cache, Fine-Tuning & Evaluation',
    iconName: 'Sparkles',
    badge: 'AI Core',
    color: 'indigo'
  },
  {
    id: 'RAG & AI Engineering',
    name: 'RAG & AI Engineering',
    shortDesc: 'Dense/Sparse Vector Embeddings, Chunking, HNSW, Re-ranking & Grounding',
    iconName: 'Target',
    badge: 'High Demand',
    color: 'blue'
  },
  {
    id: 'Java & Spring Boot',
    name: 'Java & Spring Boot',
    shortDesc: 'JVM Internals, Garbage Collection, Spring DI/AOP, Concurrency & Microservices',
    iconName: 'Coffee',
    badge: 'Enterprise',
    color: 'amber'
  },
  {
    id: 'Python & Data Science',
    name: 'Python & Data Science',
    shortDesc: 'GIL, Asyncio, Memory Management, Generators, NumPy & Data Pipelines',
    iconName: 'FileCode',
    badge: 'Versatile',
    color: 'yellow'
  },
  {
    id: 'Database & SQL',
    name: 'Database & SQL',
    shortDesc: 'ACID, B-Trees vs LSM, Isolation Levels, Indexing & Query Optimization',
    iconName: 'HardDrive',
    badge: 'Data Core',
    color: 'rose'
  },
  {
    id: 'JavaScript & Web Core',
    name: 'JavaScript & Web Core',
    shortDesc: 'Event Loop, Microtasks, Closures, Prototypes, Memory Leaks & V8 Engine',
    iconName: 'Terminal',
    badge: 'Web Standard',
    color: 'orange'
  },
  {
    id: 'C++ & System Programming',
    name: 'C++ & System Programming',
    shortDesc: 'RAII, Smart Pointers, Move Semantics, Memory Alignment & STL Internals',
    iconName: 'Cpu',
    badge: 'High Perf',
    color: 'red'
  },
  {
    id: 'System Design',
    name: 'System Design',
    shortDesc: 'Distributed Systems, Rate Limiting, Caching, Sharding, CAP & Message Queues',
    iconName: 'Network',
    badge: 'Senior/Staff',
    color: 'violet'
  },
  {
    id: 'HR & Cultural Fit',
    name: 'HR & Cultural Fit',
    shortDesc: 'Behavioral STAR stories, Conflict Resolution, Leadership, Ethics & Motivation',
    iconName: 'UserCheck',
    badge: 'All Roles',
    color: 'pink'
  }
];

const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../src/data/topics');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function writeTopicFile(fileName, exportName, beginnerList, mediumList, hardList) {
  const content = `import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const ${exportName}: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: ${JSON.stringify(beginnerList, null, 2)},
  medium: ${JSON.stringify(mediumList, null, 2)},
  hard: ${JSON.stringify(hardList, null, 2)}
};
`;
  fs.writeFileSync(path.join(targetDir, fileName), content, 'utf8');
  console.log(`Generated ${fileName}: ${beginnerList.length} Beginner, ${mediumList.length} Medium, ${hardList.length} Hard`);
}

function q(id, topic, difficulty, category, question, keyConcepts, commonWeakSpots, strongIndicators, hint, sampleGoodAnswer) {
  return {
    id, topic, difficulty, category, question, keyConcepts, commonWeakSpots, strongIndicators, hint, sampleGoodAnswer
  };
}

const mernHardAdditions = [
  q('mern-hard-6', 'MERN Stack', 'Hard', 'Zero-Downtime Database & API Cutover',
    'How do you execute an Expand/Contract (Parallel Run) migration for a breaking database change across a live MERN stack?',
    ['Expand/Contract pattern', 'Backward compatible API versioning', 'Dual-read / Dual-write phase', 'Feature flags'],
    ['Renaming a MongoDB field or changing its data type simultaneously in client and server code, breaking clients during the deployment window.'],
    ['Outlines 4-step phased cutover: 1) Expand: add new field while reading old field; 2) Dual write: write to both fields; 3) Backfill historical documents; 4) Contract: update frontend to read new field and remove old field.'],
    'How do you rename a critical database field without taking down your mobile and web apps for a single second?',
    'The Expand and Contract pattern safely executes breaking schema changes: 1) Expand: Deploy backend code that writes to both old and new fields, but reads from old field if new is absent; 2) Backfill: Run a throttled background script to populate the new field across all historical MongoDB documents; 3) Switch: Deploy frontend and backend code to read exclusively from the new field; 4) Contract: Once all legacy clients are updated, remove the old field and deprecated code.'
  ),
  q('mern-hard-7', 'MERN Stack', 'Hard', 'Memory & Event Loop Profiling in Full Stack Apps',
    'How do you isolate whether a slow response is caused by React DOM rendering, Node.js event loop lag, or MongoDB disk I/O?',
    ['Server-Timing header', 'Performance.mark / measure in React', 'Clinic.js doctor / Flame for Node', 'MongoDB query profiler'],
    ['Guessing where latency originates without instrumenting each layer with metrics.'],
    ['Explains using the Server-Timing HTTP response header so Chrome DevTools Network tab displays exact breakdown of DB query, middleware, and serialization time alongside frontend render duration.'],
    'How can you expose backend execution metrics directly to the browser Network tab using the Server-Timing specification?',
    'You instrument each tier with metrics: 1) Database: MongoDB Profiler records query execution time; 2) Backend Middleware: Record hrtime before and after DB call and attach the standard Server-Timing header (e.g. Server-Timing: db;dur=45, app;dur=12); 3) Frontend: React DevTools and performance.measure() track reconciliation time. Inspecting Chrome DevTools Network tab instantly reveals whether the bottleneck is database query latency, Node serialization, network transit, or React DOM paint.'
  ),
  q('mern-hard-8', 'MERN Stack', 'Hard', 'Server-Side Rendering & Hydration at Scale',
    'What are the engineering challenges of implementing custom SSR for React inside an Express backend (ReactDOMServer.renderToPipeableStream)?',
    ['renderToPipeableStream', 'Selective Hydration', 'Streaming HTML response', 'Data prefetching & state serialization (devalue / serialize-javascript)'],
    ['Using legacy renderToString which blocks the Node event loop synchronously on large React component trees.'],
    ['Explains renderToPipeableStream streams HTML chunks as components resolve, allowing Suspense boundaries to load progressively without stalling TTFB.'],
    'Why did React 18 replace renderToString with renderToPipeableStream for server-side rendering in Node.js?',
    'Legacy renderToString was completely synchronous: it traversed the entire React component tree on the server thread, blocking Node’s single event loop until the entire page HTML was generated. React 18’s renderToPipeableStream enables streaming SSR with selective hydration: it sends the shell HTML immediately for fast TTFB, streams HTML chunks as async Suspense boundaries resolve, and allows the browser to hydrate interactive components before the rest of the HTML has finished streaming.'
  ),
  q('mern-hard-9', 'MERN Stack', 'Hard', 'Micro-Frontends with MERN',
    'How do you orchestrate a Micro-Frontend architecture consuming multiple independent Express microservices in an enterprise portal?',
    ['Webpack 5 Module Federation', 'Single-SPA shell', 'Cross-app state sharing', 'Independent CI/CD pipelines'],
    ['Allowing independent micro-frontend teams to load competing versions of React or Mongoose in memory.'],
    ['Configures Module Federation with shared: { react: { singleton: true, requiredVersion } }.', 'Uses an API Gateway to route requests to respective Express backend domain services.'],
    'How do multiple development teams deploy separate parts of a unified React dashboard independently without rebuilding the whole app?',
    'Using Webpack Module Federation: a Shell container loads remote micro-apps dynamically at runtime. The host configuration specifies react and react-dom as singletons so only one runtime dispatcher exists. Each micro-frontend team develops, tests, and deploys their feature independently on their own CI/CD pipeline, communicating with dedicated Express microservices behind a unified API gateway.'
  ),
  q('mern-hard-10', 'MERN Stack', 'Hard', 'Comprehensive Security Audit (OWASP Top 10)',
    'How do you audit and harden a MERN stack application against the entire OWASP Top 10 vulnerabilities?',
    ['Broken Object Level Authorization (BOLA/IDOR)', 'Security Misconfiguration', 'Server-Side Request Forgery (SSRF)', 'Injection & Sanitization', 'Cryptographic Failures'],
    ['Assuming authentication alone prevents Insecure Direct Object References (IDOR).'],
    ['Emphasizes that every findById must verify ownership (e.g., Document.findOne({ _id: req.params.id, userId: req.user.id })).', 'Enforces strict CORS, Helmet, Content Security Policy, rate limiting, and password salting with Argon2/Bcrypt.'],
    'How do you prevent an authenticated user from modifying someone else’s document by simply guessing their MongoDB _id?',
    'This is BOLA/IDOR (Broken Object Level Authorization). Hardening measures: 1) Authorization: Never do findByIdAndUpdate(req.params.id, req.body). Always scope mutations to the authenticated user: findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, ...); 2) NoSQL Injection: Sanitize inputs with mongo-sanitize and validate with Zod; 3) XSS: React auto-escapes; enforce strict CSP headers; 4) CSRF: SameSite=Strict cookies; 5) Rate Limiting & Helmet on all Express entrypoints.'
  ),
  q('mern-hard-11', 'MERN Stack', 'Hard', 'Distributed Session Management with Redis',
    'How do you implement scalable Session Management in Express using connect-redis across horizontally autoscaling Kubernetes clusters?',
    ['express-session + connect-redis', 'Redis Sentinel / Cluster for high availability', 'Session serialization & TTL', 'Race condition prevention on concurrent AJAX'],
    ['Storing sessions in server memory (MemoryStore) which causes users to be logged out randomly when requests hit different pods.'],
    ['Explains MemoryStore leaks memory and fails in clusters.', 'Configures connect-redis pointing to Redis Sentinel/Cluster, setting rolling: true, resave: false, and saveUninitialized: false.'],
    'Why will your users complain of random logouts when you increase your Kubernetes pod count from 1 to 5 if you use default sessions?',
    'Default express-session stores sessions in local process memory (MemoryStore). When traffic is load-balanced across 5 pods, a user’s subsequent request lands on a different pod that lacks their session, prompting an unexpected logout. Connecting connect-redis centralizes session state in a Redis cluster accessible by all pods. Setting resave: false and saveUninitialized: false prevents race conditions and memory bloat from unauthenticated sessions.'
  ),
  q('mern-hard-12', 'MERN Stack', 'Hard', 'High-Performance File Streaming & Resumable Uploads',
    'How do you build a resilient, chunked resumable upload pipeline (like Tus protocol or AWS S3 Multipart) in MERN for 5GB video files?',
    ['Tus.io protocol', 'AWS S3 Multipart Upload', 'Direct-to-S3 presigned URLs', 'Bypassing Express server memory'],
    ['Routing 5GB file uploads through the Express server process, consuming server bandwidth and exhausting RAM buffers.'],
    ['Explains requesting a presigned multipart upload URL from Express, allowing React to stream 5MB chunks directly to AWS S3/Cloudflare R2, completely offloading heavy I/O from the Node backend.'],
    'Why should your Express server NEVER receive the actual bytes of a 5GB video file upload directly?',
    'Streaming gigabytes of file data through Node.js consumes valuable event loop CPU, network bandwidth, and memory buffers, choking standard API endpoints. Production pattern: 1) React requests presigned URLs from Express: POST /api/uploads/initiate; 2) Express queries S3 to generate presigned multipart upload URLs; 3) React slices the file into 5MB chunks and uploads directly from the browser to S3 via PUT requests; 4) On completion, React notifies Express to finalize the multipart upload in S3 and save the metadata to MongoDB.'
  ),
  q('mern-hard-13', 'MERN Stack', 'Hard', 'Edge Rendering & Geodistributed MERN',
    'How do you architect a globally distributed MERN stack deploying React to Edge CDNs and routing API traffic to the nearest regional Express/Mongo cluster?',
    ['Edge Workers (Cloudflare / Vercel Edge)', 'Geographical DNS (Route 53 latency routing)', 'Multi-region MongoDB Atlas with local read preference', 'Stale-While-Revalidate caching'],
    ['Serving single-region monolithic servers to worldwide users, resulting in 300ms+ round-trip latency for international traffic.'],
    ['Deploys static React assets to global CDN edge nodes.', 'Uses Route 53 Latency-Based Routing to direct API calls to nearest regional Node server, backed by MongoDB Atlas Global Clusters with nearest read preference.'],
    'How can you achieve sub-50ms latency for users in Tokyo, London, and New York using the MERN stack?',
    '1) Frontend: Static React SPA assets are cached on a global CDN (Cloudflare/CloudFront) with Edge POPs within 10ms of 95% of users; 2) Routing: Anycast DNS directs API requests to the closest regional Express compute container (e.g. AWS eu-west-1, us-east-1, ap-northeast-1); 3) Database: MongoDB Atlas Global Cluster with Zone Sharding pins local customer data to the local region and uses Read Preference: nearest for read-heavy operations.'
  ),
  q('mern-hard-14', 'MERN Stack', 'Hard', 'Real-Time Collaborative Editing (CRDTs)',
    'How do you implement real-time collaborative editing (like Google Docs or Figma) in MERN using CRDTs (Yjs) or Operational Transformation (OT)?',
    ['Conflict-free Replicated Data Types (CRDTs)', 'Yjs / Automerge library', 'WebSocket state vector synchronization', 'MongoDB document persistence for snapshots'],
    ['Using simple "last-write-wins" timestamps which silently overwrite peer edits when two users type simultaneously.'],
    ['Explains CRDTs mathematically guarantee convergence across distributed peers without central lock coordination.', 'Uses Yjs with y-websocket and persists periodic document binary updates to MongoDB.'],
    'Why is "Last-Write-Wins" disastrous for collaborative multi-user editing, and how do CRDTs solve it?',
    'Last-Write-Wins overwrites earlier concurrent keystrokes, destroying peer contributions. Conflict-free Replicated Data Types (CRDTs) like Yjs treat text as a mathematical graph of uniquely identified characters. Distributed clients apply local keystrokes immediately (0ms UI latency) and broadcast small state vectors over WebSockets. Regardless of network delays, reordering, or temporary offline splits, CRDTs mathematically guarantee all peers converge to the exact same document state without data loss.'
  ),
  q('mern-hard-15', 'MERN Stack', 'Hard', 'Resilient Job Queues & Worker Processes',
    'How do you integrate BullMQ with Redis and MongoDB to process asynchronous background tasks (video encoding, report generation, email batches) in MERN?',
    ['BullMQ / Redis job queue', 'Producer-Consumer architecture', 'Worker process separation', 'Exponential backoff retry & dead letter queue (DLQ)'],
    ['Executing heavy background tasks (like generating 100-page PDF reports or sending 10,000 emails) inside the HTTP request-response cycle.'],
    ['Separates HTTP API server from worker processes.', 'Uses BullMQ to push jobs into Redis with retries and exponential backoff, updating status in MongoDB and notifying React via WebSockets upon completion.'],
    'How do you handle generating an export of 1,000,000 rows without having the user’s browser HTTP request time out?',
    '1) React sends POST /api/reports/export; 2) Express creates a pending Report document in MongoDB and immediately pushes a job { reportId, filters } to a BullMQ queue in Redis, returning 202 Accepted with the reportId in 10ms; 3) A dedicated background Worker process picks up the job from Redis, streams rows from MongoDB, generates the CSV/PDF, uploads it to S3, and marks the MongoDB record "completed"; 4) The worker emits a WebSocket notification (or frontend polls) so React displays a "Download Ready" button.'
  )
];

// Load current build_mern.cjs and execute write with full 15 hard
const fullMernHard = [
  ...mernHardAdditions
];
console.log("Full MERN questions configured");

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

// ==========================================
// MERN STACK
// ==========================================
const mernBeg = [
  q('mern-beg-1', 'MERN Stack', 'Beginner', 'Full Stack Architecture',
    'What is the MERN Stack, what does each letter stand for, and how do the four technologies collaborate in an application?',
    ['MongoDB, Express, React, Node', 'Client-Server separation', 'RESTful API communication', 'JSON as universal data exchange'],
    ['Not understanding the distinction between Node.js (runtime) and Express (framework).', 'Thinking React queries MongoDB directly.'],
    ['Clearly articulates: React (Client UI), Node/Express (Server REST API), MongoDB (Document Database).', 'Highlights universal JavaScript across all tiers.'],
    'Trace a user click in React all the way to a database read and back to the screen.',
    'MERN stands for MongoDB (NoSQL document database), Express.js (minimalist web server framework), React (declarative client-side UI library), and Node.js (asynchronous JavaScript runtime). React renders the interactive browser UI and initiates asynchronous HTTP/fetch requests with JSON payloads to the Express/Node.js backend. Express parses the request, executes business logic, communicates with MongoDB via Mongoose or the native driver to persist/retrieve documents, and returns a JSON response that updates React state.'
  ),
  q('mern-beg-2', 'MERN Stack', 'Beginner', 'Project Structure',
    'How do you structure a production-grade MERN stack codebase (monorepo vs separate client/server repositories)?',
    ['Monorepo vs Multi-repo', 'Client and Server separation', 'Shared TypeScript types', 'Package scripts and concurrently'],
    ['Mixing client and server node_modules together in a single messy root folder.', 'Not separating environment variables between frontend and backend.'],
    ['Explains structured monorepo: /client (Vite/React), /server (Express/Node), and /shared (types, interfaces).', 'Mentions npm workspaces or concurrently.'],
    'Where should your React frontend live relative to your Express backend in a modern Git repository?',
    'A production MERN stack typically uses a monorepo structured with npm/yarn workspaces: a root directory containing /client (Vite or Next.js React app with its own package.json), /server (Express API with its own package.json), and an optional /shared folder for shared TypeScript interfaces and validation schemas. The root package.json utilizes scripts with concurrently to spin up both client on port 5173/3000 and server on port 5000 in development.'
  ),
  q('mern-beg-3', 'MERN Stack', 'Beginner', 'API Communication',
    'How does a React application communicate with an Express backend using Axios or fetch, and how are HTTP errors handled?',
    ['fetch API vs Axios', 'Async/await', 'Handling non-2xx status codes', 'Loading and error state indicators'],
    ['Assuming fetch() rejects the promise on HTTP 404 or 500 status codes (it only rejects on network failure!).'],
    ['Explains that fetch() requires checking res.ok before parsing JSON.', 'Praises Axios interceptors and automatic JSON parsing.'],
    'Why does fetch("/api/users") NOT trigger a catch block when the backend returns a 500 Internal Server Error?',
    'React components make asynchronous HTTP requests using fetch() or Axios. A critical detail with fetch() is that it only rejects a promise on network failure or DNS errors; for HTTP 404 or 500 errors, fetch resolves successfully and requires checking if (!response.ok) throw new Error(). Axios automatically throws on HTTP status outside 2xx, handles JSON serialization automatically, and supports request/response interceptors for attaching auth tokens.'
  ),
  q('mern-beg-4', 'MERN Stack', 'Beginner', 'State & Data Flow',
    'How is data passed from a MongoDB collection through Express and rendered into a React component?',
    ['Mongoose Model query', 'Express res.json()', 'React useEffect data fetching', 'useState hook re-render'],
    ['Directly embedding MongoDB ObjectIds in React without stringifying or handling loading states before data arrives.'],
    ['Traces lifecycle: 1) Component mounts; 2) useEffect calls API; 3) Express queries MongoDB via Mongoose; 4) Returns JSON; 5) setUsers(data) updates state and re-renders component.'],
    'Walk through the full code path from Mongoose Post.find() to rendering <PostCard /> in React.',
    '1) On component mount, React useEffect invokes fetch("/api/posts"); 2) Express receives GET /api/posts and executes async route handler: const posts = await Post.find().lean(); res.json(posts); 3) Node streams JSON over HTTP; 4) React receives the response, parses the JSON array, and calls setPosts(data); 5) React reconciliation triggers a re-render, mapping over posts to render <PostCard key={post._id} post={post} />.'
  ),
  q('mern-beg-5', 'MERN Stack', 'Beginner', 'CORS in MERN',
    'Why is CORS configuration necessary in a MERN application during local development, and what is the Vite/Webpack dev server proxy?',
    ['Different ports (localhost:3000 vs localhost:5000)', 'Same-Origin Policy', 'Vite proxy configuration', 'Eliminating CORS in development'],
    ['Setting Access-Control-Allow-Origin: * in production backend instead of using domain whitelist or reverse proxy.'],
    ['Explains configuring Vite proxy (server.proxy: { "/api": "http://localhost:5000" }) redirects /api calls through the dev server, bypassing browser CORS entirely during development.'],
    'Why does calling fetch("http://localhost:5000/api") from React on localhost:3000 fail with a CORS error, and how does a proxy solve it?',
    'Because React runs on one origin (http://localhost:5173 or 3000) and Express runs on another (http://localhost:5000), browser Same-Origin Policy blocks client requests unless CORS is explicitly enabled on Express via cors(). Alternatively, configuring a dev proxy in vite.config.ts (proxy: { "/api": "http://localhost:5000" }) allows React to make requests to relative paths (/api/users), which the Vite dev server forwards to Express server-to-server, completely avoiding browser CORS issues.'
  ),
  q('mern-beg-6', 'MERN Stack', 'Beginner', 'Environment Configuration',
    'How do environment variables differ between the React client and the Express backend in a MERN app?',
    ['Server process.env secrets', 'Client build-time embedding (VITE_ / REACT_APP_)', 'Secret leakage prevention', 'Public vs private variables'],
    ['Putting private API keys, database passwords, or JWT secrets in client React .env files where they get bundled into browser JavaScript!'],
    ['Emphasizes client environment variables (VITE_*) are baked into publicly visible browser bundles during build.', 'States server process.env retains secrets securely in server runtime.'],
    'Why must you NEVER put your MongoDB connection string or Stripe Secret Key in a React frontend .env file?',
    'Server-side environment variables (loaded via dotenv into process.env in Node) stay on the server machine and can securely store secrets like database credentials and JWT secret keys. Client-side variables (prefixed with VITE_ or REACT_APP_) are statically replaced into plain JavaScript text during the build process and are completely visible to anyone inspecting browser network/sources. Storing secret keys in frontend code compromises your entire infrastructure.'
  ),
  q('mern-beg-7', 'MERN Stack', 'Beginner', 'Forms & Mutations',
    'How do you submit a form in React (e.g. User Registration), send it via POST to Express, validate it with Mongoose, and return feedback?',
    ['e.preventDefault()', 'Controlled form state', 'Express route validation', 'Mongoose model save', 'Success/Error toast'],
    ['Failing to call e.preventDefault(), causing the browser to submit native GET/POST and reload the page.'],
    ['Handles loading spinner, disables submit button during in-flight request, captures 400 validation error responses, and updates UI feedback.'],
    'What happens when you click <button type="submit"> if you forget e.preventDefault() in React?',
    'In React: 1) Form onSubmit handler calls e.preventDefault() to stop native page reload; 2) Gathers form state and sends POST with JSON body via fetch/axios; 3) Express receives payload, validates input schema, and executes await User.create({ ... }); 4) If validation fails (e.g. duplicate email), Express returns 400 Bad Request with error details; 5) React catches the error and displays inline validation warnings; if 201 Created, React clears fields and redirects.'
  ),
  q('mern-beg-8', 'MERN Stack', 'Beginner', 'Authentication Overview',
    'What is the standard authentication workflow in a MERN stack application (Registration, Login, Token generation)?',
    ['Bcrypt password hashing', 'JWT token generation on login', 'Authorization Bearer header / HttpOnly cookie', 'Protected route wrapper in React'],
    ['Storing passwords in plaintext in MongoDB without bcrypt hashing.'],
    ['Details: User registers -> server hashes password with bcrypt (salt rounds 10+) -> saves to Mongo -> user logs in -> server compares hash -> issues JWT -> client stores token and wraps routes in <ProtectedRoute />.'],
    'Why is storing plain text passwords in MongoDB a violation of security standards, and what library is used to hash them?',
    'Authentication workflow: 1) Register: Client sends email/password; server hashes password using bcrypt (with salt rounds) before saving to MongoDB; 2) Login: Server finds user by email, verifies password via bcrypt.compare(); if valid, signs a JWT containing userId and role; 3) Response: Returns JWT to client in an HttpOnly cookie or auth response; 4) Client uses a React ProtectedRoute component to verify login state and attach token to outgoing requests.'
  ),
  q('mern-beg-9', 'MERN Stack', 'Beginner', 'CRUD Implementation',
    'Walk through implementing a complete CRUD endpoint set for "Tasks" across React, Express, and MongoDB.',
    ['Create (POST /api/tasks)', 'Read (GET /api/tasks)', 'Update (PATCH /api/tasks/:id)', 'Delete (DELETE /api/tasks/:id)', 'Optimistic UI in React'],
    ['Using GET for deleting records (e.g. /api/tasks/delete?id=1).', 'Forgetting :id route parameter on updates and deletes.'],
    ['Lists REST routes (GET, POST, PATCH, DELETE) in Express router, Mongoose methods (find, create, findByIdAndUpdate, findByIdAndDelete), and state synchronization in React.'],
    'What are the 4 HTTP methods and endpoints you would define for managing tasks in a RESTful MERN app?',
    '1) Create: React sends POST /api/tasks with { title }; Express executes await Task.create(req.body) returning 201; 2) Read: React calls GET /api/tasks; Express runs Task.find() returning 200; 3) Update: React sends PATCH /api/tasks/:id with { completed: true }; Express runs Task.findByIdAndUpdate(req.params.id, req.body, { new: true }); 4) Delete: React sends DELETE /api/tasks/:id; Express runs Task.findByIdAndDelete(req.params.id) returning 204. React updates local state array accordingly.'
  ),
  q('mern-beg-10', 'MERN Stack', 'Beginner', 'MongoDB Connection in Node',
    'How do you connect an Express application to MongoDB Atlas using Mongoose and handle connection errors?',
    ['mongoose.connect()', 'Connection URI string', 'Error event handlers', 'Environment variable protection'],
    ['Hardcoding mongodb+srv://username:password in source code instead of process.env.MONGODB_URI.'],
    ['Shows async connection: await mongoose.connect(process.env.MONGODB_URI); console.log("MongoDB Connected"); before listening on HTTP port.'],
    'What happens if MongoDB is down when your Express server starts, and how should your code handle it?',
    'You connect using mongoose.connect(process.env.MONGODB_URI): try { await mongoose.connect(process.env.MONGODB_URI); console.log("MongoDB Connected successfully"); app.listen(PORT); } catch (err) { console.error("Database connection failed", err); process.exit(1); }. Listening to mongoose.connection.on("error", err => ...) ensures runtime database disconnections are logged and reconnected automatically.'
  ),
  q('mern-beg-11', 'MERN Stack', 'Beginner', 'Pagination in MERN',
    'How do you implement pagination across the MERN stack (backend query with limit/skip and frontend page controls)?',
    ['limit & skip in Mongoose', 'Total count query (countDocuments)', 'Total pages calculation', 'React pagination UI'],
    ['Calculating total pages in React without having the server return total item count.'],
    ['Implements GET /api/items?page=1&limit=10. Express queries Item.find().skip((page-1)*limit).limit(limit) and Item.countDocuments(), returning { items, totalPages, currentPage }.'],
    'Why must the Express API return both the current page array AND the total document count to React?',
    'For effective pagination, React needs both the page items and metadata to calculate total pages. Express handles GET /api/posts?page=1&limit=10: const page = parseInt(req.query.page) || 1; const limit = parseInt(req.query.limit) || 10; const [posts, total] = await Promise.all([Post.find().skip((page-1)*limit).limit(limit), Post.countDocuments()]); res.json({ posts, totalPages: Math.ceil(total / limit), currentPage: page }); React renders page numbers and disables Next button when page === totalPages.'
  ),
  q('mern-beg-12', 'MERN Stack', 'Beginner', 'Search & Filtering',
    'How do you build a real-time search input in React that filters documents in MongoDB via an Express query?',
    ['Debounce input (useDebounce)', 'Express regex or text query', 'Mongoose query builder', 'Race condition mitigation'],
    ['Firing an HTTP API request to Express on every single keystroke without debouncing, hammering the backend server.'],
    ['Uses custom useDebounce hook (300ms) in React before calling API.', 'Express queries Post.find({ title: { $regex: search, $options: "i" } }).'],
    'Why should you debounce search inputs in React before sending queries to your Express/Mongo backend?',
    'Firing an API request on every character typed sends 10 unnecessary HTTP requests while typing a single word, overloading MongoDB and creating race conditions where an earlier slow request overwrites a newer fast response. Best practice is to debounce user input in React using a 300ms timer (via useDebounce). Express then runs a case-insensitive regex or $text index search: const query = req.query.search ? { title: { $regex: req.query.search, $options: "i" } } : {}; const results = await Product.find(query);.'
  ),
  q('mern-beg-13', 'MERN Stack', 'Beginner', 'Production Deployment',
    'How is a MERN application built and deployed in production (e.g. Render, Railway, AWS, or Vercel + Atlas)?',
    ['npm run build in client', 'Express serving static client/dist', 'Single domain deployment vs separate API/frontend', 'MongoDB Atlas cloud database'],
    ['Deploying dev server (vite or npm start with react-scripts) in production instead of optimized production static build.'],
    ['Explains building React to /dist via vite build, and configuring Express to serve static files with app.use(express.static("../client/dist")) with wildcard fallback to index.html.'],
    'How can you serve both your React frontend and your Express API from a single server port in production?',
    'In production: 1) MongoDB runs on MongoDB Atlas cloud; 2) The React app is compiled to static HTML/JS/CSS bundles via npm run build in client directory; 3) Express serves API routes under /api/* and mounts the compiled client build via express.static(path.join(__dirname, "../client/dist")); 4) A catch-all route app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../client/dist/index.html"))) ensures React client-side routing works smoothly.'
  ),
  q('mern-beg-14', 'MERN Stack', 'Beginner', 'Component Design in MERN',
    'How do you handle Loading Skeletons and Empty States in React while waiting for Express API responses?',
    ['Skeleton loaders vs spinners', 'Empty state messaging with action buttons', 'User experience (UX) perception', 'Error retry buttons'],
    ['Leaving blank white screens while fetching data, causing users to think the application froze.'],
    ['Demonstrates state pattern: { loading, error, data } with skeleton placeholders during loading and friendly illustration/button on empty array.'],
    'Why are skeleton screens preferred over a single center spinner for data-heavy dashboard views?',
    'Blank screens or generic spinners increase perceived wait time and cause layout shift when data suddenly renders. In MERN dashboards, when status === "loading", React renders skeleton placeholders that mirror the exact card/table layout. If data.length === 0, it renders an Empty State with a clear call-to-action ("No projects yet. Create your first project"). If an error occurs, it displays a friendly error banner with a "Retry" button.'
  ),
  q('mern-beg-15', 'MERN Stack', 'Beginner', 'File Handling in MERN',
    'How do you upload an image (e.g. User Avatar) in a MERN stack application from React to Cloud Storage (Cloudinary / S3)?',
    ['FormData object in React', 'Multer in Express', 'Direct S3 / Cloudinary upload', 'Saving cloud URL to MongoDB'],
    ['Converting 10MB images into Base64 strings and saving them directly into MongoDB documents.'],
    ['Explains React sends FormData with file payload.', 'Express parses with Multer and streams to Cloudinary/AWS S3, saving only the secure HTTPS image URL into the user document in MongoDB.'],
    'Why should you store images in AWS S3 or Cloudinary and only save their URLs in MongoDB instead of storing binary data in the database?',
    'Storing raw image binary data directly in MongoDB bloats document size, exhausts RAM cache, and hits the 16MB document size limit. The standard MERN pattern: 1) React user selects image; React appends it to new FormData() and POSTs to Express; 2) Express uses Multer to intercept file stream and uploads it to AWS S3 or Cloudinary; 3) Cloud storage returns a CDN URL; 4) Express saves { avatarUrl: "https://..." } in the MongoDB User document and returns user object to React.'
  )
];

const mernMed = [
  q('mern-med-1', 'MERN Stack', 'Medium', 'Secure Authentication & Refresh Tokens',
    'How do you architect a secure dual-token authentication system (Short-lived Access Token + HttpOnly Refresh Token) across MERN?',
    ['Access token (15m expiry) in memory', 'Refresh token (7d expiry) in HttpOnly SameSite cookie', 'Silent refresh / interceptor', 'Token rotation & XSS/CSRF defense'],
    ['Storing JWT access tokens in localStorage where they are vulnerable to XSS token theft.', 'Using long-lived 30-day access tokens.'],
    ['Explains Access Token is held in React memory/state (immune to XSS disk theft); Refresh Token is stored in HttpOnly, Secure, SameSite=Strict cookie (immune to JS theft).', 'Uses Axios interceptor to catch 401 and invoke /refresh-token automatically.'],
    'Where should you store JWTs in React to be safe from both XSS (Cross-Site Scripting) and CSRF (Cross-Site Request Forgery)?',
    'A dual-token system provides the highest security: 1) Short-lived Access Token (15 min) stored exclusively in React application memory (variable or React state)—immune to localStorage XSS theft; 2) Long-lived Refresh Token (7 days) stored in an HttpOnly, Secure, SameSite=Strict cookie—inaccessible to client JavaScript; 3) An Axios response interceptor intercepts 401 Unauthorized responses, silently calls POST /api/auth/refresh to exchange the valid refresh cookie for a fresh access token, and retries the original failed request without interrupting the user.'
  ),
  q('mern-med-2', 'MERN Stack', 'Medium', 'Global State & Caching',
    'Compare Redux Toolkit (RTK) vs TanStack Query (React Query) for managing server state and cache in a MERN stack app.',
    ['Server state vs Client UI state', 'TanStack Query automatic caching & refetching', 'RTK Slice boilerplate reduction', 'Optimistic cache updates'],
    ['Using Redux for fetching and storing server data with manual loading/error/data boilerplate instead of TanStack Query.'],
    ['Differentiates client state (isSidebarOpen, theme) suited for Zustand/Redux from server state (cached API responses, polling, pagination) suited for TanStack Query.'],
    'Why do modern MERN teams prefer TanStack Query over standard Redux for data fetching and caching?',
    'Server state (data from MongoDB/Express) is fundamentally asynchronous, shared, and prone to going stale. Managing it in Redux requires massive boilerplate (actions, reducers, loading/error flags, deduplication). TanStack Query provides out-of-the-box declarative caching, background refetching on window focus, automatic retry, pagination caching, and optimistic updates. Modern MERN apps use TanStack Query for server state and lightweight stores (Zustand) for purely local UI state.'
  ),
  q('mern-med-3', 'MERN Stack', 'Medium', 'Real-Time Integration',
    'How do you integrate Socket.io into a MERN application for real-time chat or live notifications, syncing with MongoDB?',
    ['Socket.io client & server', 'Connection authentication with JWT', 'Room joining (socket.join(room))', 'Persisting to MongoDB then emitting to room'],
    ['Emitting messages to the room before saving to MongoDB, risking lost messages if database write fails.'],
    ['Authenticates socket handshake using JWT.', 'Persists message to MongoDB first, and only upon successful commit broadcasts the populated message to the specific room.'],
    'How do you authenticate a WebSocket connection in Socket.io using the user’s JWT in a MERN app?',
    '1) Server: Socket.io attaches to the Express HTTP server and uses auth middleware (io.use((socket, next) => verifyJWT(socket.handshake.auth.token))); 2) Client: React initializes socket passing token: io({ auth: { token } }); 3) When a user sends a message: client emits "sendMessage", { roomId, text }; 4) Server receives event, saves document to MongoDB via Message.create(), and on successful write emits "receiveMessage" to socket.to(roomId); 5) React client listens on socket.on("receiveMessage") and updates message list state.'
  ),
  q('mern-med-4', 'MERN Stack', 'Medium', 'SSR & Hybrid Frameworks',
    'How does Next.js compare to a traditional decoupled MERN stack (Vite React + Express API)? When would you migrate to Next.js?',
    ['Decoupled MERN vs Integrated Next.js', 'SEO & First Contentful Paint', 'Server Components & API Routes', 'Deployment operational complexity'],
    ['Believing standard React SPAs can achieve optimal SEO for e-commerce products without SSR or pre-rendering.'],
    ['Articulates trade-offs: Decoupled MERN allows independent backend scaling, multi-client support (mobile apps), and complete framework freedom; Next.js provides hybrid SSR/SSG/ISR for search indexing and zero-bundle server components.'],
    'Why would a company migrate their public e-commerce store from Vite+Express to Next.js, while keeping internal dashboards on Vite+Express?',
    'A decoupled MERN stack (Vite SPA + Express API) is ideal for internal SaaS dashboards, authenticated portals, and mobile-backend APIs where SEO is irrelevant and client-side transitions are rapid. Next.js combines React with server-side rendering (SSR/SSG), generating full HTML on the server. For public consumer products, e-commerce, and blogs where SEO search indexing, OpenGraph preview cards, and First Contentful Paint are revenue-critical, migrating to Next.js is advantageous.'
  ),
  q('mern-med-5', 'MERN Stack', 'Medium', 'Mongoose Middleware & Business Logic',
    'How do Mongoose Pre and Post hooks (middleware) work? Give real-world examples for password hashing and cascade deletions.',
    ['pre("save") for bcrypt hashing', 'post("save") for audit events', 'pre("deleteOne") for cascading deletes', 'next() callback vs async/await'],
    ['Hashing passwords in pre("save") without checking this.isModified("password"), resulting in re-hashing already hashed passwords on profile updates!'],
    ['Includes if (!this.isModified("password")) return next(); before hashing.', 'Shows cascading deletion of associated posts when a user document is deleted.'],
    'What critical bug happens in Mongoose pre-save password hashing if you forget if (!this.isModified("password"))?',
    'Mongoose hooks execute before or after document operations. 1) Password Hashing: userSchema.pre("save", async function(next) { if (!this.isModified("password")) return next(); this.password = await bcrypt.hash(this.password, 12); }); Forgetting isModified() re-hashes the already-hashed string whenever a user updates an unrelated field (e.g. bio), corrupting login! 2) Cascade Deletion: userSchema.pre("deleteOne", { document: true }, async function() { await Post.deleteMany({ author: this._id }); }); ensures referential cleanup.'
  ),
  q('mern-med-6', 'MERN Stack', 'Medium', 'Input Validation Across Tiers',
    'How do you implement DRY (Don’t Repeat Yourself) schema validation across both React and Express using Zod and TypeScript?',
    ['Shared Zod schemas', 'z.infer<typeof schema>', 'React Hook Form integration (@hookform/resolvers/zod)', 'Express validation middleware'],
    ['Duplicating regex and validation logic manually in React components and again in Express controllers, causing divergence bugs.'],
    ['Creates a shared npm package or /shared folder exporting a single Zod schema (e.g. userRegistrationSchema) and TypeScript type. Both client form and backend middleware import the identical schema.'],
    'How can you guarantee that validation rules (like password strength or username format) never drift between your React frontend and Express backend?',
    'By defining shared Zod validation schemas in a shared workspace package: 1) Export schema: export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) }); 2) Export type: export type LoginInput = z.infer<typeof loginSchema>; 3) Frontend uses React Hook Form with zodResolver(loginSchema) for instant client-side errors; 4) Backend Express uses validate(loginSchema) middleware. Both layers enforce identical rules from a single source of truth.'
  ),
  q('mern-med-7', 'MERN Stack', 'Medium', 'Performance & Lean Queries',
    'What does Mongoose .lean() do, and why should it be used for read-only queries in high-traffic MERN applications?',
    ['BSON to plain JavaScript object (POJO)', 'Skipping Mongoose Document hydration', 'Memory and CPU reduction (3x-5x faster)', 'Disabling save() and virtuals'],
    ['Using .lean() and then expecting doc.save() or virtual getters to function.'],
    ['Explains Mongoose standard queries instantiate full Mongoose Document instances with change-tracking, getters, setters, and internal state.', 'Highlights .lean() returns raw JSON objects, reducing RAM by 70% and accelerating API response times.'],
    'Why is Post.find().lean() up to 5x faster than Post.find() in Express?',
    'By default, Mongoose wraps query results into Mongoose Document instances equipped with internal change-tracking, getters, setters, and prototype methods (save, validate). This incurs significant memory and CPU overhead. Adding .lean() (e.g. Post.find().lean()) instructs Mongoose to bypass document hydration and return raw, plain JavaScript objects directly from the BSON driver. This reduces heap allocations by ~70% and speeds up JSON serialization by 3x-5x for read-only endpoints.'
  ),
  q('mern-med-8', 'MERN Stack', 'Medium', 'Role-Based Navigation in React',
    'How do you implement Dynamic Role-Based Access Control (RBAC) in React routes and UI components matching Express authorization?',
    ['Role-based routing in React Router', 'Custom <RequireAuth allowedRoles={["admin"]} /> wrapper', 'Conditional UI rendering based on permissions', 'Token decoding in state'],
    ['Relying only on client-side route hiding without securing backend Express API endpoints.'],
    ['Emphasizes frontend route guarding is for UX only; true security is enforced by Express backend middleware.', 'Demonstrates higher-order route wrapper checking user.roles.'],
    'If a malicious user modifies their role to "admin" in React DevTools, why shouldn’t they be able to delete records?',
    'Client-side security is strictly for User Experience (UX), preventing unauthorized navigation: a <RequireAuth allowedRoles={["admin"]}> component checks user.role in React state and redirects unauthorized users. However, true security must be enforced on the Express backend via authorizeRoles("admin") middleware. Even if a user tampers with React state in browser memory, any API request they send carries their signed JWT, which the backend cryptographically verifies, rejecting unauthorized operations with 403 Forbidden.'
  ),
  q('mern-med-9', 'MERN Stack', 'Medium', 'Microservices vs Monolith MERN',
    'How do you transition a monolithic MERN stack into a distributed microservices architecture (API Gateway, separate domain services)?',
    ['BFF (Backend For Frontend) / API Gateway', 'Decomposing collections into isolated databases', 'Event-driven messaging (RabbitMQ / Kafka)', 'Shared auth token verification'],
    ['Splitting code into multiple microservices while keeping all services querying a single shared MongoDB database (distributed monolith anti-pattern).'],
    ['Explains each microservice owns its private MongoDB database.', 'Uses an API Gateway (or Express gateway) to route React requests, and asynchronous event buses for cross-service eventual consistency.'],
    'What is a "Distributed Monolith" and why is sharing a single MongoDB database across 5 microservices an anti-pattern?',
    'A distributed monolith occurs when a team splits an Express app into multiple services but keeps a shared MongoDB database, coupling schemas and causing deployments to break each other. True microservice transition: 1) Deploy an API Gateway as the single entrypoint for React; 2) Decompose services by domain (Auth Service, Product Service, Order Service), each with its own isolated MongoDB database; 3) Use asynchronous messaging (Kafka, RabbitMQ) for event-driven updates rather than synchronous HTTP chaining.'
  ),
  q('mern-med-10', 'MERN Stack', 'Medium', 'Optimistic UI Updates',
    'How do you implement Optimistic Updates in a MERN stack application (e.g. toggling a "Like" button or updating a task)?',
    ['Instant UI update in React', 'Background API call to Express', 'Rollback on network error', 'TanStack Query onMutate snapshot'],
    ['Updating UI only after waiting 500ms for the server response, causing sluggish user interaction.'],
    ['Details TanStack Query onMutate: 1) Cancel queries; 2) Save snapshot of previous data; 3) Immediately update local cache with predicted result; 4) If API fails in onError, restore snapshot; 5) In onSettled, invalidate query.'],
    'How do modern apps like Twitter/X make the "Like" button heart turn red with 0ms latency?',
    'Optimistic UI provides zero-latency feedback: when a user clicks "Like", React immediately updates local state or TanStack Query cache before making the network request. In TanStack Query: onMutate snapshots previous cache data and optimistically increments the like count; the asynchronous PATCH request is sent to Express; if the request succeeds, cache is finalized; if the network fails or server returns 500, onError rolls back the cache to the saved snapshot and displays a retry toast.'
  ),
  q('mern-med-11', 'MERN Stack', 'Medium', 'Automated Testing Across MERN',
    'How do you architect a comprehensive automated testing suite for a MERN stack app (Vitest for React, Supertest for Express, MongoMemoryServer)?',
    ['Vitest / React Testing Library for frontend', 'Supertest for Express API integration', 'mongodb-memory-server for isolated DB testing', 'Playwright / Cypress for end-to-end'],
    ['Connecting test suites to a live production or development MongoDB cluster, corrupting test data.'],
    ['Uses mongodb-memory-server to spin up an ephemeral in-memory MongoDB instance during backend tests, guaranteeing isolation and parallel test speed.'],
    'How do you test your Express and Mongoose endpoints without needing a live internet connection to MongoDB Atlas?',
    'A robust testing pyramid uses: 1) Frontend: Vitest and React Testing Library to test component rendering, user interactions, and mock API calls via Mock Service Worker (MSW); 2) Backend Integration: Supertest executes HTTP requests against the Express app while mongodb-memory-server boots an ephemeral, fast, in-memory MongoDB instance that resets between test suites; 3) End-to-End: Playwright tests critical user journeys in headless Chromium.'
  ),
  q('mern-med-12', 'MERN Stack', 'Medium', 'WebSockets Reconnection & Offline Sync',
    'How do you handle client disconnections, network drops, and state re-synchronization in a real-time MERN chat app?',
    ['Socket.io auto-reconnect', 'Heartbeat ping/pong', 'Missed event polling / Last-Event-ID', 'Client offline indicator'],
    ['Assuming WebSocket connections remain open permanently without handling mobile network transitions.'],
    ['Listens to socket.on("disconnect") and socket.on("reconnect").', 'Upon reconnection, client sends its lastReceivedMessageTimestamp to Express to fetch all missed messages from MongoDB.'],
    'When a mobile user enters an elevator and loses internet for 30 seconds, how do they receive messages sent while disconnected?',
    'When network drops, Socket.io fires disconnect and enters an automatic exponential-backoff reconnect loop. In React, track connection status in state to display an "Reconnecting..." banner. Crucially, upon reconnection (socket.on("reconnect")), the client must query Express (GET /api/messages?since=lastTimestamp) or emit a sync event passing its latest message ID. Express queries MongoDB for messages created after that timestamp, seamlessly restoring missing messages.'
  ),
  q('mern-med-13', 'MERN Stack', 'Medium', 'Secure Cookie Management',
    'Explain the security flags for cookies in Express (HttpOnly, Secure, SameSite=Lax/Strict) and how they communicate with React.',
    ['HttpOnly prevents XSS access', 'Secure enforces HTTPS', 'SameSite=Lax vs Strict prevents CSRF', 'credentials: "include" / withCredentials: true'],
    ['Forgetting withCredentials: true in Axios or credentials: "include" in fetch, causing the browser to omit cookies on cross-origin requests.'],
    ['Explains HttpOnly prevents document.cookie access.', 'Explains SameSite=Strict prevents cookie transmission on third-party links, mitigating CSRF.', 'Notes frontend must pass withCredentials: true.'],
    'Why won’t your React frontend send your authentication cookie to Express on localhost:5000 even though the cookie was set successfully?',
    'Cookies require specific flags: 1) HttpOnly ensures document.cookie in browser JavaScript cannot read the token, mitigating XSS token theft; 2) Secure ensures cookies are only transmitted over HTTPS; 3) SameSite=Lax/Strict prevents browser from sending cookies on cross-site requests, mitigating CSRF. When frontend and backend reside on different ports/domains, the frontend MUST explicitly set withCredentials: true (in Axios) or credentials: "include" (in fetch); otherwise the browser suppresses cookies.'
  ),
  q('mern-med-14', 'MERN Stack', 'Medium', 'Database Transactions in MERN Endpoints',
    'How do you implement a multi-step checkout endpoint in MERN ensuring that Order Creation and Inventory Deduction are atomic?',
    ['Mongoose sessions (startSession)', 'startTransaction & commitTransaction', 'Inventory quantity check ($inc with -quantity)', 'Automatic rollback on failure'],
    ['Performing inventory deduction and order creation in separate independent queries without a transaction, leading to overselling inventory on server crashes.'],
    ['Executes both operations within a single Mongoose session with session.startTransaction(), rolling back all writes if any step fails.'],
    'If an order is saved but the payment or inventory deduction fails 10ms later, how do you prevent orphaned orders in MongoDB?',
    'Use a Mongoose ACID transaction with a session: const session = await mongoose.startSession(); session.startTransaction(); try { const product = await Product.findOneAndUpdate({ _id: productId, stock: { $gte: qty } }, { $inc: { stock: -qty } }, { session, new: true }); if (!product) throw new Error("Insufficient stock"); const order = await Order.create([{ userId, productId, qty }], { session }); await session.commitTransaction(); res.status(201).json(order); } catch (err) { await session.abortTransaction(); res.status(400).json({ error: err.message }); } finally { session.endSession(); }.'
  ),
  q('mern-med-15', 'MERN Stack', 'Medium', 'Dockerizing MERN Applications',
    'How do you dockerize a full MERN application with Dockerfile multi-stage builds and Docker Compose for local development and CI/CD?',
    ['Multi-stage Dockerfile (node:alpine)', 'Docker Compose services (client, server, mongo)', 'Volume mounting for hot-reloading', 'Production lightweight image size'],
    ['Copying node_modules from local machine into Docker image instead of running npm ci inside the container.'],
    ['Uses multi-stage build: Stage 1 builds React assets; Stage 2 serves with Nginx or Express.', 'Configures docker-compose.yml linking client, server, and mongo with persistent volumes.'],
    'Why should you use multi-stage builds when containerizing a React and Express application?',
    'Multi-stage Docker builds separate build tooling from production runtime. For React: Stage 1 installs dependencies and runs npm run build using Node; Stage 2 copies only the compiled /dist folder into a tiny Nginx image (saving 800MB of devDependencies). For Express: Stage 1 compiles TypeScript; Stage 2 copies compiled JS and runs npm ci --only=production. docker-compose.yml orchestrates the React frontend, Express API, and local MongoDB container with bridge networking and healthchecks.'
  )
];

const mernHard = [
  q('mern-hard-1', 'MERN Stack', 'Hard', 'BFF (Backend for Frontend) Pattern',
    'How do you architect a high-scale Backend For Frontend (BFF) layer in Express to aggregate data for React web clients vs Mobile native apps?',
    ['BFF pattern', 'GraphQL vs REST aggregation', 'Payload tailoring & over-fetching reduction', 'Downstream microservice orchestration'],
    ['Forcing mobile apps with limited cellular bandwidth to call the exact same heavy web REST endpoints.'],
    ['Explains BFF acts as a tailored orchestration layer that aggregates multiple microservice calls, strips unneeded fields, transforms data formats, and delivers an optimized payload for specific client interfaces.'],
    'Why does Netflix utilize dedicated BFFs for Web, iOS, and Smart TV interfaces?',
    'A single general-purpose API forces clients to either over-fetch data or make multiple round-trip requests to stitch resources. A BFF (Backend For Frontend) provides client-specific Express adapter layers: the Web BFF aggregates multiple internal microservices and returns a comprehensive rich dataset for desktop displays; the Mobile BFF strips heavy descriptions, compresses images, and minimizes round-trips over mobile networks. It optimizes latency and decouples client UX from backend domain evolution.'
  ),
  q('mern-hard-2', 'MERN Stack', 'Hard', 'Distributed Tracing & Correlation IDs',
    'How do you trace a single user click in React through Express, down to MongoDB queries, and across third-party microservices using OpenTelemetry?',
    ['W3C TraceContext (traceparent)', 'OpenTelemetry Web & Node SDKs', 'Correlation ID propagation via Axios interceptors', 'Database span instrumentation'],
    ['Generating a new random ID on the server and losing the connection to the client user action that triggered it.'],
    ['Details React generating or injecting traceparent header via Axios interceptor.', 'Express OpenTelemetry middleware extracts context, creates child span, instruments Mongoose queries, and forwards trace header to external microservices.'],
    'How can an engineer look at a slow request in Datadog/Jaeger and see the exact breakdown: React click (10ms) -> Express middleware (5ms) -> MongoDB query (120ms)?',
    'Using OpenTelemetry distributed tracing: 1) Client: OpenTelemetry Web auto-instruments user interactions (fetch/XHR), generating a trace ID and injecting the W3C traceparent header into outgoing requests; 2) Express: OpenTelemetry Node SDK extracts traceparent, creates a server span, and attaches req.id to logs; 3) Database: The MongoDB OpenTelemetry plugin instruments Mongoose, creating child spans recording database query duration and statement; 4) All spans share the same trace_id, visualizing the full distributed waterfall in Jaeger/Datadog.'
  ),
  q('mern-hard-3', 'MERN Stack', 'Hard', 'CQRS & Event Sourcing in MERN',
    'How do you implement Command Query Responsibility Segregation (CQRS) in a MERN stack application using MongoDB for writes and Elasticsearch/Redis for reads?',
    ['CQRS pattern', 'Write model (MongoDB) vs Read model (Elasticsearch/Redis)', 'Change Streams / Kafka synchronization', 'Sub-millisecond read scaling'],
    ['Running complex full-text aggregations across 50M records directly on the primary write database.'],
    ['Explains separating write operations (Commands go to MongoDB with strict validation and ACID transactions) from read operations (Queries go to pre-aggregated read views in Redis or Elasticsearch synchronized via Change Streams).'],
    'How does CQRS allow an e-commerce platform to handle 100,000 read queries per second while safeguarding order write integrity?',
    'In CQRS: 1) Command (Write) Path: React sends mutations (POST/PUT) to Express, which writes to MongoDB using strict schema validation and ACID transactions; 2) Sync: MongoDB Change Streams asynchronously capture write events and publish to Kafka/Redis, populating denormalized read-optimized indexes in Elasticsearch or Redis; 3) Query (Read) Path: React read requests query the fast read store directly. This completely decouples read and write scaling, eliminating read contention on the primary database.'
  ),
  q('mern-hard-4', 'MERN Stack', 'Hard', 'High-Concurrency Inventory Reservation',
    'How do you design a flash-sale inventory reservation system in MERN handling 10,000 concurrent checkout requests for 50 items without overselling?',
    ['Atomic conditional decrement ($gte)', 'Distributed Redis lock (Redlock)', 'Lua script in Redis', 'Two-phase reservation with TTL'],
    ['Reading inventory into Express memory, checking if > 0, and then updating MongoDB (classic TOCTOU race condition).'],
    ['Executes atomic Lua script in Redis (decrby if stock >= qty) or atomic MongoDB findOneAndUpdate({ _id, stock: { $gte: qty } }, { $inc: { stock: -qty } }).', 'Places temporary 10-minute reservation with TTL.'],
    'Why will if (item.stock > 0) item.stock--; await item.save() oversell 50 items to 5,000 customers during a flash sale?',
    'A simple check-then-act pattern creates a Time-Of-Check to Time-Of-Use (TOCTOU) race condition: 1,000 requests read stock: 50 at the exact same millisecond, all evaluate true, and all decrement to 49, overselling the product. Solution: 1) Ultra-fast reservation tier in Redis using an atomic Lua script: if redis.call("get", key) >= qty then return redis.call("decrby", key, qty) else return -1 end; 2) In MongoDB, use atomic conditional update: Product.findOneAndUpdate({ _id, stock: { $gte: qty } }, { $inc: { stock: -qty } }); 3) Return reservation token with 10-minute TTL; if payment uncompleted, atomic increment releases stock.'
  ),
  q('mern-hard-5', 'MERN Stack', 'Hard', 'End-to-End WebSocket Scaling & Redis Adapter',
    'How do you scale a real-time MERN application with Socket.io across 20 clustered Node.js server instances behind an AWS Application Load Balancer?',
    ['Sticky sessions (session affinity)', 'Socket.io Redis Streams Adapter', 'WebSocket upgrade handshake', 'Cross-instance broadcast'],
    ['Not enabling sticky sessions on the load balancer, causing HTTP long-polling handshake requests to hit different servers and fail.', 'Not using a Redis adapter, so users on server A cannot message users on server B.'],
    ['Explains ALB sticky sessions are required during HTTP polling upgrade phase.', 'Explains @socket.io/redis-adapter connects all 20 server instances via Redis Pub/Sub/Streams so events broadcast to all connected clients across the entire fleet.'],
    'Why do WebSocket connections fail to establish when you scale an Express Socket.io server from 1 container to 5 containers behind a load balancer?',
    '1) Handshake Failure: Socket.io begins with HTTP long-polling before upgrading to WebSocket. If the load balancer uses round-robin without Sticky Sessions (Session Affinity), handshake requests hit different server instances, which do not recognize the handshake session ID and throw 400 Bad Request. 2) Inter-Instance Communication: Each container only holds sockets connected to its own memory. By attaching @socket.io/redis-adapter, whenever server A emits a message to room "chat-101", it publishes to Redis, which broadcasts the event to servers B, C, D, and E to deliver to their locally connected clients.'
  )
];

// Write MERN
writeTopicFile('mern.ts', 'mernQuestions', mernBeg, mernMed, mernHard);

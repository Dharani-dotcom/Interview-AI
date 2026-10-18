import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const mernQuestions: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: [
  {
    "id": "mern-beg-1",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "Full Stack Architecture",
    "question": "What is the MERN Stack, what does each letter stand for, and how do the four technologies collaborate in an application?",
    "keyConcepts": [
      "MongoDB, Express, React, Node",
      "Client-Server separation",
      "RESTful API communication",
      "JSON as universal data exchange"
    ],
    "commonWeakSpots": [
      "Not understanding the distinction between Node.js (runtime) and Express (framework).",
      "Thinking React queries MongoDB directly."
    ],
    "strongIndicators": [
      "Clearly articulates: React (Client UI), Node/Express (Server REST API), MongoDB (Document Database).",
      "Highlights universal JavaScript across all tiers."
    ],
    "hint": "Trace a user click in React all the way to a database read and back to the screen.",
    "sampleGoodAnswer": "MERN stands for MongoDB (NoSQL document database), Express.js (minimalist web server framework), React (declarative client-side UI library), and Node.js (asynchronous JavaScript runtime). React renders the interactive browser UI and initiates asynchronous HTTP requests with JSON payloads to the Express/Node.js backend. Express parses the request, executes business logic, communicates with MongoDB via Mongoose or the native driver to persist/retrieve documents, and returns a JSON response that updates React state."
  },
  {
    "id": "mern-beg-2",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "Project Structure",
    "question": "How do you structure a production-grade MERN stack codebase (monorepo vs separate client/server repositories)?",
    "keyConcepts": [
      "Monorepo vs Multi-repo",
      "Client and Server separation",
      "Shared TypeScript types",
      "Package scripts and concurrently"
    ],
    "commonWeakSpots": [
      "Mixing client and server node_modules together in a single messy root folder.",
      "Not separating environment variables between frontend and backend."
    ],
    "strongIndicators": [
      "Explains structured monorepo: /client (Vite/React), /server (Express/Node), and /shared (types, interfaces).",
      "Mentions npm workspaces or concurrently."
    ],
    "hint": "Where should your React frontend live relative to your Express backend in a modern Git repository?",
    "sampleGoodAnswer": "A production MERN stack typically uses a monorepo structured with npm/yarn workspaces: a root directory containing /client (Vite or Next.js React app with its own package.json), /server (Express API with its own package.json), and an optional /shared folder for shared TypeScript interfaces and validation schemas. The root package.json utilizes scripts with concurrently to spin up both client on port 5173/3000 and server on port 5000 in development."
  },
  {
    "id": "mern-beg-3",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "API Communication",
    "question": "How does a React application communicate with an Express backend using Axios or fetch, and how are HTTP errors handled?",
    "keyConcepts": [
      "fetch API vs Axios",
      "Async/await",
      "Handling non-2xx status codes",
      "Loading and error state indicators"
    ],
    "commonWeakSpots": [
      "Assuming fetch() rejects the promise on HTTP 404 or 500 status codes (it only rejects on network failure!)."
    ],
    "strongIndicators": [
      "Explains that fetch() requires checking res.ok before parsing JSON.",
      "Praises Axios interceptors and automatic JSON parsing."
    ],
    "hint": "Why does fetch('/api/users') NOT trigger a catch block when the backend returns a 500 Internal Server Error?",
    "sampleGoodAnswer": "React components make asynchronous HTTP requests using fetch() or Axios. A critical detail with fetch() is that it only rejects a promise on network failure or DNS errors; for HTTP 404 or 500 errors, fetch resolves successfully and requires checking if (!response.ok) throw new Error(). Axios automatically throws on HTTP status outside 2xx, handles JSON serialization automatically, and supports request/response interceptors for attaching auth tokens."
  },
  {
    "id": "mern-beg-4",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "State & Data Flow",
    "question": "How is data passed from a MongoDB collection through Express and rendered into a React component?",
    "keyConcepts": [
      "Mongoose Model query",
      "Express res.json()",
      "React useEffect data fetching",
      "useState hook re-render"
    ],
    "commonWeakSpots": [
      "Directly embedding MongoDB ObjectIds in React without stringifying or handling loading states before data arrives."
    ],
    "strongIndicators": [
      "Traces lifecycle: 1) Component mounts; 2) useEffect calls API; 3) Express queries MongoDB via Mongoose; 4) Returns JSON; 5) setUsers(data) updates state and re-renders component."
    ],
    "hint": "Walk through the full code path from Mongoose Post.find() to rendering <PostCard /> in React.",
    "sampleGoodAnswer": "1) On component mount, React useEffect invokes fetch('/api/posts'); 2) Express receives GET /api/posts and executes async route handler: const posts = await Post.find().lean(); res.json(posts); 3) Node streams JSON over HTTP; 4) React receives the response, parses the JSON array, and calls setPosts(data); 5) React reconciliation triggers a re-render, mapping over posts to render <PostCard key={post._id} post={post} />."
  },
  {
    "id": "mern-beg-5",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "CORS in MERN",
    "question": "Why is CORS configuration necessary in a MERN application during local development, and what is the Vite/Webpack dev server proxy?",
    "keyConcepts": [
      "Different ports (localhost:3000 vs localhost:5000)",
      "Same-Origin Policy",
      "Vite proxy configuration",
      "Eliminating CORS in development"
    ],
    "commonWeakSpots": [
      "Setting Access-Control-Allow-Origin: * in production backend instead of using domain whitelist or reverse proxy."
    ],
    "strongIndicators": [
      "Explains configuring Vite proxy (server.proxy: { '/api': 'http://localhost:5000' }) redirects /api calls through the dev server, bypassing browser CORS entirely during development."
    ],
    "hint": "Why does calling fetch('http://localhost:5000/api') from React on localhost:3000 fail with a CORS error, and how does a proxy solve it?",
    "sampleGoodAnswer": "Because React runs on one origin (http://localhost:5173 or 3000) and Express runs on another (http://localhost:5000), browser Same-Origin Policy blocks client requests unless CORS is explicitly enabled on Express via cors(). Alternatively, configuring a dev proxy in vite.config.ts (proxy: { '/api': 'http://localhost:5000' }) allows React to make requests to relative paths (/api/users), which the Vite dev server forwards to Express server-to-server, completely avoiding browser CORS issues."
  },
  {
    "id": "mern-beg-6",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "Environment Configuration",
    "question": "How do environment variables differ between the React client and the Express backend in a MERN app?",
    "keyConcepts": [
      "Server process.env secrets",
      "Client build-time embedding (VITE_ / REACT_APP_)",
      "Secret leakage prevention",
      "Public vs private variables"
    ],
    "commonWeakSpots": [
      "Putting private API keys, database passwords, or JWT secrets in client React .env files where they get bundled into browser JavaScript!"
    ],
    "strongIndicators": [
      "Emphasizes client environment variables (VITE_*) are baked into publicly visible browser bundles during build.",
      "States server process.env retains secrets securely in server runtime."
    ],
    "hint": "Why must you NEVER put your MongoDB connection string or Stripe Secret Key in a React frontend .env file?",
    "sampleGoodAnswer": "Server-side environment variables (loaded via dotenv into process.env in Node) stay on the server machine and can securely store secrets like database credentials and JWT secret keys. Client-side variables (prefixed with VITE_ or REACT_APP_) are statically replaced into plain JavaScript text during the build process and are completely visible to anyone inspecting browser network/sources. Storing secret keys in frontend code compromises your entire infrastructure."
  },
  {
    "id": "mern-beg-7",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "Forms & Mutations",
    "question": "How do you submit a form in React (e.g. User Registration), send it via POST to Express, validate it with Mongoose, and return feedback?",
    "keyConcepts": [
      "e.preventDefault()",
      "Controlled form state",
      "Express route validation",
      "Mongoose model save",
      "Success/Error toast"
    ],
    "commonWeakSpots": [
      "Failing to call e.preventDefault(), causing the browser to submit native GET/POST and reload the page."
    ],
    "strongIndicators": [
      "Handles loading spinner, disables submit button during in-flight request, captures 400 validation error responses, and updates UI feedback."
    ],
    "hint": "What happens when you click <button type='submit'> if you forget e.preventDefault() in React?",
    "sampleGoodAnswer": "In React: 1) Form onSubmit handler calls e.preventDefault() to stop native page reload; 2) Gathers form state and sends POST with JSON body via fetch/axios; 3) Express receives payload, validates input schema, and executes await User.create({ ... }); 4) If validation fails (e.g. duplicate email), Express returns 400 Bad Request with error details; 5) React catches the error and displays inline validation warnings; if 201 Created, React clears fields and redirects."
  },
  {
    "id": "mern-beg-8",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "Authentication Overview",
    "question": "What is the standard authentication workflow in a MERN stack application (Registration, Login, Token generation)?",
    "keyConcepts": [
      "Bcrypt password hashing",
      "JWT token generation on login",
      "Authorization Bearer header / HttpOnly cookie",
      "Protected route wrapper in React"
    ],
    "commonWeakSpots": [
      "Storing passwords in plaintext in MongoDB without bcrypt hashing."
    ],
    "strongIndicators": [
      "Details: User registers -> server hashes password with bcrypt (salt rounds 10+) -> saves to Mongo -> user logs in -> server compares hash -> issues JWT -> client stores token and wraps routes in <ProtectedRoute />."
    ],
    "hint": "Why is storing plain text passwords in MongoDB a violation of security standards, and what library is used to hash them?",
    "sampleGoodAnswer": "Authentication workflow: 1) Register: Client sends email/password; server hashes password using bcrypt (with salt rounds) before saving to MongoDB; 2) Login: Server finds user by email, verifies password via bcrypt.compare(); if valid, signs a JWT containing userId and role; 3) Response: Returns JWT to client in an HttpOnly cookie or auth response; 4) Client uses a React ProtectedRoute component to verify login state and attach token to outgoing requests."
  },
  {
    "id": "mern-beg-9",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "CRUD Implementation",
    "question": "Walk through implementing a complete CRUD endpoint set for 'Tasks' across React, Express, and MongoDB.",
    "keyConcepts": [
      "Create (POST /api/tasks)",
      "Read (GET /api/tasks)",
      "Update (PATCH /api/tasks/:id)",
      "Delete (DELETE /api/tasks/:id)",
      "Optimistic UI in React"
    ],
    "commonWeakSpots": [
      "Using GET for deleting records (e.g. /api/tasks/delete?id=1).",
      "Forgetting :id route parameter on updates and deletes."
    ],
    "strongIndicators": [
      "Lists REST routes (GET, POST, PATCH, DELETE) in Express router, Mongoose methods (find, create, findByIdAndUpdate, findByIdAndDelete), and state synchronization in React."
    ],
    "hint": "What are the 4 HTTP methods and endpoints you would define for managing tasks in a RESTful MERN app?",
    "sampleGoodAnswer": "1) Create: React sends POST /api/tasks with { title }; Express executes await Task.create(req.body) returning 201; 2) Read: React calls GET /api/tasks; Express runs Task.find() returning 200; 3) Update: React sends PATCH /api/tasks/:id with { completed: true }; Express runs Task.findByIdAndUpdate(req.params.id, req.body, { new: true }); 4) Delete: React sends DELETE /api/tasks/:id; Express runs Task.findByIdAndDelete(req.params.id) returning 204. React updates local state array accordingly."
  },
  {
    "id": "mern-beg-10",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "MongoDB Connection in Node",
    "question": "How do you connect an Express application to MongoDB Atlas using Mongoose and handle connection errors?",
    "keyConcepts": [
      "mongoose.connect()",
      "Connection URI string",
      "Error event handlers",
      "Environment variable protection"
    ],
    "commonWeakSpots": [
      "Hardcoding mongodb+srv://username:password in source code instead of process.env.MONGODB_URI."
    ],
    "strongIndicators": [
      "Shows async connection: await mongoose.connect(process.env.MONGODB_URI); console.log('MongoDB Connected'); before listening on HTTP port."
    ],
    "hint": "What happens if MongoDB is down when your Express server starts, and how should your code handle it?",
    "sampleGoodAnswer": "You connect using mongoose.connect(process.env.MONGODB_URI): try { await mongoose.connect(process.env.MONGODB_URI); console.log('MongoDB Connected successfully'); app.listen(PORT); } catch (err) { console.error('Database connection failed', err); process.exit(1); }. Listening to mongoose.connection.on('error', err => ...) ensures runtime database disconnections are logged and reconnected automatically."
  },
  {
    "id": "mern-beg-11",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "Pagination in MERN",
    "question": "How do you implement pagination across the MERN stack (backend query with limit/skip and frontend page controls)?",
    "keyConcepts": [
      "limit & skip in Mongoose",
      "Total count query (countDocuments)",
      "Total pages calculation",
      "React pagination UI"
    ],
    "commonWeakSpots": [
      "Calculating total pages in React without having the server return total item count."
    ],
    "strongIndicators": [
      "Implements GET /api/items?page=1&limit=10. Express queries Item.find().skip((page-1)*limit).limit(limit) and Item.countDocuments(), returning { items, totalPages, currentPage }."
    ],
    "hint": "Why must the Express API return both the current page array AND the total document count to React?",
    "sampleGoodAnswer": "For effective pagination, React needs both the page items and metadata to calculate total pages. Express handles GET /api/posts?page=1&limit=10: const page = parseInt(req.query.page) || 1; const limit = parseInt(req.query.limit) || 10; const [posts, total] = await Promise.all([Post.find().skip((page-1)*limit).limit(limit), Post.countDocuments()]); res.json({ posts, totalPages: Math.ceil(total / limit), currentPage: page }); React renders page numbers and disables Next button when page === totalPages."
  },
  {
    "id": "mern-beg-12",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "Search & Filtering",
    "question": "How do you build a real-time search input in React that filters documents in MongoDB via an Express query?",
    "keyConcepts": [
      "Debounce input (useDebounce)",
      "Express regex or text query",
      "Mongoose query builder",
      "Race condition mitigation"
    ],
    "commonWeakSpots": [
      "Firing an HTTP API request to Express on every single keystroke without debouncing, hammering the backend server."
    ],
    "strongIndicators": [
      "Uses custom useDebounce hook (300ms) in React before calling API.",
      "Express queries Post.find({ title: { $regex: search, $options: 'i' } })."
    ],
    "hint": "Why should you debounce search inputs in React before sending queries to your Express/Mongo backend?",
    "sampleGoodAnswer": "Firing an API request on every character typed sends 10 unnecessary HTTP requests while typing a single word, overloading MongoDB and creating race conditions where an earlier slow request overwrites a newer fast response. Best practice is to debounce user input in React using a 300ms timer (via useDebounce). Express then runs a case-insensitive regex or $text index search: const query = req.query.search ? { title: { $regex: req.query.search, $options: 'i' } } : {}; const results = await Product.find(query);."
  },
  {
    "id": "mern-beg-13",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "Production Deployment",
    "question": "How is a MERN application built and deployed in production (e.g. Render, Railway, AWS, or Vercel + Atlas)?",
    "keyConcepts": [
      "npm run build in client",
      "Express serving static client/dist",
      "Single domain deployment vs separate API/frontend",
      "MongoDB Atlas cloud database"
    ],
    "commonWeakSpots": [
      "Deploying dev server (vite or npm start with react-scripts) in production instead of optimized production static build."
    ],
    "strongIndicators": [
      "Explains building React to /dist via vite build, and configuring Express to serve static files with app.use(express.static('../client/dist')) with wildcard fallback to index.html."
    ],
    "hint": "How can you serve both your React frontend and your Express API from a single server port in production?",
    "sampleGoodAnswer": "In production: 1) MongoDB runs on MongoDB Atlas cloud; 2) The React app is compiled to static HTML/JS/CSS bundles via npm run build in client directory; 3) Express serves API routes under /api/* and mounts the compiled client build via express.static(path.join(__dirname, '../client/dist')); 4) A catch-all route app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html'))) ensures React client-side routing works smoothly."
  },
  {
    "id": "mern-beg-14",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "Component Design in MERN",
    "question": "How do you handle Loading Skeletons and Empty States in React while waiting for Express API responses?",
    "keyConcepts": [
      "Skeleton loaders vs spinners",
      "Empty state messaging with action buttons",
      "User experience (UX) perception",
      "Error retry buttons"
    ],
    "commonWeakSpots": [
      "Leaving blank white screens while fetching data, causing users to think the application froze."
    ],
    "strongIndicators": [
      "Demonstrates state pattern: { loading, error, data } with skeleton placeholders during loading and friendly illustration/button on empty array."
    ],
    "hint": "Why are skeleton screens preferred over a single center spinner for data-heavy dashboard views?",
    "sampleGoodAnswer": "Blank screens or generic spinners increase perceived wait time and cause layout shift when data suddenly renders. In MERN dashboards, when status === 'loading', React renders skeleton placeholders that mirror the exact card/table layout. If data.length === 0, it renders an Empty State with a clear call-to-action ('No projects yet. Create your first project'). If an error occurs, it displays a friendly error banner with a 'Retry' button."
  },
  {
    "id": "mern-beg-15",
    "topic": "MERN Stack",
    "difficulty": "Beginner",
    "category": "File Handling in MERN",
    "question": "How do you upload an image (e.g. User Avatar) in a MERN stack application from React to Cloud Storage (Cloudinary / S3)?",
    "keyConcepts": [
      "FormData object in React",
      "Multer in Express",
      "Direct S3 / Cloudinary upload",
      "Saving cloud URL to MongoDB"
    ],
    "commonWeakSpots": [
      "Converting 10MB images into Base64 strings and saving them directly into MongoDB documents."
    ],
    "strongIndicators": [
      "Explains React sends FormData with file payload.",
      "Express parses with Multer and streams to Cloudinary/AWS S3, saving only the secure HTTPS image URL into the user document in MongoDB."
    ],
    "hint": "Why should you store images in AWS S3 or Cloudinary and only save their URLs in MongoDB instead of storing binary data in the database?",
    "sampleGoodAnswer": "Storing raw image binary data directly in MongoDB bloats document size, exhausts RAM cache, and hits the 16MB document size limit. The standard MERN pattern: 1) React user selects image; React appends it to new FormData() and POSTs to Express; 2) Express uses Multer to intercept file stream and uploads it to AWS S3 or Cloudinary; 3) Cloud storage returns a CDN URL; 4) Express saves { avatarUrl: 'https://...' } in the MongoDB User document and returns user object to React."
  }
],
  medium: [
  {
    "id": "mern-med-1",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Secure Authentication & Refresh Tokens",
    "question": "How do you architect a secure dual-token authentication system (Short-lived Access Token + HttpOnly Refresh Token) across MERN?",
    "keyConcepts": [
      "Access token (15m expiry) in memory",
      "Refresh token (7d expiry) in HttpOnly SameSite cookie",
      "Silent refresh / interceptor",
      "Token rotation & XSS/CSRF defense"
    ],
    "commonWeakSpots": [
      "Storing JWT access tokens in localStorage where they are vulnerable to XSS token theft.",
      "Using long-lived 30-day access tokens."
    ],
    "strongIndicators": [
      "Explains Access Token is held in React memory/state; Refresh Token is stored in HttpOnly, Secure, SameSite=Strict cookie.",
      "Uses Axios interceptor to catch 401 and invoke /refresh-token automatically."
    ],
    "hint": "Where should you store JWTs in React to be safe from both XSS and CSRF?",
    "sampleGoodAnswer": "A dual-token system provides the highest security: 1) Short-lived Access Token (15 min) stored exclusively in React memory\u2014immune to localStorage XSS theft; 2) Long-lived Refresh Token (7 days) stored in an HttpOnly, Secure, SameSite=Strict cookie\u2014inaccessible to client JavaScript; 3) An Axios response interceptor intercepts 401 Unauthorized responses, silently calls POST /api/auth/refresh to exchange the valid refresh cookie for a fresh access token, and retries the original failed request without interrupting the user."
  },
  {
    "id": "mern-med-2",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Global State & Caching",
    "question": "Compare Redux Toolkit (RTK) vs TanStack Query (React Query) for managing server state and cache in a MERN stack app.",
    "keyConcepts": [
      "Server state vs Client UI state",
      "TanStack Query automatic caching & refetching",
      "RTK Slice boilerplate reduction",
      "Optimistic cache updates"
    ],
    "commonWeakSpots": [
      "Using Redux for fetching and storing server data with manual loading/error/data boilerplate instead of TanStack Query."
    ],
    "strongIndicators": [
      "Differentiates client state (isSidebarOpen, theme) suited for Zustand/Redux from server state (cached API responses, polling, pagination) suited for TanStack Query."
    ],
    "hint": "Why do modern MERN teams prefer TanStack Query over standard Redux for data fetching and caching?",
    "sampleGoodAnswer": "Server state (data from MongoDB/Express) is fundamentally asynchronous, shared, and prone to going stale. Managing it in Redux requires massive boilerplate. TanStack Query provides out-of-the-box declarative caching, background refetching on window focus, automatic retry, pagination caching, and optimistic updates. Modern MERN apps use TanStack Query for server state and lightweight stores (Zustand) for purely local UI state."
  },
  {
    "id": "mern-med-3",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Real-Time Integration",
    "question": "How do you integrate Socket.io into a MERN application for real-time chat or live notifications, syncing with MongoDB?",
    "keyConcepts": [
      "Socket.io client & server",
      "Connection authentication with JWT",
      "Room joining (socket.join(room))",
      "Persisting to MongoDB then emitting to room"
    ],
    "commonWeakSpots": [
      "Emitting messages to the room before saving to MongoDB, risking lost messages if database write fails."
    ],
    "strongIndicators": [
      "Authenticates socket handshake using JWT.",
      "Persists message to MongoDB first, and only upon successful commit broadcasts the populated message to the specific room."
    ],
    "hint": "How do you authenticate a WebSocket connection in Socket.io using the user\u2019s JWT in a MERN app?",
    "sampleGoodAnswer": "1) Server: Socket.io attaches to the Express HTTP server and uses auth middleware (io.use((socket, next) => verifyJWT(socket.handshake.auth.token))); 2) Client: React initializes socket passing token: io({ auth: { token } }); 3) When a user sends a message: client emits 'sendMessage', { roomId, text }; 4) Server receives event, saves document to MongoDB via Message.create(), and on successful write emits 'receiveMessage' to socket.to(roomId); 5) React client listens on socket.on('receiveMessage') and updates message list state."
  },
  {
    "id": "mern-med-4",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "SSR & Hybrid Frameworks",
    "question": "How does Next.js compare to a traditional decoupled MERN stack (Vite React + Express API)? When would you migrate to Next.js?",
    "keyConcepts": [
      "Decoupled MERN vs Integrated Next.js",
      "SEO & First Contentful Paint",
      "Server Components & API Routes",
      "Deployment operational complexity"
    ],
    "commonWeakSpots": [
      "Believing standard React SPAs can achieve optimal SEO for e-commerce products without SSR or pre-rendering."
    ],
    "strongIndicators": [
      "Articulates trade-offs: Decoupled MERN allows independent backend scaling, multi-client support (mobile apps), and complete framework freedom; Next.js provides hybrid SSR/SSG/ISR for search indexing and zero-bundle server components."
    ],
    "hint": "Why would a company migrate their public e-commerce store from Vite+Express to Next.js, while keeping internal dashboards on Vite+Express?",
    "sampleGoodAnswer": "A decoupled MERN stack (Vite SPA + Express API) is ideal for internal SaaS dashboards, authenticated portals, and mobile-backend APIs where SEO is irrelevant and client-side transitions are rapid. Next.js combines React with server-side rendering (SSR/SSG), generating full HTML on the server. For public consumer products, e-commerce, and blogs where SEO search indexing, OpenGraph preview cards, and First Contentful Paint are revenue-critical, migrating to Next.js is advantageous."
  },
  {
    "id": "mern-med-5",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Mongoose Middleware & Business Logic",
    "question": "How do Mongoose Pre and Post hooks (middleware) work? Give real-world examples for password hashing and cascade deletions.",
    "keyConcepts": [
      "pre('save') for bcrypt hashing",
      "post('save') for audit events",
      "pre('deleteOne') for cascading deletes",
      "next() callback vs async/await"
    ],
    "commonWeakSpots": [
      "Hashing passwords in pre('save') without checking this.isModified('password'), resulting in re-hashing already hashed passwords on profile updates!"
    ],
    "strongIndicators": [
      "Includes if (!this.isModified('password')) return next(); before hashing.",
      "Shows cascading deletion of associated posts when a user document is deleted."
    ],
    "hint": "What critical bug happens in Mongoose pre-save password hashing if you forget if (!this.isModified('password'))?",
    "sampleGoodAnswer": "Mongoose hooks execute before or after document operations. 1) Password Hashing: userSchema.pre('save', async function(next) { if (!this.isModified('password')) return next(); this.password = await bcrypt.hash(this.password, 12); }); Forgetting isModified() re-hashes the already-hashed string whenever a user updates an unrelated field (e.g. bio), corrupting login! 2) Cascade Deletion: userSchema.pre('deleteOne', { document: true }, async function() { await Post.deleteMany({ author: this._id }); }); ensures referential cleanup."
  },
  {
    "id": "mern-med-6",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Input Validation Across Tiers",
    "question": "How do you implement DRY schema validation across both React and Express using Zod and TypeScript?",
    "keyConcepts": [
      "Shared Zod schemas",
      "z.infer<typeof schema>",
      "React Hook Form integration (@hookform/resolvers/zod)",
      "Express validation middleware"
    ],
    "commonWeakSpots": [
      "Duplicating regex and validation logic manually in React components and again in Express controllers, causing divergence bugs."
    ],
    "strongIndicators": [
      "Creates a shared npm package or /shared folder exporting a single Zod schema and TypeScript type. Both client form and backend middleware import the identical schema."
    ],
    "hint": "How can you guarantee that validation rules never drift between your React frontend and Express backend?",
    "sampleGoodAnswer": "By defining shared Zod validation schemas in a shared workspace package: 1) Export schema: export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) }); 2) Export type: export type LoginInput = z.infer<typeof loginSchema>; 3) Frontend uses React Hook Form with zodResolver(loginSchema) for instant client-side errors; 4) Backend Express uses validate(loginSchema) middleware. Both layers enforce identical rules from a single source of truth."
  },
  {
    "id": "mern-med-7",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Performance & Lean Queries",
    "question": "What does Mongoose .lean() do, and why should it be used for read-only queries in high-traffic MERN applications?",
    "keyConcepts": [
      "BSON to plain JavaScript object (POJO)",
      "Skipping Mongoose Document hydration",
      "Memory and CPU reduction (3x-5x faster)",
      "Disabling save() and virtuals"
    ],
    "commonWeakSpots": [
      "Using .lean() and then expecting doc.save() or virtual getters to function."
    ],
    "strongIndicators": [
      "Explains Mongoose standard queries instantiate full Mongoose Document instances with change-tracking, getters, setters, and internal state.",
      "Highlights .lean() returns raw JSON objects, reducing RAM by 70% and accelerating API response times."
    ],
    "hint": "Why is Post.find().lean() up to 5x faster than Post.find() in Express?",
    "sampleGoodAnswer": "By default, Mongoose wraps query results into Mongoose Document instances equipped with internal change-tracking, getters, setters, and prototype methods (save, validate). This incurs significant memory and CPU overhead. Adding .lean() instructs Mongoose to bypass document hydration and return raw, plain JavaScript objects directly from the BSON driver. This reduces heap allocations by ~70% and speeds up JSON serialization by 3x-5x for read-only endpoints."
  },
  {
    "id": "mern-med-8",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Role-Based Navigation in React",
    "question": "How do you implement Dynamic Role-Based Access Control (RBAC) in React routes and UI components matching Express authorization?",
    "keyConcepts": [
      "Role-based routing in React Router",
      "Custom <RequireAuth allowedRoles={['admin']} /> wrapper",
      "Conditional UI rendering based on permissions",
      "Token decoding in state"
    ],
    "commonWeakSpots": [
      "Relying only on client-side route hiding without securing backend Express API endpoints."
    ],
    "strongIndicators": [
      "Emphasizes frontend route guarding is for UX only; true security is enforced by Express backend middleware.",
      "Demonstrates higher-order route wrapper checking user.roles."
    ],
    "hint": "If a malicious user modifies their role to 'admin' in React DevTools, why shouldn\u2019t they be able to delete records?",
    "sampleGoodAnswer": "Client-side security is strictly for User Experience (UX), preventing unauthorized navigation: a <RequireAuth allowedRoles={['admin']}> component checks user.role in React state and redirects unauthorized users. However, true security must be enforced on the Express backend via authorizeRoles('admin') middleware. Even if a user tampers with React state in browser memory, any API request they send carries their signed JWT, which the backend cryptographically verifies, rejecting unauthorized operations with 403 Forbidden."
  },
  {
    "id": "mern-med-9",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Microservices vs Monolith MERN",
    "question": "How do you transition a monolithic MERN stack into a distributed microservices architecture (API Gateway, separate domain services)?",
    "keyConcepts": [
      "BFF (Backend For Frontend) / API Gateway",
      "Decomposing collections into isolated databases",
      "Event-driven messaging (RabbitMQ / Kafka)",
      "Shared auth token verification"
    ],
    "commonWeakSpots": [
      "Splitting code into multiple microservices while keeping all services querying a single shared MongoDB database (distributed monolith anti-pattern)."
    ],
    "strongIndicators": [
      "Explains each microservice owns its private MongoDB database.",
      "Uses an API Gateway to route React requests, and asynchronous event buses for cross-service eventual consistency."
    ],
    "hint": "What is a 'Distributed Monolith' and why is sharing a single MongoDB database across 5 microservices an anti-pattern?",
    "sampleGoodAnswer": "A distributed monolith occurs when a team splits an Express app into multiple services but keeps a shared MongoDB database, coupling schemas and causing deployments to break each other. True microservice transition: 1) Deploy an API Gateway as the single entrypoint for React; 2) Decompose services by domain (Auth Service, Product Service, Order Service), each with its own isolated MongoDB database; 3) Use asynchronous messaging (Kafka, RabbitMQ) for event-driven updates rather than synchronous HTTP chaining."
  },
  {
    "id": "mern-med-10",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Optimistic UI Updates",
    "question": "How do you implement Optimistic Updates in a MERN stack application (e.g. toggling a 'Like' button or updating a task)?",
    "keyConcepts": [
      "Instant UI update in React",
      "Background API call to Express",
      "Rollback on network error",
      "TanStack Query onMutate snapshot"
    ],
    "commonWeakSpots": [
      "Updating UI only after waiting 500ms for the server response, causing sluggish user interaction."
    ],
    "strongIndicators": [
      "Details TanStack Query onMutate: 1) Cancel queries; 2) Save snapshot of previous data; 3) Immediately update local cache with predicted result; 4) If API fails in onError, restore snapshot; 5) In onSettled, invalidate query."
    ],
    "hint": "How do modern apps like Twitter/X make the 'Like' button heart turn red with 0ms latency?",
    "sampleGoodAnswer": "Optimistic UI provides zero-latency feedback: when a user clicks 'Like', React immediately updates local state or TanStack Query cache before making the network request. In TanStack Query: onMutate snapshots previous cache data and optimistically increments the like count; the asynchronous PATCH request is sent to Express; if the request succeeds, cache is finalized; if the network fails or server returns 500, onError rolls back the cache to the saved snapshot and displays a retry toast."
  },
  {
    "id": "mern-med-11",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Automated Testing Across MERN",
    "question": "How do you architect a comprehensive automated testing suite for a MERN stack app (Vitest for React, Supertest for Express, MongoMemoryServer)?",
    "keyConcepts": [
      "Vitest / React Testing Library for frontend",
      "Supertest for Express API integration",
      "mongodb-memory-server for isolated DB testing",
      "Playwright / Cypress for end-to-end"
    ],
    "commonWeakSpots": [
      "Connecting test suites to a live production or development MongoDB cluster, corrupting test data."
    ],
    "strongIndicators": [
      "Uses mongodb-memory-server to spin up an ephemeral in-memory MongoDB instance during backend tests, guaranteeing isolation and parallel test speed."
    ],
    "hint": "How do you test your Express and Mongoose endpoints without needing a live internet connection to MongoDB Atlas?",
    "sampleGoodAnswer": "A robust testing pyramid uses: 1) Frontend: Vitest and React Testing Library to test component rendering, user interactions, and mock API calls via Mock Service Worker (MSW); 2) Backend Integration: Supertest executes HTTP requests against the Express app while mongodb-memory-server boots an ephemeral, fast, in-memory MongoDB instance that resets between test suites; 3) End-to-End: Playwright tests critical user journeys in headless Chromium."
  },
  {
    "id": "mern-med-12",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "WebSockets Reconnection & Offline Sync",
    "question": "How do you handle client disconnections, network drops, and state re-synchronization in a real-time MERN chat app?",
    "keyConcepts": [
      "Socket.io auto-reconnect",
      "Heartbeat ping/pong",
      "Missed event polling / Last-Event-ID",
      "Client offline indicator"
    ],
    "commonWeakSpots": [
      "Assuming WebSocket connections remain open permanently without handling mobile network transitions."
    ],
    "strongIndicators": [
      "Listens to socket.on('disconnect') and socket.on('reconnect').",
      "Upon reconnection, client sends its lastReceivedMessageTimestamp to Express to fetch all missed messages from MongoDB."
    ],
    "hint": "When a mobile user enters an elevator and loses internet for 30 seconds, how do they receive messages sent while disconnected?",
    "sampleGoodAnswer": "When network drops, Socket.io fires disconnect and enters an automatic exponential-backoff reconnect loop. In React, track connection status in state to display a 'Reconnecting...' banner. Crucially, upon reconnection (socket.on('reconnect')), the client must query Express (GET /api/messages?since=lastTimestamp) or emit a sync event passing its latest message ID. Express queries MongoDB for messages created after that timestamp, seamlessly restoring missing messages."
  },
  {
    "id": "mern-med-13",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Secure Cookie Management",
    "question": "Explain the security flags for cookies in Express (HttpOnly, Secure, SameSite=Lax/Strict) and how they communicate with React.",
    "keyConcepts": [
      "HttpOnly prevents XSS access",
      "Secure enforces HTTPS",
      "SameSite=Lax vs Strict prevents CSRF",
      "credentials: 'include' / withCredentials: true"
    ],
    "commonWeakSpots": [
      "Forgetting withCredentials: true in Axios or credentials: 'include' in fetch, causing the browser to omit cookies on cross-origin requests."
    ],
    "strongIndicators": [
      "Explains HttpOnly prevents document.cookie access.",
      "Explains SameSite=Strict prevents cookie transmission on third-party links, mitigating CSRF.",
      "Notes frontend must pass withCredentials: true."
    ],
    "hint": "Why won\u2019t your React frontend send your authentication cookie to Express on localhost:5000 even though the cookie was set successfully?",
    "sampleGoodAnswer": "Cookies require specific flags: 1) HttpOnly ensures document.cookie in browser JavaScript cannot read the token, mitigating XSS token theft; 2) Secure ensures cookies are only transmitted over HTTPS; 3) SameSite=Lax/Strict prevents browser from sending cookies on cross-site requests, mitigating CSRF. When frontend and backend reside on different ports/domains, the frontend MUST explicitly set withCredentials: true (in Axios) or credentials: 'include' (in fetch); otherwise the browser suppresses cookies."
  },
  {
    "id": "mern-med-14",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Database Transactions in MERN Endpoints",
    "question": "How do you implement a multi-step checkout endpoint in MERN ensuring that Order Creation and Inventory Deduction are atomic?",
    "keyConcepts": [
      "Mongoose sessions (startSession)",
      "startTransaction & commitTransaction",
      "Inventory quantity check ($inc with -quantity)",
      "Automatic rollback on failure"
    ],
    "commonWeakSpots": [
      "Performing inventory deduction and order creation in separate independent queries without a transaction, leading to overselling inventory on server crashes."
    ],
    "strongIndicators": [
      "Executes both operations within a single Mongoose session with session.startTransaction(), rolling back all writes if any step fails."
    ],
    "hint": "If an order is saved but the payment or inventory deduction fails 10ms later, how do you prevent orphaned orders in MongoDB?",
    "sampleGoodAnswer": "Use a Mongoose ACID transaction with a session: const session = await mongoose.startSession(); session.startTransaction(); try { const product = await Product.findOneAndUpdate({ _id: productId, stock: { $gte: qty } }, { $inc: { stock: -qty } }, { session, new: true }); if (!product) throw new Error('Insufficient stock'); const order = await Order.create([{ userId, productId, qty }], { session }); await session.commitTransaction(); res.status(201).json(order); } catch (err) { await session.abortTransaction(); res.status(400).json({ error: err.message }); } finally { session.endSession(); }."
  },
  {
    "id": "mern-med-15",
    "topic": "MERN Stack",
    "difficulty": "Medium",
    "category": "Dockerizing MERN Applications",
    "question": "How do you dockerize a full MERN application with Dockerfile multi-stage builds and Docker Compose for local development and CI/CD?",
    "keyConcepts": [
      "Multi-stage Dockerfile (node:alpine)",
      "Docker Compose services (client, server, mongo)",
      "Volume mounting for hot-reloading",
      "Production lightweight image size"
    ],
    "commonWeakSpots": [
      "Copying node_modules from local machine into Docker image instead of running npm ci inside the container."
    ],
    "strongIndicators": [
      "Uses multi-stage build: Stage 1 builds React assets; Stage 2 serves with Nginx or Express.",
      "Configures docker-compose.yml linking client, server, and mongo with persistent volumes."
    ],
    "hint": "Why should you use multi-stage builds when containerizing a React and Express application?",
    "sampleGoodAnswer": "Multi-stage Docker builds separate build tooling from production runtime. For React: Stage 1 installs dependencies and runs npm run build using Node; Stage 2 copies only the compiled /dist folder into a tiny Nginx image (saving 800MB of devDependencies). For Express: Stage 1 compiles TypeScript; Stage 2 copies compiled JS and runs npm ci --only=production. docker-compose.yml orchestrates the React frontend, Express API, and local MongoDB container with bridge networking and healthchecks."
  }
],
  hard: [
  {
    "id": "mern-hard-1",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "BFF (Backend for Frontend) Pattern",
    "question": "How do you architect a high-scale Backend For Frontend (BFF) layer in Express to aggregate data for React web clients vs Mobile native apps?",
    "keyConcepts": [
      "BFF pattern",
      "GraphQL vs REST aggregation",
      "Payload tailoring & over-fetching reduction",
      "Downstream microservice orchestration"
    ],
    "commonWeakSpots": [
      "Forcing mobile apps with limited cellular bandwidth to call the exact same heavy web REST endpoints."
    ],
    "strongIndicators": [
      "Explains BFF acts as a tailored orchestration layer that aggregates multiple microservice calls, strips unneeded fields, transforms data formats, and delivers an optimized payload for specific client interfaces."
    ],
    "hint": "Why does Netflix utilize dedicated BFFs for Web, iOS, and Smart TV interfaces?",
    "sampleGoodAnswer": "A single general-purpose API forces clients to either over-fetch data or make multiple round-trip requests to stitch resources. A BFF (Backend For Frontend) provides client-specific Express adapter layers: the Web BFF aggregates multiple internal microservices and returns a comprehensive rich dataset for desktop displays; the Mobile BFF strips heavy descriptions, compresses images, and minimizes round-trips over mobile networks. It optimizes latency and decouples client UX from backend domain evolution."
  },
  {
    "id": "mern-hard-2",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Distributed Tracing & Correlation IDs",
    "question": "How do you trace a single user click in React through Express, down to MongoDB queries, and across third-party microservices using OpenTelemetry?",
    "keyConcepts": [
      "W3C TraceContext (traceparent)",
      "OpenTelemetry Web & Node SDKs",
      "Correlation ID propagation via Axios interceptors",
      "Database span instrumentation"
    ],
    "commonWeakSpots": [
      "Generating a new random ID on the server and losing the connection to the client user action that triggered it."
    ],
    "strongIndicators": [
      "Details React generating or injecting traceparent header via Axios interceptor.",
      "Express OpenTelemetry middleware extracts context, creates child span, instruments Mongoose queries, and forwards trace header to external microservices."
    ],
    "hint": "How can an engineer look at a slow request in Datadog/Jaeger and see the exact breakdown: React click (10ms) -> Express middleware (5ms) -> MongoDB query (120ms)?",
    "sampleGoodAnswer": "Using OpenTelemetry distributed tracing: 1) Client: OpenTelemetry Web auto-instruments user interactions (fetch/XHR), generating a trace ID and injecting the W3C traceparent header into outgoing requests; 2) Express: OpenTelemetry Node SDK extracts traceparent, creates a server span, and attaches req.id to logs; 3) Database: The MongoDB OpenTelemetry plugin instruments Mongoose, creating child spans recording database query duration and statement; 4) All spans share the same trace_id, visualizing the full distributed waterfall in Jaeger/Datadog."
  },
  {
    "id": "mern-hard-3",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "CQRS & Event Sourcing in MERN",
    "question": "How do you implement Command Query Responsibility Segregation (CQRS) in a MERN stack application using MongoDB for writes and Elasticsearch/Redis for reads?",
    "keyConcepts": [
      "CQRS pattern",
      "Write model (MongoDB) vs Read model (Elasticsearch/Redis)",
      "Change Streams / Kafka synchronization",
      "Sub-millisecond read scaling"
    ],
    "commonWeakSpots": [
      "Running complex full-text aggregations across 50M records directly on the primary write database."
    ],
    "strongIndicators": [
      "Explains separating write operations (Commands go to MongoDB with strict validation and ACID transactions) from read operations (Queries go to pre-aggregated read views in Redis or Elasticsearch synchronized via Change Streams)."
    ],
    "hint": "How does CQRS allow an e-commerce platform to handle 100,000 read queries per second while safeguarding order write integrity?",
    "sampleGoodAnswer": "In CQRS: 1) Command (Write) Path: React sends mutations (POST/PUT) to Express, which writes to MongoDB using strict schema validation and ACID transactions; 2) Sync: MongoDB Change Streams asynchronously capture write events and publish to Kafka/Redis, populating denormalized read-optimized indexes in Elasticsearch or Redis; 3) Query (Read) Path: React read requests query the fast read store directly. This completely decouples read and write scaling, eliminating read contention on the primary database."
  },
  {
    "id": "mern-hard-4",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "High-Concurrency Inventory Reservation",
    "question": "How do you design a flash-sale inventory reservation system in MERN handling 10,000 concurrent checkout requests for 50 items without overselling?",
    "keyConcepts": [
      "Atomic conditional decrement ($gte)",
      "Distributed Redis lock (Redlock)",
      "Lua script in Redis",
      "Two-phase reservation with TTL"
    ],
    "commonWeakSpots": [
      "Reading inventory into Express memory, checking if > 0, and then updating MongoDB (classic TOCTOU race condition)."
    ],
    "strongIndicators": [
      "Executes atomic Lua script in Redis (decrby if stock >= qty) or atomic MongoDB findOneAndUpdate({ _id, stock: { $gte: qty } }, { $inc: { stock: -qty } }).",
      "Places temporary 10-minute reservation with TTL."
    ],
    "hint": "Why will if (item.stock > 0) item.stock--; await item.save() oversell 50 items to 5,000 customers during a flash sale?",
    "sampleGoodAnswer": "A simple check-then-act pattern creates a Time-Of-Check to Time-Of-Use (TOCTOU) race condition: 1,000 requests read stock: 50 at the exact same millisecond, all evaluate true, and all decrement to 49, overselling the product. Solution: 1) Ultra-fast reservation tier in Redis using an atomic Lua script: if redis.call('get', key) >= qty then return redis.call('decrby', key, qty) else return -1 end; 2) In MongoDB, use atomic conditional update: Product.findOneAndUpdate({ _id, stock: { $gte: qty } }, { $inc: { stock: -qty } }); 3) Return reservation token with 10-minute TTL; if payment uncompleted, atomic increment releases stock."
  },
  {
    "id": "mern-hard-5",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "End-to-End WebSocket Scaling & Redis Adapter",
    "question": "How do you scale a real-time MERN application with Socket.io across 20 clustered Node.js server instances behind an AWS Application Load Balancer?",
    "keyConcepts": [
      "Sticky sessions (session affinity)",
      "Socket.io Redis Streams Adapter",
      "WebSocket upgrade handshake",
      "Cross-instance broadcast"
    ],
    "commonWeakSpots": [
      "Not enabling sticky sessions on the load balancer, causing HTTP long-polling handshake requests to hit different servers and fail.",
      "Not using a Redis adapter, so users on server A cannot message users on server B."
    ],
    "strongIndicators": [
      "Explains ALB sticky sessions are required during HTTP polling upgrade phase.",
      "Explains @socket.io/redis-adapter connects all 20 server instances via Redis Pub/Sub/Streams so events broadcast to all connected clients across the entire fleet."
    ],
    "hint": "Why do WebSocket connections fail to establish when you scale an Express Socket.io server from 1 container to 5 containers behind a load balancer?",
    "sampleGoodAnswer": "1) Handshake Failure: Socket.io begins with HTTP long-polling before upgrading to WebSocket. If the load balancer uses round-robin without Sticky Sessions (Session Affinity), handshake requests hit different server instances, which do not recognize the handshake session ID and throw 400 Bad Request. 2) Inter-Instance Communication: Each container only holds sockets connected to its own memory. By attaching @socket.io/redis-adapter, whenever server A emits a message to room 'chat-101', it publishes to Redis, which broadcasts the event to servers B, C, D, and E to deliver to their locally connected clients."
  },
  {
    "id": "mern-hard-6",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Zero-Downtime Database & API Cutover",
    "question": "How do you execute an Expand/Contract (Parallel Run) migration for a breaking database change across a live MERN stack?",
    "keyConcepts": [
      "Expand/Contract pattern",
      "Backward compatible API versioning",
      "Dual-read / Dual-write phase",
      "Feature flags"
    ],
    "commonWeakSpots": [
      "Renaming a MongoDB field or changing its data type simultaneously in client and server code, breaking clients during the deployment window."
    ],
    "strongIndicators": [
      "Outlines 4-step phased cutover: 1) Expand: add new field while reading old field; 2) Dual write: write to both fields; 3) Backfill historical documents; 4) Contract: update frontend to read new field and remove old field."
    ],
    "hint": "How do you rename a critical database field without taking down your mobile and web apps for a single second?",
    "sampleGoodAnswer": "The Expand and Contract pattern safely executes breaking schema changes: 1) Expand: Deploy backend code that writes to both old and new fields, but reads from old field if new is absent; 2) Backfill: Run a throttled background script to populate the new field across all historical MongoDB documents; 3) Switch: Deploy frontend and backend code to read exclusively from the new field; 4) Contract: Once all legacy clients are updated, remove the old field and deprecated code."
  },
  {
    "id": "mern-hard-7",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Memory & Event Loop Profiling in Full Stack Apps",
    "question": "How do you isolate whether a slow response is caused by React DOM rendering, Node.js event loop lag, or MongoDB disk I/O?",
    "keyConcepts": [
      "Server-Timing header",
      "Performance.mark / measure in React",
      "Clinic.js doctor / Flame for Node",
      "MongoDB query profiler"
    ],
    "commonWeakSpots": [
      "Guessing where latency originates without instrumenting each layer with metrics."
    ],
    "strongIndicators": [
      "Explains using the Server-Timing HTTP response header so Chrome DevTools Network tab displays exact breakdown of DB query, middleware, and serialization time alongside frontend render duration."
    ],
    "hint": "How can you expose backend execution metrics directly to the browser Network tab using the Server-Timing specification?",
    "sampleGoodAnswer": "You instrument each tier with metrics: 1) Database: MongoDB Profiler records query execution time; 2) Backend Middleware: Record hrtime before and after DB call and attach the standard Server-Timing header (e.g. Server-Timing: db;dur=45, app;dur=12); 3) Frontend: React DevTools and performance.measure() track reconciliation time. Inspecting Chrome DevTools Network tab instantly reveals whether the bottleneck is database query latency, Node serialization, network transit, or React DOM paint."
  },
  {
    "id": "mern-hard-8",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Server-Side Rendering & Hydration at Scale",
    "question": "What are the engineering challenges of implementing custom SSR for React inside an Express backend (ReactDOMServer.renderToPipeableStream)?",
    "keyConcepts": [
      "renderToPipeableStream",
      "Selective Hydration",
      "Streaming HTML response",
      "Data prefetching & state serialization (devalue / serialize-javascript)"
    ],
    "commonWeakSpots": [
      "Using legacy renderToString which blocks the Node event loop synchronously on large React component trees."
    ],
    "strongIndicators": [
      "Explains renderToPipeableStream streams HTML chunks as components resolve, allowing Suspense boundaries to load progressively without stalling TTFB."
    ],
    "hint": "Why did React 18 replace renderToString with renderToPipeableStream for server-side rendering in Node.js?",
    "sampleGoodAnswer": "Legacy renderToString was completely synchronous: it traversed the entire React component tree on the server thread, blocking Node\u2019s single event loop until the entire page HTML was generated. React 18\u2019s renderToPipeableStream enables streaming SSR with selective hydration: it sends the shell HTML immediately for fast TTFB, streams HTML chunks as async Suspense boundaries resolve, and allows the browser to hydrate interactive components before the rest of the HTML has finished streaming."
  },
  {
    "id": "mern-hard-9",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Micro-Frontends with MERN",
    "question": "How do you orchestrate a Micro-Frontend architecture consuming multiple independent Express microservices in an enterprise portal?",
    "keyConcepts": [
      "Webpack 5 Module Federation",
      "Single-SPA shell",
      "Cross-app state sharing",
      "Independent CI/CD pipelines"
    ],
    "commonWeakSpots": [
      "Allowing independent micro-frontend teams to load competing versions of React or Mongoose in memory."
    ],
    "strongIndicators": [
      "Configures Module Federation with shared: { react: { singleton: true, requiredVersion } }.",
      "Uses an API Gateway to route requests to respective Express backend domain services."
    ],
    "hint": "How do multiple development teams deploy separate parts of a unified React dashboard independently without rebuilding the whole app?",
    "sampleGoodAnswer": "Using Webpack Module Federation: a Shell container loads remote micro-apps dynamically at runtime. The host configuration specifies react and react-dom as singletons so only one runtime dispatcher exists. Each micro-frontend team develops, tests, and deploys their feature independently on their own CI/CD pipeline, communicating with dedicated Express microservices behind a unified API gateway."
  },
  {
    "id": "mern-hard-10",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Comprehensive Security Audit (OWASP Top 10)",
    "question": "How do you audit and harden a MERN stack application against the entire OWASP Top 10 vulnerabilities?",
    "keyConcepts": [
      "Broken Object Level Authorization (BOLA/IDOR)",
      "Security Misconfiguration",
      "Server-Side Request Forgery (SSRF)",
      "Injection & Sanitization",
      "Cryptographic Failures"
    ],
    "commonWeakSpots": [
      "Assuming authentication alone prevents Insecure Direct Object References (IDOR)."
    ],
    "strongIndicators": [
      "Emphasizes that every findById must verify ownership (e.g., Document.findOne({ _id: req.params.id, userId: req.user.id })).",
      "Enforces strict CORS, Helmet, Content Security Policy, rate limiting, and password salting with Argon2/Bcrypt."
    ],
    "hint": "How do you prevent an authenticated user from modifying someone else\u2019s document by simply guessing their MongoDB _id?",
    "sampleGoodAnswer": "This is BOLA/IDOR (Broken Object Level Authorization). Hardening measures: 1) Authorization: Never do findByIdAndUpdate(req.params.id, req.body). Always scope mutations to the authenticated user: findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, ...); 2) NoSQL Injection: Sanitize inputs with mongo-sanitize and validate with Zod; 3) XSS: React auto-escapes; enforce strict CSP headers; 4) CSRF: SameSite=Strict cookies; 5) Rate Limiting & Helmet on all Express entrypoints."
  },
  {
    "id": "mern-hard-11",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Distributed Session Management with Redis",
    "question": "How do you implement scalable Session Management in Express using connect-redis across horizontally autoscaling Kubernetes clusters?",
    "keyConcepts": [
      "express-session + connect-redis",
      "Redis Sentinel / Cluster for high availability",
      "Session serialization & TTL",
      "Race condition prevention on concurrent AJAX"
    ],
    "commonWeakSpots": [
      "Storing sessions in server memory (MemoryStore) which causes users to be logged out randomly when requests hit different pods."
    ],
    "strongIndicators": [
      "Explains MemoryStore leaks memory and fails in clusters.",
      "Configures connect-redis pointing to Redis Sentinel/Cluster, setting rolling: true, resave: false, and saveUninitialized: false."
    ],
    "hint": "Why will your users complain of random logouts when you increase your Kubernetes pod count from 1 to 5 if you use default sessions?",
    "sampleGoodAnswer": "Default express-session stores sessions in local process memory (MemoryStore). When traffic is load-balanced across 5 pods, a user\u2019s subsequent request lands on a different pod that lacks their session, prompting an unexpected logout. Connecting connect-redis centralizes session state in a Redis cluster accessible by all pods. Setting resave: false and saveUninitialized: false prevents race conditions and memory bloat from unauthenticated sessions."
  },
  {
    "id": "mern-hard-12",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "High-Performance File Streaming & Resumable Uploads",
    "question": "How do you build a resilient, chunked resumable upload pipeline (like Tus protocol or AWS S3 Multipart) in MERN for 5GB video files?",
    "keyConcepts": [
      "Tus.io protocol",
      "AWS S3 Multipart Upload",
      "Direct-to-S3 presigned URLs",
      "Bypassing Express server memory"
    ],
    "commonWeakSpots": [
      "Routing 5GB file uploads through the Express server process, consuming server bandwidth and exhausting RAM buffers."
    ],
    "strongIndicators": [
      "Explains requesting a presigned multipart upload URL from Express, allowing React to stream 5MB chunks directly to AWS S3/Cloudflare R2, completely offloading heavy I/O from the Node backend."
    ],
    "hint": "Why should your Express server NEVER receive the actual bytes of a 5GB video file upload directly?",
    "sampleGoodAnswer": "Streaming gigabytes of file data through Node.js consumes valuable event loop CPU, network bandwidth, and memory buffers, choking standard API endpoints. Production pattern: 1) React requests presigned URLs from Express: POST /api/uploads/initiate; 2) Express queries S3 to generate presigned multipart upload URLs; 3) React slices the file into 5MB chunks and uploads directly from the browser to S3 via PUT requests; 4) On completion, React notifies Express to finalize the multipart upload in S3 and save the metadata to MongoDB."
  },
  {
    "id": "mern-hard-13",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Edge Rendering & Geodistributed MERN",
    "question": "How do you architect a globally distributed MERN stack deploying React to Edge CDNs and routing API traffic to the nearest regional Express/Mongo cluster?",
    "keyConcepts": [
      "Edge Workers (Cloudflare / Vercel Edge)",
      "Geographical DNS (Route 53 latency routing)",
      "Multi-region MongoDB Atlas with local read preference",
      "Stale-While-Revalidate caching"
    ],
    "commonWeakSpots": [
      "Serving single-region monolithic servers to worldwide users, resulting in 300ms+ round-trip latency for international traffic."
    ],
    "strongIndicators": [
      "Deploys static React assets to global CDN edge nodes.",
      "Uses Route 53 Latency-Based Routing to direct API calls to nearest regional Node server, backed by MongoDB Atlas Global Clusters with nearest read preference."
    ],
    "hint": "How can you achieve sub-50ms latency for users in Tokyo, London, and New York using the MERN stack?",
    "sampleGoodAnswer": "1) Frontend: Static React SPA assets are cached on a global CDN (Cloudflare/CloudFront) with Edge POPs within 10ms of 95% of users; 2) Routing: Anycast DNS directs API requests to the closest regional Express compute container (e.g. AWS eu-west-1, us-east-1, ap-northeast-1); 3) Database: MongoDB Atlas Global Cluster with Zone Sharding pins local customer data to the local region and uses Read Preference: nearest for read-heavy operations."
  },
  {
    "id": "mern-hard-14",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Real-Time Collaborative Editing (CRDTs)",
    "question": "How do you implement real-time collaborative editing (like Google Docs or Figma) in MERN using CRDTs (Yjs) or Operational Transformation (OT)?",
    "keyConcepts": [
      "Conflict-free Replicated Data Types (CRDTs)",
      "Yjs / Automerge library",
      "WebSocket state vector synchronization",
      "MongoDB document persistence for snapshots"
    ],
    "commonWeakSpots": [
      "Using simple 'last-write-wins' timestamps which silently overwrite peer edits when two users type simultaneously."
    ],
    "strongIndicators": [
      "Explains CRDTs mathematically guarantee convergence across distributed peers without central lock coordination.",
      "Uses Yjs with y-websocket and persists periodic document binary updates to MongoDB."
    ],
    "hint": "Why is 'Last-Write-Wins' disastrous for collaborative multi-user editing, and how do CRDTs solve it?",
    "sampleGoodAnswer": "Last-Write-Wins overwrites earlier concurrent keystrokes, destroying peer contributions. Conflict-free Replicated Data Types (CRDTs) like Yjs treat text as a mathematical graph of uniquely identified characters. Distributed clients apply local keystrokes immediately (0ms UI latency) and broadcast small state vectors over WebSockets. Regardless of network delays, reordering, or temporary offline splits, CRDTs mathematically guarantee all peers converge to the exact same document state without data loss."
  },
  {
    "id": "mern-hard-15",
    "topic": "MERN Stack",
    "difficulty": "Hard",
    "category": "Resilient Job Queues & Worker Processes",
    "question": "How do you integrate BullMQ with Redis and MongoDB to process asynchronous background tasks (video encoding, report generation, email batches) in MERN?",
    "keyConcepts": [
      "BullMQ / Redis job queue",
      "Producer-Consumer architecture",
      "Worker process separation",
      "Exponential backoff retry & dead letter queue (DLQ)"
    ],
    "commonWeakSpots": [
      "Executing heavy background tasks (like generating 100-page PDF reports or sending 10,000 emails) inside the HTTP request-response cycle."
    ],
    "strongIndicators": [
      "Separates HTTP API server from worker processes.",
      "Uses BullMQ to push jobs into Redis with retries and exponential backoff, updating status in MongoDB and notifying React via WebSockets upon completion."
    ],
    "hint": "How do you handle generating an export of 1,000,000 rows without having the user\u2019s browser HTTP request time out?",
    "sampleGoodAnswer": "1) React sends POST /api/reports/export; 2) Express creates a pending Report document in MongoDB and immediately pushes a job { reportId, filters } to a BullMQ queue in Redis, returning 202 Accepted with the reportId in 10ms; 3) A dedicated background Worker process picks up the job from Redis, streams rows from MongoDB, generates the CSV/PDF, uploads it to S3, and marks the MongoDB record 'completed'; 4) The worker emits a WebSocket notification (or frontend polls) so React displays a 'Download Ready' button."
  }
]
};

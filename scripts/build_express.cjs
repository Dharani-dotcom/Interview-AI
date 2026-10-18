const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../src/data/topics');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function writeTopicFile(fileName, exportName, topicName, beginnerList, mediumList, hardList) {
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
  console.log(`Wrote ${fileName} (${beginnerList.length} beg, ${mediumList.length} med, ${hardList.length} hard)`);
}

// ==========================================
// 1. EXPRESS.JS
// ==========================================
const expressBeg = [
  {
    id: 'exp-beg-1',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Architecture',
    question: 'What is Express.js, and why is it referred to as a "minimalist and unopinionated" web framework for Node.js?',
    keyConcepts: ['Minimalist framework', 'Unopinionated structure', 'Middleware pipeline', 'Thin wrapper over http module'],
    commonWeakSpots: ['Saying Express has built-in ORM or database layer like Django or Rails.', 'Not explaining what unopinionated means.'],
    strongIndicators: ['Explains Express does not enforce strict folder structures or built-in ORM, leaving architectural decisions to the developer.', 'Highlights routing and middleware as core pillars.'],
    hint: 'Think about how Express gives complete architectural freedom compared to frameworks like NestJS or Rails.',
    sampleGoodAnswer: 'Express.js is a lightweight web application framework for Node.js. It is called minimalist because it provides a thin layer of core web application features (HTTP routing, request/response helpers, and middleware execution) without bloating the runtime with built-in ORMs, template engines, or forced project directory layouts, allowing developers complete freedom to structure their codebase.'
  },
  {
    id: 'exp-beg-2',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Middleware',
    question: 'What is middleware in Express.js? Explain the role of the (req, res, next) signature.',
    keyConcepts: ['Middleware functions', 'next() callback', 'Request lifecycle', 'Terminating response vs passing control'],
    commonWeakSpots: ['Forgetting to call next() or res.send(), causing requests to hang indefinitely.', 'Misunderstanding execution order.'],
    strongIndicators: ['Explains middleware functions have access to request and response objects and must either send a response or call next().', 'Mentions linear pipeline execution order.'],
    hint: 'What happens to an HTTP request if a middleware function neither responds nor calls next()?',
    sampleGoodAnswer: 'Middleware in Express is a function with access to the request object (req), response object (res), and the next middleware function in the application’s request-response cycle (next). A middleware can execute code, modify req/res objects, end the request-response cycle (res.send), or invoke next() to pass execution to the subsequent middleware. If next() is not called and no response is sent, the request hangs.'
  },
  {
    id: 'exp-beg-3',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Routing',
    question: 'How do route parameters (req.params) differ from query parameters (req.query) in Express?',
    keyConcepts: ['req.params vs req.query', 'URL path variables', 'Query strings', 'Use case differentiation'],
    commonWeakSpots: ['Confusing route placeholders like :id with query parameters like ?page=1.', 'Accessing params without defining the route colon syntax.'],
    strongIndicators: ['Explains req.params captures named segments in the path (e.g. /users/:id).', 'Explains req.query parses key-value pairs following the question mark (e.g. ?search=react&sort=asc).'],
    hint: 'Look at the difference between /api/products/123 vs /api/products?category=books.',
    sampleGoodAnswer: 'Route parameters (req.params) are named URL segments defined with a colon in the path (e.g., app.get("/users/:id")) used to uniquely identify a specific resource. Query parameters (req.query) are optional key-value pairs appended after the "?" in the URL (e.g., /users?sort=asc&limit=10) used for filtering, pagination, and sorting.'
  },
  {
    id: 'exp-beg-4',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Body Parsing',
    question: 'Why do we need express.json() and express.urlencoded() middleware in modern Express apps?',
    keyConcepts: ['JSON body parsing', 'Readable streams', 'Content-Type headers', 'req.body population'],
    commonWeakSpots: ['Accessing req.body without mounting express.json(), resulting in undefined.', 'Assuming Express parses JSON bodies by default without middleware.'],
    strongIndicators: ['Explains Node HTTP requests are incoming data streams and express.json() buffers and parses the JSON chunk into req.body.', 'Mentions express.urlencoded() handles HTML form submissions.'],
    hint: 'What is req.body if you do not include app.use(express.json()) in your app entrypoint?',
    sampleGoodAnswer: 'In Node.js, the HTTP request body arrives as an asynchronous stream of raw data chunks. Without body-parsing middleware, req.body is undefined. express.json() is built-in middleware that checks the incoming Content-Type header (application/json), buffers the stream chunks, parses the payload as JSON, and attaches it to req.body. express.urlencoded() does the same for form-encoded submissions.'
  },
  {
    id: 'exp-beg-5',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Modular Routing',
    question: 'What is express.Router() and why is it essential for structuring large enterprise applications?',
    keyConcepts: ['express.Router', 'Modular mini-apps', 'Separation of concerns', 'Mounting paths with app.use'],
    commonWeakSpots: ['Placing all route definitions inside a single huge index.js file.', 'Not understanding how router-level middleware functions.'],
    strongIndicators: ['Describes express.Router as an isolated instance of middleware and routes (a "mini-app") mounted at specific prefixes (e.g., app.use("/api/v1/users", userRouter)).'],
    hint: 'How do you separate auth routes, user routes, and product routes into distinct files?',
    sampleGoodAnswer: 'express.Router creates modular, mountable route handlers that function as isolated "mini-applications". Instead of cluttering the main server file with hundreds of route handlers, routers allow grouping related endpoints (such as authRouter, productRouter) into separate files and mounting them at clean base paths with app.use("/api/users", userRouter), improving testability and code organization.'
  },
  {
    id: 'exp-beg-6',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Response Methods',
    question: 'What is the difference between res.send(), res.json(), and res.end() in Express?',
    keyConcepts: ['res.send auto-content-type', 'res.json explicit JSON serialization', 'res.end stream termination', 'Status code chaining'],
    commonWeakSpots: ['Calling res.send() multiple times in the same route causing "Cannot set headers after they are sent to the client" error.'],
    strongIndicators: ['Notes res.json converts non-objects (null, undefined) to JSON and formats JSON responses with application/json header.', 'Explains res.end is for quickly closing a response without body (e.g. 404 or 204).'],
    hint: 'How does Express decide the Content-Type header when using res.send(string) vs res.json(object)?',
    sampleGoodAnswer: 'res.send() sends a response and automatically sets Content-Type based on the payload (HTML/text for strings, JSON for objects/arrays). res.json() explicitly converts the argument into valid JSON using JSON.stringify() and sets Content-Type to application/json. res.end() ends the HTTP response process directly without sending any body payload, commonly used for 204 No Content responses.'
  },
  {
    id: 'exp-beg-7',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Static Files',
    question: 'How do you serve static assets (HTML, images, CSS, JS) in an Express.js application?',
    keyConcepts: ['express.static', 'Public directory', 'Virtual path prefix', 'Path resolution with path.join'],
    commonWeakSpots: ['Hardcoding relative paths that fail when server starts from a different working directory.'],
    strongIndicators: ['Uses app.use(express.static(path.join(__dirname, "public"))).', 'Mentions virtual path prefixes (app.use("/static", express.static(...))).'],
    hint: 'Which built-in Express middleware serves folders of static client assets?',
    sampleGoodAnswer: 'Express provides express.static built-in middleware. You mount it using app.use(express.static(path.join(__dirname, "public"))). To serve files under a virtual prefix, you pass a path prefix: app.use("/static", express.static(path.join(__dirname, "public"))). Using path.join with __dirname guarantees absolute path resolution regardless of where node process was started.'
  },
  {
    id: 'exp-beg-8',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Error Handling',
    question: 'How does Express identify an error-handling middleware function, and what is its exact parameter signature?',
    keyConcepts: ['Four arguments (err, req, res, next)', 'Arity check', 'Default error handler', 'Passing errors to next(err)'],
    commonWeakSpots: ['Omitting the next argument and having only 3 parameters, causing Express to treat it as regular middleware instead of error middleware.'],
    strongIndicators: ['Highlights that JavaScript function.length is 4, which Express uses via arity inspection to register it as an error handler.'],
    hint: 'What is the special first parameter that must be present in Express error handlers?',
    sampleGoodAnswer: 'Express identifies error-handling middleware specifically by looking for four arguments: (err, req, res, next). Express inspects the function’s arity (fn.length === 4). Even if you do not use the next parameter, you must include all four arguments in the signature, otherwise Express treats it as normal middleware. Any call to next(error) skips regular middleware and jumps straight to this handler.'
  },
  {
    id: 'exp-beg-9',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'CORS',
    question: 'What is Cross-Origin Resource Sharing (CORS), and how do you enable and configure it in Express?',
    keyConcepts: ['Same-Origin Policy', 'Preflight OPTIONS request', 'Access-Control-Allow-Origin', 'cors package'],
    commonWeakSpots: ['Setting Access-Control-Allow-Origin: * on production endpoints that handle sensitive credentials or cookies.'],
    strongIndicators: ['Explains browser Same-Origin Policy and why frontend apps on port 3000 cannot call API on port 5000 without CORS headers.', 'Shows cors({ origin: "https://myapp.com", credentials: true }).'],
    hint: 'Why does the browser block an API request from React on localhost:3000 to Express on localhost:5000?',
    sampleGoodAnswer: 'CORS is a browser security mechanism that restricts cross-origin HTTP requests initiated from scripts. When a frontend hosted on domain A calls an API on domain B, the browser blocks access unless domain B responds with appropriate Access-Control-Allow-Origin headers. In Express, you use the cors middleware (app.use(cors({ origin: ["https://example.com"], credentials: true }))) to configure allowed origins, methods, and headers.'
  },
  {
    id: 'exp-beg-10',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Environment Variables',
    question: 'How do you manage environment variables (like PORT, DATABASE_URL, and secrets) in Express using dotenv?',
    keyConcepts: ['dotenv package', 'process.env', '.env file', '.gitignore security'],
    commonWeakSpots: ['Committing .env files with secrets into public git repositories.', 'Calling process.env before invoking dotenv.config().'],
    strongIndicators: ['Mentions invoking dotenv.config() at the very top of the application entry point and adding .env to .gitignore while committing .env.example.'],
    hint: 'Where do sensitive configuration variables live and how are they loaded into Node.js process.env?',
    sampleGoodAnswer: 'Environment variables keep secrets and environment-specific configs out of source code. Using the dotenv library, you call dotenv.config() at the top of your main entry file (or via node -r dotenv/config), which parses key-value pairs from a .env file and assigns them to process.env (e.g. process.env.PORT). The .env file must be listed in .gitignore, and a .env.example template is committed instead.'
  },
  {
    id: 'exp-beg-11',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'HTTP Status Codes',
    question: 'What are the most common HTTP status codes used in Express REST APIs and what does each indicate?',
    keyConcepts: ['200 OK', '201 Created', '204 No Content', '400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found', '500 Internal Error'],
    commonWeakSpots: ['Returning 200 OK with { error: "Something went wrong" } in the body.', 'Confusing 401 Unauthorized (unauthenticated) with 403 Forbidden (authenticated but lacking permissions).'],
    strongIndicators: ['Distinguishes 401 (identity unknown) vs 403 (identity verified, permission denied).', 'Uses 201 for POST creation and 204 for DELETE success.'],
    hint: 'What status code should you return when a user creates a new record vs when they request a record that does not exist?',
    sampleGoodAnswer: 'Common status codes include: 200 OK (successful request), 201 Created (resource successfully created via POST), 204 No Content (successful action with no response body, e.g. DELETE), 400 Bad Request (invalid client payload), 401 Unauthorized (missing or invalid authentication credentials), 403 Forbidden (authenticated but lacks required role/permission), 404 Not Found, and 500 Internal Server Error.'
  },
  {
    id: 'exp-beg-12',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Request Headers',
    question: 'How do you read incoming request headers and set custom outgoing response headers in Express?',
    keyConcepts: ['req.headers', 'req.get()', 'res.set() / res.header()', 'Case insensitivity'],
    commonWeakSpots: ['Forgetting that Node normalizes incoming header names to lowercase in req.headers.'],
    strongIndicators: ['Uses req.get("authorization") for case-insensitive lookup.', 'Uses res.set("X-Custom-Header", "value") before sending response.'],
    hint: 'How do you retrieve the Authorization Bearer token header in an Express handler?',
    sampleGoodAnswer: 'Incoming headers are accessible via req.headers[headerName] (which Node automatically normalizes to lowercase) or via the helper req.get("Header-Name") which provides case-insensitive retrieval (e.g., req.get("Authorization")). Outgoing response headers are set using res.set("X-Total-Count", "100") or res.header("Content-Type", "application/json") before the response body is transmitted.'
  },
  {
    id: 'exp-beg-13',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'HTTP Methods',
    question: 'What is the semantic difference between app.put() and app.patch() in RESTful Express routes?',
    keyConcepts: ['PUT idempotent full replacement', 'PATCH partial update', 'Payload completeness', 'Idempotency'],
    commonWeakSpots: ['Using PUT for updating a single field like user status, overwriting unmentioned fields with null.'],
    strongIndicators: ['Explains PUT replaces the entire resource representation (idempotent), while PATCH applies partial modifications to specific fields.'],
    hint: 'Which verb is for replacing the whole entity vs modifying one or two fields?',
    sampleGoodAnswer: 'PUT is used for full resource replacement: the client sends the complete updated representation of the entity, and any fields omitted are typically cleared or reset to defaults. PATCH is used for partial modification: the client sends only the specific attributes that need to be updated, leaving other fields intact. Both target an identifiable resource URI (e.g. /api/users/:id).'
  },
  {
    id: 'exp-beg-14',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Application Lifecycle',
    question: 'What does app.listen() do, and what does it return in Express?',
    keyConcepts: ['HTTP server binding', 'Port binding', 'http.Server instance', 'Graceful shutdown basis'],
    commonWeakSpots: ['Not knowing that app.listen() internally calls http.createServer(app).listen().'],
    strongIndicators: ['Explains app.listen creates and returns an instance of Node’s native http.Server, which can be stored for WebSocket integration or graceful termination.'],
    hint: 'What underlying native Node.js core module does app.listen() wrap?',
    sampleGoodAnswer: 'app.listen(port, callback) binds and listens for connections on the specified network port and host. Under the hood, it is identical to http.createServer(app).listen(port, callback). It returns the underlying Node.js http.Server instance, which is crucial if you need to attach Socket.io / WebSocket servers or handle SIGTERM signals for graceful server shutdown.'
  },
  {
    id: 'exp-beg-15',
    topic: 'Express.js',
    difficulty: 'Beginner',
    category: 'Query Validation',
    question: 'Why should you never trust user input in req.body, req.query, or req.params, and how do you validate requests?',
    keyConcepts: ['Input sanitization', 'Schema validation (Zod / Joi)', 'SQL/NoSQL injection prevention', 'Early rejection'],
    commonWeakSpots: ['Writing manual if (!req.body.email) statements scattered across route controllers.', 'Passing raw user input directly to database queries.'],
    strongIndicators: ['Advocates middleware validation with schema libraries like Zod or Joi, failing early with 400 Bad Request before hitting controllers.'],
    hint: 'What happens if a user submits malicious or un-typed data to an unvalidated endpoint?',
    sampleGoodAnswer: 'Unvalidated user input exposes APIs to injection attacks (SQL/NoSQL), prototype pollution, and runtime crashes. Best practice is to use schema validation libraries like Zod or Joi inside dedicated validation middleware. The middleware validates req.body, req.query, or req.params against a strict schema, immediately returning a 400 Bad Request with field errors if invalid, guaranteeing type-safe data reaches the business logic.'
  }
];

const expressMed = [
  {
    id: 'exp-med-1',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Async Error Handling',
    question: 'How do unhandled asynchronous promise rejections behave in Express 4 vs Express 5, and how do you handle them cleanly?',
    keyConcepts: ['Async error propagation', 'Express 4 unhandled rejections', 'express-async-errors wrapper', 'Express 5 native promise support'],
    commonWeakSpots: ['Not using try/catch or async wrapper in Express 4, causing node process crashes or hanging requests.', 'Assuming Express 4 catches rejected async promises automatically.'],
    strongIndicators: ['Explains Express 4 does not catch rejected promises returned by async functions unless passed to next(err) or wrapped in an asyncHandler utility.', 'Notes Express 5 natively catches rejected promises.'],
    hint: 'What happens when an async route handler throws an error in Express 4 without a try/catch block?',
    sampleGoodAnswer: 'In Express 4, if an async function (async (req, res, next) => {...}) throws an error or rejects a promise, Express does not intercept it, causing unhandled promise rejections and hanging client requests. In Express 4, you must wrap controllers in an asyncHandler helper (fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)) or use express-async-errors. In Express 5, route handlers and middleware that return promises automatically forward rejections to the error-handling middleware.'
  },
  {
    id: 'exp-med-2',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Authentication Middleware',
    question: 'How do you design a robust JWT Authentication & Role-Based Access Control (RBAC) middleware pipeline in Express?',
    keyConcepts: ['Bearer token extraction', 'jwt.verify', 'req.user attachment', 'RBAC authorization closure', '401 vs 403 status codes'],
    commonWeakSpots: ['Hardcoding secret keys in code instead of process.env.', 'Failing to separate authentication (who you are) from authorization (what you can do).'],
    strongIndicators: ['Creates two distinct middleware: authenticateToken (validates JWT, attaches req.user) and authorizeRoles(...roles) (returns a middleware checking req.user.role).'],
    hint: 'Why should you split token verification and role checking into two composable middleware functions?',
    sampleGoodAnswer: 'A robust pipeline separates concerns: 1) authenticateToken extracts Authorization: Bearer <token>, verifies it with jwt.verify() using a secret key, and attaches decoded payload to req.user (returning 401 if missing/invalid); 2) authorizeRoles(...allowedRoles) is a higher-order middleware that checks if allowedRoles.includes(req.user.role), returning 403 Forbidden if unauthorized, or calling next() if authorized.'
  },
  {
    id: 'exp-med-3',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Rate Limiting',
    question: 'How and why do you implement Rate Limiting in an Express API (e.g. express-rate-limit with Redis)?',
    keyConcepts: ['Brute force protection', 'DDoS mitigation', 'IP-based rate limiting', 'Distributed Redis store', 'HTTP 429 Too Many Requests'],
    commonWeakSpots: ['Using default in-memory rate limiter across multiple load-balanced Node cluster instances.', 'Not differentiating login endpoints from public read endpoints.'],
    strongIndicators: ['Highlights that memory store fails in multi-process/load-balanced servers and explains why Redis store is required for distributed state.', 'Returns 429 with Retry-After header.'],
    hint: 'What happens to an in-memory rate limiter when your Express app runs across 4 PM2 worker processes or multiple Kubernetes pods?',
    sampleGoodAnswer: 'Rate limiting protects APIs against brute force attacks, credential stuffing, and Denial of Service by restricting request counts per IP/user within a time window. While express-rate-limit works out of the box with memory storage, in production with multiple PM2 cluster workers or load-balanced servers, an in-memory store is fragmented. Connecting rate-limit-redis ensures a centralized, synchronized counter in Redis across all server instances, returning 429 Too Many Requests.'
  },
  {
    id: 'exp-med-4',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Security Headers',
    question: 'What is the helmet package in Express, and what specific HTTP security headers does it set?',
    keyConcepts: ['Helmet middleware', 'Content-Security-Policy (CSP)', 'X-DNS-Prefetch-Control', 'X-Frame-Options', 'Strict-Transport-Security (HSTS)', 'Hide X-Powered-By'],
    commonWeakSpots: ['Not knowing why exposing X-Powered-By: Express helps attackers fingerprint the tech stack.', 'Vague description of what Helmet actually does.'],
    strongIndicators: ['Lists concrete headers: Content-Security-Policy, X-Frame-Options (clickjacking), HSTS (enforces HTTPS), X-Content-Type-Options (MIME sniffing), and removes X-Powered-By.'],
    hint: 'How does helmet secure an Express app with one line of code (app.use(helmet()))?',
    sampleGoodAnswer: 'Helmet is a security middleware collection that sets sensible HTTP response headers: 1) Content-Security-Policy restricts script/resource origins; 2) X-Frame-Options mitigates clickjacking; 3) Strict-Transport-Security (HSTS) enforces HTTPS connections; 4) X-Content-Type-Options (nosniff) stops MIME type sniffing; 5) Removes X-Powered-By: Express to obscure technology fingerprinting from automated vulnerability scanners.'
  },
  {
    id: 'exp-med-5',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'File Uploads',
    question: 'How do you handle multipart/form-data file uploads in Express using Multer, and how do you ensure security against malicious uploads?',
    keyConcepts: ['Multer middleware', 'Disk vs Memory storage', 'File size limits', 'MIME type / magic number validation', 'Streaming to cloud (S3)'],
    commonWeakSpots: ['Relying solely on user-provided file extension rather than MIME type or file signature.', 'Storing massive files in server memory causing heap exhaustion.'],
    strongIndicators: ['Configures limits: { fileSize: 5 * 1024 * 1024 }.', 'Uses fileFilter to validate allowed MIME types.', 'Avoids storing sensitive uploads locally in public directory.'],
    hint: 'Why cannot express.json() handle file uploads, and how does Multer parse multipart boundaries?',
    sampleGoodAnswer: 'File uploads use multipart/form-data which express.json() cannot parse. Multer buffers incoming streams into memory or disk storage. Security best practices: 1) Enforce strict limits ({ fileSize: 5MB, files: 1 }); 2) Implement fileFilter to restrict allowed MIME types (e.g., image/jpeg, image/png); 3) Never trust client-supplied filenames—generate random UUIDs with safe extensions; 4) Validate magic bytes/file signatures; 5) Stream directly to object storage (like AWS S3) rather than storing on web server disk.'
  },
  {
    id: 'exp-med-6',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Validation Pipeline',
    question: 'How do you construct a reusable request validation middleware using Zod or Joi in an Express codebase?',
    keyConcepts: ['Zod schema validation', 'High-order middleware factory', 'SafeParseAsync', 'Structured 400 error formatting'],
    commonWeakSpots: ['Writing validation logic inside controllers instead of middleware.', 'Failing to handle unknown unexpected fields.'],
    strongIndicators: ['Writes a generic validate(schema) factory returning (req, res, next) middleware.', 'Maps Zod issues into clean field: message error arrays.'],
    hint: 'Show how a validateRequest(schema) function returns a middleware that validates req.body, req.query, and req.params.',
    sampleGoodAnswer: 'You create a reusable middleware factory: const validate = (schema: AnyZodSchema) => async (req, res, next) => { const result = await schema.safeParseAsync({ body: req.body, query: req.query, params: req.params }); if (!result.success) return res.status(400).json({ errors: result.error.flatten().fieldErrors }); req.body = result.data.body; next(); }; This encapsulates validation, strips unknown malicious properties, and keeps controllers completely clean.'
  },
  {
    id: 'exp-med-7',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Compression & Performance',
    question: 'What is the compression middleware in Express, how does Gzip/Brotli negotiation work, and when should compression be offloaded?',
    keyConcepts: ['Gzip & Brotli encoding', 'Accept-Encoding header', 'Content-Encoding header', 'Reverse proxy offloading (Nginx / Cloudflare)'],
    commonWeakSpots: ['Compressing already compressed media files (JPEG, MP4) wasting server CPU.', 'Not knowing Nginx/Cloudflare reverse proxies usually handle compression better than Node.js.'],
    strongIndicators: ['Explains Content-Encoding: gzip/br reduction of payload size.', 'Points out that in high-traffic enterprise architectures, compression is offloaded to edge CDN or reverse proxy to save Node CPU cycles.'],
    hint: 'How do client and server negotiate response compression, and what happens to Node CPU under heavy compression load?',
    sampleGoodAnswer: 'The compression middleware inspects the client’s Accept-Encoding header (gzip, br) and compresses responses exceeding a byte threshold before sending, setting Content-Encoding: gzip. This reduces network payload size by 60-80% for JSON/HTML. However, compressing large payloads consumes significant Node.js CPU cycles on the single event loop. In high-scale architectures, compression is offloaded to a reverse proxy (like Nginx) or a CDN (Cloudflare).'
  },
  {
    id: 'exp-med-8',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Logging & Observability',
    question: 'How do you implement structured logging in Express using Morgan and Winston or Pino, including correlation IDs?',
    keyConcepts: ['Morgan HTTP logger', 'Pino / Winston JSON logging', 'Correlation / Trace ID (X-Request-ID)', 'AsyncLocalStorage'],
    commonWeakSpots: ['Using console.log() in production which blocks standard out and outputs unstructured text.', 'No correlation ID to trace logs across microservices.'],
    strongIndicators: ['Implements middleware generating crypto.randomUUID() as X-Request-ID and attaches it to request and response.', 'Uses Pino or Winston with JSON output for log aggregators (Datadog/Elastic).'],
    hint: 'Why is JSON structured logging with request IDs essential when debugging a bug across multiple microservice calls?',
    sampleGoodAnswer: 'Production Express apps replace console.log with structured JSON loggers like Pino or Winston. You implement an early middleware that generates a unique correlation ID (e.g. req.id = req.headers["x-request-id"] || crypto.randomUUID()) and sets res.setHeader("X-Request-ID", req.id). All downstream logs and Morgan HTTP access logs include this request ID, enabling log aggregators (ELK, Datadog) to trace an individual request through the entire stack.'
  },
  {
    id: 'exp-med-9',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Session vs Token Auth',
    question: 'Compare express-session (stateful cookie-based sessions) vs stateless JWTs. When would you choose one over the other?',
    keyConcepts: ['Stateful session store (Redis)', 'Stateless JWT', 'Instant revocation capability', 'Scalability and mobile compatibility'],
    commonWeakSpots: ['Claiming JWTs can be easily revoked instantly without a database or blacklist lookup.', 'Storing sessions in server memory in production.'],
    strongIndicators: ['Acknowledges sessions allow instant logout/revocation by deleting the Redis key, but require central session store.', 'Explains JWTs are stateless and scale across services, but hard to revoke before expiration without token blacklisting.'],
    hint: 'What happens when an admin needs to ban a compromised user immediately in session auth vs JWT auth?',
    sampleGoodAnswer: 'express-session stores session data on the server (usually in Redis) and sends a signed cookie with a session ID to the browser. It offers instant revocation (deleting the Redis key terminates the session immediately), ideal for banking or internal admin dashboards. Stateless JWTs encode user identity in a cryptographically signed payload, requiring no central database lookup on each request and working well across mobile apps and microservices, but cannot be instantly invalidated without maintaining a token revocation list.'
  },
  {
    id: 'exp-med-10',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Graceful Shutdown',
    question: 'How do you implement Graceful Shutdown in an Express application handling SIGTERM and SIGINT signals?',
    keyConcepts: ['SIGTERM & SIGINT handlers', 'server.close()', 'Database connection cleanup', 'Draining active in-flight requests', 'Forced timeout exit'],
    commonWeakSpots: ['Calling process.exit(0) immediately, killing ongoing client HTTP requests and corrupting database transactions.', 'Not setting a fallback timeout if connections refuse to close.'],
    strongIndicators: ['Calls server.close() to stop accepting new requests while allowing current in-flight requests to complete.', 'Closes database pools and sets a 10s fallback timer for process.exit(1).'],
    hint: 'When Kubernetes restarts a pod, how do you ensure active user transactions finish before the container dies?',
    sampleGoodAnswer: 'When container orchestrators (like Kubernetes or Docker) stop a pod, they send a SIGTERM signal. A graceful shutdown listens for SIGTERM and SIGINT: 1) Call server.close() to stop receiving new HTTP connections while allowing pending requests to finish; 2) Close database pools (Mongo/Postgres) and Redis clients; 3) Set a fallback timeout (e.g., 10 seconds) that forces process.exit(1) if connections fail to close; 4) Call process.exit(0) once all resources drain cleanly.'
  },
  {
    id: 'exp-med-11',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'API Versioning',
    question: 'What are the main strategies for API versioning in Express (URI path, Header, Query param), and which is industry standard?',
    keyConcepts: ['URI versioning (/api/v1/)', 'Accept header versioning', 'Deprecation headers', 'Router mounting'],
    commonWeakSpots: ['Breaking existing mobile app clients by changing API payloads without versioning.'],
    strongIndicators: ['Identifies URI path versioning (app.use("/api/v1", v1Router)) as the most explicit, cache-friendly, and common industry pattern.', 'Mentions Sunset and Deprecation HTTP headers.'],
    hint: 'How do you mount v1 and v2 route directories side-by-side in Express?',
    sampleGoodAnswer: 'The three primary strategies are: 1) URI Path Versioning (/api/v1/users)—the industry standard due to transparency, ease of caching, and clear documentation; 2) Custom Request Header (Accept: application/vnd.company.v1+json)—REST-pure but harder to test in browsers; 3) Query parameter (/users?version=1). In Express, URI versioning is implemented cleanly by mounting separate routers: app.use("/api/v1", v1Router); app.use("/api/v2", v2Router).'
  },
  {
    id: 'exp-med-12',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Database Connection Pooling',
    question: 'Where and how should database client connections (Mongoose, pg, Prisma) be initialized relative to Express app startup?',
    keyConcepts: ['Connection pool sharing', 'Single connection on startup', 'Preventing connection per request', 'Awaiting DB before app.listen'],
    commonWeakSpots: ['Creating a new database connection inside each route handler function, quickly exhausting database connection limits.'],
    strongIndicators: ['Initializes a shared connection pool once during boot and awaits successful connection before calling app.listen().', 'Handles connection error events gracefully.'],
    hint: 'What happens to your database if 1,000 requests per second each execute mongoose.connect() or new Pool() inside the route?',
    sampleGoodAnswer: 'Database clients must be initialized once globally at application startup, never inside route handlers or middleware. Initializing connections inside routes exhausts database connection pools under concurrent load. The standard practice is to connect to the database first, handle initial connection errors, and only after successful connection call app.listen(), passing the shared connection pool through models or dependency injection.'
  },
  {
    id: 'exp-med-13',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Express Internals',
    question: 'How does the Express Router match routes internally? What is the role of Layer and path-to-regexp?',
    keyConcepts: ['Router stack', 'Layer objects', 'path-to-regexp compilation', 'Regex parameter extraction'],
    commonWeakSpots: ['Thinking Express routes are looked up in a hash map O(1) instead of traversing a linear middleware stack.'],
    strongIndicators: ['Explains Express compiles path patterns into regular expressions using path-to-regexp and checks incoming URLs sequentially through an array of Layer objects.'],
    hint: 'Why does the order in which you declare app.get() and app.use() in Express matter so much?',
    sampleGoodAnswer: 'Express maintains an internal router stack composed of Layer objects. When you declare app.get("/users/:id", fn), Express compiles the route pattern into a RegExp using the path-to-regexp library. For each incoming request, Express traverses this stack sequentially: for each Layer, it tests if req.path matches the regex. If matched, it extracts named capture groups into req.params and executes the handler. This linear evaluation is why route declaration order is paramount.'
  },
  {
    id: 'exp-med-14',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'WebSockets & SSE',
    question: 'How do you integrate real-time bidirectional communication (Socket.io) or Server-Sent Events (SSE) with an Express server?',
    keyConcepts: ['Shared http.Server', 'Socket.io attachment', 'Server-Sent Events headers (text/event-stream)', 'res.write() chunking'],
    commonWeakSpots: ['Passing the Express app instance directly to Socket.io instead of the underlying http.Server instance.'],
    strongIndicators: ['Creates const server = http.createServer(app); const io = new Server(server); server.listen(port).', 'Explains SSE uses Content-Type: text/event-stream, Cache-Control: no-cache, and Connection: keep-alive.'],
    hint: 'Why do you need const server = http.createServer(app) when combining Express with Socket.io?',
    sampleGoodAnswer: 'To integrate Socket.io, you create an explicit HTTP server wrapping the Express app: const server = http.createServer(app); const io = new Server(server); server.listen(port). This allows both standard HTTP routes and WebSocket upgrade handshakes to share the same network port. For SSE, an Express route sets headers (Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive) and streams data using res.write(`data: ${JSON.stringify(payload)}\\n\\n`).'
  },
  {
    id: 'exp-med-15',
    topic: 'Express.js',
    difficulty: 'Medium',
    category: 'Testing',
    question: 'How do you perform integration testing on Express routes using Supertest and Jest without starting an actual network port?',
    keyConcepts: ['Supertest library', 'Testing app without app.listen', 'Mocking database layers', 'Asserting status and body'],
    commonWeakSpots: ['Starting app.listen on port 3000 during test runs, leading to port collision errors when running tests concurrently.'],
    strongIndicators: ['Exports app from app.ts without calling listen, and passes app directly to request(app).', 'Tests status codes, JSON payload shapes, and auth header rejection.'],
    hint: 'Why should you separate your Express app definition (app.ts) from the server listener (server.ts)?',
    sampleGoodAnswer: 'Separating app configuration (app.ts) from the network listener (server.ts) allows Supertest to test the Express app directly in memory without binding to an actual TCP port. In Jest: import request from "supertest"; import app from "./app"; test("GET /api/users returns 200", async () => { const res = await request(app).get("/api/users").set("Authorization", `Bearer ${token}`); expect(res.status).toBe(200); expect(res.body.users).toBeDefined(); });'
  }
];

const expressHard = [
  {
    id: 'exp-hard-1',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Node Event Loop & Event Starvation',
    question: 'How can a single CPU-intensive route in an Express app block all other concurrent requests, and what are the architectural solutions?',
    keyConcepts: ['Single-threaded event loop', 'Event loop starvation', 'libuv worker pool', 'Worker Threads', 'Offloading to queue (BullMQ/Redis)'],
    commonWeakSpots: ['Thinking async/await makes CPU-heavy calculations non-blocking.', 'Running heavy crypto, JSON parsing of 50MB files, or image resizing on the main thread.'],
    strongIndicators: ['Explains async/await only yields during I/O operations, not during synchronous CPU loops.', 'Proposes solutions: Worker Threads (worker_threads), child processes, or asynchronous background job queues (BullMQ/Redis).'],
    hint: 'What happens to other incoming HTTP requests when one route handler runs a synchronous for loop calculating prime numbers for 5 seconds?',
    sampleGoodAnswer: 'Node.js uses a single thread for executing JavaScript code. While I/O is non-blocking via libuv, CPU-bound computations (such as complex regex, image transformations, or heavy cryptography) execute synchronously on the main thread, freezing the event loop and starving all other incoming concurrent requests. Solutions include: 1) Offloading tasks to Worker Threads (worker_threads) to run on separate OS threads; 2) Offloading long tasks to background worker processes via message queues (BullMQ/Redis); 3) Splitting synchronous work using setImmediate().'
  },
  {
    id: 'exp-med-hard-2',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Memory Leaks & V8 Profiling',
    question: 'How do you detect, profile, and fix memory leaks in an Express server running in production?',
    keyConcepts: ['V8 Heap memory', 'Global variables / un-cleared caches', 'Closure retention', 'Heapdump / clinic.js / Chrome DevTools inspect', 'RSS vs Heap Used'],
    commonWeakSpots: ['Restarting pods on out-of-memory without diagnosing the root cause.', 'Using an unbounded in-memory object (const cache = {}) that grows infinitely.'],
    strongIndicators: ['Identifies unbounded in-memory caches, uncleaned event listeners, and closures retaining large request objects.', 'Explains taking heap snapshots via node --inspect or v8.getHeapSnapshot() and inspecting retaining trees.'],
    hint: 'What tools can you attach to a running Node.js process to capture memory allocations over time?',
    sampleGoodAnswer: 'Common memory leak causes in Express include: unbounded in-memory caches without TTL/eviction, event emitter listener accumulation (emitter.on without off), and closures capturing req/res references. Detection and diagnosis: 1) Monitor process.memoryUsage() (RSS, heapUsed); 2) Use clinic.js doctor or node --inspect to attach Chrome DevTools; 3) Capture two V8 heap snapshots (via heapdump or inspector) 15 minutes apart under load; 4) Compare snapshots to identify objects with growing retained sizes and follow the retainer path to find the leaky variable.'
  },
  {
    id: 'exp-hard-3',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'High-Scale Concurrency & Clustering',
    question: 'How do you scale an Express application across all available CPU cores using PM2 or Node.js Cluster module, and what state issues arise?',
    keyConcepts: ['Cluster module', 'Primary/Worker architecture', 'IPC (Inter-Process Communication)', 'PM2 cluster mode', 'Shared state challenges (sessions, WebSockets)'],
    commonWeakSpots: ['Relying on in-memory state (sessions, counters, cache) that does not sync across clustered workers.'],
    strongIndicators: ['Explains Primary process forks workers and shares port 80/443 using SO_REUSEPORT or round-robin handle passing.', 'Highlights that all state must be externalized to Redis.'],
    hint: 'Why cannot clustered Express workers share a standard in-memory JavaScript variable or Map?',
    sampleGoodAnswer: 'By default, a Node.js process runs on a single CPU core. The cluster module (or PM2 in cluster mode) forks multiple worker processes that share the same server port, with the primary distributing incoming connections. Because each worker has an isolated memory space, all application state (sessions, cache, rate limits, WebSocket adapters) must be externalized to shared storage like Redis. Inter-process communication (IPC) handles synchronization when local coordination is required.'
  },
  {
    id: 'exp-hard-4',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Zero-Downtime Deployment & Kubernetes',
    question: 'How do you configure Liveness, Readiness, and Startup probes for an Express service in Kubernetes, and what should each probe check?',
    keyConcepts: ['Readiness probe (/ready)', 'Liveness probe (/live)', 'Startup probe (/startup)', 'Cascading failure prevention'],
    commonWeakSpots: ['Having the liveness probe check downstream databases, causing Kubernetes to kill all pods if the database experiences a momentary glitch.'],
    strongIndicators: ['Emphasizes /live should only check if the Node event loop is responsive (never ping external DBs).', 'Emphasizes /ready checks if database and cache dependencies are reachable before receiving user traffic.'],
    hint: 'What disaster happens if your Liveness probe queries your database and the database gets slow?',
    sampleGoodAnswer: '1) Startup Probe (/startup): Checks if the app has initialized; gives slow-starting apps time before liveness checks kick in. 2) Readiness Probe (/ready): Checks if the pod is ready to accept user traffic (verifies DB connection pool and cache are healthy). If it fails, Kubernetes stops routing traffic to the pod. 3) Liveness Probe (/live): ONLY checks if the Express process is alive and event loop responsive. Crucially, liveness must NEVER check external databases—otherwise a DB timeout triggers Kube to restart all healthy Express pods simultaneously, causing cascading outages.'
  },
  {
    id: 'exp-hard-5',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Streaming & Backpressure',
    question: 'What is Backpressure in Node.js streams, and how do you handle it in Express when streaming massive files or large database queries to clients?',
    keyConcepts: ['Readable & Writable streams', 'HighWaterMark buffer', 'Backpressure drain event', 'stream.pipeline utility', 'Memory exhaustion prevention'],
    commonWeakSpots: ['Buffering 1GB file into memory with fs.readFile() before calling res.send().', 'Using raw stream.pipe() instead of stream.pipeline() which lacks proper cleanup on error.'],
    strongIndicators: ['Explains backpressure occurs when the consumer reads slower than the producer writes.', 'Uses stream.pipeline(readable, res, callback) to automatically handle backpressure and error teardown.'],
    hint: 'What happens when a client on a slow 3G mobile network downloads a 500MB export from your Express server?',
    sampleGoodAnswer: 'Backpressure occurs when data is read from a source faster than the destination can write it (e.g. streaming a 500MB file to a slow mobile client). Without backpressure handling, unconsumed data accumulates in the server’s RAM buffer (highWaterMark), leading to Out-Of-Memory crashes. Express handles backpressure by integrating with Node streams: using stream.pipeline(sourceStream, res, (err) => {}) ensures the readable stream pauses when the writable buffer fills and resumes on the "drain" event, with automatic resource cleanup if the client disconnects.'
  },
  {
    id: 'exp-hard-6',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Security Hardening',
    question: 'How do you protect an Express API against Prototype Pollution and HTTP Parameter Pollution (HPP)?',
    keyConcepts: ['__proto__ / constructor injection', 'Object.freeze / Object.create(null)', 'hpp middleware', 'Array query parameter abuse'],
    commonWeakSpots: ['Passing unsanitized user JSON directly into Object.assign or recursive merge functions.'],
    strongIndicators: ['Explains Prototype Pollution modifies Object.prototype, affecting all objects in the runtime.', 'Explains HPP exploits repeated query params (?role=user&role=admin parsed as an array).'],
    hint: 'What does Express parse ?sort=asc&sort=desc into, and how could that break string operations in controllers?',
    sampleGoodAnswer: '1) Prototype Pollution: An attacker injects keys like __proto__ or constructor.prototype into JSON payloads. When deep-merged, this pollutes Object.prototype, altering runtime behavior. Mitigation: Use libraries with prototype guards, validate with Zod, or use Object.create(null). 2) HTTP Parameter Pollution (HPP): When an attacker passes duplicate query parameters (?id=1&id=2), Express parses req.query.id as an array instead of a string, causing runtime type errors or auth bypasses. Mitigation: Use the hpp middleware to enforce single scalar values.'
  },
  {
    id: 'exp-hard-7',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Distributed Tracing',
    question: 'How do you implement OpenTelemetry distributed tracing in an Express microservice architecture?',
    keyConcepts: ['OpenTelemetry SDK', 'TracerProvider & Span', 'Trace Context propagation (traceparent header)', 'W3C standards', 'Automatic instrumentation'],
    commonWeakSpots: ['Initializing OpenTelemetry instrumentation after importing Express, causing missing trace hooks.'],
    strongIndicators: ['Specifies OpenTelemetry must be imported and initialized before any other module loads (via node -r ./tracing.js).', 'Explains propagation of W3C traceparent headers across HTTP boundaries.'],
    hint: 'Why must OpenTelemetry be initialized before importing express or http in Node.js?',
    sampleGoodAnswer: 'OpenTelemetry instruments Node.js core modules (http, https) and Express via monkey-patching. Therefore, the OpenTelemetry SDK must be initialized before any application modules are loaded (e.g. node --require ./tracer.js server.js). It creates root spans for incoming Express requests and injects W3C Trace Context headers (traceparent, tracestate) into outgoing HTTP/gRPC requests, allowing Jaeger or Honeycomb to construct an end-to-end visualization of latency across microservices.'
  },
  {
    id: 'exp-hard-8',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Custom Middleware Execution Engine',
    question: 'How does Express implement the Onion / Waterfall middleware execution pipeline, and how does it compare to Koa’s async/await compose?',
    keyConcepts: ['Express linear waterfall', 'Koa onion model (koa-compose)', 'Async stack unwinding', 'Performance and ergonomics'],
    commonWeakSpots: ['Assuming Express middleware executes in an onion model where code after next() executes naturally with async/await.'],
    strongIndicators: ['Explains Express is primarily a linear callback waterfall where response is sent and stack does not unwind easily around downstream handlers.', 'Contrasts with Koa’s koa-compose where await next() cleanly wraps downstream execution.'],
    hint: 'Can you measure total route execution time in Express simply by recording Date.now() before and after next()?',
    sampleGoodAnswer: 'Express uses a linear callback waterfall: middleware executes sequentially until a handler calls res.send() and terminates. Code placed after next() in Express does not reliably await downstream completion unless promises are manually chained. In contrast, Koa uses koa-compose (the true "onion model"), where every middleware is an async function that can await next()—allowing pre-processing before await next() and post-processing (like logging response time or modifying headers) on the unwinding phase.'
  },
  {
    id: 'exp-hard-9',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Idempotency Keys',
    question: 'How do you design an Idempotency Middleware in Express for payment and critical mutation endpoints?',
    keyConcepts: ['Idempotency-Key header', 'Atomic Redis SET NX EX', 'Cached response replay', 'Concurrent duplicate prevention (in-progress lock)'],
    commonWeakSpots: ['Not handling in-flight concurrent requests with the same idempotency key (race conditions).'],
    strongIndicators: ['Uses Redis SET key "IN_PROGRESS" NX EX 120.', 'Intercepts res.send to cache status code and body in Redis.', 'Replays cached response immediately on duplicate keys.'],
    hint: 'How do Stripe and PayPal guarantee that retrying a payment request will never charge the card twice?',
    sampleGoodAnswer: 'An Idempotency middleware checks the Idempotency-Key header: 1) It attempts an atomic Redis SET key "PROCESSING" NX EX 60. If the key already exists with status "PROCESSING", it returns 409 Conflict (or waits); 2) If the key exists with a cached response, it immediately replays the cached status, headers, and body without re-executing business logic; 3) If new, it intercepts res.send/res.json via monkey-patching, captures the response payload, and updates Redis with the final response before sending to the client.'
  },
  {
    id: 'exp-hard-10',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Multi-Tenant Architecture',
    question: 'How do you architect dynamic multi-tenancy in an Express backend (subdomain routing, dynamic schema/database resolution)?',
    keyConcepts: ['Subdomain extraction', 'Tenant context injection (AsyncLocalStorage)', 'Dynamic connection pool cache', 'Tenant isolation & security'],
    commonWeakSpots: ['Creating a new database connection on every single request for that tenant.', 'Leaking data between tenants due to shared global context.'],
    strongIndicators: ['Uses Node.js AsyncLocalStorage to safely propagate tenantId across async call chains without passing it as argument.', 'Maintains an LRU cache of database connection pools per tenant.'],
    hint: 'How does a request to tenant1.app.com route queries to tenant1’s database without tenant2 ever accessing it?',
    sampleGoodAnswer: 'Multi-tenancy can be implemented via: 1) Tenant identification middleware that inspects subdomains (req.subdomains), headers (X-Tenant-ID), or JWT claims; 2) Context propagation using Node’s AsyncLocalStorage so any downstream service or repository can access the active tenant without parameter drilling; 3) Dynamic Database Resolution: An LRU cache stores active tenant database connection pools, retrieving the tenant’s dedicated connection on demand and releasing idle connections to prevent resource leaks.'
  },
  {
    id: 'exp-hard-11',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Circuit Breaker Pattern',
    question: 'How do you implement a Circuit Breaker pattern (using Opossum or custom logic) in Express for outbound microservice calls?',
    keyConcepts: ['Circuit states (Closed, Open, Half-Open)', 'Failure threshold', 'Timeout & fallback response', 'Cascading failure prevention'],
    commonWeakSpots: ['Letting requests to an unavailable downstream service hang until socket timeout (30-60s), exhausting Express connection sockets.'],
    strongIndicators: ['Explains state transitions: Closed (normal) -> Open (tripped after X% failures; fails fast without calling dependency) -> Half-Open (tests probe requests).'],
    hint: 'What happens to your Express server when a payment gateway it calls goes down and takes 30s to timeout?',
    sampleGoodAnswer: 'When a downstream microservice fails, repeated requests hang until timeouts exhaust the Express server’s available sockets and thread pool. A Circuit Breaker monitors failure rates: 1) Closed: Normal operation, tracking failures; 2) Open: When failure rate exceeds threshold (e.g. 50% in 10s), the breaker trips immediately returning fallback responses or errors without contacting the degraded service; 3) Half-Open: After a cooldown, a trial request is sent; if successful, the circuit resets to Closed.'
  },
  {
    id: 'exp-hard-12',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'V8 Garbage Collection Tuning',
    question: 'How do you tune Node.js V8 Garbage Collection and memory flags (--max-old-space-size) for high-throughput Express APIs?',
    keyConcepts: ['--max-old-space-size', 'Scavenge (young generation) vs Mark-Sweep (old generation)', 'GC pause latency', 'Memory fragmentation'],
    commonWeakSpots: ['Setting --max-old-space-size higher than the host container’s memory limit, causing the Linux OOM-killer to terminate the container abruptly.'],
    strongIndicators: ['Recommends setting --max-old-space-size to roughly 75% of container RAM limit to leave buffer for OS, thread stacks, and buffers.', 'Uses --trace-gc or Prometheus metrics to monitor GC pause times.'],
    hint: 'What happens if your container memory limit is 2GB and you set --max-old-space-size=2048?',
    sampleGoodAnswer: 'V8 defaults old-space memory to ~1.4GB on 64-bit systems. In containerized environments, setting --max-old-space-size to roughly 70-80% of the container’s cgroup limit ensures the V8 heap has room to expand while leaving sufficient memory for native Node buffers, worker threads, and OS processes without triggering the Linux OOM-killer. Monitoring GC duration (scavenge vs full mark-sweep) helps identify if object allocations are prematurely promoting short-lived objects to old space.'
  },
  {
    id: 'exp-hard-13',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'High-Performance Caching',
    question: 'How do you architect a Two-Tier Caching strategy (In-Memory L1 + Distributed Redis L2) for an Express microservice?',
    keyConcepts: ['L1 memory cache (lru-cache)', 'L2 distributed cache (Redis)', 'Cache stampede prevention', 'Pub/Sub invalidation'],
    commonWeakSpots: ['Not invalidating L1 in-memory caches across other server instances when a mutation occurs.'],
    strongIndicators: ['Implements Redis Pub/Sub so that when instance A updates data, it publishes an invalidation event that evicts the key from L1 in all other instances.', 'Uses single-flight / mutex locks to stop cache stampedes.'],
    hint: 'How do you get sub-millisecond in-memory speeds while ensuring multiple Express servers do not serve stale cached data?',
    sampleGoodAnswer: 'A two-tier cache combines the ultra-low latency (<0.1ms) of local memory (L1 via lru-cache) with the shared consistency of Redis (L2): 1) Look in L1; if hit, return immediately; 2) If miss, look in L2 Redis; if hit, populate L1 and return; 3) If miss, query DB, populate L2 and L1. To maintain consistency, whenever any instance updates or deletes a record, it publishes an invalidation message over Redis Pub/Sub, prompting all sibling Express instances to immediately evict the key from their local L1.'
  },
  {
    id: 'exp-hard-14',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Content Negotiation & Custom Serializers',
    question: 'How does Content Negotiation (req.accepts) work in Express, and how can you build custom high-performance serializers (e.g. Protocol Buffers / fast-json-stringify)?',
    keyConcepts: ['req.accepts()', 'fast-json-stringify schema compilation', 'Protocol Buffers (protobuf) binary format', 'Throughput gains over JSON.stringify'],
    commonWeakSpots: ['Assuming JSON.stringify() is always the fastest serialization format for high-throughput APIs.'],
    strongIndicators: ['Explains JSON.stringify performs runtime property inspection, whereas fast-json-stringify pre-compiles code based on JSON schema, achieving 2x-3x higher throughput.', 'Demonstrates req.accepts(["json", "proto"]).'],
    hint: 'Why is standard JSON.stringify slow on large payloads, and how does schema pre-compilation speed it up?',
    sampleGoodAnswer: 'Content negotiation uses req.accepts(["json", "application/x-protobuf"]) to inspect client Accept headers. Standard JSON.stringify() dynamically inspects object properties, causing significant CPU overhead on large responses. Using libraries like fast-json-stringify pre-compiles serialization functions based on JSON schemas, achieving 2x-3x higher throughput. For extreme performance between internal microservices, serializing to binary Protocol Buffers reduces payload size and CPU deserialization time significantly.'
  },
  {
    id: 'exp-hard-15',
    topic: 'Express.js',
    difficulty: 'Hard',
    category: 'Audit & Compliance',
    question: 'How do you design an immutable, compliant Request/Response Audit Trail in Express without degrading API latency?',
    keyConcepts: ['Asynchronous event emission', 'Kafka / SQS streaming', 'PII redaction middleware', 'Non-blocking audit capture'],
    commonWeakSpots: ['Writing audit records synchronously to the database inside the request handler, doubling response latency.'],
    strongIndicators: ['Masks sensitive PII (passwords, credit cards, tokens) in middleware before logging.', 'Asynchronously dispatches audit events to an event bus (Kafka/Kinesis) on res.on("finish") without delaying client response.'],
    hint: 'Where do you attach the audit logging hook to ensure it runs after the response has flushed to the client?',
    sampleGoodAnswer: 'An audit trail records who made what change, when, and with what payload for regulatory compliance (SOC2/HIPAA). 1) PII Redaction: Middleware recursively sanitizes sensitive fields (password, ssn, token) from req.body and headers; 2) Non-blocking emission: Listen to res.on("finish", () => {...}) to capture the HTTP status and response metrics after the client has already received their response; 3) Asynchronous delivery: Push the audit event to a message broker (Kafka or AWS SQS) or worker pool so database write latency never impacts client response times.'
  }
];

writeTopicFile('express.ts', 'expressQuestions', 'Express.js', expressBeg, expressMed, expressHard);

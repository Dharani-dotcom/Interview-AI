import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const javascriptQuestions: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: [
  {
    "id": "js-beg-1",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Event Loop",
    "question": "What is the JavaScript Event Loop, and what is the difference between the Call Stack, Microtask Queue, and Macrotask Queue?",
    "keyConcepts": [
      "Event Loop",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Event Loop is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "JavaScript is single-threaded. Synchronous code executes on the Call Stack. When asynchronous operations complete, their callbacks enter queues: 1) Microtask Queue (Promises, queueMicrotask, MutationObserver) has highest priority\u2014the event loop drains all microtasks after every task before rendering; 2) Macrotask Queue (setTimeout, setInterval, I/O) executes one task per loop turn."
  },
  {
    "id": "js-beg-2",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Closures",
    "question": "What is a Closure in JavaScript, and what is a practical real-world use case for closures?",
    "keyConcepts": [
      "Closures",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Closures is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "A closure is the combination of a function bundled together with references to its surrounding lexical environment. A function retains access to variables declared in its outer scope even after the outer function has finished executing and returned. Practical uses: data privacy/encapsulation (private variables), function factories, and memoization."
  },
  {
    "id": "js-beg-3",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Prototypes",
    "question": "What is the difference between var, let, and const in terms of scope, hoisting, and re-assignment?",
    "keyConcepts": [
      "Prototypes",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Prototypes is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "var is function-scoped, hoisted and initialized to undefined, and allows re-declaration. let and const are block-scoped ({}), hoisted into a Temporal Dead Zone (TDZ) where accessing before declaration throws ReferenceError. const prevents variable reference reassignment."
  },
  {
    "id": "js-beg-4",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Async/Await",
    "question": "What is Prototypal Inheritance in JavaScript, and how does the prototype chain work?",
    "keyConcepts": [
      "Async/Await",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Async/Await is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "JavaScript uses prototypal inheritance: objects have an internal link ([[Prototype]], accessed via Object.getPrototypeOf or __proto__) to another prototype object. When an attribute is accessed, JavaScript traverses the prototype chain upward until the property is found or null is reached."
  },
  {
    "id": "js-beg-5",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "V8 Engine",
    "question": "What is the difference between == and === (loose vs strict equality) in JavaScript?",
    "keyConcepts": [
      "V8 Engine",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why V8 Engine is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "== performs type coercion before comparison (e.g., '5' == 5 evaluates to true; false == 0 evaluates to true). === performs strict equality checking without type coercion: both value and type must match exactly ('5' === 5 evaluates to false)."
  },
  {
    "id": "js-beg-6",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "DOM & Events",
    "question": "What is the difference between a Promise, async/await, and a traditional callback?",
    "keyConcepts": [
      "DOM & Events",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why DOM & Events is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "Callbacks pass functions as arguments to execute upon completion, leading to 'callback hell' and inverted control. Promises represent asynchronous eventual completion or failure, chaining with .then() and .catch(). async/await is syntactic sugar over Promises, writing asynchronous code in clean, sequential try/catch blocks."
  },
  {
    "id": "js-beg-7",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Memory & GC",
    "question": "What are Arrow Functions and how does their handling of the 'this' keyword differ from regular functions?",
    "keyConcepts": [
      "Memory & GC",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Memory & GC is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "Arrow functions do not bind their own 'this', 'arguments', 'super', or 'new.target'. Instead, they lexically inherit 'this' from the enclosing execution context at the time of creation, eliminating the need for .bind(this) or var self = this inside callbacks."
  },
  {
    "id": "js-beg-8",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "ES6+ Features",
    "question": "What is Event Bubbling and Event Capturing in the browser DOM, and what does e.stopPropagation() do?",
    "keyConcepts": [
      "ES6+ Features",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why ES6+ Features is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "DOM events propagate in 3 phases: 1) Capturing phase (travels from window down to target); 2) Target phase; 3) Bubbling phase (bubbles upward from target back to window). e.stopPropagation() stops the event from traversing further up or down the DOM tree."
  },
  {
    "id": "js-beg-9",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Promises",
    "question": "What is Hoisting in JavaScript, and how do function declarations differ from function expressions?",
    "keyConcepts": [
      "Promises",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Promises is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "Hoisting is JavaScript's compilation behavior where declarations are moved to the top of their scope before execution. Function declarations (function foo() {}) are hoisted completely with their implementation. Function expressions (const foo = () => {}) hoist only the variable declaration in TDZ."
  },
  {
    "id": "js-beg-10",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "TypeScript",
    "question": "What is the difference between null and undefined in JavaScript?",
    "keyConcepts": [
      "TypeScript",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why TypeScript is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "undefined means a variable has been declared but has not yet been assigned any value. null is an explicit assignment representing the deliberate absence of any object value."
  },
  {
    "id": "js-beg-11",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Modules",
    "question": "What are Higher-Order Functions (map, filter, reduce), and why are pure functions preferred?",
    "keyConcepts": [
      "Modules",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Modules is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "A higher-order function takes another function as an argument or returns a function. map transforms elements, filter selects subsets, reduce accumulates a value. Pure functions produce identical outputs for identical inputs with no side effects, ensuring predictability and testability."
  },
  {
    "id": "js-beg-12",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Web APIs",
    "question": "What is Debouncing vs Throttling in web performance, and when should you use each?",
    "keyConcepts": [
      "Web APIs",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Web APIs is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "Debouncing delays function execution until after a specified quiet period has elapsed without any new events (ideal for search inputs). Throttling limits function execution to at most once per specified time interval (ideal for window resize, infinite scroll)."
  },
  {
    "id": "js-beg-13",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Performance",
    "question": "What is the difference between localStorage, sessionStorage, and Cookies?",
    "keyConcepts": [
      "Performance",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Performance is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "localStorage persists 5-10MB across browser restarts with no expiration. sessionStorage persists 5MB until the browser tab is closed. Cookies store up to 4KB, can be sent automatically with HTTP requests, and support security flags (HttpOnly, Secure, SameSite)."
  },
  {
    "id": "js-beg-14",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Security",
    "question": "What are JavaScript Symbols and what are they used for?",
    "keyConcepts": [
      "Security",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Security is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "Symbol is a primitive datatype producing guaranteed unique, immutable values (Symbol('id') !== Symbol('id')). They are used to create non-enumerable private object property keys and define built-in metaprogramming hooks (Symbol.iterator, Symbol.toPrimitive)."
  },
  {
    "id": "js-beg-15",
    "topic": "JavaScript & Web Core",
    "difficulty": "Beginner",
    "category": "Web Workers",
    "question": "What is the difference between CommonJS (require/module.exports) and ES Modules (import/export)?",
    "keyConcepts": [
      "Web Workers",
      "Core Fundamentals",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Surface explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Strong precise definition",
      "Clear production context",
      "Concrete examples"
    ],
    "hint": "Focus on the primary definition and why Web Workers is essential in JavaScript & Web Core.",
    "sampleGoodAnswer": "CommonJS (Node default historically) uses synchronous dynamic require() and module.exports, evaluated at runtime. ES Modules (ESM) use static import/export syntax, evaluated at compile time, enabling tree-shaking and asynchronous module loading across browsers."
  }
],
  medium: [
  {
    "id": "js-med-1",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Event Loop",
    "question": "How does the V8 JavaScript Engine compile and execute code using the Ignition Bytecode Interpreter and TurboFan JIT Compiler?",
    "keyConcepts": [
      "Event Loop",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Event Loop.",
    "sampleGoodAnswer": "V8 parses JavaScript into an AST. Ignition compiles AST into bytecode for instant startup. The engine monitors profiling feedback (type feedback vector); hot functions are passed to the TurboFan JIT compiler, which compiles bytecode into highly optimized native machine code. If type assumptions change, TurboFan deoptimizes back to bytecode."
  },
  {
    "id": "js-med-2",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Closures",
    "question": "Explain the JavaScript Memory Model: Memory Heap, Stack, Hidden Classes (Shapes), and Inline Caching.",
    "keyConcepts": [
      "Closures",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Closures.",
    "sampleGoodAnswer": "V8 optimizes dynamic property access by creating Hidden Classes (Shapes). When objects share the exact same properties in the same initialization order, they share a Shape. Inline Caching (IC) records the memory offset of property lookups, turning dynamic hash lookups into single direct memory offset reads."
  },
  {
    "id": "js-med-3",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Prototypes",
    "question": "How does Promise.all() differ from Promise.allSettled(), Promise.race(), and Promise.any()?",
    "keyConcepts": [
      "Prototypes",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Prototypes.",
    "sampleGoodAnswer": "Promise.all() waits for all promises to resolve; fails fast if any promise rejects. Promise.allSettled() waits for all promises to complete and returns status objects ({ status: 'fulfilled' | 'rejected' }). Promise.race() settles as soon as the first promise resolves or rejects. Promise.any() resolves as soon as the first promise fulfills, ignoring rejections unless all reject."
  },
  {
    "id": "js-med-4",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Async/Await",
    "question": "Explain WeakMap and WeakSet in JavaScript. Why do they hold weak references, and how do they prevent memory leaks?",
    "keyConcepts": [
      "Async/Await",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Async/Await.",
    "sampleGoodAnswer": "WeakMap and WeakSet hold weak references to object keys: the presence of an object in a WeakMap does not prevent the Garbage Collector from collecting it if no other references exist. When the object is collected, its entry in the WeakMap is automatically removed, preventing memory leaks in DOM metadata caches."
  },
  {
    "id": "js-med-5",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "V8 Engine",
    "question": "What is the Temporal Dead Zone (TDZ), and how does it prevent accessing let and const variables before declaration?",
    "keyConcepts": [
      "V8 Engine",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of V8 Engine.",
    "sampleGoodAnswer": "The Temporal Dead Zone (TDZ) is the time span between entering a scope and the actual execution of the let or const declaration. The variable is hoisted into scope, but uninitialized. Attempting to read or write it during the TDZ throws ReferenceError, preventing access to uninitialized variables."
  },
  {
    "id": "js-med-6",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "DOM & Events",
    "question": "How does the prototype chain work under the hood? What happens when you invoke Object.create(proto) vs new Constructor()?",
    "keyConcepts": [
      "DOM & Events",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of DOM & Events.",
    "sampleGoodAnswer": "new Constructor() creates an object, sets its [[Prototype]] to Constructor.prototype, executes the constructor function with 'this' bound to the new object, and returns it. Object.create(proto) creates a fresh object with its [[Prototype]] linked directly to proto without invoking any constructor function."
  },
  {
    "id": "js-med-7",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Memory & GC",
    "question": "What are Web Workers, how do they communicate with the main thread via postMessage, and what data transfer mechanisms exist (Structured Clone vs Transferable Objects)?",
    "keyConcepts": [
      "Memory & GC",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Memory & GC.",
    "sampleGoodAnswer": "Web Workers run scripts on a separate background OS thread, preventing CPU-intensive tasks from freezing the UI. Communication uses postMessage(). Structured Clone algorithm deeply copies data between threads. Transferable Objects (ArrayBuffer) transfer raw memory ownership with zero copying in 0ms, making the buffer unusable on the sender thread."
  },
  {
    "id": "js-med-8",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "ES6+ Features",
    "question": "Explain Generators and Iterators in JavaScript (Symbol.iterator and Symbol.asyncIterator).",
    "keyConcepts": [
      "ES6+ Features",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of ES6+ Features.",
    "sampleGoodAnswer": "An iterable object implements Symbol.iterator returning an object with a next() method that returns { value, done }. Generator functions (function*) yield values sequentially. Symbol.asyncIterator enables for-await-of loops over asynchronous streams of promises."
  },
  {
    "id": "js-med-9",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Promises",
    "question": "What is Cross-Origin Resource Sharing (CORS), Preflight OPTIONS requests, and how does Same-Origin Policy protect users?",
    "keyConcepts": [
      "Promises",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Promises.",
    "sampleGoodAnswer": "SOP blocks web pages from making cross-origin requests to different domains/ports. For non-simple requests (custom headers, PUT/DELETE), browsers send a preflight HTTP OPTIONS request asking the server for Access-Control-Allow-Origin, Methods, and Headers. If server approves, real request proceeds."
  },
  {
    "id": "js-med-10",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "TypeScript",
    "question": "How do you implement a Custom Promise implementation conforming to the Promises/A+ specification?",
    "keyConcepts": [
      "TypeScript",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of TypeScript.",
    "sampleGoodAnswer": "A Promises/A+ implementation requires: 1) Internal state (PENDING, FULFILLED, REJECTED); 2) value and reason variables; 3) Handlers arrays for then callbacks; 4) Asynchronous execution of callbacks using queueMicrotask or MutationObserver; 5) Promise resolution procedure handling thenable objects."
  },
  {
    "id": "js-med-11",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Modules",
    "question": "What are Tagged Template Literals in modern JavaScript, and how do libraries like styled-components utilize them?",
    "keyConcepts": [
      "Modules",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Modules.",
    "sampleGoodAnswer": "Tagged template literals pass template strings to a function: fn`Hello ${name}` passes raw string fragments as an array along with interpolated values. Libraries like styled-components inspect the CSS strings, parse dynamic interpolations (props => props.color), and generate unique scoped CSS classes."
  },
  {
    "id": "js-med-12",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Web APIs",
    "question": "How do MutationObserver, ResizeObserver, and IntersectionObserver replace inefficient scroll and DOM polling events?",
    "keyConcepts": [
      "Web APIs",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Web APIs.",
    "sampleGoodAnswer": "IntersectionObserver tracks element visibility within the viewport (lazy loading images without scroll listeners). ResizeObserver tracks element dimension changes without window resize polling. MutationObserver tracks additions, deletions, and attribute changes in the DOM tree with batched microtask callbacks."
  },
  {
    "id": "js-med-13",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Performance",
    "question": "Explain TypeScript Generics, Conditional Types, and the infer keyword for type extraction.",
    "keyConcepts": [
      "Performance",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Performance.",
    "sampleGoodAnswer": "TypeScript Generics allow parameterized reusable types. Conditional types (T extends U ? X : Y) act as type-level if-else. The infer keyword extracts type variables inside conditional types: type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any."
  },
  {
    "id": "js-med-14",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Security",
    "question": "What is the difference between Currying and Partial Application in functional JavaScript?",
    "keyConcepts": [
      "Security",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Security.",
    "sampleGoodAnswer": "Currying transforms a function of N arguments into a sequence of N unary functions: f(a, b, c) -> f(a)(b)(c). Partial application fixes a subset of arguments, returning a function accepting the remaining arguments: f(a, b, c) -> f_partial(b, c)."
  },
  {
    "id": "js-med-15",
    "topic": "JavaScript & Web Core",
    "difficulty": "Medium",
    "category": "Web Workers",
    "question": "How does Garbage Collection work in V8 (Generational Scavenge for young generation, Mark-Sweep-Compact for old generation)?",
    "keyConcepts": [
      "Web Workers",
      "Architecture",
      "Optimization",
      "Trade-offs"
    ],
    "commonWeakSpots": [
      "Ignoring trade-offs",
      "Not addressing concurrency or memory"
    ],
    "strongIndicators": [
      "Deep implementation understanding",
      "Clear architectural trade-offs",
      "Production insights"
    ],
    "hint": "Discuss the internal mechanics and performance implications of Web Workers.",
    "sampleGoodAnswer": "V8 divides heap into New Space (1-64MB) and Old Space. New Space uses Cheney's Copying Algorithm (Scavenge): semi-spaces (From-space and To-space) evacuate surviving objects back and forth. Objects surviving two scavenges are promoted to Old Space, managed by Mark-Sweep (marks reachable objects, sweeps dead ones) and Mark-Compact (defragments memory)."
  }
],
  hard: [
  {
    "id": "js-hard-1",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Event Loop",
    "question": "Analyze V8 Deoptimization (Deopt) mechanics: How do Polymorphic vs Megamorphic call sites degrade JIT execution speed by 10x?",
    "keyConcepts": [
      "Event Loop",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Event Loop.",
    "sampleGoodAnswer": "V8 optimizes property lookups using inline caches: 1) Monomorphic: call site sees 1 shape, generating direct offset read (fastest); 2) Polymorphic: sees 2-4 shapes, using small switch-jump table; 3) Megamorphic: sees 5+ shapes, falling back to global hash table lookup (10x slower). Passing inconsistent object shapes forces deoptimization and megamorphism."
  },
  {
    "id": "js-hard-2",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Closures",
    "question": "Explain how SharedArrayBuffer, Atomics (wait, notify, compareExchange), and memory fences enable lock-free multi-threaded algorithms in Web Workers.",
    "keyConcepts": [
      "Closures",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Closures.",
    "sampleGoodAnswer": "SharedArrayBuffer allows multiple Web Workers to share raw memory addresses. The Atomics API provides thread-safe operations on shared memory: Atomics.compareExchange guarantees atomic CAS; Atomics.wait puts worker thread to sleep until condition changes; Atomics.notify wakes waiting threads, enabling mutexes and lock-free queues in browser JS."
  },
  {
    "id": "js-hard-3",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Prototypes",
    "question": "How does the V8 Garbage Collector implement Concurrent Marking, Incremental Marking, and Parallel Scavenging to eliminate frame drops?",
    "keyConcepts": [
      "Prototypes",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Prototypes.",
    "sampleGoodAnswer": "V8 minimizes GC pauses via: 1) Incremental Marking: interleaves small slices of marking work with JavaScript execution; 2) Concurrent Marking: background helper threads mark live objects in the heap while the main thread runs JavaScript; 3) Parallel Scavenging: worker threads parallelize young generation evacuation."
  },
  {
    "id": "js-hard-4",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Async/Await",
    "question": "How do you profile and eliminate Microtask Queue Starvation where recursive Promise chains freeze UI rendering completely?",
    "keyConcepts": [
      "Async/Await",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Async/Await.",
    "sampleGoodAnswer": "Microtasks (Promises) run continuously until the microtask queue is completely empty before browser rendering can occur. A recursive promise loop (function loop() { Promise.resolve().then(loop); }) starves the macrotask queue and browser rendering, completely freezing the UI tab without overflowing the call stack."
  },
  {
    "id": "js-hard-5",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "V8 Engine",
    "question": "Explain the JavaScript Memory Model specification (ECMA-262): Memory Barriers, Sequential Consistency, and Tear-free Reads.",
    "keyConcepts": [
      "V8 Engine",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for V8 Engine.",
    "sampleGoodAnswer": "ECMA-262 defines memory order for SharedArrayBuffer and Atomics. Atomics operations provide sequentially consistent ordering: all threads observe atomic reads and writes in the exact same global order, enforced by CPU memory fences (mfence) on x86/ARM to prevent hardware store buffering reordering."
  },
  {
    "id": "js-hard-6",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "DOM & Events",
    "question": "How do you design a high-throughput WebAssembly (WASM) and JavaScript bridge using shared memory buffers with zero serialization overhead?",
    "keyConcepts": [
      "DOM & Events",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for DOM & Events.",
    "sampleGoodAnswer": "WASM shared memory allocates a WebAssembly.Memory buffer accessible by both WASM and JS. By passing pointers and byte offsets into the shared buffer, JS reads typed arrays (Float32Array) directly from WASM heap without stringifying JSON or copying bytes, achieving sub-millisecond data sharing for audio, 3D, and ML models."
  },
  {
    "id": "js-hard-7",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Memory & GC",
    "question": "How does the Blink/Chromium rendering pipeline (DOM, CSSOM, Render Tree, Layout, Paint, Composite) interact with requestAnimationFrame?",
    "keyConcepts": [
      "Memory & GC",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Memory & GC.",
    "sampleGoodAnswer": "Chromium rendering: DOM + CSSOM -> Render Tree -> Layout (computes geometry) -> Paint (draws pixels into layers) -> Composite (GPU compositing). requestAnimationFrame callbacks execute immediately before Layout and Paint, ensuring animations synchronize with display refresh rates (60/120Hz) without jank."
  },
  {
    "id": "js-hard-8",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "ES6+ Features",
    "question": "Explain how JavaScript engines optimize Regular Expressions using Bytecode vs JIT Compilation (Irregexp), and how to prevent ReDoS.",
    "keyConcepts": [
      "ES6+ Features",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for ES6+ Features.",
    "sampleGoodAnswer": "V8 compiles regular expressions into native machine code using the Irregexp engine. Regular Expression Denial of Service (ReDoS) occurs when catastrophic backtracking evaluates nested quantifiers ((a+)+) in O(2^N) exponential time. Prevention: use linear-time regex engines (RE2) or static linter checks."
  },
  {
    "id": "js-hard-9",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Promises",
    "question": "How does the Module Loader specification resolve circular dependencies in ES Modules compared to CommonJS?",
    "keyConcepts": [
      "Promises",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Promises.",
    "sampleGoodAnswer": "In CommonJS, circular dependencies return partially evaluated exports objects. In ES Modules, module bindings are live references: the engine compiles and links bindings across all modules during the static instantiation phase before any code evaluates, allowing circular references to resolve smoothly once exports are defined."
  },
  {
    "id": "js-hard-10",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "TypeScript",
    "question": "How do you build a custom Garbage Collection leak detector in Node.js using v8.getHeapSnapshot() and FinalizationRegistry?",
    "keyConcepts": [
      "TypeScript",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for TypeScript.",
    "sampleGoodAnswer": "FinalizationRegistry registers callbacks when objects are garbage collected. A leak detector tracks objects with weak references; if an object expected to die remains uncollected after forced GC, v8.getHeapSnapshot() serializes the heap, locating retaining paths retaining unmounted closures."
  },
  {
    "id": "js-hard-11",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Modules",
    "question": "Analyze the performance implications of Proxy and Reflect objects in JavaScript. Why do Proxies disable V8 inline caching?",
    "keyConcepts": [
      "Modules",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Modules.",
    "sampleGoodAnswer": "A Proxy wraps an object and intercepts internal operations (get, set, apply). Because Proxy traps execute arbitrary JavaScript functions on every property access, V8 cannot generate fixed shape offsets or inline caches for Proxy objects, incurring a 2x-5x performance penalty over plain object lookups."
  },
  {
    "id": "js-hard-12",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Web APIs",
    "question": "How does Node.js AsyncLocalStorage propagate asynchronous execution context across Promise chains without monkey-patching?",
    "keyConcepts": [
      "Web APIs",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Web APIs.",
    "sampleGoodAnswer": "AsyncLocalStorage uses Node.js internal async_hooks: it intercepts asynchronous resource lifecycles (init, before, after, destroy). When an asynchronous operation (setTimeout, Promise, fetch) is initiated, it inherits the execution context of the calling frame, allowing request IDs and tenant context to propagate transparently."
  },
  {
    "id": "js-hard-13",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Performance",
    "question": "How do you build a High-Performance Virtual DOM diffing algorithm with keyed reconciliation from scratch in TypeScript?",
    "keyConcepts": [
      "Performance",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Performance.",
    "sampleGoodAnswer": "A high-performance Virtual DOM diffing algorithm (like React Fiber or Inferno): 1) Compares old and new virtual nodes; 2) For keyed lists, uses longest increasing subsequence (LIS) algorithm to calculate the minimum number of DOM node moves; 3) Batches DOM mutations into DocumentFragment."
  },
  {
    "id": "js-hard-14",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Security",
    "question": "How does Cross-Site Scripting (XSS) bypass modern filters using DOM clobbering, Prototype Pollution, and Mutation XSS (mXSS)?",
    "keyConcepts": [
      "Security",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Security.",
    "sampleGoodAnswer": "mXSS (Mutation XSS) occurs when HTML is sanitized safely by a library, but the browser's innerHTML parser mutates the markup during DOM serialization into executable script. Prototype Pollution injects properties into Object.prototype; DOM Clobbering uses HTML elements with id/name attributes to override global variables."
  },
  {
    "id": "js-hard-15",
    "topic": "JavaScript & Web Core",
    "difficulty": "Hard",
    "category": "Web Workers",
    "question": "Architect a real-time collaborative canvas application handling 60 FPS rendering with OffscreenCanvas, Web Workers, and WebSockets.",
    "keyConcepts": [
      "Web Workers",
      "Distributed Systems",
      "Low-level Internals",
      "Kernel/Hardware",
      "High Throughput"
    ],
    "commonWeakSpots": [
      "Lacking systems-level insights",
      "Vague descriptions of failure modes"
    ],
    "strongIndicators": [
      "Exact algorithmic details",
      "Hardware/concurrency mechanics",
      "Proven failure mitigations"
    ],
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Web Workers.",
    "sampleGoodAnswer": "Collaborative 60 FPS canvas architecture: 1) Main thread handles user pointer inputs; 2) OffscreenCanvas transferred to a Web Worker; 3) Worker runs rendering loop in requestAnimationFrame; 4) Worker communicates with server over binary WebSocket; 5) CRDT state updates render smoothly without blocking main thread UI."
  }
]
};

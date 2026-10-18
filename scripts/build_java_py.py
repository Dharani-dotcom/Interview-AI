#!/usr/bin/env python3
import json
import os

target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../src/data/topics'))
os.makedirs(target_dir, exist_ok=True)

def write_ts_topic(file_name, export_name, beg_list, med_list, hard_list):
    content = f"""import {{ InterviewQuestionItem }} from '../interviewQuestionsMeta';

export const {export_name}: {{
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
}} = {{
  beginner: {json.dumps(beg_list, indent=2)},
  medium: {json.dumps(med_list, indent=2)},
  hard: {json.dumps(hard_list, indent=2)}
}};
"""
    file_path = os.path.join(target_dir, file_name)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated {file_name}: {len(beg_list)} Beg, {len(med_list)} Med, {len(hard_list)} Hard")

def q(qid, topic, diff, cat, question, key_concepts, weak_spots, strong_indicators, hint, answer):
    return {
        "id": qid,
        "topic": topic,
        "difficulty": diff,
        "category": cat,
        "question": question,
        "keyConcepts": key_concepts,
        "commonWeakSpots": weak_spots,
        "strongIndicators": strong_indicators,
        "hint": hint,
        "sampleGoodAnswer": answer
    }

def make_15(topic, prefix, cat_names, questions_b, questions_m, questions_h, answers_b, answers_m, answers_h):
    beg = []
    med = []
    hard = []
    for i in range(15):
        cat = cat_names[i % len(cat_names)]
        beg.append(q(
            f"{prefix}-beg-{i+1}", topic, "Beginner", cat,
            questions_b[i],
            [cat, "Core Fundamentals", "Best Practices", "Key Principles"],
            ["Surface explanation", "Missing edge cases"],
            ["Strong precise definition", "Clear production context", "Concrete examples"],
            f"Focus on the primary definition and why {cat} is essential in {topic}.",
            answers_b[i]
        ))
        med.append(q(
            f"{prefix}-med-{i+1}", topic, "Medium", cat,
            questions_m[i],
            [cat, "Architecture", "Optimization", "Trade-offs"],
            ["Ignoring trade-offs", "Not addressing concurrency or memory"],
            ["Deep implementation understanding", "Clear architectural trade-offs", "Production insights"],
            f"Discuss the internal mechanics and performance implications of {cat}.",
            answers_m[i]
        ))
        hard.append(q(
            f"{prefix}-hard-{i+1}", topic, "Hard", cat,
            questions_h[i],
            [cat, "Distributed Systems", "Low-level Internals", "Kernel/Hardware", "High Throughput"],
            ["Lacking systems-level insights", "Vague descriptions of failure modes"],
            ["Exact algorithmic details", "Hardware/concurrency mechanics", "Proven failure mitigations"],
            f"Examine the distributed system, OS kernel, or memory model implications for {cat}.",
            answers_h[i]
        ))
    return beg, med, hard

# 1. JAVA & SPRING BOOT
java_cats = ["JVM Memory", "Garbage Collection", "Spring Core", "Spring Boot", "Concurrency", "Collections", "OOP & Interfaces", "JPA & Hibernate", "Transactions", "Spring Security", "Microservices", "Exceptions", "Generics", "Streams & Lambdas", "Performance"]
java_qb = [
    "What is the difference between JDK, JRE, and JVM in Java?",
    "Explain the difference between Heap Memory and Stack Memory in Java.",
    "What is the difference between == and .equals() in Java?",
    "What is the Java String Pool and why are String objects immutable in Java?",
    "What are Java Collections (List, Set, Map), and what is the difference between ArrayList and LinkedList?",
    "What is Inversion of Control (IoC) and Dependency Injection (DI) in Spring Boot?",
    "What is the role of @SpringBootApplication and what three annotations compose it?",
    "What is the difference between @Component, @Service, and @Repository in Spring?",
    "What is the difference between Checked and Unchecked Exceptions in Java?",
    "How does the Java 8 Stream API work, and what is the difference between intermediate and terminal operations?",
    "What are Java Access Modifiers (private, default, protected, public) and their scope?",
    "What is an Abstract Class vs an Interface in modern Java (including default methods)?",
    "How does the Java Garbage Collector detect unused objects?",
    "What is the purpose of the final keyword when applied to variables, methods, and classes in Java?",
    "What is the difference between Synchronous and Asynchronous execution in Spring Boot using @Async?"
]
java_ab = [
    "JDK (Java Development Kit) is the complete software package with compiler (javac) and dev tools. JRE (Java Runtime Environment) provides class libraries and JVM for running compiled bytecode. JVM (Java Virtual Machine) is the abstract execution engine that translates bytecode into machine instructions on the target OS.",
    "Stack memory stores thread-specific primitive values, method call frames, and object references; it is allocated and deallocated automatically in LIFO order with high speed. Heap memory is the shared pool where all objects and class instances reside, managed asynchronously by the Garbage Collector.",
    "The == operator tests primitive values or reference equality (whether two object variables point to the exact same memory address). The .equals() method compares the logical content of two objects, which classes like String, Integer, and custom entities override to compare values.",
    "The String Pool is a specialized cache area in the JVM Metaspace/Heap. Because Strings are immutable (their state cannot change after creation), identical string literals share the exact same reference in the pool, saving memory. Immutability also guarantees thread-safety and prevents security vulnerabilities in database connection strings and class loading.",
    "List is an ordered collection allowing duplicates. Set contains unique elements without duplicates. Map stores key-value pairs. ArrayList is backed by a dynamic resizing array offering O(1) random access but O(N) mid-list insertions. LinkedList is a doubly-linked list with O(1) insertions at head/tail but O(N) traversal.",
    "IoC (Inversion of Control) transfers the responsibility of instantiating and managing object lifecycles from application code to the framework. Dependency Injection (DI) is the design pattern implementing IoC: Spring scans component classes, instantiates them as singleton beans, and injects their dependencies via constructor injection, decoupling components.",
    "@SpringBootApplication is the primary bootstrap annotation comprising: 1) @Configuration (marks class as bean definitions source); 2) @EnableAutoConfiguration (auto-configures beans based on classpath JARs); 3) @ComponentScan (scans packages for @Component, @Service, @Repository).",
    "All three are stereotype annotations extending @Component. @Service signifies business service logic. @Repository indicates data access layer components and automatically translates SQL/database exceptions into Spring's unified DataAccessException hierarchy. @Component is for generic Spring-managed beans.",
    "Checked exceptions (subclasses of Exception excluding RuntimeException) are checked at compile time; methods must declare them via throws or handle via try-catch (e.g. IOException, SQLException). Unchecked exceptions (subclasses of RuntimeException) indicate programmatic bugs (e.g. NullPointerException, IllegalArgumentException) and do not require mandatory handling.",
    "Streams provide functional declarative processing of data sequences. Intermediate operations (filter, map, sorted) transform a stream into another stream and are evaluated lazily. Terminal operations (collect, count, forEach) trigger the actual pipeline computation and produce a non-stream result.",
    "private: accessible only within the declaring class. default (package-private): accessible within the same package. protected: accessible within package and subclasses. public: accessible everywhere.",
    "An abstract class can have instance state (fields), constructors, and partial implementation; a class can only extend one class. An interface defines contracts; classes can implement multiple interfaces. Since Java 8, interfaces can provide default and static methods, and Java 9 added private methods, but interfaces cannot hold mutable instance state.",
    "Garbage Collection uses Tracing Reachability algorithms: it starts from GC Roots (active thread stacks, static variables, JNI references) and traverses object reference graphs. Any object unreachable from GC Roots is deemed garbage and eligible for collection.",
    "When applied to a variable, final makes it an immutable constant (or prevents reference reassignment). Applied to a method, it prevents subclasses from overriding it. Applied to a class, it prevents inheritance (e.g. String is a final class).",
    "Synchronous execution runs sequentially on the calling thread, blocking until completion. @Async instructs Spring to execute the method asynchronously on a separate background thread pool (TaskExecutor), returning a CompletableFuture immediately and unblocking the caller."
]
java_qm = [
    "Explain the G1 Garbage Collector vs ZGC in modern Java. How does ZGC achieve sub-millisecond pause times?",
    "How does the Java Memory Model (JMM) guarantee visibility and ordering with the volatile keyword and happens-before relationships?",
    "How does ConcurrentHashMap achieve high-concurrency thread safety without locking the entire map (Lock Striping vs CAS)?",
    "Explain Spring Bean Scopes (singleton, prototype, request, session) and what happens when a prototype bean is injected into a singleton.",
    "How does Spring AOP (Aspect-Oriented Programming) work under the hood using JDK Dynamic Proxies vs CGLIB?",
    "How does the @Transactional annotation work in Spring, and what causes the 'self-invocation' transaction bypass bug?",
    "How does Hibernate manage Entity States (Transient, Persistent, Detached, Removed) and the First-Level Cache (Persistence Context)?",
    "What is the N+1 Query Problem in JPA/Hibernate, and how do JOIN FETCH and EntityGraphs eliminate it?",
    "How does Spring Boot Auto-Configuration work using @ConditionalOnClass and spring.factories / META-INF/spring?",
    "What are Java Virtual Threads (Project Loom, Java 21) and how do they differ from OS platform threads?",
    "How do you implement distributed caching in Spring Boot using Redis and @Cacheable, @CacheEvict with TTL?",
    "How does Spring Security filter chain authenticate requests using SecurityFilterChain and OncePerRequestFilter?",
    "What is the Java ForkJoinPool and how does parallelStream() utilize work-stealing across CPU cores?",
    "How do you design a resilient Circuit Breaker and Retry mechanism in Spring Cloud using Resilience4j?",
    "How do you troubleshoot JVM memory leaks and CPU spikes in production using jcmd, jstack, and async-profiler?"
]
java_am = [
    "G1 GC partitions the heap into equal regions and collects regions with the most garbage first (Garbage-First) with configurable target pause times (~200ms). ZGC (Z Garbage Collector) uses colored pointers and load barriers to perform marking and compaction concurrently with application worker threads, achieving sub-millisecond pauses (<1ms) even on multi-terabyte heaps.",
    "JMM defines how threads interact through memory. The volatile keyword provides: 1) Visibility: reads and writes bypass CPU registers and L1/L2 caches, synchronizing directly with main memory; 2) Ordering: establishes a happens-before relationship preventing instruction reordering by compiler and CPU via memory fences/barriers.",
    "In Java 8+, ConcurrentHashMap discarded Segment locks in favor of fine-grained node-level synchronization: reads are completely lock-free via volatile field reads; insertions into empty buckets use lock-free Compare-And-Swap (CAS); updates to existing buckets synchronize only on the head Node of that specific hash bucket, maximizing parallelism across cores.",
    "Singleton creates one instance per Spring context; Prototype creates a new instance on every request. If a prototype bean is injected into a singleton bean, it is only injected once during singleton initialization, making the prototype behave like a singleton. Fix: use ObjectFactory<MyBean>, @Lookup method injection, or Provider interface.",
    "Spring AOP creates proxy wrappers around target beans: if the class implements an interface, it defaults to JDK Dynamic Proxies (java.lang.reflect.Proxy); if not, it uses CGLIB bytecode generation (subclassing target class). When a method is called, the proxy intercepts execution to apply advice (@Around, @Before, @Transactional) before delegating to the real object.",
    "@Transactional uses AOP proxies: the proxy intercepts the call, opens a database transaction, invokes the target method, and commits or rolls back on runtime exceptions. The self-invocation bug happens when method A calls method B within the same class (this.b()): the call bypasses the Spring proxy and invokes target code directly, so @Transactional on method B is completely ignored.",
    "1) Transient: new object not associated with a session or database ID; 2) Persistent: managed by Hibernate Session/EntityManager, tracked in First-Level Cache; 3) Detached: session closed, changes untracked; 4) Removed: scheduled for SQL delete. The First-Level Cache deduplicates entities by ID and batches SQL writes via dirty checking on transaction commit.",
    "The N+1 problem occurs when fetching a list of N parent entities (1 query) and accessing a lazily-loaded child collection (e.g. user.getOrders()), triggering N separate SQL queries to load children for each parent (N+1 queries total). Solutions: 1) Query with 'JOIN FETCH p.orders'; 2) Use @EntityGraph to define eager fetch plans; 3) Use Hibernate batch size (@BatchSize(size = 50)).",
    "Spring Boot auto-configuration inspects classpath dependencies on startup. Files in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports list configuration classes guarded by conditional annotations like @ConditionalOnClass (DataSource.class) and @ConditionalOnMissingBean. If conditions evaluate true, default configuration beans are registered automatically.",
    "OS platform threads are expensive 1:1 kernel threads with 1MB stacks, limiting a JVM to ~5,000 threads. Virtual Threads (Java 21) are M:N user-mode threads managed by the JVM runtime: when a virtual thread blocks on socket I/O or sleep, the JVM unmounts it from its carrier OS thread, allowing millions of concurrent virtual threads to run with minimal RAM overhead.",
    "Spring Cache abstraction enables declarative caching: @Cacheable(value = 'products', key = '#id') checks Redis first and returns cached data on hit; @CacheEvict(value = 'products', key = '#id') removes stale entries on update; RedisCacheConfiguration sets JSON serialization and TTL (Time-To-Live) expiration to prevent stale data.",
    "Spring Security operates as a DelegatingFilterProxy that forwards incoming HTTP requests to a FilterChainProxy. This chain of security filters (SecurityContextPersistenceFilter, BearerTokenAuthenticationFilter, AuthorizationFilter) processes authentication credentials, populates SecurityContextHolder with Authentication tokens, and checks role permissions.",
    "ForkJoinPool implements divide-and-conquer processing using Work-Stealing: each worker thread maintains a double-ended queue (deque) of tasks. When a thread finishes its own tasks, it steals tasks from the tail of another busy thread's deque, ensuring balanced CPU core utilization during parallelStream() operations.",
    "Resilience4j provides lightweight fault-tolerance: @CircuitBreaker monitors failure rates and trips open if failures exceed threshold, returning a fallback response; @Retry retries transient failures with exponential backoff; @RateLimiter bounds request rates; @Bulkhead limits concurrent calls to downstream dependencies to prevent resource exhaustion.",
    "1) jcmd <pid> GC.heap_dump /path/dump.hprof captures heap snapshots, analyzed in Eclipse Memory Analyzer (MAT) for memory leaks; 2) jstack <pid> captures thread dumps, revealing thread contention, deadlocks, and blocked states; 3) async-profiler generates flame graphs identifying exact CPU-burning methods with minimal profiling overhead."
]
java_qh = [
    "Analyze the JVM Garbage Collection Ergonomics and Safepoints. How do Time-To-Safepoint (TTSP) delays cause mysterious multi-second latency spikes?",
    "How does the JVM Just-In-Time (JIT) C2 compiler perform Escape Analysis, Scalar Replacement, and Monomorphic Inlining?",
    "Explain the hardware mechanics of False Sharing in Java concurrent programming and how @Contended / cache-line padding solves it.",
    "How do you design a High-Frequency Low-Latency Java application with Zero-Garbage techniques (RingBuffers, Off-Heap Unsafe/MemorySegment)?",
    "How does the LMAX Disruptor architecture achieve 6,000,000 transactions/sec in Java without using locks or blocking queues?",
    "How does ClassLoader isolation work in OSGi or Spring Boot DevTools, and what causes java.lang.LinkageError and Metaspace OOM?",
    "How does Distributed Transaction Management (Two-Phase Commit vs Saga Pattern) scale across Spring Boot microservices with Kafka?",
    "Explain Hibernate Second-Level Cache (L2C) invalidation strategies with Redis / Hazelcast in a multi-node clustered deployment.",
    "How do you debug native memory leaks outside the JVM heap (DirectByteBuffers, JNI, C libraries, Metaspace) using jemalloc / pmap?",
    "How does Spring Cloud Gateway use Project Reactor Netty for non-blocking reactive routing and backpressure handling?",
    "What are the internal concurrency mechanics of the AQS (AbstractQueuedSynchronizer) that powers ReentrantLock and CountDownLatch?",
    "How do you tune Linux kernel network buffers (SO_RCVBUF, SO_SNDBUF, TCP backlog) for a Spring Boot service handling 100,000 persistent connections?",
    "How do you implement Idempotent Consumer patterns with Transactional Outbox and Debezium CDC in Spring Boot and Kafka?",
    "How does GraalVM Native Image Ahead-Of-Time (AOT) compilation work with Spring Boot 3, and what are its reflection/proxy limitations?",
    "Design a mission-critical Banking Core ledger in Java and Spring Boot with distributed locks, double-entry bookkeeping, and sub-10ms SLA."
]
java_ah = [
    "Safepoints are execution points where all thread registers and stacks are consistent, allowing the JVM to pause application threads for GC or deoptimization. Time-To-Safepoint (TTSP) delays occur when a thread is stuck in an uncounted loop (e.g. 'for (long i=0; i<N; i++)') that lacks safepoint poll checks. The GC thread cannot start until all threads reach a safepoint, causing the entire JVM to stall for seconds waiting for a single thread.",
    "JIT C2 compiler optimizations: 1) Escape Analysis: determines if an object allocated in a method escapes into heap/fields; if it does not escape, C2 eliminates heap allocation via Scalar Replacement (allocating fields directly into CPU registers or stack); 2) Monomorphic Inlining: if a virtual call site always invokes the exact same concrete class, C2 replaces the virtual method call with inline code, removing call overhead entirely.",
    "CPU cores cache memory in 64-byte Cache Lines. False Sharing occurs when two independent variables accessed concurrently by two different CPU cores reside on the same 64-byte cache line: when Core 1 updates variable A, it invalidates the entire cache line in Core 2's L1/L2 cache, forcing Core 2 to reload variable B from slow RAM. In Java 8+, @jdk.internal.vm.annotation.Contended inserts 128 bytes of padding to guarantee variables occupy separate cache lines.",
    "Zero-Garbage Java design: 1) Pre-allocate all objects in pools during startup to eliminate runtime allocations; 2) Use primitive collections (fastutil, Eclipse Collections) to avoid object boxing/unboxing; 3) Store data off-heap using Java 22 Foreign Function and Memory API (MemorySegment) or sun.misc.Unsafe; 4) Use lock-free circular RingBuffers (Disruptor) for inter-thread communication.",
    "The LMAX Disruptor achieves millions of operations per second by replacing blocking queues with a pre-allocated circular RingBuffer. It uses: 1) Single-Writer or lock-free CAS sequence cursors; 2) Cache-line padding to prevent false sharing; 3) Memory barriers instead of heavy kernel mutex locks; 4) Batching consumer reads, enabling ultra-fast cache-friendly processing.",
    "ClassLoaders form a hierarchy (Bootstrap -> Platform -> Application). A class is uniquely identified in the JVM by (ClassName, ClassLoaderInstance). If two different ClassLoaders load the same class, casting between them throws ClassCastException or LinkageError. Metaspace OOM occurs when dynamic class generation (e.g. unconstrained CGLIB/byte-buddy proxies or redeploying apps without unregistering ThreadLocals/drivers) accumulates classes that cannot be unloaded.",
    "2PC (Two-Phase Commit / XA) creates synchronous distributed locks across databases, degrading availability and throughput. High-scale microservices use the Saga Pattern: a choreography or orchestration state machine executes local database transactions sequentially. If a step fails, the saga executes compensating transactions in reverse order, using Kafka for idempotent event delivery.",
    "Hibernate L2C caches entity data across sessions. In multi-node clusters, updating an entity on Node 1 must invalidate cached entries on Nodes 2 and 3. Using Redis or Hazelcast as L2C, Hibernate uses distributed pub/sub to broadcast invalidation keys on commit, ensuring nodes evict stale entity caches without reading uncommitted dirty data.",
    "Native memory leaks occur outside the JVM heap. Debugging steps: 1) Enable Native Memory Tracking: -XX:NativeMemoryTracking=detail and inspect via jcmd <pid> VM.native_memory baseline/detail; 2) Preload jemalloc: LD_PRELOAD=/usr/lib/libjemalloc.so with MALLOC_CONF=prof:true to generate memory allocation heap dumps; 3) Use pmap -x <pid> to map memory segments and locate runaway DirectByteBuffers.",
    "Spring Cloud Gateway uses Project Reactor and Netty: incoming TCP connections run on an event-driven Netty event loop (typically 1 worker thread per CPU core). Reactive streams use Reactive-Streams Backpressure (request(n)) so that if downstream microservices slow down, Netty throttles socket reads on the ingress channel rather than buffering megabytes in server RAM.",
    "AbstractQueuedSynchronizer (AQS) is the foundation of JUC synchronization. It maintains a volatile int state variable and a FIFO CLH lock queue of waiting threads. Threads attempt to acquire the lock using atomic CAS on state; if acquisition fails, the thread is enqueued and parked via LockSupport.park(); when the holder releases, it unparks the head thread.",
    "Tuning for 100k connections: 1) Increase OS file descriptor limits: ulimit -n 1000000; 2) Increase TCP listen backlog: net.core.somaxconn = 65535; 3) Tune TCP buffer memory: net.ipv4.tcp_rmem and tcp_wmem; 4) Enable TCP keepalive and reuse: net.ipv4.tcp_tw_reuse = 1; 5) Configure Netty event loops to avoid thread starvation.",
    "The Transactional Outbox Pattern guarantees at-least-once message delivery: within the business database transaction, insert an event into an outbox table in the same DB. Debezium captures this outbox insert from the database commit log (WAL) and streams it to Kafka. The consumer implements an Idempotent Consumer: before processing, it verifies whether event_id was previously recorded in an idempotency table.",
    "GraalVM Native Image compiles Spring Boot apps into standalone native machine binaries with sub-50ms startup and tiny memory footprints. Limitations: static analysis cannot detect dynamic reflection, dynamic proxies, or resources loaded at runtime without explicit Reachability Metadata (reflect-config.json) provided via Spring AOT engine.",
    "Banking Core Ledger design: 1) Double-Entry Bookkeeping: every transaction consists of balancing debit and credit entries committed atomically in a single ACID transaction; 2) Optimistic Concurrency with account version numbers; 3) Distributed Redis Redlock for hot account concurrency; 4) Immutable audit trail written to append-only partitioned event logs."
]

jb, jm, jh = make_15("Java & Spring Boot", "java", java_cats, java_qb, java_qm, java_qh, java_ab, java_am, java_ah)
write_ts_topic('java.ts', 'javaQuestions', jb, jm, jh)

# 2. PYTHON & DATA SCIENCE
py_cats = ["Core Python", "GIL & Concurrency", "Memory Management", "Generators", "OOP & Dunder", "Decorators", "NumPy", "Pandas", "Asyncio", "Data Pipelines", "Multiprocessing", "Type Hints", "Profiling", "C Extensions", "Production"]
py_qb = [
    "What is the Global Interpreter Lock (GIL) in CPython, and how does it affect CPU-bound multi-threaded programs?",
    "Explain Python Memory Management: Reference Counting and the Cyclic Garbage Collector.",
    "What is the difference between deepcopy() and copy() in Python?",
    "What are Python Generators and yield? Why are they memory efficient for large datasets?",
    "What is the difference between list, tuple, set, and dictionary in Python, and what are their time complexities?",
    "What is a Python Decorator, and how do you write a decorator that measures function execution time?",
    "What are Python Dunder (magic) methods (e.g. __init__, __str__, __repr__, __getitem__)?",
    "What are *args and **kwargs in Python function definitions?",
    "Explain Python's asyncio event loop and how async/await enables non-blocking asynchronous I/O.",
    "What is the difference between Multithreading and Multiprocessing in Python, and when should you use each?",
    "How does NumPy achieve 10x-100x speedups over pure Python lists using Vectorization and contiguous memory?",
    "What are List, Dict, and Set Comprehensions, and when should you prefer a generator expression instead?",
    "What is the difference between is and == in Python?",
    "What are Python Type Hints and what does Pydantic add for runtime validation?",
    "What is the difference between pass, continue, and break in Python loops?"
]
py_ab = [
    "The GIL is a mutex in CPython preventing multiple native threads from executing Python bytecode simultaneously. For I/O-bound programs, threads release the GIL during network/disk waits; but for CPU-bound tasks, multithreading cannot achieve multi-core parallelism due to GIL contention, requiring the multiprocessing module instead.",
    "Python primarily uses Reference Counting: every object tracks how many references point to it; when reference count drops to 0, memory is immediately freed. To detect circular references (e.g. object A references B, and B references A), Python runs a generational cyclic garbage collector across 3 generations.",
    "copy() creates a shallow copy: it constructs a new collection object but populates it with references to the child objects of the original. deepcopy() recursively copies all nested objects, creating completely independent copies of the entire object graph.",
    "Generators are functions that use yield instead of return. Instead of computing an entire 10GB dataset and storing it in RAM, a generator evaluates items lazily one at a time on demand, retaining execution state between calls and keeping memory usage constant O(1).",
    "List: mutable ordered array, O(1) append, O(N) search. Tuple: immutable ordered sequence, lower memory overhead. Set: mutable unordered collection of unique hashable elements, O(1) lookup. Dictionary: hash map storing key-value pairs with O(1) amortized lookup, insertion, and deletion.",
    "A decorator is a higher-order function that takes a function as argument and returns a wrapped function, extending behavior without modifying the original source code. A timing decorator wraps the function, records start = time.perf_counter(), invokes the function, records end, and prints duration.",
    "Dunder methods (double underscore) define how objects interact with Python operators and built-in functions: __init__ initializes instance state; __str__ returns human-readable string for print(); __repr__ returns unambiguous developer representation; __getitem__ enables indexing (obj[key]).",
    "*args allows passing an arbitrary number of positional arguments as a tuple. **kwargs allows passing an arbitrary number of keyword arguments as a dictionary, providing flexible function signatures and forwarding arguments to wrapped functions.",
    "asyncio implements a single-threaded cooperative multitasking event loop. When a coroutine hits await on an asynchronous I/O operation (socket, file, HTTP call), it yields control back to the event loop, which executes other ready coroutines rather than blocking.",
    "Multithreading uses lightweight OS threads sharing memory, constrained by the GIL: ideal for I/O-bound tasks (web scraping, API calls). Multiprocessing spawns separate OS processes with independent Python interpreters, memory spaces, and GILs: ideal for CPU-bound computations (image processing, ML data transformations).",
    "NumPy arrays store elements of a single homogeneous datatype in contiguous blocks of memory, avoiding Python object pointer indirection. Operations are executed in optimized C and Fortran vectorized loops that utilize CPU SIMD (Single Instruction, Multiple Data) instructions.",
    "Comprehensions construct collections concisely: [x*2 for x in data]. If the collection has 10,000,000 items, a list comprehension materializes all elements in RAM simultaneously; a generator expression (x*2 for x in data) computes values lazily without memory spike.",
    "== checks value equality (invoking __eq__ to compare contents). is checks identity equality (verifying if both variables point to the exact same memory address: id(a) == id(b)). You should always use is None instead of == None.",
    "Type hints (PEP 484) declare expected types for static analysis (via mypy). Python does not enforce type hints at runtime. Pydantic parses and enforces type hints at runtime, coercing inputs and raising ValidationError for invalid data structures.",
    "pass is a null statement placeholder that does nothing. continue skips the remainder of the current loop iteration and moves to the next. break terminates the loop immediately."
]
py_qm = [
    "Explain Python Metaclasses and what happens during class creation (__new__ vs __init__).",
    "How does the Python Descriptor Protocol work (__get__, __set__, __delete__), and how does it power @property?",
    "Explain Context Managers and the __enter__ / __exit__ protocol, including exception suppression.",
    "How do NumPy broadcasting rules work when performing arithmetic across arrays of different shapes?",
    "Explain Pandas Vectorized operations vs .apply() vs .itertuples(). Why is .itertuples() 100x faster than iterrows()?",
    "How does the CPython memory allocator (PyMalloc) manage small object allocations (arenas, pools, blocks)?",
    "What is the difference between asyncio.gather() and asyncio.wait() / TaskGroup in modern Python 3.11+?",
    "How do you profile Python CPU and Memory bottlenecks using cProfile, py-spy, and memory_profiler?",
    "Explain Structural Pattern Matching (match/case) introduced in Python 3.10 and its destructuring capabilities.",
    "How does Cython or Pybind11 bridge Python with C/C++ to eliminate performance bottlenecks in data science?",
    "What is the difference between process-based and thread-based concurrency when working with NumPy and PyTorch?",
    "How do you implement custom Serialization and Deserialization in Pydantic v2 (Rust-backed core)?",
    "Explain how functools.lru_cache works, its cache eviction policy, and why passing unhashable types raises TypeError.",
    "How do you architect a production-grade ETL data pipeline with Polars vs Pandas for 100GB datasets?",
    "What is PEP 703 (Free-threaded Python / No-GIL Python 3.13) and how does it achieve true multi-core threading?"
]
py_am = [
    "A metaclass is the class of a class: while an object is an instance of a class, a class is an instance of a metaclass (type by default). Metaclasses customize class creation: __new__ allocates and constructs the class object itself, while __init__ initializes it before it is registered in the namespace.",
    "Descriptors are objects defining any of __get__, __set__, or __delete__. When an attribute is looked up on an instance, Python's attribute lookup checks if the attribute is a descriptor. @property is implemented as a data descriptor that binds getter and setter methods to attribute access dynamically.",
    "Context managers manage setup and teardown: __enter__ runs before the block and returns an acquired resource; __exit__(exc_type, exc_val, exc_tb) executes after the block. If __exit__ returns True, it suppresses any exception raised inside the with block.",
    "Broadcasting allows NumPy arithmetic on arrays of different dimensions without copying data. Two dimensions are compatible if: 1) they are equal, or 2) one of them is 1. Dimensions are compared starting from the trailing (rightmost) dimension; dimensions of size 1 are virtually stretched to match the larger dimension.",
    "Vectorized operations execute in compiled C code at SIMD speeds. .apply() runs Python function call overhead per row. iterrows() boxes each row into a slow Pandas Series object. .itertuples() iterates rows as lightweight namedtuples, running up to 100x faster than iterrows().",
    "PyMalloc optimizes small allocations (<=512 bytes): 1) Blocks: fixed-size memory chunks; 2) Pools: 4KB pages composed of identical block sizes; 3) Arenas: 256KB memory chunks allocated from the OS. Objects >512 bytes bypass PyMalloc and use standard system malloc().",
    "asyncio.gather() awaits multiple futures concurrently and returns results in input order, canceling remaining tasks if return_exceptions=False. Python 3.11 TaskGroup provides structured concurrency: if one task in the group raises an exception, all other active tasks are automatically canceled, preventing leaked background coroutines.",
    "cProfile tracks function call counts and cumulative execution times with deterministic tracing. py-spy is a sampling profiler that attaches to running Python processes without code changes, outputting flame graphs. memory_profiler records line-by-line RAM allocation.",
    "match/case allows structural pattern matching with value matching, sequence destructuring, mapping destructuring, and class pattern inspection with guards (if condition), providing expressive type-safe parsing of complex nested JSON and AST nodes.",
    "Cython compiles Python-like code with C type declarations into native C extensions. Pybind11 provides modern C++11 header-only bindings to expose C++ classes and functions to Python, allowing high-performance numerical routines to run with direct memory access.",
    "NumPy and PyTorch release the CPython GIL during underlying C/CUDA computations. Therefore, multi-threaded Python can achieve 100% multi-core CPU utilization when running vector math and matrix multiplications without needing the overhead of separate processes.",
    "Pydantic v2 is rebuilt in Rust (pydantic-core), running 5x-50x faster. Custom validation uses @field_validator and @model_validator with mode='before' (raw inputs) or mode='after' (typed instance), with custom serializers defined via @field_serializer.",
    "lru_cache decorates functions with an in-memory Least-Recently-Used hash table cache. Function arguments serve as the dictionary key; therefore, all arguments must be hashable (immutable). Passing lists or dicts raises TypeError: unhashable type.",
    "Pandas is single-threaded and memory-inefficient (allocating 5x-10x dataset size in RAM). Polars is written in Rust, uses Apache Arrow columnar format, and executes queries lazily using a query optimizer with multi-threaded parallel execution, processing 100GB datasets efficiently.",
    "PEP 703 introduces experimental free-threaded CPython (available in Python 3.13) which removes the GIL. It replaces the single lock with mimalloc thread-safe memory allocation, biased reference counting, and per-object locks, enabling true multi-core parallel execution on threads."
]
py_qh = [
    "Analyze the internal architecture of CPython's Garbage Collector: How do Generation 0, 1, and 2 thresholds and GC untracking work?",
    "Explain the mechanics of Python Generators at the C level: PyGenObject, f_lasti bytecode offset, and frame evaluation.",
    "How does Asyncio implement task scheduling under the hood? Walk through the Epoll/Kqueue selector loop and Future callback chains.",
    "How do you design a Zero-Copy memory architecture in Python using the Buffer Protocol (memoryview) and Py_buffer?",
    "Explain how Apache Arrow and Plasma Shared Memory enable zero-copy inter-process communication across Python worker processes.",
    "How does PyTorch Autograd construct and traverse dynamic computation graphs (DAG) during the backward pass?",
    "How do you debug severe Memory Fragmentation in long-running Python server processes where memory_usage grows but gc.collect() reclaims 0 objects?",
    "How do you write a C extension using the Python C API (PyObject*, Py_INCREF, Py_DECREF) without introducing reference leaks?",
    "How does the CPython bytecode compiler and eval loop (ceval.c) optimize instruction dispatch using Computed Gotox?",
    "How do you architect a Distributed Task Queue in Python using Celery / Redis with idempotent tasks and Dead Letter Queues?",
    "Explain how DuckDB integrates with Python to run out-of-core vectorized analytical SQL queries directly on multi-gigabyte Parquet files.",
    "How do you implement custom GPU CUDA kernels for Python using CuPy or Numba @cuda.jit?",
    "How does PyPy's Tracing JIT achieve near-C speeds by identifying hot loops and emitting machine code?",
    "How do you secure Python microservices against arbitrary code execution when unpickling data (pickle vulnerability and safe alternatives)?",
    "Design a real-time Financial Market Data Stream Processing engine in Python processing 500,000 tick events/sec with sub-5ms latency."
]
py_ah = [
    "CPython's cyclic GC uses 3 generations: Gen 0 (new objects), Gen 1, and Gen 2 (long-lived). GC runs when allocation counts exceed thresholds (e.g. 700). Objects with no pointers (like strings and tuples of primitives) are untracked by the GC to avoid useless cycle-checking overhead.",
    "At the C level, a generator is a PyGenObject holding a PyFrameObject. When yield executes, the interpreter stores the instruction pointer f_lasti in the frame, suspends execution, and returns the yielded PyObject*. When next() is called, PyGen_Send resumes execution at f_lasti + 1 with intact local variables.",
    "asyncio uses selectors (epoll on Linux, kqueue on macOS). The event loop maintains a deque of ready callbacks and an I/O selector registration table. When a socket blocks, a Future registers a callback with the OS selector and yields; when epoll_wait signals readability, the callback enqueues the Task on the ready queue.",
    "The Python Buffer Protocol (Py_buffer) allows C extensions to share raw memory buffers without copying data. memoryview wraps an existing buffer, enabling slicing, indexing, and casting types directly on underlying memory with zero bytes of duplication.",
    "Apache Arrow standardizes columnar in-memory data format across languages. Plasma Shared Memory stores Arrow record batches in POSIX shared memory (/dev/shm): multiple independent Python worker processes map the exact same memory addresses, reading datasets with 0ms deserialization overhead.",
    "PyTorch Autograd tracks tensor operations during the forward pass by constructing a dynamic Directed Acyclic Graph (DAG) where nodes are Node/Function objects and edges are tensor dependencies. During .backward(), the engine traverses the DAG in reverse topological order, applying vector-Jacobian products.",
    "Memory fragmentation happens when PyMalloc allocates thousands of small objects across 256KB arenas; if a single small object remains in an arena, the entire 256KB arena cannot be returned to the OS. Solution: tune MALLOC_TRIM_THRESHOLD_, use jemalloc, or spawn worker processes that restart periodically.",
    "In the Python C API, PyObject* references must be tracked manually: Py_INCREF increments reference count; Py_DECREF decrements it. Returning a new object passes ownership (New Reference); inspecting an object without incrementing borrows the reference. Missing DECREFs cause permanent memory leaks.",
    "ceval.c is CPython's central execution loop. Instead of a slow switch-case statement that incurs branch mispredictions, modern CPython uses Computed Goto (GCC/Clang extension): an array of jump labels jumps directly to the handler for the next opcode, maximizing CPU branch prediction accuracy.",
    "Celery task queue architecture: Redis/RabbitMQ acts as broker; tasks are assigned unique UUIDs and serialized to JSON; workers execute with concurrency pools; idempotent execution is enforced via Redis locks; failed tasks are retried with exponential backoff and routed to Dead Letter Queues on max failures.",
    "DuckDB is an in-process vectorized analytical SQL engine. It reads Parquet metadata to push down projections and filters directly to disk chunks, streaming columnar vectors into CPU cache without loading the whole file into RAM, achieving 10x-50x speedups over Pandas.",
    "Numba @cuda.jit compiles Python numerical code to PTX machine code on NVIDIA GPUs. Developers define thread and block grids (cuda.grid(1)), allocate shared GPU memory, synchronize threads via cuda.syncthreads(), and launch kernels directly from NumPy arrays.",
    "PyPy uses a Tracing JIT: it monitors running Python code, identifies hot loops, traces the exact sequence of low-level operations during loop iterations, optimizes the linear trace (unrolling loops, constant folding), and compiles it to native machine instructions.",
    "pickle is fundamentally insecure: unpickling untrusted data allows attackers to execute arbitrary shell commands via __reduce__ injection. Secure alternatives: JSON, Protocol Buffers, FlatBuffers, or cryptographic signing (hmac) to verify authenticity before unpickling.",
    "Financial tick processor design: 1) Ingress via uvloop with zero-copy socket buffers; 2) PyArrow streaming decoder; 3) Shared-memory ring buffer (multiprocessing shared_memory) routing to C++ Cython calculation workers; 4) Sliding-window aggregation over rolling 1s/5s intervals."
]

pb, pm, ph = make_15("Python & Data Science", "python", py_cats, py_qb, py_qm, py_qh, py_ab, py_am, py_ah)
write_ts_topic('python.ts', 'pythonQuestions', pb, pm, ph)

print("Java and Python topic question banks written successfully.")

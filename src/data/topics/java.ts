import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const javaQuestions: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: [
  {
    "id": "java-beg-1",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "JVM Memory",
    "question": "What is the difference between JDK, JRE, and JVM in Java?",
    "keyConcepts": [
      "JVM Memory",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why JVM Memory is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "JDK (Java Development Kit) is the complete software package with compiler (javac) and dev tools. JRE (Java Runtime Environment) provides class libraries and JVM for running compiled bytecode. JVM (Java Virtual Machine) is the abstract execution engine that translates bytecode into machine instructions on the target OS."
  },
  {
    "id": "java-beg-2",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Garbage Collection",
    "question": "Explain the difference between Heap Memory and Stack Memory in Java.",
    "keyConcepts": [
      "Garbage Collection",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Garbage Collection is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "Stack memory stores thread-specific primitive values, method call frames, and object references; it is allocated and deallocated automatically in LIFO order with high speed. Heap memory is the shared pool where all objects and class instances reside, managed asynchronously by the Garbage Collector."
  },
  {
    "id": "java-beg-3",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Spring Core",
    "question": "What is the difference between == and .equals() in Java?",
    "keyConcepts": [
      "Spring Core",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Spring Core is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "The == operator tests primitive values or reference equality (whether two object variables point to the exact same memory address). The .equals() method compares the logical content of two objects, which classes like String, Integer, and custom entities override to compare values."
  },
  {
    "id": "java-beg-4",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Spring Boot",
    "question": "What is the Java String Pool and why are String objects immutable in Java?",
    "keyConcepts": [
      "Spring Boot",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Spring Boot is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "The String Pool is a specialized cache area in the JVM Metaspace/Heap. Because Strings are immutable (their state cannot change after creation), identical string literals share the exact same reference in the pool, saving memory. Immutability also guarantees thread-safety and prevents security vulnerabilities in database connection strings and class loading."
  },
  {
    "id": "java-beg-5",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Concurrency",
    "question": "What are Java Collections (List, Set, Map), and what is the difference between ArrayList and LinkedList?",
    "keyConcepts": [
      "Concurrency",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Concurrency is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "List is an ordered collection allowing duplicates. Set contains unique elements without duplicates. Map stores key-value pairs. ArrayList is backed by a dynamic resizing array offering O(1) random access but O(N) mid-list insertions. LinkedList is a doubly-linked list with O(1) insertions at head/tail but O(N) traversal."
  },
  {
    "id": "java-beg-6",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Collections",
    "question": "What is Inversion of Control (IoC) and Dependency Injection (DI) in Spring Boot?",
    "keyConcepts": [
      "Collections",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Collections is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "IoC (Inversion of Control) transfers the responsibility of instantiating and managing object lifecycles from application code to the framework. Dependency Injection (DI) is the design pattern implementing IoC: Spring scans component classes, instantiates them as singleton beans, and injects their dependencies via constructor injection, decoupling components."
  },
  {
    "id": "java-beg-7",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "OOP & Interfaces",
    "question": "What is the role of @SpringBootApplication and what three annotations compose it?",
    "keyConcepts": [
      "OOP & Interfaces",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why OOP & Interfaces is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "@SpringBootApplication is the primary bootstrap annotation comprising: 1) @Configuration (marks class as bean definitions source); 2) @EnableAutoConfiguration (auto-configures beans based on classpath JARs); 3) @ComponentScan (scans packages for @Component, @Service, @Repository)."
  },
  {
    "id": "java-beg-8",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "JPA & Hibernate",
    "question": "What is the difference between @Component, @Service, and @Repository in Spring?",
    "keyConcepts": [
      "JPA & Hibernate",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why JPA & Hibernate is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "All three are stereotype annotations extending @Component. @Service signifies business service logic. @Repository indicates data access layer components and automatically translates SQL/database exceptions into Spring's unified DataAccessException hierarchy. @Component is for generic Spring-managed beans."
  },
  {
    "id": "java-beg-9",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Transactions",
    "question": "What is the difference between Checked and Unchecked Exceptions in Java?",
    "keyConcepts": [
      "Transactions",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Transactions is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "Checked exceptions (subclasses of Exception excluding RuntimeException) are checked at compile time; methods must declare them via throws or handle via try-catch (e.g. IOException, SQLException). Unchecked exceptions (subclasses of RuntimeException) indicate programmatic bugs (e.g. NullPointerException, IllegalArgumentException) and do not require mandatory handling."
  },
  {
    "id": "java-beg-10",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Spring Security",
    "question": "How does the Java 8 Stream API work, and what is the difference between intermediate and terminal operations?",
    "keyConcepts": [
      "Spring Security",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Spring Security is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "Streams provide functional declarative processing of data sequences. Intermediate operations (filter, map, sorted) transform a stream into another stream and are evaluated lazily. Terminal operations (collect, count, forEach) trigger the actual pipeline computation and produce a non-stream result."
  },
  {
    "id": "java-beg-11",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Microservices",
    "question": "What are Java Access Modifiers (private, default, protected, public) and their scope?",
    "keyConcepts": [
      "Microservices",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Microservices is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "private: accessible only within the declaring class. default (package-private): accessible within the same package. protected: accessible within package and subclasses. public: accessible everywhere."
  },
  {
    "id": "java-beg-12",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Exceptions",
    "question": "What is an Abstract Class vs an Interface in modern Java (including default methods)?",
    "keyConcepts": [
      "Exceptions",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Exceptions is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "An abstract class can have instance state (fields), constructors, and partial implementation; a class can only extend one class. An interface defines contracts; classes can implement multiple interfaces. Since Java 8, interfaces can provide default and static methods, and Java 9 added private methods, but interfaces cannot hold mutable instance state."
  },
  {
    "id": "java-beg-13",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Generics",
    "question": "How does the Java Garbage Collector detect unused objects?",
    "keyConcepts": [
      "Generics",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Generics is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "Garbage Collection uses Tracing Reachability algorithms: it starts from GC Roots (active thread stacks, static variables, JNI references) and traverses object reference graphs. Any object unreachable from GC Roots is deemed garbage and eligible for collection."
  },
  {
    "id": "java-beg-14",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Streams & Lambdas",
    "question": "What is the purpose of the final keyword when applied to variables, methods, and classes in Java?",
    "keyConcepts": [
      "Streams & Lambdas",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Streams & Lambdas is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "When applied to a variable, final makes it an immutable constant (or prevents reference reassignment). Applied to a method, it prevents subclasses from overriding it. Applied to a class, it prevents inheritance (e.g. String is a final class)."
  },
  {
    "id": "java-beg-15",
    "topic": "Java & Spring Boot",
    "difficulty": "Beginner",
    "category": "Performance",
    "question": "What is the difference between Synchronous and Asynchronous execution in Spring Boot using @Async?",
    "keyConcepts": [
      "Performance",
      "Core Fundamentals",
      "Best Practices",
      "Key Principles"
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
    "hint": "Focus on the primary definition and why Performance is essential in Java & Spring Boot.",
    "sampleGoodAnswer": "Synchronous execution runs sequentially on the calling thread, blocking until completion. @Async instructs Spring to execute the method asynchronously on a separate background thread pool (TaskExecutor), returning a CompletableFuture immediately and unblocking the caller."
  }
],
  medium: [
  {
    "id": "java-med-1",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "JVM Memory",
    "question": "Explain the G1 Garbage Collector vs ZGC in modern Java. How does ZGC achieve sub-millisecond pause times?",
    "keyConcepts": [
      "JVM Memory",
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
    "hint": "Discuss the internal mechanics and performance implications of JVM Memory.",
    "sampleGoodAnswer": "G1 GC partitions the heap into equal regions and collects regions with the most garbage first (Garbage-First) with configurable target pause times (~200ms). ZGC (Z Garbage Collector) uses colored pointers and load barriers to perform marking and compaction concurrently with application worker threads, achieving sub-millisecond pauses (<1ms) even on multi-terabyte heaps."
  },
  {
    "id": "java-med-2",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Garbage Collection",
    "question": "How does the Java Memory Model (JMM) guarantee visibility and ordering with the volatile keyword and happens-before relationships?",
    "keyConcepts": [
      "Garbage Collection",
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
    "hint": "Discuss the internal mechanics and performance implications of Garbage Collection.",
    "sampleGoodAnswer": "JMM defines how threads interact through memory. The volatile keyword provides: 1) Visibility: reads and writes bypass CPU registers and L1/L2 caches, synchronizing directly with main memory; 2) Ordering: establishes a happens-before relationship preventing instruction reordering by compiler and CPU via memory fences/barriers."
  },
  {
    "id": "java-med-3",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Spring Core",
    "question": "How does ConcurrentHashMap achieve high-concurrency thread safety without locking the entire map (Lock Striping vs CAS)?",
    "keyConcepts": [
      "Spring Core",
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
    "hint": "Discuss the internal mechanics and performance implications of Spring Core.",
    "sampleGoodAnswer": "In Java 8+, ConcurrentHashMap discarded Segment locks in favor of fine-grained node-level synchronization: reads are completely lock-free via volatile field reads; insertions into empty buckets use lock-free Compare-And-Swap (CAS); updates to existing buckets synchronize only on the head Node of that specific hash bucket, maximizing parallelism across cores."
  },
  {
    "id": "java-med-4",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Spring Boot",
    "question": "Explain Spring Bean Scopes (singleton, prototype, request, session) and what happens when a prototype bean is injected into a singleton.",
    "keyConcepts": [
      "Spring Boot",
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
    "hint": "Discuss the internal mechanics and performance implications of Spring Boot.",
    "sampleGoodAnswer": "Singleton creates one instance per Spring context; Prototype creates a new instance on every request. If a prototype bean is injected into a singleton bean, it is only injected once during singleton initialization, making the prototype behave like a singleton. Fix: use ObjectFactory<MyBean>, @Lookup method injection, or Provider interface."
  },
  {
    "id": "java-med-5",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Concurrency",
    "question": "How does Spring AOP (Aspect-Oriented Programming) work under the hood using JDK Dynamic Proxies vs CGLIB?",
    "keyConcepts": [
      "Concurrency",
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
    "hint": "Discuss the internal mechanics and performance implications of Concurrency.",
    "sampleGoodAnswer": "Spring AOP creates proxy wrappers around target beans: if the class implements an interface, it defaults to JDK Dynamic Proxies (java.lang.reflect.Proxy); if not, it uses CGLIB bytecode generation (subclassing target class). When a method is called, the proxy intercepts execution to apply advice (@Around, @Before, @Transactional) before delegating to the real object."
  },
  {
    "id": "java-med-6",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Collections",
    "question": "How does the @Transactional annotation work in Spring, and what causes the 'self-invocation' transaction bypass bug?",
    "keyConcepts": [
      "Collections",
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
    "hint": "Discuss the internal mechanics and performance implications of Collections.",
    "sampleGoodAnswer": "@Transactional uses AOP proxies: the proxy intercepts the call, opens a database transaction, invokes the target method, and commits or rolls back on runtime exceptions. The self-invocation bug happens when method A calls method B within the same class (this.b()): the call bypasses the Spring proxy and invokes target code directly, so @Transactional on method B is completely ignored."
  },
  {
    "id": "java-med-7",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "OOP & Interfaces",
    "question": "How does Hibernate manage Entity States (Transient, Persistent, Detached, Removed) and the First-Level Cache (Persistence Context)?",
    "keyConcepts": [
      "OOP & Interfaces",
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
    "hint": "Discuss the internal mechanics and performance implications of OOP & Interfaces.",
    "sampleGoodAnswer": "1) Transient: new object not associated with a session or database ID; 2) Persistent: managed by Hibernate Session/EntityManager, tracked in First-Level Cache; 3) Detached: session closed, changes untracked; 4) Removed: scheduled for SQL delete. The First-Level Cache deduplicates entities by ID and batches SQL writes via dirty checking on transaction commit."
  },
  {
    "id": "java-med-8",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "JPA & Hibernate",
    "question": "What is the N+1 Query Problem in JPA/Hibernate, and how do JOIN FETCH and EntityGraphs eliminate it?",
    "keyConcepts": [
      "JPA & Hibernate",
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
    "hint": "Discuss the internal mechanics and performance implications of JPA & Hibernate.",
    "sampleGoodAnswer": "The N+1 problem occurs when fetching a list of N parent entities (1 query) and accessing a lazily-loaded child collection (e.g. user.getOrders()), triggering N separate SQL queries to load children for each parent (N+1 queries total). Solutions: 1) Query with 'JOIN FETCH p.orders'; 2) Use @EntityGraph to define eager fetch plans; 3) Use Hibernate batch size (@BatchSize(size = 50))."
  },
  {
    "id": "java-med-9",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Transactions",
    "question": "How does Spring Boot Auto-Configuration work using @ConditionalOnClass and spring.factories / META-INF/spring?",
    "keyConcepts": [
      "Transactions",
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
    "hint": "Discuss the internal mechanics and performance implications of Transactions.",
    "sampleGoodAnswer": "Spring Boot auto-configuration inspects classpath dependencies on startup. Files in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports list configuration classes guarded by conditional annotations like @ConditionalOnClass (DataSource.class) and @ConditionalOnMissingBean. If conditions evaluate true, default configuration beans are registered automatically."
  },
  {
    "id": "java-med-10",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Spring Security",
    "question": "What are Java Virtual Threads (Project Loom, Java 21) and how do they differ from OS platform threads?",
    "keyConcepts": [
      "Spring Security",
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
    "hint": "Discuss the internal mechanics and performance implications of Spring Security.",
    "sampleGoodAnswer": "OS platform threads are expensive 1:1 kernel threads with 1MB stacks, limiting a JVM to ~5,000 threads. Virtual Threads (Java 21) are M:N user-mode threads managed by the JVM runtime: when a virtual thread blocks on socket I/O or sleep, the JVM unmounts it from its carrier OS thread, allowing millions of concurrent virtual threads to run with minimal RAM overhead."
  },
  {
    "id": "java-med-11",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Microservices",
    "question": "How do you implement distributed caching in Spring Boot using Redis and @Cacheable, @CacheEvict with TTL?",
    "keyConcepts": [
      "Microservices",
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
    "hint": "Discuss the internal mechanics and performance implications of Microservices.",
    "sampleGoodAnswer": "Spring Cache abstraction enables declarative caching: @Cacheable(value = 'products', key = '#id') checks Redis first and returns cached data on hit; @CacheEvict(value = 'products', key = '#id') removes stale entries on update; RedisCacheConfiguration sets JSON serialization and TTL (Time-To-Live) expiration to prevent stale data."
  },
  {
    "id": "java-med-12",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Exceptions",
    "question": "How does Spring Security filter chain authenticate requests using SecurityFilterChain and OncePerRequestFilter?",
    "keyConcepts": [
      "Exceptions",
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
    "hint": "Discuss the internal mechanics and performance implications of Exceptions.",
    "sampleGoodAnswer": "Spring Security operates as a DelegatingFilterProxy that forwards incoming HTTP requests to a FilterChainProxy. This chain of security filters (SecurityContextPersistenceFilter, BearerTokenAuthenticationFilter, AuthorizationFilter) processes authentication credentials, populates SecurityContextHolder with Authentication tokens, and checks role permissions."
  },
  {
    "id": "java-med-13",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Generics",
    "question": "What is the Java ForkJoinPool and how does parallelStream() utilize work-stealing across CPU cores?",
    "keyConcepts": [
      "Generics",
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
    "hint": "Discuss the internal mechanics and performance implications of Generics.",
    "sampleGoodAnswer": "ForkJoinPool implements divide-and-conquer processing using Work-Stealing: each worker thread maintains a double-ended queue (deque) of tasks. When a thread finishes its own tasks, it steals tasks from the tail of another busy thread's deque, ensuring balanced CPU core utilization during parallelStream() operations."
  },
  {
    "id": "java-med-14",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Streams & Lambdas",
    "question": "How do you design a resilient Circuit Breaker and Retry mechanism in Spring Cloud using Resilience4j?",
    "keyConcepts": [
      "Streams & Lambdas",
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
    "hint": "Discuss the internal mechanics and performance implications of Streams & Lambdas.",
    "sampleGoodAnswer": "Resilience4j provides lightweight fault-tolerance: @CircuitBreaker monitors failure rates and trips open if failures exceed threshold, returning a fallback response; @Retry retries transient failures with exponential backoff; @RateLimiter bounds request rates; @Bulkhead limits concurrent calls to downstream dependencies to prevent resource exhaustion."
  },
  {
    "id": "java-med-15",
    "topic": "Java & Spring Boot",
    "difficulty": "Medium",
    "category": "Performance",
    "question": "How do you troubleshoot JVM memory leaks and CPU spikes in production using jcmd, jstack, and async-profiler?",
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
    "sampleGoodAnswer": "1) jcmd <pid> GC.heap_dump /path/dump.hprof captures heap snapshots, analyzed in Eclipse Memory Analyzer (MAT) for memory leaks; 2) jstack <pid> captures thread dumps, revealing thread contention, deadlocks, and blocked states; 3) async-profiler generates flame graphs identifying exact CPU-burning methods with minimal profiling overhead."
  }
],
  hard: [
  {
    "id": "java-hard-1",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "JVM Memory",
    "question": "Analyze the JVM Garbage Collection Ergonomics and Safepoints. How do Time-To-Safepoint (TTSP) delays cause mysterious multi-second latency spikes?",
    "keyConcepts": [
      "JVM Memory",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for JVM Memory.",
    "sampleGoodAnswer": "Safepoints are execution points where all thread registers and stacks are consistent, allowing the JVM to pause application threads for GC or deoptimization. Time-To-Safepoint (TTSP) delays occur when a thread is stuck in an uncounted loop (e.g. 'for (long i=0; i<N; i++)') that lacks safepoint poll checks. The GC thread cannot start until all threads reach a safepoint, causing the entire JVM to stall for seconds waiting for a single thread."
  },
  {
    "id": "java-hard-2",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Garbage Collection",
    "question": "How does the JVM Just-In-Time (JIT) C2 compiler perform Escape Analysis, Scalar Replacement, and Monomorphic Inlining?",
    "keyConcepts": [
      "Garbage Collection",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Garbage Collection.",
    "sampleGoodAnswer": "JIT C2 compiler optimizations: 1) Escape Analysis: determines if an object allocated in a method escapes into heap/fields; if it does not escape, C2 eliminates heap allocation via Scalar Replacement (allocating fields directly into CPU registers or stack); 2) Monomorphic Inlining: if a virtual call site always invokes the exact same concrete class, C2 replaces the virtual method call with inline code, removing call overhead entirely."
  },
  {
    "id": "java-hard-3",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Spring Core",
    "question": "Explain the hardware mechanics of False Sharing in Java concurrent programming and how @Contended / cache-line padding solves it.",
    "keyConcepts": [
      "Spring Core",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Spring Core.",
    "sampleGoodAnswer": "CPU cores cache memory in 64-byte Cache Lines. False Sharing occurs when two independent variables accessed concurrently by two different CPU cores reside on the same 64-byte cache line: when Core 1 updates variable A, it invalidates the entire cache line in Core 2's L1/L2 cache, forcing Core 2 to reload variable B from slow RAM. In Java 8+, @jdk.internal.vm.annotation.Contended inserts 128 bytes of padding to guarantee variables occupy separate cache lines."
  },
  {
    "id": "java-hard-4",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Spring Boot",
    "question": "How do you design a High-Frequency Low-Latency Java application with Zero-Garbage techniques (RingBuffers, Off-Heap Unsafe/MemorySegment)?",
    "keyConcepts": [
      "Spring Boot",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Spring Boot.",
    "sampleGoodAnswer": "Zero-Garbage Java design: 1) Pre-allocate all objects in pools during startup to eliminate runtime allocations; 2) Use primitive collections (fastutil, Eclipse Collections) to avoid object boxing/unboxing; 3) Store data off-heap using Java 22 Foreign Function and Memory API (MemorySegment) or sun.misc.Unsafe; 4) Use lock-free circular RingBuffers (Disruptor) for inter-thread communication."
  },
  {
    "id": "java-hard-5",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Concurrency",
    "question": "How does the LMAX Disruptor architecture achieve 6,000,000 transactions/sec in Java without using locks or blocking queues?",
    "keyConcepts": [
      "Concurrency",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Concurrency.",
    "sampleGoodAnswer": "The LMAX Disruptor achieves millions of operations per second by replacing blocking queues with a pre-allocated circular RingBuffer. It uses: 1) Single-Writer or lock-free CAS sequence cursors; 2) Cache-line padding to prevent false sharing; 3) Memory barriers instead of heavy kernel mutex locks; 4) Batching consumer reads, enabling ultra-fast cache-friendly processing."
  },
  {
    "id": "java-hard-6",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Collections",
    "question": "How does ClassLoader isolation work in OSGi or Spring Boot DevTools, and what causes java.lang.LinkageError and Metaspace OOM?",
    "keyConcepts": [
      "Collections",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Collections.",
    "sampleGoodAnswer": "ClassLoaders form a hierarchy (Bootstrap -> Platform -> Application). A class is uniquely identified in the JVM by (ClassName, ClassLoaderInstance). If two different ClassLoaders load the same class, casting between them throws ClassCastException or LinkageError. Metaspace OOM occurs when dynamic class generation (e.g. unconstrained CGLIB/byte-buddy proxies or redeploying apps without unregistering ThreadLocals/drivers) accumulates classes that cannot be unloaded."
  },
  {
    "id": "java-hard-7",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "OOP & Interfaces",
    "question": "How does Distributed Transaction Management (Two-Phase Commit vs Saga Pattern) scale across Spring Boot microservices with Kafka?",
    "keyConcepts": [
      "OOP & Interfaces",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for OOP & Interfaces.",
    "sampleGoodAnswer": "2PC (Two-Phase Commit / XA) creates synchronous distributed locks across databases, degrading availability and throughput. High-scale microservices use the Saga Pattern: a choreography or orchestration state machine executes local database transactions sequentially. If a step fails, the saga executes compensating transactions in reverse order, using Kafka for idempotent event delivery."
  },
  {
    "id": "java-hard-8",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "JPA & Hibernate",
    "question": "Explain Hibernate Second-Level Cache (L2C) invalidation strategies with Redis / Hazelcast in a multi-node clustered deployment.",
    "keyConcepts": [
      "JPA & Hibernate",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for JPA & Hibernate.",
    "sampleGoodAnswer": "Hibernate L2C caches entity data across sessions. In multi-node clusters, updating an entity on Node 1 must invalidate cached entries on Nodes 2 and 3. Using Redis or Hazelcast as L2C, Hibernate uses distributed pub/sub to broadcast invalidation keys on commit, ensuring nodes evict stale entity caches without reading uncommitted dirty data."
  },
  {
    "id": "java-hard-9",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Transactions",
    "question": "How do you debug native memory leaks outside the JVM heap (DirectByteBuffers, JNI, C libraries, Metaspace) using jemalloc / pmap?",
    "keyConcepts": [
      "Transactions",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Transactions.",
    "sampleGoodAnswer": "Native memory leaks occur outside the JVM heap. Debugging steps: 1) Enable Native Memory Tracking: -XX:NativeMemoryTracking=detail and inspect via jcmd <pid> VM.native_memory baseline/detail; 2) Preload jemalloc: LD_PRELOAD=/usr/lib/libjemalloc.so with MALLOC_CONF=prof:true to generate memory allocation heap dumps; 3) Use pmap -x <pid> to map memory segments and locate runaway DirectByteBuffers."
  },
  {
    "id": "java-hard-10",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Spring Security",
    "question": "How does Spring Cloud Gateway use Project Reactor Netty for non-blocking reactive routing and backpressure handling?",
    "keyConcepts": [
      "Spring Security",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Spring Security.",
    "sampleGoodAnswer": "Spring Cloud Gateway uses Project Reactor and Netty: incoming TCP connections run on an event-driven Netty event loop (typically 1 worker thread per CPU core). Reactive streams use Reactive-Streams Backpressure (request(n)) so that if downstream microservices slow down, Netty throttles socket reads on the ingress channel rather than buffering megabytes in server RAM."
  },
  {
    "id": "java-hard-11",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Microservices",
    "question": "What are the internal concurrency mechanics of the AQS (AbstractQueuedSynchronizer) that powers ReentrantLock and CountDownLatch?",
    "keyConcepts": [
      "Microservices",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Microservices.",
    "sampleGoodAnswer": "AbstractQueuedSynchronizer (AQS) is the foundation of JUC synchronization. It maintains a volatile int state variable and a FIFO CLH lock queue of waiting threads. Threads attempt to acquire the lock using atomic CAS on state; if acquisition fails, the thread is enqueued and parked via LockSupport.park(); when the holder releases, it unparks the head thread."
  },
  {
    "id": "java-hard-12",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Exceptions",
    "question": "How do you tune Linux kernel network buffers (SO_RCVBUF, SO_SNDBUF, TCP backlog) for a Spring Boot service handling 100,000 persistent connections?",
    "keyConcepts": [
      "Exceptions",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Exceptions.",
    "sampleGoodAnswer": "Tuning for 100k connections: 1) Increase OS file descriptor limits: ulimit -n 1000000; 2) Increase TCP listen backlog: net.core.somaxconn = 65535; 3) Tune TCP buffer memory: net.ipv4.tcp_rmem and tcp_wmem; 4) Enable TCP keepalive and reuse: net.ipv4.tcp_tw_reuse = 1; 5) Configure Netty event loops to avoid thread starvation."
  },
  {
    "id": "java-hard-13",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Generics",
    "question": "How do you implement Idempotent Consumer patterns with Transactional Outbox and Debezium CDC in Spring Boot and Kafka?",
    "keyConcepts": [
      "Generics",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Generics.",
    "sampleGoodAnswer": "The Transactional Outbox Pattern guarantees at-least-once message delivery: within the business database transaction, insert an event into an outbox table in the same DB. Debezium captures this outbox insert from the database commit log (WAL) and streams it to Kafka. The consumer implements an Idempotent Consumer: before processing, it verifies whether event_id was previously recorded in an idempotency table."
  },
  {
    "id": "java-hard-14",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Streams & Lambdas",
    "question": "How does GraalVM Native Image Ahead-Of-Time (AOT) compilation work with Spring Boot 3, and what are its reflection/proxy limitations?",
    "keyConcepts": [
      "Streams & Lambdas",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Streams & Lambdas.",
    "sampleGoodAnswer": "GraalVM Native Image compiles Spring Boot apps into standalone native machine binaries with sub-50ms startup and tiny memory footprints. Limitations: static analysis cannot detect dynamic reflection, dynamic proxies, or resources loaded at runtime without explicit Reachability Metadata (reflect-config.json) provided via Spring AOT engine."
  },
  {
    "id": "java-hard-15",
    "topic": "Java & Spring Boot",
    "difficulty": "Hard",
    "category": "Performance",
    "question": "Design a mission-critical Banking Core ledger in Java and Spring Boot with distributed locks, double-entry bookkeeping, and sub-10ms SLA.",
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
    "sampleGoodAnswer": "Banking Core Ledger design: 1) Double-Entry Bookkeeping: every transaction consists of balancing debit and credit entries committed atomically in a single ACID transaction; 2) Optimistic Concurrency with account version numbers; 3) Distributed Redis Redlock for hot account concurrency; 4) Immutable audit trail written to append-only partitioned event logs."
  }
]
};

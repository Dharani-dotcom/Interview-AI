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
            [cat, "Core Fundamentals", "Best Practices", "Foundations"],
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

# 1. C++ & SYSTEM PROGRAMMING
cpp_cats = ["Memory Management", "RAII", "Pointers", "Smart Pointers", "Move Semantics", "Templates", "STL Containers", "OOP & Inheritance", "Virtual Functions", "Constexpr", "Concurrency", "Casting", "Exceptions", "Compilation", "Performance"]
cpp_qb = [
    "What is the difference between Stack and Heap memory allocation in C++?",
    "What is a Pointer vs a Reference in C++?",
    "What is Resource Acquisition Is Initialization (RAII) and why is it fundamental in C++?",
    "What is the difference between std::unique_ptr, std::shared_ptr, and std::weak_ptr?",
    "What is the difference between passing by value, passing by pointer, and passing by reference?",
    "What is a Memory Leak in C++, and how do smart pointers prevent it?",
    "What is the difference between struct and class in C++?",
    "What are Virtual Functions and Virtual Destructors in C++?",
    "What are C++ templates and how do they enable generic programming?",
    "What is the difference between std::vector, std::list, and std::deque in STL?",
    "What is the Rule of Three / Rule of Five in modern C++?",
    "What is the difference between const and constexpr in C++?",
    "What are C++ Named Casts (static_cast, dynamic_cast, const_cast, reinterpret_cast)?",
    "What is the purpose of the explicit keyword in C++ constructor declarations?",
    "What is Undefined Behavior (UB) in C++, and what are common examples?"
]
cpp_ab = [
    "Stack memory is managed automatically by the compiler in LIFO order; allocation is a single CPU stack pointer decrement (extremely fast). Heap memory is allocated dynamically at runtime via new/malloc; requires manual deallocation (delete/free) or smart pointers, risking fragmentation and memory leaks.",
    "A pointer is a variable holding a memory address (can be reassigned, can be null, requires dereferencing *p). A reference is an immutable alias to an existing object (must be initialized upon declaration, cannot be null, uses standard dot syntax).",
    "RAII binds the lifecycle of a resource (heap memory, file handles, mutex locks, network sockets) to the lifetime of a stack-allocated object. The resource is acquired in the constructor and automatically released in the destructor when the object leaves scope, guaranteeing leak-free cleanup even upon exceptions.",
    "unique_ptr represents exclusive ownership (cannot be copied, only moved via std::move). shared_ptr represents shared ownership with an atomic reference count control block (freed when count reaches 0). weak_ptr holds a non-owning observer reference to a shared_ptr without incrementing the reference count, breaking circular reference cycles.",
    "Pass-by-value copies the argument into function stack (expensive for large objects). Pass-by-pointer passes a memory address (requires null checks and dereferencing). Pass-by-const-reference (const T&) passes a reference without copying while preventing modification, optimal for large non-trivial types.",
    "A memory leak occurs when heap memory allocated via new/malloc is never deallocated with delete/free, permanently consuming RAM until process exit. Modern C++ avoids raw new/delete entirely by using RAII containers (std::vector, std::string) and smart pointers (std::unique_ptr), which automatically free heap memory on destruction.",
    "In C++, struct and class are identical with one exception: members and base classes of a struct default to public; members and base classes of a class default to private.",
    "Virtual functions enable dynamic runtime polymorphism: declaring a base method virtual ensures calling it on a base pointer invokes the derived class's overridden implementation via the vtable. A base class with virtual methods must have a virtual destructor; otherwise deleting a derived object via a base pointer causes undefined behavior and leaked derived resources.",
    "Templates allow functions and classes to operate with generic types. Code is generated at compile time through template instantiation: the compiler generates specialized, highly optimized assembly for each concrete type used, achieving zero runtime overhead.",
    "std::vector is a contiguous dynamic array (O(1) random access, cache-friendly). std::list is a doubly-linked list (O(1) insertion anywhere once located, poor cache locality). std::deque is a double-ended queue backed by chunks of arrays (O(1) insertion at both front and back).",
    "If a class manages a raw resource, you must define: 1) Destructor; 2) Copy Constructor; 3) Copy Assignment Operator (Rule of Three). In C++11+, also define: 4) Move Constructor; 5) Move Assignment Operator (Rule of Five) to support move semantics and prevent shallow copy double-free errors.",
    "const specifies a runtime read-only variable whose value cannot be modified after initialization. constexpr specifies a compile-time constant expression evaluated during compilation, usable in template parameters, array sizes, and static assertions.",
    "static_cast: compile-time checked conversion between related types. dynamic_cast: runtime checked downcasting in polymorphic class hierarchies (uses RTTI). const_cast: casts away const-ness. reinterpret_cast: low-level bit reinterpretation between unrelated types (e.g. pointer to integer).",
    "The explicit keyword on a single-argument constructor prevents the compiler from performing implicit type conversions and copy-initialization, preventing subtle bugs where unexpected temporary objects are constructed implicitly.",
    "Undefined Behavior means the C++ standard places no constraints on execution: the compiler may reorder instructions, delete code, crash, or produce silent data corruption. Examples: dereferencing nullptr, accessing out-of-bounds arrays, signed integer overflow, use-after-free, and data races."
]
cpp_qm = [
    "Explain Move Semantics, Rvalue References (T&&), and std::move. How do they eliminate expensive deep copies?",
    "How does the Virtual Method Table (vtable) and vptr pointer implement dynamic dispatch at the machine assembly level?",
    "What is Perfect Forwarding and std::forward, and how does universal/forwarding reference (T&& in templates) work with reference collapsing?",
    "Explain SFINAE (Substitution Failure Is Not An Error) and how C++20 Concepts replace std::enable_if.",
    "How does memory alignment, struct padding, and alignas affect cache performance and memory footprint in C++?",
    "Explain the C++ Memory Model: std::atomic, memory orders (memory_order_relaxed, acquire, release, seq_cst), and hardware memory fences.",
    "What is Small String Optimization (SSO) in std::string, and how does it avoid heap allocations for short strings?",
    "How do custom STL Allocators work, and why do game engines and HFT firms use Arena/Pool Allocators instead of default malloc/free?",
    "What is the difference between undefined behavior, unspecified behavior, and implementation-defined behavior in C++?",
    "How do std::thread, std::mutex, std::lock_guard, and std::unique_lock prevent race conditions in multi-threaded C++?",
    "Explain Type Erasure in C++ and how std::function and std::any implement it without exposing concrete types.",
    "What are Coroutines in C++20 (co_await, co_yield, co_return), and how do promise_type and coroutine_handle work?",
    "How does Copy Elision and Named Return Value Optimization (NRVO) optimize object construction?",
    "What is the Curiously Recurring Template Pattern (CRTP) and how does it achieve static compile-time polymorphism?",
    "How do you profile cache misses (L1/L2/LLC), branch mispredictions, and instruction throughput using Linux perf and Valgrind?"
]
cpp_am = [
    "Move semantics transfer ownership of expensive heap resources from an rvalue (temporary object about to be destroyed) to a new object without allocating new memory or copying bytes. T&& denotes an rvalue reference. std::move is an unconditional cast to an rvalue reference, invoking the move constructor which steals raw pointers and nulls out the source.",
    "When a class declares a virtual function, the compiler creates a static array of function pointers called a vtable. Each object of that class contains an invisible pointer (vptr) pointing to its class vtable. At runtime, invoking ptr->foo() resolves via indirect call: (*(ptr->vptr[index]))(ptr), adding a single pointer indirection.",
    "Universal references (T&& in template deduction) bind to lvalues as lvalue references and to rvalues as rvalues according to Reference Collapsing rules (& + & = &, && + & = &, && + && = &&). std::forward<T>(arg) casts arg back to its original value category, perfectly forwarding it to target functions without unnecessary copies.",
    "SFINAE states that if a template substitution results in invalid code, the compiler does not produce an error; it simply discards that overload. std::enable_if exploited SFINAE to constrain templates. C++20 Concepts (e.g. template <std::integral T>) replace SFINAE with clean compile-time predicates and human-readable compiler errors.",
    "CPUs access memory in aligned words (4, 8, 16 bytes). Compilers insert padding bytes between struct members to align them to multiples of their natural size. Ordering struct fields from largest to smallest (e.g. double, int, char) minimizes padding bytes and packs data tightly, maximizing L1 cache line utilization.",
    "std::atomic provides lock-free thread-safe operations. Memory orders: 1) memory_order_seq_cst: default globally consistent total order; 2) memory_order_acquire: ensures subsequent reads/writes cannot be reordered before this read; 3) memory_order_release: ensures prior writes are visible to another thread performing acquire; 4) memory_order_relaxed: atomic without synchronization.",
    "Small String Optimization (SSO) avoids heap allocation for short strings (typically <= 15-22 characters). The std::string object contains an internal union buffer: if the string fits, characters are stored directly on the stack inside the string object itself; only when size exceeds the buffer does it allocate heap memory.",
    "Default malloc/new uses general-purpose heap allocators with global lock contention and memory fragmentation. Custom Arena/Pool Allocators pre-allocate a large contiguous block of memory during startup; allocations advance a pointer (O(1)), and freeing the entire arena deallocates all objects simultaneously in O(1) with zero fragmentation.",
    "Implementation-defined: behavior must be documented by compiler (e.g. sizeof(int)). Unspecified: valid behavior chosen from bounded choices (e.g. order of evaluation of function arguments). Undefined (UB): no rules; compiler may generate invalid code, crash, or introduce vulnerabilities.",
    "std::mutex provides exclusive lock access. std::lock_guard provides strict RAII lock acquisition and release on scope exit. std::unique_lock provides flexible deferred locking, timed locking, and manual unlocking, required when working with std::condition_variable.",
    "Type Erasure encapsulates heterogeneous types behind a uniform interface without template parameter infection. std::function stores any callable object (lambda, function pointer, functor) by wrapping it in an internal abstract base class with a virtual invoke() method, using a small-buffer optimization for lightweight callables.",
    "C++20 coroutines are stackless functions that can suspend and resume execution. When a function contains co_await, co_yield, or co_return, the compiler compiles its local variables and instruction pointer into a heap-allocated coroutine state object, coordinated via promise_type and coroutine_handle.",
    "Copy Elision is a compiler optimization where the compiler omits copy and move constructors entirely, constructing the object directly into the storage of the target destination. In C++17, Return Value Optimization (RVO) of prvalues is mandatory; Named RVO (NRVO) on local named variables is a common compiler optimization.",
    "CRTP: a derived class inherits from a template base instantiated with the derived class itself: class Derived : public Base<Derived>. Inside Base, methods cast this to Derived* (static_cast<Derived*>(this)->impl()), achieving compile-time polymorphic dispatch with zero vtable pointer indirection or virtual call overhead.",
    "Linux perf hardware counters: perf stat -e cache-misses,branch-misses,instructions,cycles ./program measures hardware metrics. perf record -g captures call-graph samples, visualized as flame graphs. Valgrind Massif profiles heap allocations; Cachegrind simulates CPU cache hierarchies."
]
cpp_qh = [
    "Analyze Lock-Free Single-Producer Single-Consumer (SPSC) queue implementation using circular buffers and memory_order_acquire/release.",
    "How does the Linux epoll subsystem work in C++ network servers (Edge-Triggered vs Level-Triggered, epoll_data, and non-blocking sockets)?",
    "Explain Low-Latency Kernel Bypass networking in C++ using DPDK (Data Plane Development Kit) or Solarflare OpenOnload.",
    "Analyze the C++20 Memory Model Formalism: Release Sequences, Data Races, Consume Semantics, and Atomic Read-Modify-Write operations.",
    "How do you design a High-Frequency Trading (HFT) Matching Engine in C++ with sub-microsecond tick-to-trade latency?",
    "Explain the internal implementation of std::coroutine: Frame Allocation, Promise Object, and Awaiter Protocol (await_ready, await_suspend, await_resume).",
    "How do you write a custom JIT compiler or dynamic machine code generator in C++ using LLVM C++ APIs or AsmJit?",
    "Explain CPU Cache Coherency Protocols (MESI / MOESI) and how cache invalidation queues cause memory reordering at the hardware bus level.",
    "How do you implement Lock-Free Multi-Producer Multi-Consumer (MPMC) queues using Michael-Scott queues or Flat Combining?",
    "Analyze the security vulnerability of Return-Oriented Programming (ROP) in C++ and how ASLR, DEP/NX, and Shadow Stacks (Intel CET) prevent it.",
    "How do you implement SIMD Vectorization in C++ using AVX-512 / AVX2 intrinsics (_mm256_load_ps, _mm256_fmadd_ps) for 8x matrix multiplication speedup?",
    "Explain how the Linux OOM Killer evaluates badness scores and how to configure mlockall and HugePages for mission-critical C++ daemons.",
    "How do you design a custom Garbage Collector (Mark-Sweep or Reference Counting) embedded in a C++ game engine or runtime?",
    "How does Link-Time Optimization (LTO) and Profile-Guided Optimization (PGO) cross module boundaries to optimize binary layout in GCC/Clang?",
    "Design a distributed In-Memory Key-Value Storage engine in C++ with Raft consensus, zero-copy TCP networking, and MVCC storage."
]
cpp_ah = [
    "An SPSC queue uses a fixed-size ring buffer array with atomic head and tail indices: Producer writes data at tail and increments tail with memory_order_release; Consumer reads at head and increments head with memory_order_release. The consumer reads tail with memory_order_acquire to ensure it observes written data before advancing, achieving zero locks and sub-10ns latency.",
    "epoll monitors multiple file descriptors: 1) Level-Triggered (default): epoll_wait returns readiness repeatedly as long as buffer has data; 2) Edge-Triggered (EPOLLET): epoll_wait signals only when state transitions (new data arrives); sockets must be non-blocking (O_NONBLOCK) and the application must read/write in a loop until EAGAIN/EWOULDBLOCK.",
    "Standard Linux socket read traverses kernel network stack (interrupt, sk_buff allocation, context switch, memory copy to user space), incurring 2-5 microseconds of latency. Kernel Bypass (DPDK / Solarflare EF_VI) maps the network card (NIC) ring buffers directly into user space memory, polling NIC queues continuously with zero context switches and sub-microsecond latency.",
    "C++ memory model defines synchronization without data races. A release operation on an atomic variable synchronizes-with an acquire operation on the same variable. Release sequences ensure that intervening read-modify-write operations (like fetch_add) do not break the synchronization edge between the original releaser and the final acquirer.",
    "HFT Matching Engine design: 1) Single-threaded core execution pinned to isolated CPU core (isolcpus); 2) Pre-allocated contiguous order book arrays (bids/asks sorted by price-time); 3) Zero heap allocations on the hot path; 4) Cache-line aligned data structures; 5) Kernel-bypass networking via DPDK; 6) Lock-free ring buffer output logging.",
    "The compiler transforms a coroutine into: 1) Coroutine Frame containing local variables, promise object, and state index; 2) Awaiter protocol: await_ready() returns bool (skip suspension if true); await_suspend(handle) suspends frame and registers callback; await_resume() returns value when resumed; 3) destroy() frees the frame.",
    "Dynamic JIT with LLVM: 1) Initialize LLVM Target and ExecutionEngine; 2) Build IR modules using llvm::IRBuilder (creating BasicBlocks, instructions); 3) Run LLVM optimization passes (mem2reg, inline, vectorize); 4) Compile to executable machine code in memory via LLJIT, returning a function pointer callable from C++.",
    "MESI protocol states: Modified, Exclusive, Shared, Invalid. CPUs maintain cache coherence by broadcasting invalidation messages over the interconnect bus. To avoid stalling on bus acknowledgments, CPUs use Store Buffers and Invalidation Queues; these hardware optimizations cause instruction reordering, necessitating CPU memory barriers (mfence, lfence, sfence).",
    "Michael-Scott lock-free queue uses a singly linked list with atomic head and tail pointers. Enqueue appends via atomic CAS on tail->next; if successful, it swings tail to new node. Flat Combining replaces lock-free contention with a single designated combiner thread that processes batched requests from other threads in a single cache-efficient pass.",
    "ROP exploits stack buffer overflows: attackers overwrite return addresses to chain together small existing machine instruction sequences ending in 'ret' ('gadgets') to execute arbitrary code without injecting new shellcode. Defenses: ASLR (randomizes memory layout); DEP/NX (marks stack non-executable); Intel CET (Shadow Stack hardware tracking return addresses).",
    "AVX-512 intrinsics process 512-bit registers (16 single-precision floats simultaneously). For matrix multiplication: load rows using _mm512_load_ps, broadcast coefficients using _mm512_set1_ps, and accumulate using Fused Multiply-Add (_mm512_fmadd_ps), computing 16 multiply-adds in a single CPU cycle.",
    "Linux OOM Killer calculates badness score: badness = (oom_points * 1000 / total_ram) + oom_score_adj. Setting oom_score_adj to -1000 protects mission-critical daemons from OOM termination. mlockall(MCL_CURRENT | MCL_FUTURE) locks all process memory into RAM, disabling paging to disk. HugePages (2MB/1GB) reduce TLB cache misses.",
    "Embedded GC design: 1) Allocator tracking allocated block headers; 2) Root scanning (registers, thread stacks, global pointers); 3) Mark phase: traverses pointers, setting mark bits in bitmap; 4) Sweep phase: scans allocation list, reclaiming unmarked blocks and clearing mark bits.",
    "Profile-Guided Optimization (PGO) compiles instrumented binaries, runs real-world production workloads to record branch frequencies and hot call paths, and recompiles: the compiler places hot blocks contiguously to maximize instruction cache hits and predicts branches accurately. Link-Time Optimization (LTO) performs whole-program analysis across translation units.",
    "Distributed KV store: 1) Raft consensus module with leader election and log replication; 2) Netty/Boost.Asio non-blocking TCP layer; 3) LSM-tree storage engine with SSTables and bloom filters; 4) MVCC timestamp tracking for lock-free point-in-time snapshot reads."
]

cb, cm, ch = make_15("C++ & System Programming", "cpp", cpp_cats, cpp_qb, cpp_qm, cpp_qh, cpp_ab, cpp_am, cpp_ah)
write_ts_topic('cpp.ts', 'cppQuestions', cb, cm, ch)

# 2. SYSTEM DESIGN
sys_cats = ["Load Balancing", "Caching", "Databases", "Message Queues", "Rate Limiting", "CDN", "Storage", "Consistency", "High Availability", "Microservices", "Security", "Monitoring", "Distributed Locks", "API Design", "Scalability"]
sys_qb = [
    "What is Vertical Scaling (Scaling Up) vs Horizontal Scaling (Scaling Out)?",
    "What is the CAP Theorem in distributed systems, and what are CP vs AP systems?",
    "What is a Load Balancer, and what is the difference between Layer 4 (L4) and Layer 7 (L7) load balancing?",
    "What is Caching, and what are the Cache-Aside, Write-Through, and Write-Back patterns?",
    "What is a Content Delivery Network (CDN) and how does it reduce latency for global users?",
    "What is Database Sharding (Horizontal Partitioning) and how does it solve database write limits?",
    "What is the difference between Synchronous API calls (REST/gRPC) and Asynchronous Message Queues (Kafka/RabbitMQ)?",
    "What is a Rate Limiter, and why is it essential for protecting APIs from abuse?",
    "What is a Reverse Proxy (Nginx, HAProxy, Envoy) and how does it differ from a Forward Proxy?",
    "What is DNS (Domain Name System) and how does Anycast routing distribute traffic globally?",
    "What is the difference between SQL (Relational) and NoSQL (Document, Key-Value, Columnar) databases?",
    "What is High Availability (HA) and what does 'Five Nines' (99.999%) uptime mean in practice?",
    "What is Single Point of Failure (SPOF) and how do redundancy and failover eliminate it?",
    "What is Data Replication (Active-Passive vs Active-Active) in distributed storage?",
    "What is Webhook vs Long-Polling vs WebSockets for real-time client updates?"
]
sys_ab = [
    "Vertical scaling adds more CPU, RAM, or disk to a single machine (bounded by hardware limits and single point of failure). Horizontal scaling adds more commodity machines to a cluster, distributing traffic and scaling linearly with high availability.",
    "CAP states a distributed system can guarantee at most two of: Consistency (all nodes see latest data), Availability (every non-failing node returns a response), and Partition Tolerance (system functions despite network drops). In real networks, partitions occur; systems must choose CP (refuse writes if consistency unverified) or AP (accept writes with eventual consistency).",
    "A load balancer distributes incoming network traffic across a fleet of healthy backend servers. Layer 4 operates at transport layer (TCP/UDP), routing packets by IP and port with high throughput. Layer 7 operates at application layer (HTTP/HTTPS), inspecting URLs, headers, and cookies to perform intelligent path routing and SSL termination.",
    "Cache-Aside: app queries cache first; on miss, queries DB, updates cache, and returns. Write-Through: app writes to cache and DB synchronously. Write-Back (Write-Behind): app writes to cache immediately; cache asynchronously writes to DB in batches (ultra-fast, risk of data loss if cache fails).",
    "A CDN is a geographically distributed network of proxy servers (Edge Points of Presence) that cache static assets (images, videos, JS/CSS) close to users, cutting Round Trip Time (RTT), offloading origin servers, and absorbing DDoS attacks.",
    "Sharding partitions database rows across multiple independent physical database instances according to a Shard Key (e.g. user_id % N). It allows databases to scale write throughput and storage capacity beyond the limits of a single machine.",
    "Synchronous calls (REST/gRPC) require client to wait for server response, coupling services and cascading latency bottlenecks. Asynchronous message queues (Kafka/RabbitMQ) decouple producer from consumer: messages are buffered durably in queues, smoothing traffic spikes and enabling independent consumer scaling.",
    "A rate limiter restricts the number of requests a client or IP can send to an API within a time window (e.g. 100 req/min). It prevents DDoS attacks, credential stuffing, API scraping, and protects downstream services from cascading collapse.",
    "A Forward Proxy sits in front of clients, mediating requests to the internet (used for privacy, firewalls, and employee monitoring). A Reverse Proxy sits in front of web servers, intercepting client requests to provide load balancing, SSL termination, caching, and security.",
    "DNS translates human-readable domain names into IP addresses. Anycast DNS routes requests from the client's ISP to the topologically nearest DNS nameserver sharing the same IP address, minimizing lookup latency and providing resilient DDoS absorption.",
    "SQL: rigid schema, ACID transactions, complex joins, vertical scaling (PostgreSQL, MySQL). NoSQL: flexible schemas, high write throughput, horizontal partition scaling, trade ACID for eventual consistency (MongoDB for documents, Redis for key-value, Cassandra for wide-column).",
    "High availability ensures a system remains operational with minimal downtime. 'Five Nines' (99.999% availability) permits at most 5.26 minutes of total downtime per year across all maintenance and incidents, requiring multi-region redundancy, automated healthchecks, and instant failover.",
    "A SPOF is any component whose failure causes the entire system to collapse (e.g., a single database master or solitary load balancer). Eliminated through active redundancy (multiple instances), healthcheck monitors, and automated failover mechanics.",
    "Active-Passive: Primary receives all writes and replicates to Standby; on failure, Standby promotes to Primary (simpler, risk of replication lag). Active-Active: multiple nodes in different regions accept concurrent writes (requires conflict resolution algorithms like CRDTs or vector clocks).",
    "Long-Polling: client requests data, server holds connection open until data changes, client immediately re-requests. WebSockets: single persistent full-duplex TCP connection for real-time bidirectional communication. Webhooks: server-to-server HTTP POST callbacks triggered by specific events."
]
sys_qm = [
    "Design a distributed Rate Limiter capable of handling 1,000,000 requests/sec using Token Bucket and Sliding Window Log with Redis.",
    "Explain Consistent Hashing and how Virtual Nodes solve hotspotting and unequal load distribution.",
    "How does distributed cache invalidation work across Redis clusters? Compare Write-Through vs Write-Behind vs Cache-Aside.",
    "Explain Apache Kafka architecture: Topics, Partitions, Consumer Groups, Offsets, and Log Compaction.",
    "How do you design a Globally Unique ID Generator (like Twitter Snowflake) generating 64-bit sortable IDs without central coordination?",
    "Explain Strong Consistency vs Eventual Consistency vs Causal Consistency in distributed databases.",
    "How does a Distributed Lock work using Redis (Redlock algorithm) vs Apache ZooKeeper / etcd (Raft consensus)?",
    "How do you architect a URL Shortener service (like TinyURL) handling 100M new URLs per month with 10:1 read-to-write ratio?",
    "What is the Saga Pattern for distributed transactions across microservices? Compare Orchestration vs Choreography.",
    "How do you design a high-throughput Notification Service (Push, SMS, Email) handling millions of notifications with priority queues?",
    "What is the difference between Pessimistic Locking, Optimistic Concurrency Control (OCC), and Two-Phase Locking (2PL)?",
    "How do you prevent Cache Penetration, Cache Breakdown, and Cache Avalanche in high-traffic architectures?",
    "Explain how Cassandra / DynamoDB achieve masterless high-availability writes using Quorum Consistency (W + R > N).",
    "How do you architect a scalable Metrics & Logging Pipeline (ELK / Grafana Loki) ingesting 5TB of logs daily?",
    "How do you design a live Real-Time Leaderboard service handling millions of concurrent score updates using Redis Sorted Sets?"
]
sys_am = [
    "Sliding Window Counter algorithm in Redis: uses a Redis sorted set (ZADD) with timestamps as scores, removes entries older than window (ZREMRANGEBYSCORE), counts current entries (ZCARD), and increments if below limit. For extreme scale (1M req/s), run local in-memory token buckets with periodic Redis batch synchronization.",
    "Consistent Hashing maps cache keys and server nodes onto a circular 2^32 hash ring. Each physical server is assigned multiple Virtual Nodes (e.g. 100-256 vnodes) scattered randomly across the ring. This balances load evenly and ensures adding or removing a server only relocates K/N keys, preventing cache stampedes.",
    "Cache Invalidation is notoriously difficult. Cache-Aside: reads hit cache; writes update DB and delete the cache key (forcing fresh fetch on next read). To eliminate stale reads across multiple microservices, publish CDC events from database WAL logs to Redis Pub/Sub to evict keys across all instances.",
    "Kafka is an append-only distributed commit log: 1) Topics are partitioned for parallelism; 2) Producers publish with partition keys (hashing guarantees ordering per key); 3) Consumer Groups scale consumption: each partition is read by exactly one consumer in the group; 4) Log Compaction retains only the latest record per key.",
    "Twitter Snowflake generates 64-bit unique IDs: 1 bit unused (sign) + 41 bits timestamp in milliseconds (69 years lifespan) + 10 bits machine/datacenter ID (1024 workers) + 12 bits sequence number (4096 IDs per millisecond per node). IDs are globally unique, roughly time-sorted, and generated locally without network latency.",
    "Strong Consistency: all reads return the latest committed write immediately (linearizable). Eventual Consistency: replicas converge to the same state after an elapsed time if no new writes occur. Causal Consistency: operations causally related are observed in the same order; concurrent unrelated operations can be observed in different orders.",
    "Redis Redlock acquires locks across N independent Redis nodes using atomic SET NX EX; lock is valid if acquired on majority (>N/2) within timeout. ZooKeeper and etcd provide CP consensus using Paxos/Raft: client creates an ephemeral sequential znode; the client with the lowest sequence number owns the lock, with automatic heartbeat failover.",
    "TinyURL architecture: 1) ID Generation: 64-bit base62 encoding (a-z, A-Z, 0-9) yielding 62^7 = 3.5 trillion URLs; 2) Storage: NoSQL key-value store (DynamoDB/Cassandra) mapping short_hash -> long_url; 3) Caching: 20% hot URLs cached in Redis (Pareto 80/20 rule); 4) 301 Permanent Redirect (cached by browser) vs 302 Found (tracks analytics).",
    "Saga coordinates distributed transactions: 1) Choreography: services emit domain events; subsequent services listen and execute local transactions (decentralized, risk of cyclic dependencies); 2) Orchestration: a central Saga Orchestrator state machine instructs services to execute steps and issues compensating transactions in reverse order if a step fails.",
    "Notification service: API gateway validates request -> Priority Queue (RabbitMQ/Kafka: Urgent for OTPs vs Bulk for marketing) -> Worker fleet handles rate limiting and provider throttling (Twilio, APNs, SendGrid) -> User preference service filters opt-outs -> Status database tracks delivery receipts.",
    "Pessimistic Locking locks rows at read time, blocking other transactions (high contention). Optimistic Concurrency Control (OCC) validates version numbers at commit time without locks. Two-Phase Locking (2PL) is a concurrency protocol: Growing Phase (acquires locks) and Shrinking Phase (releases locks), guaranteeing serializability.",
    "Cache Penetration: queries for non-existent keys bypass cache and hit DB (fix: Bloom Filter or cache null with short TTL). Cache Breakdown: hot key expires, thousands of concurrent requests hit DB simultaneously (fix: Mutex lock or logical expiration). Cache Avalanche: thousands of keys expire at once (fix: add random jitter to TTL).",
    "DynamoDB/Cassandra use leaderless replication with N replicas: Write quorum W, Read quorum R. If W + R > N, at least one node in the read set overlaps with the latest write set, guaranteeing strong consistency. If W + R <= N, the system is eventually consistent, resolving write conflicts via Last-Write-Wins (LWW) or Vector Clocks.",
    "Logging architecture: 1) Log shippers (FluentBit/Vector) stream container logs; 2) Kafka buffers peak bursts; 3) Log indexing engines (Elasticsearch/Loki) partition indices by day; 4) Hot-Warm-Cold storage tiers: hot NVMe storage for last 7 days, S3 object storage for 90 days cold retention.",
    "Real-time leaderboard uses Redis Sorted Sets (ZSET): ZADD leaderboard <score> <user_id> updates player score in O(log N) time. ZREVRANK returns user rank in O(log N). ZREVRANGEBYSCORE retrieves top 100 players in O(log N + M). Read replicas handle millions of dashboard read requests."
]
sys_qh = [
    "Design a High-Throughput Distributed Messaging Broker (like Kafka) from scratch: Memory-mapped files, Zero-Copy sendfile, and Append-only Segments.",
    "Architect a Global Multi-Region Payment Processing System with Strong Idempotency, Two-Phase Commits, and Double-Entry Ledgers.",
    "How does the Raft Consensus Algorithm handle Leader Election, Log Matching Invariant, and Joint Consensus Configuration Changes?",
    "Design a Large-Scale Video Streaming Platform (like Netflix/YouTube): Video Transcoding pipelines, Adaptive Bitrate Streaming (HLS/DASH), and CDN Edge Pushing.",
    "How do you design a Distributed Tracing and Telemetry Platform (like Honeycomb/Datadog) processing 10,000,000 spans/sec with dynamic tail-sampling?",
    "Architect a Real-Time Collaborative Document Platform (like Google Docs) handling millions of concurrent sessions using CRDTs and WebSockets.",
    "How do you solve the Multi-Region Data Sovereignty and Sharding challenge under strict GDPR/HIPAA regulations?",
    "Design an Ultra-Low Latency Stock Exchange Order Book and Matching Engine with deterministic replay and microsecond latency.",
    "How does Consistent Hashing adapt to Heterogeneous Server Capacities and handle cascading failure when multiple nodes crash simultaneously?",
    "Architect a Scalable Web Crawler and Search Engine Indexer (like Googlebot) indexing 10 Billion pages with politeness policies and deduplication.",
    "How do you design a Globally Distributed Geo-Replicated Cache that solves the Cache Invalidation and Split-Brain problem?",
    "Architect an Ad-Click Fraud Detection Pipeline processing 500,000 clicks/sec with real-time sliding-window graph analysis.",
    "How does Google Spanner utilize Paxos, Two-Phase Locking, and TrueTime to execute globally distributed ACID transactions across continents?",
    "Design a Resilient File Storage and Synchronization Service (like Dropbox/Google Drive) handling 100PB data with chunking and delta sync.",
    "Architect an Autonomous Incident Auto-Remediation System that monitors distributed microservice telemetry, identifies root causes, and executes safe rollbacks."
]
sys_ah = [
    "Kafka internals design: 1) Append-only Log: disk writes are sequential, achieving 100MB/s per drive; 2) OS Page Cache: messages write directly to Linux page cache; 3) Zero-Copy sendfile(): OS transfers network packets directly from page cache to NIC socket buffer without copying to user-space memory; 4) Segment Indexing: sparse offset and time indices.",
    "Payment processing architecture: 1) Idempotency Key header stored atomically in Redis; 2) Double-Entry Bookkeeping ledger table enforcing debit/credit balance; 3) Saga Orchestrator coordinating gateway, user account, and ledger; 4) Outbox Pattern streaming events to Kafka; 5) Automated reconciliation jobs matching bank settlements daily.",
    "Raft consensus: 1) Leader Election: heartbeats maintain authority; randomized election timeouts prevent split votes; 2) Log Matching: if two entries in different logs have same index and term, all preceding entries are identical; 3) Joint Consensus: transitions configuration changes (C_old to C_new) using a transitional configuration C_old,new.",
    "Video streaming architecture: 1) Ingestion: chunked S3 upload; 2) Distributed Transcoding: Kafka triggers GPU worker fleet (FFmpeg) splitting video into multi-bitrate HLS/DASH chunks (1080p, 720p, 480p); 3) Storage: S3 object storage; 4) CDN: Edge POPs cache video chunks; 5) Client: video player dynamically adjusts bitrate to network conditions.",
    "Telemetry platform: 1) Collector: OpenTelemetry collector agents buffer spans; 2) Tail-Sampling: evaluates the entire trace trajectory before deciding whether to persist (samples 100% of traces with errors/high-latency, drops 99% of normal 200 OK traces); 3) Columnar Storage: ClickHouse/Loki partitioned by time.",
    "Collaborative document design: 1) Client: Yjs / Automerge CRDTs maintain local state graph; 2) Transport: WebSocket gateway multiplexes state vector updates; 3) Concurrency: CRDT convergence mathematically resolves concurrent edits; 4) Persistence: periodic document snapshots serialized to S3, with operation log in PostgreSQL.",
    "Data sovereignty architecture: Shards tagged by geopolitical boundary (EU_Zone, US_Zone). Tenant routing tier maps customer geolocation to local regional databases. Customer PII is encrypted with region-locked KMS keys that cannot be decrypted outside the host jurisdiction.",
    "Order matching engine: Pinned single-thread execution loop on bare metal; fixed-size bids and asks arrays sorted by price-time; RingBuffer input queue; FPGA hardware network acceleration; deterministic event sourcing logging all order events to NVMe for sub-microsecond failover replay.",
    "Heterogeneous consistent hashing: assign virtual node counts proportional to hardware capacity (e.g. 500 vnodes to 64GB servers, 100 to 16GB servers). Cascading failure mitigation: circuit breakers on adjacent ring neighbors and bounded load shedding to prevent traffic from swamping the next node.",
    "Web crawler architecture: 1) URL Frontier: prioritized queue managing politeness (domain delays); 2) DNS Resolver: local DNS cache; 3) Fetcher: asynchronous libcurl workers; 4) Content Extraction & SimHash deduplication; 5) Inverted Indexer: MapReduce/Spark builds posting lists.",
    "Geo-cache design: Two-layer architecture with local L1 cache and regional L2. Invalidation uses distributed Pub/Sub over Kafka mirror-maker. Cache entries include Lamport timestamps to resolve race conditions between asynchronous regional invalidation messages.",
    "Click fraud pipeline: Apache Flink stream processing cluster sliding 1-minute, 5-minute, and 1-hour windows over click events. Computes IP frequency, user-agent entropy, and device fingerprint clustering. Suspicious bursts flag IP ranges in Redis blacklist within 50ms.",
    "Spanner distributed transaction: Coordinator acquires read-locks; reads proceed at snapshot timestamp. At commit, coordinator initiates 2PC across participant Paxos groups. TrueTime assigns commit timestamp s. Coordinator waits until TrueTime.now().earliest > s before releasing locks, achieving strict serializability globally.",
    "Dropbox sync design: 1) Client breaks files into 4MB chunks, computes SHA-256 hashes; 2) Uploads only new/unique chunk hashes (content-addressable deduplication); 3) Metadata service (Postgres/CockroachDB) updates file version trees; 4) Delta Sync downloads only changed byte chunks.",
    "Auto-remediation system: OpenTelemetry traces stream into anomaly detection engine. If latency/error SLO breaches, decision engine evaluates dependency graph. If canary release correlated with failure, triggers automated Kubernetes rolling rollback and alerts on-call engineer via Slack."
]

sb, sm, sh = make_15("System Design", "sys", sys_cats, sys_qb, sys_qm, sys_qh, sys_ab, sys_am, sys_ah)
write_ts_topic('systemDesign.ts', 'systemDesignQuestions', sb, sm, sh)

# 3. HR & CULTURAL FIT
hr_cats = ["STAR Framework", "Conflict Resolution", "Leadership", "Failure & Resilience", "Prioritization", "Career Goals", "Culture Fit", "Teamwork", "Ambiguity", "Feedback", "Ethics", "Communication", "Innovation", "Mentorship", "Work Ethic"]
hr_qb = [
    "Tell me about yourself, your technical journey, and why you are interested in this role.",
    "What is the STAR method (Situation, Task, Action, Result) for behavioral interview questions?",
    "Describe a time you had a technical disagreement with a teammate. How did you resolve it?",
    "Tell me about a time you failed or made a critical mistake in production. How did you handle it?",
    "How do you prioritize competing deadlines and tasks when everything is marked as high priority?",
    "Where do you see yourself professionally in the next 3 to 5 years?",
    "Describe a situation where you had to work with a difficult colleague or stakeholder.",
    "Tell me about a project you are particularly proud of and your specific contributions.",
    "How do you handle receiving constructive or critical feedback from a manager or peer?",
    "Tell me about a time you had to deliver a project under extreme ambiguity or shifting requirements.",
    "Why do you want to work at our company specifically over other opportunities?",
    "Describe a time you went above and beyond your defined job responsibilities.",
    "How do you mentor, support, and foster psychological safety for junior engineers on your team?",
    "Tell me about a time you identified a process inefficiency or technical debt and took initiative to fix it.",
    "What are your salary expectations and what factors do you consider when evaluating an offer?"
]
hr_ab = [
    "Structure answer using Present, Past, Future: 1) Present: current role, tech stack, and primary responsibilities; 2) Past: key milestones, projects, and growth trajectory; 3) Future: why this company's mission and engineering challenges align with your next career step.",
    "STAR provides structured behavioral answers: Situation (context and challenge), Task (your specific role and goal), Action (the concrete technical/interpersonal steps you took), and Result (the quantifiable outcome and what you learned).",
    "Focus on depersonalizing the conflict: focus on data, user impact, and architectural trade-offs rather than egos. Seek consensus through prototyping or benchmarking, and commit fully to the team's decision once made ('Disagree and Commit').",
    "Demonstrate accountability and psychological safety: acknowledge mistake immediately, focus on swift remediation, communicate transparently with stakeholders, and lead a blameless post-mortem to implement automated safeguards preventing recurrence.",
    "Explain ruthless prioritization: categorize must-haves vs nice-to-haves, communicate risks and trade-offs early to product managers, break tasks into incremental milestones, and protect team focus from context-switching.",
    "Balance technical depth with team impact: express goals to grow into a Staff/Lead Engineer, driving architectural decisions, mentoring engineers, and delivering high-scale business impact while staying grounded in today's role.",
    "Demonstrate empathy and emotional intelligence: seek to understand their perspective, hold a constructive 1-on-1 to align on shared objectives, separate personal friction from work goals, and build a collaborative working relationship.",
    "Highlight a technical challenge with business impact: explain the problem complexity, your specific architectural and coding contributions, collaboration with cross-functional partners, and the measurable business result (e.g. 50% latency drop).",
    "Show receptiveness and a growth mindset: listen actively without defensiveness, ask clarifying questions for actionable takeaways, express gratitude for the feedback, and proactively implement improvements.",
    "Demonstrate high agency: break ambiguity down by identifying knowns vs unknowns, gather qualitative inputs from stakeholders, form testable hypotheses, build quick prototypes, and maintain transparent communication as requirements evolve.",
    "Demonstrate genuine company research: tie your answer to the company's specific product vision, engineering blog innovations, scale challenges, and cultural values, explaining how your background creates mutual value.",
    "Share a concrete story where you identified a team blocker, unowned technical debt, or customer pain point, took proactive initiative outside your sprint scope, and delivered a lasting organizational improvement.",
    "Discuss inclusive engineering culture: conduct empathetic code reviews, pair-program on complex bugs, create documentation, celebrate their wins, and establish an environment where asking questions is welcomed.",
    "Explain how you observed a recurring developer friction point (e.g. slow CI/CD builds or missing integration tests), built a business case with metrics, gathered consensus, and implemented the automated fix.",
    "Anchor your answer in market benchmarks and total compensation value (base, bonus, equity). Express flexibility, emphasize that cultural alignment and technical impact are paramount, and state you seek a competitive market-rate package."
]
hr_qm = [
    "Tell me about a time you disagreed with leadership on an engineering decision. How did you advocate your perspective and handle the outcome?",
    "Describe a complex cross-functional project involving Product, Design, and Engineering. How did you navigate conflicting priorities?",
    "How do you maintain engineering velocity and code quality under tight sprint deadlines?",
    "Tell me about a time an engineer on your team was underperforming or missing deadlines. How did you support them?",
    "Describe an experience where you had to make a high-stakes technical decision with incomplete information.",
    "How do you handle burnout, work-life balance, and sustained high-pressure periods in engineering teams?",
    "Tell me about a time a customer reported a critical security vulnerability or data bug in your software. How did you respond?",
    "How do you champion Diversity, Equity, and Inclusion (DEI) and psychological safety in technical organizations?",
    "Describe a situation where a project failed to achieve its intended business outcome. What lessons did you extract?",
    "How do you balance paying down Technical Debt vs shipping new revenue-generating product features?",
    "Tell me about a time you had to persuade senior stakeholders or non-technical executives to invest in major architectural refactoring.",
    "Describe your approach to code reviews: how do you balance thoroughness, speed, and encouraging team morale?",
    "Tell me about a time you had to say 'No' to a product feature request. How did you manage expectations?",
    "How do you keep your technical skills sharp and stay current in an era of rapid AI and framework evolution?",
    "What questions do you have for the hiring committee about our engineering culture and leadership challenges?"
]
hr_am = [
    "Share a concrete example: explain your data-driven advocacy (benchmarks, cost models), present alternatives respectfully, listen to leadership's business constraints, and demonstrate commitment to the final decision even if it differed from your preference.",
    "Highlight cross-functional translation: align stakeholders around shared user outcomes and KPIs, establish clear interface boundaries, establish trade-off matrices, and communicate transparently through weekly syncs.",
    "Explain pragmatic engineering: maintain automated testing and CI/CD gates to prevent regressions, scope MVPs tightly (cutting nice-to-have features rather than testing rigor), and schedule technical debt cleanup sprints.",
    "Approach with empathy: initiate a supportive 1-on-1 to identify root causes (personal blockers, unclear requirements, skill gaps), establish clear incremental goals, provide pair programming, and celebrate small wins.",
    "Detail risk mitigation under uncertainty: identify reversible vs irreversible decisions (Type 1 vs Type 2), consult domain experts, formulate a minimal viable experiment, design fallbacks, and execute decisively.",
    "Emphasize sustainable engineering: set clear boundaries, prioritize ruthless focus over long hours, automate repetitive toil, promote blameless retrospectives, and watch for peer fatigue signs.",
    "Prioritize transparency and urgency: isolate the incident immediately, notify security leadership and affected customers, execute the fix, conduct a blameless post-mortem, and implement preventative architectural guardrails.",
    "Articulate tangible actions: practice inclusive meeting moderation (soliciting quiet voices), provide constructive code review feedback, mentor underrepresented engineers, and eliminate unconscious bias in hiring panels.",
    "Reflect with intellectual honesty: analyze the root cause of the business mismatch, assess user metrics, capture learnings in documentation, and explain how that failure altered your subsequent product development approach.",
    "Use business language: quantify the cost of tech debt (developer hours lost, latency, outages), allocate a recurring percentage of sprint capacity (e.g. 20%), and tie refactoring directly to enabling future feature velocity.",
    "Translate technical concepts to ROI: present the business risk of legacy systems (outage costs, security compliance, hiring difficulty) and the financial benefits of modernization in executive slide decks with clear timelines.",
    "Framework for code reviews: prioritize architecture, correctness, and security; automate linting/formatting via CI; frame suggestions as questions ('What do you think about X?'); praise clever solutions; approve promptly (<24h).",
    "Saying 'No' constructively: explain technical constraints and trade-offs, validate the underlying business goal, and offer viable alternatives ('We cannot do X this sprint, but we can achieve 80% of the value via Y').",
    "Demonstrate continuous learning: read research papers, build weekend side-projects with new technologies (LLMs, agents), contribute to open source, write technical blogs, and run engineering book clubs.",
    "Ask insightful questions: 'What is the biggest technical challenge currently keeping your staff engineers awake at night?', 'How does leadership balance technical debt against commercial pressure?', 'What defines a top 1% engineer on this team?'"
]
hr_qh = [
    "How do you design and scale an Engineering Culture across 100+ distributed engineers that preserves high agency and autonomy?",
    "Describe how you navigate an organizational crisis: major layoffs, company restructuring, or catastrophic multi-day cloud outage.",
    "How do you evaluate and reward Staff/Principal Engineers whose primary impact is architectural influence rather than line-of-code output?",
    "How do you resolve deep political or architectural deadlocks between two rival Principal Engineers in different organizations?",
    "Describe your philosophy on Blameless Post-Mortems: how do you eliminate fear while ensuring systemic organizational accountability?",
    "How do you manage compensation and retention negotiations when a top engineer receives a 40% higher offer from a competitor?",
    "Tell me about a time you had to terminate an employee for cultural toxicity or performance. How did you execute it with dignity and legality?",
    "How do you build a Talent Acquisition and Interviewing Bar-Raiser program that eliminates interviewer bias and hires top 5% talent?",
    "Describe how you align Engineering roadmaps with C-Suite business objectives (EBITDA, burn rate, customer churn, TAM expansion).",
    "How do you build psychological safety in high-stakes environments where production failures cost millions of dollars per minute?",
    "Tell me about an ethical dilemma you faced in your engineering career (e.g. user privacy, dark patterns, fake metrics). How did you act?",
    "How do you architect an internal Engineering Career Ladder (Levels 1 to 7) distinguishing individual contributors from engineering management?",
    "Describe your strategy for managing mergers and acquisitions (M&A): integrating disparate engineering teams, tech stacks, and cultural values.",
    "How do you drive organizational adoption of Generative AI and Autonomous Agents while maintaining enterprise security and developer morale?",
    "What legacy do you aspire to leave on an engineering organization after leading it for 5 years?"
]
hr_ah = [
    "Scaling engineering culture requires: 1) High-trust decentralized decision-making guided by clear architectural principles (RFC process); 2) Transparent communication via public Slack channels and all-hands; 3) Autonomous two-pizza squads with end-to-end ownership; 4) Rigorous engineering standards reinforced through peer recognition.",
    "Crisis leadership: 1) Radical transparency: communicate facts promptly and empathetically, quelling rumors; 2) Maintain calm focus on core priorities; 3) Support remaining team members with 1-on-1s; 4) In technical outages: establish a clear incident commander, isolate blast radius, and execute clear customer communication.",
    "Staff+ impact evaluation focuses on leverage and multipliers: 1) Architectural sound-boarding across teams; 2) Mentorship and growing senior engineers; 3) Unblocking critical organizational bottlenecks; 4) De-risking multi-quarter initiatives; 5) Setting engineering standards.",
    "Resolving executive deadlocks: bring both leaders into an objective workshop; define explicit evaluation criteria aligned with business goals; prototype both architectures to evaluate empirical performance; establish clear escalation paths where an executive sponsor renders the final decision; enforce 'Disagree and Commit'.",
    "Blameless post-mortem philosophy: human error is the symptom of systemic design flaws, not the cause. If a system allows a single human to make a fatal mistake, the system design is flawed. Post-mortems examine timeline, system vulnerabilities, and monitoring gaps, producing actionable tickets without personal blame.",
    "Retention strategy: conduct an honest market-rate review; understand the engineer's true motivations (autonomy, challenge, compensation); formulate a competitive retention package if aligned with internal equity; if the gap is insurmountable, celebrate their impact and part ways with a strong mutual relationship.",
    "Termination execution: ensure clear prior documentation and progressive feedback (no surprises); coordinate closely with HR and legal; deliver the message directly, respectfully, and succinctly in a private setting; handle logistics with empathy; address the remaining team transparently to maintain morale.",
    "Bar-Raiser program: train a dedicated corps of independent interviewers who have veto power on hiring decisions; standardize behavioral and technical rubrics; conduct blind resume reviews; enforce structured scoring before group debriefs to eliminate confirmation bias.",
    "C-suite alignment: translate technical initiatives into revenue growth, margin expansion (cloud cost reduction), and churn mitigation. Frame architectural investments as risk reduction and velocity enablers, presenting clear business cases with metrics.",
    "High-stakes psychological safety: pair rigorous automated guardrails (canary deployments, automated rollbacks, chaos testing) with a culture that treats near-misses as learning opportunities, ensuring engineers feel empowered to innovate without fear.",
    "Ethical integrity: articulate a principled stand against compromising user privacy, falsifying metrics, or implementing deceptive dark patterns. Present ethical alternatives, escalate to executive leadership when necessary, and maintain professional ethical standards.",
    "Career ladder design: create dual parallel tracks (Individual Contributor vs Management) with equivalent compensation bands. Define explicit competencies per level across Technical Execution, Architectural Scope, Influence, and Culture.",
    "M&A engineering integration: assess technical debt and architectural overlap early; avoid forced immediate rewrites; establish joint taskforces on shared infrastructure; respect the acquired team's culture while aligning on unified company mission and tooling.",
    "Generative AI adoption: establish clear data privacy guardrails; provide enterprise tools (GitHub Copilot, internal LLM sandboxes); train engineers on AI engineering patterns; measure velocity impact; address job security concerns openly.",
    "A lasting organizational legacy: leaving behind a self-sustaining engineering culture of technical excellence, high autonomy, resilient systems, and a generation of mentored leaders who continue driving innovation independently."
]

hb, hm, hh = make_15("HR & Cultural Fit", "hr", hr_cats, hr_qb, hr_qm, hr_qh, hr_ab, hr_am, hr_ah)
write_ts_topic('hr.ts', 'hrQuestions', hb, hm, hh)

print("C++, System Design, and HR topic question banks written successfully.")

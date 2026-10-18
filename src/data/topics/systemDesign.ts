import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const systemDesignQuestions: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: [
  {
    "id": "sys-beg-1",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Load Balancing",
    "question": "What is Vertical Scaling (Scaling Up) vs Horizontal Scaling (Scaling Out)?",
    "keyConcepts": [
      "Load Balancing",
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
    "hint": "Focus on the primary definition and why Load Balancing is essential in System Design.",
    "sampleGoodAnswer": "Vertical scaling adds more CPU, RAM, or disk to a single machine (bounded by hardware limits and single point of failure). Horizontal scaling adds more commodity machines to a cluster, distributing traffic and scaling linearly with high availability."
  },
  {
    "id": "sys-beg-2",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Caching",
    "question": "What is the CAP Theorem in distributed systems, and what are CP vs AP systems?",
    "keyConcepts": [
      "Caching",
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
    "hint": "Focus on the primary definition and why Caching is essential in System Design.",
    "sampleGoodAnswer": "CAP states a distributed system can guarantee at most two of: Consistency (all nodes see latest data), Availability (every non-failing node returns a response), and Partition Tolerance (system functions despite network drops). In real networks, partitions occur; systems must choose CP (refuse writes if consistency unverified) or AP (accept writes with eventual consistency)."
  },
  {
    "id": "sys-beg-3",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Databases",
    "question": "What is a Load Balancer, and what is the difference between Layer 4 (L4) and Layer 7 (L7) load balancing?",
    "keyConcepts": [
      "Databases",
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
    "hint": "Focus on the primary definition and why Databases is essential in System Design.",
    "sampleGoodAnswer": "A load balancer distributes incoming network traffic across a fleet of healthy backend servers. Layer 4 operates at transport layer (TCP/UDP), routing packets by IP and port with high throughput. Layer 7 operates at application layer (HTTP/HTTPS), inspecting URLs, headers, and cookies to perform intelligent path routing and SSL termination."
  },
  {
    "id": "sys-beg-4",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Message Queues",
    "question": "What is Caching, and what are the Cache-Aside, Write-Through, and Write-Back patterns?",
    "keyConcepts": [
      "Message Queues",
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
    "hint": "Focus on the primary definition and why Message Queues is essential in System Design.",
    "sampleGoodAnswer": "Cache-Aside: app queries cache first; on miss, queries DB, updates cache, and returns. Write-Through: app writes to cache and DB synchronously. Write-Back (Write-Behind): app writes to cache immediately; cache asynchronously writes to DB in batches (ultra-fast, risk of data loss if cache fails)."
  },
  {
    "id": "sys-beg-5",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Rate Limiting",
    "question": "What is a Content Delivery Network (CDN) and how does it reduce latency for global users?",
    "keyConcepts": [
      "Rate Limiting",
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
    "hint": "Focus on the primary definition and why Rate Limiting is essential in System Design.",
    "sampleGoodAnswer": "A CDN is a geographically distributed network of proxy servers (Edge Points of Presence) that cache static assets (images, videos, JS/CSS) close to users, cutting Round Trip Time (RTT), offloading origin servers, and absorbing DDoS attacks."
  },
  {
    "id": "sys-beg-6",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "CDN",
    "question": "What is Database Sharding (Horizontal Partitioning) and how does it solve database write limits?",
    "keyConcepts": [
      "CDN",
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
    "hint": "Focus on the primary definition and why CDN is essential in System Design.",
    "sampleGoodAnswer": "Sharding partitions database rows across multiple independent physical database instances according to a Shard Key (e.g. user_id % N). It allows databases to scale write throughput and storage capacity beyond the limits of a single machine."
  },
  {
    "id": "sys-beg-7",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Storage",
    "question": "What is the difference between Synchronous API calls (REST/gRPC) and Asynchronous Message Queues (Kafka/RabbitMQ)?",
    "keyConcepts": [
      "Storage",
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
    "hint": "Focus on the primary definition and why Storage is essential in System Design.",
    "sampleGoodAnswer": "Synchronous calls (REST/gRPC) require client to wait for server response, coupling services and cascading latency bottlenecks. Asynchronous message queues (Kafka/RabbitMQ) decouple producer from consumer: messages are buffered durably in queues, smoothing traffic spikes and enabling independent consumer scaling."
  },
  {
    "id": "sys-beg-8",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Consistency",
    "question": "What is a Rate Limiter, and why is it essential for protecting APIs from abuse?",
    "keyConcepts": [
      "Consistency",
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
    "hint": "Focus on the primary definition and why Consistency is essential in System Design.",
    "sampleGoodAnswer": "A rate limiter restricts the number of requests a client or IP can send to an API within a time window (e.g. 100 req/min). It prevents DDoS attacks, credential stuffing, API scraping, and protects downstream services from cascading collapse."
  },
  {
    "id": "sys-beg-9",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "High Availability",
    "question": "What is a Reverse Proxy (Nginx, HAProxy, Envoy) and how does it differ from a Forward Proxy?",
    "keyConcepts": [
      "High Availability",
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
    "hint": "Focus on the primary definition and why High Availability is essential in System Design.",
    "sampleGoodAnswer": "A Forward Proxy sits in front of clients, mediating requests to the internet (used for privacy, firewalls, and employee monitoring). A Reverse Proxy sits in front of web servers, intercepting client requests to provide load balancing, SSL termination, caching, and security."
  },
  {
    "id": "sys-beg-10",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Microservices",
    "question": "What is DNS (Domain Name System) and how does Anycast routing distribute traffic globally?",
    "keyConcepts": [
      "Microservices",
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
    "hint": "Focus on the primary definition and why Microservices is essential in System Design.",
    "sampleGoodAnswer": "DNS translates human-readable domain names into IP addresses. Anycast DNS routes requests from the client's ISP to the topologically nearest DNS nameserver sharing the same IP address, minimizing lookup latency and providing resilient DDoS absorption."
  },
  {
    "id": "sys-beg-11",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Security",
    "question": "What is the difference between SQL (Relational) and NoSQL (Document, Key-Value, Columnar) databases?",
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
    "hint": "Focus on the primary definition and why Security is essential in System Design.",
    "sampleGoodAnswer": "SQL: rigid schema, ACID transactions, complex joins, vertical scaling (PostgreSQL, MySQL). NoSQL: flexible schemas, high write throughput, horizontal partition scaling, trade ACID for eventual consistency (MongoDB for documents, Redis for key-value, Cassandra for wide-column)."
  },
  {
    "id": "sys-beg-12",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Monitoring",
    "question": "What is High Availability (HA) and what does 'Five Nines' (99.999%) uptime mean in practice?",
    "keyConcepts": [
      "Monitoring",
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
    "hint": "Focus on the primary definition and why Monitoring is essential in System Design.",
    "sampleGoodAnswer": "High availability ensures a system remains operational with minimal downtime. 'Five Nines' (99.999% availability) permits at most 5.26 minutes of total downtime per year across all maintenance and incidents, requiring multi-region redundancy, automated healthchecks, and instant failover."
  },
  {
    "id": "sys-beg-13",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Distributed Locks",
    "question": "What is Single Point of Failure (SPOF) and how do redundancy and failover eliminate it?",
    "keyConcepts": [
      "Distributed Locks",
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
    "hint": "Focus on the primary definition and why Distributed Locks is essential in System Design.",
    "sampleGoodAnswer": "A SPOF is any component whose failure causes the entire system to collapse (e.g., a single database master or solitary load balancer). Eliminated through active redundancy (multiple instances), healthcheck monitors, and automated failover mechanics."
  },
  {
    "id": "sys-beg-14",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "API Design",
    "question": "What is Data Replication (Active-Passive vs Active-Active) in distributed storage?",
    "keyConcepts": [
      "API Design",
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
    "hint": "Focus on the primary definition and why API Design is essential in System Design.",
    "sampleGoodAnswer": "Active-Passive: Primary receives all writes and replicates to Standby; on failure, Standby promotes to Primary (simpler, risk of replication lag). Active-Active: multiple nodes in different regions accept concurrent writes (requires conflict resolution algorithms like CRDTs or vector clocks)."
  },
  {
    "id": "sys-beg-15",
    "topic": "System Design",
    "difficulty": "Beginner",
    "category": "Scalability",
    "question": "What is Webhook vs Long-Polling vs WebSockets for real-time client updates?",
    "keyConcepts": [
      "Scalability",
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
    "hint": "Focus on the primary definition and why Scalability is essential in System Design.",
    "sampleGoodAnswer": "Long-Polling: client requests data, server holds connection open until data changes, client immediately re-requests. WebSockets: single persistent full-duplex TCP connection for real-time bidirectional communication. Webhooks: server-to-server HTTP POST callbacks triggered by specific events."
  }
],
  medium: [
  {
    "id": "sys-med-1",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Load Balancing",
    "question": "Design a distributed Rate Limiter capable of handling 1,000,000 requests/sec using Token Bucket and Sliding Window Log with Redis.",
    "keyConcepts": [
      "Load Balancing",
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
    "hint": "Discuss the internal mechanics and performance implications of Load Balancing.",
    "sampleGoodAnswer": "Sliding Window Counter algorithm in Redis: uses a Redis sorted set (ZADD) with timestamps as scores, removes entries older than window (ZREMRANGEBYSCORE), counts current entries (ZCARD), and increments if below limit. For extreme scale (1M req/s), run local in-memory token buckets with periodic Redis batch synchronization."
  },
  {
    "id": "sys-med-2",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Caching",
    "question": "Explain Consistent Hashing and how Virtual Nodes solve hotspotting and unequal load distribution.",
    "keyConcepts": [
      "Caching",
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
    "hint": "Discuss the internal mechanics and performance implications of Caching.",
    "sampleGoodAnswer": "Consistent Hashing maps cache keys and server nodes onto a circular 2^32 hash ring. Each physical server is assigned multiple Virtual Nodes (e.g. 100-256 vnodes) scattered randomly across the ring. This balances load evenly and ensures adding or removing a server only relocates K/N keys, preventing cache stampedes."
  },
  {
    "id": "sys-med-3",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Databases",
    "question": "How does distributed cache invalidation work across Redis clusters? Compare Write-Through vs Write-Behind vs Cache-Aside.",
    "keyConcepts": [
      "Databases",
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
    "hint": "Discuss the internal mechanics and performance implications of Databases.",
    "sampleGoodAnswer": "Cache Invalidation is notoriously difficult. Cache-Aside: reads hit cache; writes update DB and delete the cache key (forcing fresh fetch on next read). To eliminate stale reads across multiple microservices, publish CDC events from database WAL logs to Redis Pub/Sub to evict keys across all instances."
  },
  {
    "id": "sys-med-4",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Message Queues",
    "question": "Explain Apache Kafka architecture: Topics, Partitions, Consumer Groups, Offsets, and Log Compaction.",
    "keyConcepts": [
      "Message Queues",
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
    "hint": "Discuss the internal mechanics and performance implications of Message Queues.",
    "sampleGoodAnswer": "Kafka is an append-only distributed commit log: 1) Topics are partitioned for parallelism; 2) Producers publish with partition keys (hashing guarantees ordering per key); 3) Consumer Groups scale consumption: each partition is read by exactly one consumer in the group; 4) Log Compaction retains only the latest record per key."
  },
  {
    "id": "sys-med-5",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Rate Limiting",
    "question": "How do you design a Globally Unique ID Generator (like Twitter Snowflake) generating 64-bit sortable IDs without central coordination?",
    "keyConcepts": [
      "Rate Limiting",
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
    "hint": "Discuss the internal mechanics and performance implications of Rate Limiting.",
    "sampleGoodAnswer": "Twitter Snowflake generates 64-bit unique IDs: 1 bit unused (sign) + 41 bits timestamp in milliseconds (69 years lifespan) + 10 bits machine/datacenter ID (1024 workers) + 12 bits sequence number (4096 IDs per millisecond per node). IDs are globally unique, roughly time-sorted, and generated locally without network latency."
  },
  {
    "id": "sys-med-6",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "CDN",
    "question": "Explain Strong Consistency vs Eventual Consistency vs Causal Consistency in distributed databases.",
    "keyConcepts": [
      "CDN",
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
    "hint": "Discuss the internal mechanics and performance implications of CDN.",
    "sampleGoodAnswer": "Strong Consistency: all reads return the latest committed write immediately (linearizable). Eventual Consistency: replicas converge to the same state after an elapsed time if no new writes occur. Causal Consistency: operations causally related are observed in the same order; concurrent unrelated operations can be observed in different orders."
  },
  {
    "id": "sys-med-7",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Storage",
    "question": "How does a Distributed Lock work using Redis (Redlock algorithm) vs Apache ZooKeeper / etcd (Raft consensus)?",
    "keyConcepts": [
      "Storage",
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
    "hint": "Discuss the internal mechanics and performance implications of Storage.",
    "sampleGoodAnswer": "Redis Redlock acquires locks across N independent Redis nodes using atomic SET NX EX; lock is valid if acquired on majority (>N/2) within timeout. ZooKeeper and etcd provide CP consensus using Paxos/Raft: client creates an ephemeral sequential znode; the client with the lowest sequence number owns the lock, with automatic heartbeat failover."
  },
  {
    "id": "sys-med-8",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Consistency",
    "question": "How do you architect a URL Shortener service (like TinyURL) handling 100M new URLs per month with 10:1 read-to-write ratio?",
    "keyConcepts": [
      "Consistency",
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
    "hint": "Discuss the internal mechanics and performance implications of Consistency.",
    "sampleGoodAnswer": "TinyURL architecture: 1) ID Generation: 64-bit base62 encoding (a-z, A-Z, 0-9) yielding 62^7 = 3.5 trillion URLs; 2) Storage: NoSQL key-value store (DynamoDB/Cassandra) mapping short_hash -> long_url; 3) Caching: 20% hot URLs cached in Redis (Pareto 80/20 rule); 4) 301 Permanent Redirect (cached by browser) vs 302 Found (tracks analytics)."
  },
  {
    "id": "sys-med-9",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "High Availability",
    "question": "What is the Saga Pattern for distributed transactions across microservices? Compare Orchestration vs Choreography.",
    "keyConcepts": [
      "High Availability",
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
    "hint": "Discuss the internal mechanics and performance implications of High Availability.",
    "sampleGoodAnswer": "Saga coordinates distributed transactions: 1) Choreography: services emit domain events; subsequent services listen and execute local transactions (decentralized, risk of cyclic dependencies); 2) Orchestration: a central Saga Orchestrator state machine instructs services to execute steps and issues compensating transactions in reverse order if a step fails."
  },
  {
    "id": "sys-med-10",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Microservices",
    "question": "How do you design a high-throughput Notification Service (Push, SMS, Email) handling millions of notifications with priority queues?",
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
    "sampleGoodAnswer": "Notification service: API gateway validates request -> Priority Queue (RabbitMQ/Kafka: Urgent for OTPs vs Bulk for marketing) -> Worker fleet handles rate limiting and provider throttling (Twilio, APNs, SendGrid) -> User preference service filters opt-outs -> Status database tracks delivery receipts."
  },
  {
    "id": "sys-med-11",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Security",
    "question": "What is the difference between Pessimistic Locking, Optimistic Concurrency Control (OCC), and Two-Phase Locking (2PL)?",
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
    "sampleGoodAnswer": "Pessimistic Locking locks rows at read time, blocking other transactions (high contention). Optimistic Concurrency Control (OCC) validates version numbers at commit time without locks. Two-Phase Locking (2PL) is a concurrency protocol: Growing Phase (acquires locks) and Shrinking Phase (releases locks), guaranteeing serializability."
  },
  {
    "id": "sys-med-12",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Monitoring",
    "question": "How do you prevent Cache Penetration, Cache Breakdown, and Cache Avalanche in high-traffic architectures?",
    "keyConcepts": [
      "Monitoring",
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
    "hint": "Discuss the internal mechanics and performance implications of Monitoring.",
    "sampleGoodAnswer": "Cache Penetration: queries for non-existent keys bypass cache and hit DB (fix: Bloom Filter or cache null with short TTL). Cache Breakdown: hot key expires, thousands of concurrent requests hit DB simultaneously (fix: Mutex lock or logical expiration). Cache Avalanche: thousands of keys expire at once (fix: add random jitter to TTL)."
  },
  {
    "id": "sys-med-13",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Distributed Locks",
    "question": "Explain how Cassandra / DynamoDB achieve masterless high-availability writes using Quorum Consistency (W + R > N).",
    "keyConcepts": [
      "Distributed Locks",
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
    "hint": "Discuss the internal mechanics and performance implications of Distributed Locks.",
    "sampleGoodAnswer": "DynamoDB/Cassandra use leaderless replication with N replicas: Write quorum W, Read quorum R. If W + R > N, at least one node in the read set overlaps with the latest write set, guaranteeing strong consistency. If W + R <= N, the system is eventually consistent, resolving write conflicts via Last-Write-Wins (LWW) or Vector Clocks."
  },
  {
    "id": "sys-med-14",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "API Design",
    "question": "How do you architect a scalable Metrics & Logging Pipeline (ELK / Grafana Loki) ingesting 5TB of logs daily?",
    "keyConcepts": [
      "API Design",
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
    "hint": "Discuss the internal mechanics and performance implications of API Design.",
    "sampleGoodAnswer": "Logging architecture: 1) Log shippers (FluentBit/Vector) stream container logs; 2) Kafka buffers peak bursts; 3) Log indexing engines (Elasticsearch/Loki) partition indices by day; 4) Hot-Warm-Cold storage tiers: hot NVMe storage for last 7 days, S3 object storage for 90 days cold retention."
  },
  {
    "id": "sys-med-15",
    "topic": "System Design",
    "difficulty": "Medium",
    "category": "Scalability",
    "question": "How do you design a live Real-Time Leaderboard service handling millions of concurrent score updates using Redis Sorted Sets?",
    "keyConcepts": [
      "Scalability",
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
    "hint": "Discuss the internal mechanics and performance implications of Scalability.",
    "sampleGoodAnswer": "Real-time leaderboard uses Redis Sorted Sets (ZSET): ZADD leaderboard <score> <user_id> updates player score in O(log N) time. ZREVRANK returns user rank in O(log N). ZREVRANGEBYSCORE retrieves top 100 players in O(log N + M). Read replicas handle millions of dashboard read requests."
  }
],
  hard: [
  {
    "id": "sys-hard-1",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Load Balancing",
    "question": "Design a High-Throughput Distributed Messaging Broker (like Kafka) from scratch: Memory-mapped files, Zero-Copy sendfile, and Append-only Segments.",
    "keyConcepts": [
      "Load Balancing",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Load Balancing.",
    "sampleGoodAnswer": "Kafka internals design: 1) Append-only Log: disk writes are sequential, achieving 100MB/s per drive; 2) OS Page Cache: messages write directly to Linux page cache; 3) Zero-Copy sendfile(): OS transfers network packets directly from page cache to NIC socket buffer without copying to user-space memory; 4) Segment Indexing: sparse offset and time indices."
  },
  {
    "id": "sys-hard-2",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Caching",
    "question": "Architect a Global Multi-Region Payment Processing System with Strong Idempotency, Two-Phase Commits, and Double-Entry Ledgers.",
    "keyConcepts": [
      "Caching",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Caching.",
    "sampleGoodAnswer": "Payment processing architecture: 1) Idempotency Key header stored atomically in Redis; 2) Double-Entry Bookkeeping ledger table enforcing debit/credit balance; 3) Saga Orchestrator coordinating gateway, user account, and ledger; 4) Outbox Pattern streaming events to Kafka; 5) Automated reconciliation jobs matching bank settlements daily."
  },
  {
    "id": "sys-hard-3",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Databases",
    "question": "How does the Raft Consensus Algorithm handle Leader Election, Log Matching Invariant, and Joint Consensus Configuration Changes?",
    "keyConcepts": [
      "Databases",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Databases.",
    "sampleGoodAnswer": "Raft consensus: 1) Leader Election: heartbeats maintain authority; randomized election timeouts prevent split votes; 2) Log Matching: if two entries in different logs have same index and term, all preceding entries are identical; 3) Joint Consensus: transitions configuration changes (C_old to C_new) using a transitional configuration C_old,new."
  },
  {
    "id": "sys-hard-4",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Message Queues",
    "question": "Design a Large-Scale Video Streaming Platform (like Netflix/YouTube): Video Transcoding pipelines, Adaptive Bitrate Streaming (HLS/DASH), and CDN Edge Pushing.",
    "keyConcepts": [
      "Message Queues",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Message Queues.",
    "sampleGoodAnswer": "Video streaming architecture: 1) Ingestion: chunked S3 upload; 2) Distributed Transcoding: Kafka triggers GPU worker fleet (FFmpeg) splitting video into multi-bitrate HLS/DASH chunks (1080p, 720p, 480p); 3) Storage: S3 object storage; 4) CDN: Edge POPs cache video chunks; 5) Client: video player dynamically adjusts bitrate to network conditions."
  },
  {
    "id": "sys-hard-5",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Rate Limiting",
    "question": "How do you design a Distributed Tracing and Telemetry Platform (like Honeycomb/Datadog) processing 10,000,000 spans/sec with dynamic tail-sampling?",
    "keyConcepts": [
      "Rate Limiting",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Rate Limiting.",
    "sampleGoodAnswer": "Telemetry platform: 1) Collector: OpenTelemetry collector agents buffer spans; 2) Tail-Sampling: evaluates the entire trace trajectory before deciding whether to persist (samples 100% of traces with errors/high-latency, drops 99% of normal 200 OK traces); 3) Columnar Storage: ClickHouse/Loki partitioned by time."
  },
  {
    "id": "sys-hard-6",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "CDN",
    "question": "Architect a Real-Time Collaborative Document Platform (like Google Docs) handling millions of concurrent sessions using CRDTs and WebSockets.",
    "keyConcepts": [
      "CDN",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for CDN.",
    "sampleGoodAnswer": "Collaborative document design: 1) Client: Yjs / Automerge CRDTs maintain local state graph; 2) Transport: WebSocket gateway multiplexes state vector updates; 3) Concurrency: CRDT convergence mathematically resolves concurrent edits; 4) Persistence: periodic document snapshots serialized to S3, with operation log in PostgreSQL."
  },
  {
    "id": "sys-hard-7",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Storage",
    "question": "How do you solve the Multi-Region Data Sovereignty and Sharding challenge under strict GDPR/HIPAA regulations?",
    "keyConcepts": [
      "Storage",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Storage.",
    "sampleGoodAnswer": "Data sovereignty architecture: Shards tagged by geopolitical boundary (EU_Zone, US_Zone). Tenant routing tier maps customer geolocation to local regional databases. Customer PII is encrypted with region-locked KMS keys that cannot be decrypted outside the host jurisdiction."
  },
  {
    "id": "sys-hard-8",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Consistency",
    "question": "Design an Ultra-Low Latency Stock Exchange Order Book and Matching Engine with deterministic replay and microsecond latency.",
    "keyConcepts": [
      "Consistency",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Consistency.",
    "sampleGoodAnswer": "Order matching engine: Pinned single-thread execution loop on bare metal; fixed-size bids and asks arrays sorted by price-time; RingBuffer input queue; FPGA hardware network acceleration; deterministic event sourcing logging all order events to NVMe for sub-microsecond failover replay."
  },
  {
    "id": "sys-hard-9",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "High Availability",
    "question": "How does Consistent Hashing adapt to Heterogeneous Server Capacities and handle cascading failure when multiple nodes crash simultaneously?",
    "keyConcepts": [
      "High Availability",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for High Availability.",
    "sampleGoodAnswer": "Heterogeneous consistent hashing: assign virtual node counts proportional to hardware capacity (e.g. 500 vnodes to 64GB servers, 100 to 16GB servers). Cascading failure mitigation: circuit breakers on adjacent ring neighbors and bounded load shedding to prevent traffic from swamping the next node."
  },
  {
    "id": "sys-hard-10",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Microservices",
    "question": "Architect a Scalable Web Crawler and Search Engine Indexer (like Googlebot) indexing 10 Billion pages with politeness policies and deduplication.",
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
    "sampleGoodAnswer": "Web crawler architecture: 1) URL Frontier: prioritized queue managing politeness (domain delays); 2) DNS Resolver: local DNS cache; 3) Fetcher: asynchronous libcurl workers; 4) Content Extraction & SimHash deduplication; 5) Inverted Indexer: MapReduce/Spark builds posting lists."
  },
  {
    "id": "sys-hard-11",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Security",
    "question": "How do you design a Globally Distributed Geo-Replicated Cache that solves the Cache Invalidation and Split-Brain problem?",
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
    "sampleGoodAnswer": "Geo-cache design: Two-layer architecture with local L1 cache and regional L2. Invalidation uses distributed Pub/Sub over Kafka mirror-maker. Cache entries include Lamport timestamps to resolve race conditions between asynchronous regional invalidation messages."
  },
  {
    "id": "sys-hard-12",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Monitoring",
    "question": "Architect an Ad-Click Fraud Detection Pipeline processing 500,000 clicks/sec with real-time sliding-window graph analysis.",
    "keyConcepts": [
      "Monitoring",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Monitoring.",
    "sampleGoodAnswer": "Click fraud pipeline: Apache Flink stream processing cluster sliding 1-minute, 5-minute, and 1-hour windows over click events. Computes IP frequency, user-agent entropy, and device fingerprint clustering. Suspicious bursts flag IP ranges in Redis blacklist within 50ms."
  },
  {
    "id": "sys-hard-13",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Distributed Locks",
    "question": "How does Google Spanner utilize Paxos, Two-Phase Locking, and TrueTime to execute globally distributed ACID transactions across continents?",
    "keyConcepts": [
      "Distributed Locks",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Distributed Locks.",
    "sampleGoodAnswer": "Spanner distributed transaction: Coordinator acquires read-locks; reads proceed at snapshot timestamp. At commit, coordinator initiates 2PC across participant Paxos groups. TrueTime assigns commit timestamp s. Coordinator waits until TrueTime.now().earliest > s before releasing locks, achieving strict serializability globally."
  },
  {
    "id": "sys-hard-14",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "API Design",
    "question": "Design a Resilient File Storage and Synchronization Service (like Dropbox/Google Drive) handling 100PB data with chunking and delta sync.",
    "keyConcepts": [
      "API Design",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for API Design.",
    "sampleGoodAnswer": "Dropbox sync design: 1) Client breaks files into 4MB chunks, computes SHA-256 hashes; 2) Uploads only new/unique chunk hashes (content-addressable deduplication); 3) Metadata service (Postgres/CockroachDB) updates file version trees; 4) Delta Sync downloads only changed byte chunks."
  },
  {
    "id": "sys-hard-15",
    "topic": "System Design",
    "difficulty": "Hard",
    "category": "Scalability",
    "question": "Architect an Autonomous Incident Auto-Remediation System that monitors distributed microservice telemetry, identifies root causes, and executes safe rollbacks.",
    "keyConcepts": [
      "Scalability",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Scalability.",
    "sampleGoodAnswer": "Auto-remediation system: OpenTelemetry traces stream into anomaly detection engine. If latency/error SLO breaches, decision engine evaluates dependency graph. If canary release correlated with failure, triggers automated Kubernetes rolling rollback and alerts on-call engineer via Slack."
  }
]
};

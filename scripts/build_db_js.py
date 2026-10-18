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

# 1. DATABASE & SQL
sql_cats = ["ACID", "Indexes", "Normalization", "Joins", "Transactions", "PostgreSQL", "MySQL", "Query Optimization", "Window Functions", "Views & Stored Procedures", "Sharding", "Locking", "Replication", "Data Types", "Security"]
sql_qb = [
    "What are the ACID properties in relational database transactions, and what does each guarantee?",
    "What is the difference between an INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN?",
    "What is a Primary Key vs a Foreign Key vs a Unique Key in SQL?",
    "What is Database Normalization (1NF, 2NF, 3NF), and why do systems denormalize for read performance?",
    "What is a B-Tree index in SQL databases, and why does it enable O(log N) search and range queries?",
    "What is the difference between WHERE and HAVING clauses in SQL?",
    "What is the difference between DELETE, TRUNCATE, and DROP commands?",
    "What are Aggregate Functions in SQL (COUNT, SUM, AVG, MIN, MAX), and how does GROUP BY work?",
    "What is the difference between CHAR, VARCHAR, and TEXT data types?",
    "What is a Database View, and what is the difference between a Standard View and a Materialized View?",
    "How does NULL behave in SQL comparisons, and why does 'column = NULL' always evaluate to unknown/false?",
    "What is a Composite (Compound) Key in relational databases?",
    "What is a Subquery, and what is the difference between a Correlated and Non-Correlated Subquery?",
    "What is SQL Injection, and how do Parameterized Queries / Prepared Statements eliminate it?",
    "What is the EXPLAIN command in PostgreSQL / MySQL and how does it help optimize queries?"
]
sql_ab = [
    "Atomicity: all statements in a transaction succeed or all roll back. Consistency: data transitions from one valid state to another, enforcing constraints. Isolation: concurrent transactions execute without interfering. Durability: committed writes survive crashes, guaranteed by WAL/redo logs.",
    "INNER JOIN: returns rows where matches exist in both tables. LEFT JOIN: returns all rows from left table and matched rows from right (or NULL). RIGHT JOIN: all rows from right, matched from left. FULL OUTER JOIN: all rows from both tables, filling NULLs where no match exists.",
    "Primary Key: uniquely identifies each row in a table, non-null, enforced with clustered/unique index. Unique Key: guarantees uniqueness of non-primary values, allows one or more NULLs. Foreign Key: enforces referential integrity by pointing to a primary/unique key in another table.",
    "1NF eliminates repeating groups (atomic values). 2NF eliminates partial dependencies on composite keys. 3NF eliminates transitive dependencies (non-key fields depending on other non-key fields). Denormalization intentionally adds redundant data to eliminate expensive multi-table joins in read-heavy applications.",
    "A B-Tree is a self-balancing search tree data structure. Nodes hold sorted keys and pointers to child pages. Because leaf nodes are doubly-linked in sorted order, B-Trees excel at both point lookups (equality via binary search in O(log N)) and range scans (BETWEEN, <, >) via sequential leaf traversal.",
    "WHERE filters individual rows before grouping operations occur. HAVING filters aggregated groups after the GROUP BY operation has executed.",
    "DELETE is a DML command that removes specified rows, logs each row deletion in transaction logs, and triggers database triggers (can be rolled back). TRUNCATE is a DDL command that deallocates data pages quickly, resetting auto-increment counters with minimal logging. DROP deletes the entire table schema and data permanently.",
    "Aggregate functions perform calculations across a set of row values returning a single scalar value. GROUP BY groups rows sharing identical values into summary rows so aggregate functions evaluate per group.",
    "CHAR is fixed-length (padded with spaces if shorter). VARCHAR is variable-length with a length byte prefix, ideal for variable strings with max limits. TEXT stores long-form character data out-of-row in overflow pages, suited for large documents.",
    "A Standard View is a virtual saved query that re-executes the underlying SQL statement on every read without consuming disk space. A Materialized View stores and persists the computed query results on disk like a physical table, requiring periodic REFRESH to update data but delivering ultra-fast reads.",
    "NULL represents an unknown or missing value, not zero or empty string. Any equality comparison with NULL (e.g. status = NULL) evaluates to UNKNOWN (truth value false). You must use IS NULL or IS NOT NULL, and use COALESCE(val, default) to provide fallback values.",
    "A Composite Key is a primary key consisting of two or more columns that together uniquely identify a row in a table (e.g., order_id and product_id in an order_items join table).",
    "A Subquery is a query nested inside an outer SQL statement. A Non-Correlated subquery executes once independently of the outer query. A Correlated subquery references columns from the outer query, evaluating once for every single candidate row in the outer query.",
    "SQL injection occurs when un-sanitized user strings are concatenated directly into SQL command strings, altering query logic. Prepared Statements (parameterized queries) compile the SQL query template first; user parameters are passed separately as literal data values, making it impossible for user input to be parsed as executable SQL commands.",
    "EXPLAIN shows the database query execution plan generated by the cost-based query optimizer. It details whether the engine uses an Index Scan (IXSCAN) or sequential table scan (Seq Scan), join algorithms used (Nested Loop, Hash Join, Merge Join), and estimated startup and total execution costs."
]
sql_qm = [
    "Explain Transaction Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) and the phenomena they prevent.",
    "What is Multi-Version Concurrency Control (MVCC) in PostgreSQL and InnoDB, and how does it enable non-blocking reads during writes?",
    "Explain Clustered Index vs Non-Clustered (Secondary) Index. How does data layout differ on disk in MySQL InnoDB vs PostgreSQL?",
    "How do Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD) work with OVER (PARTITION BY ... ORDER BY ...)?",
    "What are Database Deadlocks, how do RDBMS detect them (Wait-For Graph), and how do you design transactions to avoid them?",
    "How does PostgreSQL VACUUM and Autovacuum work? What is Table Bloat and Transaction ID (XID) Wraparound?",
    "Explain Database Sharding (Horizontal Partitioning) vs Table Partitioning (Declarative Range/List/Hash partitioning in PostgreSQL).",
    "What is the difference between Write-Ahead Logging (WAL) in PostgreSQL and Redo/Undo logs in MySQL InnoDB?",
    "How do Hash Join, Merge Join, and Nested Loop Join algorithms work, and when does the query planner choose each?",
    "How do you optimize an N+1 query problem in relational databases using Common Table Expressions (CTEs) or batch loading?",
    "What is an Optimistic Concurrency Control (OCC) pattern with version columns vs Pessimistic Locking (SELECT ... FOR UPDATE)?",
    "How does Connection Pooling (PgBouncer, HikariCP) prevent server thread exhaustion in high-concurrency database workloads?",
    "What are Covering Indexes and Index-Only Scans, and how do they eliminate table heap reads entirely?",
    "How do Read Replicas, Streaming Replication, and Replication Lag work in high-availability database architectures?",
    "How do you perform a zero-downtime database migration when adding a NOT NULL column with a default value to a 100M-row table?"
]
sql_am = [
    "1) Read Uncommitted allows Dirty Reads (reading uncommitted data); 2) Read Committed prevents dirty reads using statement-level MVCC snapshots; 3) Repeatable Read prevents Non-Repeatable Reads using transaction-level snapshots (can still suffer phantom reads in some engines); 4) Serializable eliminates all anomalies (including write skew) using strict two-phase locking or SSI.",
    "MVCC ensures readers do not block writers, and writers do not block readers. When a row is updated, the engine does not overwrite in place; it inserts a new row version with transaction metadata (xmin/xmax in Postgres; rollback pointers to undo logs in InnoDB). Queries read the row version matching their transaction snapshot time.",
    "In MySQL InnoDB, the primary key is the Clustered Index: table data rows are physically stored directly in the leaf pages of the primary key B-Tree; secondary indexes store the primary key value as their pointer. In PostgreSQL, all tables are Heap files where rows are stored unordered; all indexes (primary and secondary) store CTID pointers (block number and offset) to the heap.",
    "Window functions perform calculations across a set of table rows related to the current row without collapsing them into a single row. ROW_NUMBER assigns sequential integers. RANK leaves gaps for ties (1, 2, 2, 4). DENSE_RANK leaves no gaps (1, 2, 2, 3). LAG/LEAD accesses preceding or succeeding row values without self-joins.",
    "A deadlock occurs when Transaction A holds Lock 1 and requests Lock 2, while Transaction B holds Lock 2 and requests Lock 1. The database detects deadlocks via a directed Wait-For Graph: when a cycle is detected, the engine aborts the cheaper transaction with a deadlock error. Prevention: always acquire locks on shared resources in a consistent global alphabetical/numerical order.",
    "Because MVCC creates new row versions on updates and deletes, dead row versions accumulate on disk as Table Bloat. VACUUM reclaims space occupied by dead tuples so pages can be reused. If a database runs for 2 billion transactions without vacuuming, it risks XID wraparound failure where historical data becomes invisible; Autovacuum automatically freezes old XIDs to prevent this.",
    "Table Partitioning divides a single logical table into physical child tables on the same database server (by range, list, or hash), allowing partition pruning during queries. Sharding partitions data across multiple independent database server instances/nodes, requiring an application router or coordinator to manage cross-shard queries.",
    "WAL (Write-Ahead Logging) enforces that all data modifications must be written to sequential log files on disk before dirty data pages are flushed from RAM to table data files, guaranteeing durability and crash recovery. In MySQL, Redo Logs handle crash recovery of committed data, while Undo Logs support MVCC snapshots and transaction rollback.",
    "Nested Loop: iterates outer rows and performs index lookups on inner table (best for small datasets). Hash Join: builds an in-memory hash table of the smaller table and probes it with rows from the larger table (best for large unsorted datasets with equality joins). Merge Join: sorts both tables on the join key and merges them in one pass (best when both tables are already indexed/sorted).",
    "Common Table Expressions (CTEs, WITH query AS (...)) compute intermediate temporary result sets within a query. CTEs and window functions allow fetching parents and associated aggregated child data in a single SQL query, completely eliminating N+1 queries.",
    "Pessimistic locking uses SELECT ... FOR UPDATE to lock rows immediately until transaction completion, blocking concurrent transactions (high contention). Optimistic Concurrency Control (OCC) does not lock: rows include a version integer; updates execute 'UPDATE items SET stock = stock - 1, version = version + 1 WHERE id = :id AND version = :version'; if affected rows is 0, another transaction modified it, and the application retries.",
    "Creating an OS process or thread for every incoming client connection consumes ~10MB RAM per connection and degrades CPU via context switching. Connection poolers (HikariCP, PgBouncer) maintain a small pool of warm, long-lived connections (e.g. 50 connections), multiplexing thousands of incoming client requests efficiently.",
    "A Covering Index contains all columns requested by a query (both search keys and projected columns via INCLUDE). When executing, the database reads requested data directly from the index leaf pages without visiting the physical table heap (Index-Only Scan), cutting disk I/O significantly.",
    "The Primary node streams WAL/binlog entries to Read Replicas asynchronously or synchronously. Replication Lag is the delay between a write committing on Primary and applying on Replicas. If a user writes to Primary and immediately reads from a lagging replica, they experience stale reads. Solution: read-your-own-writes routing to Primary for recent writers.",
    "In older PostgreSQL, adding a NOT NULL column with a default value required rewriting the entire table on disk with an exclusive table lock (taking down production for hours). In modern PostgreSQL 11+, defaults are stored in catalog metadata, enabling instant O(1) addition. In older versions: 1) Add column as nullable; 2) Backfill default in small batches; 3) Add NOT NULL constraint with NOT VALID; 4) Validate constraint."
]
sql_qh = [
    "Explain Serializability and Write Skew anomalies. How does Serializable Snapshot Isolation (SSI) in PostgreSQL detect dependency cycles without 2PL locking?",
    "Analyze the internal storage architecture of PostgreSQL: Page Layout (24-byte header, item pointers, free space, tuple storage), HOT updates, and fillfactor.",
    "How does the LSM-Tree (Log-Structured Merge-Tree) architecture (Cassandra, RocksDB, ScyllaDB) achieve 10x higher write throughput than B-Trees?",
    "Explain Distributed Consensus and Two-Phase Commit (2PC) failure modes in distributed SQL databases (CockroachDB, Google Spanner, YugabyteDB).",
    "How does Google Spanner utilize TrueTime APIs (atomic clocks and GPS receivers) to achieve globally consistent External Consistency (strict serializability)?",
    "How do you diagnose and resolve High Buffer Pin Contention, Latch Contention, and WAL Write Bottlenecks on NVMe storage under 100,000 IOPS?",
    "Explain Columnar Storage internals (ClickHouse, Snowflake, DuckDB): Run-length encoding, Bit-packing, Vectorized SIMD query execution, and Zone Maps.",
    "How do you design a Sharded Database routing tier with Consistent Hashing (Virtual Nodes) that rebalances shards with minimal key movement?",
    "How does PostgreSQL logical decoding and Write-Ahead Log (WAL) streaming power real-time Change Data Capture (CDC) with Debezium?",
    "Explain the mechanics of Distributed Deadlocks in multi-shard databases and how Edge-Chasing (Chandy-Misra-Haas) algorithms detect cycles.",
    "How do you tune Linux kernel dirty page writebacks (vm.dirty_background_ratio, vm.dirty_ratio) and IO schedulers (none/mq-deadline) for database hosts?",
    "How does MySQL InnoDB manage the Buffer Pool LRU list (Young vs Old sublists, midpoint insertion) to prevent table scans from evicting hot cached pages?",
    "How do you execute an online, zero-downtime primary key migration (e.g. converting 32-bit INT IDs to 64-bit BIGINT or UUIDs) on a 1TB active table?",
    "What is Jepsen testing, and what consistency anomalies (dirty reads, lost updates, G-single, stale reads) does it uncover in distributed databases?",
    "Design an active-active globally distributed relational database architecture with multi-region write capability and conflict-free data resolution."
]
sql_ah = [
    "Write Skew occurs under Snapshot Isolation when two transactions concurrently read overlapping data, satisfy constraints independently, and update disjoint data that together violates a global constraint (e.g., two doctors both on-call simultaneously take leave). PostgreSQL's SSI tracks rw-antidependencies using lock-free SIREAD locks. When a cycle in the dependency graph forms (T1 -> T2 -> T1), SSI aborts one transaction with a serialization failure without heavy lock blocking.",
    "PostgreSQL stores tables in 8KB pages: 1) 24-byte PageHeader; 2) Array of Linp (4-byte item pointers) growing forward; 3) Free space in middle; 4) Tuples growing backward from bottom. Heap-Only Tuples (HOT) optimization allows an update to place the new tuple in the exact same page if space exists and indexed columns did not change, avoiding updates to secondary index trees and eliminating table bloat.",
    "B-Trees perform random in-place updates, causing costly random disk I/O and page fragmentation. LSM-Trees append all writes sequentially to an in-memory MemTable (skiplist/rbtree) and commit to WAL. When MemTable fills, it flushes sequentially to immutable on-disk SSTables. Background Compaction merges and deduplicates SSTables in sorted order, converting random writes into sequential writes and yielding 10x higher write throughput.",
    "2PC coordinates atomic commit across nodes: Prepare Phase (coordinator asks participants if they can commit; participants vote YES and acquire locks); Commit Phase (coordinator instructs all to commit). Catastrophic failure mode: if the coordinator crashes after participants vote YES, participants remain blocked holding locks indefinitely, unable to unilaterally commit or abort (blocking protocol).",
    "Google Spanner uses TrueTime API which bounds clock drift error: [t.earliest, t.latest] with guaranteed max uncertainty epsilon (~1-7ms) using GPS and atomic clocks in data centers. When committing a transaction, Spanner assigns a commit timestamp s = t.latest and deliberately delays releasing locks until TrueTime.now().earliest > s (Wait-out-the-uncertainty). This mathematically guarantees that if transaction T2 starts after T1 commits, T2's timestamp is strictly greater than T1's, achieving global linearizable serializability.",
    "Under 100k IOPS, bottlenecks shift from disk to memory locks: 1) Buffer Pin Contention: multiple backend processes pin the same page concurrently; 2) Latch Contention: spinlocks on buffer mapping hash tables; 3) WAL Bottlenecks: synchronous commit flushes to WAL buffer. Solutions: partition buffer pool, use unlogged tables or synchronous_commit=off for non-critical writes, tune wal_buffers, and stripe WAL across dedicated low-latency NVMe drives.",
    "Columnar engines store data column-by-column rather than row-by-row. Advantages: 1) High Compression: similar data types stored contiguously compress dramatically using Run-Length Encoding (RLE) and Delta encoding; 2) Vectorized SIMD: CPU instructions operate on arrays of 512 numbers in single clock cycles; 3) Zone Maps (Min/Max indexes): blocks store min and max values, allowing the engine to skip millions of irrelevant rows without reading them.",
    "Consistent Hashing maps both shard nodes and partition keys onto a logical 2^32 ring. Each physical node is assigned multiple Virtual Nodes (vnodes, e.g. 256) distributed uniformly around the ring. When a new shard is added, it claims vnodes from adjacent neighbors, requiring only K/N keys to move (where K is total keys, N is shards), eliminating massive cluster-wide data re-shuffling.",
    "PostgreSQL Logical Decoding reads the raw binary WAL stream and converts physical page mutations into logical change events (INSERT, UPDATE, DELETE) via an output plugin (pgoutput/wal2json). Debezium subscribes as a replication slot consumer, reading events with zero polling overhead, translating them into Kafka event records with commit offset tracking.",
    "In distributed databases, Transaction A on Node 1 waits for Lock on Node 2 held by B, which waits for Lock on Node 3 held by A. The Chandy-Misra-Haas algorithm detects distributed deadlocks by sending Probe messages along wait edges: Probe(initiator, sender, receiver). If a probe message returns to its initiator, a distributed cycle is confirmed, prompting the coordinator to abort the youngest transaction.",
    "Linux default vm.dirty_ratio is 20-30%, which on a 256GB server buffers up to 75GB of dirty pages in RAM before flushing. When flush triggers, the kernel freezes I/O for 10+ seconds. Tuning: set vm.dirty_background_ratio = 3 and vm.dirty_ratio = 10 to force the kernel to stream writes continuously in small increments; set NVMe I/O scheduler to none to bypass kernel queuing overhead.",
    "InnoDB divides the Buffer Pool LRU list into a Young sublist (5/8) and Old sublist (3/8). New pages are inserted at the midpoint (head of the Old sublist). A page must remain in the Old sublist longer than innodb_old_blocks_time (default 1000ms) before consecutive accesses promote it to the Young sublist. This prevents full table scans from flushing hot operational data from RAM.",
    "Online primary key migration: 1) Add new column new_id BIGINT; 2) Create database trigger that mirrors inserts/updates from old_id to new_id; 3) Run a throttled background script that backfills historical rows in small batches (500 rows with 50ms sleeps); 4) Create unique index on new_id concurrently; 5) Rename columns in a brief metadata lock; 6) Drop old trigger and column.",
    "Jepsen tests distributed systems under adverse network conditions: it injects network partitions, clock skews, dropped packets, and node crashes while generating high-concurrency client workloads. It analyzes transaction histories with MALLA/Knossos tools to verify strict serializability and expose consistency violations like dirty reads, lost updates, and write skew.",
    "Active-active multi-region design: 1) CockroachDB / Spanner multi-region tables; 2) Regional partitioning pinning data to local regions with sub-5ms local reads/writes; 3) Global tables utilizing Raft consensus across 3 regions for cross-region reads; 4) CRDT (Conflict-free Replicated Data Types) resolution for asynchronous multi-master topologies."
]

sb, sm, sh = make_15("Database & SQL", "sql", sql_cats, sql_qb, sql_qm, sql_qh, sql_ab, sql_am, sql_ah)
write_ts_topic('databaseSql.ts', 'databaseSqlQuestions', sb, sm, sh)

# 2. JAVASCRIPT & WEB CORE
js_cats = ["Event Loop", "Closures", "Prototypes", "Async/Await", "V8 Engine", "DOM & Events", "Memory & GC", "ES6+ Features", "Promises", "TypeScript", "Modules", "Web APIs", "Performance", "Security", "Web Workers"]
js_qb = [
    "What is the JavaScript Event Loop, and what is the difference between the Call Stack, Microtask Queue, and Macrotask Queue?",
    "What is a Closure in JavaScript, and what is a practical real-world use case for closures?",
    "What is the difference between var, let, and const in terms of scope, hoisting, and re-assignment?",
    "What is Prototypal Inheritance in JavaScript, and how does the prototype chain work?",
    "What is the difference between == and === (loose vs strict equality) in JavaScript?",
    "What is the difference between a Promise, async/await, and a traditional callback?",
    "What are Arrow Functions and how does their handling of the 'this' keyword differ from regular functions?",
    "What is Event Bubbling and Event Capturing in the browser DOM, and what does e.stopPropagation() do?",
    "What is Hoisting in JavaScript, and how do function declarations differ from function expressions?",
    "What is the difference between null and undefined in JavaScript?",
    "What are Higher-Order Functions (map, filter, reduce), and why are pure functions preferred?",
    "What is Debouncing vs Throttling in web performance, and when should you use each?",
    "What is the difference between localStorage, sessionStorage, and Cookies?",
    "What are JavaScript Symbols and what are they used for?",
    "What is the difference between CommonJS (require/module.exports) and ES Modules (import/export)?"
]
js_ab = [
    "JavaScript is single-threaded. Synchronous code executes on the Call Stack. When asynchronous operations complete, their callbacks enter queues: 1) Microtask Queue (Promises, queueMicrotask, MutationObserver) has highest priority—the event loop drains all microtasks after every task before rendering; 2) Macrotask Queue (setTimeout, setInterval, I/O) executes one task per loop turn.",
    "A closure is the combination of a function bundled together with references to its surrounding lexical environment. A function retains access to variables declared in its outer scope even after the outer function has finished executing and returned. Practical uses: data privacy/encapsulation (private variables), function factories, and memoization.",
    "var is function-scoped, hoisted and initialized to undefined, and allows re-declaration. let and const are block-scoped ({}), hoisted into a Temporal Dead Zone (TDZ) where accessing before declaration throws ReferenceError. const prevents variable reference reassignment.",
    "JavaScript uses prototypal inheritance: objects have an internal link ([[Prototype]], accessed via Object.getPrototypeOf or __proto__) to another prototype object. When an attribute is accessed, JavaScript traverses the prototype chain upward until the property is found or null is reached.",
    "== performs type coercion before comparison (e.g., '5' == 5 evaluates to true; false == 0 evaluates to true). === performs strict equality checking without type coercion: both value and type must match exactly ('5' === 5 evaluates to false).",
    "Callbacks pass functions as arguments to execute upon completion, leading to 'callback hell' and inverted control. Promises represent asynchronous eventual completion or failure, chaining with .then() and .catch(). async/await is syntactic sugar over Promises, writing asynchronous code in clean, sequential try/catch blocks.",
    "Arrow functions do not bind their own 'this', 'arguments', 'super', or 'new.target'. Instead, they lexically inherit 'this' from the enclosing execution context at the time of creation, eliminating the need for .bind(this) or var self = this inside callbacks.",
    "DOM events propagate in 3 phases: 1) Capturing phase (travels from window down to target); 2) Target phase; 3) Bubbling phase (bubbles upward from target back to window). e.stopPropagation() stops the event from traversing further up or down the DOM tree.",
    "Hoisting is JavaScript's compilation behavior where declarations are moved to the top of their scope before execution. Function declarations (function foo() {}) are hoisted completely with their implementation. Function expressions (const foo = () => {}) hoist only the variable declaration in TDZ.",
    "undefined means a variable has been declared but has not yet been assigned any value. null is an explicit assignment representing the deliberate absence of any object value.",
    "A higher-order function takes another function as an argument or returns a function. map transforms elements, filter selects subsets, reduce accumulates a value. Pure functions produce identical outputs for identical inputs with no side effects, ensuring predictability and testability.",
    "Debouncing delays function execution until after a specified quiet period has elapsed without any new events (ideal for search inputs). Throttling limits function execution to at most once per specified time interval (ideal for window resize, infinite scroll).",
    "localStorage persists 5-10MB across browser restarts with no expiration. sessionStorage persists 5MB until the browser tab is closed. Cookies store up to 4KB, can be sent automatically with HTTP requests, and support security flags (HttpOnly, Secure, SameSite).",
    "Symbol is a primitive datatype producing guaranteed unique, immutable values (Symbol('id') !== Symbol('id')). They are used to create non-enumerable private object property keys and define built-in metaprogramming hooks (Symbol.iterator, Symbol.toPrimitive).",
    "CommonJS (Node default historically) uses synchronous dynamic require() and module.exports, evaluated at runtime. ES Modules (ESM) use static import/export syntax, evaluated at compile time, enabling tree-shaking and asynchronous module loading across browsers."
]
js_qm = [
    "How does the V8 JavaScript Engine compile and execute code using the Ignition Bytecode Interpreter and TurboFan JIT Compiler?",
    "Explain the JavaScript Memory Model: Memory Heap, Stack, Hidden Classes (Shapes), and Inline Caching.",
    "How does Promise.all() differ from Promise.allSettled(), Promise.race(), and Promise.any()?",
    "Explain WeakMap and WeakSet in JavaScript. Why do they hold weak references, and how do they prevent memory leaks?",
    "What is the Temporal Dead Zone (TDZ), and how does it prevent accessing let and const variables before declaration?",
    "How does the prototype chain work under the hood? What happens when you invoke Object.create(proto) vs new Constructor()?",
    "What are Web Workers, how do they communicate with the main thread via postMessage, and what data transfer mechanisms exist (Structured Clone vs Transferable Objects)?",
    "Explain Generators and Iterators in JavaScript (Symbol.iterator and Symbol.asyncIterator).",
    "What is Cross-Origin Resource Sharing (CORS), Preflight OPTIONS requests, and how does Same-Origin Policy protect users?",
    "How do you implement a Custom Promise implementation conforming to the Promises/A+ specification?",
    "What are Tagged Template Literals in modern JavaScript, and how do libraries like styled-components utilize them?",
    "How do MutationObserver, ResizeObserver, and IntersectionObserver replace inefficient scroll and DOM polling events?",
    "Explain TypeScript Generics, Conditional Types, and the infer keyword for type extraction.",
    "What is the difference between Currying and Partial Application in functional JavaScript?",
    "How does Garbage Collection work in V8 (Generational Scavenge for young generation, Mark-Sweep-Compact for old generation)?"
]
js_am = [
    "V8 parses JavaScript into an AST. Ignition compiles AST into bytecode for instant startup. The engine monitors profiling feedback (type feedback vector); hot functions are passed to the TurboFan JIT compiler, which compiles bytecode into highly optimized native machine code. If type assumptions change, TurboFan deoptimizes back to bytecode.",
    "V8 optimizes dynamic property access by creating Hidden Classes (Shapes). When objects share the exact same properties in the same initialization order, they share a Shape. Inline Caching (IC) records the memory offset of property lookups, turning dynamic hash lookups into single direct memory offset reads.",
    "Promise.all() waits for all promises to resolve; fails fast if any promise rejects. Promise.allSettled() waits for all promises to complete and returns status objects ({ status: 'fulfilled' | 'rejected' }). Promise.race() settles as soon as the first promise resolves or rejects. Promise.any() resolves as soon as the first promise fulfills, ignoring rejections unless all reject.",
    "WeakMap and WeakSet hold weak references to object keys: the presence of an object in a WeakMap does not prevent the Garbage Collector from collecting it if no other references exist. When the object is collected, its entry in the WeakMap is automatically removed, preventing memory leaks in DOM metadata caches.",
    "The Temporal Dead Zone (TDZ) is the time span between entering a scope and the actual execution of the let or const declaration. The variable is hoisted into scope, but uninitialized. Attempting to read or write it during the TDZ throws ReferenceError, preventing access to uninitialized variables.",
    "new Constructor() creates an object, sets its [[Prototype]] to Constructor.prototype, executes the constructor function with 'this' bound to the new object, and returns it. Object.create(proto) creates a fresh object with its [[Prototype]] linked directly to proto without invoking any constructor function.",
    "Web Workers run scripts on a separate background OS thread, preventing CPU-intensive tasks from freezing the UI. Communication uses postMessage(). Structured Clone algorithm deeply copies data between threads. Transferable Objects (ArrayBuffer) transfer raw memory ownership with zero copying in 0ms, making the buffer unusable on the sender thread.",
    "An iterable object implements Symbol.iterator returning an object with a next() method that returns { value, done }. Generator functions (function*) yield values sequentially. Symbol.asyncIterator enables for-await-of loops over asynchronous streams of promises.",
    "SOP blocks web pages from making cross-origin requests to different domains/ports. For non-simple requests (custom headers, PUT/DELETE), browsers send a preflight HTTP OPTIONS request asking the server for Access-Control-Allow-Origin, Methods, and Headers. If server approves, real request proceeds.",
    "A Promises/A+ implementation requires: 1) Internal state (PENDING, FULFILLED, REJECTED); 2) value and reason variables; 3) Handlers arrays for then callbacks; 4) Asynchronous execution of callbacks using queueMicrotask or MutationObserver; 5) Promise resolution procedure handling thenable objects.",
    "Tagged template literals pass template strings to a function: fn`Hello ${name}` passes raw string fragments as an array along with interpolated values. Libraries like styled-components inspect the CSS strings, parse dynamic interpolations (props => props.color), and generate unique scoped CSS classes.",
    "IntersectionObserver tracks element visibility within the viewport (lazy loading images without scroll listeners). ResizeObserver tracks element dimension changes without window resize polling. MutationObserver tracks additions, deletions, and attribute changes in the DOM tree with batched microtask callbacks.",
    "TypeScript Generics allow parameterized reusable types. Conditional types (T extends U ? X : Y) act as type-level if-else. The infer keyword extracts type variables inside conditional types: type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any.",
    "Currying transforms a function of N arguments into a sequence of N unary functions: f(a, b, c) -> f(a)(b)(c). Partial application fixes a subset of arguments, returning a function accepting the remaining arguments: f(a, b, c) -> f_partial(b, c).",
    "V8 divides heap into New Space (1-64MB) and Old Space. New Space uses Cheney's Copying Algorithm (Scavenge): semi-spaces (From-space and To-space) evacuate surviving objects back and forth. Objects surviving two scavenges are promoted to Old Space, managed by Mark-Sweep (marks reachable objects, sweeps dead ones) and Mark-Compact (defragments memory)."
]
js_qh = [
    "Analyze V8 Deoptimization (Deopt) mechanics: How do Polymorphic vs Megamorphic call sites degrade JIT execution speed by 10x?",
    "Explain how SharedArrayBuffer, Atomics (wait, notify, compareExchange), and memory fences enable lock-free multi-threaded algorithms in Web Workers.",
    "How does the V8 Garbage Collector implement Concurrent Marking, Incremental Marking, and Parallel Scavenging to eliminate frame drops?",
    "How do you profile and eliminate Microtask Queue Starvation where recursive Promise chains freeze UI rendering completely?",
    "Explain the JavaScript Memory Model specification (ECMA-262): Memory Barriers, Sequential Consistency, and Tear-free Reads.",
    "How do you design a high-throughput WebAssembly (WASM) and JavaScript bridge using shared memory buffers with zero serialization overhead?",
    "How does the Blink/Chromium rendering pipeline (DOM, CSSOM, Render Tree, Layout, Paint, Composite) interact with requestAnimationFrame?",
    "Explain how JavaScript engines optimize Regular Expressions using Bytecode vs JIT Compilation (Irregexp), and how to prevent ReDoS.",
    "How does the Module Loader specification resolve circular dependencies in ES Modules compared to CommonJS?",
    "How do you build a custom Garbage Collection leak detector in Node.js using v8.getHeapSnapshot() and FinalizationRegistry?",
    "Analyze the performance implications of Proxy and Reflect objects in JavaScript. Why do Proxies disable V8 inline caching?",
    "How does Node.js AsyncLocalStorage propagate asynchronous execution context across Promise chains without monkey-patching?",
    "How do you build a High-Performance Virtual DOM diffing algorithm with keyed reconciliation from scratch in TypeScript?",
    "How does Cross-Site Scripting (XSS) bypass modern filters using DOM clobbering, Prototype Pollution, and Mutation XSS (mXSS)?",
    "Architect a real-time collaborative canvas application handling 60 FPS rendering with OffscreenCanvas, Web Workers, and WebSockets."
]
js_ah = [
    "V8 optimizes property lookups using inline caches: 1) Monomorphic: call site sees 1 shape, generating direct offset read (fastest); 2) Polymorphic: sees 2-4 shapes, using small switch-jump table; 3) Megamorphic: sees 5+ shapes, falling back to global hash table lookup (10x slower). Passing inconsistent object shapes forces deoptimization and megamorphism.",
    "SharedArrayBuffer allows multiple Web Workers to share raw memory addresses. The Atomics API provides thread-safe operations on shared memory: Atomics.compareExchange guarantees atomic CAS; Atomics.wait puts worker thread to sleep until condition changes; Atomics.notify wakes waiting threads, enabling mutexes and lock-free queues in browser JS.",
    "V8 minimizes GC pauses via: 1) Incremental Marking: interleaves small slices of marking work with JavaScript execution; 2) Concurrent Marking: background helper threads mark live objects in the heap while the main thread runs JavaScript; 3) Parallel Scavenging: worker threads parallelize young generation evacuation.",
    "Microtasks (Promises) run continuously until the microtask queue is completely empty before browser rendering can occur. A recursive promise loop (function loop() { Promise.resolve().then(loop); }) starves the macrotask queue and browser rendering, completely freezing the UI tab without overflowing the call stack.",
    "ECMA-262 defines memory order for SharedArrayBuffer and Atomics. Atomics operations provide sequentially consistent ordering: all threads observe atomic reads and writes in the exact same global order, enforced by CPU memory fences (mfence) on x86/ARM to prevent hardware store buffering reordering.",
    "WASM shared memory allocates a WebAssembly.Memory buffer accessible by both WASM and JS. By passing pointers and byte offsets into the shared buffer, JS reads typed arrays (Float32Array) directly from WASM heap without stringifying JSON or copying bytes, achieving sub-millisecond data sharing for audio, 3D, and ML models.",
    "Chromium rendering: DOM + CSSOM -> Render Tree -> Layout (computes geometry) -> Paint (draws pixels into layers) -> Composite (GPU compositing). requestAnimationFrame callbacks execute immediately before Layout and Paint, ensuring animations synchronize with display refresh rates (60/120Hz) without jank.",
    "V8 compiles regular expressions into native machine code using the Irregexp engine. Regular Expression Denial of Service (ReDoS) occurs when catastrophic backtracking evaluates nested quantifiers ((a+)+) in O(2^N) exponential time. Prevention: use linear-time regex engines (RE2) or static linter checks.",
    "In CommonJS, circular dependencies return partially evaluated exports objects. In ES Modules, module bindings are live references: the engine compiles and links bindings across all modules during the static instantiation phase before any code evaluates, allowing circular references to resolve smoothly once exports are defined.",
    "FinalizationRegistry registers callbacks when objects are garbage collected. A leak detector tracks objects with weak references; if an object expected to die remains uncollected after forced GC, v8.getHeapSnapshot() serializes the heap, locating retaining paths retaining unmounted closures.",
    "A Proxy wraps an object and intercepts internal operations (get, set, apply). Because Proxy traps execute arbitrary JavaScript functions on every property access, V8 cannot generate fixed shape offsets or inline caches for Proxy objects, incurring a 2x-5x performance penalty over plain object lookups.",
    "AsyncLocalStorage uses Node.js internal async_hooks: it intercepts asynchronous resource lifecycles (init, before, after, destroy). When an asynchronous operation (setTimeout, Promise, fetch) is initiated, it inherits the execution context of the calling frame, allowing request IDs and tenant context to propagate transparently.",
    "A high-performance Virtual DOM diffing algorithm (like React Fiber or Inferno): 1) Compares old and new virtual nodes; 2) For keyed lists, uses longest increasing subsequence (LIS) algorithm to calculate the minimum number of DOM node moves; 3) Batches DOM mutations into DocumentFragment.",
    "mXSS (Mutation XSS) occurs when HTML is sanitized safely by a library, but the browser's innerHTML parser mutates the markup during DOM serialization into executable script. Prototype Pollution injects properties into Object.prototype; DOM Clobbering uses HTML elements with id/name attributes to override global variables.",
    "Collaborative 60 FPS canvas architecture: 1) Main thread handles user pointer inputs; 2) OffscreenCanvas transferred to a Web Worker; 3) Worker runs rendering loop in requestAnimationFrame; 4) Worker communicates with server over binary WebSocket; 5) CRDT state updates render smoothly without blocking main thread UI."
]

jb, jm, jh = make_15("JavaScript & Web Core", "js", js_cats, js_qb, js_qm, js_qh, js_ab, js_am, js_ah)
write_ts_topic('javascript.ts', 'javascriptQuestions', jb, jm, jh)

print("Database and JavaScript topic question banks written successfully.")

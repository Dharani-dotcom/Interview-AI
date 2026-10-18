import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const databaseSqlQuestions: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: [
  {
    "id": "sql-beg-1",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "ACID",
    "question": "What are the ACID properties in relational database transactions, and what does each guarantee?",
    "keyConcepts": [
      "ACID",
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
    "hint": "Focus on the primary definition and why ACID is essential in Database & SQL.",
    "sampleGoodAnswer": "Atomicity: all statements in a transaction succeed or all roll back. Consistency: data transitions from one valid state to another, enforcing constraints. Isolation: concurrent transactions execute without interfering. Durability: committed writes survive crashes, guaranteed by WAL/redo logs."
  },
  {
    "id": "sql-beg-2",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Indexes",
    "question": "What is the difference between an INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN?",
    "keyConcepts": [
      "Indexes",
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
    "hint": "Focus on the primary definition and why Indexes is essential in Database & SQL.",
    "sampleGoodAnswer": "INNER JOIN: returns rows where matches exist in both tables. LEFT JOIN: returns all rows from left table and matched rows from right (or NULL). RIGHT JOIN: all rows from right, matched from left. FULL OUTER JOIN: all rows from both tables, filling NULLs where no match exists."
  },
  {
    "id": "sql-beg-3",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Normalization",
    "question": "What is a Primary Key vs a Foreign Key vs a Unique Key in SQL?",
    "keyConcepts": [
      "Normalization",
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
    "hint": "Focus on the primary definition and why Normalization is essential in Database & SQL.",
    "sampleGoodAnswer": "Primary Key: uniquely identifies each row in a table, non-null, enforced with clustered/unique index. Unique Key: guarantees uniqueness of non-primary values, allows one or more NULLs. Foreign Key: enforces referential integrity by pointing to a primary/unique key in another table."
  },
  {
    "id": "sql-beg-4",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Joins",
    "question": "What is Database Normalization (1NF, 2NF, 3NF), and why do systems denormalize for read performance?",
    "keyConcepts": [
      "Joins",
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
    "hint": "Focus on the primary definition and why Joins is essential in Database & SQL.",
    "sampleGoodAnswer": "1NF eliminates repeating groups (atomic values). 2NF eliminates partial dependencies on composite keys. 3NF eliminates transitive dependencies (non-key fields depending on other non-key fields). Denormalization intentionally adds redundant data to eliminate expensive multi-table joins in read-heavy applications."
  },
  {
    "id": "sql-beg-5",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Transactions",
    "question": "What is a B-Tree index in SQL databases, and why does it enable O(log N) search and range queries?",
    "keyConcepts": [
      "Transactions",
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
    "hint": "Focus on the primary definition and why Transactions is essential in Database & SQL.",
    "sampleGoodAnswer": "A B-Tree is a self-balancing search tree data structure. Nodes hold sorted keys and pointers to child pages. Because leaf nodes are doubly-linked in sorted order, B-Trees excel at both point lookups (equality via binary search in O(log N)) and range scans (BETWEEN, <, >) via sequential leaf traversal."
  },
  {
    "id": "sql-beg-6",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "PostgreSQL",
    "question": "What is the difference between WHERE and HAVING clauses in SQL?",
    "keyConcepts": [
      "PostgreSQL",
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
    "hint": "Focus on the primary definition and why PostgreSQL is essential in Database & SQL.",
    "sampleGoodAnswer": "WHERE filters individual rows before grouping operations occur. HAVING filters aggregated groups after the GROUP BY operation has executed."
  },
  {
    "id": "sql-beg-7",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "MySQL",
    "question": "What is the difference between DELETE, TRUNCATE, and DROP commands?",
    "keyConcepts": [
      "MySQL",
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
    "hint": "Focus on the primary definition and why MySQL is essential in Database & SQL.",
    "sampleGoodAnswer": "DELETE is a DML command that removes specified rows, logs each row deletion in transaction logs, and triggers database triggers (can be rolled back). TRUNCATE is a DDL command that deallocates data pages quickly, resetting auto-increment counters with minimal logging. DROP deletes the entire table schema and data permanently."
  },
  {
    "id": "sql-beg-8",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Query Optimization",
    "question": "What are Aggregate Functions in SQL (COUNT, SUM, AVG, MIN, MAX), and how does GROUP BY work?",
    "keyConcepts": [
      "Query Optimization",
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
    "hint": "Focus on the primary definition and why Query Optimization is essential in Database & SQL.",
    "sampleGoodAnswer": "Aggregate functions perform calculations across a set of row values returning a single scalar value. GROUP BY groups rows sharing identical values into summary rows so aggregate functions evaluate per group."
  },
  {
    "id": "sql-beg-9",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Window Functions",
    "question": "What is the difference between CHAR, VARCHAR, and TEXT data types?",
    "keyConcepts": [
      "Window Functions",
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
    "hint": "Focus on the primary definition and why Window Functions is essential in Database & SQL.",
    "sampleGoodAnswer": "CHAR is fixed-length (padded with spaces if shorter). VARCHAR is variable-length with a length byte prefix, ideal for variable strings with max limits. TEXT stores long-form character data out-of-row in overflow pages, suited for large documents."
  },
  {
    "id": "sql-beg-10",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Views & Stored Procedures",
    "question": "What is a Database View, and what is the difference between a Standard View and a Materialized View?",
    "keyConcepts": [
      "Views & Stored Procedures",
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
    "hint": "Focus on the primary definition and why Views & Stored Procedures is essential in Database & SQL.",
    "sampleGoodAnswer": "A Standard View is a virtual saved query that re-executes the underlying SQL statement on every read without consuming disk space. A Materialized View stores and persists the computed query results on disk like a physical table, requiring periodic REFRESH to update data but delivering ultra-fast reads."
  },
  {
    "id": "sql-beg-11",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Sharding",
    "question": "How does NULL behave in SQL comparisons, and why does 'column = NULL' always evaluate to unknown/false?",
    "keyConcepts": [
      "Sharding",
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
    "hint": "Focus on the primary definition and why Sharding is essential in Database & SQL.",
    "sampleGoodAnswer": "NULL represents an unknown or missing value, not zero or empty string. Any equality comparison with NULL (e.g. status = NULL) evaluates to UNKNOWN (truth value false). You must use IS NULL or IS NOT NULL, and use COALESCE(val, default) to provide fallback values."
  },
  {
    "id": "sql-beg-12",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Locking",
    "question": "What is a Composite (Compound) Key in relational databases?",
    "keyConcepts": [
      "Locking",
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
    "hint": "Focus on the primary definition and why Locking is essential in Database & SQL.",
    "sampleGoodAnswer": "A Composite Key is a primary key consisting of two or more columns that together uniquely identify a row in a table (e.g., order_id and product_id in an order_items join table)."
  },
  {
    "id": "sql-beg-13",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Replication",
    "question": "What is a Subquery, and what is the difference between a Correlated and Non-Correlated Subquery?",
    "keyConcepts": [
      "Replication",
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
    "hint": "Focus on the primary definition and why Replication is essential in Database & SQL.",
    "sampleGoodAnswer": "A Subquery is a query nested inside an outer SQL statement. A Non-Correlated subquery executes once independently of the outer query. A Correlated subquery references columns from the outer query, evaluating once for every single candidate row in the outer query."
  },
  {
    "id": "sql-beg-14",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Data Types",
    "question": "What is SQL Injection, and how do Parameterized Queries / Prepared Statements eliminate it?",
    "keyConcepts": [
      "Data Types",
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
    "hint": "Focus on the primary definition and why Data Types is essential in Database & SQL.",
    "sampleGoodAnswer": "SQL injection occurs when un-sanitized user strings are concatenated directly into SQL command strings, altering query logic. Prepared Statements (parameterized queries) compile the SQL query template first; user parameters are passed separately as literal data values, making it impossible for user input to be parsed as executable SQL commands."
  },
  {
    "id": "sql-beg-15",
    "topic": "Database & SQL",
    "difficulty": "Beginner",
    "category": "Security",
    "question": "What is the EXPLAIN command in PostgreSQL / MySQL and how does it help optimize queries?",
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
    "hint": "Focus on the primary definition and why Security is essential in Database & SQL.",
    "sampleGoodAnswer": "EXPLAIN shows the database query execution plan generated by the cost-based query optimizer. It details whether the engine uses an Index Scan (IXSCAN) or sequential table scan (Seq Scan), join algorithms used (Nested Loop, Hash Join, Merge Join), and estimated startup and total execution costs."
  }
],
  medium: [
  {
    "id": "sql-med-1",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "ACID",
    "question": "Explain Transaction Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) and the phenomena they prevent.",
    "keyConcepts": [
      "ACID",
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
    "hint": "Discuss the internal mechanics and performance implications of ACID.",
    "sampleGoodAnswer": "1) Read Uncommitted allows Dirty Reads (reading uncommitted data); 2) Read Committed prevents dirty reads using statement-level MVCC snapshots; 3) Repeatable Read prevents Non-Repeatable Reads using transaction-level snapshots (can still suffer phantom reads in some engines); 4) Serializable eliminates all anomalies (including write skew) using strict two-phase locking or SSI."
  },
  {
    "id": "sql-med-2",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Indexes",
    "question": "What is Multi-Version Concurrency Control (MVCC) in PostgreSQL and InnoDB, and how does it enable non-blocking reads during writes?",
    "keyConcepts": [
      "Indexes",
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
    "hint": "Discuss the internal mechanics and performance implications of Indexes.",
    "sampleGoodAnswer": "MVCC ensures readers do not block writers, and writers do not block readers. When a row is updated, the engine does not overwrite in place; it inserts a new row version with transaction metadata (xmin/xmax in Postgres; rollback pointers to undo logs in InnoDB). Queries read the row version matching their transaction snapshot time."
  },
  {
    "id": "sql-med-3",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Normalization",
    "question": "Explain Clustered Index vs Non-Clustered (Secondary) Index. How does data layout differ on disk in MySQL InnoDB vs PostgreSQL?",
    "keyConcepts": [
      "Normalization",
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
    "hint": "Discuss the internal mechanics and performance implications of Normalization.",
    "sampleGoodAnswer": "In MySQL InnoDB, the primary key is the Clustered Index: table data rows are physically stored directly in the leaf pages of the primary key B-Tree; secondary indexes store the primary key value as their pointer. In PostgreSQL, all tables are Heap files where rows are stored unordered; all indexes (primary and secondary) store CTID pointers (block number and offset) to the heap."
  },
  {
    "id": "sql-med-4",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Joins",
    "question": "How do Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD) work with OVER (PARTITION BY ... ORDER BY ...)?",
    "keyConcepts": [
      "Joins",
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
    "hint": "Discuss the internal mechanics and performance implications of Joins.",
    "sampleGoodAnswer": "Window functions perform calculations across a set of table rows related to the current row without collapsing them into a single row. ROW_NUMBER assigns sequential integers. RANK leaves gaps for ties (1, 2, 2, 4). DENSE_RANK leaves no gaps (1, 2, 2, 3). LAG/LEAD accesses preceding or succeeding row values without self-joins."
  },
  {
    "id": "sql-med-5",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Transactions",
    "question": "What are Database Deadlocks, how do RDBMS detect them (Wait-For Graph), and how do you design transactions to avoid them?",
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
    "sampleGoodAnswer": "A deadlock occurs when Transaction A holds Lock 1 and requests Lock 2, while Transaction B holds Lock 2 and requests Lock 1. The database detects deadlocks via a directed Wait-For Graph: when a cycle is detected, the engine aborts the cheaper transaction with a deadlock error. Prevention: always acquire locks on shared resources in a consistent global alphabetical/numerical order."
  },
  {
    "id": "sql-med-6",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "PostgreSQL",
    "question": "How does PostgreSQL VACUUM and Autovacuum work? What is Table Bloat and Transaction ID (XID) Wraparound?",
    "keyConcepts": [
      "PostgreSQL",
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
    "hint": "Discuss the internal mechanics and performance implications of PostgreSQL.",
    "sampleGoodAnswer": "Because MVCC creates new row versions on updates and deletes, dead row versions accumulate on disk as Table Bloat. VACUUM reclaims space occupied by dead tuples so pages can be reused. If a database runs for 2 billion transactions without vacuuming, it risks XID wraparound failure where historical data becomes invisible; Autovacuum automatically freezes old XIDs to prevent this."
  },
  {
    "id": "sql-med-7",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "MySQL",
    "question": "Explain Database Sharding (Horizontal Partitioning) vs Table Partitioning (Declarative Range/List/Hash partitioning in PostgreSQL).",
    "keyConcepts": [
      "MySQL",
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
    "hint": "Discuss the internal mechanics and performance implications of MySQL.",
    "sampleGoodAnswer": "Table Partitioning divides a single logical table into physical child tables on the same database server (by range, list, or hash), allowing partition pruning during queries. Sharding partitions data across multiple independent database server instances/nodes, requiring an application router or coordinator to manage cross-shard queries."
  },
  {
    "id": "sql-med-8",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Query Optimization",
    "question": "What is the difference between Write-Ahead Logging (WAL) in PostgreSQL and Redo/Undo logs in MySQL InnoDB?",
    "keyConcepts": [
      "Query Optimization",
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
    "hint": "Discuss the internal mechanics and performance implications of Query Optimization.",
    "sampleGoodAnswer": "WAL (Write-Ahead Logging) enforces that all data modifications must be written to sequential log files on disk before dirty data pages are flushed from RAM to table data files, guaranteeing durability and crash recovery. In MySQL, Redo Logs handle crash recovery of committed data, while Undo Logs support MVCC snapshots and transaction rollback."
  },
  {
    "id": "sql-med-9",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Window Functions",
    "question": "How do Hash Join, Merge Join, and Nested Loop Join algorithms work, and when does the query planner choose each?",
    "keyConcepts": [
      "Window Functions",
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
    "hint": "Discuss the internal mechanics and performance implications of Window Functions.",
    "sampleGoodAnswer": "Nested Loop: iterates outer rows and performs index lookups on inner table (best for small datasets). Hash Join: builds an in-memory hash table of the smaller table and probes it with rows from the larger table (best for large unsorted datasets with equality joins). Merge Join: sorts both tables on the join key and merges them in one pass (best when both tables are already indexed/sorted)."
  },
  {
    "id": "sql-med-10",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Views & Stored Procedures",
    "question": "How do you optimize an N+1 query problem in relational databases using Common Table Expressions (CTEs) or batch loading?",
    "keyConcepts": [
      "Views & Stored Procedures",
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
    "hint": "Discuss the internal mechanics and performance implications of Views & Stored Procedures.",
    "sampleGoodAnswer": "Common Table Expressions (CTEs, WITH query AS (...)) compute intermediate temporary result sets within a query. CTEs and window functions allow fetching parents and associated aggregated child data in a single SQL query, completely eliminating N+1 queries."
  },
  {
    "id": "sql-med-11",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Sharding",
    "question": "What is an Optimistic Concurrency Control (OCC) pattern with version columns vs Pessimistic Locking (SELECT ... FOR UPDATE)?",
    "keyConcepts": [
      "Sharding",
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
    "hint": "Discuss the internal mechanics and performance implications of Sharding.",
    "sampleGoodAnswer": "Pessimistic locking uses SELECT ... FOR UPDATE to lock rows immediately until transaction completion, blocking concurrent transactions (high contention). Optimistic Concurrency Control (OCC) does not lock: rows include a version integer; updates execute 'UPDATE items SET stock = stock - 1, version = version + 1 WHERE id = :id AND version = :version'; if affected rows is 0, another transaction modified it, and the application retries."
  },
  {
    "id": "sql-med-12",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Locking",
    "question": "How does Connection Pooling (PgBouncer, HikariCP) prevent server thread exhaustion in high-concurrency database workloads?",
    "keyConcepts": [
      "Locking",
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
    "hint": "Discuss the internal mechanics and performance implications of Locking.",
    "sampleGoodAnswer": "Creating an OS process or thread for every incoming client connection consumes ~10MB RAM per connection and degrades CPU via context switching. Connection poolers (HikariCP, PgBouncer) maintain a small pool of warm, long-lived connections (e.g. 50 connections), multiplexing thousands of incoming client requests efficiently."
  },
  {
    "id": "sql-med-13",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Replication",
    "question": "What are Covering Indexes and Index-Only Scans, and how do they eliminate table heap reads entirely?",
    "keyConcepts": [
      "Replication",
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
    "hint": "Discuss the internal mechanics and performance implications of Replication.",
    "sampleGoodAnswer": "A Covering Index contains all columns requested by a query (both search keys and projected columns via INCLUDE). When executing, the database reads requested data directly from the index leaf pages without visiting the physical table heap (Index-Only Scan), cutting disk I/O significantly."
  },
  {
    "id": "sql-med-14",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Data Types",
    "question": "How do Read Replicas, Streaming Replication, and Replication Lag work in high-availability database architectures?",
    "keyConcepts": [
      "Data Types",
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
    "hint": "Discuss the internal mechanics and performance implications of Data Types.",
    "sampleGoodAnswer": "The Primary node streams WAL/binlog entries to Read Replicas asynchronously or synchronously. Replication Lag is the delay between a write committing on Primary and applying on Replicas. If a user writes to Primary and immediately reads from a lagging replica, they experience stale reads. Solution: read-your-own-writes routing to Primary for recent writers."
  },
  {
    "id": "sql-med-15",
    "topic": "Database & SQL",
    "difficulty": "Medium",
    "category": "Security",
    "question": "How do you perform a zero-downtime database migration when adding a NOT NULL column with a default value to a 100M-row table?",
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
    "sampleGoodAnswer": "In older PostgreSQL, adding a NOT NULL column with a default value required rewriting the entire table on disk with an exclusive table lock (taking down production for hours). In modern PostgreSQL 11+, defaults are stored in catalog metadata, enabling instant O(1) addition. In older versions: 1) Add column as nullable; 2) Backfill default in small batches; 3) Add NOT NULL constraint with NOT VALID; 4) Validate constraint."
  }
],
  hard: [
  {
    "id": "sql-hard-1",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "ACID",
    "question": "Explain Serializability and Write Skew anomalies. How does Serializable Snapshot Isolation (SSI) in PostgreSQL detect dependency cycles without 2PL locking?",
    "keyConcepts": [
      "ACID",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for ACID.",
    "sampleGoodAnswer": "Write Skew occurs under Snapshot Isolation when two transactions concurrently read overlapping data, satisfy constraints independently, and update disjoint data that together violates a global constraint (e.g., two doctors both on-call simultaneously take leave). PostgreSQL's SSI tracks rw-antidependencies using lock-free SIREAD locks. When a cycle in the dependency graph forms (T1 -> T2 -> T1), SSI aborts one transaction with a serialization failure without heavy lock blocking."
  },
  {
    "id": "sql-hard-2",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Indexes",
    "question": "Analyze the internal storage architecture of PostgreSQL: Page Layout (24-byte header, item pointers, free space, tuple storage), HOT updates, and fillfactor.",
    "keyConcepts": [
      "Indexes",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Indexes.",
    "sampleGoodAnswer": "PostgreSQL stores tables in 8KB pages: 1) 24-byte PageHeader; 2) Array of Linp (4-byte item pointers) growing forward; 3) Free space in middle; 4) Tuples growing backward from bottom. Heap-Only Tuples (HOT) optimization allows an update to place the new tuple in the exact same page if space exists and indexed columns did not change, avoiding updates to secondary index trees and eliminating table bloat."
  },
  {
    "id": "sql-hard-3",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Normalization",
    "question": "How does the LSM-Tree (Log-Structured Merge-Tree) architecture (Cassandra, RocksDB, ScyllaDB) achieve 10x higher write throughput than B-Trees?",
    "keyConcepts": [
      "Normalization",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Normalization.",
    "sampleGoodAnswer": "B-Trees perform random in-place updates, causing costly random disk I/O and page fragmentation. LSM-Trees append all writes sequentially to an in-memory MemTable (skiplist/rbtree) and commit to WAL. When MemTable fills, it flushes sequentially to immutable on-disk SSTables. Background Compaction merges and deduplicates SSTables in sorted order, converting random writes into sequential writes and yielding 10x higher write throughput."
  },
  {
    "id": "sql-hard-4",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Joins",
    "question": "Explain Distributed Consensus and Two-Phase Commit (2PC) failure modes in distributed SQL databases (CockroachDB, Google Spanner, YugabyteDB).",
    "keyConcepts": [
      "Joins",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Joins.",
    "sampleGoodAnswer": "2PC coordinates atomic commit across nodes: Prepare Phase (coordinator asks participants if they can commit; participants vote YES and acquire locks); Commit Phase (coordinator instructs all to commit). Catastrophic failure mode: if the coordinator crashes after participants vote YES, participants remain blocked holding locks indefinitely, unable to unilaterally commit or abort (blocking protocol)."
  },
  {
    "id": "sql-hard-5",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Transactions",
    "question": "How does Google Spanner utilize TrueTime APIs (atomic clocks and GPS receivers) to achieve globally consistent External Consistency (strict serializability)?",
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
    "sampleGoodAnswer": "Google Spanner uses TrueTime API which bounds clock drift error: [t.earliest, t.latest] with guaranteed max uncertainty epsilon (~1-7ms) using GPS and atomic clocks in data centers. When committing a transaction, Spanner assigns a commit timestamp s = t.latest and deliberately delays releasing locks until TrueTime.now().earliest > s (Wait-out-the-uncertainty). This mathematically guarantees that if transaction T2 starts after T1 commits, T2's timestamp is strictly greater than T1's, achieving global linearizable serializability."
  },
  {
    "id": "sql-hard-6",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "PostgreSQL",
    "question": "How do you diagnose and resolve High Buffer Pin Contention, Latch Contention, and WAL Write Bottlenecks on NVMe storage under 100,000 IOPS?",
    "keyConcepts": [
      "PostgreSQL",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for PostgreSQL.",
    "sampleGoodAnswer": "Under 100k IOPS, bottlenecks shift from disk to memory locks: 1) Buffer Pin Contention: multiple backend processes pin the same page concurrently; 2) Latch Contention: spinlocks on buffer mapping hash tables; 3) WAL Bottlenecks: synchronous commit flushes to WAL buffer. Solutions: partition buffer pool, use unlogged tables or synchronous_commit=off for non-critical writes, tune wal_buffers, and stripe WAL across dedicated low-latency NVMe drives."
  },
  {
    "id": "sql-hard-7",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "MySQL",
    "question": "Explain Columnar Storage internals (ClickHouse, Snowflake, DuckDB): Run-length encoding, Bit-packing, Vectorized SIMD query execution, and Zone Maps.",
    "keyConcepts": [
      "MySQL",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for MySQL.",
    "sampleGoodAnswer": "Columnar engines store data column-by-column rather than row-by-row. Advantages: 1) High Compression: similar data types stored contiguously compress dramatically using Run-Length Encoding (RLE) and Delta encoding; 2) Vectorized SIMD: CPU instructions operate on arrays of 512 numbers in single clock cycles; 3) Zone Maps (Min/Max indexes): blocks store min and max values, allowing the engine to skip millions of irrelevant rows without reading them."
  },
  {
    "id": "sql-hard-8",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Query Optimization",
    "question": "How do you design a Sharded Database routing tier with Consistent Hashing (Virtual Nodes) that rebalances shards with minimal key movement?",
    "keyConcepts": [
      "Query Optimization",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Query Optimization.",
    "sampleGoodAnswer": "Consistent Hashing maps both shard nodes and partition keys onto a logical 2^32 ring. Each physical node is assigned multiple Virtual Nodes (vnodes, e.g. 256) distributed uniformly around the ring. When a new shard is added, it claims vnodes from adjacent neighbors, requiring only K/N keys to move (where K is total keys, N is shards), eliminating massive cluster-wide data re-shuffling."
  },
  {
    "id": "sql-hard-9",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Window Functions",
    "question": "How does PostgreSQL logical decoding and Write-Ahead Log (WAL) streaming power real-time Change Data Capture (CDC) with Debezium?",
    "keyConcepts": [
      "Window Functions",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Window Functions.",
    "sampleGoodAnswer": "PostgreSQL Logical Decoding reads the raw binary WAL stream and converts physical page mutations into logical change events (INSERT, UPDATE, DELETE) via an output plugin (pgoutput/wal2json). Debezium subscribes as a replication slot consumer, reading events with zero polling overhead, translating them into Kafka event records with commit offset tracking."
  },
  {
    "id": "sql-hard-10",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Views & Stored Procedures",
    "question": "Explain the mechanics of Distributed Deadlocks in multi-shard databases and how Edge-Chasing (Chandy-Misra-Haas) algorithms detect cycles.",
    "keyConcepts": [
      "Views & Stored Procedures",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Views & Stored Procedures.",
    "sampleGoodAnswer": "In distributed databases, Transaction A on Node 1 waits for Lock on Node 2 held by B, which waits for Lock on Node 3 held by A. The Chandy-Misra-Haas algorithm detects distributed deadlocks by sending Probe messages along wait edges: Probe(initiator, sender, receiver). If a probe message returns to its initiator, a distributed cycle is confirmed, prompting the coordinator to abort the youngest transaction."
  },
  {
    "id": "sql-hard-11",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Sharding",
    "question": "How do you tune Linux kernel dirty page writebacks (vm.dirty_background_ratio, vm.dirty_ratio) and IO schedulers (none/mq-deadline) for database hosts?",
    "keyConcepts": [
      "Sharding",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Sharding.",
    "sampleGoodAnswer": "Linux default vm.dirty_ratio is 20-30%, which on a 256GB server buffers up to 75GB of dirty pages in RAM before flushing. When flush triggers, the kernel freezes I/O for 10+ seconds. Tuning: set vm.dirty_background_ratio = 3 and vm.dirty_ratio = 10 to force the kernel to stream writes continuously in small increments; set NVMe I/O scheduler to none to bypass kernel queuing overhead."
  },
  {
    "id": "sql-hard-12",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Locking",
    "question": "How does MySQL InnoDB manage the Buffer Pool LRU list (Young vs Old sublists, midpoint insertion) to prevent table scans from evicting hot cached pages?",
    "keyConcepts": [
      "Locking",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Locking.",
    "sampleGoodAnswer": "InnoDB divides the Buffer Pool LRU list into a Young sublist (5/8) and Old sublist (3/8). New pages are inserted at the midpoint (head of the Old sublist). A page must remain in the Old sublist longer than innodb_old_blocks_time (default 1000ms) before consecutive accesses promote it to the Young sublist. This prevents full table scans from flushing hot operational data from RAM."
  },
  {
    "id": "sql-hard-13",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Replication",
    "question": "How do you execute an online, zero-downtime primary key migration (e.g. converting 32-bit INT IDs to 64-bit BIGINT or UUIDs) on a 1TB active table?",
    "keyConcepts": [
      "Replication",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Replication.",
    "sampleGoodAnswer": "Online primary key migration: 1) Add new column new_id BIGINT; 2) Create database trigger that mirrors inserts/updates from old_id to new_id; 3) Run a throttled background script that backfills historical rows in small batches (500 rows with 50ms sleeps); 4) Create unique index on new_id concurrently; 5) Rename columns in a brief metadata lock; 6) Drop old trigger and column."
  },
  {
    "id": "sql-hard-14",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Data Types",
    "question": "What is Jepsen testing, and what consistency anomalies (dirty reads, lost updates, G-single, stale reads) does it uncover in distributed databases?",
    "keyConcepts": [
      "Data Types",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Data Types.",
    "sampleGoodAnswer": "Jepsen tests distributed systems under adverse network conditions: it injects network partitions, clock skews, dropped packets, and node crashes while generating high-concurrency client workloads. It analyzes transaction histories with MALLA/Knossos tools to verify strict serializability and expose consistency violations like dirty reads, lost updates, and write skew."
  },
  {
    "id": "sql-hard-15",
    "topic": "Database & SQL",
    "difficulty": "Hard",
    "category": "Security",
    "question": "Design an active-active globally distributed relational database architecture with multi-region write capability and conflict-free data resolution.",
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
    "sampleGoodAnswer": "Active-active multi-region design: 1) CockroachDB / Spanner multi-region tables; 2) Regional partitioning pinning data to local regions with sub-5ms local reads/writes; 3) Global tables utilizing Raft consensus across 3 regions for cross-region reads; 4) CRDT (Conflict-free Replicated Data Types) resolution for asynchronous multi-master topologies."
  }
]
};

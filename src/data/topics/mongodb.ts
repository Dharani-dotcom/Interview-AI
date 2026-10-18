import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const mongodbQuestions: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: [
  {
    "id": "mongo-beg-1",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Core Concepts",
    "question": "What is MongoDB, and how does its document-oriented model differ from traditional relational databases (RDBMS)?",
    "keyConcepts": [
      "NoSQL",
      "BSON documents",
      "Schema flexibility",
      "Collections vs Tables"
    ],
    "commonWeakSpots": [
      "Saying MongoDB has no schema rules at all or cannot enforce validation.",
      "Thinking documents are plain JSON strings rather than binary BSON."
    ],
    "strongIndicators": [
      "Explains collections contain BSON documents.",
      "Contrasts relational rows/foreign keys with nested subdocuments and flexible schemas."
    ],
    "hint": "Think about how rows in tables map to documents in collections and how foreign key joins compare to embedded documents.",
    "sampleGoodAnswer": "MongoDB is a leading document-oriented NoSQL database. Instead of storing data in rigid rows and columns with fixed schemas and foreign keys, MongoDB stores records as BSON (Binary JSON) documents grouped into collections. This model allows nested sub-documents and arrays, providing schema flexibility, natural mapping to object-oriented code, and high read performance by co-locating related data."
  },
  {
    "id": "mongo-beg-2",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "BSON vs JSON",
    "question": "What is BSON, and why does MongoDB use BSON instead of standard JSON?",
    "keyConcepts": [
      "Binary JSON",
      "Type support (Date, ObjectId, Decimal128, Binary)",
      "Fast traversal length prefix",
      "Efficient storage"
    ],
    "commonWeakSpots": [
      "Believing MongoDB stores raw human-readable JSON strings on disk."
    ],
    "strongIndicators": [
      "Highlights extra data types like ObjectId, Date, Binary, and 64-bit integers that JSON lacks.",
      "Mentions length prefixes that allow fast field skipping during indexing and scanning."
    ],
    "hint": "What types does standard JSON lack, and how does binary serialization speed up database traversal?",
    "sampleGoodAnswer": "BSON stands for Binary JSON. While JSON is human-readable text supporting limited types (string, number, boolean, array, object, null), BSON is a binary serialization format that adds critical database data types such as Date, ObjectId, 64-bit integer, Decimal128, and raw binary data. Furthermore, BSON documents store length prefixes for fields, allowing MongoDB query engines to rapidly skip over fields without parsing every byte."
  },
  {
    "id": "mongo-beg-3",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Primary Key",
    "question": "What is the _id field and ObjectId in MongoDB? What information is encoded inside an ObjectId?",
    "keyConcepts": [
      "12-byte identifier",
      "Timestamp (4 bytes)",
      "Random machine/process value (5 bytes)",
      "Incrementing counter (3 bytes)"
    ],
    "commonWeakSpots": [
      "Thinking ObjectId is purely a random string.",
      "Not knowing you can extract the creation timestamp from an ObjectId."
    ],
    "strongIndicators": [
      "Details the 12-byte structure: 4-byte Unix timestamp, 5-byte random value, 3-byte incrementing counter.",
      "Notes it guarantees chronological ordering and natural uniqueness without auto-increment locks."
    ],
    "hint": "How does MongoDB ensure unique IDs across distributed nodes without coordinating with a central sequence generator?",
    "sampleGoodAnswer": "Every MongoDB document must have a unique _id field as its primary key. If omitted on insertion, MongoDB automatically generates a 12-byte ObjectId: 1) 4 bytes representing the Unix epoch timestamp; 2) 5 bytes of random per-process value (machine/process identifier); 3) 3 bytes of incrementing counter initialized to a random value. This allows distributed generation without central locking and enables extracting document creation time via ObjectId.getTimestamp()."
  },
  {
    "id": "mongo-beg-4",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "CRUD Operations",
    "question": "Explain the difference between insertOne(), insertMany(), findOne(), and find() in MongoDB.",
    "keyConcepts": [
      "insertOne vs insertMany",
      "findOne returning single doc",
      "find returning cursor",
      "Memory efficiency"
    ],
    "commonWeakSpots": [
      "Expecting find() to return a JavaScript array rather than a MongoDB cursor."
    ],
    "strongIndicators": [
      "Explains find() returns an iterable cursor that streams documents in batches.",
      "Mentions findOne() returns the first document matching criteria or null."
    ],
    "hint": "Why is returning a cursor in find() better for memory than loading 1,000,000 documents into an array immediately?",
    "sampleGoodAnswer": "insertOne() adds a single document, while insertMany() accepts an array of documents and supports ordered or unordered bulk insertion. findOne() returns the first matching document directly as an object (or null). find() returns a database cursor—a pointer to the result set that streams documents in batches (default 101 documents or 1MB) on demand, preventing the database and client from exhausting RAM."
  },
  {
    "id": "mongo-beg-5",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Update Operators",
    "question": "Why should you use update operators like $set, $inc, and $push instead of replacing the entire document?",
    "keyConcepts": [
      "Atomic field updates",
      "$set for field values",
      "$inc for numeric counters",
      "$push for arrays",
      "Network efficiency"
    ],
    "commonWeakSpots": [
      "Writing db.collection.updateOne({ _id }, { status: \"active\" }) without $set, which wipes out all other fields in the document."
    ],
    "strongIndicators": [
      "Explains update operators perform in-place atomic mutations on specific fields without transferring or overwriting the rest of the document."
    ],
    "hint": "What happens if you execute db.users.updateOne({ _id: 1 }, { name: \"Bob\" }) without using $set?",
    "sampleGoodAnswer": "In MongoDB, update operators target specific fields. Using $set modifies only the specified field while preserving all other properties. Without $set, supplying a plain object replaces the entire document, erasing all existing fields. Other atomic operators include $inc (safely increments counters without race conditions), $push (appends items to arrays), and $unset (removes a field)."
  },
  {
    "id": "mongo-beg-6",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Embedded vs Referenced",
    "question": "What is the difference between Embedding (denormalization) vs Referencing (normalization) in MongoDB document design?",
    "keyConcepts": [
      "1-to-1 and 1-to-few embedding",
      "1-to-many / 1-to-squillions referencing",
      "16MB document size limit",
      "Join trade-offs"
    ],
    "commonWeakSpots": [
      "Always referencing everything like in SQL tables.",
      "Embedding unbounded growing arrays that exceed the 16MB document limit."
    ],
    "strongIndicators": [
      "Explains embedding co-locates related data for single-query reads without joins.",
      "Explains referencing prevents unbounded document growth and manages many-to-many relationships."
    ],
    "hint": "When should you embed an address in a user document vs when should you reference order history in a separate collection?",
    "sampleGoodAnswer": "Embedding stores related data within the same document (e.g. an array of addresses inside a user doc), enabling atomic single-query reads without joins. Referencing stores related data in a separate collection using ObjectIds, requiring multiple queries or $lookup. Rule of thumb: Embed for 1-to-1 or bounded 1-to-few relationships with shared lifecycles; Reference for 1-to-many unbounded relationships, large sub-documents, or to stay within the 16MB document size limit."
  },
  {
    "id": "mongo-beg-7",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Indexes Basics",
    "question": "What is an Index in MongoDB, what is the default index created on every collection, and why are indexes vital for query performance?",
    "keyConcepts": [
      "B-Tree index structure",
      "Default _id unique index",
      "COLLSCAN vs IXSCAN",
      "Query latency reduction"
    ],
    "commonWeakSpots": [
      "Assuming MongoDB automatically indexes all fields in a collection."
    ],
    "strongIndicators": [
      "Explains that without an index, MongoDB executes a full collection scan (COLLSCAN) inspecting every document in storage.",
      "Identifies the default unique index on _id."
    ],
    "hint": "What is the difference between a COLLSCAN (collection scan) and an IXSCAN (index scan)?",
    "sampleGoodAnswer": "An index is a specialized data structure (a B-Tree) that holds a small portion of the collection’s data in an easily traversable sorted order. Every MongoDB collection automatically has a unique index on the _id field. Without secondary indexes, MongoDB must perform a COLLSCAN (Collection Scan), reading every document from disk into memory. With an index, it performs an IXSCAN, locating matching documents in logarithmic time."
  },
  {
    "id": "mongo-beg-8",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Document Size Limits",
    "question": "What is the maximum BSON document size limit in MongoDB, and what is GridFS used for?",
    "keyConcepts": [
      "16MB limit",
      "RAM usage optimization",
      "GridFS chunking (255KB chunks)",
      "fs.files and fs.chunks"
    ],
    "commonWeakSpots": [
      "Not knowing the 16MB limit or storing large video/PDF files directly inside BSON documents."
    ],
    "strongIndicators": [
      "Identifies 16MB limit prevents runaway memory usage.",
      "Explains GridFS splits large binary files into 255KB chunks across fs.chunks and fs.files collections."
    ],
    "hint": "How do you store a 50MB PDF or video file in MongoDB?",
    "sampleGoodAnswer": "The maximum BSON document size is 16MB. This limit prevents individual documents from consuming excessive RAM during queries and transmission. For files exceeding 16MB (such as videos, large PDFs, or audio), MongoDB provides GridFS. GridFS divides large files into chunks (default 255KB each) stored in an fs.chunks collection, with file metadata tracked in an fs.files collection."
  },
  {
    "id": "mongo-beg-9",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Projection",
    "question": "What is Projection in MongoDB queries, and how does it optimize network and memory usage?",
    "keyConcepts": [
      "Projection object",
      "Inclusion (1) vs Exclusion (0)",
      "Field filtering at database layer",
      "Covered queries"
    ],
    "commonWeakSpots": [
      "Fetching entire 5MB documents to frontend clients when only username and email were needed."
    ],
    "strongIndicators": [
      "Demonstrates { projection: { password: 0 } } or { projection: { name: 1, email: 1 } }.",
      "Notes that returning only needed fields reduces network bandwidth and serialization time."
    ],
    "hint": "How do you write a find query that excludes the password field and returns only name and email?",
    "sampleGoodAnswer": "Projection specifies which fields MongoDB should return in query results. You pass a projection document as the second argument: db.users.find({}, { name: 1, email: 1, _id: 0 }). By default, all fields are returned. Projection saves database memory, reduces network payload size, and speeds up deserialization. When all projected fields are contained in an index, MongoDB achieves a \"Covered Query\" without reading actual documents from disk."
  },
  {
    "id": "mongo-beg-10",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Capped Collections",
    "question": "What is a Capped Collection in MongoDB, and what are its ideal use cases?",
    "keyConcepts": [
      "Fixed-size circular buffer",
      "FIFO auto-overwrite",
      "High-throughput insertion",
      "Logs and audit trails"
    ],
    "commonWeakSpots": [
      "Attempting to delete individual documents from a capped collection."
    ],
    "strongIndicators": [
      "Explains capped collections maintain insertion order and automatically overwrite the oldest documents when allocated space limit is reached.",
      "Mentions logging, cache, and real-time event queues."
    ],
    "hint": "Which type of collection acts as a circular buffer and cannot have documents manually deleted?",
    "sampleGoodAnswer": "A Capped Collection is a fixed-size collection that functions like a circular buffer: it stores documents in natural insertion order, and when the allocated maximum byte size or document count limit is reached, it automatically overwrites the oldest documents (FIFO). Individual documents cannot be deleted from a capped collection. They provide ultra-fast insertions for logging, audit trails, and time-windowed metrics."
  },
  {
    "id": "mongo-beg-11",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Sorting & Pagination",
    "question": "How do sort(), skip(), and limit() work together in MongoDB, and what is the performance issue with high skip() values?",
    "keyConcepts": [
      "sort() order (1, -1)",
      "skip() offset",
      "limit() page size",
      "Offset pagination inefficiency (O(N) scan)"
    ],
    "commonWeakSpots": [
      "Relying on skip(100000) for deep pagination, wondering why database queries become sluggish."
    ],
    "strongIndicators": [
      "Explains skip(N) requires the database to iterate through and discard N documents.",
      "Recommends keyset/cursor-based pagination (e.g. _id > lastSeenId) for deep pagination."
    ],
    "hint": "Why is skip(50000).limit(20) slow, and what is the better alternative?",
    "sampleGoodAnswer": "In MongoDB, cursor pagination is typically written as db.posts.find().sort({ createdAt: -1 }).skip(page * limit).limit(limit). However, as the page number grows, skip(N) forces MongoDB to scan through and discard N documents before returning the target results, degrading performance to O(N). For large datasets, keyset/range-based pagination (e.g., query { _id: { $lt: lastSeenId } }.limit(20)) achieves O(1) performance using an index."
  },
  {
    "id": "mongo-beg-12",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Comparison & Logical Operators",
    "question": "What are the primary comparison ($gt, $gte, $in) and logical ($and, $or, $nor) operators in MongoDB?",
    "keyConcepts": [
      "$gt / $lt / $eq / $ne",
      "$in array matching",
      "$and implicit vs explicit",
      "$or evaluation"
    ],
    "commonWeakSpots": [
      "Writing explicit $and: [{ a: 1 }, { b: 2 }] when implicit comma-separated { a: 1, b: 2 } is simpler."
    ],
    "strongIndicators": [
      "Contrasts $in with multiple $or queries.",
      "Explains when explicit $and is required (e.g. querying the same field with multiple expressions)."
    ],
    "hint": "How do you write a query to find all users whose age is between 20 and 30, and whose role is either \"editor\" or \"admin\"?",
    "sampleGoodAnswer": "Comparison operators include $eq, $ne, $gt, $gte, $lt, $lte, and $in (matches any value in a specified array). Logical operators include $and, $or, $nor, and $not. For example: db.users.find({ age: { $gte: 20, $lte: 30 }, role: { $in: [\"editor\", \"admin\"] } }). Comma-separated field criteria in a query object act as an implicit $and."
  },
  {
    "id": "mongo-beg-13",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Upsert",
    "question": "What does the upsert option do in MongoDB update operations (updateOne, updateMany)?",
    "keyConcepts": [
      "Update or Insert",
      "upsert: true flag",
      "$setOnInsert operator",
      "Atomic guarantee"
    ],
    "commonWeakSpots": [
      "Writing separate findOne() then insert() code which introduces race conditions in concurrent apps."
    ],
    "strongIndicators": [
      "Explains that if matching document is found, it updates; if not found, it inserts a new document atomically.",
      "Uses $setOnInsert for default creation fields (e.g. createdAt)."
    ],
    "hint": "How do you update a document if it exists, or insert it if it does not, in a single atomic database operation?",
    "sampleGoodAnswer": "The upsert: true option tells MongoDB: if a document matching the query filter exists, perform the update; if no document matches, create and insert a new document combining the query filter and update operators. The $setOnInsert operator can specify fields (like createdAt) that are only set when a new document is inserted, not when an existing one is updated, preventing race conditions."
  },
  {
    "id": "mongo-beg-14",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Schema Validation",
    "question": "Can MongoDB enforce schema validation rules, and how is this configured using $jsonSchema?",
    "keyConcepts": [
      "JSON Schema standard",
      "validator collection options",
      "validationLevel & validationAction",
      "Hybrid flexibility with safety"
    ],
    "commonWeakSpots": [
      "Believing MongoDB has no schema validation capabilities at the database engine level."
    ],
    "strongIndicators": [
      "Explains MongoDB supports collection-level JSON Schema validators ($jsonSchema) specifying required fields, data types, and regex patterns.",
      "Differentiates validationAction: \"error\" vs \"warn\"."
    ],
    "hint": "Can MongoDB reject document inserts that lack a required \"email\" string field without using Mongoose?",
    "sampleGoodAnswer": "Yes. MongoDB natively supports database-level schema validation via $jsonSchema configured when creating or altering a collection (db.createCollection(\"users\", { validator: { $jsonSchema: { bsonType: \"object\", required: [\"email\"], properties: { email: { bsonType: \"string\" } } } } })). You can set validationAction to \"error\" (rejects invalid writes) or \"warn\" (logs violation but permits write)."
  },
  {
    "id": "mongo-beg-15",
    "topic": "MongoDB",
    "difficulty": "Beginner",
    "category": "Mongoose ODM",
    "question": "What is Mongoose, and what value does it add on top of the native MongoDB Node.js driver?",
    "keyConcepts": [
      "Object Data Modeling (ODM)",
      "Strict Schema definitions",
      "Pre/Post middleware hooks",
      "Type casting & validation",
      "Virtual attributes"
    ],
    "commonWeakSpots": [
      "Assuming Mongoose is MongoDB itself rather than an application-level Node library."
    ],
    "strongIndicators": [
      "Lists Mongoose features: schemas, models, built-in validation, lifecycle hooks (pre-save, post-save), virtuals, and population."
    ],
    "hint": "Why do Node.js developers use Mongoose instead of just the raw mongodb npm driver?",
    "sampleGoodAnswer": "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. While the raw driver executes arbitrary BSON queries directly, Mongoose adds application-level structure: strict schema definitions, automatic type casting, custom validators, pre/post middleware hooks (e.g. hashing passwords before save), virtual properties, and document-level helper methods."
  }
],
  medium: [
  {
    "id": "mongo-med-1",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Aggregation Pipeline",
    "question": "Explain the MongoDB Aggregation Pipeline. How do stages ($match, $project, $group, $lookup, $unwind) transform data?",
    "keyConcepts": [
      "Multi-stage data processing pipeline",
      "$match filter early",
      "$group aggregation & accumulators",
      "$unwind array flattening",
      "$lookup left outer join"
    ],
    "commonWeakSpots": [
      "Placing $match after expensive $group or $lookup stages instead of filtering first."
    ],
    "strongIndicators": [
      "Explains data flows sequentially through stages like an assembly line.",
      "Emphasizes placing $match and $sort first to leverage indexes."
    ],
    "hint": "Why is placing $match as the very first stage in an aggregation pipeline crucial for performance?",
    "sampleGoodAnswer": "The Aggregation Pipeline is a multi-stage framework for data transformation and analytics where documents pass through a sequence of processing stages: 1) $match filters documents (placing this first leverages indexes); 2) $project reshapes fields; 3) $group aggregates data by a key using accumulators ($sum, $avg); 4) $lookup performs a left outer join with another collection; 5) $unwind deconstructs array fields into individual documents."
  },
  {
    "id": "mongo-med-2",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Indexing Strategies",
    "question": "Explain Compound Indexes and the ESR (Equality, Sort, Range) rule in MongoDB query optimization.",
    "keyConcepts": [
      "Compound index key order",
      "ESR rule: Equality -> Sort -> Range",
      "Index prefix matching",
      "Avoiding in-memory sort"
    ],
    "commonWeakSpots": [
      "Ordering compound index fields randomly without adhering to ESR.",
      "Not knowing an index on (A, B, C) can support queries on (A) and (A, B) but not (B, C)."
    ],
    "strongIndicators": [
      "Details the ESR rule: equality fields first, sort fields second, range fields ($gt, $lt) third.",
      "Explains index prefix matching."
    ],
    "hint": "In what order should you index fields for the query: db.users.find({ status: \"active\", age: { $gt: 25 } }).sort({ createdAt: -1 })?",
    "sampleGoodAnswer": "A compound index indexes multiple fields in a specified order. The ESR Rule dictates the optimal key sequence: 1) Equality fields first (e.g., status) to rapidly narrow candidates; 2) Sort fields second (e.g., createdAt) so documents are already ordered in the index, preventing an expensive in-memory sort; 3) Range fields last (e.g., age). In this scenario, the optimal compound index is { status: 1, createdAt: -1, age: 1 }."
  },
  {
    "id": "mongo-med-3",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Query Optimization & Explain",
    "question": "How do you analyze slow queries using explain(\"executionStats\") in MongoDB? What metrics indicate index issues?",
    "keyConcepts": [
      "executionStats mode",
      "totalDocsExamined vs nReturned ratio",
      "totalKeysExamined",
      "COLLSCAN vs IXSCAN",
      "SORT stage without index"
    ],
    "commonWeakSpots": [
      "Only looking at executionTimeMillis without inspecting totalDocsExamined vs nReturned."
    ],
    "strongIndicators": [
      "Identifies that if totalDocsExamined is 100,000 and nReturned is 10, the query lacks a proper index.",
      "Highlights that winningPlan showing SORT without IXSCAN indicates a memory sort."
    ],
    "hint": "What does it mean if explain(\"executionStats\") shows totalDocsExamined: 50000 and nReturned: 5?",
    "sampleGoodAnswer": "Running cursor.explain(\"executionStats\") reveals query execution internals: 1) totalDocsExamined vs nReturned: in an ideal indexed query, this ratio is 1:1; if totalDocsExamined is thousands while nReturned is 5, MongoDB is performing a costly scan; 2) Stage: COLLSCAN means no index was used; IXSCAN means an index was traversed; 3) A SORT stage without an underlying index warns that MongoDB is sorting results in RAM (failing if over 32MB without allowDiskUse)."
  },
  {
    "id": "mongo-med-4",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Replication & Replica Sets",
    "question": "How does a MongoDB Replica Set provide High Availability? Explain Primary, Secondary, and Election mechanics.",
    "keyConcepts": [
      "Primary-Secondary architecture",
      "Oplog (operations log) replication",
      "Raft-like consensus elections",
      "Heartbeats and failover"
    ],
    "commonWeakSpots": [
      "Believing write operations can be accepted by Secondary nodes in a standard replica set."
    ],
    "strongIndicators": [
      "Explains single Primary accepts all writes and records them to the oplog.",
      "Secondaries asynchronously replay the oplog.",
      "Automatic election occurs if heartbeats fail for 10 seconds."
    ],
    "hint": "What happens if the Primary node in a 3-member replica set suddenly crashes?",
    "sampleGoodAnswer": "A Replica Set consists of multiple MongoDB nodes maintaining identical data: one Primary node and multiple Secondary nodes. The Primary receives all write operations and records them in an idempotent circular oplog (local.oplog.rs). Secondaries continuously replicate and apply oplog entries asynchronously. Members ping each other with heartbeats every 2 seconds; if the Primary becomes unreachable for 10 seconds, Secondaries elect a new Primary with the latest oplog entries."
  },
  {
    "id": "mongo-med-5",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Write Concerns & Read Concerns",
    "question": "Explain Write Concern (w: 1, w: \"majority\", j: true) and Read Concern (local, majority, linearizable) in MongoDB.",
    "keyConcepts": [
      "Write Concern acknowledgment levels",
      "Journal persistence (j: true)",
      "Read Concern majority",
      "Dirty read prevention"
    ],
    "commonWeakSpots": [
      "Assuming write operations are guaranteed durable on disk across replicas by default."
    ],
    "strongIndicators": [
      "Explains w: 1 acknowledges write on Primary memory only; w: \"majority\" waits for majority of replica nodes; j: true guarantees write flushed to disk journal.",
      "Explains readConcern: \"majority\" avoids reading data that could be rolled back."
    ],
    "hint": "What write concern and read concern ensure financial transactions are durable and will not be rolled back during a network partition?",
    "sampleGoodAnswer": "Write Concern specifies acknowledgment requirements: w: 1 confirms the Primary accepted the write in memory; w: \"majority\" guarantees a majority of replica members acknowledged the write; j: true guarantees the write was flushed to the on-disk journal before returning. Read Concern controls data isolation: readConcern: \"local\" returns latest data on that node (may be rolled back); readConcern: \"majority\" guarantees data committed by majority, preventing dirty reads during failovers."
  },
  {
    "id": "mongo-med-6",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Transactions (ACID)",
    "question": "How do Multi-Document ACID Transactions work in MongoDB? What are their limitations and performance costs?",
    "keyConcepts": [
      "Multi-document ACID transactions",
      "Session-based (client.startSession())",
      "Two-Phase Commit (2PC) internally",
      "Snapshot isolation",
      "Latency overhead"
    ],
    "commonWeakSpots": [
      "Thinking MongoDB does not support multi-document ACID transactions."
    ],
    "strongIndicators": [
      "Explains session-based transactions (session.startTransaction(), session.commitTransaction()).",
      "Notes they require a Replica Set or Sharded Cluster.",
      "Highlights performance cost and recommends proper document modeling first."
    ],
    "hint": "How do you execute a transaction across two collections in MongoDB using Mongoose or the native driver?",
    "sampleGoodAnswer": "MongoDB supports multi-document ACID transactions across collections and shards using sessions: const session = client.startSession(); session.startTransaction(); try { await collA.updateOne(..., { session }); await collB.updateOne(..., { session }); await session.commitTransaction(); } catch (err) { await session.abortTransaction(); } finally { session.endSession(); }. Under the hood, MongoDB uses Snapshot Isolation and WiredTiger storage locks. Transactions incur latency overhead and should be reserved for cross-entity operations rather than routine single-document writes."
  },
  {
    "id": "mongo-med-7",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Text Search & Partial Indexes",
    "question": "What are Partial Indexes, Sparse Indexes, and Text Indexes in MongoDB, and how do they save RAM?",
    "keyConcepts": [
      "Partial filter expression",
      "Sparse index on existing fields",
      "Text search indexing with stemming",
      "Index size minimization"
    ],
    "commonWeakSpots": [
      "Creating full indexes on collections of 10M records when only 1% of documents (e.g., active orders) are queried."
    ],
    "strongIndicators": [
      "Explains partialFilterExpression indexes only documents satisfying a predicate (e.g., { status: \"pending\" }), reducing index RAM footprint dramatically.",
      "Explains sparse indexes only index documents where the field exists."
    ],
    "hint": "How do you create an index that only indexes users who have isSubscribed: true without wasting RAM on millions of free users?",
    "sampleGoodAnswer": "Partial indexes only index documents meeting a specified filter expression: db.users.createIndex({ email: 1 }, { partialFilterExpression: { isSubscribed: true } }). This drastically reduces index memory (RAM) and write overhead compared to full indexes. Sparse indexes only include documents containing the indexed field. Text indexes support string search with language stemming and stop-word filtering across one or more fields."
  },
  {
    "id": "mongo-med-8",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "TTL Indexes",
    "question": "How does a TTL (Time-To-Live) Index work in MongoDB, and what background process handles document deletion?",
    "keyConcepts": [
      "expireAfterSeconds option",
      "ISODate field requirement",
      "Background thread 60-second cycle",
      "Session / Cache eviction"
    ],
    "commonWeakSpots": [
      "Attempting to use a TTL index on a numeric or string timestamp instead of a BSON Date object."
    ],
    "strongIndicators": [
      "Specifies the indexed field MUST contain a BSON Date.",
      "Mentions the background TTL thread runs every 60 seconds, meaning deletion is not millisecond-exact."
    ],
    "hint": "How do you automatically expire and delete user OTP codes or sessions after 15 minutes in MongoDB?",
    "sampleGoodAnswer": "A TTL index automatically removes documents after a set duration. It requires a single-field index on a BSON Date field: db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 900 }). A background thread in mongod runs once every 60 seconds to scan the TTL index and delete expired documents. The timestamp must be a native Date object (not integer or string), and deletion is not millisecond-exact due to the 60-second polling interval."
  },
  {
    "id": "mongo-med-9",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Mongoose Population vs $lookup",
    "question": "Compare Mongoose .populate() with the Aggregation Pipeline’s $lookup stage. How do they work under the hood and what are their performance characteristics?",
    "keyConcepts": [
      "Mongoose multi-query population",
      "$lookup database-side left outer join",
      "N+1 query problem",
      "Pipeline optimization"
    ],
    "commonWeakSpots": [
      "Thinking Mongoose .populate() performs an internal database join in a single query."
    ],
    "strongIndicators": [
      "Clarifies Mongoose .populate() issues an extra separate query behind the scenes to fetch referenced documents in the client application.",
      "Highlights $lookup executes a native database join within the database engine."
    ],
    "hint": "Does User.find().populate(\"posts\") perform a join inside the database engine or execute multiple queries?",
    "sampleGoodAnswer": "Mongoose .populate() does NOT perform a join inside the database engine. Instead, Mongoose executes the initial query, extracts all referenced ObjectIds, and runs a second query (e.g. Post.find({ _id: { $in: ids } })) in application code, stitching the results in memory. In contrast, Aggregation $lookup performs a native left outer join directly within the database engine in a single pipeline execution, which is significantly faster and allows sorting/filtering on joined fields."
  },
  {
    "id": "mongo-med-10",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Storage Engine & WiredTiger",
    "question": "Describe the WiredTiger storage engine. How does it handle document-level concurrency and checkpointing?",
    "keyConcepts": [
      "WiredTiger engine",
      "Document-level locking",
      "WiredTiger cache (50% RAM - 1GB)",
      "Compression (Snappy / zlib)",
      "Checkpoints and journaling"
    ],
    "commonWeakSpots": [
      "Believing MongoDB still uses the ancient MMAPv1 database-level or collection-level locking."
    ],
    "strongIndicators": [
      "Explains WiredTiger uses optimistic concurrency control with document-level locking.",
      "Mentions default Snappy compression and checkpoints written to disk every 60 seconds."
    ],
    "hint": "What concurrency mechanism allows concurrent writes to the same collection in modern MongoDB?",
    "sampleGoodAnswer": "WiredTiger is MongoDB’s default storage engine. It provides: 1) Document-level concurrency using optimistic concurrency control: concurrent writes to different documents within the same collection proceed without blocking; 2) Data compression: uses Snappy (default) or zlib, reducing disk storage by ~60-70%; 3) Memory management: allocates ~50% of available RAM minus 1GB for the WiredTiger cache; 4) Checkpointing: flushes consistent snapshots to disk every 60 seconds or 2GB of data."
  },
  {
    "id": "mongo-med-11",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Change Streams",
    "question": "What are MongoDB Change Streams, and how do they enable real-time event-driven architectures?",
    "keyConcepts": [
      "Change Streams API",
      "Oplog listening",
      "Resume token (_id)",
      "Real-time WebSocket notifications"
    ],
    "commonWeakSpots": [
      "Attempting to use Change Streams on a standalone MongoDB instance without a replica set."
    ],
    "strongIndicators": [
      "Explains Change Streams tap into the replica set oplog to emit real-time insert/update/delete events.",
      "Highlights the resume token which enables zero-loss reconnection after network drops."
    ],
    "hint": "How can an Express server receive instant notifications whenever a new order is inserted into MongoDB?",
    "sampleGoodAnswer": "Change Streams allow applications to subscribe to real-time data changes on a collection, database, or deployment without polling. They leverage the replica set oplog: const changeStream = Order.watch(); changeStream.on(\"change\", (event) => io.emit(\"newOrder\", event.fullDocument));. If the application disconnects, it uses a Resume Token (_id on the change event) to resume listening exactly where it left off, ensuring zero lost events."
  },
  {
    "id": "mongo-med-12",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Handling Array Fields",
    "question": "How do the positional operator ($), all-positional ($[]), and arrayFilters ($[<identifier>]) work in MongoDB array updates?",
    "keyConcepts": [
      "Positional $ (first match)",
      "All positional $[]",
      "Filtered positional arrayFilters",
      "Nested array modification"
    ],
    "commonWeakSpots": [
      "Overwriting entire arrays just to update the status of one item inside an array of 50 elements."
    ],
    "strongIndicators": [
      "Differentiates: $ updates the first matching array element; $[] updates all elements; arrayFilters allows precise conditional updates on matching array subdocuments."
    ],
    "hint": "How do you update the price of only those items in an items array where item.category === \"electronics\"?",
    "sampleGoodAnswer": "1) Positional $ updates the first array element matching the query filter: { \"items.$.price\": 100 }; 2) All-positional $[] updates every element in the array: { \"scores.$[]\": 0 }; 3) Filtered positional arrayFilters updates specific elements meeting criteria: db.orders.updateOne({ _id }, { $set: { \"items.$[elem].price\": 100 } }, { arrayFilters: [{ \"elem.category\": \"electronics\" }] })."
  },
  {
    "id": "mongo-med-13",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Sharding Architecture",
    "question": "What is Sharding in MongoDB, and what are the roles of mongos, Config Servers, and Shard Nodes?",
    "keyConcepts": [
      "Horizontal scaling",
      "mongos query router",
      "Config replica set (metadata)",
      "Shard replica sets (data partitions)",
      "Chunk balancing"
    ],
    "commonWeakSpots": [
      "Confusing replication (high availability) with sharding (horizontal partitioning)."
    ],
    "strongIndicators": [
      "Explains mongos acts as stateless query router.",
      "Config servers store cluster metadata and chunk mappings.",
      "Shard nodes store partitioned data chunks."
    ],
    "hint": "What is the difference between mongod and mongos in a sharded cluster?",
    "sampleGoodAnswer": "Sharding partitions large datasets horizontally across multiple machines. A sharded cluster consists of: 1) Shards: replica sets storing subsets of the data partitioned into chunks; 2) Config Servers: a dedicated replica set storing cluster metadata and routing mappings; 3) mongos: stateless query routers that client applications connect to. mongos inspects the query, consults config servers, routes the query to the specific shard(s), and merges results."
  },
  {
    "id": "mongo-med-14",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Shard Key Selection",
    "question": "How do you choose an effective Shard Key in MongoDB? What are the dangers of Monotonically Increasing Shard Keys?",
    "keyConcepts": [
      "Cardinality and frequency",
      "Monotonically increasing key hotspotting",
      "Jumbo chunks",
      "Hashed shard keys"
    ],
    "commonWeakSpots": [
      "Choosing auto-incrementing timestamps or ObjectId as a range shard key, creating a single write-hotspot on the latest shard."
    ],
    "strongIndicators": [
      "Explains that a monotonically increasing key directs 100% of new writes to the single highest-value shard.",
      "Recommends high cardinality, even distribution, and hashed shard keys for write scaling."
    ],
    "hint": "Why is sharding by createdAt a disaster for write-heavy applications, and how does a Hashed Shard Key resolve it?",
    "sampleGoodAnswer": "A good shard key requires high cardinality (many distinct values), low frequency (even value distribution), and alignment with common query patterns. Choosing a monotonically increasing shard key (like createdAt or ObjectId) routes 100% of write operations to the single shard holding the maximum range, completely negating horizontal write distribution. A Hashed Shard Key (e.g., { _id: \"hashed\" }) computes an MD5 hash of the key, distributing writes uniformly across all shards."
  },
  {
    "id": "mongo-med-15",
    "topic": "MongoDB",
    "difficulty": "Medium",
    "category": "Security & Injection",
    "question": "How do NoSQL Injection attacks occur in MongoDB with Node.js/Express, and how do you prevent them?",
    "keyConcepts": [
      "NoSQL operator injection ({ $gt: \"\" })",
      "Bypassing password authentication",
      "Sanitization with mongo-sanitize",
      "Schema validation"
    ],
    "commonWeakSpots": [
      "Believing NoSQL databases are immune to injection attacks because they do not use SQL."
    ],
    "strongIndicators": [
      "Demonstrates how an attacker passes req.body = { username: \"admin\", password: { $gt: \"\" } } to bypass authentication.",
      "Recommends strict Zod schemas and mongo-sanitize."
    ],
    "hint": "How can an attacker log in as admin without knowing the password if your Express app queries User.findOne({ username, password })?",
    "sampleGoodAnswer": "If an attacker submits JSON payload { \"username\": \"admin\", \"password\": { \"$gt\": \"\" } }, MongoDB executes User.findOne({ username: \"admin\", password: { $gt: \"\" } }). Since all non-empty strings are greater than \"\", the query matches the admin user and bypasses authentication! Mitigation: 1) Validate and type-cast inputs with Zod/Joi to ensure password is a strict string; 2) Use express-mongo-sanitize to strip keys starting with \"$\" or \".\"; 3) Never query passwords directly—use bcrypt.compare."
  }
],
  hard: [
  {
    "id": "mongo-hard-1",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Internal Architecture & WiredTiger Caches",
    "question": "How does WiredTiger manage dirty pages, evictions, and checkpointing under heavy write loads? What causes write stalls?",
    "keyConcepts": [
      "Clean vs Dirty pages",
      "Eviction server threads",
      "Eviction triggers (dirty > 20% or cache > 80%)",
      "Application thread eviction (write stall)"
    ],
    "commonWeakSpots": [
      "Assuming WiredTiger writes directly to disk on every insert.",
      "Not knowing what happens when the dirty cache fills faster than background disk flushing."
    ],
    "strongIndicators": [
      "Explains that when dirty pages exceed thresholds, application worker threads are forced to assist in eviction, resulting in massive API write latency spikes."
    ],
    "hint": "What causes sudden latency spikes from 2ms to 5000ms during sustained write bursts in MongoDB?",
    "sampleGoodAnswer": "WiredTiger keeps modified pages in memory as \"dirty pages\". Background eviction threads monitor cache capacity (default eviction starts when cache is 80% full or dirty pages exceed 20%). If the write rate exceeds disk I/O throughput, dirty pages accumulate. Once dirty pages cross critical thresholds (e.g., >20%), WiredTiger forces client application threads to perform disk evictions before completing their write. This causes catastrophic write stalls where latency jumps from 2ms to several seconds."
  },
  {
    "id": "mongo-hard-2",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Distributed Consensus & Jepsen Testing",
    "question": "How does MongoDB’s implementation of Raft (Replica Set Protocol Version 1) handle split-brain and network partitions?",
    "keyConcepts": [
      "pv1 consensus protocol",
      "Strict majority quorum (N/2 + 1)",
      "Term numbers and heartbeats",
      "Rollback directories on re-connection"
    ],
    "commonWeakSpots": [
      "Thinking a minority partition can elect a Primary.",
      "Not understanding what happens to un-replicated writes when a severed Primary rejoins."
    ],
    "strongIndicators": [
      "Explains a partition with fewer than majority nodes immediately steps down its Primary.",
      "Explains uncommitted writes on the partitioned Primary are written to rollback files when it rejoins as Secondary."
    ],
    "hint": "In a 5-node replica set partitioned into 3 nodes and 2 nodes, what happens to writes on each side?",
    "sampleGoodAnswer": "In a 5-node replica set partitioned into 3 nodes (majority) and 2 nodes (minority): the minority partition cannot achieve quorum (needs 3 votes) and its Primary automatically steps down to Secondary within 10 seconds, rejecting all further writes. The 3-node partition maintains quorum and elects a new Primary. Any uncommitted writes that were accepted by the old Primary before it stepped down are rolled back when it reconnects and written to .bson rollback files for manual recovery."
  },
  {
    "id": "mongo-hard-3",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Atlas Vector Search & HNSW",
    "question": "How does MongoDB Atlas Vector Search integrate with LLM embeddings, and how does the HNSW index work inside MongoDB?",
    "keyConcepts": [
      "Hierarchical Navigable Small World (HNSW)",
      "Cosine similarity vs Euclidean vs Dot product",
      "$vectorSearch aggregation stage",
      "RAG integration"
    ],
    "commonWeakSpots": [
      "Running standard regex or text search on 1536-dimensional float arrays.",
      "Not knowing $vectorSearch must be the first stage in the pipeline."
    ],
    "strongIndicators": [
      "Explains HNSW constructs multi-layered graphs for sub-millisecond approximate nearest neighbor (ANN) search.",
      "Demonstrates the $vectorSearch aggregation operator."
    ],
    "hint": "How does MongoDB search 1,000,000 embedding vectors in milliseconds to power Generative AI retrieval?",
    "sampleGoodAnswer": "MongoDB Atlas Vector Search integrates vector search natively using the HNSW (Hierarchical Navigable Small World) algorithm. Documents store embeddings as arrays of floats (e.g., 1536 dims from text-embedding-3). The HNSW index organizes vectors into hierarchical proximity graphs, enabling logarithmic-time Approximate Nearest Neighbor (ANN) search using cosine, dot product, or euclidean distance via the $vectorSearch aggregation stage, which must execute as the first pipeline step."
  },
  {
    "id": "mongo-hard-4",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Large-Scale Data Archival & Time Series",
    "question": "How does MongoDB optimize Time Series Collections under the hood? What are bucket documents and columnar compression?",
    "keyConcepts": [
      "Time Series collections",
      "Bucket pattern internal storage",
      "Columnar compression",
      "Granularity tuning (seconds, minutes, hours)"
    ],
    "commonWeakSpots": [
      "Creating standard collections for IoT/metric streams with 1 document per data point, bloating index and storage by 10x."
    ],
    "strongIndicators": [
      "Explains MongoDB automatically groups time-series data points into internal bucket documents by time range and metadata.",
      "Highlights columnar compression achieving 90% disk savings."
    ],
    "hint": "How does a Time Series collection in MongoDB store 1,000,000 sensor readings differently from a regular collection?",
    "sampleGoodAnswer": "In standard collections, 1,000,000 sensor readings create 1,000,000 separate BSON documents with repetitive metadata and index entries. In Time Series collections (created with timeField and metaField), MongoDB automatically groups related measurements into internal \"bucket\" documents. Inside each bucket, values are stored in contiguous columnar format and compressed using delta-of-delta and run-length encoding, reducing disk footprint by up to 90% and speeding queries by orders of magnitude."
  },
  {
    "id": "mongo-hard-5",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Query Engine & Slot-Based Execution (SBE)",
    "question": "What is MongoDB’s Slot-Based Execution (SBE) engine introduced in MongoDB 5.0+, and how does it compare to the classic query engine?",
    "keyConcepts": [
      "Slot-Based Execution engine",
      "Tuple-at-a-time vs vectorized processing",
      "Compiled query plan bytecode",
      "CPU cache locality"
    ],
    "commonWeakSpots": [
      "Thinking MongoDB executes queries by interpreting BSON documents row by row in all cases."
    ],
    "strongIndicators": [
      "Explains SBE compiles aggregation and query stages into efficient bytecode executed in pre-allocated slots, minimizing function call overhead and maximizing CPU L1/L2 cache locality."
    ],
    "hint": "How does MongoDB 5.0+ achieve a 2x-4x speedup on complex aggregation pipelines without changing indexes?",
    "sampleGoodAnswer": "Slot-Based Execution (SBE) is a redesigned query engine in MongoDB 5.0+. The classic engine processed documents interpretively one at a time via virtual method calls. SBE compiles query plans into specialized bytecode executed against a fixed array of slots (variables in CPU registers/cache). By operating on batches of values and avoiding object allocations per document, SBE dramatically improves CPU instruction and data cache locality, delivering 2x-4x throughput improvements."
  },
  {
    "id": "mongo-hard-6",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Zero-Downtime Data Migrations",
    "question": "How do you execute a zero-downtime schema and data migration across 100,000,000 MongoDB documents in a live 24/7 production system?",
    "keyConcepts": [
      "Dual-writing / Lazy migration",
      "Batched background cursors",
      "BulkWrite with ordered: false",
      "Feature flags and gradual cutover"
    ],
    "commonWeakSpots": [
      "Running db.collection.updateMany({}, ...) on 100M documents on a live cluster, locking WiredTiger cache and taking down production."
    ],
    "strongIndicators": [
      "Proposes Expand/Contract pattern: 1) App supports both old and new schema; 2) Writes dual-write or write new schema; 3) Background batched workers migrate historical data in chunks of 1000 with sleeps; 4) Deprecate old schema."
    ],
    "hint": "Why will running db.users.updateMany({}, { $set: { newField: true } }) crash your production cluster, and how should you do it?",
    "sampleGoodAnswer": "Running an un-batched updateMany on 100M documents overwhelms the WiredTiger cache, fills the replica set oplog (causing replication lag and secondary stalls), and spikes disk I/O. Safe zero-downtime pattern: 1) Deploy application code that reads both formats and writes the new format; 2) Run a throttled background worker that iterates through documents in batches (e.g., 500 at a time using range queries on _id), executing bulkWrite(..., { ordered: false }) with small sleep intervals between batches; 3) Monitor replication lag and cache dirty percentage throughout."
  },
  {
    "id": "mongo-hard-7",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Collation & Internationalization",
    "question": "How does Collation work in MongoDB, and what catastrophic performance issue occurs when query collation does not match index collation?",
    "keyConcepts": [
      "Collation locale and strength",
      "Case-insensitive indexing",
      "Collation mismatch causing COLLSCAN",
      "Index collation inheritance"
    ],
    "commonWeakSpots": [
      "Creating an index with default binary collation, then querying with { collation: { locale: \"en\", strength: 2 } } and wondering why the index is ignored."
    ],
    "strongIndicators": [
      "Explains that if a query specifies a collation, MongoDB will ONLY use an index that was created with the EXACT same collation; otherwise it falls back to a full collection scan."
    ],
    "hint": "Why would MongoDB completely ignore your index on username when performing a case-insensitive search?",
    "sampleGoodAnswer": "Collation provides language-specific rules for string comparison and sorting (e.g. case-insensitivity with strength: 2). Crucially: MongoDB will ONLY use an index if the query’s collation matches the index’s collation character-for-character. If you create an index with default binary collation and run db.users.find({ username: \"alex\" }).collation({ locale: \"en\", strength: 2 }), MongoDB cannot use the index and executes a full collection scan. You must create the index with the exact matching collation."
  },
  {
    "id": "mongo-hard-8",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Oplog Sizing & Replication Headroom",
    "question": "How do you size and tune the MongoDB Replica Set Oplog? What happens when a Secondary node falls off the Oplog window?",
    "keyConcepts": [
      "Oplog size (local.oplog.rs)",
      "Oplog window duration",
      "Replication lag and OOM",
      "Resync via Initial Sync"
    ],
    "commonWeakSpots": [
      "Leaving oplog size at default during high-throughput bulk imports, causing secondaries to fall off and require full initial sync."
    ],
    "strongIndicators": [
      "Explains oplog window must be large enough to cover expected secondary maintenance or network downtime (e.g. 24-48 hours).",
      "Describes replSetResizeOplog."
    ],
    "hint": "What does it mean when a secondary node logs \"error: replication head too far behind oplog\" and what is the recovery process?",
    "sampleGoodAnswer": "The oplog is a fixed-size capped collection on the Primary. The \"oplog window\" is the elapsed time between the oldest and newest entries in the oplog. If a Secondary is offline longer than the oplog window (e.g., due to maintenance or massive bulk writes), it falls off the oplog—it cannot catch up incrementally because missing entries were overwritten. The Secondary enters RECOVERING error state and must undergo an expensive Initial Sync (full database copy) to rejoin."
  },
  {
    "id": "mongo-hard-9",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "WiredTiger Data Corruption Recovery",
    "question": "How do you recover data when a MongoDB WiredTiger database encounters unrepairable corruption (e.g. fatal assertion WT_CORRUPT)?",
    "keyConcepts": [
      "wt command line utility",
      "WiredTiger recovery mode",
      "mongod --repair limitations",
      "Salvage operations & BSON dump"
    ],
    "commonWeakSpots": [
      "Overwriting corrupted files with random scripts or assuming mongod --repair always succeeds without data loss."
    ],
    "strongIndicators": [
      "Details taking cold disk image first, running mongod --repair, and using standalone wt salvage on the corrupted collection uri table if repair fails."
    ],
    "hint": "What steps do you take when mongod crashes on startup with a WiredTiger checksum error?",
    "sampleGoodAnswer": "1) Immediately stop the service and make a bit-level cold disk image snapshot of the dbpath; 2) Check if another replica set member has uncorrupted data (safest recovery is resyncing from a healthy node); 3) If standalone: run mongod --repair --dbpath /data/db; 4) If repair fails on a corrupted table: use the standalone WiredTiger command-line utility (wt salvage -v -f <file.wt>) to recover salvageable BSON records, extract documents with bsondump, and re-import into a clean instance."
  },
  {
    "id": "mongo-hard-10",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Client-Side Field Level Encryption (CSFLE)",
    "question": "How does Client-Side Field Level Encryption (CSFLE) and Queryable Encryption work in MongoDB? What is the cryptographic flow?",
    "keyConcepts": [
      "CSFLE vs Queryable Encryption",
      "KMS integration (AWS KMS, Azure Key Vault, GCP KMS)",
      "DEK (Data Encryption Key) & CMK (Customer Master Key)",
      "Deterministic vs Random encryption"
    ],
    "commonWeakSpots": [
      "Thinking encryption at rest protects against an attacker with root access to the database memory while running."
    ],
    "strongIndicators": [
      "Explains that with CSFLE, data is encrypted/decrypted entirely inside the Node.js driver before leaving client RAM; the MongoDB server only ever sees encrypted ciphertext."
    ],
    "hint": "How can you guarantee that a database administrator (DBA) or cloud provider can NEVER view social security numbers or credit cards in MongoDB?",
    "sampleGoodAnswer": "With Client-Side Field Level Encryption (CSFLE), fields are encrypted inside the application driver using libmongocrypt before being sent over the wire to MongoDB. The driver retrieves Data Encryption Keys (DEKs) wrapped by a Customer Master Key (CMK) in AWS/GCP KMS. The MongoDB database server receives, stores, and indexes only opaque ciphertext—even DBAs with root access cannot view plain text. Queryable Encryption uses advanced homomorphic/zero-knowledge cryptographic schemes to allow equality and range queries on encrypted ciphertext."
  },
  {
    "id": "mongo-hard-11",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Memory Management & Kernel Swappiness",
    "question": "Why is Linux kernel swappiness configuration (vm.swappiness=1) and Transparent Huge Pages (THP) deactivation mandatory for MongoDB production hosts?",
    "keyConcepts": [
      "vm.swappiness tuning",
      "Transparent Huge Pages (THP) latency spikes",
      "NUMA interleaving (numactl)",
      "Kernel memory fragmentation"
    ],
    "commonWeakSpots": [
      "Leaving Linux default vm.swappiness=60 and THP enabled on production database instances."
    ],
    "strongIndicators": [
      "Explains THP creates 2MB memory allocations that cause aggressive compaction stalls during WiredTiger page allocation.",
      "Explains vm.swappiness=1 ensures RAM is aggressively kept for DB cache rather than swapped to disk."
    ],
    "hint": "Why does MongoDB Atlas and Enterprise documentation insist on disabling Transparent Huge Pages (THP) on Linux servers?",
    "sampleGoodAnswer": "1) Transparent Huge Pages (THP): Linux attempts to group memory into 2MB huge pages. Because WiredTiger allocates memory in fine-grained 4KB chunks, THP triggers memory compaction, locking the CPU and causing severe multi-second database latency spikes. Disabling THP is mandatory. 2) vm.swappiness: Default 60 causes Linux to aggressively swap memory to disk even when free RAM exists; setting vm.swappiness=1 forces the kernel to prioritize keeping WiredTiger cache in RAM, only swapping under extreme pressure."
  },
  {
    "id": "mongo-hard-12",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Distributed Lock Implementation",
    "question": "How do you build a fault-tolerant, high-concurrency Distributed Lock in MongoDB without race conditions?",
    "keyConcepts": [
      "Atomic findOneAndUpdate",
      "TTL index lease expiration",
      "Fencing tokens",
      "Redlock comparison"
    ],
    "commonWeakSpots": [
      "Using simple findOne then update which fails under concurrent race conditions.",
      "Failing to include a lease expiration TTL, causing deadlocks if the lock-holding process dies."
    ],
    "strongIndicators": [
      "Uses atomic findOneAndUpdate with query: { _id: lockKey, expiresAt: { $lt: now } } and upsert: true.",
      "Includes a monotonic fencing token to prevent split-brain writes."
    ],
    "hint": "How do you implement a distributed lock in MongoDB that automatically releases if the holding worker crashes?",
    "sampleGoodAnswer": "A distributed lock collection uses an atomic findOneAndUpdate operation: db.locks.findOneAndUpdate({ _id: resourceName, $or: [{ locked: false }, { expiresAt: { $lt: new Date() } }] }, { $set: { locked: true, owner: workerId, expiresAt: new Date(Date.now() + 10000), fencingToken: nextToken() } }, { upsert: true, returnDocument: \"after\" }). If the worker crashes, the lease expires via the timestamp comparison (backed by a TTL index cleanup), preventing permanent deadlocks."
  },
  {
    "id": "mongo-hard-13",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Schema Versioning Pattern",
    "question": "How do you implement the Polymorphic Schema Versioning Pattern in MongoDB to handle 10 years of evolving document structures without downtime?",
    "keyConcepts": [
      "schemaVersion field",
      "Application-level polymorphic deserialization",
      "On-the-fly migration",
      "Backwards compatibility"
    ],
    "commonWeakSpots": [
      "Assuming all documents in a collection must share the exact same fields."
    ],
    "strongIndicators": [
      "Includes a schemaVersion: 1, 2, 3 field in every document.",
      "Explains the application reads any version, applies in-memory transformers to current version, and saves back updated version lazily."
    ],
    "hint": "How do companies like eBay or Uber manage millions of MongoDB documents where 20% are version 1, 40% version 2, and 40% version 3?",
    "sampleGoodAnswer": "The Schema Versioning Pattern assigns a schema_version integer field to every document. In the application layer, a factory or migration middleware inspects schema_version upon read: if an older version is read (v1), it applies a chain of pure transformation functions (v1 -> v2 -> v3) in memory before passing it to business logic. When the document is subsequently updated and saved, it writes back as v3. This avoids massive risky batch updates and guarantees zero downtime."
  },
  {
    "id": "mongo-hard-14",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Compound Index Collation & Sort Key Optimization",
    "question": "What causes the error \"Executor error during find command :: caused by :: Sort exceeded memory limit of 33554432 bytes\"? How is it diagnosed and permanently resolved?",
    "keyConcepts": [
      "32MB in-memory sort limit",
      "Index-backed sorting",
      "allowDiskUse: true temporary fix",
      "ESR index alignment"
    ],
    "commonWeakSpots": [
      "Blindly enabling allowDiskUse: true everywhere instead of creating the proper index.",
      "Not understanding why MongoDB ran out of sort memory."
    ],
    "strongIndicators": [
      "Identifies that MongoDB limits in-memory non-indexed sorts to 32MB to prevent OOM crashes.",
      "Explains the permanent fix is creating an index matching the sort key order."
    ],
    "hint": "Why did your aggregation query suddenly crash with a 32MB memory limit error when dataset size grew?",
    "sampleGoodAnswer": "MongoDB limits in-memory sort operations to 32MB (33,554,432 bytes) to protect the server from memory exhaustion. If a query requests a sort that is not satisfied by traversing an index in order, MongoDB must buffer all candidate documents in RAM to sort them. Once the dataset exceeds 32MB, the query crashes. Temporary workaround: set { allowDiskUse: true }. Permanent production fix: create an index whose keys match the query and sort criteria according to the ESR rule."
  },
  {
    "id": "mongo-hard-15",
    "topic": "MongoDB",
    "difficulty": "Hard",
    "category": "Multi-Region & Global Clusters",
    "question": "How do you design a Globally Distributed MongoDB Cluster with Zone Sharding for GDPR data sovereignty compliance?",
    "keyConcepts": [
      "Zone Sharding / Tag-aware sharding",
      "Data sovereignty & regional pin",
      "Local reads with nearest read preference",
      "Cross-region replication latency"
    ],
    "commonWeakSpots": [
      "Assuming standard sharding automatically respects geographical borders."
    ],
    "strongIndicators": [
      "Explains associating shards with geographic zones (e.g., EU_Zone, US_Zone) using shard tags.",
      "Configures shard key ranges pinned to zones so EU user data never leaves EU physical servers."
    ],
    "hint": "How do you ensure EU citizen data is stored strictly on European servers while US citizen data is stored in the US in a single MongoDB cluster?",
    "sampleGoodAnswer": "MongoDB Zone Sharding guarantees data sovereignty: 1) Shard replica sets are deployed in specific physical regions (e.g., AWS Frankfurt for EU, AWS Virginia for US); 2) Shards are tagged with zones: sh.addShardTag(\"shard-eu-1\", \"EU_ZONE\"); 3) Range tags are defined on the shard key (e.g. { country: \"DE\" } to { country: \"FR\" } mapped to EU_ZONE); 4) The balancer moves and ensures chunks strictly reside on their designated regional hardware, ensuring full GDPR compliance within a unified database cluster."
  }
]
};

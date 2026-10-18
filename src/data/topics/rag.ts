import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const ragQuestions: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: [
  {
    "id": "rag-beg-1",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Chunking",
    "question": "What is Retrieval-Augmented Generation (RAG) and why is it preferred over fine-tuning for dynamic corporate knowledge?",
    "keyConcepts": [
      "Chunking",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Chunking matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "RAG fetches relevant real-time or private documents from external knowledge stores and passes them to the LLM context prompt. It is preferred over fine-tuning because knowledge can be updated or deleted in milliseconds without expensive retraining, supports access control permissions, and guarantees zero hallucination through direct document citations."
  },
  {
    "id": "rag-beg-2",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Embeddings",
    "question": "What is document Chunking, and why is chunk size (e.g. 256 vs 1024 tokens) and overlap critical?",
    "keyConcepts": [
      "Embeddings",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Embeddings matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Chunking divides long documents into smaller semantic units. If chunks are too small, context is fragmented and key information is lost; if too large, vector representations become diffuse and irrelevant text consumes the context window. An overlap (e.g., 10-20% tokens) preserves semantic continuity across chunk boundaries."
  },
  {
    "id": "rag-beg-3",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Vector DBs",
    "question": "What is the difference between Dense Vector Embeddings and Sparse Keyword Search (BM25)?",
    "keyConcepts": [
      "Vector DBs",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Vector DBs matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Sparse search (BM25/TF-IDF) matches exact keyword frequencies, essential for exact part numbers, acronyms, and names. Dense embeddings (BERT/Ada/text-embedding-3) project text into high-dimensional latent space capturing semantic synonyms and conceptual intent. Combining both yields superior recall."
  },
  {
    "id": "rag-beg-4",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Retrieval",
    "question": "What is a Vector Database (Pinecone, Weaviate, Qdrant, Chroma) and how does it store embeddings?",
    "keyConcepts": [
      "Retrieval",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Retrieval matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "A vector database specializes in storing high-dimensional vectors with associated metadata. Instead of slow exact scans, it builds approximate nearest neighbor (ANN) indexes (such as HNSW or IVF) allowing sub-10ms similarity search across millions of documents."
  },
  {
    "id": "rag-beg-5",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Re-ranking",
    "question": "What is Cosine Similarity vs Dot Product vs Euclidean Distance for comparing text embeddings?",
    "keyConcepts": [
      "Re-ranking",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Re-ranking matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Cosine similarity measures the angle between vectors (normalized dot product, range -1 to 1), invariant to vector magnitude. Dot Product considers both angle and magnitude (faster if vectors are pre-normalized). Euclidean distance measures physical distance in vector space (smaller = closer)."
  },
  {
    "id": "rag-beg-6",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Evaluation",
    "question": "What is Metadata Filtering in vector search, and why should filters be applied during retrieval?",
    "keyConcepts": [
      "Evaluation",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Evaluation matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Metadata filtering restricts the search space using structured attributes (e.g., department: 'finance', year: 2024, user_role: 'admin') before or during vector search. This guarantees compliance, role-based access control (RBAC), and eliminates noise from unrelated categories."
  },
  {
    "id": "rag-beg-7",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Hybrid Search",
    "question": "What is the 'Lost in the Middle' problem in LLM context windows when passing retrieved chunks?",
    "keyConcepts": [
      "Hybrid Search",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Hybrid Search matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Research demonstrates LLMs attend strongly to tokens at the very beginning and very end of their prompt, while information in the middle suffers from severe retrieval decay. Re-ordering retrieved chunks to place the most critical evidence at the top and bottom mitigates this effect."
  },
  {
    "id": "rag-beg-8",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Metadata Filtering",
    "question": "How does a Cross-Encoder Re-ranker (e.g. Cohere Rerank, BGE-Reranker) improve retrieval quality?",
    "keyConcepts": [
      "Metadata Filtering",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Metadata Filtering matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Vector search uses bi-encoders (encoding query and documents separately for speed), which misses deep cross-attention interactions. A Cross-Encoder Re-ranker feeds the query and candidate chunk together into all attention layers, computing deep semantic relevance scores to elevate the best chunk to position 1."
  },
  {
    "id": "rag-beg-9",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Context Stuffing",
    "question": "What is Multi-Query Retrieval and how does generating query variations improve recall?",
    "keyConcepts": [
      "Context Stuffing",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Context Stuffing matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Users often write vague or incomplete queries. Multi-Query Retrieval prompts an LLM to generate 3-5 alternative phrasings and perspectives of the user query, executes vector search for each in parallel, and merges unique results, dramatically improving search recall."
  },
  {
    "id": "rag-beg-10",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Multi-Query",
    "question": "What is HyDE (Hypothetical Document Embeddings) and how does it bridge the vocabulary gap?",
    "keyConcepts": [
      "Multi-Query",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Multi-Query matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "HyDE (Hypothetical Document Embeddings) asks an LLM to generate a hypothetical answer to the user question first. It then embeds this hypothetical answer (which naturally contains the target vocabulary and technical prose) to search the vector database, bridging the conceptual gap between short queries and detailed documents."
  },
  {
    "id": "rag-beg-11",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "HyDE",
    "question": "What is Hybrid Search (combining BM25 keyword search with Dense vector embeddings via RRF)?",
    "keyConcepts": [
      "HyDE",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why HyDE matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Hybrid Search combines dense semantic vector search with sparse keyword search (BM25). The results are fused using Reciprocal Rank Fusion (RRF: score = 1 / (60 + rank)), giving you the semantic generalization of embeddings with the exact-match precision of keyword search."
  },
  {
    "id": "rag-beg-12",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Rerankers",
    "question": "What is Context Precision vs Context Recall in RAG evaluation?",
    "keyConcepts": [
      "Rerankers",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Rerankers matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Context Precision measures whether the truly relevant chunks were placed at the very top of the retrieved list rather than buried at the bottom. Context Recall measures whether all the necessary facts required to answer the question were successfully retrieved from the knowledge base."
  },
  {
    "id": "rag-beg-13",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "GraphRAG",
    "question": "What is Parent Document / Small-to-Big Retrieval, and why retrieve small chunks for search but feed parent context to LLM?",
    "keyConcepts": [
      "GraphRAG",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why GraphRAG matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Small chunks (100-200 tokens) produce sharp, highly specific vector embeddings that match user queries accurately, but lack surrounding narrative context. The Parent Document pattern indexes small child chunks for vector search, but when a match occurs, retrieves and passes the larger parent document (1,000 tokens) to the LLM."
  },
  {
    "id": "rag-beg-14",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Agentic RAG",
    "question": "What are Sentence Window Retrieval and Hierarchical Node Parsers in modern RAG frameworks (LlamaIndex)?",
    "keyConcepts": [
      "Agentic RAG",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Agentic RAG matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Sentence Window Retrieval embeds individual sentences for pinpoint retrieval accuracy, but replaces the sentence with a surrounding window of N sentences (e.g., 3 before and 3 after) before sending to the LLM, preserving local coherence without vector dilution."
  },
  {
    "id": "rag-beg-15",
    "topic": "RAG & AI Engineering",
    "difficulty": "Beginner",
    "category": "Production Arch",
    "question": "What are the primary cost and latency bottlenecks in a production RAG pipeline?",
    "keyConcepts": [
      "Production Arch",
      "Core Principles",
      "Best Practices",
      "Foundations"
    ],
    "commonWeakSpots": [
      "Vague conceptual explanation",
      "Missing edge cases"
    ],
    "strongIndicators": [
      "Clear definition",
      "Practical engineering perspective",
      "Concise trade-off explanation"
    ],
    "hint": "Focus on the primary definition and why Production Arch matters in RAG & AI Engineering.",
    "sampleGoodAnswer": "Key bottlenecks include: embedding generation latency (50-200ms per query), vector index traversal (10-30ms), cross-encoder re-ranking (100-300ms), and LLM generation TTFB. Caching frequent embeddings and queries in Redis slashes costs and latency by 70%."
  }
],
  medium: [
  {
    "id": "rag-med-1",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Chunking",
    "question": "Explain the HNSW (Hierarchical Navigable Small World) algorithm. How do skip-list layers enable logarithmic search in vector DBs?",
    "keyConcepts": [
      "Chunking",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Chunking.",
    "sampleGoodAnswer": "HNSW constructs a multi-layered proximity graph inspired by skip-lists: top layers have long-range sparse connections for fast coarse routing, while bottom layers contain dense local connections for fine-grained nearest neighbor discovery. Search navigates greedily down through layers in O(log N) time."
  },
  {
    "id": "rag-med-2",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Embeddings",
    "question": "How does Reciprocal Rank Fusion (RRF) mathematically combine sparse BM25 ranks with dense vector scores?",
    "keyConcepts": [
      "Embeddings",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Embeddings.",
    "sampleGoodAnswer": "RRF calculates a unified score: RRF_score(d) = sum(1 / (k + rank_i(d))) where k is a smoothing constant (typically 60) and rank_i is the item's rank in list i (BM25 or Dense). RRF normalizes across completely different scoring scales (BM25 unbounded vs cosine -1 to 1) without fragile manual weight tuning."
  },
  {
    "id": "rag-med-3",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Vector DBs",
    "question": "What is Late Interaction (ColBERT / ColPali) and how does token-level MaxSim compare to standard single-vector bi-encoders?",
    "keyConcepts": [
      "Vector DBs",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Vector DBs.",
    "sampleGoodAnswer": "ColBERT computes token-level vector embeddings for every token in both query and document. During retrieval, it computes MaxSim: for each query token, it finds the maximum dot product across all document tokens, and sums these maximums. This captures fine-grained multi-vector interactions at 100x the speed of cross-encoders."
  },
  {
    "id": "rag-med-4",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Retrieval",
    "question": "How do you design a high-throughput enterprise document ingestion pipeline (OCR, chunking, deduplication, vectorization) handling 1M PDFs?",
    "keyConcepts": [
      "Retrieval",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Retrieval.",
    "sampleGoodAnswer": "A scalable ingestion pipeline uses an asynchronous message queue (Kafka/Celery) with decoupled worker pools: 1) Document extraction (Docling/PDFminer) with vision OCR; 2) Text normalization and MinHash deduplication; 3) Semantic chunking; 4) Batched asynchronous vectorization using local GPU inference; 5) Bulk upserts to vector DB with exponential backoff."
  },
  {
    "id": "rag-med-5",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Re-ranking",
    "question": "Explain Context Enrichment with Knowledge Graphs (GraphRAG) and when it outperforms standard vector RAG.",
    "keyConcepts": [
      "Re-ranking",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Re-ranking.",
    "sampleGoodAnswer": "Vector RAG fails on global summarization questions ('What are the major themes across all 5,000 interviews?') because it only retrieves isolated top-K chunks. GraphRAG extracts entities, relationships, and claims using an LLM, clusters them into communities, and generates hierarchical community summaries, answering global synthesis queries comprehensively."
  },
  {
    "id": "rag-med-6",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Evaluation",
    "question": "How do you implement Dynamic Chunking using semantic boundary detection (e.g. cosine distance between adjacent sentence embeddings)?",
    "keyConcepts": [
      "Evaluation",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Evaluation.",
    "sampleGoodAnswer": "Semantic Chunking calculates vector embeddings for each consecutive sentence, computes the cosine similarity between adjacent sentence vectors, and identifies drops below a moving threshold (or percentile drops). These inflection points represent true semantic topic shifts, creating natural boundaries rather than arbitrary character splits."
  },
  {
    "id": "rag-med-7",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Hybrid Search",
    "question": "How does Cohere Rerank or BGE-Reranker-large operate under the hood, and what are its latency trade-offs?",
    "keyConcepts": [
      "Hybrid Search",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Hybrid Search.",
    "sampleGoodAnswer": "Cross-encoders concatenate query and document into a single sequence (Query [SEP] Document) and feed them through all transformer cross-attention layers. Every query token attends to every document token directly. It produces state-of-the-art ranking accuracy but incurs high latency (~200ms for 50 chunks), requiring a two-stage retrieve-then-rerank architecture."
  },
  {
    "id": "rag-med-8",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Metadata Filtering",
    "question": "What is Self-RAG (Asai et al.) and how do reflection tokens (Retrieve, IsRel, IsSup, IsUse) guide adaptive retrieval?",
    "keyConcepts": [
      "Metadata Filtering",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Metadata Filtering.",
    "sampleGoodAnswer": "Self-RAG trains an LLM to output special reflection tokens: [Retrieve] indicates whether retrieval is necessary; [IsRel] evaluates if retrieved text is relevant; [IsSup] grades whether generated text is supported by evidence; [IsUse] scores response quality. This allows the model to dynamically decide when to retrieve and when to rely on parametric knowledge."
  },
  {
    "id": "rag-med-9",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Context Stuffing",
    "question": "How do you prevent context poisoning and prompt injection when ingesting third-party uploaded customer documents in RAG?",
    "keyConcepts": [
      "Context Stuffing",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Context Stuffing.",
    "sampleGoodAnswer": "Mitigation against context poisoning: 1) Separate control plane from data plane using explicit delimiters (XML tags like <context>...</context>); 2) System prompt instructions enforcing that context must be treated strictly as untrusted factual reference; 3) Pre-ingestion regex and classifier filters screening for adversarial injection strings."
  },
  {
    "id": "rag-med-10",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Multi-Query",
    "question": "How do you benchmark and tune chunk size and overlap for a domain-specific dataset using synthetic QA pairs?",
    "keyConcepts": [
      "Multi-Query",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Multi-Query.",
    "sampleGoodAnswer": "Use synthetic QA generation (e.g. Ragas Testset Generator): prompt an LLM to generate 200 realistic questions, ground-truth answers, and citations from your documents. Run automated retrieval experiments sweeping chunk sizes (256, 512, 1024) and overlaps (0%, 10%, 20%), plotting Context Recall vs latency to identify the Pareto-optimal configuration."
  },
  {
    "id": "rag-med-11",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "HyDE",
    "question": "Explain how Embedding Inversion Attacks can reconstruct original text from dense vectors, and how to defend against them.",
    "keyConcepts": [
      "HyDE",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of HyDE.",
    "sampleGoodAnswer": "Embedding inversion uses decoder models trained to reconstruct plain text from dense vectors, recovering up to 70% of sensitive words. Defenses include: differential privacy noise injection, multi-vector token aggregation, and strict database access controls and encryption at rest."
  },
  {
    "id": "rag-med-12",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Rerankers",
    "question": "How does Contextual Retrieval (Anthropic 2024) prepend document-level context to each chunk before embedding, and why does it slash retrieval failures?",
    "keyConcepts": [
      "Rerankers",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Rerankers.",
    "sampleGoodAnswer": "Anthropic's Contextual Retrieval prepends an LLM-generated 50-100 token situational context to every chunk prior to embedding and indexing (e.g. 'This chunk is from SEC 10-K report for Apple Inc. in Q3 2024 discussing iPhone revenue:'). This contextual grounding reduces retrieval failure rate by 49% and by 67% when combined with reranking."
  },
  {
    "id": "rag-med-13",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "GraphRAG",
    "question": "How do you implement Cross-Lingual RAG where user queries in Japanese retrieve English technical documentation accurately?",
    "keyConcepts": [
      "GraphRAG",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of GraphRAG.",
    "sampleGoodAnswer": "Cross-lingual RAG leverages multilingual embedding models (e.g. text-embedding-3 or Cohere multilingual) trained on parallel translation corpora where identical concepts in Japanese and English map to adjacent vector coordinates, or uses an initial LLM query translation stage before hybrid search."
  },
  {
    "id": "rag-med-14",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Agentic RAG",
    "question": "What is Corrective RAG (CRAG) and how does it dynamically evaluate retrieval quality and trigger fallback web search?",
    "keyConcepts": [
      "Agentic RAG",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Agentic RAG.",
    "sampleGoodAnswer": "CRAG uses an evaluator model to score retrieved document confidence: 1) Correct: if confidence is high, proceeds to generation; 2) Incorrect: if confidence is low, discards retrieved chunks and triggers an external Google/Tavily web search tool; 3) Ambiguous: combines vector chunks with web search results, ensuring reliable grounding even with stale internal documents."
  },
  {
    "id": "rag-med-15",
    "topic": "RAG & AI Engineering",
    "difficulty": "Medium",
    "category": "Production Arch",
    "question": "How do you manage vector index compaction, zero-downtime re-indexing, and shard re-balancing in Qdrant or Milvus?",
    "keyConcepts": [
      "Production Arch",
      "Architecture",
      "Performance",
      "Optimization"
    ],
    "commonWeakSpots": [
      "Superficial answer",
      "Not addressing real-world scaling or failure modes"
    ],
    "strongIndicators": [
      "In-depth mechanics",
      "Clear trade-off discussion",
      "Production best practices"
    ],
    "hint": "Discuss the internal implementation and performance impact of Production Arch.",
    "sampleGoodAnswer": "Vector database maintenance requires: dynamic segment compaction in background threads, configuring separate query and indexing CPU pools, and using blue-green collection aliases (deploying a new index in parallel and flipping the pointer) to achieve zero-downtime index rebuilds."
  }
],
  hard: [
  {
    "id": "rag-hard-1",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Chunking",
    "question": "How do you design a Multi-Tenant Vector Database architecture with strict Tenant Isolation, encryption per tenant, and sub-millisecond query latency?",
    "keyConcepts": [
      "Chunking",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Chunking.",
    "sampleGoodAnswer": "Multi-tenant vector architecture approaches: 1) Metadata Filtering (Soft Isolation): single collection with tenant_id filter; efficient resource sharing but risk of noisy neighbor and data leakage if filter omitted; 2) Collection-per-Tenant (Hard Isolation): separate vector index per tenant with dedicated KMS encryption keys; ideal for enterprise compliance. Hybrid: shared cluster with dynamic tenant namespace routing and tenant-specific index segments."
  },
  {
    "id": "rag-hard-2",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Embeddings",
    "question": "Explain Product Quantization (PQ) and Scalar Quantization (SQ) in vector indexing. How do they compress 1536-dim FP32 vectors into 8-bit codes in RAM?",
    "keyConcepts": [
      "Embeddings",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Embeddings.",
    "sampleGoodAnswer": "Scalar Quantization (SQ8) uniformly scales FP32 floats (-1.0 to 1.0) into INT8 integers (0 to 255), reducing RAM by 4x with <1% recall loss. Product Quantization (PQ) divides the 1536-dimensional vector into M sub-vectors (e.g., 64 chunks of 24 dimensions), runs k-means clustering on each subspace to find 256 centroids, and represents each chunk with a single 1-byte centroid index. This compresses a 1536-dim vector from 6,144 bytes to 64 bytes (99% reduction)."
  },
  {
    "id": "rag-hard-3",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Vector DBs",
    "question": "How does GraphRAG hierarchical community detection (Leiden algorithm) summarize millions of documents for global queries?",
    "keyConcepts": [
      "Vector DBs",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Vector DBs.",
    "sampleGoodAnswer": "GraphRAG uses an LLM to extract knowledge tuples (subject, predicate, object) from all documents into a knowledge graph. It runs the Leiden community detection algorithm to partition the graph into hierarchical clusters of related nodes. An LLM generates a comprehensive executive summary for each community at multiple abstraction levels, allowing global thematic queries to synthesize pre-computed community summaries without searching billions of raw chunks."
  },
  {
    "id": "rag-hard-4",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Retrieval",
    "question": "Architect an End-to-End Multimodal RAG system for searching across video frames, diagrams, audio transcripts, and technical schematics using ColPali.",
    "keyConcepts": [
      "Retrieval",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Retrieval.",
    "sampleGoodAnswer": "ColPali replaces text-only OCR pipelines with vision-language models. Each PDF page is converted to an image and passed through PaliGemma, which generates patch-level multi-vector embeddings. Text, tables, charts, and diagrams are indexed directly from visual appearance. User text queries generate token embeddings that match against visual patch embeddings using MaxSim, achieving state-of-the-art document retrieval without OCR errors."
  },
  {
    "id": "rag-hard-5",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Re-ranking",
    "question": "How do you solve the Multi-Hop Reasoning problem in complex financial or legal RAG using iterative Query Decomposition and Tree-of-Thought search?",
    "keyConcepts": [
      "Re-ranking",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Re-ranking.",
    "sampleGoodAnswer": "Multi-hop queries require evidence from multiple disconnected sources. An iterative agent breaks the root question into sub-queries: Sub-query 1 retrieves Fact A; the agent inspects Fact A, formulates Sub-query 2 incorporating Fact A to retrieve Fact B; it continues until all logical dependencies resolve, synthesizing the combined evidence into a rigorous proof chain."
  },
  {
    "id": "rag-hard-6",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Evaluation",
    "question": "How does Raft-based distributed replication work in Milvus / Qdrant clusters, and how does it balance write durability against query QPS?",
    "keyConcepts": [
      "Evaluation",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Evaluation.",
    "sampleGoodAnswer": "Milvus decouples storage and compute using a log-broker architecture (Pulsar/Kafka) with Raft consensus on metadata coordinates. Query nodes pull immutable log segments from shared object storage (S3/MinIO) into local RAM, while write nodes append to the distributed log. This allows query nodes to scale horizontally to millions of QPS without blocking write throughput."
  },
  {
    "id": "rag-hard-7",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Hybrid Search",
    "question": "How do you implement Fine-Grained Role-Based Access Control (RBAC) in vector search at the row, document, and collection level without query performance degradation?",
    "keyConcepts": [
      "Hybrid Search",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Hybrid Search.",
    "sampleGoodAnswer": "Pre-filtering applies security predicates (e.g. allowed_users: [user_id] OR allowed_groups: [group_id]) during index traversal, but can degrade HNSW graph connectivity if too few nodes match. Post-filtering retrieves top-K and discards unauthorized items, but can return empty results if all top-K are unauthorized. Modern solution: HNSW with payload-aware iterative search that expands candidate exploration until K authorized items are found."
  },
  {
    "id": "rag-hard-8",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Metadata Filtering",
    "question": "What are the mathematical limitations of Cosine Similarity in high-dimensional vector spaces (Hubness Problem and Curse of Dimensionality)?",
    "keyConcepts": [
      "Metadata Filtering",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Metadata Filtering.",
    "sampleGoodAnswer": "In high dimensions (>1000 dims), distance concentration causes distances between all points to become nearly uniform. The Hubness Problem emerges: a tiny fraction of vectors ('hubs') appear as nearest neighbors to an unnaturally large percentage of queries. Mitigation includes normalizing embeddings to the unit hypersphere, applying centering transforms, and using Cosine similarity with temperature calibration."
  },
  {
    "id": "rag-hard-9",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Context Stuffing",
    "question": "How do you build a Real-Time Streaming RAG system that ingests Kafka event streams, updates vector embeddings within 100ms, and invalidates stale caches?",
    "keyConcepts": [
      "Context Stuffing",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Context Stuffing.",
    "sampleGoodAnswer": "A streaming RAG architecture uses Kafka for event ingestion, a Flink stream processing pipeline that computes embeddings in micro-batches via TensorRT-LLM, and pushes upserts into in-memory vector segments (Qdrant Memmap). Stale Redis query caches are evicted via cache invalidation events published over Redis Pub/Sub, achieving sub-100ms end-to-end freshness."
  },
  {
    "id": "rag-hard-10",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Multi-Query",
    "question": "How do you fine-tune an open-source Embedding model (e.g. BGE or E5) using Multiple Negatives Ranking Loss (MNRL) and hard negatives on private domain data?",
    "keyConcepts": [
      "Multi-Query",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Multi-Query.",
    "sampleGoodAnswer": "Fine-tuning embeddings requires (Query, Positive Document, Hard Negative Document) triplets. Multiple Negatives Ranking Loss (MNRL) treats in-batch negatives as negatives for other queries: L = -log(exp(sim(q_i, d_i^+)/tau) / sum(exp(sim(q_i, d_j)/tau))). Mining hard negatives using BM25 (documents sharing keywords but lacking semantic answers) forces the model to learn fine-grained conceptual distinctions."
  },
  {
    "id": "rag-hard-11",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "HyDE",
    "question": "Explain the architecture of ColPali: how does it use Vision-Language Models (PaliGemma) to replace traditional OCR, layout parsers, and chunkers completely?",
    "keyConcepts": [
      "HyDE",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for HyDE.",
    "sampleGoodAnswer": "Traditional pipelines fail because OCR drops layout, table formatting, and diagrams. ColPali leverages PaliGemma's visual transformer to embed 1024 visual tokens per page directly from the rendered image. ColPali computes token-level MaxSim between query tokens and visual patch embeddings, indexing complex infographics, handwritten notes, and multi-column tables with zero text extraction."
  },
  {
    "id": "rag-hard-12",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Rerankers",
    "question": "How do you detect and mitigate hallucination in production RAG systems in real-time using automated NLI verification and factual consistency check gates?",
    "keyConcepts": [
      "Rerankers",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Rerankers.",
    "sampleGoodAnswer": "Real-time factual consistency checking runs a high-speed Natural Language Inference (NLI) model (e.g., DeBERTa-v3) or an optimized LLM judge immediately after answer generation. The judge extracts atomic claims from the generated answer and tests premise entailment against the retrieved context: if an atomic claim receives Contradiction or Neutral, the system catches the hallucination and triggers automatic correction before streaming to the user."
  },
  {
    "id": "rag-hard-13",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "GraphRAG",
    "question": "How do you optimize Vector Cache Stampedes and Thundering Herd problems during viral queries across distributed vector database clusters?",
    "keyConcepts": [
      "GraphRAG",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for GraphRAG.",
    "sampleGoodAnswer": "When a viral event triggers 10,000 identical queries simultaneously, naive caching results in all 10,000 querying the vector DB simultaneously. Solution: Single-Flight Mutex (Redis Redlock or Go singleflight): the first request acquires the lock and queries the vector DB while the remaining 9,999 requests subscribe and await the broadcast result, reducing 10,000 heavy vector queries to exactly one."
  },
  {
    "id": "rag-hard-14",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Agentic RAG",
    "question": "How do you perform Federated RAG across 10 segregated enterprise database silos without centralizing data into a single vector store?",
    "keyConcepts": [
      "Agentic RAG",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Agentic RAG.",
    "sampleGoodAnswer": "Federated RAG sends the query to an orchestrator that queries 10 autonomous organizational vector stores concurrently. Each silo applies local RBAC, executes local retrieval, and returns top-K candidates to the central orchestrator. The orchestrator uses Reciprocal Rank Fusion and a centralized Cross-Encoder Reranker to merge and re-rank candidate documents without centralizing data."
  },
  {
    "id": "rag-hard-15",
    "topic": "RAG & AI Engineering",
    "difficulty": "Hard",
    "category": "Production Arch",
    "question": "Design a production RAG platform serving 100M documents and 20,000 queries per second with a 99th percentile latency under 150ms.",
    "keyConcepts": [
      "Production Arch",
      "High Scale",
      "Internals",
      "Fault Tolerance",
      "Concurrency"
    ],
    "commonWeakSpots": [
      "Lacking low-level distributed systems or memory understanding"
    ],
    "strongIndicators": [
      "Deep systems insights",
      "Exact algorithmic mechanics",
      "Failure mitigation"
    ],
    "hint": "Focus on distributed trade-offs, internal data structures, or kernel/memory interactions for Production Arch.",
    "sampleGoodAnswer": "Production platform architecture: 1) Ingress: Global Anycast CDN with Envoy API gateway; 2) Caching: Two-tier Redis cache (exact hash cache + semantic vector cache for 60% cache hit rate); 3) Vector Tier: Qdrant cluster sharded across 16 nodes with HNSW on NVMe SSDs and mmap; 4) Rerank Tier: Batched BGE-Reranker on NVIDIA T4 GPUs; 5) LLM Tier: vLLM continuous batching inference farm."
  }
]
};

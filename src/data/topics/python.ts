import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const pythonQuestions: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: [
  {
    "id": "python-beg-1",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Core Python",
    "question": "What is the Global Interpreter Lock (GIL) in CPython, and how does it affect CPU-bound multi-threaded programs?",
    "keyConcepts": [
      "Core Python",
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
    "hint": "Focus on the primary definition and why Core Python is essential in Python & Data Science.",
    "sampleGoodAnswer": "The GIL is a mutex in CPython preventing multiple native threads from executing Python bytecode simultaneously. For I/O-bound programs, threads release the GIL during network/disk waits; but for CPU-bound tasks, multithreading cannot achieve multi-core parallelism due to GIL contention, requiring the multiprocessing module instead."
  },
  {
    "id": "python-beg-2",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "GIL & Concurrency",
    "question": "Explain Python Memory Management: Reference Counting and the Cyclic Garbage Collector.",
    "keyConcepts": [
      "GIL & Concurrency",
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
    "hint": "Focus on the primary definition and why GIL & Concurrency is essential in Python & Data Science.",
    "sampleGoodAnswer": "Python primarily uses Reference Counting: every object tracks how many references point to it; when reference count drops to 0, memory is immediately freed. To detect circular references (e.g. object A references B, and B references A), Python runs a generational cyclic garbage collector across 3 generations."
  },
  {
    "id": "python-beg-3",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Memory Management",
    "question": "What is the difference between deepcopy() and copy() in Python?",
    "keyConcepts": [
      "Memory Management",
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
    "hint": "Focus on the primary definition and why Memory Management is essential in Python & Data Science.",
    "sampleGoodAnswer": "copy() creates a shallow copy: it constructs a new collection object but populates it with references to the child objects of the original. deepcopy() recursively copies all nested objects, creating completely independent copies of the entire object graph."
  },
  {
    "id": "python-beg-4",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Generators",
    "question": "What are Python Generators and yield? Why are they memory efficient for large datasets?",
    "keyConcepts": [
      "Generators",
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
    "hint": "Focus on the primary definition and why Generators is essential in Python & Data Science.",
    "sampleGoodAnswer": "Generators are functions that use yield instead of return. Instead of computing an entire 10GB dataset and storing it in RAM, a generator evaluates items lazily one at a time on demand, retaining execution state between calls and keeping memory usage constant O(1)."
  },
  {
    "id": "python-beg-5",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "OOP & Dunder",
    "question": "What is the difference between list, tuple, set, and dictionary in Python, and what are their time complexities?",
    "keyConcepts": [
      "OOP & Dunder",
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
    "hint": "Focus on the primary definition and why OOP & Dunder is essential in Python & Data Science.",
    "sampleGoodAnswer": "List: mutable ordered array, O(1) append, O(N) search. Tuple: immutable ordered sequence, lower memory overhead. Set: mutable unordered collection of unique hashable elements, O(1) lookup. Dictionary: hash map storing key-value pairs with O(1) amortized lookup, insertion, and deletion."
  },
  {
    "id": "python-beg-6",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Decorators",
    "question": "What is a Python Decorator, and how do you write a decorator that measures function execution time?",
    "keyConcepts": [
      "Decorators",
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
    "hint": "Focus on the primary definition and why Decorators is essential in Python & Data Science.",
    "sampleGoodAnswer": "A decorator is a higher-order function that takes a function as argument and returns a wrapped function, extending behavior without modifying the original source code. A timing decorator wraps the function, records start = time.perf_counter(), invokes the function, records end, and prints duration."
  },
  {
    "id": "python-beg-7",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "NumPy",
    "question": "What are Python Dunder (magic) methods (e.g. __init__, __str__, __repr__, __getitem__)?",
    "keyConcepts": [
      "NumPy",
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
    "hint": "Focus on the primary definition and why NumPy is essential in Python & Data Science.",
    "sampleGoodAnswer": "Dunder methods (double underscore) define how objects interact with Python operators and built-in functions: __init__ initializes instance state; __str__ returns human-readable string for print(); __repr__ returns unambiguous developer representation; __getitem__ enables indexing (obj[key])."
  },
  {
    "id": "python-beg-8",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Pandas",
    "question": "What are *args and **kwargs in Python function definitions?",
    "keyConcepts": [
      "Pandas",
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
    "hint": "Focus on the primary definition and why Pandas is essential in Python & Data Science.",
    "sampleGoodAnswer": "*args allows passing an arbitrary number of positional arguments as a tuple. **kwargs allows passing an arbitrary number of keyword arguments as a dictionary, providing flexible function signatures and forwarding arguments to wrapped functions."
  },
  {
    "id": "python-beg-9",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Asyncio",
    "question": "Explain Python's asyncio event loop and how async/await enables non-blocking asynchronous I/O.",
    "keyConcepts": [
      "Asyncio",
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
    "hint": "Focus on the primary definition and why Asyncio is essential in Python & Data Science.",
    "sampleGoodAnswer": "asyncio implements a single-threaded cooperative multitasking event loop. When a coroutine hits await on an asynchronous I/O operation (socket, file, HTTP call), it yields control back to the event loop, which executes other ready coroutines rather than blocking."
  },
  {
    "id": "python-beg-10",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Data Pipelines",
    "question": "What is the difference between Multithreading and Multiprocessing in Python, and when should you use each?",
    "keyConcepts": [
      "Data Pipelines",
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
    "hint": "Focus on the primary definition and why Data Pipelines is essential in Python & Data Science.",
    "sampleGoodAnswer": "Multithreading uses lightweight OS threads sharing memory, constrained by the GIL: ideal for I/O-bound tasks (web scraping, API calls). Multiprocessing spawns separate OS processes with independent Python interpreters, memory spaces, and GILs: ideal for CPU-bound computations (image processing, ML data transformations)."
  },
  {
    "id": "python-beg-11",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Multiprocessing",
    "question": "How does NumPy achieve 10x-100x speedups over pure Python lists using Vectorization and contiguous memory?",
    "keyConcepts": [
      "Multiprocessing",
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
    "hint": "Focus on the primary definition and why Multiprocessing is essential in Python & Data Science.",
    "sampleGoodAnswer": "NumPy arrays store elements of a single homogeneous datatype in contiguous blocks of memory, avoiding Python object pointer indirection. Operations are executed in optimized C and Fortran vectorized loops that utilize CPU SIMD (Single Instruction, Multiple Data) instructions."
  },
  {
    "id": "python-beg-12",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Type Hints",
    "question": "What are List, Dict, and Set Comprehensions, and when should you prefer a generator expression instead?",
    "keyConcepts": [
      "Type Hints",
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
    "hint": "Focus on the primary definition and why Type Hints is essential in Python & Data Science.",
    "sampleGoodAnswer": "Comprehensions construct collections concisely: [x*2 for x in data]. If the collection has 10,000,000 items, a list comprehension materializes all elements in RAM simultaneously; a generator expression (x*2 for x in data) computes values lazily without memory spike."
  },
  {
    "id": "python-beg-13",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Profiling",
    "question": "What is the difference between is and == in Python?",
    "keyConcepts": [
      "Profiling",
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
    "hint": "Focus on the primary definition and why Profiling is essential in Python & Data Science.",
    "sampleGoodAnswer": "== checks value equality (invoking __eq__ to compare contents). is checks identity equality (verifying if both variables point to the exact same memory address: id(a) == id(b)). You should always use is None instead of == None."
  },
  {
    "id": "python-beg-14",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "C Extensions",
    "question": "What are Python Type Hints and what does Pydantic add for runtime validation?",
    "keyConcepts": [
      "C Extensions",
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
    "hint": "Focus on the primary definition and why C Extensions is essential in Python & Data Science.",
    "sampleGoodAnswer": "Type hints (PEP 484) declare expected types for static analysis (via mypy). Python does not enforce type hints at runtime. Pydantic parses and enforces type hints at runtime, coercing inputs and raising ValidationError for invalid data structures."
  },
  {
    "id": "python-beg-15",
    "topic": "Python & Data Science",
    "difficulty": "Beginner",
    "category": "Production",
    "question": "What is the difference between pass, continue, and break in Python loops?",
    "keyConcepts": [
      "Production",
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
    "hint": "Focus on the primary definition and why Production is essential in Python & Data Science.",
    "sampleGoodAnswer": "pass is a null statement placeholder that does nothing. continue skips the remainder of the current loop iteration and moves to the next. break terminates the loop immediately."
  }
],
  medium: [
  {
    "id": "python-med-1",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Core Python",
    "question": "Explain Python Metaclasses and what happens during class creation (__new__ vs __init__).",
    "keyConcepts": [
      "Core Python",
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
    "hint": "Discuss the internal mechanics and performance implications of Core Python.",
    "sampleGoodAnswer": "A metaclass is the class of a class: while an object is an instance of a class, a class is an instance of a metaclass (type by default). Metaclasses customize class creation: __new__ allocates and constructs the class object itself, while __init__ initializes it before it is registered in the namespace."
  },
  {
    "id": "python-med-2",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "GIL & Concurrency",
    "question": "How does the Python Descriptor Protocol work (__get__, __set__, __delete__), and how does it power @property?",
    "keyConcepts": [
      "GIL & Concurrency",
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
    "hint": "Discuss the internal mechanics and performance implications of GIL & Concurrency.",
    "sampleGoodAnswer": "Descriptors are objects defining any of __get__, __set__, or __delete__. When an attribute is looked up on an instance, Python's attribute lookup checks if the attribute is a descriptor. @property is implemented as a data descriptor that binds getter and setter methods to attribute access dynamically."
  },
  {
    "id": "python-med-3",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Memory Management",
    "question": "Explain Context Managers and the __enter__ / __exit__ protocol, including exception suppression.",
    "keyConcepts": [
      "Memory Management",
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
    "hint": "Discuss the internal mechanics and performance implications of Memory Management.",
    "sampleGoodAnswer": "Context managers manage setup and teardown: __enter__ runs before the block and returns an acquired resource; __exit__(exc_type, exc_val, exc_tb) executes after the block. If __exit__ returns True, it suppresses any exception raised inside the with block."
  },
  {
    "id": "python-med-4",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Generators",
    "question": "How do NumPy broadcasting rules work when performing arithmetic across arrays of different shapes?",
    "keyConcepts": [
      "Generators",
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
    "hint": "Discuss the internal mechanics and performance implications of Generators.",
    "sampleGoodAnswer": "Broadcasting allows NumPy arithmetic on arrays of different dimensions without copying data. Two dimensions are compatible if: 1) they are equal, or 2) one of them is 1. Dimensions are compared starting from the trailing (rightmost) dimension; dimensions of size 1 are virtually stretched to match the larger dimension."
  },
  {
    "id": "python-med-5",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "OOP & Dunder",
    "question": "Explain Pandas Vectorized operations vs .apply() vs .itertuples(). Why is .itertuples() 100x faster than iterrows()?",
    "keyConcepts": [
      "OOP & Dunder",
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
    "hint": "Discuss the internal mechanics and performance implications of OOP & Dunder.",
    "sampleGoodAnswer": "Vectorized operations execute in compiled C code at SIMD speeds. .apply() runs Python function call overhead per row. iterrows() boxes each row into a slow Pandas Series object. .itertuples() iterates rows as lightweight namedtuples, running up to 100x faster than iterrows()."
  },
  {
    "id": "python-med-6",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Decorators",
    "question": "How does the CPython memory allocator (PyMalloc) manage small object allocations (arenas, pools, blocks)?",
    "keyConcepts": [
      "Decorators",
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
    "hint": "Discuss the internal mechanics and performance implications of Decorators.",
    "sampleGoodAnswer": "PyMalloc optimizes small allocations (<=512 bytes): 1) Blocks: fixed-size memory chunks; 2) Pools: 4KB pages composed of identical block sizes; 3) Arenas: 256KB memory chunks allocated from the OS. Objects >512 bytes bypass PyMalloc and use standard system malloc()."
  },
  {
    "id": "python-med-7",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "NumPy",
    "question": "What is the difference between asyncio.gather() and asyncio.wait() / TaskGroup in modern Python 3.11+?",
    "keyConcepts": [
      "NumPy",
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
    "hint": "Discuss the internal mechanics and performance implications of NumPy.",
    "sampleGoodAnswer": "asyncio.gather() awaits multiple futures concurrently and returns results in input order, canceling remaining tasks if return_exceptions=False. Python 3.11 TaskGroup provides structured concurrency: if one task in the group raises an exception, all other active tasks are automatically canceled, preventing leaked background coroutines."
  },
  {
    "id": "python-med-8",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Pandas",
    "question": "How do you profile Python CPU and Memory bottlenecks using cProfile, py-spy, and memory_profiler?",
    "keyConcepts": [
      "Pandas",
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
    "hint": "Discuss the internal mechanics and performance implications of Pandas.",
    "sampleGoodAnswer": "cProfile tracks function call counts and cumulative execution times with deterministic tracing. py-spy is a sampling profiler that attaches to running Python processes without code changes, outputting flame graphs. memory_profiler records line-by-line RAM allocation."
  },
  {
    "id": "python-med-9",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Asyncio",
    "question": "Explain Structural Pattern Matching (match/case) introduced in Python 3.10 and its destructuring capabilities.",
    "keyConcepts": [
      "Asyncio",
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
    "hint": "Discuss the internal mechanics and performance implications of Asyncio.",
    "sampleGoodAnswer": "match/case allows structural pattern matching with value matching, sequence destructuring, mapping destructuring, and class pattern inspection with guards (if condition), providing expressive type-safe parsing of complex nested JSON and AST nodes."
  },
  {
    "id": "python-med-10",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Data Pipelines",
    "question": "How does Cython or Pybind11 bridge Python with C/C++ to eliminate performance bottlenecks in data science?",
    "keyConcepts": [
      "Data Pipelines",
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
    "hint": "Discuss the internal mechanics and performance implications of Data Pipelines.",
    "sampleGoodAnswer": "Cython compiles Python-like code with C type declarations into native C extensions. Pybind11 provides modern C++11 header-only bindings to expose C++ classes and functions to Python, allowing high-performance numerical routines to run with direct memory access."
  },
  {
    "id": "python-med-11",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Multiprocessing",
    "question": "What is the difference between process-based and thread-based concurrency when working with NumPy and PyTorch?",
    "keyConcepts": [
      "Multiprocessing",
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
    "hint": "Discuss the internal mechanics and performance implications of Multiprocessing.",
    "sampleGoodAnswer": "NumPy and PyTorch release the CPython GIL during underlying C/CUDA computations. Therefore, multi-threaded Python can achieve 100% multi-core CPU utilization when running vector math and matrix multiplications without needing the overhead of separate processes."
  },
  {
    "id": "python-med-12",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Type Hints",
    "question": "How do you implement custom Serialization and Deserialization in Pydantic v2 (Rust-backed core)?",
    "keyConcepts": [
      "Type Hints",
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
    "hint": "Discuss the internal mechanics and performance implications of Type Hints.",
    "sampleGoodAnswer": "Pydantic v2 is rebuilt in Rust (pydantic-core), running 5x-50x faster. Custom validation uses @field_validator and @model_validator with mode='before' (raw inputs) or mode='after' (typed instance), with custom serializers defined via @field_serializer."
  },
  {
    "id": "python-med-13",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Profiling",
    "question": "Explain how functools.lru_cache works, its cache eviction policy, and why passing unhashable types raises TypeError.",
    "keyConcepts": [
      "Profiling",
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
    "hint": "Discuss the internal mechanics and performance implications of Profiling.",
    "sampleGoodAnswer": "lru_cache decorates functions with an in-memory Least-Recently-Used hash table cache. Function arguments serve as the dictionary key; therefore, all arguments must be hashable (immutable). Passing lists or dicts raises TypeError: unhashable type."
  },
  {
    "id": "python-med-14",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "C Extensions",
    "question": "How do you architect a production-grade ETL data pipeline with Polars vs Pandas for 100GB datasets?",
    "keyConcepts": [
      "C Extensions",
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
    "hint": "Discuss the internal mechanics and performance implications of C Extensions.",
    "sampleGoodAnswer": "Pandas is single-threaded and memory-inefficient (allocating 5x-10x dataset size in RAM). Polars is written in Rust, uses Apache Arrow columnar format, and executes queries lazily using a query optimizer with multi-threaded parallel execution, processing 100GB datasets efficiently."
  },
  {
    "id": "python-med-15",
    "topic": "Python & Data Science",
    "difficulty": "Medium",
    "category": "Production",
    "question": "What is PEP 703 (Free-threaded Python / No-GIL Python 3.13) and how does it achieve true multi-core threading?",
    "keyConcepts": [
      "Production",
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
    "hint": "Discuss the internal mechanics and performance implications of Production.",
    "sampleGoodAnswer": "PEP 703 introduces experimental free-threaded CPython (available in Python 3.13) which removes the GIL. It replaces the single lock with mimalloc thread-safe memory allocation, biased reference counting, and per-object locks, enabling true multi-core parallel execution on threads."
  }
],
  hard: [
  {
    "id": "python-hard-1",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Core Python",
    "question": "Analyze the internal architecture of CPython's Garbage Collector: How do Generation 0, 1, and 2 thresholds and GC untracking work?",
    "keyConcepts": [
      "Core Python",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Core Python.",
    "sampleGoodAnswer": "CPython's cyclic GC uses 3 generations: Gen 0 (new objects), Gen 1, and Gen 2 (long-lived). GC runs when allocation counts exceed thresholds (e.g. 700). Objects with no pointers (like strings and tuples of primitives) are untracked by the GC to avoid useless cycle-checking overhead."
  },
  {
    "id": "python-hard-2",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "GIL & Concurrency",
    "question": "Explain the mechanics of Python Generators at the C level: PyGenObject, f_lasti bytecode offset, and frame evaluation.",
    "keyConcepts": [
      "GIL & Concurrency",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for GIL & Concurrency.",
    "sampleGoodAnswer": "At the C level, a generator is a PyGenObject holding a PyFrameObject. When yield executes, the interpreter stores the instruction pointer f_lasti in the frame, suspends execution, and returns the yielded PyObject*. When next() is called, PyGen_Send resumes execution at f_lasti + 1 with intact local variables."
  },
  {
    "id": "python-hard-3",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Memory Management",
    "question": "How does Asyncio implement task scheduling under the hood? Walk through the Epoll/Kqueue selector loop and Future callback chains.",
    "keyConcepts": [
      "Memory Management",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Memory Management.",
    "sampleGoodAnswer": "asyncio uses selectors (epoll on Linux, kqueue on macOS). The event loop maintains a deque of ready callbacks and an I/O selector registration table. When a socket blocks, a Future registers a callback with the OS selector and yields; when epoll_wait signals readability, the callback enqueues the Task on the ready queue."
  },
  {
    "id": "python-hard-4",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Generators",
    "question": "How do you design a Zero-Copy memory architecture in Python using the Buffer Protocol (memoryview) and Py_buffer?",
    "keyConcepts": [
      "Generators",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Generators.",
    "sampleGoodAnswer": "The Python Buffer Protocol (Py_buffer) allows C extensions to share raw memory buffers without copying data. memoryview wraps an existing buffer, enabling slicing, indexing, and casting types directly on underlying memory with zero bytes of duplication."
  },
  {
    "id": "python-hard-5",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "OOP & Dunder",
    "question": "Explain how Apache Arrow and Plasma Shared Memory enable zero-copy inter-process communication across Python worker processes.",
    "keyConcepts": [
      "OOP & Dunder",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for OOP & Dunder.",
    "sampleGoodAnswer": "Apache Arrow standardizes columnar in-memory data format across languages. Plasma Shared Memory stores Arrow record batches in POSIX shared memory (/dev/shm): multiple independent Python worker processes map the exact same memory addresses, reading datasets with 0ms deserialization overhead."
  },
  {
    "id": "python-hard-6",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Decorators",
    "question": "How does PyTorch Autograd construct and traverse dynamic computation graphs (DAG) during the backward pass?",
    "keyConcepts": [
      "Decorators",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Decorators.",
    "sampleGoodAnswer": "PyTorch Autograd tracks tensor operations during the forward pass by constructing a dynamic Directed Acyclic Graph (DAG) where nodes are Node/Function objects and edges are tensor dependencies. During .backward(), the engine traverses the DAG in reverse topological order, applying vector-Jacobian products."
  },
  {
    "id": "python-hard-7",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "NumPy",
    "question": "How do you debug severe Memory Fragmentation in long-running Python server processes where memory_usage grows but gc.collect() reclaims 0 objects?",
    "keyConcepts": [
      "NumPy",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for NumPy.",
    "sampleGoodAnswer": "Memory fragmentation happens when PyMalloc allocates thousands of small objects across 256KB arenas; if a single small object remains in an arena, the entire 256KB arena cannot be returned to the OS. Solution: tune MALLOC_TRIM_THRESHOLD_, use jemalloc, or spawn worker processes that restart periodically."
  },
  {
    "id": "python-hard-8",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Pandas",
    "question": "How do you write a C extension using the Python C API (PyObject*, Py_INCREF, Py_DECREF) without introducing reference leaks?",
    "keyConcepts": [
      "Pandas",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Pandas.",
    "sampleGoodAnswer": "In the Python C API, PyObject* references must be tracked manually: Py_INCREF increments reference count; Py_DECREF decrements it. Returning a new object passes ownership (New Reference); inspecting an object without incrementing borrows the reference. Missing DECREFs cause permanent memory leaks."
  },
  {
    "id": "python-hard-9",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Asyncio",
    "question": "How does the CPython bytecode compiler and eval loop (ceval.c) optimize instruction dispatch using Computed Gotox?",
    "keyConcepts": [
      "Asyncio",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Asyncio.",
    "sampleGoodAnswer": "ceval.c is CPython's central execution loop. Instead of a slow switch-case statement that incurs branch mispredictions, modern CPython uses Computed Goto (GCC/Clang extension): an array of jump labels jumps directly to the handler for the next opcode, maximizing CPU branch prediction accuracy."
  },
  {
    "id": "python-hard-10",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Data Pipelines",
    "question": "How do you architect a Distributed Task Queue in Python using Celery / Redis with idempotent tasks and Dead Letter Queues?",
    "keyConcepts": [
      "Data Pipelines",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Data Pipelines.",
    "sampleGoodAnswer": "Celery task queue architecture: Redis/RabbitMQ acts as broker; tasks are assigned unique UUIDs and serialized to JSON; workers execute with concurrency pools; idempotent execution is enforced via Redis locks; failed tasks are retried with exponential backoff and routed to Dead Letter Queues on max failures."
  },
  {
    "id": "python-hard-11",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Multiprocessing",
    "question": "Explain how DuckDB integrates with Python to run out-of-core vectorized analytical SQL queries directly on multi-gigabyte Parquet files.",
    "keyConcepts": [
      "Multiprocessing",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Multiprocessing.",
    "sampleGoodAnswer": "DuckDB is an in-process vectorized analytical SQL engine. It reads Parquet metadata to push down projections and filters directly to disk chunks, streaming columnar vectors into CPU cache without loading the whole file into RAM, achieving 10x-50x speedups over Pandas."
  },
  {
    "id": "python-hard-12",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Type Hints",
    "question": "How do you implement custom GPU CUDA kernels for Python using CuPy or Numba @cuda.jit?",
    "keyConcepts": [
      "Type Hints",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Type Hints.",
    "sampleGoodAnswer": "Numba @cuda.jit compiles Python numerical code to PTX machine code on NVIDIA GPUs. Developers define thread and block grids (cuda.grid(1)), allocate shared GPU memory, synchronize threads via cuda.syncthreads(), and launch kernels directly from NumPy arrays."
  },
  {
    "id": "python-hard-13",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Profiling",
    "question": "How does PyPy's Tracing JIT achieve near-C speeds by identifying hot loops and emitting machine code?",
    "keyConcepts": [
      "Profiling",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Profiling.",
    "sampleGoodAnswer": "PyPy uses a Tracing JIT: it monitors running Python code, identifies hot loops, traces the exact sequence of low-level operations during loop iterations, optimizes the linear trace (unrolling loops, constant folding), and compiles it to native machine instructions."
  },
  {
    "id": "python-hard-14",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "C Extensions",
    "question": "How do you secure Python microservices against arbitrary code execution when unpickling data (pickle vulnerability and safe alternatives)?",
    "keyConcepts": [
      "C Extensions",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for C Extensions.",
    "sampleGoodAnswer": "pickle is fundamentally insecure: unpickling untrusted data allows attackers to execute arbitrary shell commands via __reduce__ injection. Secure alternatives: JSON, Protocol Buffers, FlatBuffers, or cryptographic signing (hmac) to verify authenticity before unpickling."
  },
  {
    "id": "python-hard-15",
    "topic": "Python & Data Science",
    "difficulty": "Hard",
    "category": "Production",
    "question": "Design a real-time Financial Market Data Stream Processing engine in Python processing 500,000 tick events/sec with sub-5ms latency.",
    "keyConcepts": [
      "Production",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Production.",
    "sampleGoodAnswer": "Financial tick processor design: 1) Ingress via uvloop with zero-copy socket buffers; 2) PyArrow streaming decoder; 3) Shared-memory ring buffer (multiprocessing shared_memory) routing to C++ Cython calculation workers; 4) Sliding-window aggregation over rolling 1s/5s intervals."
  }
]
};

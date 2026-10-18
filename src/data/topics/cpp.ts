import { InterviewQuestionItem } from '../interviewQuestionsMeta';

export const cppQuestions: {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
} = {
  beginner: [
  {
    "id": "cpp-beg-1",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Memory Management",
    "question": "What is the difference between Stack and Heap memory allocation in C++?",
    "keyConcepts": [
      "Memory Management",
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
    "hint": "Focus on the primary definition and why Memory Management is essential in C++ & System Programming.",
    "sampleGoodAnswer": "Stack memory is managed automatically by the compiler in LIFO order; allocation is a single CPU stack pointer decrement (extremely fast). Heap memory is allocated dynamically at runtime via new/malloc; requires manual deallocation (delete/free) or smart pointers, risking fragmentation and memory leaks."
  },
  {
    "id": "cpp-beg-2",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "RAII",
    "question": "What is a Pointer vs a Reference in C++?",
    "keyConcepts": [
      "RAII",
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
    "hint": "Focus on the primary definition and why RAII is essential in C++ & System Programming.",
    "sampleGoodAnswer": "A pointer is a variable holding a memory address (can be reassigned, can be null, requires dereferencing *p). A reference is an immutable alias to an existing object (must be initialized upon declaration, cannot be null, uses standard dot syntax)."
  },
  {
    "id": "cpp-beg-3",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Pointers",
    "question": "What is Resource Acquisition Is Initialization (RAII) and why is it fundamental in C++?",
    "keyConcepts": [
      "Pointers",
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
    "hint": "Focus on the primary definition and why Pointers is essential in C++ & System Programming.",
    "sampleGoodAnswer": "RAII binds the lifecycle of a resource (heap memory, file handles, mutex locks, network sockets) to the lifetime of a stack-allocated object. The resource is acquired in the constructor and automatically released in the destructor when the object leaves scope, guaranteeing leak-free cleanup even upon exceptions."
  },
  {
    "id": "cpp-beg-4",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Smart Pointers",
    "question": "What is the difference between std::unique_ptr, std::shared_ptr, and std::weak_ptr?",
    "keyConcepts": [
      "Smart Pointers",
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
    "hint": "Focus on the primary definition and why Smart Pointers is essential in C++ & System Programming.",
    "sampleGoodAnswer": "unique_ptr represents exclusive ownership (cannot be copied, only moved via std::move). shared_ptr represents shared ownership with an atomic reference count control block (freed when count reaches 0). weak_ptr holds a non-owning observer reference to a shared_ptr without incrementing the reference count, breaking circular reference cycles."
  },
  {
    "id": "cpp-beg-5",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Move Semantics",
    "question": "What is the difference between passing by value, passing by pointer, and passing by reference?",
    "keyConcepts": [
      "Move Semantics",
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
    "hint": "Focus on the primary definition and why Move Semantics is essential in C++ & System Programming.",
    "sampleGoodAnswer": "Pass-by-value copies the argument into function stack (expensive for large objects). Pass-by-pointer passes a memory address (requires null checks and dereferencing). Pass-by-const-reference (const T&) passes a reference without copying while preventing modification, optimal for large non-trivial types."
  },
  {
    "id": "cpp-beg-6",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Templates",
    "question": "What is a Memory Leak in C++, and how do smart pointers prevent it?",
    "keyConcepts": [
      "Templates",
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
    "hint": "Focus on the primary definition and why Templates is essential in C++ & System Programming.",
    "sampleGoodAnswer": "A memory leak occurs when heap memory allocated via new/malloc is never deallocated with delete/free, permanently consuming RAM until process exit. Modern C++ avoids raw new/delete entirely by using RAII containers (std::vector, std::string) and smart pointers (std::unique_ptr), which automatically free heap memory on destruction."
  },
  {
    "id": "cpp-beg-7",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "STL Containers",
    "question": "What is the difference between struct and class in C++?",
    "keyConcepts": [
      "STL Containers",
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
    "hint": "Focus on the primary definition and why STL Containers is essential in C++ & System Programming.",
    "sampleGoodAnswer": "In C++, struct and class are identical with one exception: members and base classes of a struct default to public; members and base classes of a class default to private."
  },
  {
    "id": "cpp-beg-8",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "OOP & Inheritance",
    "question": "What are Virtual Functions and Virtual Destructors in C++?",
    "keyConcepts": [
      "OOP & Inheritance",
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
    "hint": "Focus on the primary definition and why OOP & Inheritance is essential in C++ & System Programming.",
    "sampleGoodAnswer": "Virtual functions enable dynamic runtime polymorphism: declaring a base method virtual ensures calling it on a base pointer invokes the derived class's overridden implementation via the vtable. A base class with virtual methods must have a virtual destructor; otherwise deleting a derived object via a base pointer causes undefined behavior and leaked derived resources."
  },
  {
    "id": "cpp-beg-9",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Virtual Functions",
    "question": "What are C++ templates and how do they enable generic programming?",
    "keyConcepts": [
      "Virtual Functions",
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
    "hint": "Focus on the primary definition and why Virtual Functions is essential in C++ & System Programming.",
    "sampleGoodAnswer": "Templates allow functions and classes to operate with generic types. Code is generated at compile time through template instantiation: the compiler generates specialized, highly optimized assembly for each concrete type used, achieving zero runtime overhead."
  },
  {
    "id": "cpp-beg-10",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Constexpr",
    "question": "What is the difference between std::vector, std::list, and std::deque in STL?",
    "keyConcepts": [
      "Constexpr",
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
    "hint": "Focus on the primary definition and why Constexpr is essential in C++ & System Programming.",
    "sampleGoodAnswer": "std::vector is a contiguous dynamic array (O(1) random access, cache-friendly). std::list is a doubly-linked list (O(1) insertion anywhere once located, poor cache locality). std::deque is a double-ended queue backed by chunks of arrays (O(1) insertion at both front and back)."
  },
  {
    "id": "cpp-beg-11",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Concurrency",
    "question": "What is the Rule of Three / Rule of Five in modern C++?",
    "keyConcepts": [
      "Concurrency",
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
    "hint": "Focus on the primary definition and why Concurrency is essential in C++ & System Programming.",
    "sampleGoodAnswer": "If a class manages a raw resource, you must define: 1) Destructor; 2) Copy Constructor; 3) Copy Assignment Operator (Rule of Three). In C++11+, also define: 4) Move Constructor; 5) Move Assignment Operator (Rule of Five) to support move semantics and prevent shallow copy double-free errors."
  },
  {
    "id": "cpp-beg-12",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Casting",
    "question": "What is the difference between const and constexpr in C++?",
    "keyConcepts": [
      "Casting",
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
    "hint": "Focus on the primary definition and why Casting is essential in C++ & System Programming.",
    "sampleGoodAnswer": "const specifies a runtime read-only variable whose value cannot be modified after initialization. constexpr specifies a compile-time constant expression evaluated during compilation, usable in template parameters, array sizes, and static assertions."
  },
  {
    "id": "cpp-beg-13",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Exceptions",
    "question": "What are C++ Named Casts (static_cast, dynamic_cast, const_cast, reinterpret_cast)?",
    "keyConcepts": [
      "Exceptions",
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
    "hint": "Focus on the primary definition and why Exceptions is essential in C++ & System Programming.",
    "sampleGoodAnswer": "static_cast: compile-time checked conversion between related types. dynamic_cast: runtime checked downcasting in polymorphic class hierarchies (uses RTTI). const_cast: casts away const-ness. reinterpret_cast: low-level bit reinterpretation between unrelated types (e.g. pointer to integer)."
  },
  {
    "id": "cpp-beg-14",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Compilation",
    "question": "What is the purpose of the explicit keyword in C++ constructor declarations?",
    "keyConcepts": [
      "Compilation",
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
    "hint": "Focus on the primary definition and why Compilation is essential in C++ & System Programming.",
    "sampleGoodAnswer": "The explicit keyword on a single-argument constructor prevents the compiler from performing implicit type conversions and copy-initialization, preventing subtle bugs where unexpected temporary objects are constructed implicitly."
  },
  {
    "id": "cpp-beg-15",
    "topic": "C++ & System Programming",
    "difficulty": "Beginner",
    "category": "Performance",
    "question": "What is Undefined Behavior (UB) in C++, and what are common examples?",
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
    "hint": "Focus on the primary definition and why Performance is essential in C++ & System Programming.",
    "sampleGoodAnswer": "Undefined Behavior means the C++ standard places no constraints on execution: the compiler may reorder instructions, delete code, crash, or produce silent data corruption. Examples: dereferencing nullptr, accessing out-of-bounds arrays, signed integer overflow, use-after-free, and data races."
  }
],
  medium: [
  {
    "id": "cpp-med-1",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Memory Management",
    "question": "Explain Move Semantics, Rvalue References (T&&), and std::move. How do they eliminate expensive deep copies?",
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
    "sampleGoodAnswer": "Move semantics transfer ownership of expensive heap resources from an rvalue (temporary object about to be destroyed) to a new object without allocating new memory or copying bytes. T&& denotes an rvalue reference. std::move is an unconditional cast to an rvalue reference, invoking the move constructor which steals raw pointers and nulls out the source."
  },
  {
    "id": "cpp-med-2",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "RAII",
    "question": "How does the Virtual Method Table (vtable) and vptr pointer implement dynamic dispatch at the machine assembly level?",
    "keyConcepts": [
      "RAII",
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
    "hint": "Discuss the internal mechanics and performance implications of RAII.",
    "sampleGoodAnswer": "When a class declares a virtual function, the compiler creates a static array of function pointers called a vtable. Each object of that class contains an invisible pointer (vptr) pointing to its class vtable. At runtime, invoking ptr->foo() resolves via indirect call: (*(ptr->vptr[index]))(ptr), adding a single pointer indirection."
  },
  {
    "id": "cpp-med-3",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Pointers",
    "question": "What is Perfect Forwarding and std::forward, and how does universal/forwarding reference (T&& in templates) work with reference collapsing?",
    "keyConcepts": [
      "Pointers",
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
    "hint": "Discuss the internal mechanics and performance implications of Pointers.",
    "sampleGoodAnswer": "Universal references (T&& in template deduction) bind to lvalues as lvalue references and to rvalues as rvalues according to Reference Collapsing rules (& + & = &, && + & = &, && + && = &&). std::forward<T>(arg) casts arg back to its original value category, perfectly forwarding it to target functions without unnecessary copies."
  },
  {
    "id": "cpp-med-4",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Smart Pointers",
    "question": "Explain SFINAE (Substitution Failure Is Not An Error) and how C++20 Concepts replace std::enable_if.",
    "keyConcepts": [
      "Smart Pointers",
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
    "hint": "Discuss the internal mechanics and performance implications of Smart Pointers.",
    "sampleGoodAnswer": "SFINAE states that if a template substitution results in invalid code, the compiler does not produce an error; it simply discards that overload. std::enable_if exploited SFINAE to constrain templates. C++20 Concepts (e.g. template <std::integral T>) replace SFINAE with clean compile-time predicates and human-readable compiler errors."
  },
  {
    "id": "cpp-med-5",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Move Semantics",
    "question": "How does memory alignment, struct padding, and alignas affect cache performance and memory footprint in C++?",
    "keyConcepts": [
      "Move Semantics",
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
    "hint": "Discuss the internal mechanics and performance implications of Move Semantics.",
    "sampleGoodAnswer": "CPUs access memory in aligned words (4, 8, 16 bytes). Compilers insert padding bytes between struct members to align them to multiples of their natural size. Ordering struct fields from largest to smallest (e.g. double, int, char) minimizes padding bytes and packs data tightly, maximizing L1 cache line utilization."
  },
  {
    "id": "cpp-med-6",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Templates",
    "question": "Explain the C++ Memory Model: std::atomic, memory orders (memory_order_relaxed, acquire, release, seq_cst), and hardware memory fences.",
    "keyConcepts": [
      "Templates",
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
    "hint": "Discuss the internal mechanics and performance implications of Templates.",
    "sampleGoodAnswer": "std::atomic provides lock-free thread-safe operations. Memory orders: 1) memory_order_seq_cst: default globally consistent total order; 2) memory_order_acquire: ensures subsequent reads/writes cannot be reordered before this read; 3) memory_order_release: ensures prior writes are visible to another thread performing acquire; 4) memory_order_relaxed: atomic without synchronization."
  },
  {
    "id": "cpp-med-7",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "STL Containers",
    "question": "What is Small String Optimization (SSO) in std::string, and how does it avoid heap allocations for short strings?",
    "keyConcepts": [
      "STL Containers",
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
    "hint": "Discuss the internal mechanics and performance implications of STL Containers.",
    "sampleGoodAnswer": "Small String Optimization (SSO) avoids heap allocation for short strings (typically <= 15-22 characters). The std::string object contains an internal union buffer: if the string fits, characters are stored directly on the stack inside the string object itself; only when size exceeds the buffer does it allocate heap memory."
  },
  {
    "id": "cpp-med-8",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "OOP & Inheritance",
    "question": "How do custom STL Allocators work, and why do game engines and HFT firms use Arena/Pool Allocators instead of default malloc/free?",
    "keyConcepts": [
      "OOP & Inheritance",
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
    "hint": "Discuss the internal mechanics and performance implications of OOP & Inheritance.",
    "sampleGoodAnswer": "Default malloc/new uses general-purpose heap allocators with global lock contention and memory fragmentation. Custom Arena/Pool Allocators pre-allocate a large contiguous block of memory during startup; allocations advance a pointer (O(1)), and freeing the entire arena deallocates all objects simultaneously in O(1) with zero fragmentation."
  },
  {
    "id": "cpp-med-9",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Virtual Functions",
    "question": "What is the difference between undefined behavior, unspecified behavior, and implementation-defined behavior in C++?",
    "keyConcepts": [
      "Virtual Functions",
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
    "hint": "Discuss the internal mechanics and performance implications of Virtual Functions.",
    "sampleGoodAnswer": "Implementation-defined: behavior must be documented by compiler (e.g. sizeof(int)). Unspecified: valid behavior chosen from bounded choices (e.g. order of evaluation of function arguments). Undefined (UB): no rules; compiler may generate invalid code, crash, or introduce vulnerabilities."
  },
  {
    "id": "cpp-med-10",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Constexpr",
    "question": "How do std::thread, std::mutex, std::lock_guard, and std::unique_lock prevent race conditions in multi-threaded C++?",
    "keyConcepts": [
      "Constexpr",
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
    "hint": "Discuss the internal mechanics and performance implications of Constexpr.",
    "sampleGoodAnswer": "std::mutex provides exclusive lock access. std::lock_guard provides strict RAII lock acquisition and release on scope exit. std::unique_lock provides flexible deferred locking, timed locking, and manual unlocking, required when working with std::condition_variable."
  },
  {
    "id": "cpp-med-11",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Concurrency",
    "question": "Explain Type Erasure in C++ and how std::function and std::any implement it without exposing concrete types.",
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
    "sampleGoodAnswer": "Type Erasure encapsulates heterogeneous types behind a uniform interface without template parameter infection. std::function stores any callable object (lambda, function pointer, functor) by wrapping it in an internal abstract base class with a virtual invoke() method, using a small-buffer optimization for lightweight callables."
  },
  {
    "id": "cpp-med-12",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Casting",
    "question": "What are Coroutines in C++20 (co_await, co_yield, co_return), and how do promise_type and coroutine_handle work?",
    "keyConcepts": [
      "Casting",
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
    "hint": "Discuss the internal mechanics and performance implications of Casting.",
    "sampleGoodAnswer": "C++20 coroutines are stackless functions that can suspend and resume execution. When a function contains co_await, co_yield, or co_return, the compiler compiles its local variables and instruction pointer into a heap-allocated coroutine state object, coordinated via promise_type and coroutine_handle."
  },
  {
    "id": "cpp-med-13",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Exceptions",
    "question": "How does Copy Elision and Named Return Value Optimization (NRVO) optimize object construction?",
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
    "sampleGoodAnswer": "Copy Elision is a compiler optimization where the compiler omits copy and move constructors entirely, constructing the object directly into the storage of the target destination. In C++17, Return Value Optimization (RVO) of prvalues is mandatory; Named RVO (NRVO) on local named variables is a common compiler optimization."
  },
  {
    "id": "cpp-med-14",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Compilation",
    "question": "What is the Curiously Recurring Template Pattern (CRTP) and how does it achieve static compile-time polymorphism?",
    "keyConcepts": [
      "Compilation",
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
    "hint": "Discuss the internal mechanics and performance implications of Compilation.",
    "sampleGoodAnswer": "CRTP: a derived class inherits from a template base instantiated with the derived class itself: class Derived : public Base<Derived>. Inside Base, methods cast this to Derived* (static_cast<Derived*>(this)->impl()), achieving compile-time polymorphic dispatch with zero vtable pointer indirection or virtual call overhead."
  },
  {
    "id": "cpp-med-15",
    "topic": "C++ & System Programming",
    "difficulty": "Medium",
    "category": "Performance",
    "question": "How do you profile cache misses (L1/L2/LLC), branch mispredictions, and instruction throughput using Linux perf and Valgrind?",
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
    "sampleGoodAnswer": "Linux perf hardware counters: perf stat -e cache-misses,branch-misses,instructions,cycles ./program measures hardware metrics. perf record -g captures call-graph samples, visualized as flame graphs. Valgrind Massif profiles heap allocations; Cachegrind simulates CPU cache hierarchies."
  }
],
  hard: [
  {
    "id": "cpp-hard-1",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Memory Management",
    "question": "Analyze Lock-Free Single-Producer Single-Consumer (SPSC) queue implementation using circular buffers and memory_order_acquire/release.",
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
    "sampleGoodAnswer": "An SPSC queue uses a fixed-size ring buffer array with atomic head and tail indices: Producer writes data at tail and increments tail with memory_order_release; Consumer reads at head and increments head with memory_order_release. The consumer reads tail with memory_order_acquire to ensure it observes written data before advancing, achieving zero locks and sub-10ns latency."
  },
  {
    "id": "cpp-hard-2",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "RAII",
    "question": "How does the Linux epoll subsystem work in C++ network servers (Edge-Triggered vs Level-Triggered, epoll_data, and non-blocking sockets)?",
    "keyConcepts": [
      "RAII",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for RAII.",
    "sampleGoodAnswer": "epoll monitors multiple file descriptors: 1) Level-Triggered (default): epoll_wait returns readiness repeatedly as long as buffer has data; 2) Edge-Triggered (EPOLLET): epoll_wait signals only when state transitions (new data arrives); sockets must be non-blocking (O_NONBLOCK) and the application must read/write in a loop until EAGAIN/EWOULDBLOCK."
  },
  {
    "id": "cpp-hard-3",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Pointers",
    "question": "Explain Low-Latency Kernel Bypass networking in C++ using DPDK (Data Plane Development Kit) or Solarflare OpenOnload.",
    "keyConcepts": [
      "Pointers",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Pointers.",
    "sampleGoodAnswer": "Standard Linux socket read traverses kernel network stack (interrupt, sk_buff allocation, context switch, memory copy to user space), incurring 2-5 microseconds of latency. Kernel Bypass (DPDK / Solarflare EF_VI) maps the network card (NIC) ring buffers directly into user space memory, polling NIC queues continuously with zero context switches and sub-microsecond latency."
  },
  {
    "id": "cpp-hard-4",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Smart Pointers",
    "question": "Analyze the C++20 Memory Model Formalism: Release Sequences, Data Races, Consume Semantics, and Atomic Read-Modify-Write operations.",
    "keyConcepts": [
      "Smart Pointers",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Smart Pointers.",
    "sampleGoodAnswer": "C++ memory model defines synchronization without data races. A release operation on an atomic variable synchronizes-with an acquire operation on the same variable. Release sequences ensure that intervening read-modify-write operations (like fetch_add) do not break the synchronization edge between the original releaser and the final acquirer."
  },
  {
    "id": "cpp-hard-5",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Move Semantics",
    "question": "How do you design a High-Frequency Trading (HFT) Matching Engine in C++ with sub-microsecond tick-to-trade latency?",
    "keyConcepts": [
      "Move Semantics",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Move Semantics.",
    "sampleGoodAnswer": "HFT Matching Engine design: 1) Single-threaded core execution pinned to isolated CPU core (isolcpus); 2) Pre-allocated contiguous order book arrays (bids/asks sorted by price-time); 3) Zero heap allocations on the hot path; 4) Cache-line aligned data structures; 5) Kernel-bypass networking via DPDK; 6) Lock-free ring buffer output logging."
  },
  {
    "id": "cpp-hard-6",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Templates",
    "question": "Explain the internal implementation of std::coroutine: Frame Allocation, Promise Object, and Awaiter Protocol (await_ready, await_suspend, await_resume).",
    "keyConcepts": [
      "Templates",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Templates.",
    "sampleGoodAnswer": "The compiler transforms a coroutine into: 1) Coroutine Frame containing local variables, promise object, and state index; 2) Awaiter protocol: await_ready() returns bool (skip suspension if true); await_suspend(handle) suspends frame and registers callback; await_resume() returns value when resumed; 3) destroy() frees the frame."
  },
  {
    "id": "cpp-hard-7",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "STL Containers",
    "question": "How do you write a custom JIT compiler or dynamic machine code generator in C++ using LLVM C++ APIs or AsmJit?",
    "keyConcepts": [
      "STL Containers",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for STL Containers.",
    "sampleGoodAnswer": "Dynamic JIT with LLVM: 1) Initialize LLVM Target and ExecutionEngine; 2) Build IR modules using llvm::IRBuilder (creating BasicBlocks, instructions); 3) Run LLVM optimization passes (mem2reg, inline, vectorize); 4) Compile to executable machine code in memory via LLJIT, returning a function pointer callable from C++."
  },
  {
    "id": "cpp-hard-8",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "OOP & Inheritance",
    "question": "Explain CPU Cache Coherency Protocols (MESI / MOESI) and how cache invalidation queues cause memory reordering at the hardware bus level.",
    "keyConcepts": [
      "OOP & Inheritance",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for OOP & Inheritance.",
    "sampleGoodAnswer": "MESI protocol states: Modified, Exclusive, Shared, Invalid. CPUs maintain cache coherence by broadcasting invalidation messages over the interconnect bus. To avoid stalling on bus acknowledgments, CPUs use Store Buffers and Invalidation Queues; these hardware optimizations cause instruction reordering, necessitating CPU memory barriers (mfence, lfence, sfence)."
  },
  {
    "id": "cpp-hard-9",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Virtual Functions",
    "question": "How do you implement Lock-Free Multi-Producer Multi-Consumer (MPMC) queues using Michael-Scott queues or Flat Combining?",
    "keyConcepts": [
      "Virtual Functions",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Virtual Functions.",
    "sampleGoodAnswer": "Michael-Scott lock-free queue uses a singly linked list with atomic head and tail pointers. Enqueue appends via atomic CAS on tail->next; if successful, it swings tail to new node. Flat Combining replaces lock-free contention with a single designated combiner thread that processes batched requests from other threads in a single cache-efficient pass."
  },
  {
    "id": "cpp-hard-10",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Constexpr",
    "question": "Analyze the security vulnerability of Return-Oriented Programming (ROP) in C++ and how ASLR, DEP/NX, and Shadow Stacks (Intel CET) prevent it.",
    "keyConcepts": [
      "Constexpr",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Constexpr.",
    "sampleGoodAnswer": "ROP exploits stack buffer overflows: attackers overwrite return addresses to chain together small existing machine instruction sequences ending in 'ret' ('gadgets') to execute arbitrary code without injecting new shellcode. Defenses: ASLR (randomizes memory layout); DEP/NX (marks stack non-executable); Intel CET (Shadow Stack hardware tracking return addresses)."
  },
  {
    "id": "cpp-hard-11",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Concurrency",
    "question": "How do you implement SIMD Vectorization in C++ using AVX-512 / AVX2 intrinsics (_mm256_load_ps, _mm256_fmadd_ps) for 8x matrix multiplication speedup?",
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
    "sampleGoodAnswer": "AVX-512 intrinsics process 512-bit registers (16 single-precision floats simultaneously). For matrix multiplication: load rows using _mm512_load_ps, broadcast coefficients using _mm512_set1_ps, and accumulate using Fused Multiply-Add (_mm512_fmadd_ps), computing 16 multiply-adds in a single CPU cycle."
  },
  {
    "id": "cpp-hard-12",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Casting",
    "question": "Explain how the Linux OOM Killer evaluates badness scores and how to configure mlockall and HugePages for mission-critical C++ daemons.",
    "keyConcepts": [
      "Casting",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Casting.",
    "sampleGoodAnswer": "Linux OOM Killer calculates badness score: badness = (oom_points * 1000 / total_ram) + oom_score_adj. Setting oom_score_adj to -1000 protects mission-critical daemons from OOM termination. mlockall(MCL_CURRENT | MCL_FUTURE) locks all process memory into RAM, disabling paging to disk. HugePages (2MB/1GB) reduce TLB cache misses."
  },
  {
    "id": "cpp-hard-13",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Exceptions",
    "question": "How do you design a custom Garbage Collector (Mark-Sweep or Reference Counting) embedded in a C++ game engine or runtime?",
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
    "sampleGoodAnswer": "Embedded GC design: 1) Allocator tracking allocated block headers; 2) Root scanning (registers, thread stacks, global pointers); 3) Mark phase: traverses pointers, setting mark bits in bitmap; 4) Sweep phase: scans allocation list, reclaiming unmarked blocks and clearing mark bits."
  },
  {
    "id": "cpp-hard-14",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Compilation",
    "question": "How does Link-Time Optimization (LTO) and Profile-Guided Optimization (PGO) cross module boundaries to optimize binary layout in GCC/Clang?",
    "keyConcepts": [
      "Compilation",
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
    "hint": "Examine the distributed system, OS kernel, or memory model implications for Compilation.",
    "sampleGoodAnswer": "Profile-Guided Optimization (PGO) compiles instrumented binaries, runs real-world production workloads to record branch frequencies and hot call paths, and recompiles: the compiler places hot blocks contiguously to maximize instruction cache hits and predicts branches accurately. Link-Time Optimization (LTO) performs whole-program analysis across translation units."
  },
  {
    "id": "cpp-hard-15",
    "topic": "C++ & System Programming",
    "difficulty": "Hard",
    "category": "Performance",
    "question": "Design a distributed In-Memory Key-Value Storage engine in C++ with Raft consensus, zero-copy TCP networking, and MVCC storage.",
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
    "sampleGoodAnswer": "Distributed KV store: 1) Raft consensus module with leader election and log replication; 2) Netty/Boost.Asio non-blocking TCP layer; 3) LSM-tree storage engine with SSTables and bloom filters; 4) MVCC timestamp tracking for lock-free point-in-time snapshot reads."
  }
]
};

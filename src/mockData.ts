import { UserProfile, HistoricalReport, CodingProblem, NotificationItem } from './types';

export const initialUser: UserProfile = {
  name: "Candidate",
  email: "candidate@techlead.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  role: "Senior Frontend Engineer",
  targetRole: "Staff AI Solutions Architect",
  dailyStreak: 7,
  overallScore: 88,
  totalInterviews: 14,
  isLoggedIn: true,
  isProUser: true,
};

export const sampleNotifications: NotificationItem[] = [
  { id: '1', title: 'Daily Streak Milestone!', message: 'You reached 7 consecutive days of practice!', time: '10m ago', read: false },
  { id: '2', title: 'New Mock Assessment Ready', message: 'Google System Design assessment is now available.', time: '2h ago', read: false },
  { id: '3', title: 'Resume ATS Score Updated', message: 'Your ATS match score increased to 88%!', time: '1d ago', read: true },
];

export const sampleHistory: HistoricalReport[] = [
  {
    id: 'rep-101',
    date: '2026-08-04',
    type: 'AI Chat Interview',
    role: 'AI Engineer',
    score: 92,
    durationMinutes: 25,
    summary: 'Excellent grasp of RAG architecture and LLM fine-tuning concepts.',
    strengths: ['RAG Pipeline optimization', 'Transformer architecture knowledge', 'Clear technical explanations'],
    weaknesses: ['Could elaborate more on cost trade-offs between fine-tuning and prompt engineering'],
  },
  {
    id: 'rep-102',
    date: '2026-08-02',
    type: 'Voice Interview',
    role: 'Software Engineer',
    score: 85,
    durationMinutes: 18,
    summary: 'Good confidence and articulation. Low filler word count.',
    strengths: ['Confident tone', 'Strong STAR framework execution'],
    weaknesses: ['Slightly fast speaking speed during complexity discussion'],
  },
  {
    id: 'rep-103',
    date: '2026-07-30',
    type: 'Coding Interview',
    role: 'Frontend Engineer',
    score: 95,
    durationMinutes: 30,
    summary: 'Solved Two Sum & LRU Cache efficiently with clean O(1) operations.',
    strengths: ['Optimal space complexity', 'Edge case handling', 'Clean code structure'],
    weaknesses: ['Initial variable naming was verbose'],
  },
  {
    id: 'rep-104',
    date: '2026-07-28',
    type: 'Video Interview',
    role: 'HR & Behavioral',
    score: 88,
    durationMinutes: 20,
    summary: 'Strong eye contact and steady composure during conflict resolution scenarios.',
    strengths: ['Maintained 90%+ eye contact', 'Positive smile and body posture'],
    weaknesses: ['Try pausing briefly before answering tough behavioral questions'],
  },
];

export const sampleCodingProblems: CodingProblem[] = [
  {
    id: 'prob-1',
    title: 'Two Sum & HashMap Lookup',
    difficulty: 'Easy',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Must achieve O(N) time complexity using a Hash Map.',
    starterCode: {
      Python: `def twoSum(nums, target):\n    # Write your solution here\n    pass`,
      JavaScript: `function twoSum(nums, target) {\n  // Write your solution here\n}`,
      Java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write solution\n        return new int[]{};\n    }\n}`,
      'C++': `#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write solution\n    return {};\n}`,
      SQL: `SELECT id, name FROM users WHERE score > 80;`
    },
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' }
    ]
  },
  {
    id: 'prob-2',
    title: 'LRU Cache Design',
    difficulty: 'Medium',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for both `get` and `put` operations using a Doubly Linked List and Hash Table.',
    starterCode: {
      Python: `class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        return -1\n    def put(self, key: int, value: int) -> None:\n        pass`,
      JavaScript: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n  }\n  get(key) {\n    return -1;\n  }\n  put(key, value) {}\n}`,
      Java: `class LRUCache {\n    public LRUCache(int capacity) {}\n    public int get(int key) { return -1; }\n    public void put(int key, int value) {}\n}`,
      'C++': `class LRUCache {\npublic:\n    LRUCache(int capacity) {}\n    int get(int key) { return -1; }\n    void put(int key, int value) {}\n};`,
      SQL: `SELECT * FROM cache_store ORDER BY last_accessed DESC LIMIT 10;`
    },
    testCases: [
      { input: 'put(1,1), put(2,2), get(1)', expected: '1' },
      { input: 'put(3,3), get(2)', expected: '-1' }
    ]
  },
  {
    id: 'prob-3',
    title: 'Reverse a Singly Linked List',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list head. Perform the reversal in O(N) time and O(1) auxiliary space iteratively.',
    starterCode: {
      Python: `# Definition for singly-linked list node:\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\n\ndef reverseList(head):\n    # Write iterative reversal here\n    pass`,
      JavaScript: `function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  // Complete loop\n  return prev;\n}`,
      Java: `public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
      'C++': `ListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr) {\n        ListNode *nextTemp = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}`,
      SQL: `SELECT id, val FROM nodes ORDER BY position DESC;`
    },
    testCases: [
      { input: 'head = [1,2,3,4,5]', expected: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', expected: '[2,1]' }
    ]
  },
  {
    id: 'prob-4',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters using the Sliding Window technique in O(N) time.',
    starterCode: {
      Python: `def lengthOfLongestSubstring(s: str) -> int:\n    # Write sliding window solution\n    pass`,
      JavaScript: `function lengthOfLongestSubstring(s) {\n  let set = new Set();\n  let left = 0, maxLen = 0;\n  // Write solution\n  return maxLen;\n}`,
      Java: `public int lengthOfLongestSubstring(String s) {\n    int n = s.length(), maxLen = 0;\n    Map<Character, Integer> map = new HashMap<>();\n    // Complete logic\n    return maxLen;\n}`,
      'C++': `int lengthOfLongestSubstring(string s) {\n    vector<int> chars(128, -1);\n    int left = 0, right = 0, res = 0;\n    // Write solution\n    return res;\n}`,
      SQL: `SELECT s, CHAR_LENGTH(s) FROM text_table;`
    },
    testCases: [
      { input: 's = "abcabcbb"', expected: '3' },
      { input: 's = "bbbbb"', expected: '1' },
      { input: 's = "pwwkew"', expected: '3' }
    ]
  },
  {
    id: 'prob-5',
    title: 'Valid Parentheses & Bracket Matching',
    difficulty: 'Easy',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid using a Stack data structure.',
    starterCode: {
      Python: `def isValid(s: str) -> bool:\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    # Complete implementation\n    return len(stack) == 0`,
      JavaScript: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  // Complete implementation\n  return stack.length === 0;\n}`,
      Java: `public boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    for (char c : s.toCharArray()) {\n        // Handle brackets\n    }\n    return stack.isEmpty();\n}`,
      'C++': `bool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        // Handle brackets\n    }\n    return st.empty();\n}`,
      SQL: `SELECT * FROM code_snippets WHERE isValidSyntax = TRUE;`
    },
    testCases: [
      { input: 's = "()[]{}"', expected: 'true' },
      { input: 's = "(]"', expected: 'false' },
      { input: 's = "([)]"', expected: 'false' }
    ]
  },
  {
    id: 'prob-6',
    title: 'Binary Tree Level Order Traversal (BFS)',
    difficulty: 'Medium',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e. from left to right, level by level) using a Queue.',
    starterCode: {
      Python: `def levelOrder(root):\n    # Return list of list of integers level by level\n    pass`,
      JavaScript: `function levelOrder(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  // Complete BFS queue loop\n  return result;\n}`,
      Java: `public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> res = new ArrayList<>();\n    if (root == null) return res;\n    Queue<TreeNode> queue = new LinkedList<>();\n    // Complete BFS\n    return res;\n}`,
      'C++': `vector<vector<int>> levelOrder(TreeNode* root) {\n    vector<vector<int>> ans;\n    if (!root) return ans;\n    queue<TreeNode*> q;\n    // Complete BFS\n    return ans;\n}`,
      SQL: `WITH RECURSIVE TreeHierarchy AS (...) SELECT * FROM TreeHierarchy;`
    },
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', expected: '[[1]]' }
    ]
  },
  {
    id: 'prob-7',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    description: 'You are given an array of `k` linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list using a Min-Heap / Priority Queue in O(N log K) time.',
    starterCode: {
      Python: `import heapq\n\ndef mergeKLists(lists):\n    # Priority Queue approach\n    pass`,
      JavaScript: `function mergeKLists(lists) {\n  // Merge K sorted linked lists\n}`,
      Java: `public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue<ListNode> pq = new PriorityQueue<>((a,b) -> a.val - b.val);\n    // Complete implementation\n    return dummy.next;\n}`,
      'C++': `ListNode* mergeKLists(vector<ListNode*>& lists) {\n    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };\n    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);\n    // Write solution\n    return dummy.next;\n}`,
      SQL: `SELECT val FROM (SELECT val FROM list1 UNION ALL SELECT val FROM list2) ORDER BY val;`
    },
    testCases: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', expected: '[]' }
    ]
  },
  {
    id: 'prob-8',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    description: 'Given an integer array `height` of length `n`. Find two lines that together with the x-axis form a container such that the container contains the most water. Return the maximum amount of water a container can store.',
    starterCode: {
      Python: `def maxArea(height: list[int]) -> int:\n    left, right = 0, len(height) - 1\n    max_water = 0\n    # Implement Two Pointer approach\n    return max_water`,
      JavaScript: `function maxArea(height) {\n  let left = 0, right = height.length - 1;\n  let maxWater = 0;\n  // Implement Two Pointer\n  return maxWater;\n}`,
      Java: `public int maxArea(int[] height) {\n    int l = 0, r = height.length - 1, max = 0;\n    while (l < r) {\n        int h = Math.min(height[l], height[r]);\n        max = Math.max(max, h * (r - l));\n        if (height[l] < height[r]) l++; else r--;\n    }\n    return max;\n}`,
      'C++': `int maxArea(vector<int>& height) {\n    int l = 0, r = height.size() - 1, maxWater = 0;\n    while (l < r) {\n        maxWater = max(maxWater, min(height[l], height[r]) * (r - l));\n        if (height[l] < height[r]) l++; else r--;\n    }\n    return maxWater;\n}`,
      SQL: `SELECT MAX(LEAST(h1.val, h2.val) * ABS(h1.pos - h2.pos)) FROM heights h1 JOIN heights h2 ON h1.pos < h2.pos;`
    },
    testCases: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', expected: '49' },
      { input: 'height = [1,1]', expected: '1' }
    ]
  },
  {
    id: 'prob-9',
    title: 'Coin Change (Dynamic Programming)',
    difficulty: 'Medium',
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount using bottom-up Dynamic Programming.',
    starterCode: {
      Python: `def coinChange(coins: list[int], amount: int) -> int:\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    # Fill DP table\n    return dp[amount] if dp[amount] != float('inf') else -1`,
      JavaScript: `function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let coin of coins) {\n    for (let i = coin; i <= amount; i++) {\n      dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
      Java: `public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n    // Write DP loops\n    return dp[amount] > amount ? -1 : dp[amount];\n}`,
      'C++': `int coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    // Write DP loops\n    return dp[amount] > amount ? -1 : dp[amount];\n}`,
      SQL: `SELECT coin_val, MIN(count) FROM coin_combinations WHERE total = amount GROUP BY coin_val;`
    },
    testCases: [
      { input: 'coins = [1,2,5], amount = 11', expected: '3' },
      { input: 'coins = [2], amount = 3', expected: '-1' },
      { input: 'coins = [1], amount = 0', expected: '0' }
    ]
  },
  {
    id: 'prob-10',
    title: 'SQL: Department Top 3 High Earners',
    difficulty: 'Medium',
    description: 'Write an SQL query to find employees who have the top 3 highest salaries in each of the departments using `DENSE_RANK()` window function.',
    starterCode: {
      Python: `import pandas as pd\n\ndef top3Earners(employee_df, department_df):\n    # Return top 3 earners per department\n    pass`,
      JavaScript: `// JS implementation of grouping and sorting department salaries`,
      Java: `// Java Streams implementation`,
      'C++': `// C++ implementation`,
      SQL: `WITH RankedSalaries AS (\n  SELECT \n    d.name AS Department,\n    e.name AS Employee,\n    e.salary AS Salary,\n    DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk\n  FROM Employee e\n  JOIN Department d ON e.departmentId = d.id\n)\nSELECT Department, Employee, Salary\nFROM RankedSalaries\nWHERE rnk <= 3;`
    },
    testCases: [
      { input: 'Employee & Department tables', expected: 'Top 3 high earners grouped by Department' }
    ]
  },
  {
    id: 'prob-11',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    description: 'Given an integer array `nums` sorted in ascending order (with distinct values) that has been rotated at an unknown pivot, find the index of `target` in O(log N) time using modified Binary Search.',
    starterCode: {
      Python: `def search(nums: list[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    # Implement binary search\n    return -1`,
      JavaScript: `function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    // Check sorted half\n  }\n  return -1;\n}`,
      Java: `public int search(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        // Logic here\n    }\n    return -1;\n}`,
      'C++': `int search(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        // Binary search logic\n    }\n    return -1;\n}`,
      SQL: `SELECT position FROM array_store WHERE val = target;`
    },
    testCases: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', expected: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', expected: '-1' }
    ]
  },
  {
    id: 'prob-12',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining using Two Pointers or Stack.',
    starterCode: {
      Python: `def trap(height: list[int]) -> int:\n    if not height: return 0\n    l, r = 0, len(height) - 1\n    leftMax, rightMax = height[l], height[r]\n    water = 0\n    # Complete logic\n    return water`,
      JavaScript: `function trap(height) {\n  let l = 0, r = height.length - 1;\n  let leftMax = 0, rightMax = 0, res = 0;\n  while (l < r) {\n    if (height[l] < height[r]) {\n      height[l] >= leftMax ? (leftMax = height[l]) : (res += leftMax - height[l]);\n      l++;\n    } else {\n      height[r] >= rightMax ? (rightMax = height[r]) : (res += rightMax - height[r]);\n      r--;\n    }\n  }\n  return res;\n}`,
      Java: `public int trap(int[] height) {\n    int l = 0, r = height.length - 1, leftMax = 0, rightMax = 0, water = 0;\n    while (l < r) {\n        // Two pointer trapping water\n    }\n    return water;\n}`,
      'C++': `int trap(vector<int>& height) {\n    int l = 0, r = height.size() - 1, leftMax = 0, rightMax = 0, water = 0;\n    // Two pointer logic\n    return water;\n}`,
      SQL: `SELECT SUM(trapped_water) FROM elevation_map;`
    },
    testCases: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
      { input: 'height = [4,2,0,3,2,5]', expected: '9' }
    ]
  },
  {
    id: 'prob-13',
    title: 'Design a Sliding Window Rate Limiter',
    difficulty: 'Medium',
    description: 'Implement a thread-safe sliding window log rate limiter class that permits maximum `maxRequests` per `windowSeconds` interval for a given user IP or token.',
    starterCode: {
      Python: `import time\nfrom collections import deque\n\nclass RateLimiter:\n    def __init__(self, max_requests: int, window_seconds: int):\n        self.max_requests = max_requests\n        self.window_seconds = window_seconds\n        self.logs = deque()\n\n    def allow_request(self) -> bool:\n        # Remove timestamps older than window_seconds\n        now = time.time()\n        while self.logs and self.logs[0] <= now - self.window_seconds:\n            self.logs.popleft()\n        if len(self.logs) < self.max_requests:\n            self.logs.append(now)\n            return True\n        return False`,
      JavaScript: `class RateLimiter {\n  constructor(maxRequests, windowSeconds) {\n    this.maxRequests = maxRequests;\n    this.windowMs = windowSeconds * 1000;\n    this.timestamps = [];\n  }\n  allowRequest() {\n    const now = Date.now();\n    this.timestamps = this.timestamps.filter(t => t > now - this.windowMs);\n    if (this.timestamps.length < this.maxRequests) {\n      this.timestamps.push(now);\n      return true;\n    }\n    return false;\n  }\n}`,
      Java: `public class RateLimiter {\n    private final int maxRequests;\n    private final long windowMs;\n    private final Queue<Long> timestamps = new ConcurrentLinkedQueue<>();\n    public RateLimiter(int maxRequests, int windowSeconds) {\n        this.maxRequests = maxRequests;\n        this.windowMs = windowSeconds * 1000L;\n    }\n    public boolean allowRequest() {\n        long now = System.currentTimeMillis();\n        while (!timestamps.isEmpty() && timestamps.peek() <= now - windowMs) {\n            timestamps.poll();\n        }\n        if (timestamps.size() < maxRequests) {\n            timestamps.add(now);\n            return true;\n        }\n        return false;\n    }\n}`,
      'C++': `class RateLimiter {\n// C++ Rate Limiter implementation\n};`,
      SQL: `SELECT COUNT(*) FROM api_request_logs WHERE client_id = ? AND timestamp > NOW() - INTERVAL '1 MINUTE';`
    },
    testCases: [
      { input: 'maxRequests = 3, windowSeconds = 60, 4 requests', expected: 'True, True, True, False' }
    ]
  },
  {
    id: 'prob-14',
    title: 'Find Median from Data Stream (Dual Heap)',
    difficulty: 'Hard',
    description: 'Design a data structure that supports adding numbers from a data stream and finding the dynamic median of all elements in O(log N) time using a Max-Heap for the lower half and a Min-Heap for the upper half.',
    starterCode: {
      Python: `import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = [] # Max heap (negated values)\n        self.large = [] # Min heap\n\n    def addNum(self, num: int) -> None:\n        # Balance heaps\n        pass\n\n    def findMedian(self) -> float:\n        # Return median\n        return 0.0`,
      JavaScript: `class MedianFinder {\n  constructor() {\n    this.nums = [];\n  }\n  addNum(num) {\n    // Insert sorted or balance heaps\n  }\n  findMedian() {\n    // Return median\n  }\n}`,
      Java: `class MedianFinder {\n    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    private PriorityQueue<Integer> large = new PriorityQueue<>();\n    public void addNum(int num) {\n        // Heap insertion and balancing\n    }\n    public double findMedian() {\n        // Calculate median\n        return 0.0;\n    }\n}`,
      'C++': `class MedianFinder {\n    priority_queue<int> maxHeap;\n    priority_queue<int, vector<int>, greater<int>> minHeap;\npublic:\n    void addNum(int num) {}\n    double findMedian() { return 0.0; }\n};`,
      SQL: `SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY val) FROM data_stream;`
    },
    testCases: [
      { input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()', expected: '1.5, 2.0' }
    ]
  }
];

export const sampleLeaderboard = [
  { rank: 1, name: 'Elena Rostova', score: 98, role: 'Staff AI Engineer', streak: 18 },
  { rank: 2, name: 'Candidate (You)', score: 88, role: 'Senior Frontend', streak: 7 },
  { rank: 3, name: 'Marcus Chen', score: 87, role: 'Backend Lead', streak: 12 },
  { rank: 4, name: 'Sarah Jenkins', score: 84, role: 'Data Analyst', streak: 5 },
  { rank: 5, name: 'David Kumar', score: 81, role: 'Embedded Systems', streak: 9 },
];

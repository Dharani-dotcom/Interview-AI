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
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
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
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for `get` and `put`.',
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
  }
];

export const sampleLeaderboard = [
  { rank: 1, name: 'Elena Rostova', score: 98, role: 'Staff AI Engineer', streak: 18 },
  { rank: 2, name: 'Candidate (You)', score: 88, role: 'Senior Frontend', streak: 7 },
  { rank: 3, name: 'Marcus Chen', score: 87, role: 'Backend Lead', streak: 12 },
  { rank: 4, name: 'Sarah Jenkins', score: 84, role: 'Data Analyst', streak: 5 },
  { rank: 5, name: 'David Kumar', score: 81, role: 'Embedded Systems', streak: 9 },
];

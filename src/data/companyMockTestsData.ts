import { AptitudeQuestion } from './aptitudeQuestions';

export interface MockCodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: {
    javascript: string;
    python: string;
  };
  testCases: {
    input: string;
    expected: string;
  }[];
  solution: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface CompanyMockTestDef {
  company: string;
  title: string;
  badge: string;
  level: 'Elite' | 'Hard' | 'Moderate';
  durationMinutes: number;
  cutoffScore: number;
  totalMarks: number;
  description: string;
  codingChallenges: MockCodingChallenge[];
}

export const COMPANY_MOCK_TESTS: CompanyMockTestDef[] = [
  {
    "company": "Google",
    "title": "Google SWE & Analytical Campus Assessment (OA)",
    "badge": "Elite Difficulty • High Cutoff",
    "level": "Elite",
    "durationMinutes": 90,
    "cutoffScore": 38,
    "totalMarks": 50,
    "description": "Notoriously challenging Google OA simulation. Tests deep graph logic, dynamic programming, Bayesian probability puzzles, and complex verbal inference.",
    "codingChallenges": [
      {
        "id": "goog-code-1",
        "title": "Trapping Rain Water (Two Pointers / Monotonic Stack)",
        "difficulty": "Hard",
        "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        "starterCode": {
          "javascript": "function trap(height) {\n  // Write O(N) time and O(1) space solution\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0;\n  let water = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) leftMax = height[left];\n      else water += leftMax - height[left];\n      left++;\n    } else {\n      if (height[right] >= rightMax) rightMax = height[right];\n      else water += rightMax - height[right];\n      right--;\n    }\n  }\n  return water;\n}",
          "python": "def trap(height):\n    left, right = 0, len(height) - 1\n    left_max, right_max = 0, 0\n    water = 0\n    while left < right:\n        if height[left] < height[right]:\n            if height[left] >= left_max: left_max = height[left]\n            else: water += left_max - height[left]\n            left += 1\n        else:\n            if height[right] >= right_max: right_max = height[right]\n            else: water += right_max - height[right]\n            right -= 1\n    return water"
        },
        "testCases": [
          {
            "input": "[0,1,0,2,1,0,1,3,2,1,2,1]",
            "expected": "6"
          },
          {
            "input": "[4,2,0,3,2,5]",
            "expected": "9"
          }
        ],
        "solution": "Use two pointers from left and right maintaining leftMax and rightMax.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      },
      {
        "id": "goog-code-2",
        "title": "Subarray Sum Equals K (Hash Map & Prefix Sum)",
        "difficulty": "Medium",
        "description": "Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.",
        "starterCode": {
          "javascript": "function subarraySum(nums, k) {\n  let count = 0, sum = 0;\n  const map = new Map();\n  map.set(0, 1);\n  for (const n of nums) {\n    sum += n;\n    if (map.has(sum - k)) count += map.get(sum - k);\n    map.set(sum, (map.get(sum) || 0) + 1);\n  }\n  return count;\n}",
          "python": "def subarraySum(nums, k):\n    count = sum_val = 0\n    hash_map = {0: 1}\n    for n in nums:\n        sum_val += n\n        if sum_val - k in hash_map:\n            count += hash_map[sum_val - k]\n        hash_map[sum_val] = hash_map.get(sum_val, 0) + 1\n    return count"
        },
        "testCases": [
          {
            "input": "nums = [1,1,1], k = 2",
            "expected": "2"
          },
          {
            "input": "nums = [1,2,3], k = 3",
            "expected": "2"
          }
        ],
        "solution": "Prefix sum hash map stores frequency of prefix sums encountered so far.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      }
    ]
  },
  {
    "company": "Microsoft",
    "title": "Microsoft Codility Technical Assessment",
    "badge": "Hard Difficulty • Algorithmic Rigor",
    "level": "Hard",
    "durationMinutes": 80,
    "cutoffScore": 36,
    "totalMarks": 50,
    "description": "Microsoft campus hiring evaluation with emphasis on bitwise properties, optimal search trees, modular arithmetic, and logical deduction grids.",
    "codingChallenges": [
      {
        "id": "msft-code-1",
        "title": "Search in Rotated Sorted Array",
        "difficulty": "Medium",
        "description": "Given the sorted array nums rotated at an unknown pivot and an integer target, return the index of target, or -1 if not in nums.",
        "starterCode": {
          "javascript": "function search(nums, target) {\n  let low = 0, high = nums.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[low] <= nums[mid]) {\n      if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n      else low = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n      else high = mid - 1;\n    }\n  }\n  return -1;\n}",
          "python": "def search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target: return mid\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]: high = mid - 1\n            else: low = mid + 1\n        else:\n            if nums[mid] < target <= nums[high]: low = mid + 1\n            else: high = mid - 1\n    return -1"
        },
        "testCases": [
          {
            "input": "nums = [4,5,6,7,0,1,2], target = 0",
            "expected": "4"
          },
          {
            "input": "nums = [4,5,6,7,0,1,2], target = 3",
            "expected": "-1"
          }
        ],
        "solution": "Binary search identifying which half of the array is sorted.",
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)"
      },
      {
        "id": "msft-code-2",
        "title": "Reverse Bits (32-bit Integer)",
        "difficulty": "Easy",
        "description": "Reverse bits of a given 32-bit unsigned integer.",
        "starterCode": {
          "javascript": "function reverseBits(n) {\n  let result = 0;\n  for (let i = 0; i < 32; i++) {\n    result = (result << 1) | (n & 1);\n    n >>>= 1;\n  }\n  return result >>> 0;\n}",
          "python": "def reverseBits(n):\n    result = 0\n    for _ in range(32):\n        result = (result << 1) | (n & 1)\n        n >>= 1\n    return result"
        },
        "testCases": [
          {
            "input": "n = 43261596",
            "expected": "964176192"
          }
        ],
        "solution": "Bit manipulation loop shifting result left and n right.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(1)"
      }
    ]
  },
  {
    "company": "Amazon",
    "title": "Amazon Online Assessment (OA2)",
    "badge": "Hard Difficulty • Work Simulation & SDE",
    "level": "Hard",
    "durationMinutes": 80,
    "cutoffScore": 35,
    "totalMarks": 50,
    "description": "Amazon OA2 mock examination focusing on inventory systems, array/string encoding, work simulation reasoning, and dynamic programming.",
    "codingChallenges": [
      {
        "id": "amz-code-1",
        "title": "Merge K Sorted Lists",
        "difficulty": "Hard",
        "description": "Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.",
        "starterCode": {
          "javascript": "function mergeKLists(lists) {\n  // Min-Heap / Divide and Conquer\n  if (!lists.length) return null;\n  return lists.flat().sort((a,b) => a - b);\n}",
          "python": "import heapq\ndef mergeKLists(lists):\n    # Divide and Conquer or Min-Heap\n    res = []\n    for l in lists:\n        res.extend(l)\n    return sorted(res)"
        },
        "testCases": [
          {
            "input": "[[1,4,5],[1,3,4],[2,6]]",
            "expected": "[1,1,2,3,4,4,5,6]"
          }
        ],
        "solution": "Use min-heap or pairwise merge.",
        "timeComplexity": "O(N log K)",
        "spaceComplexity": "O(K)"
      },
      {
        "id": "amz-code-2",
        "title": "String Compression (Run-Length Encoding)",
        "difficulty": "Medium",
        "description": "Given an array of characters chars, compress it using run-length encoding in-place.",
        "starterCode": {
          "javascript": "function compress(chars) {\n  let write = 0, i = 0;\n  while (i < chars.length) {\n    let j = i;\n    while (j < chars.length && chars[j] === chars[i]) j++;\n    chars[write++] = chars[i];\n    if (j - i > 1) {\n      for (const c of String(j - i)) chars[write++] = c;\n    }\n    i = j;\n  }\n  return write;\n}",
          "python": "def compress(chars):\n    write = i = 0\n    while i < len(chars):\n        j = i\n        while j < len(chars) and chars[j] == chars[i]: j += 1\n        chars[write] = chars[i]\n        write += 1\n        if j - i > 1:\n            for c in str(j - i):\n                chars[write] = c\n                write += 1\n        i = j\n    return write"
        },
        "testCases": [
          {
            "input": "[\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
            "expected": "6"
          }
        ],
        "solution": "Two pointer in-place compression.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      }
    ]
  },
  {
    "company": "TCS",
    "title": "TCS NQT / Digital / Prime Mock Assessment",
    "badge": "Standard Placement • Speed & Accuracy",
    "level": "Moderate",
    "durationMinutes": 75,
    "cutoffScore": 33,
    "totalMarks": 50,
    "description": "National Qualifier Test (NQT) & Digital Track. Rigorous quantitative arithmetic, logical deductions, verbal grammar, and clean algorithm coding.",
    "codingChallenges": [
      {
        "id": "tcs-code-1",
        "title": "Single Number in Array (Bitwise XOR)",
        "difficulty": "Easy",
        "description": "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one in O(N) time and O(1) memory.",
        "starterCode": {
          "javascript": "function singleNumber(nums) {\n  return nums.reduce((acc, curr) => acc ^ curr, 0);\n}",
          "python": "def singleNumber(nums):\n    res = 0\n    for n in nums: res ^= n\n    return res"
        },
        "testCases": [
          {
            "input": "[4,1,2,1,2]",
            "expected": "4"
          },
          {
            "input": "[2,2,1]",
            "expected": "1"
          }
        ],
        "solution": "XOR of any number with itself is 0, XOR with 0 is the number.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      },
      {
        "id": "tcs-code-2",
        "title": "Two Sum (Optimal O(N) Hash Map)",
        "difficulty": "Easy",
        "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        "starterCode": {
          "javascript": "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}",
          "python": "def twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen: return [seen[target - n], i]\n        seen[n] = i\n    return []"
        },
        "testCases": [
          {
            "input": "nums = [2,7,11,15], target = 9",
            "expected": "[0,1]"
          }
        ],
        "solution": "One-pass hash map complement search.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      }
    ]
  },
  {
    "company": "Honeywell",
    "title": "Honeywell Avionics & Embedded Engineering OA",
    "badge": "Hardware & Embedded • Precision Timing",
    "level": "Hard",
    "durationMinutes": 80,
    "cutoffScore": 34,
    "totalMarks": 50,
    "description": "Hardware, Avionics, and Embedded Systems recruitment test. Focuses on SPI/I2C protocols, bitwise operations, flight telemetry math, and robust C-style logic.",
    "codingChallenges": [
      {
        "id": "hon-code-1",
        "title": "Endianness Swap & Reverse Bits (32-bit Avionics)",
        "difficulty": "Medium",
        "description": "Convert a 32-bit integer from Big-Endian to Little-Endian representation using bit masking.",
        "starterCode": {
          "javascript": "function swapEndianness(n) {\n  return (\n    ((n & 0xFF) << 24) |\n    ((n & 0xFF00) << 8) |\n    ((n >> 8) & 0xFF00) |\n    ((n >> 24) & 0xFF)\n  ) >>> 0;\n}",
          "python": "def swapEndianness(n):\n    return (\n        ((n & 0xFF) << 24) |\n        ((n & 0xFF00) << 8) |\n        ((n >> 8) & 0xFF00) |\n        ((n >> 24) & 0xFF)\n    ) & 0xFFFFFFFF"
        },
        "testCases": [
          {
            "input": "n = 0x12345678",
            "expected": "0x78563412"
          }
        ],
        "solution": "Byte shift masking: byte 0 to 3, byte 1 to 2, byte 2 to 1, byte 3 to 0.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(1)"
      },
      {
        "id": "hon-code-2",
        "title": "Check Power of Two (Bitwise Trick)",
        "difficulty": "Easy",
        "description": "Given an integer n, return true if it is a power of two. An integer n is a power of two, if there exists an integer x such that n == 2^x.",
        "starterCode": {
          "javascript": "function isPowerOfTwo(n) {\n  return n > 0 && (n & (n - 1)) === 0;\n}",
          "python": "def isPowerOfTwo(n):\n    return n > 0 and (n & (n - 1)) == 0"
        },
        "testCases": [
          {
            "input": "n = 16",
            "expected": "true"
          },
          {
            "input": "n = 3",
            "expected": "false"
          }
        ],
        "solution": "n & (n - 1) removes the lowest set bit. For powers of two, exactly one bit is set.",
        "timeComplexity": "O(1)",
        "spaceComplexity": "O(1)"
      }
    ]
  },
  {
    "company": "Infosys",
    "title": "Infosys Specialist Programmer (SP) & DSE Assessment",
    "badge": "Moderate-Hard • Cryptarithm & Algorithms",
    "level": "Hard",
    "durationMinutes": 80,
    "cutoffScore": 34,
    "totalMarks": 50,
    "description": "Infosys SP and DSE hiring assessment. Known for permutation puzzles, cryptarithmetic equations, and dynamic programming tasks.",
    "codingChallenges": [
      {
        "id": "infy-code-1",
        "title": "Maximum Subarray (Kadane’s Algorithm)",
        "difficulty": "Medium",
        "description": "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        "starterCode": {
          "javascript": "function maxSubArray(nums) {\n  let maxSoFar = nums[0], currMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}",
          "python": "def maxSubArray(nums):\n    max_so_far = curr_max = nums[0]\n    for n in nums[1:]:\n        curr_max = max(n, curr_max + n)\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far"
        },
        "testCases": [
          {
            "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
            "expected": "6"
          }
        ],
        "solution": "Kadane’s dynamic programming algorithm tracking current and global max.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      },
      {
        "id": "infy-code-2",
        "title": "Valid Anagram Check",
        "difficulty": "Easy",
        "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        "starterCode": {
          "javascript": "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (const c of s) count[c] = (count[c] || 0) + 1;\n  for (const c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}",
          "python": "def isAnagram(s, t):\n    if len(s) != len(t): return False\n    from collections import Counter\n    return Counter(s) == Counter(t)"
        },
        "testCases": [
          {
            "input": "s = \"anagram\", t = \"nagaram\"",
            "expected": "true"
          },
          {
            "input": "s = \"rat\", t = \"car\"",
            "expected": "false"
          }
        ],
        "solution": "Frequency array or hash table comparison.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      }
    ]
  }
];

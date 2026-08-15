import { CodingProblem } from './types';

export const codingProblemsData: CodingProblem[] = [
  // ==========================================
  // 1. FRESHER / ENTRY LEVEL (0 - 1 YRS) - EASY
  // ==========================================
  {
    id: 'prob-second-largest',
    leetcodeNumber: 'GFG-Top',
    title: 'Find Second Largest Element in an Array',
    difficulty: 'Easy',
    experienceLevel: 'Fresher (0-1 yrs)',
    role: 'Software Engineer',
    category: 'Arrays & Hashing',
    description: 'Given an array of integers `nums`, find the second largest distinct element in the array. If no second largest distinct element exists (e.g. all elements are identical or array length is less than 2), return -1. Solve in optimal O(N) time with O(1) auxiliary space without sorting.',
    starterCode: {
      Python: `def findSecondLargest(nums: list[int]) -> int:
    # TODO: Write your O(N) solution with O(1) space here
    # Return second largest distinct element, or -1 if none exists
    pass`,
      JavaScript: `function findSecondLargest(nums) {
  // TODO: Write your O(N) solution with O(1) space here
  // Return second largest distinct element, or -1 if none exists
}`,
      Java: `public class Solution {
    public int findSecondLargest(int[] nums) {
        // TODO: Write your O(N) solution with O(1) space here
        return -1;
    }
}`,
      'C++': `#include <vector>
#include <climits>
using namespace std;

int findSecondLargest(vector<int>& nums) {
    // TODO: Write your O(N) solution with O(1) space here
    return -1;
}`,
      SQL: `-- Write query to find 2nd highest distinct salary from employees table
SELECT NULL;`
    },
    solutions: {
      Python: `def findSecondLargest(nums: list[int]) -> int:
    if len(nums) < 2:
        return -1
    first = second = float('-inf')
    for num in nums:
        if num > first:
            second = first
            first = num
        elif num > second and num != first:
            second = num
    return second if second != float('-inf') else -1`,
      JavaScript: `function findSecondLargest(nums) {
  if (!nums || nums.length < 2) return -1;
  let first = -Infinity;
  let second = -Infinity;
  for (const num of nums) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second === -Infinity ? -1 : second;
}`,
      Java: `public class Solution {
    public int findSecondLargest(int[] nums) {
        if (nums == null || nums.length < 2) return -1;
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        for (int num : nums) {
            if (num > first) {
                second = first;
                first = num;
            } else if (num > second && num != first) {
                second = num;
            }
        }
        return (second == Integer.MIN_VALUE) ? -1 : second;
    }
}`,
      'C++': `#include <vector>
#include <climits>
using namespace std;

int findSecondLargest(vector<int>& nums) {
    if (nums.size() < 2) return -1;
    int first = INT_MIN, second = INT_MIN;
    for (int num : nums) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num != first) {
            second = num;
        }
    }
    return (second == INT_MIN) ? -1 : second;
}`,
      SQL: `SELECT COALESCE(
  (SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1),
  -1
) AS second_highest_salary;`
    },
    hints: [
      'Can you solve this in a single pass without sorting? Sorting takes O(N log N).',
      'Track two variables: `first` (the largest element seen so far) and `second` (the second largest seen so far).',
      'When you encounter a number greater than `first`, update `second = first`, then `first = num`. If `num < first` but `num > second`, update `second = num`.'
    ],
    explanation: 'A single-pass greedy scan traverses the array once ($O(N)$ time). By initializing `first` and `second` to negative infinity and carefully updating them only on distinct values, we achieve optimal $O(1)$ auxiliary space without paying the $O(N \\log N)$ sorting cost.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'nums = [12, 35, 1, 10, 34, 1]', expected: '34' },
      { input: 'nums = [10, 5, 10]', expected: '5' },
      { input: 'nums = [10, 10, 10]', expected: '-1' }
    ]
  },
  {
    id: 'prob-binary-search',
    leetcodeNumber: 704,
    title: 'Binary Search Algorithm (Iterative & Recursive)',
    difficulty: 'Easy',
    experienceLevel: 'Fresher (0-1 yrs)',
    role: 'Software Engineer',
    category: 'Binary Search',
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return -1. Must achieve O(log N) runtime complexity by halving the search space at each iteration.',
    starterCode: {
      Python: `def binarySearch(nums: list[int], target: int) -> int:
    # TODO: Implement O(log N) Binary Search
    # Note: Use mid = low + (high - low) // 2 to prevent integer overflow
    pass`,
      JavaScript: `function binarySearch(nums, target) {
  // TODO: Implement O(log N) Binary Search
}`,
      Java: `public class Solution {
    public int binarySearch(int[] nums, int target) {
        // TODO: Implement O(log N) Binary Search
        return -1;
    }
}`,
      'C++': `#include <vector>
using namespace std;

int binarySearch(vector<int>& nums, int target) {
    // TODO: Implement O(log N) Binary Search
    return -1;
}`,
      SQL: `SELECT index_pos FROM sorted_numbers WHERE value = target;`
    },
    solutions: {
      Python: `def binarySearch(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      JavaScript: `function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      Java: `public class Solution {
    public int binarySearch(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
      'C++': `#include <vector>
using namespace std;

int binarySearch(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      SQL: `SELECT position_index FROM indexed_table WHERE item_value = 9;`
    },
    hints: [
      'Maintain two pointers: `low = 0` and `high = nums.length - 1`.',
      'Calculate the midpoint using `mid = low + (high - low) / 2` to prevent potential 32-bit integer overflow.',
      'Compare `nums[mid]` with `target`. If equal, return `mid`. If `nums[mid] < target`, discard the left half (`low = mid + 1`). Otherwise, discard the right half (`high = mid - 1`).'
    ],
    explanation: 'Binary Search operates on a sorted array by repeatedly dividing the search space in half. Because the size of the search window is halved every step ($N \\to N/2 \\to N/4 \\dots$), the maximum number of comparisons is $\\log_2 N$. Space is $O(1)$ in the iterative version.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expected: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', expected: '-1' },
      { input: 'nums = [5], target = 5', expected: '0' }
    ]
  },
  {
    id: 'prob-two-sum',
    leetcodeNumber: 1,
    title: 'Two Sum & Hash Table Lookup',
    difficulty: 'Easy',
    experienceLevel: 'Fresher (0-1 yrs)',
    role: 'Full Stack Developer',
    category: 'Arrays & Hashing',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. Solve in O(N) time using a Hash Map.',
    starterCode: {
      Python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # TODO: Implement O(N) Hash Map solution
    pass`,
      JavaScript: `function twoSum(nums, target) {
  // TODO: Implement O(N) Hash Map solution
}`,
      Java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // TODO: Implement O(N) Hash Map solution
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // TODO: Implement O(N) Hash Map solution
    return {};
}`,
      SQL: `SELECT a.id AS idx1, b.id AS idx2 
FROM numbers a 
JOIN numbers b ON a.id != b.id AND a.val + b.val = target;`
    },
    solutions: {
      Python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      JavaScript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
      Java: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      'C++': `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
      SQL: `SELECT n1.index_pos AS index1, n2.index_pos AS index2 
FROM nums n1 
JOIN nums n2 ON n1.index_pos < n2.index_pos AND n1.val + n2.val = 9 
LIMIT 1;`
    },
    hints: [
      'A brute force nested loop takes O(N^2) time. Can we use extra memory to do it in O(N)?',
      'For each number `x`, we need to know if `target - x` has already been seen in the array.',
      'Use a Hash Map mapping `value -> index`. Check if `target - x` is in the map; if so, return `[map[complement], currentIndex]`. Otherwise, insert `x` into the map.'
    ],
    explanation: 'By storing each visited element and its index in a hash table, we can verify the existence of its complementary pair in $O(1)$ average time. This brings the time complexity down from $O(N^2)$ to $O(N)$ with $O(N)$ auxiliary space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
      { input: 'nums = [3,3], target = 6', expected: '[0, 1]' }
    ]
  },
  {
    id: 'prob-best-time-stock',
    leetcodeNumber: 121,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    experienceLevel: 'Fresher (0-1 yrs)',
    role: 'Frontend Engineer',
    category: 'Arrays & Hashing',
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If you cannot achieve any profit, return 0.',
    starterCode: {
      Python: `def maxProfit(prices: list[int]) -> int:
    # TODO: Implement single pass O(N) peak-valley algorithm
    pass`,
      JavaScript: `function maxProfit(prices) {
  // TODO: Implement single pass O(N) peak-valley algorithm
}`,
      Java: `public class Solution {
    public int maxProfit(int[] prices) {
        // TODO: Implement single pass O(N) peak-valley algorithm
        return 0;
    }
}`,
      'C++': `#include <vector>
using namespace std;

int maxProfit(vector<int>& prices) {
    // TODO: Implement single pass O(N) peak-valley algorithm
    return 0;
}`,
      SQL: `SELECT MAX(p2.price - p1.price) AS max_profit 
FROM stock_prices p1 
JOIN stock_prices p2 ON p1.day < p2.day;`
    },
    solutions: {
      Python: `def maxProfit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit`,
      JavaScript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  return maxProfit;
}`,
      Java: `public class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`,
      'C++': `#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
      SQL: `SELECT COALESCE(MAX(sell.price - buy.price), 0) AS max_profit
FROM stock_prices buy
JOIN stock_prices sell ON buy.day < sell.day;`
    },
    hints: [
      'You cannot sell before you buy (future days only).',
      'As you iterate through the prices, track the minimum price seen so far (`minPrice`).',
      'Calculate `profit = currentPrice - minPrice`. If this profit is greater than `maxProfit`, update `maxProfit`.'
    ],
    explanation: 'We iterate through `prices` in a single pass ($O(N)$). At each step, we update the minimum buying price seen so far, and determine whether selling at today\'s price yields a new maximum profit.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'prices = [7,1,5,3,6,4]', expected: '5' },
      { input: 'prices = [7,6,4,3,1]', expected: '0' }
    ]
  },
  {
    id: 'prob-reverse-linked-list',
    leetcodeNumber: 206,
    title: 'Reverse a Singly Linked List',
    difficulty: 'Easy',
    experienceLevel: 'Fresher (0-1 yrs)',
    role: 'Software Engineer',
    category: 'Linked Lists',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list head. Solve in O(N) time and O(1) auxiliary space iteratively.',
    starterCode: {
      Python: `# Definition for singly-linked list node:
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def reverseList(head):
    # TODO: Reverse pointers in O(N) time, O(1) space
    pass`,
      JavaScript: `function reverseList(head) {
  // TODO: Reverse pointers in O(N) time, O(1) space
}`,
      Java: `public class Solution {
    public ListNode reverseList(ListNode head) {
        // TODO: Reverse pointers in O(N) time, O(1) space
        return null;
    }
}`,
      'C++': `ListNode* reverseList(ListNode* head) {
    // TODO: Reverse pointers in O(N) time, O(1) space
    return nullptr;
}`,
      SQL: `SELECT id, val FROM nodes ORDER BY position DESC;`
    },
    solutions: {
      Python: `def reverseList(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
      JavaScript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  return prev;
}`,
      Java: `public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
}`,
      'C++': `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`,
      SQL: `SELECT node_id, value FROM linked_list_nodes ORDER BY sequence_order DESC;`
    },
    hints: [
      'Maintain three pointers: `prev`, `curr`, and `nextNode`.',
      'Before altering `curr.next`, save `nextNode = curr.next` so you don’t lose the rest of the list.',
      'Set `curr.next = prev`, then advance `prev = curr` and `curr = nextNode`.'
    ],
    explanation: 'By iteratively pointing `curr.next` backwards to `prev`, we traverse the list exactly once. When `curr` reaches `null`, `prev` points to the new head of the reversed linked list.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'head = [1,2,3,4,5]', expected: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', expected: '[2,1]' },
      { input: 'head = []', expected: '[]' }
    ]
  },
  {
    id: 'prob-valid-parentheses',
    leetcodeNumber: 20,
    title: 'Valid Parentheses & Bracket Matching',
    difficulty: 'Easy',
    experienceLevel: 'Fresher (0-1 yrs)',
    role: 'Frontend Engineer',
    category: 'Stack & Queue',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order using a Stack.',
    starterCode: {
      Python: `def isValid(s: str) -> bool:
    # TODO: Implement stack-based bracket validator in O(N)
    pass`,
      JavaScript: `function isValid(s) {
  // TODO: Implement stack-based bracket validator in O(N)
}`,
      Java: `import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        // TODO: Implement stack-based bracket validator in O(N)
        return false;
    }
}`,
      'C++': `#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    // TODO: Implement stack-based bracket validator in O(N)
    return false;
}`,
      SQL: `SELECT * FROM syntax_validation WHERE is_valid_brackets = TRUE;`
    },
    solutions: {
      Python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack`,
      JavaScript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (map[char]) {
      const top = stack.length ? stack.pop() : '#';
      if (top !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      Java: `import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      'C++': `#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else {
            if (st.empty() || st.top() != c) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
      SQL: `SELECT code_id, CASE WHEN check_brackets(code_text) = 1 THEN 'VALID' ELSE 'INVALID' END AS result FROM code_blocks;`
    },
    hints: [
      'A Last-In First-Out (LIFO) Stack data structure is ideal for matching nested pairs.',
      'When an opening bracket is encountered, push its expected closing counterpart onto the stack.',
      'When a closing bracket is encountered, pop from the stack and verify that it matches. At the end, the stack must be empty.'
    ],
    explanation: 'Iterate through the string. Pushing opening brackets and popping matching closing brackets ensures that inner nested scopes are closed before outer ones, achieving $O(N)$ runtime.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { input: 's = "()[]{}"', expected: 'true' },
      { input: 's = "(]"', expected: 'false' },
      { input: 's = "([)]"', expected: 'false' }
    ]
  },

  // ==========================================
  // 2. MID-LEVEL (1 - 3 YRS) - MEDIUM
  // ==========================================
  {
    id: 'prob-longest-substring',
    leetcodeNumber: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    experienceLevel: 'Mid-Level (1-3 yrs)',
    role: 'Frontend Engineer',
    category: 'Sliding Window',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters using the Sliding Window technique with an auxiliary Hash Map / Set.',
    starterCode: {
      Python: `def lengthOfLongestSubstring(s: str) -> int:
    # TODO: Implement Sliding Window in O(N) time
    pass`,
      JavaScript: `function lengthOfLongestSubstring(s) {
  // TODO: Implement Sliding Window in O(N) time
}`,
      Java: `public class Solution {
    public int lengthOfLongestSubstring(String s) {
        // TODO: Implement Sliding Window in O(N) time
        return 0;
    }
}`,
      'C++': `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // TODO: Implement Sliding Window in O(N) time
    return 0;
}`,
      SQL: `SELECT s, CHAR_LENGTH(s) FROM text_table;`
    },
    solutions: {
      Python: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      JavaScript: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      Java: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      'C++': `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    vector<int> charIndex(128, -1);
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        if (charIndex[s[right]] >= left) {
            left = charIndex[s[right]] + 1;
        }
        charIndex[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      SQL: `SELECT s, CHAR_LENGTH(s) FROM text_table;`
    },
    hints: [
      'Use a sliding window defined by two pointers `[left, right]`.',
      'Store the last seen index of each character in a Hash Map.',
      'When `s[right]` is already inside the current window, advance `left` to `lastIndex + 1`.'
    ],
    explanation: 'The two-pointer sliding window traverses the string in $O(N)$ time. By storing each character\'s latest index, `left` skips directly past duplicates without requiring a slow inner scan.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M)) where M is character set size',
    testCases: [
      { input: 's = "abcabcbb"', expected: '3' },
      { input: 's = "bbbbb"', expected: '1' },
      { input: 's = "pwwkew"', expected: '3' }
    ]
  },
  {
    id: 'prob-3sum',
    leetcodeNumber: 15,
    title: '3Sum (Two Pointers & Triplet Duplicates)',
    difficulty: 'Medium',
    experienceLevel: 'Mid-Level (1-3 yrs)',
    role: 'Software Engineer',
    category: 'Two Pointers',
    description: 'Given an integer array `nums`, return all the unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.',
    starterCode: {
      Python: `def threeSum(nums: list[int]) -> list[list[int]]:
    # TODO: Sort and use Two Pointers in O(N^2) time
    pass`,
      JavaScript: `function threeSum(nums) {
  // TODO: Sort and use Two Pointers in O(N^2) time
}`,
      Java: `import java.util.List;

public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // TODO: Sort and use Two Pointers in O(N^2) time
        return null;
    }
}`,
      'C++': `#include <vector>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    // TODO: Sort and use Two Pointers in O(N^2) time
    return {};
}`,
      SQL: `SELECT DISTINCT a.val, b.val, c.val 
FROM nums a JOIN nums b ON a.id < b.id JOIN nums c ON b.id < c.id 
WHERE a.val + b.val + c.val = 0;`
    },
    solutions: {
      Python: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if total == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l + 1]:
                    l += 1
                while l < r and nums[r] == nums[r - 1]:
                    r -= 1
                l += 1
                r -= 1
            elif total < 0:
                l += 1
            else:
                r -= 1
    return res`,
      JavaScript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }
  return res;
}`,
      Java: `import java.util.*;

public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++;
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    r--;
                }
            }
        }
        return res;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    int n = nums.size();
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = n - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.push_back({nums[i], nums[l], nums[r]});
                while (l < r && nums[l] == nums[l + 1]) l++;
                while (l < r && nums[r] == nums[r - 1]) r--;
                l++;
                r--;
            } else if (sum < 0) {
                l++;
            } else {
                r--;
            }
        }
    }
    return res;
}`,
      SQL: `SELECT DISTINCT a.val, b.val, c.val FROM nums a JOIN nums b ON a.id < b.id JOIN nums c ON b.id < c.id WHERE a.val + b.val + c.val = 0;`
    },
    hints: [
      'Sorting the array first in O(N log N) makes handling duplicate triplets straightforward.',
      'Fix the first element `nums[i]`, and use two pointers `left = i + 1` and `right = n - 1` to find pairs adding up to `-nums[i]`.',
      'Skip duplicate values for both `i`, `left`, and `right` after finding a valid triplet.'
    ],
    explanation: 'Sorting allows us to use two pointers to find two-sum pairs in $O(N)$ for each of the $N$ possible first elements, giving an overall $O(N^2)$ time complexity and avoiding duplicate subsets.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1) auxiliary (ignoring output)',
    testCases: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', expected: '[]' },
      { input: 'nums = [0,0,0]', expected: '[[0,0,0]]' }
    ]
  },
  {
    id: 'prob-search-rotated-array',
    leetcodeNumber: 33,
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    experienceLevel: 'Mid-Level (1-3 yrs)',
    role: 'Backend Engineer',
    category: 'Binary Search',
    description: 'There is an integer array `nums` sorted in ascending order (with distinct values) that has been rotated at an unknown pivot index. Given `nums` and a target value `target`, return the index of `target` if it is in `nums`, or -1 if it is not. You must write an algorithm with O(log N) runtime complexity.',
    starterCode: {
      Python: `def search(nums: list[int], target: int) -> int:
    # TODO: Implement O(log N) modified binary search
    pass`,
      JavaScript: `function search(nums, target) {
  // TODO: Implement O(log N) modified binary search
}`,
      Java: `public class Solution {
    public int search(int[] nums, int target) {
        // TODO: Implement O(log N) modified binary search
        return -1;
    }
}`,
      'C++': `#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    // TODO: Implement O(log N) modified binary search
    return -1;
}`,
      SQL: `SELECT position FROM array_store WHERE val = target;`
    },
    solutions: {
      Python: `def search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid
        # Left half is sorted
        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1`,
      JavaScript: `function search(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[low] <= nums[mid]) {
      if (nums[low] <= target && target < nums[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }
  return -1;
}`,
      Java: `public class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return -1;
    }
}`,
      'C++': `#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}`,
      SQL: `SELECT index_pos FROM rotated_array WHERE item_val = 0;`
    },
    hints: [
      'In a rotated sorted array, at least one half (left or right of `mid`) is always sorted.',
      'Check if `nums[low] <= nums[mid]` to determine if the left half is sorted.',
      'If the target lies within the sorted half’s boundary, narrow your search to that half; otherwise search the other half.'
    ],
    explanation: 'At every step of binary search, one of the two halves is guaranteed to be strictly sorted. By determining which half is sorted and whether `target` falls within its boundaries, we can prune half the remaining search space in $O(1)$ time per step.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', expected: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', expected: '-1' },
      { input: 'nums = [1], target = 0', expected: '-1' }
    ]
  },
  {
    id: 'prob-lru-cache',
    leetcodeNumber: 146,
    title: 'LRU Cache Design (Doubly Linked List + Map)',
    difficulty: 'Medium',
    experienceLevel: 'Mid-Level (1-3 yrs)',
    role: 'Backend Engineer',
    category: 'System & Concurrency',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for both `get` and `put` operations using a Doubly Linked List and Hash Table.',
    starterCode: {
      Python: `class LRUCache:
    def __init__(self, capacity: int):
        # TODO: Initialize DLL and HashMap
        pass

    def get(self, key: int) -> int:
        # TODO: Return value and move node to head in O(1)
        return -1

    def put(self, key: int, value: int) -> None:
        # TODO: Insert/update value and evict LRU node if over capacity in O(1)
        pass`,
      JavaScript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
  }
  get(key) {
    // TODO: O(1) get & touch
    return -1;
  }
  put(key, value) {
    // TODO: O(1) put & evict
  }
}`,
      Java: `public class LRUCache {
    public LRUCache(int capacity) {
        // TODO: Init
    }
    public int get(int key) {
        return -1;
    }
    public void put(int key, int value) {
    }
}`,
      'C++': `class LRUCache {
public:
    LRUCache(int capacity) {}
    int get(int key) { return -1; }
    void put(int key, int value) {}
};`,
      SQL: `SELECT * FROM cache_store ORDER BY last_accessed DESC LIMIT 10;`
    },
    solutions: {
      Python: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        prev, nxt = node.prev, node.next
        prev.next = nxt
        nxt.prev = prev

    def _add_to_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add_to_front(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._add_to_front(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
      JavaScript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}`,
      Java: `import java.util.HashMap;
import java.util.Map;

class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
    private int cap;
    private Map<Integer, Node> map = new HashMap<>();
    private Node head = new Node(0, 0), tail = new Node(0, 0);

    public LRUCache(int capacity) {
        cap = capacity;
        head.next = tail;
        tail.prev = head;
    }
    private void remove(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }
    private void insertFront(Node n) { n.next = head.next; n.prev = head; head.next.prev = n; head.next = n; }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node n = map.get(key);
        remove(n);
        insertFront(n);
        return n.val;
    }
    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        Node n = new Node(key, value);
        map.put(key, n);
        insertFront(n);
        if (map.size() > cap) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }
}`,
      'C++': `#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int, int>> l;
    unordered_map<int, list<pair<int, int>>::iterator> m;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (m.find(key) == m.end()) return -1;
        l.splice(l.begin(), l, m[key]);
        return m[key]->second;
    }
    void put(int key, int value) {
        if (m.find(key) != m.end()) {
            l.splice(l.begin(), l, m[key]);
            m[key]->second = value;
            return;
        }
        if (l.size() == cap) {
            int delKey = l.back().first;
            l.pop_back();
            m.erase(delKey);
        }
        l.emplace_front(key, value);
        m[key] = l.begin();
    }
};`,
      SQL: `SELECT key, value FROM lru_cache_table ORDER BY last_accessed_at DESC LIMIT 10;`
    },
    hints: [
      'A Hash Map provides O(1) lookup by key, but cannot reorder elements in O(1).',
      'A Doubly Linked List can insert and remove nodes in O(1) given a node reference, but has O(N) search.',
      'Combining HashMap (key -> Node) with a Doubly Linked List (Head = Most Recent, Tail = Least Recent) satisfies both constraints in O(1).'
    ],
    explanation: 'By combining a doubly linked list with pseudo-head and pseudo-tail dummy nodes alongside a hash table, node insertions, removals, and relocations to the front execute in strict $O(1)$ time.',
    timeComplexity: 'O(1) for get and put',
    spaceComplexity: 'O(capacity)',
    testCases: [
      { input: 'put(1,1), put(2,2), get(1)', expected: '1' },
      { input: 'put(3,3), get(2)', expected: '-1' },
      { input: 'put(4,4), get(1), get(3), get(4)', expected: '-1, 3, 4' }
    ]
  },
  {
    id: 'prob-coin-change',
    leetcodeNumber: 322,
    title: 'Coin Change (Bottom-Up Dynamic Programming)',
    difficulty: 'Medium',
    experienceLevel: 'Mid-Level (1-3 yrs)',
    role: 'Full Stack Developer',
    category: 'Dynamic Programming',
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.',
    starterCode: {
      Python: `def coinChange(coins: list[int], amount: int) -> int:
    # TODO: Implement 1D DP table in O(amount * len(coins))
    pass`,
      JavaScript: `function coinChange(coins, amount) {
  // TODO: Implement 1D DP table in O(amount * len(coins))
}`,
      Java: `public class Solution {
    public int coinChange(int[] coins, int amount) {
        // TODO: Implement 1D DP table in O(amount * len(coins))
        return -1;
    }
}`,
      'C++': `#include <vector>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    // TODO: Implement 1D DP table in O(amount * len(coins))
    return -1;
}`,
      SQL: `SELECT MIN(coin_count) FROM coin_combinations WHERE total_sum = 11;`
    },
    solutions: {
      Python: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      JavaScript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins) {
    for (let x = coin; x <= amount; x++) {
      dp[x] = Math.min(dp[x], dp[x - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      Java: `import java.util.Arrays;

public class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int coin : coins) {
            for (int x = coin; x <= amount; x++) {
                dp[x] = Math.min(dp[x], dp[x - coin] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int coin : coins) {
        for (int x = coin; x <= amount; x++) {
            dp[x] = min(dp[x], dp[x - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      SQL: `SELECT coin_val, MIN(count) FROM coin_combinations WHERE total = amount GROUP BY coin_val;`
    },
    hints: [
      'Define `dp[i]` as the minimum coins needed to make amount `i`.',
      'Base case: `dp[0] = 0`. Initialize all other `dp[i] = infinity`.',
      'Transition: For each coin, `dp[i] = min(dp[i], dp[i - coin] + 1)`.'
    ],
    explanation: 'Using bottom-up 1D dynamic programming, we build the solution for each sub-amount from $1$ to $amount$. This evaluates in $O(N \\times \\text{amount})$ time and requires only $O(\\text{amount})$ space.',
    timeComplexity: 'O(amount * coins.length)',
    spaceComplexity: 'O(amount)',
    testCases: [
      { input: 'coins = [1,2,5], amount = 11', expected: '3' },
      { input: 'coins = [2], amount = 3', expected: '-1' },
      { input: 'coins = [1], amount = 0', expected: '0' }
    ]
  },
  {
    id: 'prob-sql-dense-rank',
    leetcodeNumber: 185,
    title: 'SQL: Department Top 3 Highest Earners (DENSE_RANK)',
    difficulty: 'Medium',
    experienceLevel: 'Mid-Level (1-3 yrs)',
    role: 'Data Engineer',
    category: 'Database & SQL',
    description: 'Write an SQL query to find employees who earn the top 3 unique salaries in each department using the `DENSE_RANK()` window function over partition groups.',
    starterCode: {
      Python: `import pandas as pd

def top3Earners(employee: pd.DataFrame, department: pd.DataFrame) -> pd.DataFrame:
    # TODO: Merge, rank by salary dense descending, filter rank <= 3
    pass`,
      JavaScript: `// JS Data transformation equivalent
function top3Earners(employees, departments) {
  // TODO: Group by department and rank top 3
}`,
      Java: `// Java Streams ranking implementation
public class Solution {}`,
      'C++': `// C++ implementation`,
      SQL: `-- Write query using DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...)
SELECT NULL AS Department, NULL AS Employee, NULL AS Salary;`
    },
    solutions: {
      Python: `import pandas as pd

def top3Earners(employee: pd.DataFrame, department: pd.DataFrame) -> pd.DataFrame:
    df = employee.merge(department, left_on='departmentId', right_on='id', suffixes=('', '_dept'))
    df['rnk'] = df.groupby('departmentId')['salary'].rank(method='dense', ascending=False)
    result = df[df['rnk'] <= 3][['name_dept', 'name', 'salary']]
    result.columns = ['Department', 'Employee', 'Salary']
    return result`,
      JavaScript: `function top3Earners(employees, departments) {
  const deptMap = new Map(departments.map(d => [d.id, d.name]));
  const grouped = {};
  for (const e of employees) {
    if (!grouped[e.departmentId]) grouped[e.departmentId] = [];
    grouped[e.departmentId].push(e);
  }
  const result = [];
  for (const deptId in grouped) {
    const sorted = grouped[deptId].sort((a, b) => b.salary - a.salary);
    const uniqueSalaries = [...new Set(sorted.map(s => s.salary))].slice(0, 3);
    for (const emp of sorted) {
      if (uniqueSalaries.includes(emp.salary)) {
        result.push({ Department: deptMap.get(Number(deptId)), Employee: emp.name, Salary: emp.salary });
      }
    }
  }
  return result;
}`,
      Java: `// Stream solution`,
      'C++': `// C++ solution`,
      SQL: `WITH RankedSalaries AS (
  SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary,
    DENSE_RANK() OVER (
      PARTITION BY e.departmentId 
      ORDER BY e.salary DESC
    ) AS rnk
  FROM Employee e
  JOIN Department d ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM RankedSalaries
WHERE rnk <= 3;`
    },
    hints: [
      'Why `DENSE_RANK()` instead of `RANK()` or `ROW_NUMBER()`? Ties in salary must share the same rank without creating gaps.',
      'Use a Common Table Expression (CTE) to calculate the rank first.',
      'In the outer query, filter `WHERE rnk <= 3`.'
    ],
    explanation: '`DENSE_RANK()` partitions the records by `departmentId` and ranks salaries in descending order without skipping rank numbers on duplicate salaries, cleanly retrieving the top 3 distinct tiers.',
    timeComplexity: 'O(N log N) for partitioned sorting',
    spaceComplexity: 'O(N)',
    testCases: [
      { input: 'Employee: [Joe, 85000, IT], [Henry, 80000, IT], [Sam, 60000, IT], [Max, 90000, IT]', expected: 'Max (90k), Joe (85k), Henry (80k)' }
    ]
  },

  // ==========================================
  // 3. EXPERIENCED / SENIOR LEVEL (3+ YRS) - HARD
  // ==========================================
  {
    id: 'prob-trapping-rain-water',
    leetcodeNumber: 42,
    title: 'Trapping Rain Water (Two Pointers & Monotonic Space)',
    difficulty: 'Hard',
    experienceLevel: 'Experienced (3+ yrs)',
    role: 'Backend Lead / SDE-2',
    category: 'Two Pointers',
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining. Solve in optimal O(N) time and O(1) auxiliary space using Two Pointers.',
    starterCode: {
      Python: `def trap(height: list[int]) -> int:
    # TODO: Implement O(N) time, O(1) space Two Pointer approach
    pass`,
      JavaScript: `function trap(height) {
  // TODO: Implement O(N) time, O(1) space Two Pointer approach
}`,
      Java: `public class Solution {
    public int trap(int[] height) {
        // TODO: Implement O(N) time, O(1) space Two Pointer approach
        return 0;
    }
}`,
      'C++': `#include <vector>
using namespace std;

int trap(vector<int>& height) {
    // TODO: Implement O(N) time, O(1) space Two Pointer approach
    return 0;
}`,
      SQL: `SELECT SUM(water_volume) FROM elevation_data;`
    },
    solutions: {
      Python: `def trap(height: list[int]) -> int:
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    return water`,
      JavaScript: `function trap(height) {
  if (!height || height.length === 0) return 0;
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
      Java: `public class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) return 0;
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
      'C++': `#include <vector>
#include <algorithm>
using namespace std;

int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
      SQL: `SELECT SUM(trapped_water) FROM elevation_map;`
    },
    hints: [
      'The trapped water above any bar `i` is determined by `min(maxLeft, maxRight) - height[i]`.',
      'Instead of precomputing prefix and suffix arrays in O(N) extra space, can we move pointers inward from both ends?',
      'If `height[left] < height[right]`, we are guaranteed that `leftMax < rightMax`, meaning the bottleneck is strictly `leftMax`.'
    ],
    explanation: 'By moving the pointer with the smaller current height inward, we only ever depend on the bottleneck boundary. This computes the accumulated water in a single $O(N)$ pass with zero auxiliary array allocations ($O(1)$ space).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
      { input: 'height = [4,2,0,3,2,5]', expected: '9' }
    ]
  },
  {
    id: 'prob-median-sorted-arrays',
    leetcodeNumber: 4,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    experienceLevel: 'Experienced (3+ yrs)',
    role: 'Staff AI / Systems Engineer',
    category: 'Binary Search',
    description: 'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(min(m, n))) by performing binary search over partitions.',
    starterCode: {
      Python: `def findMedianSortedArrays(nums1: list[int], nums2: list[int]) -> float:
    # TODO: Implement O(log(min(m,n))) Binary Search Partitioning
    pass`,
      JavaScript: `function findMedianSortedArrays(nums1, nums2) {
  // TODO: Implement O(log(min(m,n))) Binary Search Partitioning
}`,
      Java: `public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // TODO: Implement O(log(min(m,n))) Binary Search Partitioning
        return 0.0;
    }
}`,
      'C++': `#include <vector>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // TODO: Implement O(log(min(m,n))) Binary Search Partitioning
    return 0.0;
}`,
      SQL: `SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY val) FROM (SELECT val FROM nums1 UNION ALL SELECT val FROM nums2);`
    },
    solutions: {
      Python: `def findMedianSortedArrays(nums1: list[int], nums2: list[int]) -> float:
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    low, high = 0, m
    while low <= high:
        partitionX = (low + high) // 2
        partitionY = (m + n + 1) // 2 - partitionX
        
        maxLeftX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
        minRightX = float('inf') if partitionX == m else nums1[partitionX]
        
        maxLeftY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
        minRightY = float('inf') if partitionY == n else nums2[partitionY]
        
        if maxLeftX <= minRightY and maxLeftY <= minRightX:
            if (m + n) % 2 == 0:
                return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0
            else:
                return float(max(maxLeftX, maxLeftY))
        elif maxLeftX > minRightY:
            high = partitionX - 1
        else:
            low = partitionX + 1
    return 0.0`,
      JavaScript: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let low = 0, high = m;
  while (low <= high) {
    const partitionX = Math.floor((low + high) / 2);
    const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
    
    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === m ? Infinity : nums1[partitionX];
    
    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === n ? Infinity : nums2[partitionY];
    
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
      } else {
        return Math.max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
  return 0.0;
}`,
      Java: `public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.length, n = nums2.length;
        int low = 0, high = m;
        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;
            
            int maxLeftX = partitionX == 0 ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minRightX = partitionX == m ? Integer.MAX_VALUE : nums1[partitionX];
            
            int maxLeftY = partitionY == 0 ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minRightY = partitionY == n ? Integer.MAX_VALUE : nums2[partitionY];
            
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((m + n) % 2 == 0) {
                    return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2.0;
                } else {
                    return Math.max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }
        return 0.0;
    }
}`,
      'C++': `#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
    int m = nums1.size(), n = nums2.size();
    int low = 0, high = m;
    while (low <= high) {
        int partitionX = (low + high) / 2;
        int partitionY = (m + n + 1) / 2 - partitionX;
        
        int maxLeftX = partitionX == 0 ? INT_MIN : nums1[partitionX - 1];
        int minRightX = partitionX == m ? INT_MAX : nums1[partitionX];
        
        int maxLeftY = partitionY == 0 ? INT_MIN : nums2[partitionY - 1];
        int minRightY = partitionY == n ? INT_MAX : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 == 0) {
                return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0;
            } else {
                return max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            high = partitionX - 1;
        } else {
            low = partitionX + 1;
        }
    }
    return 0.0;
}`,
      SQL: `SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY val) FROM (SELECT val FROM nums1 UNION ALL SELECT val FROM nums2);`
    },
    hints: [
      'Always binary search on the shorter array so the search space is bounded by O(log(min(m, n))).',
      'Partition both arrays such that the total number of elements in the left partitions equals the total number in the right partitions.',
      'A valid partition occurs when `maxLeftX <= minRightY` and `maxLeftY <= minRightX`.'
    ],
    explanation: 'We divide the combined set of elements into equal left and right halves by performing binary search solely on the smaller array\'s cut position, achieving logarithmic $O(\\log(\\min(m, n)))$ runtime.',
    timeComplexity: 'O(log(min(m, n)))',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'nums1 = [1,3], nums2 = [2]', expected: '2.0' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', expected: '2.5' }
    ]
  },
  {
    id: 'prob-merge-k-lists',
    leetcodeNumber: 23,
    title: 'Merge K Sorted Lists (Min-Heap Priority Queue)',
    difficulty: 'Hard',
    experienceLevel: 'Experienced (3+ yrs)',
    role: 'Backend Lead / SDE-2',
    category: 'Heaps & Priority Queues',
    description: 'You are given an array of `k` linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it using a Min-Heap / Priority Queue in O(N log K) time.',
    starterCode: {
      Python: `# Definition for singly-linked list:
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def mergeKLists(lists: list):
    # TODO: Implement Min-Heap priority queue merging in O(N log K)
    pass`,
      JavaScript: `function mergeKLists(lists) {
  // TODO: Implement Min-Heap priority queue merging in O(N log K)
}`,
      Java: `public class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // TODO: Implement PriorityQueue in O(N log K)
        return null;
    }
}`,
      'C++': `ListNode* mergeKLists(vector<ListNode*>& lists) {
    // TODO: Implement PriorityQueue in O(N log K)
    return nullptr;
}`,
      SQL: `SELECT val FROM (SELECT val FROM list1 UNION ALL SELECT val FROM list2) ORDER BY val;`
    },
    solutions: {
      Python: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeKLists(lists: list):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
            
    dummy = ListNode(0)
    curr = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
      JavaScript: `function mergeKLists(lists) {
  const nodes = [];
  for (const l of lists) {
    let curr = l;
    while (curr) {
      nodes.push(curr.val);
      curr = curr.next;
    }
  }
  nodes.sort((a, b) => a - b);
  const dummy = { val: 0, next: null };
  let curr = dummy;
  for (const val of nodes) {
    curr.next = { val, next: null };
    curr = curr.next;
  }
  return dummy.next;
}`,
      Java: `import java.util.PriorityQueue;

public class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode node : lists) {
            if (node != null) pq.add(node);
        }
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (!pq.isEmpty()) {
            ListNode node = pq.poll();
            curr.next = node;
            curr = curr.next;
            if (node.next != null) pq.add(node.next);
        }
        return dummy.next;
    }
}`,
      'C++': `#include <vector>
#include <queue>
using namespace std;

ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto comp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(comp)> pq(comp);
    for (auto list : lists) {
        if (list) pq.push(list);
    }
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (!pq.empty()) {
        ListNode* node = pq.top();
        pq.pop();
        curr->next = node;
        curr = curr->next;
        if (node->next) pq.push(node->next);
    }
    return dummy.next;
}`,
      SQL: `SELECT val FROM (SELECT val FROM list1 UNION ALL SELECT val FROM list2) ORDER BY val;`
    },
    hints: [
      'Maintain a Min-Heap of size K containing the current head node of each of the K lists.',
      'Pop the smallest node, attach it to your output list, and push its `next` node into the heap.',
      'Every insertion and extraction on the heap of size K takes O(log K) time.'
    ],
    explanation: 'With $N$ total elements distributed across $K$ lists, maintaining a priority queue of size $K$ guarantees $O(\\log K)$ operations per element, yielding an overall $O(N \\log K)$ runtime and $O(K)$ space.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    testCases: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', expected: '[]' }
    ]
  }
];

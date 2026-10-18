import { TopicAptitudeModule } from '../types';
import { AptitudeQuestion } from './aptitudeQuestions';

export const TOPIC_APTITUDE_MODULES: TopicAptitudeModule[] = [
  {
    "id": "topic-numbers",
    "topicNumber": 1,
    "title": "Numbers & Number Systems",
    "difficulty": "Easy to Medium",
    "overview": "Natural numbers, prime numbers, composite numbers, and integers all are part of the number system which is part of any placement test and is included in essential topics.",
    "learnTitle": "Learn - Numbers",
    "practiceTitle": "Practice - Numbers MCQ",
    "quickFormulas": [
      "Divisibility by 8: Last 3 digits divisible by 8",
      "Divisibility by 9 / 3: Sum of all digits divisible by 9 or 3",
      "Divisibility by 11: |Sum of odd digits - Sum of even digits| is 0 or multiple of 11",
      "Unit digit cyclicity: 2, 3, 7, 8 have cyclicity 4; 4, 9 have cyclicity 2; 0, 1, 5, 6 have cyclicity 1",
      "Remainder Theorem: If f(x) is divided by (x - a), remainder is f(a)"
    ],
    "concepts": [
      {
        "heading": "Classification of Numbers",
        "content": "Natural numbers (1, 2, 3...), Whole numbers (0, 1, 2...), Integers (..., -2, -1, 0, 1, 2...), Prime numbers (numbers with only 2 factors: 1 and itself), Composite numbers (more than 2 factors), and Co-prime numbers (pairs having GCD = 1).",
        "keyFormulas": [
          "Sum of first n natural numbers = [n(n + 1)] / 2",
          "Sum of first n even numbers = n(n + 1)",
          "Sum of first n odd numbers = n^2",
          "Sum of squares of first n natural numbers = [n(n + 1)(2n + 1)] / 6"
        ],
        "solvedExample": {
          "question": "Find the unit digit in (7^95 - 3^58).",
          "steps": [
            "For 7^95: Cyclicity of 7 is 4. 95 mod 4 = 3 -> 7^3 = 343 -> unit digit is 3.",
            "For 3^58: Cyclicity of 3 is 4. 58 mod 4 = 2 -> 3^2 = 9 -> unit digit is 9.",
            "Unit digit calculation: (3 - 9). Since 3 < 9, borrow 10: 13 - 9 = 4."
          ],
          "answer": "The unit digit is 4."
        }
      },
      {
        "heading": "Divisibility and Remainder Rules",
        "content": "A number is divisible by composite N = a * b (where gcd(a, b) = 1) if it is divisible by both a and b. For example, 72 requires divisibility by 8 and 9; 88 requires 8 and 11.",
        "keyFormulas": [
          "Dividend = (Divisor * Quotient) + Remainder",
          "Euler Totient: If gcd(a, m) = 1, a^φ(m) ≡ 1 (mod m)"
        ],
        "solvedExample": {
          "question": "What is the remainder when (2^100) is divided by 7?",
          "steps": [
            "2^3 = 8 ≡ 1 (mod 7).",
            "100 = 3 * 33 + 1.",
            "2^100 = (2^3)^33 * 2^1 ≡ (1)^33 * 2 ≡ 2 (mod 7)."
          ],
          "answer": "The remainder is 2."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "num-mcq-1",
        "company": "TCS",
        "category": "Quantitative Aptitude",
        "topic": "Numbers",
        "difficulty": "Easy",
        "question": "What is the sum of all prime numbers between 20 and 40?",
        "options": [
          "120",
          "118",
          "122",
          "125"
        ],
        "correctIndex": 0,
        "explanation": "Prime numbers between 20 and 40 are: 23, 29, 31, 37. Sum = 23 + 29 + 31 + 37 = 120.",
        "shortcutFormula": "Sum(23, 29, 31, 37) = 120",
        "examSource": "TCS NQT Numbers MCQ"
      },
      {
        "id": "num-mcq-2",
        "company": "Infosys",
        "category": "Quantitative Aptitude",
        "topic": "Numbers",
        "difficulty": "Medium",
        "question": "If the 6-digit number 45321x is divisible by 9, what is the value of x?",
        "options": [
          "3",
          "2",
          "4",
          "6"
        ],
        "correctIndex": 0,
        "explanation": "Sum of digits = 4 + 5 + 3 + 2 + 1 + x = 15 + x. For 15 + x to be divisible by 9, x must be 3 (15 + 3 = 18).",
        "shortcutFormula": "Sum mod 9 = 0",
        "examSource": "Infosys DSE Numbers MCQ"
      },
      {
        "id": "num-mcq-3",
        "company": "Google",
        "category": "Quantitative Aptitude",
        "topic": "Numbers",
        "difficulty": "Medium",
        "question": "Find the number of zeros at the end of 100! (100 factorial).",
        "options": [
          "24",
          "20",
          "25",
          "22"
        ],
        "correctIndex": 0,
        "explanation": "Number of trailing zeros = floor(100/5) + floor(100/25) = 20 + 4 = 24 zeros.",
        "shortcutFormula": "Trailing Zeros = floor(N/5) + floor(N/25) + floor(N/125)...",
        "examSource": "Google Quantitative OA"
      }
    ]
  },
  {
    "id": "topic-percentage",
    "topicNumber": 2,
    "title": "Percentages",
    "difficulty": "Easy to Medium",
    "overview": "Many people tend to struggle with percentages as there are many things included in them such as the calculation of complex concepts of profit and loss, compound interest, discounts, etc. But it is a very important topic in the list of aptitude tests required for placement so you must understand it properly and practice thoroughly.",
    "learnTitle": "Learn - Percentages",
    "practiceTitle": "Practice - Percentages MCQ",
    "quickFormulas": [
      "Percentage = (Value / Total) * 100",
      "Successive Percentage Change = a + b + (a * b)/100",
      "If A is r% more than B, B is [r / (100 + r)] * 100% less than A",
      "If A is r% less than B, B is [r / (100 - r)] * 100% more than A"
    ],
    "concepts": [
      {
        "heading": "Fraction to Percentage Equivalents",
        "content": "Memorizing basic fractions: 1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/5 = 20%, 1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%, 1/11 = 9.09%, 1/12 = 8.33%.",
        "keyFormulas": [
          "Multiplier for x% increase = (1 + x/100)",
          "Multiplier for x% decrease = (1 - x/100)"
        ],
        "solvedExample": {
          "question": "If the price of petrol increases by 25%, by what percentage must a driver reduce consumption so that total expenditure remains unchanged?",
          "steps": [
            "Using the inverse percentage formula: Reduction % = [r / (100 + r)] * 100%.",
            "Here r = 25%.",
            "Reduction % = [25 / (100 + 25)] * 100% = (25 / 125) * 100% = 1/5 * 100% = 20%."
          ],
          "answer": "Consumption must be reduced by 20%."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "pct-mcq-1",
        "company": "Microsoft",
        "category": "Quantitative Aptitude",
        "topic": "Percentage",
        "difficulty": "Easy",
        "question": "Two numbers are respectively 20% and 50% more than a third number. What percentage is the first number of the second number?",
        "options": [
          "80%",
          "75%",
          "85%",
          "90%"
        ],
        "correctIndex": 0,
        "explanation": "Let third number = 100. First = 120, Second = 150. First/Second = 120 / 150 = 4/5 = 80%.",
        "shortcutFormula": "(120/150) * 100% = 80%",
        "examSource": "Microsoft Online Assessment"
      },
      {
        "id": "pct-mcq-2",
        "company": "Amazon",
        "category": "Quantitative Aptitude",
        "topic": "Percentage",
        "difficulty": "Medium",
        "question": "A tech worker spends 40% of salary on rent, 20% of the remainder on tech gadgets, and saves $720. What is the total monthly salary?",
        "options": [
          "$1,500",
          "$1,800",
          "$1,600",
          "$2,000"
        ],
        "correctIndex": 0,
        "explanation": "After rent: 60% remains. After gadgets (20% of 60% = 12%): 48% remains. 48% of Salary = $720 -> Salary = 720 / 0.48 = $1,500.",
        "shortcutFormula": "Salary = 720 / (0.6 * 0.8) = 720 / 0.48 = $1,500",
        "examSource": "Amazon SDE Placement"
      }
    ]
  },
  {
    "id": "topic-profit-loss",
    "topicNumber": 3,
    "title": "Profit and Loss",
    "difficulty": "Easy to Medium",
    "overview": "Another crucial topic in the quantitative aptitude section is Profit and loss and the candidate who wants to successfully clear the aptitude exam must have a better understanding of this particular topic. Also, many different types of questions are asked regarding this topic, therefore have your concepts cleared beforehand.",
    "learnTitle": "Learn - Profit and Loss",
    "practiceTitle": "Practice - Profit and Loss MCQ",
    "quickFormulas": [
      "Profit = SP - CP, Loss = CP - SP",
      "Profit % = (Profit / CP) * 100, Loss % = (Loss / CP) * 100",
      "SP = CP * (100 + P%) / 100 or CP * (100 - L%) / 100",
      "Marked Price (MP) Discount: SP = MP * (100 - D%) / 100",
      "False Weights: Profit % = [Error / (True Value - Error)] * 100%"
    ],
    "concepts": [
      {
        "heading": "Markup, Discount & Real Profit",
        "content": "Markup is calculated on Cost Price (CP), whereas Discount is always calculated on Marked Price (MP). The bridge between MP and CP is the selling price SP.",
        "keyFormulas": [
          "MP / CP = (100 + Profit%) / (100 - Discount%)",
          "When two items are sold at same SP, one at x% gain and other at x% loss: Net is always Loss = (x / 10)^2 %"
        ],
        "solvedExample": {
          "question": "A dealer sells two servers for $12,000 each. On one he gains 20% and on the other he loses 20%. What is his net gain or loss percentage?",
          "steps": [
            "Since SP is equal for both items and gain% = loss% = 20%:",
            "Net effect is always a Loss = (x / 10)^2 % = (20 / 10)^2 % = 2^2 % = 4% loss."
          ],
          "answer": "Net Loss is 4%."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "pnl-mcq-1",
        "company": "TCS",
        "category": "Quantitative Aptitude",
        "topic": "Profit and Loss",
        "difficulty": "Medium",
        "question": "By selling 33 meters of cable, a merchant gains the cost price of 11 meters. Find the gain percentage.",
        "options": [
          "33.33%",
          "25%",
          "20%",
          "50%"
        ],
        "correctIndex": 0,
        "explanation": "Profit = CP of 11. Total CP = CP of 33. Profit % = (11 / 33) * 100% = 33.33%.",
        "shortcutFormula": "(11 / 33) * 100% = 33.33%",
        "examSource": "TCS Digital Actual PYQ"
      }
    ]
  },
  {
    "id": "topic-average",
    "topicNumber": 4,
    "title": "Average",
    "difficulty": "Easy to Medium",
    "overview": "We never liked taking out the average of numbers while in school and sometimes skip the topic for studying the tough ones. But you cannot do the same while preparing for the aptitude or placement test. Here you will have to give equal importance to this section too to score good marks.",
    "learnTitle": "Learn - Average",
    "practiceTitle": "Practice - Average MCQ",
    "quickFormulas": [
      "Average = Sum of all observations / Total number of observations",
      "Sum = Average * Number of observations",
      "Weighted Average = (n1*A1 + n2*A2) / (n1 + n2)",
      "Change in Average = (New Value - Old Value) / Total Count"
    ],
    "concepts": [
      {
        "heading": "Deviation Method for Fast Averaging",
        "content": "Instead of adding large numbers, assume an arbitrary baseline average A, compute deviations (x_i - A), average the deviations, and add to A.",
        "keyFormulas": [
          "Average = Assumed Mean + (Sum of Deviations / N)"
        ],
        "solvedExample": {
          "question": "The average score of 8 students is 75. If one student who scored 95 leaves and is replaced by another scoring 63, what is the new average?",
          "steps": [
            "Net change in total score = New - Old = 63 - 95 = -32.",
            "Change in average = -32 / 8 = -4.",
            "New average = 75 - 4 = 71."
          ],
          "answer": "The new average is 71."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "avg-mcq-1",
        "company": "Cognizant",
        "category": "Quantitative Aptitude",
        "topic": "Average",
        "difficulty": "Easy",
        "question": "The average age of 30 developers in a squad is 26 years. If the tech lead's age is added, the average increases by 1 year. What is the tech lead's age?",
        "options": [
          "57 years",
          "55 years",
          "56 years",
          "58 years"
        ],
        "correctIndex": 0,
        "explanation": "Lead age = Old Avg + (New Count * Increase) = 26 + (31 * 1) = 57 years.",
        "shortcutFormula": "New Member = 26 + (31 * 1) = 57",
        "examSource": "Cognizant GenC PYQ"
      }
    ]
  },
  {
    "id": "topic-ratio-proportion",
    "topicNumber": 5,
    "title": "Ratio and Proportion",
    "difficulty": "Easy to Medium",
    "overview": "These are the important fundamental concepts for the candidates preparing for any aptitude test, placement exam, or entrance test. Although, the questions that come in the examination are quite easy still you should study ratio and proportion because it is a scoring topic.",
    "learnTitle": "Learn - Ratio and Proportion",
    "practiceTitle": "Practice - Ratio and Proportion MCQ",
    "quickFormulas": [
      "If a/b = c/d, then a*d = b*c (cross multiplication)",
      "Mean Proportional between a and b = √(a * b)",
      "Third Proportional to a and b = b^2 / a",
      "Fourth Proportional to a, b, c = (b * c) / a",
      "Componendo and Dividendo: If a/b = c/d, then (a + b)/(a - b) = (c + d)/(c - d)"
    ],
    "concepts": [
      {
        "heading": "Combining Ratios (A:B and B:C to A:B:C)",
        "content": "When A:B = m:n and B:C = p:q, multiply the first ratio by p and the second by n so that the common element B has the identical coefficient.",
        "keyFormulas": [
          "A : B : C = (m*p) : (n*p) : (n*q)"
        ],
        "solvedExample": {
          "question": "If A:B = 2:3 and B:C = 4:5, find the ratio A:B:C.",
          "steps": [
            "A:B = (2*4) : (3*4) = 8 : 12.",
            "B:C = (4*3) : (5*3) = 12 : 15.",
            "Combined A:B:C = 8 : 12 : 15."
          ],
          "answer": "8 : 12 : 15."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "ratio-mcq-1",
        "company": "Wipro",
        "category": "Quantitative Aptitude",
        "topic": "Ratio and Proportion",
        "difficulty": "Easy",
        "question": "Two numbers are in the ratio 3:5. If 9 is subtracted from each, the new ratio becomes 12:23. What is the smaller number?",
        "options": [
          "33",
          "27",
          "36",
          "45"
        ],
        "correctIndex": 0,
        "explanation": "(3x - 9)/(5x - 9) = 12/23 => 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. Smaller number = 3 * 11 = 33.",
        "shortcutFormula": "9x = 99 => x = 11 => 3x = 33",
        "examSource": "Wipro Elite NTH"
      }
    ]
  },
  {
    "id": "topic-mixture-alligation",
    "topicNumber": 6,
    "title": "Mixture and Alligation",
    "difficulty": "Easy to Medium",
    "overview": "Mixture and Alligation are useful topics of quantitative aptitude that are used for determining the ratio and cost of two materials mixed together. In most of the competitive exams question from this category is given to test the capabilities of the candidate. Thus, you should go through this topic thoroughly.",
    "learnTitle": "Learn - Alligation or Mixture",
    "practiceTitle": "Practice - Mixtures and Alligation MCQ",
    "quickFormulas": [
      "Alligation Rule: (Cheaper Quantity) / (Dearer Quantity) = (d - m) / (m - c)",
      "Repeated Dilution: Final Pure Liquid = Initial * (1 - x/V)^n"
    ],
    "concepts": [
      {
        "heading": "The Cross Alligation Diagram",
        "content": "Place cheaper price on top left, dearer price on top right, mean mixture price in center. Subtract diagonally to obtain quantity ratio.",
        "keyFormulas": [
          "Quantity Ratio = (Dearer Price - Mean Price) : (Mean Price - Cheaper Price)"
        ],
        "solvedExample": {
          "question": "A container has 40 liters of milk. 4 liters of milk is taken out and replaced with water. This process is repeated 2 more times. How much milk remains in the container?",
          "steps": [
            "Initial volume V = 40, replaced x = 4, iterations n = 3.",
            "Remaining Milk = 40 * (1 - 4/40)^3 = 40 * (9/10)^3 = 40 * (729/1000) = 29.16 liters."
          ],
          "answer": "29.16 liters."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "mix-mcq-1",
        "company": "Amazon",
        "category": "Quantitative Aptitude",
        "topic": "Mixture and Alligation",
        "difficulty": "Medium",
        "question": "In what ratio must water be mixed with milk costing $60/liter to gain 20% by selling the mixture at the cost price of milk?",
        "options": [
          "1:5",
          "1:6",
          "1:4",
          "2:5"
        ],
        "correctIndex": 0,
        "explanation": "Gain = 20% = 1/5. Since water costs $0, Water : Milk = Gain% : 100% = 20 : 100 = 1:5.",
        "shortcutFormula": "Water : Milk = Profit% : 100% = 1:5",
        "examSource": "Amazon OA2 Quantitative"
      }
    ]
  },
  {
    "id": "topic-time-work",
    "topicNumber": 7,
    "title": "Time and Work",
    "difficulty": "Easy to Medium",
    "overview": "Time and work are one of the most important sections of quantitative aptitude and its questions are included in every type of exam be it for placement in any private company or any government job. The concept of these questions is known by most of the students and can be solved easily if you are aware of the concept.",
    "learnTitle": "Learn - Time and Work",
    "practiceTitle": "Practice - Quantitative Aptitude – Time, Work, and Distance",
    "quickFormulas": [
      "Work = Rate * Time",
      "If A takes x days and B takes y days: Combined Time = (x * y) / (x + y)",
      "M1 * D1 * H1 / W1 = M2 * D2 * H2 / W2",
      "Efficiency is inversely proportional to time taken"
    ],
    "concepts": [
      {
        "heading": "LCM Method for Efficiency",
        "content": "Assume total work is the LCM of individual days taken. Calculate units per day (efficiency) for each person.",
        "keyFormulas": [
          "Total Work = LCM(times)",
          "Days = Total Work / Combined Efficiency"
        ],
        "solvedExample": {
          "question": "A is twice as efficient as B and together they finish a task in 14 days. In how many days can A finish it alone?",
          "steps": [
            "Let efficiency of B = 1 unit/day -> A = 2 units/day.",
            "Combined efficiency = 3 units/day.",
            "Total work = 14 * 3 = 42 units.",
            "Time taken by A alone = 42 / 2 = 21 days."
          ],
          "answer": "21 days."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "tnw-mcq-1",
        "company": "TCS",
        "category": "Quantitative Aptitude",
        "topic": "Time and Work",
        "difficulty": "Easy",
        "question": "A can do a work in 15 days and B in 20 days. If they work together for 4 days, what fraction of work is left?",
        "options": [
          "8/15",
          "7/15",
          "1/3",
          "2/5"
        ],
        "correctIndex": 0,
        "explanation": "Combined rate = 1/15 + 1/20 = 7/60. In 4 days, work done = 4 * (7/60) = 7/15. Work left = 1 - 7/15 = 8/15.",
        "shortcutFormula": "Left = 1 - 4*(7/60) = 8/15",
        "examSource": "TCS NQT Time & Work"
      }
    ]
  },
  {
    "id": "topic-time-speed-distance",
    "topicNumber": 8,
    "title": "Time Speed Distance",
    "difficulty": "Medium to Hard",
    "overview": "For candidates preparing for aptitude tests or placement exams time, speed and distance is a crucial topic and helps in calculating average speed in order to solve complex distance and time problem. So if you want to stay ahead in the competition then you should prepare this topic properly.",
    "learnTitle": "Learn - Speed, Time, and Distance",
    "practiceTitle": "Practice - Time Speed Distance MCQ",
    "quickFormulas": [
      "Distance = Speed * Time",
      "km/h to m/s: Multiply by 5/18; m/s to km/h: Multiply by 18/5",
      "Average Speed (equal distance) = (2 * S1 * S2) / (S1 + S2)",
      "Relative Speed: Same direction = S1 - S2; Opposite direction = S1 + S2",
      "Trains: Time to cross pole = Train Length / Speed; Platform = (Train + Platform) / Speed"
    ],
    "concepts": [
      {
        "heading": "Relative Velocity & Trains Crossing",
        "content": "When two objects are in motion, relative speed governs time to meet or cross. If moving towards each other, speeds add; if moving in same direction, speeds subtract.",
        "keyFormulas": [
          "Relative Speed (Opposite) = S1 + S2",
          "Relative Speed (Same) = S1 - S2"
        ],
        "solvedExample": {
          "question": "A train 120m long passes a pole in 6 seconds. What is its speed in km/h?",
          "steps": [
            "Speed = Distance / Time = 120 / 6 = 20 m/s.",
            "Convert to km/h: 20 * (18/5) = 72 km/h."
          ],
          "answer": "72 km/h."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "tsd-mcq-1",
        "company": "Honeywell",
        "category": "Quantitative Aptitude",
        "topic": "Time Speed Distance",
        "difficulty": "Medium",
        "question": "An avionics telemetry drone flies to a sensor node at 60 km/h and returns along the same path at 40 km/h. What is the average speed of the drone for the entire round trip?",
        "options": [
          "48 km/h",
          "50 km/h",
          "45 km/h",
          "52 km/h"
        ],
        "correctIndex": 0,
        "explanation": "Average speed for equal distance = (2 * S1 * S2) / (S1 + S2) = (2 * 60 * 40) / (60 + 40) = 4800 / 100 = 48 km/h.",
        "shortcutFormula": "Avg Speed = (2 * 60 * 40) / 100 = 48 km/h",
        "examSource": "Honeywell Avionics Engineering OA"
      }
    ]
  },
  {
    "id": "topic-pipes-cisterns",
    "topicNumber": 9,
    "title": "Pipes and Cisterns",
    "difficulty": "Easy to Medium",
    "overview": "Another common and vital topic for quantitative aptitude is pipes and cisterns which the candidates must study as they are included in almost every aptitude test or placement examination. The questions are not very tough but the candidates must be aware of the concepts so that they can solve the questions in less time.",
    "learnTitle": "Learn - Pipes and Cisterns",
    "practiceTitle": "Practice - Pipes and Cisterns MCQ",
    "quickFormulas": [
      "Inlet Pipe: Work done is positive (+)",
      "Outlet/Leak Pipe: Work done is negative (-)",
      "Net Rate = (1 / T_inlet) - (1 / T_outlet)",
      "Time to fill = 1 / Net Rate"
    ],
    "concepts": [
      {
        "heading": "Negative Work & Leaks",
        "content": "Leaks perform negative work by emptying the tank. If a leak can empty in L hours and an inlet fills in I hours, combined rate = 1/I - 1/L.",
        "keyFormulas": [
          "Time with leak = (I * L) / (L - I)"
        ],
        "solvedExample": {
          "question": "A tap fills a tank in 8 hours. Due to a leak at the bottom, it takes 10 hours to fill. In how many hours can the leak alone empty the full tank?",
          "steps": [
            "Inlet rate = 1/8. Net rate = 1/10.",
            "Leak rate = 1/8 - 1/10 = (5 - 4) / 40 = 1/40.",
            "Time for leak to empty = 40 hours."
          ],
          "answer": "40 hours."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "pipe-mcq-1",
        "company": "Infosys",
        "category": "Quantitative Aptitude",
        "topic": "Pipes and Cisterns",
        "difficulty": "Easy",
        "question": "Pipe A can fill a tank in 10 hours and Pipe B in 15 hours. How long will they take working together?",
        "options": [
          "6 hours",
          "5 hours",
          "7.5 hours",
          "8 hours"
        ],
        "correctIndex": 0,
        "explanation": "Time = (10 * 15) / (10 + 15) = 150 / 25 = 6 hours.",
        "shortcutFormula": "T = (10*15)/25 = 6 hrs",
        "examSource": "Infosys InfyTQ Test"
      }
    ]
  },
  {
    "id": "topic-algebra",
    "topicNumber": 10,
    "title": "Algebra",
    "difficulty": "Medium to Hard",
    "overview": "Questions related to Algebra are quite evident in aptitude test and is divided into sub-branches such as elementary algebra, linear algebra, advanced algebra, commutative algebra, and abstract algebra. So, it is important that you definitely study the questions properly and practice daily.",
    "learnTitle": "Learn - Algebra",
    "practiceTitle": "Practice - Algebra MCQ",
    "quickFormulas": [
      "(a + b)^2 = a^2 + 2ab + b^2",
      "(a - b)^2 = a^2 - 2ab + b^2",
      "a^2 - b^2 = (a - b)(a + b)",
      "a^3 + b^3 = (a + b)(a^2 - ab + b^2)",
      "Quadratic roots: x = [-b ± √(b^2 - 4ac)] / (2a)",
      "If x + 1/x = k, then x^2 + 1/x^2 = k^2 - 2, and x^3 + 1/x^3 = k^3 - 3k"
    ],
    "concepts": [
      {
        "heading": "Symmetric Polynomials & Shortcuts",
        "content": "When given x + 1/x = k, powers can be computed recursively without quadratic factorization.",
        "keyFormulas": [
          "x^2 + 1/x^2 = k^2 - 2",
          "x^3 + 1/x^3 = k(k^2 - 3)"
        ],
        "solvedExample": {
          "question": "If x + 1/x = 4, find the value of x^3 + 1/x^3.",
          "steps": [
            "Using the identity x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x):",
            "= 4^3 - 3(4) = 64 - 12 = 52."
          ],
          "answer": "52."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "alg-mcq-1",
        "company": "Goldman Sachs",
        "category": "Quantitative Aptitude",
        "topic": "Algebra",
        "difficulty": "Hard",
        "question": "If a + b + c = 0, what is the value of (a^3 + b^3 + c^3) / (abc)?",
        "options": [
          "3",
          "1",
          "0",
          "-3"
        ],
        "correctIndex": 0,
        "explanation": "If a + b + c = 0, then a^3 + b^3 + c^3 = 3abc. Therefore, (a^3 + b^3 + c^3) / (abc) = 3abc / abc = 3.",
        "shortcutFormula": "Identity: If a+b+c=0 then a^3+b^3+c^3 = 3abc",
        "examSource": "Goldman Sachs Engineering Assessment"
      }
    ]
  },
  {
    "id": "topic-trigonometry-height-distance",
    "topicNumber": 11,
    "title": "Trigonometry, Height, and Distance",
    "difficulty": "Easy to Medium",
    "overview": "Having a strong knowledge of Trigonometric principles is essential for solving basic height and distance questions. These types of problems are common in aptitude tests and are an integral part of quantitative aptitude.",
    "learnTitle": "Learn - Height and Distance",
    "practiceTitle": "Practice - Trigonometry & Height and Distance MCQ",
    "quickFormulas": [
      "sin θ = Opp / Hyp, cos θ = Adj / Hyp, tan θ = Opp / Adj",
      "sin^2 θ + cos^2 θ = 1, 1 + tan^2 θ = sec^2 θ",
      "tan 30° = 1/√3, tan 45° = 1, tan 60° = √3",
      "Angle of elevation = Angle of depression (alternate interior angles)"
    ],
    "concepts": [
      {
        "heading": "Standard Height & Distance Triangles",
        "content": "30°-60°-90° triangle has sides in ratio 1 : √3 : 2. 45°-45°-90° triangle has sides 1 : 1 : √2.",
        "keyFormulas": [
          "Height = Distance * tan(θ)"
        ],
        "solvedExample": {
          "question": "A radar antenna on the ground observes an aircraft at an elevation angle of 45°. If the horizontal distance to the point directly below the aircraft is 1500 meters, what is the altitude of the aircraft?",
          "steps": [
            "tan 45° = Altitude / Horizontal Distance.",
            "1 = Altitude / 1500 => Altitude = 1500 meters."
          ],
          "answer": "1500 meters."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "trig-mcq-1",
        "company": "Qualcomm",
        "category": "Quantitative Aptitude",
        "topic": "Trigonometry",
        "difficulty": "Medium",
        "question": "The angle of elevation of the top of a cellular mast from a point 30 meters away on the ground is 60°. Find the height of the mast (use √3 ≈ 1.732).",
        "options": [
          "51.96 meters",
          "45.00 meters",
          "55.20 meters",
          "30.00 meters"
        ],
        "correctIndex": 0,
        "explanation": "Height = Base * tan 60° = 30 * √3 = 30 * 1.732 = 51.96 meters.",
        "shortcutFormula": "H = 30 * √3 = 51.96 m",
        "examSource": "Qualcomm Hardware OA"
      }
    ]
  },
  {
    "id": "topic-geometry",
    "topicNumber": 12,
    "title": "Geometry & Co-ordinates",
    "difficulty": "Easy to Medium",
    "overview": "This list cannot be completed without Geometry. It is essential that you deeply study this particular topic as it plays a vital role in aptitude tests or any other government examination. Geometry also creates a base for numerous mathematics chapters and if learned well many things can become easy.",
    "learnTitle": "Learn - Geometry and Co-ordinates",
    "practiceTitle": "Practice - Geometry MCQ",
    "quickFormulas": [
      "Sum of interior angles of n-sided polygon = (n - 2) * 180°",
      "Each interior angle of regular polygon = [(n - 2) * 180°] / n",
      "Distance formula: d = √[(x2 - x1)^2 + (y2 - y1)^2]",
      "Area of triangle with vertices: 0.5 * |x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)|",
      "Circle: Tangent is perpendicular to radius at point of contact"
    ],
    "concepts": [
      {
        "heading": "Circle Theorems & Inscribed Angles",
        "content": "Angle subtended by an arc at the center is double the angle subtended by it at the circumference. The angle in a semicircle is always 90°.",
        "keyFormulas": [
          "Central Angle = 2 * Inscribed Angle",
          "Angle in a Semicircle = 90°"
        ],
        "solvedExample": {
          "question": "Find the number of diagonals in a regular decagon (10-sided polygon).",
          "steps": [
            "Number of diagonals = n(n - 3) / 2.",
            "For n = 10: Diagonals = 10(10 - 3) / 2 = (10 * 7) / 2 = 35."
          ],
          "answer": "35 diagonals."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "geom-mcq-1",
        "company": "Microsoft",
        "category": "Quantitative Aptitude",
        "topic": "Geometry",
        "difficulty": "Easy",
        "question": "What is the measure of each interior angle of a regular hexagon (6-sided)?",
        "options": [
          "120°",
          "108°",
          "135°",
          "125°"
        ],
        "correctIndex": 0,
        "explanation": "Each interior angle = [(6 - 2) * 180°] / 6 = (4 * 180) / 6 = 720 / 6 = 120°.",
        "shortcutFormula": "Angle = 180° - (360° / 6) = 180° - 60° = 120°",
        "examSource": "Microsoft Technical Screening"
      }
    ]
  },
  {
    "id": "topic-probability",
    "topicNumber": 13,
    "title": "Probability",
    "difficulty": "Difficult to Hard",
    "overview": "If you preparing for any placement exam then Probability is a must as it helps in improving your quantitative skills. Having a good understanding of probability and how it works can be very helpful as it plays a crucial role in many fields such as engineering, finance, economics, science, etc. Therefore, you must study the topic before appearing for any aptitude test to score well.",
    "learnTitle": "Learn - Probability",
    "practiceTitle": "Practice - Probability MCQ",
    "quickFormulas": [
      "P(E) = Number of favorable outcomes / Total possible outcomes",
      "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
      "Independent Events: P(A ∩ B) = P(A) * P(B)",
      "Conditional Probability: P(A|B) = P(A ∩ B) / P(B)",
      "Bayes Theorem: P(Ai|B) = [P(B|Ai) * P(Ai)] / Σ [P(B|Aj) * P(Aj)]"
    ],
    "concepts": [
      {
        "heading": "Conditional Probability & At Least One Problems",
        "content": "For questions asking for \"at least one\", calculate the complement: P(At least one) = 1 - P(None).",
        "keyFormulas": [
          "P(At least one success) = 1 - P(Zero successes)"
        ],
        "solvedExample": {
          "question": "A fair coin is tossed 4 times. What is the probability of getting at least one Head?",
          "steps": [
            "Total outcomes = 2^4 = 16.",
            "P(No heads) = P(All Tails) = 1 / 16.",
            "P(At least one Head) = 1 - 1/16 = 15/16."
          ],
          "answer": "15 / 16."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "prob-mcq-1",
        "company": "Google",
        "category": "Quantitative Aptitude",
        "topic": "Probability",
        "difficulty": "Hard",
        "question": "A box has 3 red and 5 black balls. If 2 balls are drawn one after another without replacement, what is the probability that both are red?",
        "options": [
          "3/28",
          "5/28",
          "1/14",
          "9/64"
        ],
        "correctIndex": 0,
        "explanation": "P(1st Red) = 3/8. P(2nd Red | 1st Red) = 2/7. Combined P = (3/8) * (2/7) = 6/56 = 3/28.",
        "shortcutFormula": "P = (3/8) * (2/7) = 3/28",
        "examSource": "Google Quantitative Assessment"
      }
    ]
  },
  {
    "id": "topic-pnc",
    "topicNumber": 14,
    "title": "Permutation and Combination (PnC)",
    "difficulty": "Medium to Hard",
    "overview": "This topic of permutation and combination is included in every aptitude test therefore it is essential to revise it appropriately because they are the two most important concepts present in Mathematics. Also, understanding the difference between them can be tricky which can only be attained if you practice it religiously.",
    "learnTitle": "Learn - Permutation and Combination",
    "practiceTitle": "Practice - Permutation and Combination MCQ",
    "quickFormulas": [
      "Permutation (Arrangement/Order matters): nPr = n! / (n - r)!",
      "Combination (Selection/Order does not matter): nCr = n! / [r! * (n - r)!]",
      "Circular Permutation of n objects = (n - 1)!",
      "Identical Items: n! / (p! * q! * r!)",
      "nCr = nC(n - r)"
    ],
    "concepts": [
      {
        "heading": "Grouping (Tying) Method vs Gap Method",
        "content": "When entities must stay together, tie them into one single unit. When entities must NEVER be adjacent, arrange the other items first to create gaps, then place items in the gaps.",
        "keyFormulas": [
          "Tie Method: Arrange (N - k + 1) units * k! internal arrangements",
          "Gap Method: N! * (N + 1)P_k"
        ],
        "solvedExample": {
          "question": "In how many ways can 5 engineers sit in a circle for a scrum standup?",
          "steps": [
            "Circular arrangements of n distinct items = (n - 1)!.",
            "For n = 5: (5 - 1)! = 4! = 24 ways."
          ],
          "answer": "24 ways."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "pnc-mcq-1",
        "company": "Texas Instruments",
        "category": "Quantitative Aptitude",
        "topic": "Permutations & Combinations",
        "difficulty": "Medium",
        "question": "From a group of 7 hardware engineers and 5 software engineers, how many committees of 4 can be formed having exactly 2 hardware and 2 software engineers?",
        "options": [
          "210",
          "180",
          "240",
          "150"
        ],
        "correctIndex": 0,
        "explanation": "Ways = 7C2 * 5C2 = [(7 * 6)/2] * [(5 * 4)/2] = 21 * 10 = 210 ways.",
        "shortcutFormula": "7C2 * 5C2 = 21 * 10 = 210",
        "examSource": "Texas Instruments Placement"
      }
    ]
  },
  {
    "id": "topic-age",
    "topicNumber": 15,
    "title": "Problems on Ages",
    "difficulty": "Easy to Medium",
    "overview": "Problems with age are an important topic in many placement exams. These questions seem a bit confusing at first but with continuous practice, one can solve the questions easily.",
    "learnTitle": "Learn - Age",
    "practiceTitle": "Practice - Age MCQ",
    "quickFormulas": [
      "If present age is x, age n years ago was (x - n), and age n years hence will be (x + n)",
      "The difference between the ages of two persons remains CONSTANT throughout their lifetimes",
      "If age ratio is a:b, ages can be assumed as ax and bx"
    ],
    "concepts": [
      {
        "heading": "The Constant Difference Principle",
        "content": "The most powerful insight in age problems is that age difference is an invariant. If Person A is 5 years older than Person B today, Person A will still be 5 years older 20 years from now.",
        "keyFormulas": [
          "Age Difference (Today) = Age Difference (Any Year)"
        ],
        "solvedExample": {
          "question": "The ratio of ages of father and daughter is 5:2. The sum of their ages is 56. What will be the ratio of their ages after 7 years?",
          "steps": [
            "Let ages be 5x and 2x. 5x + 2x = 56 => 7x = 56 => x = 8.",
            "Father = 40 years, Daughter = 16 years.",
            "After 7 years: Father = 47, Daughter = 23.",
            "New ratio = 47 : 23."
          ],
          "answer": "47 : 23."
        }
      }
    ],
    "practiceQuestions": [
      {
        "id": "age-mcq-1",
        "company": "TCS",
        "category": "Quantitative Aptitude",
        "topic": "Age",
        "difficulty": "Easy",
        "question": "A mother is 3 times as old as her son. After 5 years, the sum of their ages will be 70 years. What is the present age of the mother?",
        "options": [
          "45 years",
          "42 years",
          "48 years",
          "50 years"
        ],
        "correctIndex": 0,
        "explanation": "M = 3S. In 5 years: (M + 5) + (S + 5) = 70 => M + S = 60. Since M = 3S: 4S = 60 => S = 15. Mother = 3 * 15 = 45 years.",
        "shortcutFormula": "4S = 60 => S = 15 => M = 45",
        "examSource": "TCS NQT Ages Assessment"
      }
    ]
  }
];

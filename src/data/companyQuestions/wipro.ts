import { AptitudeQuestion } from '../aptitudeQuestions';

export const wiproQuestions: AptitudeQuestion[] = [
  {
    "id": "wip-q-1",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Simple & Compound Interest",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A sum of money invested at compound interest doubles itself in 4 years. In how many years will it become 16 times of the initial amount at the same annual rate?",
    "options": [
      "16 years",
      "12 years",
      "8 years",
      "20 years"
    ],
    "correctIndex": 0,
    "explanation": "If sum doubles in 4 years (2^1 in 4 yrs), to become 16 times (2^4), it takes 4 * 4 = 16 years.",
    "shortcutFormula": "T(2^k) = k * T(2)",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-2",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Percentages",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "The population of a tech hub increased by 10% in the first year and decreased by 10% in the second year. If the current population is 99,000, what was the initial population?",
    "options": [
      "100,000",
      "98,000",
      "101,000",
      "99,500"
    ],
    "correctIndex": 0,
    "explanation": "Net multiplier = (1 + 0.10) * (1 - 0.10) = 1.1 * 0.9 = 0.99. Initial = 99,000 / 0.99 = 100,000.",
    "shortcutFormula": "Net change = x^2 / 100% loss = 1% loss.",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-3",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Time and Work",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "12 software developers can complete a project in 15 days working 8 hours a day. How many days will 10 developers take to complete the same project working 9 hours a day?",
    "options": [
      "16 days",
      "18 days",
      "15 days",
      "14 days"
    ],
    "correctIndex": 0,
    "explanation": "M1*D1*H1 = M2*D2*H2 => 12 * 15 * 8 = 10 * D2 * 9. 1440 = 90 * D2 => D2 = 16 days.",
    "shortcutFormula": "M1*D1*H1 = M2*D2*H2",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-4",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Time Speed Distance",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A train running at 54 km/h crosses a man walking at 6 km/h in the same direction in 20 seconds. What is the length of the train?",
    "options": [
      "266.67 meters",
      "250 meters",
      "300 meters",
      "220 meters"
    ],
    "correctIndex": 0,
    "explanation": "Relative speed = 54 - 6 = 48 km/h = 48 * (5/18) = 40/3 m/s. Length = Speed * Time = (40/3) * 20 = 800/3 ≈ 266.67 meters.",
    "shortcutFormula": "Distance = Rel_Speed * Time",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-5",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Profit and Loss",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "By selling an article for $360, a dealer loses 10%. At what price should he sell it to gain 15%?",
    "options": [
      "$460",
      "$450",
      "$440",
      "$480"
    ],
    "correctIndex": 0,
    "explanation": "CP = 360 / 0.9 = 400. Desired SP = 400 * 1.15 = $460.",
    "shortcutFormula": "SP2 = SP1 * (100 + Gain%) / (100 - Loss%)",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-6",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Ratios and Proportions",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "If A:B = 3:4 and B:C = 8:9, find the compound ratio of A:C.",
    "options": [
      "2:3",
      "3:2",
      "1:2",
      "4:5"
    ],
    "correctIndex": 0,
    "explanation": "A/C = (A/B) * (B/C) = (3/4) * (8/9) = 24/36 = 2/3.",
    "shortcutFormula": "A:C = (3*8) : (4*9) = 2:3",
    "examSource": "Wipro Campus Drive 2024"
  },
  {
    "id": "wip-q-7",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Averages",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "The average of 5 consecutive odd numbers is 27. What is the value of the largest of these numbers?",
    "options": [
      "31",
      "29",
      "33",
      "35"
    ],
    "correctIndex": 0,
    "explanation": "In 5 consecutive odd numbers, the middle (3rd) number is the average = 27. The numbers are 23, 25, 27, 29, 31. Largest is 31.",
    "shortcutFormula": "Largest = Avg + (n - 1) = 27 + 4 = 31",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-8",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Permutations & Combinations",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "In how many ways can 4 boys and 3 girls be seated in a row such that no two girls sit adjacent to each other?",
    "options": [
      "1440",
      "720",
      "2880",
      "120"
    ],
    "correctIndex": 0,
    "explanation": "Seat 4 boys in 4! = 24 ways. This creates 5 gaps (_ B _ B _ B _ B _). Choose 3 gaps for 3 girls in 5P3 = 5*4*3 = 60 ways. Total = 24 * 60 = 1440 ways.",
    "shortcutFormula": "Gap Method: 4! * 5P3 = 24 * 60 = 1440",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-9",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Probability",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A card is drawn from a well-shuffled pack of 52 cards. What is the probability that it is either a King or a Heart?",
    "options": [
      "4/13",
      "1/4",
      "17/52",
      "16/52"
    ],
    "correctIndex": 0,
    "explanation": "P(King) = 4/52, P(Heart) = 13/52, P(King of Hearts) = 1/52. P(King ∪ Heart) = 4/52 + 13/52 - 1/52 = 16/52 = 4/13.",
    "shortcutFormula": "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-10",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Number Systems & LCM",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Find the greatest 4-digit number which is exactly divisible by 12, 15, and 18.",
    "options": [
      "9900",
      "9850",
      "9920",
      "9960"
    ],
    "correctIndex": 0,
    "explanation": "LCM of 12, 15, 18 = 180. Greatest 4-digit number = 9999. 9999 / 180 = 55 with remainder 99. Required number = 9999 - 99 = 9900.",
    "shortcutFormula": "Answer = 9999 - (9999 mod LCM)",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-11",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Pipes & Cisterns",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both are opened together, how long will it take to fill the tank?",
    "options": [
      "12 minutes",
      "15 minutes",
      "10 minutes",
      "14 minutes"
    ],
    "correctIndex": 0,
    "explanation": "Time = (A * B) / (A + B) = (20 * 30) / (20 + 30) = 600 / 50 = 12 minutes.",
    "shortcutFormula": "T = (A*B)/(A+B)",
    "examSource": "Wipro Campus Drive 2024"
  },
  {
    "id": "wip-q-12",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Alligation & Mixtures",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "In what ratio must rice at $45/kg be mixed with rice at $60/kg so that the mixture is worth $54/kg?",
    "options": [
      "2:3",
      "3:2",
      "1:2",
      "3:4"
    ],
    "correctIndex": 0,
    "explanation": "By alligation rule: (60 - 54) : (54 - 45) = 6 : 9 = 2:3.",
    "shortcutFormula": "Ratio = (Higher - Mean) : (Mean - Lower) = 6:9 = 2:3",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-13",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Ages",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "The ratio of present ages of father and son is 7:2. Five years ago, the ratio was 6:1. What is father's present age?",
    "options": [
      "35 years",
      "42 years",
      "49 years",
      "28 years"
    ],
    "correctIndex": 0,
    "explanation": "Let ages be 7x and 2x. (7x - 5)/(2x - 5) = 6/1 => 7x - 5 = 12x - 30 => 5x = 25 => x = 5. Father = 7 * 5 = 35 years.",
    "shortcutFormula": "Cross multiplication on ratio equations",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-14",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Boats & Streams",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A man rows downstream at 14 km/h and upstream at 8 km/h. What is the speed of the man in still water?",
    "options": [
      "11 km/h",
      "10 km/h",
      "12 km/h",
      "9 km/h"
    ],
    "correctIndex": 0,
    "explanation": "Speed in still water = (Downstream + Upstream) / 2 = (14 + 8) / 2 = 22 / 2 = 11 km/h.",
    "shortcutFormula": "Still water speed = (D + U) / 2",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-q-15",
    "company": "Wipro",
    "category": "Quantitative Aptitude",
    "topic": "Mensuration",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "The diagonal of a square is 12√2 cm. What is its perimeter?",
    "options": [
      "48 cm",
      "36 cm",
      "24 cm",
      "54 cm"
    ],
    "correctIndex": 0,
    "explanation": "Diagonal = Side * √2 => Side = 12 cm. Perimeter = 4 * Side = 4 * 12 = 48 cm.",
    "shortcutFormula": "Perimeter = 4 * (Diagonal / √2) = 48 cm",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-1",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Coding-Decoding",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "If MACHINE is coded as CAMHENI, how is MONSTER coded in the same pattern?",
    "options": [
      "NOMTRES",
      "NOMETRS",
      "ONMTSR",
      "OMNTRES"
    ],
    "correctIndex": 0,
    "explanation": "Pairwise letter swapping: M-A -> A-M (or first 3 reversed: MAC -> CAM, H, INE -> ENI). Similarly MON -> NOM, S -> T -> NOMTRES.",
    "shortcutFormula": "Block transposition pattern",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-2",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Direction Sense",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Rohan walks 12 km East, turns right and walks 5 km. How far is he from his starting point?",
    "options": [
      "13 km",
      "17 km",
      "10 km",
      "15 km"
    ],
    "correctIndex": 0,
    "explanation": "Displacement = √(12^2 + 5^2) = √(144 + 25) = √169 = 13 km (Pythagorean triplet: 5, 12, 13).",
    "shortcutFormula": "Pythagorean Triplet: 5-12-13",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-3",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Syllogism",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Statements: 1. All pencils are pens. 2. All pens are markers. Conclusions: I. All pencils are markers. II. Some markers are pencils.",
    "options": [
      "Both I and II follow",
      "Only I follows",
      "Only II follows",
      "Neither follows"
    ],
    "correctIndex": 0,
    "explanation": "Pencils ⊂ Pens ⊂ Markers. Therefore, All pencils are markers (I is true). Also, some markers are pencils (II is true). Both follow.",
    "shortcutFormula": "Universal affirmative nested subset",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-4",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Blood Relations",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Introducing a man, a woman says: \"He is the only son of my mother's mother.\" How is the man related to the woman?",
    "options": [
      "Maternal Uncle",
      "Father",
      "Brother",
      "Grandfather"
    ],
    "correctIndex": 0,
    "explanation": "Mother's mother is maternal grandmother. The only son of grandmother is maternal uncle.",
    "shortcutFormula": "Son of maternal grandmother = Maternal Uncle",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-5",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Series Completion",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Find the missing term: 2, 6, 12, 20, 30, ?",
    "options": [
      "42",
      "40",
      "44",
      "36"
    ],
    "correctIndex": 0,
    "explanation": "Differences: +4, +6, +8, +10, +12. Next term = 30 + 12 = 42 (also n^2 + n: 1*2, 2*3, 3*4, 4*5, 5*6, 6*7=42).",
    "shortcutFormula": "n*(n+1) series -> 6*7 = 42",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-6",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Seating Arrangement",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Five colleagues (P, Q, R, S, T) sit in a row facing North. S is between T and Q. Q is to the immediate left of R. P is to the immediate left of T. Who is sitting in the middle?",
    "options": [
      "S",
      "Q",
      "T",
      "R"
    ],
    "correctIndex": 0,
    "explanation": "Arrangement: P, T, S, Q, R. Middle person is S.",
    "shortcutFormula": "Linear constraint mapping: P-T-S-Q-R",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-7",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Analogies",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Compiler : Code :: Blueprint : ?",
    "options": [
      "Building",
      "Architect",
      "Cement",
      "Hammer"
    ],
    "correctIndex": 0,
    "explanation": "A compiler translates/structures code into an executable program; a blueprint is the guiding plan to build a building.",
    "shortcutFormula": "Specification : Realization",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-8",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Odd One Out",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Find the odd one out: 27, 64, 125, 144, 216",
    "options": [
      "144",
      "64",
      "216",
      "27"
    ],
    "correctIndex": 0,
    "explanation": "27=3^3, 64=4^3, 125=5^3, 216=6^3 are all perfect cubes. 144 is 12^2 (not a cube).",
    "shortcutFormula": "Cubes vs Squares",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-9",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Clock Angle",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "What is the angle between the hands of a clock at 3:40?",
    "options": [
      "130°",
      "125°",
      "135°",
      "140°"
    ],
    "correctIndex": 0,
    "explanation": "Angle = |30*H - 5.5*M| = |30(3) - 5.5(40)| = |90 - 220| = 130°.",
    "shortcutFormula": "θ = |30H - 5.5M|",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-10",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Calendar",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "If 1st January 2024 was a Monday, what day was 1st January 2025?",
    "options": [
      "Wednesday",
      "Tuesday",
      "Thursday",
      "Monday"
    ],
    "correctIndex": 0,
    "explanation": "2024 is a leap year (366 days = 52 weeks + 2 odd days). Monday + 2 odd days = Wednesday.",
    "shortcutFormula": "Leap year = +2 odd days",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-11",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Data Sufficiency",
    "difficulty": "Hard",
    "pyqYear": "2024 Actual PYQ",
    "question": "Is P > Q? Statement 1: P - 4 > Q - 2. Statement 2: 2P > 2Q + 1.",
    "options": [
      "Statement 1 alone is sufficient",
      "Statement 2 alone is sufficient",
      "Both are needed",
      "Neither is sufficient"
    ],
    "correctIndex": 0,
    "explanation": "Statement 1: P - 4 > Q - 2 => P > Q + 2 => P is strictly greater than Q. Sufficient.",
    "shortcutFormula": "P > Q + 2 strictly implies P > Q",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-12",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Venn Diagrams",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "In a group of 50 students, 30 like tea, 25 like coffee, and 10 like both. How many like neither?",
    "options": [
      "5",
      "8",
      "10",
      "15"
    ],
    "correctIndex": 0,
    "explanation": "n(T ∪ C) = 30 + 25 - 10 = 45. Neither = 50 - 45 = 5.",
    "shortcutFormula": "Neither = Total - (A + B - Both)",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-13",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Statement and Assumptions",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Statement: \"Join Wipro to accelerate your cloud and AI engineering career.\" Assumptions: I. People want to accelerate their careers. II. Wipro provides cloud and AI engineering opportunities.",
    "options": [
      "Both I and II are implicit",
      "Only I is implicit",
      "Only II is implicit",
      "Neither is implicit"
    ],
    "correctIndex": 0,
    "explanation": "The advertisement assumes people desire career acceleration (I) and that Wipro can deliver on cloud/AI (II). Both are implicit.",
    "shortcutFormula": "Contextual premises of recruitment ad",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-14",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Alphabet Test",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Which letter is 5th to the left of the 14th letter from the left end in the English alphabet?",
    "options": [
      "I (9th)",
      "H (8th)",
      "J (10th)",
      "G (7th)"
    ],
    "correctIndex": 0,
    "explanation": "14th letter from left minus 5 positions left = 14 - 5 = 9th letter = I.",
    "shortcutFormula": "Left - Left = Position (14 - 5 = 9)",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-l-15",
    "company": "Wipro",
    "category": "Logical Reasoning",
    "topic": "Matrix Puzzle",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "In a 3x3 matrix: Row 1: [2, 3, 13], Row 2: [3, 4, 25], Row 3: [4, 5, ?]. What is the missing number?",
    "options": [
      "41",
      "39",
      "45",
      "40"
    ],
    "correctIndex": 0,
    "explanation": "Pattern: a^2 + b^2 = c. 2^2 + 3^2 = 4 + 9 = 13. 3^2 + 4^2 = 9 + 16 = 25. 4^2 + 5^2 = 16 + 25 = 41.",
    "shortcutFormula": "c = a^2 + b^2",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-1",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Sentence Correction",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Choose the correct sentence:",
    "options": [
      "One of the senior engineers has submitted the report.",
      "One of the senior engineers have submitted the report.",
      "One of the senior engineer has submitted the report.",
      "One of the senior engineers are submitted the report."
    ],
    "correctIndex": 0,
    "explanation": "\"One of the [plural noun]\" takes a singular verb (\"has submitted\").",
    "shortcutFormula": "\"One of the + Plural Noun\" takes Singular Verb",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-2",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Synonyms",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Choose the closest synonym for \"CANDID\":",
    "options": [
      "Frank",
      "Secretive",
      "Deceptive",
      "Shy"
    ],
    "correctIndex": 0,
    "explanation": "\"Candid\" means truthful and straightforward; frank.",
    "shortcutFormula": "Candid = Frank/Direct",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-3",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Antonyms",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Choose the antonym for \"METICULOUS\":",
    "options": [
      "Careless",
      "Accurate",
      "Painstaking",
      "Detailed"
    ],
    "correctIndex": 0,
    "explanation": "\"Meticulous\" means showing great attention to detail. The opposite is \"Careless\".",
    "shortcutFormula": "Meticulous ↔ Careless",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-4",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Error Spotting",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Identify the error: \"He is senior (A) / than me (B) / in this organization (C) / No error (D)\"",
    "options": [
      "Part (B)",
      "Part (A)",
      "Part (C)",
      "Part (D)"
    ],
    "correctIndex": 0,
    "explanation": "Adjectives ending in \"-ior\" (senior, junior, superior, inferior) take the preposition \"to\", not \"than\". Correct is \"senior to me\".",
    "shortcutFormula": "Senior/Junior + \"to\", not \"than\"",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-5",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Fill in the Blanks",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "The committee agreed _____ the proposal unanimously.",
    "options": [
      "to",
      "with",
      "on",
      "at"
    ],
    "correctIndex": 0,
    "explanation": "One agrees \"to\" a proposal or plan, and agrees \"with\" a person.",
    "shortcutFormula": "Agree to a proposal; Agree with a person",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-6",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Idioms",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "What does \"Bite the bullet\" mean?",
    "options": [
      "To face a difficult situation with courage",
      "To eat aggressively",
      "To start a fight",
      "To make an unnecessary purchase"
    ],
    "correctIndex": 0,
    "explanation": "\"Bite the bullet\" means enduring a painful or unpleasant situation bravely.",
    "shortcutFormula": "Bite the bullet = endure courageously",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-7",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "One Word Substitution",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "A person who knows and speaks many languages is called a:",
    "options": [
      "Polyglot",
      "Linguist",
      "Philanthropist",
      "Polymath"
    ],
    "correctIndex": 0,
    "explanation": "A polyglot is someone who speaks or writes several languages.",
    "shortcutFormula": "Poly = Many, Glot = Tongue/Language",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-8",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Para Jumbles",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Arrange the sentences:\nP. It enhances productivity significantly.\nQ. Cloud computing has transformed businesses.\nR. Teams can access services anywhere.\nS. This flexibility lowers infrastructure costs.",
    "options": [
      "Q - P - R - S",
      "Q - R - S - P",
      "P - Q - R - S",
      "R - S - Q - P"
    ],
    "correctIndex": 0,
    "explanation": "Q introduces the theme, P introduces its primary benefit, R and S expand on how access and flexibility work.",
    "shortcutFormula": "Broad intro -> Benefit -> Mechanism",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-9",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Active and Passive Voice",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Convert to passive voice: \"The team developed a cutting-edge application.\"",
    "options": [
      "A cutting-edge application was developed by the team.",
      "A cutting-edge application is developed by the team.",
      "A cutting-edge application had developed by the team.",
      "A cutting-edge application has been developed by the team."
    ],
    "correctIndex": 0,
    "explanation": "Past simple \"developed\" becomes \"was developed\".",
    "shortcutFormula": "Simple Past Active -> was/were + V3",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-10",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Direct and Indirect Speech",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "He said, \"I am reviewing the pull request.\"",
    "options": [
      "He said that he was reviewing the pull request.",
      "He said that he is reviewing the pull request.",
      "He said that he reviewed the pull request.",
      "He said that he had reviewed the pull request."
    ],
    "correctIndex": 0,
    "explanation": "Present continuous \"am reviewing\" changes to past continuous \"was reviewing\".",
    "shortcutFormula": "Present continuous -> Past continuous in reported speech",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-11",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Spelling Correction",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Select the correctly spelled word:",
    "options": [
      "Accommodation",
      "Acommodation",
      "Accomodation",
      "Acomodation"
    ],
    "correctIndex": 0,
    "explanation": "\"Accommodation\" has double 'c' and double 'm'.",
    "shortcutFormula": "Double C, Double M (AC-COM-MO-DATION)",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-12",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Sentence Completion",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Although the system was under severe stress, the failover mechanism prevented any _____ of service.",
    "options": [
      "disruption",
      "perpetuation",
      "enhancement",
      "reiteration"
    ],
    "correctIndex": 0,
    "explanation": "\"Disruption\" fits the context of maintaining service continuity despite stress.",
    "shortcutFormula": "Contrast word \"Although\" -> prevented disruption",
    "examSource": "Wipro Elite NTH 2024"
  },
  {
    "id": "wip-v-13",
    "company": "Wipro",
    "category": "Verbal Reasoning",
    "topic": "Reading Comprehension",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Read: \"Agile methodologies promote iterative development and continuous customer feedback over rigid predictive documentation.\" What is preferred in Agile?",
    "options": [
      "Iterative development with feedback",
      "Extensive upfront documentation",
      "Waterfall phase gating",
      "Isolation from customer input"
    ],
    "correctIndex": 0,
    "explanation": "Agile prioritizes iterative cycles and customer feedback.",
    "shortcutFormula": "Iterative feedback > Rigid documentation",
    "examSource": "Wipro Elite NTH 2024"
  }
];

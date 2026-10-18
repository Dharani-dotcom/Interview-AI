import { AptitudeQuestion } from '../aptitudeQuestions';

export const cognizantQuestions: AptitudeQuestion[] = [
  {
    "id": "cts-q-1",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Time and Work",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A can do a piece of work in 10 days and B in 15 days. They work together for 3 days and then A leaves. How many days will B take to finish the remaining work?",
    "options": [
      "7.5 days",
      "6 days",
      "8 days",
      "5 days"
    ],
    "correctIndex": 0,
    "explanation": "Combined 1-day rate = 1/10 + 1/15 = 5/30 = 1/6. In 3 days, work done = 3/6 = 1/2. Remaining = 1/2. Time for B = (1/2) / (1/15) = 15/2 = 7.5 days.",
    "shortcutFormula": "Remaining = 1/2 work -> (1/2) * 15 = 7.5 days",
    "examSource": "Cognizant GenC Elevate 2024"
  },
  {
    "id": "cts-q-2",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Profit and Loss",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A dealer marks his goods 20% above the cost price and allows a discount of 10% on marked price. What is his net gain percentage?",
    "options": [
      "8%",
      "10%",
      "12%",
      "7.5%"
    ],
    "correctIndex": 0,
    "explanation": "Net multiplier = 1.20 * 0.90 = 1.08 => 8% gain.",
    "shortcutFormula": "Effective % = +20 - 10 - (20*10)/100 = 8%",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-3",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Percentages",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "If A's salary is 25% more than B's salary, then by what percentage is B's salary less than A's salary?",
    "options": [
      "20%",
      "25%",
      "16.67%",
      "30%"
    ],
    "correctIndex": 0,
    "explanation": "Percentage less = [r / (100 + r)] * 100% = [25 / 125] * 100% = 1/5 * 100% = 20%.",
    "shortcutFormula": "r/(100+r) * 100% = 25/125 * 100% = 20%",
    "examSource": "Cognizant GenC Next 2024"
  },
  {
    "id": "cts-q-4",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Time Speed Distance",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A train 150m long is running at a speed of 68 km/h. How much time does it take to pass a man who is running at 8 km/h in the same direction?",
    "options": [
      "9 seconds",
      "10 seconds",
      "8.5 seconds",
      "12 seconds"
    ],
    "correctIndex": 0,
    "explanation": "Relative speed = 68 - 8 = 60 km/h = 60 * (5/18) = 50/3 m/s. Time = Distance / Speed = 150 / (50/3) = (150 * 3) / 50 = 9 seconds.",
    "shortcutFormula": "Time = 150 / (60 * 5/18) = 9 s",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-5",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Simple Interest",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "A sum of money triples itself in 10 years at simple interest. What is the rate of interest per annum?",
    "options": [
      "20%",
      "15%",
      "25%",
      "30%"
    ],
    "correctIndex": 0,
    "explanation": "If sum triples, SI = 2P. 2P = (P * R * 10) / 100 => 2 = 10R / 100 => R = 20%.",
    "shortcutFormula": "R = [(N - 1) / T] * 100% = (2/10) * 100 = 20%",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-6",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Ratios and Mixtures",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A mixture contains alcohol and water in the ratio 4:3. If 5 liters of water is added, the ratio becomes 4:5. Find the quantity of alcohol in the mixture.",
    "options": [
      "10 liters",
      "12 liters",
      "15 liters",
      "8 liters"
    ],
    "correctIndex": 0,
    "explanation": "Alcohol = 4x, Water = 3x. 4x / (3x + 5) = 4/5 => 5(4x) = 4(3x + 5) => 20x = 12x + 20 => 8x = 20 => x = 2.5. Alcohol = 4 * 2.5 = 10 liters.",
    "shortcutFormula": "Water units change by 2 (from 3 to 5). 2 units = 5 L => 1 unit = 2.5 L. Alcohol = 4 * 2.5 = 10 L.",
    "examSource": "Cognizant GenC Elevate 2024"
  },
  {
    "id": "cts-q-7",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Permutations & Combinations",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "How many 3-digit even numbers can be formed using the digits 1, 2, 3, 4, 5, 6 without repetition?",
    "options": [
      "60",
      "120",
      "40",
      "72"
    ],
    "correctIndex": 0,
    "explanation": "For an even number, unit digit must be chosen from {2, 4, 6} (3 choices). Tens place has 5 remaining digits. Hundreds place has 4 remaining digits. Total = 3 * 5 * 4 = 60 numbers.",
    "shortcutFormula": "Units: 3 * Tens: 5 * Hundreds: 4 = 60",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-8",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Probability",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Two coins are tossed simultaneously. What is the probability of getting at least one head?",
    "options": [
      "3/4",
      "1/2",
      "1/4",
      "2/3"
    ],
    "correctIndex": 0,
    "explanation": "Outcomes = {HH, HT, TH, TT}. Favorable = {HH, HT, TH} (3 outcomes). P = 3/4.",
    "shortcutFormula": "1 - P(no heads) = 1 - 1/4 = 3/4",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-9",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Number Systems",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "What is the highest common factor (HCF) of 108, 288, and 360?",
    "options": [
      "36",
      "18",
      "72",
      "24"
    ],
    "correctIndex": 0,
    "explanation": "108 = 36 * 3. 288 = 36 * 8. 360 = 36 * 10. Common factors of 3, 8, 10 is 1. Thus HCF = 36.",
    "shortcutFormula": "HCF(108, 288, 360) = 36",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-10",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Averages",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "The average of 6 numbers is 20. If one number is removed, the average becomes 15. What was the removed number?",
    "options": [
      "45",
      "50",
      "40",
      "35"
    ],
    "correctIndex": 0,
    "explanation": "Total of 6 numbers = 6 * 20 = 120. Total of remaining 5 numbers = 5 * 15 = 75. Removed number = 120 - 75 = 45.",
    "shortcutFormula": "Removed = (6*20) - (5*15) = 120 - 75 = 45",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-11",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Pipes & Cisterns",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A tap can empty a tank in 16 hours and another tap can fill it in 8 hours. If both are opened together when the tank is empty, how long will it take to fill the tank?",
    "options": [
      "16 hours",
      "12 hours",
      "24 hours",
      "8 hours"
    ],
    "correctIndex": 0,
    "explanation": "Net rate = 1/8 - 1/16 = (2 - 1)/16 = 1/16. Time = 16 hours.",
    "shortcutFormula": "Time = 1 / (1/8 - 1/16) = 16 hrs",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-12",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Compound Interest",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Find the compound interest on $10,000 at 10% per annum for 2 years compounded annually.",
    "options": [
      "$2,100",
      "$2,000",
      "$2,200",
      "$2,050"
    ],
    "correctIndex": 0,
    "explanation": "A = P(1 + r/100)^2 = 10000 * 1.1^2 = 10000 * 1.21 = $12,100. CI = 12100 - 10000 = $2,100.",
    "shortcutFormula": "CI = P * [2r + r^2/100]% = 10000 * 21% = $2,100",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-13",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Boats and Streams",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A boat moves at 12 km/h in still water. If the river flows at 4 km/h, how long will it take to travel 48 km downstream?",
    "options": [
      "3 hours",
      "4 hours",
      "2.5 hours",
      "5 hours"
    ],
    "correctIndex": 0,
    "explanation": "Downstream speed = 12 + 4 = 16 km/h. Time = 48 / 16 = 3 hours.",
    "shortcutFormula": "Time = Distance / (Speed_boat + Speed_stream) = 48/16 = 3 hrs",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-14",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Ages",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "A mother is 4 times as old as her daughter. In 20 years, she will be twice as old. What is the daughter's current age?",
    "options": [
      "10 years",
      "12 years",
      "8 years",
      "15 years"
    ],
    "correctIndex": 0,
    "explanation": "M = 4D. 4D + 20 = 2(D + 20) => 4D + 20 = 2D + 40 => 2D = 20 => D = 10 years.",
    "shortcutFormula": "2D = 20 => D = 10",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-q-15",
    "company": "Cognizant",
    "category": "Quantitative Aptitude",
    "topic": "Mensuration",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "The length and breadth of a rectangular plot are in the ratio 3:2. If its perimeter is 100m, find its area.",
    "options": [
      "600 sq m",
      "500 sq m",
      "625 sq m",
      "550 sq m"
    ],
    "correctIndex": 0,
    "explanation": "2(3x + 2x) = 100 => 10x = 100 => x = 10. Length = 30m, Breadth = 20m. Area = 30 * 20 = 600 sq m.",
    "shortcutFormula": "Area = 3x * 2x = 6x^2 = 6(100) = 600 sq m",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-1",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Coding-Decoding",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "If GLORY is coded as HMPSZ, how is PRIDE coded in the same scheme?",
    "options": [
      "QSJEF",
      "QSIEF",
      "QRJEF",
      "PSJEF"
    ],
    "correctIndex": 0,
    "explanation": "Every letter is shifted by +1: P->Q, R->S, I->J, D->E, E->F => QSJEF.",
    "shortcutFormula": "Letter shift +1",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-2",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Syllogism",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Statements: 1. Some laptops are tablets. 2. All tablets are mobiles. Conclusions: I. Some mobiles are laptops. II. No mobile is a laptop.",
    "options": [
      "Only conclusion I follows",
      "Only conclusion II follows",
      "Either I or II follows",
      "Neither follows"
    ],
    "correctIndex": 0,
    "explanation": "Laptops overlap with tablets, and tablets are subsets of mobiles. Thus, the overlapping laptops are also mobiles. Conclusion I follows.",
    "shortcutFormula": "Some A are B and All B are C -> Some C are A",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-3",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Direction Sense",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Sunita starts walking North, walks 6 km, turns left and walks 8 km. How far is she from the starting point?",
    "options": [
      "10 km",
      "12 km",
      "14 km",
      "8 km"
    ],
    "correctIndex": 0,
    "explanation": "Displacement = √(6^2 + 8^2) = √(36 + 64) = √100 = 10 km (Pythagorean 3-4-5 scaled by 2).",
    "shortcutFormula": "3-4-5 Triplet * 2 = 6-8-10",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-4",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Blood Relations",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "A is B's brother. C is A's mother. D is C's father. E is B's son. How is D related to E?",
    "options": [
      "Great Grandfather",
      "Grandfather",
      "Uncle",
      "Father"
    ],
    "correctIndex": 0,
    "explanation": "E's parent is B. B's mother is C (grandmother of E). C's father is D. Therefore D is the great-grandfather of E.",
    "shortcutFormula": "Parent's parent's father = Great Grandfather",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-5",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Number Series",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Find the next number in series: 7, 14, 28, 56, ?",
    "options": [
      "112",
      "108",
      "116",
      "120"
    ],
    "correctIndex": 0,
    "explanation": "Each term is multiplied by 2: 56 * 2 = 112.",
    "shortcutFormula": "Geometric progression with r = 2",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-6",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Odd One Out",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Choose the odd one out: Copper, Silver, Gold, Diamond",
    "options": [
      "Diamond",
      "Silver",
      "Gold",
      "Copper"
    ],
    "correctIndex": 0,
    "explanation": "Copper, Silver, and Gold are metals; Diamond is a non-metal (allotrope of carbon).",
    "shortcutFormula": "Diamond is a non-metallic allotrope",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-7",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Analogies",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Odometer : Distance :: Barometer : ?",
    "options": [
      "Pressure",
      "Humidity",
      "Temperature",
      "Wind Speed"
    ],
    "correctIndex": 0,
    "explanation": "An odometer measures distance; a barometer measures atmospheric pressure.",
    "shortcutFormula": "Instrument : Measurement",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-8",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Seating Arrangement",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "6 people (A, B, C, D, E, F) sit in a circle facing the center. A is opposite D. B is between A and C. E is to the immediate right of D. Who is opposite B?",
    "options": [
      "E",
      "F",
      "C",
      "D"
    ],
    "correctIndex": 0,
    "explanation": "Positions (1-6): A at 1, D at 4. B at 2, C at 3. D at 4, E at 5, F at 6. Opposite to B (pos 2) is pos 5 (E).",
    "shortcutFormula": "Circular offset by 3 in 6-person ring",
    "examSource": "Cognizant GenC Elevate 2024"
  },
  {
    "id": "cts-l-9",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Calendar",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "What day of the week was 15th August 1947?",
    "options": [
      "Friday",
      "Thursday",
      "Saturday",
      "Sunday"
    ],
    "correctIndex": 0,
    "explanation": "1600 years = 0 odd days. 300 years = 1 odd day. 46 years = 11 leap + 35 ordinary = 57 odd days = 1 odd day. Days up to Aug 15: 3+0+3+2+3+2+3+15 = 31 = 3 odd days. Total = 1 + 1 + 3 = 5 odd days = Friday.",
    "shortcutFormula": "5 odd days = Friday",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-10",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Clocks",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "At what time between 4 and 5 o'clock will the hands of a clock coincide?",
    "options": [
      "21 9/11 minutes past 4",
      "22 minutes past 4",
      "20 5/11 minutes past 4",
      "23 minutes past 4"
    ],
    "correctIndex": 0,
    "explanation": "Minute hand must gain 20 minute spaces. In 1 minute, it gains 55/60 = 11/12 space. Time = 20 / (11/12) = 240/11 = 21 9/11 minutes past 4.",
    "shortcutFormula": "Time = (60/11) * H = (60/11) * 4 = 240/11 = 21 9/11 min",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-11",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Data Sufficiency",
    "difficulty": "Hard",
    "pyqYear": "2024 Actual PYQ",
    "question": "What is the value of x? Statement 1: 2x + y = 10. Statement 2: y = 4.",
    "options": [
      "Both statements together are sufficient",
      "Statement 1 alone is sufficient",
      "Statement 2 alone is sufficient",
      "Neither is sufficient"
    ],
    "correctIndex": 0,
    "explanation": "Substituting y = 4 into 2x + 4 = 10 gives 2x = 6 => x = 3. Both together are required.",
    "shortcutFormula": "Two linear variables require two independent equations",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-12",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Venn Diagrams",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Which of the following representations best illustrates the relationship between: Reptiles, Lizards, Snakes?",
    "options": [
      "Two non-overlapping circles (Lizards and Snakes) entirely inside a larger circle (Reptiles)",
      "Three concentric circles",
      "Three intersecting circles",
      "One circle inside another with one separate circle"
    ],
    "correctIndex": 0,
    "explanation": "Both Lizards and Snakes are distinct species that belong completely to the class Reptilia.",
    "shortcutFormula": "Lizards ⊂ Reptiles and Snakes ⊂ Reptiles with Lizards ∩ Snakes = ∅",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-13",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Critical Deduction",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Statement: \"If candidates pass the technical round, they will be invited for the HR discussion.\" Candidate X did not get invited for the HR discussion. What can be concluded?",
    "options": [
      "Candidate X did not pass the technical round",
      "Candidate X passed the technical round",
      "HR was busy",
      "None of the above"
    ],
    "correctIndex": 0,
    "explanation": "P -> Q. Modus Tollens: ¬Q -> ¬P. Since ¬Q (not invited), ¬P (did not pass technical round) must hold.",
    "shortcutFormula": "Modus Tollens: If P -> Q, then not Q implies not P",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-14",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Alphabetical Ordering",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Arrange in alphabetical order: 1. Terminal, 2. Territory, 3. Terminate, 4. Temperature",
    "options": [
      "4 - 3 - 1 - 2",
      "4 - 1 - 3 - 2",
      "3 - 4 - 1 - 2",
      "1 - 3 - 4 - 2"
    ],
    "correctIndex": 0,
    "explanation": "Temp... (4) comes first. Then Termina... (3: Terminate). Then Terminal (1). Then Territory (2) => 4, 3, 1, 2.",
    "shortcutFormula": "Dictionary lexicographical comparison",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-l-15",
    "company": "Cognizant",
    "category": "Logical Reasoning",
    "topic": "Mathematical Operations",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "If '+' means 'x', '-' means '+', 'x' means '÷', and '÷' means '-', evaluate: 20 x 4 + 6 - 8 ÷ 2",
    "options": [
      "36",
      "38",
      "32",
      "30"
    ],
    "correctIndex": 0,
    "explanation": "Substitute: 20 ÷ 4 x 6 + 8 - 2 = 5 x 6 + 8 - 2 = 30 + 8 - 2 = 36.",
    "shortcutFormula": "BODMAS evaluation after sign substitution",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-1",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Sentence Correction",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Select the grammatically correct option:",
    "options": [
      "Each of the participants was given a certificate.",
      "Each of the participants were given a certificate.",
      "Each of the participant were given a certificate.",
      "Each of the participants have been given certificate."
    ],
    "correctIndex": 0,
    "explanation": "\"Each\" is a singular distributive pronoun and requires a singular verb (\"was given\").",
    "shortcutFormula": "\"Each of + Plural Noun\" takes Singular Verb",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-2",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Synonyms",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Find the closest synonym for \"PRAGMATIC\":",
    "options": [
      "Practical",
      "Idealistic",
      "Impractical",
      "Theoretical"
    ],
    "correctIndex": 0,
    "explanation": "\"Pragmatic\" means dealing with things sensibly and realistically; practical.",
    "shortcutFormula": "Pragmatic = Practical",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-3",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Antonyms",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Choose the antonym for \"OBSOLETE\":",
    "options": [
      "Contemporary",
      "Outdated",
      "Archaic",
      "Antique"
    ],
    "correctIndex": 0,
    "explanation": "\"Obsolete\" means out of date. The antonym is \"Contemporary\" (modern/current).",
    "shortcutFormula": "Obsolete ↔ Contemporary",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-4",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Error Spotting",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Identify the error: \"He told me (A) / that he has completed (B) / the work yesterday (C) / No error (D)\"",
    "options": [
      "Part (B)",
      "Part (A)",
      "Part (C)",
      "Part (D)"
    ],
    "correctIndex": 0,
    "explanation": "With a past time marker (\"yesterday\") and reported speech in past tense (\"He told me\"), use past perfect \"had completed\", not present perfect \"has completed\".",
    "shortcutFormula": "Past reported speech + Yesterday -> Past Perfect",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-5",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Fill in the Blanks",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "The new policy will come _____ effect from next month.",
    "options": [
      "into",
      "in",
      "with",
      "to"
    ],
    "correctIndex": 0,
    "explanation": "The standard idiomatic expression is \"come into effect\".",
    "shortcutFormula": "Come into effect",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-6",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Idioms & Phrases",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "What is the meaning of \"A blessing in disguise\"?",
    "options": [
      "A good thing that seemed bad at first",
      "A hidden treasure",
      "An unexpected penalty",
      "A religious ceremony"
    ],
    "correctIndex": 0,
    "explanation": "\"A blessing in disguise\" is an apparent misfortune that eventually produces beneficial results.",
    "shortcutFormula": "Misfortune that turns out to be beneficial",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-7",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "One Word Substitution",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "A remedy for all diseases or problems is termed a:",
    "options": [
      "Panacea",
      "Placebo",
      "Antibiotic",
      "Antidote"
    ],
    "correctIndex": 0,
    "explanation": "A \"panacea\" is a universal cure or solution for all difficulties or diseases.",
    "shortcutFormula": "Pan = All, Akos = Remedy -> Panacea",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-8",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Para Jumbles",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Order the sentences:\n1. Natural Language Processing has advanced rapidly.\n2. Transformers allow models to capture bidirectional context.\n3. This architecture unlocked large language models.\n4. Prior recurrent networks struggled with long dependencies.",
    "options": [
      "1 - 4 - 2 - 3",
      "1 - 2 - 3 - 4",
      "4 - 1 - 2 - 3",
      "2 - 3 - 1 - 4"
    ],
    "correctIndex": 0,
    "explanation": "Sentence 1 sets the topic (NLP advances). Sentence 4 explains earlier limitations (RNNs). Sentence 2 introduces Transformers as the solution. Sentence 3 states the outcome (unlocked LLMs).",
    "shortcutFormula": "Topic -> Limitation -> Breakthrough -> Outcome",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-9",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Voice",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Convert to passive: \"The manager will approve the release tomorrow.\"",
    "options": [
      "The release will be approved by the manager tomorrow.",
      "The release would be approved by the manager tomorrow.",
      "The release is approved by the manager tomorrow.",
      "The release will approve the manager tomorrow."
    ],
    "correctIndex": 0,
    "explanation": "Future simple \"will approve\" becomes \"will be approved\".",
    "shortcutFormula": "will + V1 -> will be + V3",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-10",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Spelling Test",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Select the correct spelling:",
    "options": [
      "Maintenance",
      "Maintainance",
      "Maintenence",
      "Maintanance"
    ],
    "correctIndex": 0,
    "explanation": "Correct spelling is \"Maintenance\" (note the \"ten\" rather than \"tain\").",
    "shortcutFormula": "Main-ten-ance",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-11",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Analogies",
    "difficulty": "Beginner",
    "pyqYear": "2024 Actual PYQ",
    "question": "Careful : Meticulous :: Generous : ?",
    "options": [
      "Magnanimous",
      "Frugal",
      "Greedy",
      "Indifferent"
    ],
    "correctIndex": 0,
    "explanation": "Meticulous is an amplified degree of careful; magnanimous is an amplified degree of generous.",
    "shortcutFormula": "Degree of attribute analogy",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-12",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Sentence Completion",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Her arguments were so _____ that even the skeptics conceded.",
    "options": [
      "cogent",
      "specious",
      "tenuous",
      "ambiguous"
    ],
    "correctIndex": 0,
    "explanation": "\"Cogent\" means clear, logical, and convincing.",
    "shortcutFormula": "Convincing arguments = Cogent",
    "examSource": "Cognizant GenC 2024"
  },
  {
    "id": "cts-v-13",
    "company": "Cognizant",
    "category": "Verbal Reasoning",
    "topic": "Reading Comprehension",
    "difficulty": "Medium",
    "pyqYear": "2024 Actual PYQ",
    "question": "Read: \"Zero-trust architecture assumes that threat actors exist both inside and outside the network boundaries, requiring continuous verification at every access request.\" What is the foundational premise of Zero-Trust?",
    "options": [
      "No entity inside or outside the network is inherently trusted",
      "Internal intranet traffic is completely safe",
      "Verification is only required at the perimeter firewall",
      "Passwords never need rotation"
    ],
    "correctIndex": 0,
    "explanation": "Zero-trust mandates that all actors, internal or external, must be continuously verified.",
    "shortcutFormula": "Never trust, always verify",
    "examSource": "Cognizant GenC 2024"
  }
];

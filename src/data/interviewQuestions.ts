import { InterviewQuestionItem, TopicMetadata, DifficultyLevel, INTERVIEW_TOPICS } from './interviewQuestionsMeta';
import { reactQuestions } from './topics/react';
import { expressQuestions } from './topics/express';
import { mongodbQuestions } from './topics/mongodb';
import { mernQuestions } from './topics/mern';
import { agenticAiQuestions } from './topics/agenticAi';
import { genAiQuestions } from './topics/genAi';
import { ragQuestions } from './topics/rag';
import { javaQuestions } from './topics/java';
import { pythonQuestions } from './topics/python';
import { databaseSqlQuestions } from './topics/databaseSql';
import { javascriptQuestions } from './topics/javascript';
import { cppQuestions } from './topics/cpp';
import { systemDesignQuestions } from './topics/systemDesign';
import { hrQuestions } from './topics/hr';

export * from './interviewQuestionsMeta';

export interface TopicQuestionBank {
  beginner: InterviewQuestionItem[];
  medium: InterviewQuestionItem[];
  hard: InterviewQuestionItem[];
}

export const TOPIC_QUESTION_BANKS: Record<string, TopicQuestionBank> = {
  'React': reactQuestions,
  'Express.js': expressQuestions,
  'MongoDB': mongodbQuestions,
  'MERN Stack': mernQuestions,
  'Agentic AI': agenticAiQuestions,
  'Generative AI & LLMs': genAiQuestions,
  'RAG & AI Engineering': ragQuestions,
  'Java & Spring Boot': javaQuestions,
  'Python & Data Science': pythonQuestions,
  'Database & SQL': databaseSqlQuestions,
  'JavaScript & Web Core': javascriptQuestions,
  'C++ & System Programming': cppQuestions,
  'System Design': systemDesignQuestions,
  'HR & Cultural Fit': hrQuestions
};

// Aliases for topic matching
const TOPIC_ALIASES: Record<string, string> = {
  'react': 'React',
  'express': 'Express.js',
  'expres js': 'Express.js',
  'express js': 'Express.js',
  'express.js': 'Express.js',
  'mongo': 'MongoDB',
  'mango db': 'MongoDB',
  'mongodb': 'MongoDB',
  'mongo db': 'MongoDB',
  'mern': 'MERN Stack',
  'mern stack': 'MERN Stack',
  'agentic ai': 'Agentic AI',
  'ai agents': 'Agentic AI',
  'agentic': 'Agentic AI',
  'gen ai': 'Generative AI & LLMs',
  'generative ai': 'Generative AI & LLMs',
  'generative ai & llms': 'Generative AI & LLMs',
  'rag': 'RAG & AI Engineering',
  'rag & ai engineering': 'RAG & AI Engineering',
  'java': 'Java & Spring Boot',
  'java & spring boot': 'Java & Spring Boot',
  'python': 'Python & Data Science',
  'python & data science': 'Python & Data Science',
  'database & sql': 'Database & SQL',
  'sql': 'Database & SQL',
  'database': 'Database & SQL',
  'javascript': 'JavaScript & Web Core',
  'javascript & react': 'React',
  'javascript & web core': 'JavaScript & Web Core',
  'c++': 'C++ & System Programming',
  'c++ & stl': 'C++ & System Programming',
  'c++ & system programming': 'C++ & System Programming',
  'system design': 'System Design',
  'hr': 'HR & Cultural Fit',
  'hr interview': 'HR & Cultural Fit',
  'hr & cultural fit': 'HR & Cultural Fit'
};

export function resolveTopicKey(topicName: string): string {
  const normalized = topicName.trim().toLowerCase();
  if (TOPIC_ALIASES[normalized]) {
    return TOPIC_ALIASES[normalized];
  }
  for (const [alias, real] of Object.entries(TOPIC_ALIASES)) {
    if (normalized.includes(alias)) {
      return real;
    }
  }
  return 'React';
}

export function getQuestionsForTopicAndDifficulty(
  topicName: string,
  difficulty: DifficultyLevel = 'Beginner'
): InterviewQuestionItem[] {
  const key = resolveTopicKey(topicName);
  const bank = TOPIC_QUESTION_BANKS[key] || TOPIC_QUESTION_BANKS['React'];
  const levelKey = difficulty.toLowerCase() as 'beginner' | 'medium' | 'hard';
  return bank[levelKey] || bank.beginner;
}

export function getAllQuestionsForTopic(topicName: string): InterviewQuestionItem[] {
  const key = resolveTopicKey(topicName);
  const bank = TOPIC_QUESTION_BANKS[key] || TOPIC_QUESTION_BANKS['React'];
  return [...bank.beginner, ...bank.medium, ...bank.hard];
}

export function getTopicMetadata(topicName: string): TopicMetadata | undefined {
  const key = resolveTopicKey(topicName);
  return INTERVIEW_TOPICS.find((t) => t.name === key);
}

export interface AnswerWeakStrongEvaluation {
  score: number;
  strengths: string[];
  weaknesses: string[];
  strongSummary: string;
  weakSummary: string;
  keyMissingConcepts: string[];
  verbalResponse: string;
  improvedAnswer: string;
}

/**
 * Intelligent fallback evaluation based on question rubric
 */
export function evaluateAnswerRubric(
  questionItem: InterviewQuestionItem,
  userTranscript: string
): AnswerWeakStrongEvaluation {
  const text = (userTranscript || '').toLowerCase();
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const foundConcepts = (questionItem.keyConcepts || []).filter(c =>
    text.includes(c.toLowerCase()) || text.includes(c.toLowerCase().split(' ')[0])
  );
  const missingConcepts = (questionItem.keyConcepts || []).filter(c =>
    !text.includes(c.toLowerCase()) && !text.includes(c.toLowerCase().split(' ')[0])
  );

  let score = 70;
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (wordCount >= 30) {
    score += 10;
    strengths.push('Provided a comprehensive, articulate response with substantial detail.');
  } else if (wordCount < 15) {
    score -= 15;
    weaknesses.push('Answer was too brief. In technical interviews, provide architectural context, use cases, and trade-offs.');
  }

  if (foundConcepts.length > 0) {
    score += Math.min(15, foundConcepts.length * 5);
    strengths.push(`Demonstrated solid grasp of key terminology: ${foundConcepts.join(', ')}.`);
  }

  if (missingConcepts.length > 0) {
    score -= Math.min(15, missingConcepts.length * 5);
    weaknesses.push(`Missed discussing critical concepts: ${missingConcepts.join(', ')}.`);
  }

  // Strong indicators
  const matchedStrong = (questionItem.strongIndicators || []).filter(s =>
    s.split(' ').some(w => w.length > 4 && text.includes(w.toLowerCase()))
  );
  if (matchedStrong.length > 0) {
    strengths.push(matchedStrong[0]);
  } else if (questionItem.strongIndicators && questionItem.strongIndicators.length > 0) {
    weaknesses.push(`Could be stronger by emphasizing: ${questionItem.strongIndicators[0]}`);
  }

  const boundedScore = Math.max(45, Math.min(96, score));

  return {
    score: boundedScore,
    strengths: strengths.length > 0 ? strengths : ['Communicated thoughts logically and attempted the question.'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['Could further elaborate on production edge cases and performance trade-offs.'],
    strongSummary: strengths.join(' '),
    weakSummary: weaknesses.join(' '),
    keyMissingConcepts: missingConcepts,
    verbalResponse: boundedScore >= 80
      ? `Solid explanation! You touched upon ${foundConcepts.slice(0, 2).join(' and ') || 'the foundational concepts'} effectively.`
      : `Good effort! To elevate your answer, make sure to explicitly discuss ${missingConcepts[0] || 'the core trade-offs and performance impact'}.`,
    improvedAnswer: questionItem.sampleGoodAnswer
  };
}

export interface SessionReportSummary {
  topic: string;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  answeredCount: number;
  averageScore: number;
  verdict: 'Strong Hire' | 'Hire' | 'Needs Improvement' | 'Developing';
  topStrengths: string[];
  topWeaknesses: string[];
  actionableStudyPlan: string[];
  questionBreakdown: Array<{
    question: string;
    score: number;
    userAnswer: string;
    strengths: string[];
    weaknesses: string[];
  }>;
}

export function aggregateSessionReport(
  topic: string,
  difficulty: DifficultyLevel,
  questions: InterviewQuestionItem[],
  answers: Record<number, string>,
  evaluations: Record<number, AnswerWeakStrongEvaluation>
): SessionReportSummary {
  const answeredIndices = Object.keys(evaluations).map(Number);
  const totalQuestions = questions.length;
  const answeredCount = answeredIndices.length;

  let totalScore = 0;
  const allStrengths: string[] = [];
  const allWeaknesses: string[] = [];
  const questionBreakdown: SessionReportSummary['questionBreakdown'] = [];

  answeredIndices.forEach(idx => {
    const ev = evaluations[idx];
    const qItem = questions[idx];
    if (ev && qItem) {
      totalScore += ev.score;
      allStrengths.push(...(ev.strengths || []));
      allWeaknesses.push(...(ev.weaknesses || []));
      questionBreakdown.push({
        question: qItem.question,
        score: ev.score,
        userAnswer: answers[idx] || '',
        strengths: ev.strengths || [],
        weaknesses: ev.weaknesses || []
      });
    }
  });

  const averageScore = answeredCount > 0 ? Math.round(totalScore / answeredCount) : 0;

  // Deduplicate and filter strengths/weaknesses
  const uniqueStrengths = Array.from(new Set(allStrengths)).slice(0, 5);
  const uniqueWeaknesses = Array.from(new Set(allWeaknesses)).slice(0, 5);

  let verdict: SessionReportSummary['verdict'] = 'Developing';
  if (averageScore >= 88) verdict = 'Strong Hire';
  else if (averageScore >= 78) verdict = 'Hire';
  else if (averageScore >= 65) verdict = 'Needs Improvement';

  const actionableStudyPlan: string[] = [
    `Deep dive into ${topic} architectural fundamentals for ${difficulty} level questions.`,
    `Focus on clearly structuring technical answers: Definition -> Architecture / Internals -> Real-world Trade-offs.`,
    `Review missing key concepts identified in your weak areas: ${uniqueWeaknesses.slice(0, 2).join('; ')}`
  ];

  return {
    topic,
    difficulty,
    totalQuestions,
    answeredCount,
    averageScore,
    verdict,
    topStrengths: uniqueStrengths.length > 0 ? uniqueStrengths : ['Good communication cadence', 'Demonstrated active problem solving'],
    topWeaknesses: uniqueWeaknesses.length > 0 ? uniqueWeaknesses : ['Add more edge-case analysis and quantitative trade-offs'],
    actionableStudyPlan,
    questionBreakdown
  };
}

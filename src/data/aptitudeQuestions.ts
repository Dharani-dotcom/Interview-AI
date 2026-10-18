export type CompanyName =
  | 'Google'
  | 'Microsoft'
  | 'TCS'
  | 'Infosys'
  | 'Honeywell'
  | 'Amazon'
  | 'Accenture'
  | 'Wipro'
  | 'Cognizant'
  | 'Qualcomm'
  | 'Texas Instruments'
  | 'Goldman Sachs';

export interface AptitudeQuestion {
  id: string;
  company: CompanyName;
  category: 'Quantitative Aptitude' | 'Logical Reasoning' | 'Verbal Reasoning' | 'Core ECE / EEE';
  topic: string;
  difficulty: 'Beginner' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  shortcutFormula?: string;
  examSource: string;
  pyqYear?: string;
}

export const APTITUDE_COMPANIES = [
  'All Companies',
  'TCS',
  'Infosys',
  'Honeywell',
  'Google',
  'Microsoft',
  'Amazon',
  'Qualcomm',
  'Texas Instruments',
  'Goldman Sachs',
  'Accenture',
  'Wipro',
  'Cognizant'
] as const;

export const APTITUDE_CATEGORIES = [
  'All Categories',
  'Quantitative Aptitude',
  'Logical Reasoning',
  'Verbal Reasoning',
  'Core ECE / EEE'
] as const;

// Import all company question banks (each has > 40 authentic questions across Quant, Logic, Verbal, and Core ECE/EEE)
import { tcsQuestions } from './companyQuestions/tcs';
import { infosysQuestions } from './companyQuestions/infosys';
import { honeywellQuestions } from './companyQuestions/honeywell';
import { googleQuestions } from './companyQuestions/google';
import { microsoftQuestions } from './companyQuestions/microsoft';
import { amazonQuestions } from './companyQuestions/amazon';
import { qualcommQuestions } from './companyQuestions/qualcomm';
import { texasInstrumentsQuestions } from './companyQuestions/texasInstruments';
import { goldmanSachsQuestions } from './companyQuestions/goldmanSachs';
import { accentureQuestions } from './companyQuestions/accenture';
import { wiproQuestions } from './companyQuestions/wipro';
import { cognizantQuestions } from './companyQuestions/cognizant';

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  ...tcsQuestions,
  ...infosysQuestions,
  ...honeywellQuestions,
  ...googleQuestions,
  ...microsoftQuestions,
  ...amazonQuestions,
  ...qualcommQuestions,
  ...texasInstrumentsQuestions,
  ...goldmanSachsQuestions,
  ...accentureQuestions,
  ...wiproQuestions,
  ...cognizantQuestions
];

export {
  tcsQuestions,
  infosysQuestions,
  honeywellQuestions,
  googleQuestions,
  microsoftQuestions,
  amazonQuestions,
  qualcommQuestions,
  texasInstrumentsQuestions,
  goldmanSachsQuestions,
  accentureQuestions,
  wiproQuestions,
  cognizantQuestions
};

export interface Question {
  id: number;
  question: string;
  answers: {
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
    score: number;
  }[];
}

export interface Dosha {
  name: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
}

export interface DoshaResult {
  dominantDosha: 'vata' | 'pitta' | 'kapha';
  doshaScores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  completedQuestionnaire: boolean;
}

export interface UserProfile {
  name: string;
  age?: number;
  email?: string;
  dominantDosha?: 'vata' | 'pitta' | 'kapha';
  doshaScores?: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  completedQuestionnaire?: boolean;
  assessmentsCompleted: number;
  joinedDate: string;
  lastAssessmentDate?: string;
}
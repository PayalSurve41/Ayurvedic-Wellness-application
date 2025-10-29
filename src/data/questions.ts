import { Question } from '../types';

export const doshaQuestions: Question[] = [
  {
    id: 1,
    question: "What is your body frame?",
    answers: [
      { text: "Thin, light weight, prominent joints", dosha: 'vata', score: 2 },
      { text: "Medium build, moderate weight", dosha: 'pitta', score: 2 },
      { text: "Large frame, heavy build, broad shoulders", dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: 2,
    question: "How is your skin?",
    answers: [
      { text: "Dry, rough, cool, thin", dosha: 'vata', score: 2 },
      { text: "Warm, oily, prone to irritation", dosha: 'pitta', score: 2 },
      { text: "Thick, moist, cool, smooth", dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: 3,
    question: "How is your hair?",
    answers: [
      { text: "Dry, brittle, thin", dosha: 'vata', score: 2 },
      { text: "Fine, early graying or baldness", dosha: 'pitta', score: 2 },
      { text: "Thick, oily, wavy, lustrous", dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: 4,
    question: "How is your appetite?",
    answers: [
      { text: "Variable, sometimes hungry, sometimes not", dosha: 'vata', score: 2 },
      { text: "Strong, regular, gets irritable when hungry", dosha: 'pitta', score: 2 },
      { text: "Steady, can skip meals easily", dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: 5,
    question: "How is your digestion?",
    answers: [
      { text: "Irregular, gas, bloating", dosha: 'vata', score: 2 },
      { text: "Quick, strong, sometimes causes heartburn", dosha: 'pitta', score: 2 },
      { text: "Slow but steady, rarely upset", dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: 6,
    question: "How is your sleep?",
    answers: [
      { text: "Light, interrupted, 5-7 hours", dosha: 'vata', score: 2 },
      { text: "Moderate, 6-8 hours, rarely interrupted", dosha: 'pitta', score: 2 },
      { text: "Deep, long, 8+ hours, hard to wake up", dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: 7,
    question: "How is your energy level?",
    answers: [
      { text: "Comes in bursts, then fatigue", dosha: 'vata', score: 2 },
      { text: "Moderate, good stamina", dosha: 'pitta', score: 2 },
      { text: "Steady, strong, good endurance", dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: 8,
    question: "How do you handle stress?",
    answers: [
      { text: "Get anxious, worried, restless", dosha: 'vata', score: 2 },
      { text: "Get irritated, angry, critical", dosha: 'pitta', score: 2 },
      { text: "Stay calm, become withdrawn", dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: 9,
    question: "What is your weather preference?",
    answers: [
      { text: "Warm, humid weather", dosha: 'vata', score: 2 },
      { text: "Cool, well-ventilated places", dosha: 'pitta', score: 2 },
      { text: "Warm, dry weather", dosha: 'kapha', score: 2 }
    ]
  },
  {
    id: 10,
    question: "How do you learn and remember?",
    answers: [
      { text: "Learn quickly, forget quickly", dosha: 'vata', score: 2 },
      { text: "Learn moderately, good retention", dosha: 'pitta', score: 2 },
      { text: "Learn slowly, excellent long-term memory", dosha: 'kapha', score: 2 }
    ]
  }
];
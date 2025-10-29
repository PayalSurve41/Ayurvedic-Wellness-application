import { Dosha } from '../types';

export const doshaInfo: Record<string, Dosha> = {
  vata: {
    name: 'Vata',
    description: 'The energy of movement, governing breathing, circulation, and nervous system functions.',
    characteristics: [
      'Quick thinking and creative',
      'Enthusiastic and energetic',
      'Light sleeper',
      'Variable appetite',
      'Prone to anxiety when imbalanced'
    ],
    recommendations: [
      'Maintain regular routines',
      'Eat warm, cooked foods',
      'Practice calming activities like yoga',
      'Get adequate rest',
      'Stay warm and avoid cold'
    ]
  },
  pitta: {
    name: 'Pitta',
    description: 'The energy of transformation, governing digestion, metabolism, and body temperature.',
    characteristics: [
      'Sharp intellect and focus',
      'Natural leadership qualities',
      'Strong appetite and digestion',
      'Moderate sleep needs',
      'Prone to anger when imbalanced'
    ],
    recommendations: [
      'Avoid excessive heat',
      'Eat cooling foods',
      'Practice moderation',
      'Engage in calming activities',
      'Avoid spicy and acidic foods'
    ]
  },
  kapha: {
    name: 'Kapha',
    description: 'The energy of structure and lubrication, governing immunity, growth, and stability.',
    characteristics: [
      'Calm and steady nature',
      'Strong immunity',
      'Good long-term memory',
      'Needs more sleep',
      'Prone to lethargy when imbalanced'
    ],
    recommendations: [
      'Stay active and exercise regularly',
      'Eat light, warm foods',
      'Maintain variety in routine',
      'Avoid excessive dairy and sweets',
      'Wake up early'
    ]
  }
};
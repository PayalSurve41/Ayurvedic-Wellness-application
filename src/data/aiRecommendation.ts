export type Mood = 'happy' | 'calm' | 'stressed' | 'anxious' | 'tired';

export interface AIResponse {
  mood: Mood;
  tips: string[];
  exercise?: string[];
  food?: string[];
  sleep?: string[];
  mental?: string[];
}

export const analyzeTextEmotion = (text: string): Mood => {
  const lower = text.toLowerCase();

  if (/(happy|joy|excited|fun|cheerful|pleased|delighted)/.test(lower)) return 'happy';
  if (/(calm|relax|peace|serene|quiet|content|chill)/.test(lower)) return 'calm';
  if (/(stress|overwhelmed|pressure|busy|tense|frustrated)/.test(lower)) return 'stressed';
  if (/(anxious|nervous|worried|panic|uneasy|fear)/.test(lower)) return 'anxious';
  if (/(tired|sleepy|exhausted|fatigue|drowsy|lethargic)/.test(lower)) return 'tired';

  return 'calm';
};

export const generateLifestyleTips = (mood: Mood): AIResponse => {
  switch (mood) {
    case 'happy':
      return {
        mood,
        tips: ['Keep a gratitude journal.', 'Share joy with others.', 'Channel energy into creative activities.'],
        exercise: ['Dance or light cardio 20 mins', 'Take a joyful walk outdoors'],
        food: ['Fruits and nuts for energy', 'Sattvic meals to maintain balance'],
        mental: ['Meditation or mindful breathing for 10 mins'],
      };
    case 'calm':
      return {
        mood,
        tips: ['Maintain meditation routine', 'Enjoy mindful walk', 'Drink herbal tea or warm water'],
        exercise: ['Gentle yoga 15-20 mins'],
        food: ['Light vegetarian meals', 'Herbal teas'],
        mental: ['Read spiritual texts or journaling'],
      };
    case 'stressed':
      return {
        mood,
        tips: ['Take short breaks', 'Practice deep breathing 4-7-8', 'Listen to calming music'],
        exercise: ['Stretching and neck/shoulder exercises', 'Slow walking'],
        food: ['Light meals', 'Avoid caffeine or heavy food'],
        mental: ['Mindfulness meditation', 'Write worries down and plan small steps'],
      };
    case 'anxious':
      return {
        mood,
        tips: ['Alternate nostril breathing 5 mins', 'Write down worries', 'Stay hydrated'],
        exercise: ['Gentle yoga poses', 'Slow walking'],
        food: ['Warm herbal tea', 'Light, warm meals'],
        mental: ['Meditation', 'Visualization or guided imagery'],
      };
    case 'tired':
      return {
        mood,
        tips: ['Short nap 20 mins', 'Go to bed early', 'Eat light, warm meals'],
        exercise: ['Gentle stretching', 'Avoid intense workouts'],
        food: ['Warm soups, light dinners', 'Fruits with water'],
        sleep: ['Sleep 7-8 hours', 'Short power naps'],
        mental: ['Relaxation exercises', 'Avoid screens before sleep'],
      };
  }
};

// src/components/AIAddOn.tsx
import React, { useState, useRef, useEffect } from 'react';
import { analyzeTextEmotion, generateLifestyleTips, AIResponse } from '../data/aiRecommendation';
import { Send, Lightbulb, Activity, Coffee, Moon, Brain, Trash2 } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  aiData?: AIResponse;
}

// Allowed moods
const allowedMoods = ['happy', 'calm', 'stressed', 'anxious', 'tired'] as const;
type Mood = typeof allowedMoods[number];

// Icons for categories
const categoryIcons: Record<string, JSX.Element> = {
  exercise: <Activity size={16} />,
  food: <Coffee size={16} />,
  sleep: <Moon size={16} />,
  mental: <Brain size={16} />,
};

// Colors for categories (soft Ayurvedic tones)
const categoryColors: Record<string, string> = {
  exercise: 'bg-[#FFF5E1] text-[#FFB74D] border-l-4 border-[#FFB74D]',
  food: 'bg-[#FFF5E1] text-[#4CAF50] border-l-4 border-[#4CAF50]',
  sleep: 'bg-[#FFF5E1] text-[#A1887F] border-l-4 border-[#A1887F]',
  mental: 'bg-[#FFF5E1] text-[#A8D5BA] border-l-4 border-[#A8D5BA]',
};

const AIAddOn: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    if (!allowedMoods.includes(trimmed as Mood)) {
      alert(`Please enter one of the following moods: ${allowedMoods.join(', ')}`);
      return;
    }

    setMessages(prev => [...prev, { sender: 'user', text: trimmed }]);
    const mood = trimmed as Mood;
    const aiData: AIResponse = generateLifestyleTips(mood);
    const aiText = `Detected Mood: ${mood}\nTips:\n- ${aiData.tips.join('\n- ')}`;

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: aiText, aiData }]);
    }, 500);

    setInput('');
  };

  const handleClear = () => {
    setMessages([]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderQuickTipCards = (aiData?: AIResponse) => {
    if (!aiData) return null;
    const categories: (keyof AIResponse)[] = ['exercise', 'food', 'sleep', 'mental'];

    return (
      <div className="mt-2 flex flex-col gap-2">
        {categories.map(cat => {
          const tips = aiData[cat];
          if (!tips || tips.length === 0) return null;
          return (
            <div key={cat} className={`flex items-start gap-2 p-3 rounded-lg shadow ${categoryColors[cat]}`}>
              <div className="mt-1">{categoryIcons[cat]}</div>
              <div className="flex-1">
                <h4 className="font-semibold capitalize">{cat}</h4>
                <ul className="list-disc ml-4 space-y-1 text-sm text-[#333333]">
                  {tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto flex flex-col h-[600px] border rounded-xl shadow-lg bg-[#FFF5E1] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-[#A8D5BA] to-[#4CAF50] text-[#333333] font-bold rounded-t-xl">
        <Lightbulb size={20} /> AI Wellness Chatbot
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-[#A8D5BA] text-[#333333]'
                  : 'bg-[#FFB74D] text-[#333333]'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'ai' && renderQuickTipCards(msg.aiData)}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input + Buttons */}
      <div className="flex p-3 border-t gap-2 bg-[#FFF5E1]">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your mood: happy, calm, stressed..."
          className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
        />
        <button
          onClick={handleSend}
          className="bg-[#4CAF50] hover:bg-[#A8D5BA] text-white px-4 py-2 rounded-xl shadow flex items-center gap-1"
        >
          <Send size={16} /> Send
        </button>
        <button
          onClick={handleClear}
          className="bg-[#FFB74D] hover:bg-[#A1887F] text-white px-4 py-2 rounded-xl shadow flex items-center gap-1"
        >
          <Trash2 size={16} /> Clear
        </button>
      </div>
    </div>
  );
};

export default AIAddOn;

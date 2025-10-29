import React from 'react';
import { Sparkles, Play, Sun, Wind, Flame, Leaf, Star, Heart, Zap } from 'lucide-react';
import { UserProfile } from '../types';

interface HomeProps {
  onStartAssessment: () => void;
  userProfile: UserProfile;
}

export default function Home({ onStartAssessment, userProfile }: HomeProps) {
  return (
    <div className="min-h-screen bg-[#FFF5E1] text-[#333333] pb-24">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#A8D5BA] via-[#4CAF50] to-[#A8D5BA] text-white py-20 px-6 text-center rounded-b-3xl shadow-md">
        <div className="w-24 h-24 bg-[#FFF5E1] rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-12 h-12 text-[#4CAF50]" />
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Ayurvedic <span className="text-[#FFB74D]">Wellness</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Discover your unique constitution through ancient Ayurvedic wisdom and unlock personalized wellness insights
        </p>
        <button
          onClick={onStartAssessment}
          className="mt-6 bg-[#FFB74D] text-[#333333] px-8 py-3 rounded-full font-bold hover:bg-[#A8D5BA] transition-colors"
        >
          {userProfile.completedQuestionnaire ? 'Retake Assessment' : 'Discover Your Dosha'}
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-6 px-6 py-12">
        <div className="bg-[#A8D5BA] rounded-2xl p-6 text-center shadow">
          <Star className="w-10 h-10 mx-auto mb-2 text-[#4CAF50]" />
          <div className="text-3xl font-bold">{userProfile.assessmentsCompleted}</div>
          <div className="font-medium">Assessments</div>
        </div>
        <div className="bg-[#FFB74D] rounded-2xl p-6 text-center shadow">
          <Sun className="w-10 h-10 mx-auto mb-2 text-[#4CAF50]" />
          <div className="text-3xl font-bold">
            {userProfile.joinedDate ? Math.floor((Date.now() - new Date(userProfile.joinedDate).getTime()) / (1000 * 60 * 60 * 24)) : 0}
          </div>
          <div className="font-medium">Days Journey</div>
        </div>
      </div>

      {/* Dosha Cards */}
      <div className="px-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#4CAF50]">The Three Doshas</h2>

        {/* Vata */}
        <div className="bg-[#FFF5E1] border-l-4 border-[#4CAF50] rounded-xl p-6 shadow">
          <div className="flex items-center mb-2">
            <Wind className="w-8 h-8 text-[#4CAF50] mr-3" />
            <h3 className="text-xl font-bold">Vata Dosha</h3>
          </div>
          <p>
            Energy of Movement. Governs breathing, circulation, and nervous system. Associated with creativity and flexibility.
          </p>
        </div>

        {/* Pitta */}
        <div className="bg-[#FFF5E1] border-l-4 border-[#FFB74D] rounded-xl p-6 shadow">
          <div className="flex items-center mb-2">
            <Flame className="w-8 h-8 text-[#FFB74D] mr-3" />
            <h3 className="text-xl font-bold">Pitta Dosha</h3>
          </div>
          <p>
            Energy of Transformation. Governs digestion, metabolism, and body temperature. Associated with intelligence and leadership.
          </p>
        </div>

        {/* Kapha */}
        <div className="bg-[#FFF5E1] border-l-4 border-[#A1887F] rounded-xl p-6 shadow">
          <div className="flex items-center mb-2">
            <Leaf className="w-8 h-8 text-[#A1887F] mr-3" />
            <h3 className="text-xl font-bold">Kapha Dosha</h3>
          </div>
          <p>
            Energy of Structure. Governs immunity, growth, and stability. Associated with calmness, strength, and endurance.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#4CAF50] via-[#A8D5BA] to-[#FFB74D] text-white rounded-2xl p-10 text-center mx-6 mt-12 shadow">
        <Zap className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Ready to Begin?</h3>
        <p className="mb-6">
          Take our comprehensive assessment to discover your unique Ayurvedic constitution
        </p>
        <button
          onClick={onStartAssessment}
          className="bg-[#FFF5E1] text-[#333333] px-8 py-3 rounded-full font-bold hover:bg-[#A8D5BA] transition-colors"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
}

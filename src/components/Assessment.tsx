import React from 'react';
import { Brain, Play, BookOpen, Clock, Target } from 'lucide-react';
import { UserProfile } from '../types';

interface AssessmentProps {
  onStartQuiz: () => void;
  userProfile: UserProfile;
}

export default function Assessment({ onStartQuiz, userProfile }: AssessmentProps) {
  return (
    <div className="min-h-screen bg-[#FFF5E1] pb-24 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-16 right-10 w-24 h-24 bg-[#FFB74D]/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 left-8 w-32 h-32 bg-[#A8D5BA]/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#A8D5BA] to-[#4CAF50] text-[#333333] px-6 py-16 rounded-b-3xl">
        <div className="text-center">
          <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border-4 border-white/30 shadow-2xl">
            <Brain className="w-14 h-14 text-[#333333] animate-pulse" />
          </div>
          <h1 className="text-5xl font-black mb-4">Dosha Assessment</h1>
          <p className="text-2xl opacity-95 font-light">Discover Your Ayurvedic Constitution</p>
        </div>
      </div>

      <div className="px-6 py-12 space-y-8">
        {/* Assessment Info */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#A1887F]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-[#333333] mb-4">About This Assessment</h2>
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              Understand your unique Ayurvedic constitution with questions about your physical, mental, and emotional characteristics.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-[#FFB74D]/20 text-[#333333] rounded-2xl shadow hover:scale-105 transition-transform">
              <BookOpen className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">10 Questions</h3>
              <p className="opacity-90 font-medium">Comprehensive assessment covering all aspects</p>
            </div>
            <div className="text-center p-6 bg-[#A8D5BA]/20 text-[#333333] rounded-2xl shadow hover:scale-105 transition-transform">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">5 Minutes</h3>
              <p className="opacity-90 font-medium">Quick and easy to complete</p>
            </div>
            <div className="text-center p-6 bg-[#FFF5E1]/50 text-[#333333] rounded-2xl shadow hover:scale-105 transition-transform">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Personalized</h3>
              <p className="opacity-90 font-medium">Tailored recommendations for you</p>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-[#A8D5BA] to-[#4CAF50] text-[#333333] px-16 py-6 rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-center">
                <Play className="w-8 h-8 mr-4" />
                {userProfile.completedQuestionnaire ? 'Retake Assessment' : 'Begin Assessment'}
              </div>
            </button>
          </div>
        </div>

        {/* Previous Results */}
        {userProfile.completedQuestionnaire && (
          <div className="bg-[#FFF5E1] text-[#333333] rounded-3xl p-8 shadow-xl border border-[#A1887F]">
            <h3 className="text-2xl font-black mb-4 flex items-center">
              <Target className="w-8 h-8 mr-3" />
              Your Previous Results
            </h3>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 flex justify-between">
              <div>
                <p className="text-lg font-bold mb-2">Dominant Dosha: {userProfile.dominantDosha?.toUpperCase()}</p>
                <p className="opacity-90 font-medium">
                  Last assessed: {userProfile.lastAssessmentDate ? new Date(userProfile.lastAssessmentDate).toLocaleDateString() : 'Recently'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black">{userProfile.assessmentsCompleted}</p>
                <p className="opacity-90 font-medium">Assessments</p>
              </div>
            </div>
          </div>
        )}

        {/* What to Expect */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#A1887F]">
          <h3 className="text-2xl font-black text-[#333333] mb-6">What to Expect</h3>
          <div className="space-y-4">
            {['Answer Questions', 'Get Your Results', 'Personalized Recommendations'].map((step, idx) => (
              <div className="flex items-start" key={idx}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1`} style={{ backgroundColor: idx === 0 ? '#FFB74D' : idx === 1 ? '#A8D5BA' : '#4CAF50' }}>
                  <span className="text-white font-bold text-sm">{idx + 1}</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#333333] mb-1">{step}</h4>
                  <p className="text-gray-600 font-medium">
                    {idx === 0
                      ? 'Respond to questions about your physical characteristics, preferences, and tendencies'
                      : idx === 1
                      ? 'Discover your dominant dosha and understand your unique constitution'
                      : 'Receive tailored lifestyle and wellness suggestions based on your dosha'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

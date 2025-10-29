import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Leaf } from 'lucide-react';
import { doshaQuestions } from '../data/questions';
import { DoshaResult } from '../types';

interface DoshaQuizProps {
  onComplete: (result: DoshaResult) => void;
}

export default function DoshaQuiz({ onComplete }: DoshaQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(doshaQuestions.length).fill(-1));

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < doshaQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 400);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < doshaQuestions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const calculateResult = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== -1) {
        const question = doshaQuestions[questionIndex];
        const selectedAnswer = question.answers[answerIndex];
        scores[selectedAnswer.dosha] += selectedAnswer.score;
      }
    });

    const dominant = Object.entries(scores).reduce((a, b) =>
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0] as keyof typeof scores;

    onComplete({
      dominantDosha: dominant,
      doshaScores: scores,
      completedQuestionnaire: true
    });
  };

  const progress = ((currentQuestion + 1) / doshaQuestions.length) * 100;
  const isAnswered = answers[currentQuestion] !== -1;
  const allAnswered = answers.every(ans => ans !== -1);

  return (
    <div className="min-h-screen bg-[#FFF5E1] pb-24 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#A8D5BA]/30 rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFB74D]/30 rounded-full filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#E0C097]/20 rounded-full filter blur-xl animate-pulse delay-2000 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#A8D5BA] to-[#4CAF50] rounded-full flex items-center justify-center shadow-2xl">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-black text-[#333333] ml-4">Dosha Assessment</h1>
          </div>
          <p className="text-[#333333] text-lg font-medium">
            Question {currentQuestion + 1} of {doshaQuestions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="w-full bg-white/60 rounded-full h-5 shadow-inner">
            <div
              className="bg-gradient-to-r from-[#A8D5BA] via-[#FFB74D] to-[#E0C097] h-5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#A1887F] mb-8">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{doshaQuestions[currentQuestion].question}</h2>
            <div className="space-y-4">
              {doshaQuestions[currentQuestion].answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    answers[currentQuestion] === idx
                      ? 'bg-[#A8D5BA]/20 border-[#4CAF50] shadow'
                      : 'bg-white border-gray-300 hover:bg-[#FFF5E1]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#333333] font-medium">{answer.text}</span>
                    {answers[currentQuestion] === idx && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${
                currentQuestion === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#333333] hover:bg-white/50'
              }`}
            >
              <ArrowLeft /> Previous
            </button>

            {currentQuestion === doshaQuestions.length - 1 ? (
              <button
                onClick={calculateResult}
                disabled={!allAnswered}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold ${
                  allAnswered
                    ? 'bg-gradient-to-r from-[#A8D5BA] via-[#FFB74D] to-[#E0C097] text-[#333333] shadow hover:scale-105 transition-transform font-bold'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Complete Assessment <CheckCircle className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={!isAnswered}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold ${
                  isAnswered
                    ? 'bg-gradient-to-r from-[#A8D5BA] via-[#FFB74D] to-[#E0C097] text-[#333333] shadow hover:scale-105 transition-transform font-bold'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next <ArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

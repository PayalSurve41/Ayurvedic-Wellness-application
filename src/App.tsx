import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Assessment from './components/Assessment';
import DoshaResults from './components/DoshaResults';
import Profile from './components/Profile';
import DoshaQuiz from './components/DoshaQuiz';
import MentalWellness from './components/MentalWellness';
import IndianWisdom from './components/IndianWisdom';
import AIAddOn from './components/AIAddOn';
import TimetableGenerator from "./components/TimetableGenerator";
import { UserProfile } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showQuiz, setShowQuiz] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    assessmentsCompleted: 0,
    joinedDate: new Date().toISOString(),
  });

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('ayurveda-profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ayurveda-profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const handleQuizComplete = (result: { dominantDosha: 'vata' | 'pitta' | 'kapha'; doshaScores: { vata: number; pitta: number; kapha: number; }; completedQuestionnaire: boolean }) => {
    const wasFirstTime = !userProfile.completedQuestionnaire;
    
    setUserProfile(prev => ({
      ...prev,
      dominantDosha: result.dominantDosha,
      doshaScores: result.doshaScores,
      completedQuestionnaire: result.completedQuestionnaire,
      assessmentsCompleted: wasFirstTime ? prev.assessmentsCompleted + 1 : prev.assessmentsCompleted,
      lastAssessmentDate: new Date().toISOString(),
    }));
    
    setShowQuiz(false);
    setActiveTab('dosha'); // Navigate to dosha results
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const handleStartAssessment = () => {
    setActiveTab('assessment');
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleGoToProfile = () => {
    setActiveTab('profile');
  };

  const renderActiveTab = () => {
    if (showQuiz) {
      return <DoshaQuiz onComplete={handleQuizComplete} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <Home 
            onStartAssessment={handleStartAssessment}
            userProfile={userProfile}
          />
        );
      case 'assessment':
        return (
          <Assessment 
            onStartQuiz={handleStartQuiz}
            userProfile={userProfile}
          />
        );
      case 'dosha':
        return (
          <DoshaResults 
            userProfile={userProfile}
            onGoToProfile={handleGoToProfile}
          />
        );
      case 'profile':
        return (
          <Profile 
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onStartQuiz={handleStartQuiz}
          />
        );
      default:
        return (
          <Home 
            onStartAssessment={handleStartAssessment}
            userProfile={userProfile}
          />
        );
    case "TimetableGenerator":
      return (
        <TimetableGenerator
          dosha={userProfile.dominantDosha ?? "vata"}
          userProfile={userProfile}
        />
      );
    case 'wellness':
      return <MentalWellness />; 
    case 'wisdom':
      return <IndianWisdom />; 
    case 'ai':
      return <AIAddOn />;







    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {renderActiveTab()}
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
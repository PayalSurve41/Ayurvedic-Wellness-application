// 📁 src/pages/Profile.tsx
import React, { useState } from 'react';
import {
  User, Edit3, Leaf, Wind, Flame, Camera, Heart, Target,
} from 'lucide-react';
import { UserProfile } from '../types';
import { doshaInfo } from '../data/doshas';

interface ProfileProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  onStartQuiz: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userProfile, onUpdateProfile, onStartQuiz }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name || '',
    age: userProfile.age || '',
    email: userProfile.email || '',
  });

  const handleSave = () => {
    onUpdateProfile({
      name: editForm.name,
      age: editForm.age ? parseInt(editForm.age.toString()) : undefined,
      email: editForm.email,
    });
    setIsEditing(false);
  };

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case 'vata': return <Wind className="w-6 h-6 text-sky-600" />;
      case 'pitta': return <Flame className="w-6 h-6 text-orange-600" />;
      case 'kapha': return <Leaf className="w-6 h-6 text-green-600" />;
      default: return <Leaf className="w-6 h-6 text-emerald-600" />;
    }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata': return 'from-sky-200 via-indigo-100 to-emerald-200';
      case 'pitta': return 'from-orange-200 via-amber-100 to-yellow-200';
      case 'kapha': return 'from-green-200 via-emerald-100 to-lime-200';
      default: return 'from-pink-200 via-purple-100 to-orange-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-lime-50 text-gray-900 pb-24 transition-all duration-500">
      {/* 🌿 Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 text-white px-6 py-12 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/leaf-pattern.svg')] opacity-10 bg-cover"></div>
        <div className="text-center relative z-10">
          <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm relative border border-white/30">
            <User className="w-12 h-12 text-white" />
            <button className="absolute bottom-1 right-1 bg-white/40 p-1.5 rounded-full hover:bg-white/60 transition-all">
              <Camera className="w-4 h-4 text-gray-800" />
            </button>
          </div>
          <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">Your Ayurvedic Profile</h1>
          <p className="text-lg opacity-90 font-medium">Balance • Heal • Thrive 🌺</p>
        </div>
      </div>

      {/* 🌸 Profile Content */}
      <div className="px-6 py-8 space-y-10">
        {/* Personal Info */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-200 transition-all hover:shadow-green-200/50">
          {isEditing ? (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center text-green-700">
                <Edit3 size={24} className="mr-3 text-green-500" />
                Edit Your Details
              </h3>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-6 py-3 bg-green-50 border-2 border-green-200 rounded-2xl text-gray-800 focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    className="w-full px-6 py-3 bg-green-50 border-2 border-green-200 rounded-2xl text-gray-800 focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-6 py-3 bg-green-50 border-2 border-green-200 rounded-2xl text-gray-800 focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all"
                  />
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 rounded-2xl font-bold hover:from-green-600 hover:to-lime-600 shadow-lg transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-lime-400 rounded-full flex items-center justify-center shadow-lg">
                  <User className="text-white w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{userProfile.name || 'Ayurveda Seeker'}</h3>
                  <p className="text-gray-600">{userProfile.email || 'No email added'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 rounded-full hover:bg-green-100 transition-colors"
              >
                <Edit3 className="text-green-600" />
              </button>
            </div>
          )}
        </div>

        {/* 🌞 Dosha Card */}
        {userProfile.dominantDosha && (
          <div className={`bg-gradient-to-br ${getDoshaColor(userProfile.dominantDosha)} rounded-3xl p-8 shadow-2xl`}>
            <div className="flex items-center mb-4">
              {getDoshaIcon(userProfile.dominantDosha)}
              <h3 className="text-2xl font-bold ml-3">
                Dominant Dosha: {userProfile.dominantDosha.toUpperCase()}
              </h3>
            </div>
            <p className="text-lg mb-2 leading-relaxed">
              {doshaInfo[userProfile.dominantDosha]?.description}
            </p>
          </div>
        )}

        {/* 🍃 Quick Wellness Summary */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-200">
          <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center">
            <Heart className="w-6 h-6 mr-3 text-rose-500" /> Your Wellness Summary
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: '🍎 Food', text: 'Favor warm, fresh, sattvic meals rich in ghee, herbs, and grains.' },
              { title: '🧘 Yoga', text: 'Practice grounding asanas like Tree Pose and mindful breathing.' },
              { title: '🧠 Mind', text: 'Meditate daily with awareness. Maintain inner stillness.' },
              { title: '🌿 Lifestyle', text: 'Sleep early, rise with the sun, and walk in nature daily.' },
            ].map((item) => (
              <div key={item.title} className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-6 shadow-md hover:shadow-green-200 transition-all">
                <h4 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h4>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🌸 Retake Assessment */}
        <div className="bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-3xl p-8 shadow-2xl text-center">
          <Target size={40} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Rebalance Your Dosha</h3>
          <p className="mb-6 opacity-90">
            Retake your dosha assessment anytime to update your wellness path 🌿
          </p>
          <button
            onClick={onStartQuiz}
            className="bg-white/20 px-10 py-3 rounded-full font-bold hover:bg-white/30 transition-all shadow-md"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

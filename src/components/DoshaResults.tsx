import React from "react";
import {
  Wind,
  Flame,
  Leaf,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { UserProfile } from "../types";
import { doshaInfo } from "../data/doshas";

interface DoshaResultsProps {
  userProfile: UserProfile;
  onGoToProfile: () => void;
}

export default function DoshaResults({
  userProfile,
  onGoToProfile,
}: DoshaResultsProps) {
  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case "vata":
        return <Wind className="w-12 h-12 text-blue-600" />;
      case "pitta":
        return <Flame className="w-12 h-12 text-red-600" />;
      case "kapha":
        return <Leaf className="w-12 h-12 text-green-600" />;
      default:
        return <Sparkles className="w-12 h-12 text-amber-600" />;
    }
  };

  const getDoshaGradient = (dosha: string) => {
    switch (dosha) {
      case "vata":
        return "from-[#A7C7E7] to-[#89CFF0]"; // airy blue gradient
      case "pitta":
        return "from-[#FF9966] to-[#FF5E62]"; // fiery orange-red
      case "kapha":
        return "from-[#A8E063] to-[#56AB2F]"; // green & earthy
      default:
        return "from-[#FFD194] to-[#D1913C]"; // warm gold
    }
  };

  if (!userProfile.dominantDosha) {
    return (
      <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center pb-24">
        <p className="text-xl text-gray-800">
          No dosha results available. Please take the assessment first.
        </p>
      </div>
    );
  }

  const dominantDosha = userProfile.dominantDosha;
  const doshaData = doshaInfo[dominantDosha];
  const isLight = ["vata", "kapha"].includes(dominantDosha);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FFF3D0] to-[#FAEBD7] pb-24 relative overflow-hidden text-gray-900">
      {/* Floating Glow Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-16 w-36 h-36 bg-gradient-to-br from-green-200/20 to-orange-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      {/* Header Section */}
      <div
        className={`bg-gradient-to-br ${getDoshaGradient(
          dominantDosha
        )} text-white px-6 py-16 relative overflow-hidden`}
      >
        <div className="relative text-center">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border-4 border-white/30 shadow-2xl">
            {getDoshaIcon(dominantDosha)}
          </div>
          <h1 className="text-5xl font-black mb-2 drop-shadow-lg">
            Congratulations!
          </h1>
          <h2 className="text-3xl font-bold mb-2 drop-shadow">
            Your Dominant Dosha is
          </h2>
          <h3 className="text-6xl font-black mb-4 capitalize bg-gradient-to-r from-yellow-100 to-orange-100 bg-clip-text text-transparent drop-shadow">
            {dominantDosha}
          </h3>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-100">
            {doshaData?.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-12 space-y-8">
        {/* Dosha Balance Section */}
        {userProfile.doshaScores && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-amber-200">
            <h3 className="text-2xl font-black text-center mb-6 text-gray-900">
              Your Dosha Balance
            </h3>
            <div className="space-y-4">
              {Object.entries(userProfile.doshaScores).map(([dosha, score]) => {
                const total = Object.values(userProfile.doshaScores!).reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage = Math.round((score / total) * 100);
                const isDominant = dosha === dominantDosha;
                return (
                  <div
                    key={dosha}
                    className={`p-4 rounded-2xl ${
                      isDominant
                        ? `bg-gradient-to-r ${getDoshaGradient(
                            dosha
                          )} text-white shadow-lg`
                        : "bg-amber-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {getDoshaIcon(dosha)}
                        <div className="ml-4">
                          <h4
                            className={`text-xl font-bold capitalize ${
                              isDominant ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {dosha}{" "}
                            {isDominant && (
                              <span className="ml-2 text-yellow-200">★</span>
                            )}
                          </h4>
                          <p
                            className={`font-medium ${
                              isDominant ? "text-white/90" : "text-gray-600"
                            }`}
                          >
                            {percentage}% of your constitution
                          </p>
                        </div>
                      </div>
                      {isDominant && (
                        <CheckCircle className="w-6 h-6 text-yellow-200" />
                      )}
                    </div>
                    <div
                      className={`w-full ${
                        isDominant ? "bg-white/20" : "bg-gray-200"
                      } rounded-full h-3`}
                    >
                      <div
                        className={`${
                          isDominant
                            ? "bg-white"
                            : `bg-gradient-to-r ${getDoshaGradient(dosha)}`
                        } h-3 rounded-full transition-all duration-700`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Characteristics */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-amber-200">
          <h3 className="text-2xl font-black mb-6 flex items-center text-gray-900">
            <Star className="w-6 h-6 mr-2 text-yellow-600" /> Key
            Characteristics
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {doshaData?.characteristics.map((trait, idx) => (
              <div
                key={idx}
                className="flex items-center p-3 bg-amber-50 rounded-xl border border-amber-200"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-3"></div>
                <span className="text-gray-800 font-medium">{trait}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-amber-200">
          <h3 className="text-2xl font-black mb-6 flex items-center text-gray-900">
            <Sparkles className="w-6 h-6 mr-2 text-orange-500" /> Personalized
            Recommendations
          </h3>
          <div className="space-y-3">
            {doshaData?.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="flex items-start p-4 bg-amber-50 rounded-xl border border-amber-200 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full flex items-center justify-center mr-3 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-800 font-medium">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={onGoToProfile}
            className="group bg-gradient-to-r from-green-600 via-amber-500 to-orange-500 text-white p-6 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
          >
            <ArrowRight className="w-6 h-6 mr-2 group-hover:scale-125 transition-transform" />{" "}
            View Full Profile
          </button>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-amber-200 text-center">
            <Star className="w-10 h-10 mx-auto mb-2 text-amber-600" />
            <h4 className="text-xl font-bold text-gray-900 mb-1">
              Assessment Complete!
            </h4>
            <p className="text-gray-700 font-medium">
              Your results have been saved to your profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

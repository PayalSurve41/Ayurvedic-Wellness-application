import React, { useState, useEffect } from "react";
import {
  Smile,
  Frown,
  Meh,
  Wind,
  Heart,
  Moon,
  Play,
  RefreshCw,
  Leaf,
} from "lucide-react";

const wellnessTips: Record<string, string[]> = {
  happy: [
    "Start your day with warm lemon water and gratitude.",
    "Do a short Surya Namaskar flow for inner balance.",
    "Eat sattvic foods — fresh fruits, ghee, and whole grains.",
  ],
  calm: [
    "Practice meditation under natural light or near plants.",
    "Have chamomile or tulsi tea to soothe the senses.",
    "Apply sandalwood paste on the forehead for cooling effect.",
  ],
  stressed: [
    "Rub Brahmi or coconut oil on your scalp to release tension.",
    "Walk barefoot on grass early morning.",
    "Avoid spicy foods and late-night screen exposure.",
  ],
  anxious: [
    "Do Nadi Shodhana pranayama for 5–10 minutes.",
    "Drink warm milk with turmeric before bed.",
    "Journal your feelings and end with gratitude.",
  ],
  tired: [
    "Try Abhyanga — gentle self-massage with sesame oil.",
    "Take a short nap after lunch (20 minutes max).",
    "Listen to soft flute or nature sounds before sleep.",
  ],
};

const moodOptions = [
  { id: "happy", label: "Happy", icon: Smile, color: "text-amber-500" },
  { id: "calm", label: "Calm", icon: Heart, color: "text-green-500" },
  { id: "stressed", label: "Stressed", icon: Frown, color: "text-red-500" },
  { id: "anxious", label: "Anxious", icon: Meh, color: "text-blue-500" },
  { id: "tired", label: "Tired", icon: Moon, color: "text-purple-500" },
];

const affirmations = [
  "I am grounded, peaceful, and whole.",
  "My energy flows with balance and purpose.",
  "I am connected to nature’s calm rhythm.",
  "I radiate healing and light from within.",
  "I honor my body, mind, and spirit equally.",
];

const meditationVideos: Record<string, string> = {
  happy: "https://www.youtube.com/embed/inpok4MKVLM",
  calm: "https://www.youtube.com/embed/z6X5oEIg6Ak",
  stressed: "https://www.youtube.com/embed/inpok4MKVLM",
  anxious: "https://www.youtube.com/embed/O-6f5wQXSu8",
  tired: "https://www.youtube.com/embed/aEqlQvczMJQ",
};

const MentalWellness: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [affirmation, setAffirmation] = useState<string>(affirmations[0]);
  const [breathingPhase, setBreathingPhase] = useState<string>("Inhale");
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const generateAffirmation = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(random);
  };

  useEffect(() => {
    if (!timerRunning) return;
    const phases = ["Inhale", "Hold", "Exhale", "Hold"];
    let index = 0;
    const interval = setInterval(() => {
      setBreathingPhase(phases[index]);
      index = (index + 1) % phases.length;
    }, 4000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-gradient-to-br from-[#F6E3FF] via-[#FFF8E7] to-[#C0EBA6] min-h-screen rounded-3xl shadow-xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Leaf className="text-green-600" size={28} />
          <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
            Ayurvedic Wellness & Mindfulness
          </h2>
        </div>
        <p className="text-gray-600 italic">
          “Balance your Doshas — nurture your mind, body, and spirit.”
        </p>
      </div>

      {/* Mood Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {moodOptions.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => setSelectedMood(id)}
            className={`flex flex-col items-center justify-center border-2 rounded-2xl py-4 transition-all duration-300 shadow-md ${
              selectedMood === id
                ? "bg-gradient-to-br from-[#E58E26] to-[#C3A87B] text-white shadow-xl"
                : "bg-white hover:bg-[#FFF3C7] text-gray-700 border-[#E6CBA8]"
            }`}
          >
            <Icon
              className={`mb-2 ${selectedMood === id ? "text-white" : color}`}
              size={28}
            />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Mind-Body Tips */}
      {selectedMood && (
        <div className="mt-4 bg-[#FFFDF4]/80 p-5 rounded-2xl border border-[#C3A87B]/40 shadow-inner">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#E58E26]">
            <Wind /> Mind-Body Harmony
          </h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
            {wellnessTips[selectedMood].map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Meditation */}
      {selectedMood && (
        <div className="bg-gradient-to-br from-[#FFF8E7] to-[#F6E3FF] rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#C67C4E]">
            <Play /> Guided Meditation
          </h3>
          <div className="aspect-video rounded-xl overflow-hidden shadow-md border border-[#C3A87B]/30">
            <iframe
              className="w-full h-full"
              src={meditationVideos[selectedMood]}
              title="Guided Meditation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Affirmation */}
      <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-md text-center">
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2 text-[#E58E26]">
          <Heart /> Daily Ayurvedic Affirmation
        </h3>
        <p className="text-gray-800 italic text-lg mb-3">“{affirmation}”</p>
        <button
          onClick={generateAffirmation}
          className="px-4 py-2 bg-[#E58E26] text-white rounded-xl shadow hover:bg-[#C67C4E] flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Breathing Timer */}
      <div className="bg-gradient-to-br from-[#A7D8D8]/40 to-[#C0EBA6]/50 p-6 rounded-2xl shadow-lg text-center">
        <h3 className="text-lg font-semibold mb-3 flex justify-center items-center gap-2 text-[#348E91]">
          <Wind /> Pranayama Breathing
        </h3>

        <div className="flex flex-col items-center">
          <div
            className={`w-32 h-32 rounded-full flex items-center justify-center text-xl font-bold text-[#348E91] border-4 border-[#A7D8D8] transition-all duration-1000 ${
              breathingPhase === "Inhale" || breathingPhase === "Hold"
                ? "scale-110 bg-[#A7D8D8]/30"
                : "scale-90 bg-[#F6E3FF]/30"
            }`}
          >
            {breathingPhase}
          </div>

          <button
            onClick={() => setTimerRunning((prev) => !prev)}
            className="mt-4 px-5 py-2 bg-[#C67C4E] text-white rounded-xl shadow-lg hover:bg-[#E58E26]"
          >
            {timerRunning ? "Stop" : "Start"} Breathing
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentalWellness;

import React from "react";
import {
  Home,
  User,
  Brain,
  Sparkles,
  CalendarClock,
  Heart,
  Book,
  Lightbulb,
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "assessment", label: "Assessment", icon: Brain },
    { id: "dosha", label: "Your Dosha", icon: Sparkles },
    { id: "TimetableGenerator", label: "Timetable", icon: CalendarClock },
    { id: "wisdom", label: "Wisdom", icon: Book },
    { id: "wellness", label: "Wellness", icon: Heart },
    { id: "ai", label: "AI Tips", icon: Lightbulb },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#FFF8E7]/95 via-[#FFEAC0]/95 to-[#F9DCC4]/95 backdrop-blur-md border-t border-amber-200 px-4 py-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center px-3 py-2 rounded-2xl transition-all duration-300 ease-out mx-1 ${
                isActive
                  ? "text-amber-50 bg-gradient-to-br from-[#FF9966] via-[#FF7E5F] to-[#FF5E62] shadow-lg scale-110"
                  : "text-gray-700 hover:text-orange-600 hover:bg-amber-50"
              }`}
              style={{
                minWidth: "64px",
              }}
            >
              <div
                className={`transition-transform duration-500 ${
                  isActive ? "scale-125 drop-shadow-lg" : "scale-100"
                }`}
              >
                <IconComponent
                  size={24}
                  strokeWidth={2.2}
                  className={`${isActive ? "text-white" : "text-gray-700"}`}
                />
              </div>
              <span
                className={`mt-1 text-[11px] font-semibold tracking-tight ${
                  isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {tab.label}
              </span>

              {/* Active glowing ring */}
              {isActive && (
                <span className="absolute -top-2 w-2 h-2 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;

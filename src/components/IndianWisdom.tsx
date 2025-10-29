// src/components/IndianWisdom.tsx
import React, { useState } from "react";
import { Lightbulb, Book, Leaf, Coffee, Moon, Sun } from "lucide-react";

interface Article {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: string;
  subsection?: string;
  link?: string;
  image?: string;
  video?: string;
}

interface FunFact {
  fact: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tooltip?: string;
  category?: string;
  image?: string;
}

const articles: Article[] = [
  {
    title: "Ayurveda: The Science of Life",
    description:
      "Ayurveda emphasizes balance in body, mind, and spirit using natural remedies and daily routines. Learn about doshas, daily rituals, and herbal remedies.",
    icon: Book,
    category: "Ayurveda",
    image: "https://images.unsplash.com/photo-1492552181161-62217fc3076d?auto=format&fit=crop&q=60&w=600",
    video: "https://www.youtube.com/embed/e1JxKx0nFP8",
  },
  {
    title: "Yoga Sutras",
    description:
      "Ancient teachings of Patanjali’s Yoga Sutras provide guidance for mental clarity, self-discipline, and meditation.",
    icon: Leaf,
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=60&w=600",
    video: "https://www.youtube.com/embed/z6X5oEIg6Ak",
  },
  {
    title: "Indian Food Practices",
    description:
      "Explore sattvic, rajasic, and tamasic foods for holistic health. Learn how spices, meal timings, and preparation affect body and mind.",
    icon: Coffee,
    category: "Food",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=60&w=600",
  },
  {
    title: "Meditation & Mindfulness",
    description:
      "Daily meditation practices improve focus, reduce stress, and enhance overall well-being. Techniques include breathing exercises, guided visualization, and mantra meditation.",
    icon: Sun,
    category: "Mindfulness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=60&w=600",
    video: "https://www.youtube.com/embed/inpok4MKVLM",
  },
];

const funFacts: FunFact[] = [
  {
    fact: "Turmeric contains curcumin, a natural anti-inflammatory and antioxidant.",
    icon: Lightbulb,
    tooltip: "Curcumin helps reduce inflammation and oxidative stress in the body.",
    category: "Health Benefits",
    image: "https://images.unsplash.com/photo-1598866530881-5a54a3b06b6f?auto=format&fit=crop&w=400&q=60",
  },
  {
    fact: "A sattvic diet promotes clarity, calmness, and spiritual growth.",
    icon: Leaf,
    tooltip: "Sattvic foods include fresh fruits, vegetables, whole grains, and nuts.",
    category: "Food & Spices",
    image: "https://images.unsplash.com/photo-1611171712314-fd4b3f3b92a1?auto=format&fit=crop&w=400&q=60",
  },
  {
    fact: "Yoga improves flexibility, strength, and mental well-being.",
    icon: Moon,
    tooltip: "Regular yoga practice reduces stress and enhances body awareness.",
    category: "Yoga & Meditation",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=60",
  },
];

const categories = ["All", "Ayurveda", "Yoga", "Food", "Mindfulness"];

const IndianWisdom: React.FC = () => {
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSection, setShowSection] = useState<"articles" | "funfacts">("articles");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (idx: number) => {
    setExpandedArticle(expandedArticle === idx ? null : idx);
  };

  const filteredArticles = articles.filter(
    (a) =>
      (selectedCategory === "All" || a.category === selectedCategory) &&
      (a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFunFacts = funFacts.filter(
    (f) =>
      f.fact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.category && f.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gradient-to-br from-amber-50 via-emerald-50 to-yellow-50 rounded-3xl shadow-inner">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#2E2E2E]">
        🌿 Indian Traditional Wisdom
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search articles or fun facts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xl border border-[#C0A060] bg-white/80 rounded-xl px-4 py-2 text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
        />
      </div>

      {/* Section Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            showSection === "articles"
              ? "bg-gradient-to-r from-[#D97706] to-[#A0522D] text-white shadow-md"
              : "bg-white/70 text-[#2E2E2E]"
          }`}
          onClick={() => setShowSection("articles")}
        >
          Articles
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition ${
            showSection === "funfacts"
              ? "bg-gradient-to-r from-[#65A30D] to-[#A0522D] text-white shadow-md"
              : "bg-white/70 text-[#2E2E2E]"
          }`}
          onClick={() => setShowSection("funfacts")}
        >
          Fun Facts
        </button>
      </div>

      {/* Category Tabs */}
      {showSection === "articles" && (
        <div className="flex justify-center flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-[#D97706] to-[#A0522D] text-white shadow-md"
                  : "bg-white/70 text-[#2E2E2E]"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Articles Section */}
      {showSection === "articles" && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(({ title, description, icon: Icon, category, image, video, link }, idx) => {
            const isExpanded = expandedArticle === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer border border-[#E5D1A1]"
              >
                {image && <img src={image} alt={title} className="rounded-t-2xl w-full h-40 object-cover" />}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="text-[#A0522D]" size={24} />
                    <span className="font-semibold text-[#2E2E2E]">{category}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[#2E2E2E]">{title}</h3>
                  <p className="text-[#4B4B4B] text-sm">
                    {isExpanded ? description : description.slice(0, 100) + "..."}
                  </p>
                  {isExpanded && video && (
                    <div className="mt-3 aspect-video rounded-xl overflow-hidden shadow-md">
                      <iframe
                        src={video}
                        title={title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <div className="mt-3 flex justify-between items-center">
                    <button
                      className="text-[#D97706] underline text-sm"
                      onClick={() => toggleExpand(idx)}
                    >
                      {isExpanded ? "Collapse" : "Read More"}
                    </button>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#65A30D] underline"
                      >
                        External Link
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fun Facts Section */}
      {showSection === "funfacts" && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFunFacts.map(({ fact, icon: Icon, tooltip, category, image }, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#FFF9E5] to-[#E8F5E9] rounded-2xl p-4 shadow-md flex items-start gap-3 hover:scale-105 transition-transform duration-300 relative group border border-[#F0D89A]"
            >
              {image && <img src={image} alt={fact} className="w-12 h-12 object-cover rounded-full" />}
              <Icon className="text-[#D97706] mt-1" size={24} />
              <div>
                <p className="text-[#2E2E2E] text-sm">{fact}</p>
                {category && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-[#FDE68A] text-[#784600] rounded-full text-xs font-medium">
                    {category}
                  </span>
                )}
              </div>
              {tooltip && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-xs bg-[#2E2E2E] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {tooltip}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndianWisdom;

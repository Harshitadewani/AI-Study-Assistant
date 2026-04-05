import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaBook, FaCode, FaPenFancy } from "react-icons/fa";

const CARD_COLORS = {
  planner: "from-blue-500 to-blue-600 text-white",
  aiNotes: "from-green-500 to-green-600 text-white",
  codeDoubt: "from-red-500 to-red-600 text-white",
  notesGenerator: "from-pink-500 to-pink-600 text-white",
};

export default function DashboardPage() {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  if (loading || !user) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  // Feature cards with navigation and colors
  const featureCards = [
    {
      title: "Study Planner",
      icon: <FaClipboardList size={48} />,
      color: CARD_COLORS.planner,
      link: "/planner",
    },
    {
      title: "AI Notes",
      icon: <FaBook size={48} />,
      color: CARD_COLORS.aiNotes,
      link: "/ai-doubt",
    },
    {
      title: "Code Doubts",
      icon: <FaCode size={48} />,
      color: CARD_COLORS.codeDoubt,
      link: "/coding-doubt",
    },
    {
      title: "Notes Generator",
      icon: <FaPenFancy size={48} />,
      color: CARD_COLORS.notesGenerator,
      link: "/notes",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">

      {/* Welcome */}
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500 mb-2">
          👋 Hello {user.name}!
        </h1>
        <p className="text-slate-600 text-lg">
          Explore your AI-powered study tools 🚀
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureCards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.link)}
            className={`relative bg-gradient-to-br ${card.color} p-8 rounded-3xl shadow-2xl cursor-pointer transform transition-all duration-500 
              hover:scale-105 hover:-translate-y-2 hover:shadow-4xl hover:rotate-1 flex flex-col items-center justify-center gap-6 text-center`}
            style={{ minHeight: "300px" }}
          >
            <div className="text-white">{card.icon}</div>
            <h3 className="text-2xl font-bold text-white">{card.title}</h3>
            <p className="text-white/90 text-lg">Tap to open</p>
          </div>
        ))}
      </div>

    </div>
  );
}
import { Link } from "react-router-dom";

const cards = [
  { to: "/ai-doubt", title: "AI Doubt Solver", desc: "Ask AI any study doubt", icon: "🤖", color: "bg-blue-500" },
  { to: "/coding-doubt", title: "Code Solver", desc: "Debug or explain code", icon: "💻", color: "bg-emerald-500" },
  { to: "/planner", title: "Study Planner", desc: "Generate study schedule", icon: "📅", color: "bg-amber-500" },
  { to: "/notes", title: "Notes Generator", desc: "Generate notes from topics", icon: "📝", color: "bg-rose-500" },
];

export const DashboardCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    {cards.map(({ to, title, desc, icon, color }) => (

      <div
        key={to}
        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
      >

        {/* Icon */}
        <div
          className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-3xl mb-4`}
        >
          {icon}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-slate-800 mb-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 mb-4">
          {desc}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">

          <Link
            to={to}
            className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
          >
            Open
          </Link>

          <button
            className="px-3 py-1 bg-slate-100 text-sm rounded-md hover:bg-slate-200 transition"
          >
            🎤 Speak
          </button>

        </div>

      </div>

    ))}

  </div>
);
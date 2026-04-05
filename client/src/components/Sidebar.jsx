import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/ai-doubt", label: "AI Doubt", icon: "🤖" },
  { to: "/coding-doubt", label: "Code Solver", icon: "💻" },
  { to: "/planner", label: "Study Planner", icon: "📅" },
  { to: "/notes", label: "Notes Generator", icon: "📝" },
];

export const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col">

    {/* Logo Section */}
    <div className="p-6 border-b border-slate-200">

      <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
        🤖 AI Study
      </h1>

      <p className="text-xs text-slate-500 mt-1">
        Assistant
      </p>

    </div>

    {/* Navigation */}
    <nav className="flex-1 p-4 space-y-2">

      {navItems.map(({ to, label, icon }) => (

        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                : "text-slate-600 hover:bg-slate-100"
            }`
          }
        >

          <span className="text-lg">{icon}</span>

          {label}

        </NavLink>

      ))}

    </nav>

    {/* Bottom Section */}
    <div className="p-4 border-t border-slate-200 text-xs text-slate-400">
      © AI Study Assistant
    </div>

  </aside>
);
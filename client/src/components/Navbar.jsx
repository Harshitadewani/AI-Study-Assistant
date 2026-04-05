import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">

      {/* Logo / Title */}
      <h2 className="text-lg font-semibold text-slate-800">
        🤖 AI Study Assistant
      </h2>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Notification */}
        <button className="text-xl hover:bg-slate-100 p-2 rounded-lg">
          🔔
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">

          <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full text-sm font-semibold">
            {(user?.name || user?.email)?.charAt(0).toUpperCase()}
          </div>

          <span className="text-sm text-slate-700 hidden sm:block">
            {user?.name || user?.email}
          </span>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
};
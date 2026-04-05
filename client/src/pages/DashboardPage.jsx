import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ SPA navigation
import axios from "axios";
import { FaClipboardList, FaBook, FaCode, FaBullseye } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuthStore } from "../store/authStore";

const GoalTracker = () => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-3">
        <FaBullseye size={28} />
        <h2 className="text-xl font-bold">🎯 Daily Goal</h2>
      </div>
      <p className="text-purple-100">
        Your study time is automatically tracked ⏳ Keep it up!
      </p>
    </div>
  );
};

export default function DashboardPage() {
  const { user, loading } = useAuthStore();
  const userId = user?._id;

  const [selectedDay, setSelectedDay] = useState(null);
  const [studyHours, setStudyHours] = useState([]);

  useEffect(() => {
    if (loading || !userId) return;

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, [userId, loading]);

  const fetchData = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`/api/study/weekly/${userId}`);
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const formatted = days.map((day, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dateStr = new Date(date).toLocaleDateString("en-CA");
        const found = res.data.find((d) => d.date === dateStr);
        return { day, hours: found ? found.hours : 0 };
      });
      setStudyHours(formatted);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  const recentActivities = [
    "Solved coding doubt",
    "Generated AI notes",
    "Created study plan",
  ];

  if (loading || !user) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Welcome */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500 mb-2">
          👋 Hello {user.name}!
        </h1>
        <p className="text-slate-600 text-lg">
          Track your real study progress with AI 🚀
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Study Planner", icon: <FaClipboardList size={32} />, link: "/planner" },
          { title: "AI Notes", icon: <FaBook size={32} />, link: "/ai-doubt" },
          { title: "Code Doubts", icon: <FaCode size={32} />, link: "/coding-doubt" },
        ].map((card) => (
          <Link
            key={card.title}
            to={card.link} // ✅ SPA navigation
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex flex-col items-center gap-4 text-center"
          >
            <div className="text-purple-600">{card.icon}</div>
            <h3 className="font-semibold text-lg">{card.title}</h3>
            <p className="text-slate-500">Click to open</p>
          </Link>
        ))}
      </div>

      {/* Goal + Chart */}
      <div className="grid md:grid-cols-2 gap-6">
        <GoalTracker />
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            📊 Weekly Study Hours
          </h2>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={studyHours}>
              <XAxis dataKey="day" tick={{ fill: "#6366f1", fontWeight: "bold" }} />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: "10px" }} />
              <Bar
                dataKey="hours"
                fill="url(#colorGrad)"
                radius={[6, 6, 0, 0]}
                onClick={(data) => setSelectedDay(data.day)}
                cursor="pointer"
              >
                <defs>
                  <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7f5af0" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#4c6ef5" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {selectedDay && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg text-purple-800">
              <p className="font-semibold">📅 {selectedDay} Details</p>
              <p className="text-sm">
                You studied {studyHours.find((d) => d.day === selectedDay)?.hours} hrs
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          📝 Recent Activities
        </h2>

        <ul className="space-y-2 text-slate-700">
          {recentActivities.map((act, i) => (
            <li
              key={i}
              className="bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 p-3 rounded-lg hover:from-purple-200 hover:via-indigo-200 hover:to-blue-200 transition"
            >
              {act}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
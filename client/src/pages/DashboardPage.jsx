import { useState, useEffect } from "react";
import axios from "axios";
import { FaClipboardList, FaBook, FaCode } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuthStore } from "../store/authStore"; // ✅ IMPORTANT

// 🎯 Goal Tracker (AUTO MODE)
const GoalTracker = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">
        🎯 Daily Goal
      </h2>

      <p className="text-slate-600">
        Your study time is automatically tracked ⏳
      </p>
    </div>
  );
};

export default function DashboardPage() {
  const { user, loading } = useAuthStore(); // ✅ get user from context
  const userId = user?._id;

  console.log("Dashboard userId:", userId);

  const [selectedDay, setSelectedDay] = useState(null);
  const [studyHours, setStudyHours] = useState([]);

  // 🔥 FETCH DATA ONLY WHEN USER READY
  useEffect(() => {
    if (loading || !userId) {
      console.log("User not ready ❌");
      return;
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000); // auto refresh

    return () => clearInterval(interval);
  }, [userId, loading]);

  const fetchData = async () => {
    if (!userId) return;

    try {
      const res = await axios.get(`/api/study/weekly/${userId}`);

      console.log("API DATA:", res.data);

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      const formatted = days.map((day, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));

        const dateStr = new Date(date).toLocaleDateString("en-CA");

        const found = res.data.find((d) => d.date === dateStr);

        return {
          day,
          hours: found ? found.hours : 0,
        };
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

  // 🔄 LOADING UI
  if (loading || !user) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* 👋 Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          👋 Hello {user.name}!
        </h1>
        <p className="text-slate-600">
          Track your real study progress with AI 🚀
        </p>
      </div>

      {/* 🚀 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Study Planner", icon: <FaClipboardList size={30} />, link: "/planner" },
          { title: "AI Notes", icon: <FaBook size={30} />, link: "/notes" },
          { title: "Code Doubts", icon: <FaCode size={30} />, link: "/doubts" },
        ].map((card) => (
          <div
            key={card.title}
            onClick={() => (window.location.href = card.link)}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 cursor-pointer transition-all duration-300 flex flex-col items-center gap-4 text-center"
          >
            <div className="text-indigo-600">{card.icon}</div>
            <h3 className="font-semibold text-lg">{card.title}</h3>
            <p className="text-slate-500">Click to open</p>
          </div>
        ))}
      </div>

      {/* 🎯 Goal + 📊 Chart */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Goal Tracker */}
        <GoalTracker />

        {/* Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            📊 Weekly Study Hours
          </h2>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={studyHours}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="hours"
                fill="#6366f1"
                radius={[5, 5, 0, 0]}
                onClick={(data) => setSelectedDay(data.day)}
                cursor="pointer"
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Day Details */}
          {selectedDay && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="font-semibold">📅 {selectedDay} Details</p>
              <p className="text-sm text-slate-600">
                You studied{" "}
                {studyHours.find((d) => d.day === selectedDay)?.hours} hrs
              </p>
            </div>
          )}
        </div>

      </div>

      {/* 📝 Recent Activity */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          📝 Recent Activities
        </h2>

        <ul className="space-y-2 text-slate-700">
          {recentActivities.map((act, i) => (
            <li
              key={i}
              className="bg-slate-50 p-3 rounded-lg hover:bg-slate-100 transition"
            >
              {act}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
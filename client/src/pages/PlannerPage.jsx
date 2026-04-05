// PlannerPage.jsx
import { useState } from "react";
import { PlannerForm } from "../components/PlannerForm";
import { chat } from "../api/aiApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ✅ ADD THIS
import useStudyTracker from "../hooks/useStudyTracker";

export default function PlannerPage() {

  useStudyTracker(); // 🔥 AUTO TRACKING ENABLED

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);

    try {
      const prompt = `Create a study plan for: ${data.topic}${
        data.hours ? `. Study ${data.hours} hours per day.` : ""
      }${data.deadline ? ` Deadline: ${data.deadline}.` : ""}${
        data.priorityTopics ? ` Focus on: ${data.priorityTopics}.` : ""
      } Give a daily/weekly breakdown.`;

      const { data: res } = await chat(prompt);

      setPlan({
        topic: data.topic,
        content: res.reply,
      });

      // ✅ Browser Notification
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("📚 Study Plan Ready!", {
              body: `Your study plan for "${data.topic}" is ready.`,
              icon: "/planner-icon.png",
            });
          }
        });
      }

    } catch (err) {
      setPlan({
        error: err.response?.data?.error || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Export PDF
  const handleDownloadPDF = () => {
    if (!plan?.content) return;
    import("html2pdf.js").then((html2pdf) => {
      const element = document.getElementById("plan-output");
      html2pdf.default().from(element).save(`${plan.topic}-StudyPlan.pdf`);
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">

      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        📅 AI Study Planner
      </h1>

      <p className="text-slate-600 mb-6">
        Generate a personalized study schedule based on your topic, hours, and focus areas.
      </p>

      {/* Planner Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg mb-6">
        <PlannerForm onSubmit={handleSubmit} />
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex items-center gap-2 text-slate-500 mb-6">
          <div className="animate-bounce">📚</div>
          Creating your study plan...
        </div>
      )}

      {/* Plan Output */}
      {plan && !loading && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg mb-6">

          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-800 text-lg">
              Your Study Plan
            </h3>

            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Download PDF
            </button>
          </div>

          {plan.error ? (
            <p className="text-red-600">{plan.error}</p>
          ) : (
            <div
              id="plan-output"
              className="prose max-w-none bg-slate-50 p-5 rounded-lg overflow-x-auto text-slate-700"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {plan.content}
              </ReactMarkdown>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
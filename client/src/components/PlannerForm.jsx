// PlannerForm.jsx
import { useState } from "react";

export const PlannerForm = ({ onSubmit }) => {
  const [topic, setTopic] = useState("");
  const [priorityTopics, setPriorityTopics] = useState("");
  const [hours, setHours] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  // Mic / speech input
  const startListening = () => {
    if (!window.webkitSpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTopic(transcript);
    };

    recognition.onerror = () => alert("Mic permission denied or error!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        topic: topic.trim(),
        priorityTopics: priorityTopics.trim(),
        hours,
        deadline,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Topic */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Subject</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Algebra, React Hooks"
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="button"
            onClick={startListening}
            className="px-3 bg-slate-100 rounded-lg hover:bg-slate-200"
          >
            🎤
          </button>
        </div>
      </div>

      {/* Priority Topics */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Priority Topics / Focus Areas
        </label>
        <input
          type="text"
          value={priorityTopics}
          onChange={(e) => setPriorityTopics(e.target.value)}
          placeholder="e.g. Calculus, React State"
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Hours + Deadline */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Hours per day</label>
          <input
            type="number"
            min="1"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g. 2"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !topic.trim()}
        className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium"
      >
        {loading ? "Creating..." : "Create Plan"}
      </button>
    </form>
  );
};
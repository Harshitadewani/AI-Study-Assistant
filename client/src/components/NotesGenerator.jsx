import { useState } from "react";

export const NotesGenerator = ({ onSubmit }) => {
  const [topic, setTopic] = useState("");
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTopic(transcript);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);

    try {
      await onSubmit({ topic: topic.trim(), points: points.trim() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 max-w-xl">

      <form onSubmit={handleSubmit} className="space-y-5">

        <h2 className="text-lg font-semibold text-slate-800">
          📝 Notes Generator
        </h2>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Topic
          </label>

          <div className="flex gap-2">

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Photosynthesis, Binary Search"
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {/* Mic Button */}
            <button
              type="button"
              onClick={startListening}
              className="px-3 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              🎤
            </button>

          </div>
        </div>

        {/* Key Points */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Key points (optional)
          </label>

          <textarea
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Bullet points or outline to include..."
            rows={3}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Notes"}
        </button>

      </form>

    </div>
  );
};
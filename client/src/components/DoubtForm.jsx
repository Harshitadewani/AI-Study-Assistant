import { useState } from "react";

export const DoubtForm = ({
  onSubmit,
  placeholder = "Describe your doubt...",
  title,
}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue((prev) => prev + " " + transcript);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);

    try {
      await onSubmit(value.trim());
      setValue("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-4">

        {title && (
          <h3 className="text-lg font-semibold text-slate-800">
            {title}
          </h3>
        )}

        {/* Text Area */}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={4}
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
        />

        {/* Buttons */}
        <div className="flex items-center gap-3">

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Submit"}
          </button>

          {/* Mic */}
          <button
            type="button"
            onClick={startListening}
            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition"
          >
            🎤
          </button>

        </div>

      </form>
    </div>
  );
};
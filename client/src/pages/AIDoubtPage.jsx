import { useState } from "react";
import { DoubtForm } from "../components/DoubtForm";
import { chat } from "../api/aiApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ✅ IMPORT TRACKER
import useStudyTracker from "../hooks/useStudyTracker";

export default function AIDoubtPage() {

  useStudyTracker(); // 🔥 AUTO TRACKING ENABLED

  const [response, setResponse] = useState(null);

  const handleSubmit = async (doubt) => {

    const prompt = `
You are an expert tutor.

Answer the question in clear structured Markdown like ChatGPT.

Use:
- Headings
- Bullet points
- Tables when useful
- Step-by-step explanation
- Code blocks if needed
- Simple diagrams if helpful

Question:
${doubt}
`;

    setResponse({ loading: true });

    try {

      const { data } = await chat(prompt);

      setResponse({
        text: data.reply,
        loading: false
      });

    } catch (err) {

      setResponse({
        error: err.response?.data?.error || err.message,
        loading: false,
      });

    }
  };

  return (
    <div className="max-w-3xl">

      {/* Heading */}
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        🤖 AI Doubt Solver
      </h1>

      <p className="text-slate-600 mb-6">
        Ask any study-related question and get AI-powered answers instantly.
      </p>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

        <DoubtForm
          onSubmit={handleSubmit}
          placeholder="Type or speak your doubt..."
          title="Your Question"
        />

      </div>

      {/* Response */}
      {response && (

        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

          <h3 className="font-semibold text-slate-800 mb-3">
            AI Response
          </h3>

          {response.loading ? (

            <div className="flex items-center gap-2 text-slate-500">
              <div className="animate-bounce">🤖</div>
              <p>AI is thinking...</p>
            </div>

          ) : response.error ? (

            <p className="text-red-600">{response.error}</p>

          ) : (

            <div className="prose max-w-none bg-slate-50 p-5 rounded-lg overflow-x-auto">

              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {response.text}
              </ReactMarkdown>

            </div>

          )}

        </div>

      )}

    </div>
  );
}
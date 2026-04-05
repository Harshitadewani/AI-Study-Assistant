import { useState } from "react";
import { DoubtForm } from "../components/DoubtForm";
import { chat } from "../api/aiApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ✅ ADD THIS
import useStudyTracker from "../hooks/useStudyTracker";

export default function CodingDoubtPage() {

  useStudyTracker(); // 🔥 AUTO TRACKING ENABLED

  const [response, setResponse] = useState(null);

  const handleSubmit = async (doubt) => {

    const codingPrompt = `
You are an expert coding tutor.

Explain the solution clearly in Markdown like ChatGPT.

Structure:

### Problem Understanding
Explain the question.

### Approach
Explain the logic step-by-step.

### Code Solution
Provide clean code with comments.

### Example
Show sample input and output.

### Time & Space Complexity

Use:
- headings
- bullet points
- tables if needed
- code blocks
- diagrams if useful

Question:
${doubt}
`;

    setResponse({ loading: true });

    try {

      const { data } = await chat(codingPrompt);

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

      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        💻 Code Solver
      </h1>

      <p className="text-slate-600 mb-6">
        Get help with coding problems, debugging, or explanations.
      </p>

      {/* Input */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

        <DoubtForm
          onSubmit={handleSubmit}
          placeholder="Describe your coding doubt (include language, error, or code snippet)..."
          title="Your Coding Question"
        />

      </div>

      {/* Response */}
      {response && (

        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

          <h3 className="font-semibold text-slate-800 mb-3">
            AI Code Response
          </h3>

          {response.loading ? (

            <div className="flex items-center gap-2 text-slate-500">
              <div className="animate-bounce">💻</div>
              <p>Analyzing your code...</p>
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
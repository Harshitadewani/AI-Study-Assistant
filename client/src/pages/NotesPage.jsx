import { useState } from "react";
import { NotesGenerator } from "../components/NotesGenerator";
import { chat } from "../api/aiApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ✅ ADD THIS
import useStudyTracker from "../hooks/useStudyTracker";

export default function NotesPage() {

  useStudyTracker(); // 🔥 AUTO TRACKING ENABLED

  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {

    setLoading(true);

    try {

      const prompt = `
You are an expert teacher.

Generate structured study notes in Markdown like ChatGPT.

Use:

# Main Heading
## Subtopics
- Bullet points
- Tables if needed
- Simple diagrams if useful
- Short explanations

Topic: ${data.topic}

${data.points ? `Important points to include: ${data.points}` : ""}
`;

      const { data: res } = await chat(prompt);

      setNotes({
        topic: data.topic,
        content: res.reply,
      });

    } catch (err) {

      setNotes({
        error: err.response?.data?.error || err.message,
      });

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="max-w-3xl">

      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        📝 AI Notes Generator
      </h1>

      <p className="text-slate-600 mb-6">
        Generate smart study notes for any topic using AI.
      </p>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <NotesGenerator onSubmit={handleSubmit} />
      </div>

      {/* Loader */}
      {loading && (
        <div className="mt-6 text-slate-500 flex items-center gap-2">
          <div className="animate-bounce">🧠</div>
          Generating notes...
        </div>
      )}

      {/* Notes Output */}
      {notes && !loading && (

        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

          <h3 className="font-semibold text-slate-800 mb-3">
            Generated Notes
          </h3>

          {notes.error ? (

            <p className="text-red-600">{notes.error}</p>

          ) : (

            <div className="space-y-4">

              <p className="text-slate-700">
                <span className="font-semibold">Topic:</span> {notes.topic}
              </p>

              <div className="prose max-w-none bg-slate-50 p-5 rounded-lg overflow-x-auto">

                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {notes.content}
                </ReactMarkdown>

              </div>

            </div>

          )}

        </div>

      )}

    </div>
  );
}
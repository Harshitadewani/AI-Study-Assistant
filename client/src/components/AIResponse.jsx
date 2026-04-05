import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIResponse({ text }) {
  return (
    <div className="prose max-w-none bg-slate-50 p-5 rounded-lg overflow-x-auto">

      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>

    </div>
  );
}
import { useState } from "react";

interface Props {
  open: boolean;
  initialContent: string;
  loading?: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
}

export default function EditPostModal({
  open,
  initialContent,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const [content, setContent] = useState(initialContent);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold">
          Edit Post
        </h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="mt-4 w-full resize-none rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={loading || !content.trim()}
            onClick={() => onSave(content.trim())}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
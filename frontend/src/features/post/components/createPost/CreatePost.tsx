import { useState } from "react";
import { useCreatePost } from "../../hooks/useCreatePost";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { mutate, isPending } = useCreatePost();

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("content", content);

    if (file) {
      // Send to the correct backend field
      if (file.type.startsWith("image/")) {
        formData.append("image", file);
      } else if (file.type.startsWith("video/")) {
        formData.append("video", file);
      }
    }

    mutate(formData, {
      onSuccess: () => {
        setContent("");
        setFile(null);
      },
    });
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        className="w-full border rounded-lg p-3 resize-none outline-none"
      />

      <input
        type="file"
        accept="image/*,video/*"
        className="mt-4"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      {file && (
        <div className="mt-4">
          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full max-h-80 object-cover rounded-lg"
            />
          ) : (
            <video
              src={URL.createObjectURL(file)}
              controls
              className="w-full max-h-80 rounded-lg"
            />
          )}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
      >
        {isPending ? "Posting..." : "Post"}
      </button>
    </div>
  );
}

import { useAuth } from "@/provider/UseAuth";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCreatePost } from "../../hooks/useCreatePost";

export default function CreatePost() {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useCreatePost();

  const handleSubmit = () => {
    if (!content.trim() && !file) return;

    const formData = new FormData();

    formData.append("content", content);

    if (file) {
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
    <div className="bg-white border-b px-3 sm:px-5 py-4">

      <div className="flex gap-3">

        {/* Avatar */}
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0"
        />

        <div className="flex-1">

          {/* Textarea */}
          <textarea
            value={content}
            rows={2}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="
              w-full
              resize-none
              bg-transparent
              border-none
              outline-none
              text-base
              sm:text-lg
              placeholder:text-gray-500
            "
          />

          {/* Preview */}
          {file && (
            <div className="relative mt-3 rounded-2xl overflow-hidden border">

              <button
                onClick={() => setFile(null)}
                className="absolute top-2 right-2 z-10 bg-black/70 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>

              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full max-h-[250px] sm:max-h-[420px] object-cover"
                />
              ) : (
                <video
                  controls
                  src={URL.createObjectURL(file)}
                  className="w-full max-h-[250px] sm:max-h-[420px]"
                />
              )}
            </div>
          )}

          {/* Bottom Bar */}
          <div className="mt-3 pt-3 border-t flex items-center justify-between">

            <div>

              <button
                onClick={() => inputRef.current?.click()}
                className="p-2 rounded-full text-blue-500 hover:bg-blue-50 transition"
              >
                <ImagePlus className="w-5 h-5" />
              </button>

              <input
                ref={inputRef}
                hidden
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />

            </div>

            <button
              disabled={
                isPending || (!content.trim() && !file)
              }
              onClick={handleSubmit}
              className="
                bg-blue-500
                hover:bg-blue-600
                disabled:bg-blue-300
                disabled:cursor-not-allowed
                text-white
                rounded-full
                px-5
                py-2
                text-sm
                font-semibold
                transition
              "
            >
              {isPending ? "Posting..." : "Post"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


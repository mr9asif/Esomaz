import { useAuth } from "@/provider/UseAuth";
import { ImagePlus, Video, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCreatePost } from "../../hooks/useCreatePost";

export default function CreatePost() {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useCreatePost();

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    if (video) {
      alert("You can't upload images and a video together.");
      return;
    }

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    const updated = [...images, ...imageFiles];

    if (updated.length > 5) {
      alert("Maximum 5 images allowed.");
      return;
    }

    setImages(updated);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (images.length > 0) {
      alert("You can't upload a video with images.");
      return;
    }

    if (!file.type.startsWith("video/")) return;

    setVideo(file);

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideo(null);
  };

  const handleSubmit = () => {
    if (!content.trim() && images.length === 0 && !video) return;

    const formData = new FormData();

    formData.append("content", content);

    images.forEach((image) => {
      formData.append("images", image);
    });

    if (video) {
      formData.append("video", video);
    }

    mutate(formData, {
      onSuccess: () => {
        setContent("");
        setImages([]);
        setVideo(null);

        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }

        if (videoInputRef.current) {
          videoInputRef.current.value = "";
        }
      },
    });
  };

  return (
    <div className="bg-white px-3 sm:px-5 py-4">
      <div className="flex gap-3">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0"
        />

        <div className="flex-1">
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

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden border"
                >
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 z-10 bg-black/70 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>

                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Video Preview */}
          {video && (
            <div className="relative mt-3 rounded-xl overflow-hidden border">
              <button
                onClick={removeVideo}
                className="absolute top-2 right-2 z-10 bg-black/70 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>

              <video
                controls
                src={URL.createObjectURL(video)}
                className="w-full max-h-[420px]"
              />
            </div>
          )}

          <div className="mt-3 pt-3 border-t flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => imageInputRef.current?.click()}
                className="p-2 rounded-full text-black hover:bg-blue-50 transition"
              >
                <ImagePlus className="w-5 h-5" />
              </button>

              <button
                onClick={() => videoInputRef.current?.click()}
                className="p-2 rounded-full text-black hover:bg-blue-50 transition"
              >
                <Video className="w-5 h-5" />
              </button>

              <input
                ref={imageInputRef}
                hidden
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />

              <input
                ref={videoInputRef}
                hidden
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />
            </div>

            <button
            disabled={
  isPending ||
  (!content.trim() &&
    images.length === 0 &&
    !video)
}
              onClick={handleSubmit}
              className="
                bg-black
                hover:bg-gray-600
                disabled:bg-gray-500
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
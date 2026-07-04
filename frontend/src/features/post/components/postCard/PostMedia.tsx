import { useState } from "react";
import type { Media } from "../../types/post.types";
import ImageViewer from "./ImageViewer";
interface Props {
  media: Media[];
}

export default function PostMedia({ media }: Props) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media.length) return null;

  // Video
  if (media[0].type === "VIDEO") {
    return (
      <video
        controls
        src={media[0].url}
        className="rounded-2xl mt-3 w-full max-h-[450px]"
      />
    );
  }

 const images = media.map((item) => item.url);

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Single Image
  if (media.length === 1) {
    return (
      <>
        <img
          src={media[0].url}
          onClick={() => openViewer(0)}
          className="rounded-2xl mt-3 w-full max-h-[500px] object-cover cursor-pointer"
          alt=""
        />

        <ImageViewer
          images={images}
          currentIndex={currentIndex}
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          onPrev={prevImage}
          onNext={nextImage}
        />
      </>
    );
  }

  // Multiple Images
  return (
    <>
      <div
        className="
          mt-3
          grid
          grid-cols-2
          gap-1
          overflow-hidden
          rounded-2xl
        "
      >
        {media.slice(0, 4).map((item, index) => (
          <div
            key={item.id}
            className="relative cursor-pointer"
            onClick={() => openViewer(index)}
          >
            <img
              src={item.url}
              alt=""
              className="w-full h-[180px] object-cover hover:opacity-95 transition"
            />

            {media.length > 4 && index === 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold">
                +{media.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>

      <ImageViewer
        images={images}
        currentIndex={currentIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  );
}
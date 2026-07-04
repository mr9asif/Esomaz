import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageViewer({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowLeft") onPrev();

      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white hover:text-gray-300"
      >
        <X size={32} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-5 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-5 text-white bg-black/40 hover:bg-black/60 rounded-full p-3"
        >
          <ChevronLeft size={30} />
        </button>
      )}

      {/* Image */}
      <img
        onClick={(e) => e.stopPropagation()}
        src={images[currentIndex]}
        alt=""
        className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl"
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-5 text-white bg-black/40 hover:bg-black/60 rounded-full p-3"
        >
          <ChevronRight size={30} />
        </button>
      )}
    </div>
  );
}
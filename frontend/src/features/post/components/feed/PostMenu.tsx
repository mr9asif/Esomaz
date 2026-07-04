import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function PostMenu({
  onEdit,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          p-2
          rounded-full
          hover:bg-gray-100
          transition
        "
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-44
            bg-white
            border
            rounded-xl
            shadow-lg
            z-50
            overflow-hidden
          "
        >
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="
              w-full
              flex
              items-center
              gap-2
              px-4
              py-3
              hover:bg-gray-100
              text-sm
            "
          >
            <Pencil size={16} />
            Edit Post
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="
              w-full
              flex
              items-center
              gap-2
              px-4
              py-3
              hover:bg-red-50
              text-red-600
              text-sm
            "
          >
            <Trash2 size={16} />
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
}
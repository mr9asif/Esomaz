import type { Media } from "../../types/post.types";

interface Props {
  media: Media[];
}

export default function PostMedia({ media }: Props) {

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

  // 1 image

  if (media.length === 1) {
    return (
      <img
        src={media[0].url}
        className="rounded-2xl mt-3 w-full max-h-[500px] object-cover"
      />
    );
  }

  // 2+

  return (
    <div
      className={`
      mt-3
      grid
      gap-1
      overflow-hidden
      rounded-2xl
      ${
        media.length === 2
          ? "grid-cols-2"
          : "grid-cols-2"
      }
      `}
    >

      {media.slice(0, 4).map((item, index) => (

        <div
          key={item.id}
          className="relative"
        >

          <img
            src={item.url}
            className="w-full h-[180px] object-cover"
          />

          {media.length > 4 &&
            index === 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold">

                +{media.length - 4}

              </div>
            )}

        </div>

      ))}

    </div>
  );
}
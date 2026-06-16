import { useUpdateProfile } from "@/features/profile/hooks/useUpdateProfile";
import { queryClient } from "@/lib/react_query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  profile: {
    username: string;
    name?: string;
    bio?: string;
    location?: string;
    website?: string;
  };

  onClose: () => void;
};

type FormData = {
  name: string;
  bio: string;
  location: string;
  website: string;
};

const EditProfileModel = ({
  profile,
  onClose,
}: Props) => {
  const { mutate, isPending } =
    useUpdateProfile();

  const {
    register,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      name: profile.name || "",
      bio: profile.bio || "",
      location:
        profile.location || "",
      website:
        profile.website || "",
    },
  });

  const onSubmit = (
    values: FormData
  ) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(
          "Profile updated!"
        );

        queryClient.invalidateQueries({
          queryKey: [
            "profile",
            profile.username,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["me"],
        });

        onClose();
      },

      onError: () => {
        toast.error(
          "Update failed"
        );
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            {...register("bio")}
            placeholder="Bio"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("location")}
            placeholder="Location"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("website")}
            placeholder="Website"
            className="w-full border rounded-lg p-3"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            >
              {isPending
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProfileModel;
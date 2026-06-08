import {
    Globe,
    MapPin,
} from "lucide-react";

type Props = {
  name: string;
  username: string;
  bio?: string;
  location?: string;
  website?: string;
};

const ProfileInfo = ({
  name,
  username,
  bio,
  location,
  website,
}: Props) => {
  return (
    <div className="text-center mt-4">

      <h1 className="text-3xl font-bold">
        {name}
      </h1>

      <p className="text-gray-500">
        @{username}
      </p>

      {bio && (
        <p className="mt-4 max-w-xl mx-auto">
          {bio}
        </p>
      )}

      <div className="flex justify-center gap-5 mt-4 flex-wrap">

        {location && (
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin size={16} />
            {location}
          </div>
        )}

        {website && (
          <a
            href={website}
            target="_blank"
            className="flex items-center gap-1 text-blue-600"
          >
            <Globe size={16} />
            Website
          </a>
        )}

      </div>
    </div>
  );
};

export default ProfileInfo;
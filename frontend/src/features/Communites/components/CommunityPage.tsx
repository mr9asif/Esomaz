import {
    ArrowLeft,
    Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="sticky top-4 z-10 flex items-center gap-3 border-b bg-white px-4 py-4">
        <button
          onClick={() => navigate("/")}
          className="rounded-full p-2 transition hover:bg-gray-100 lg:hidden"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="text-xl font-bold">
          Communities
        </h1>
      </div>

      {/* Under Development */}
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-2 mt-6 rounded-full bg-blue-100 p-6">
          <Users
            size={64}
            className="text-blue-600"
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-900">
          Communities are Coming Soon
        </h2>

        <p className="mt-4 max-w-lg text-gray-500">
          We're building Communities to help people connect through shared interests,
          collaborate, and discover amazing content together.
        </p>

        <div className="mt-8 w-full max-w-md rounded-2xl border bg-gray-50 p-5 text-left">
          <h3 className="mb-3 font-semibold text-gray-800">
            Planned Features
          </h3>

          <ul className="space-y-2 text-sm text-gray-600">
            <li>✅ Create your own community</li>
            <li>👥 Join and leave communities</li>
            <li>📝 Share posts inside communities</li>
            <li>❤️ Like and comment on community posts</li>
            <li>🔍 Discover communities by category</li>
          </ul>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-8 rounded-full bg-black px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CommunityPage;
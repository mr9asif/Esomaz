import { ArrowLeft, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="sticky top-16 z-10 flex items-center gap-3 border-b bg-white px-4 py-4">
        <button
          onClick={() => navigate("/")}
          className="rounded-full p-2 transition hover:bg-gray-100 lg:hidden"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="text-xl font-bold">
          Settings
        </h1>
      </div>

      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <Construction
          size={72}
          className="mb-6 text-yellow-500"
        />

        <h2 className="text-2xl font-bold">
          Under Development
        </h2>

        <p className="mt-3 max-w-md text-gray-500">
          We're working on Settings to bring you privacy controls,
          appearance options, password management, and more.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 rounded-full bg-black px-6 py-3 text-white transition hover:opacity-90"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
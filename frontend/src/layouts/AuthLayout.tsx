import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({
  children,
}: Props) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:flex flex-1 bg-blue-600 text-white items-center justify-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-4">
            Connect.
          </h1>

          <h1 className="text-5xl font-bold mb-6">
            Share.
          </h1>

          <h1 className="text-5xl font-bold">
            Inspire.
          </h1>

          <p className="mt-8 text-lg text-blue-100">
            Join our social platform and connect with people around the world.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
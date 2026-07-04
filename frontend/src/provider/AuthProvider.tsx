// providers/AuthProvider.tsx

import { getMe } from "@/features/auth/api/auth.api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import type { User } from "../types/user.types";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    
  });
if (isLoading) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader className="h-8 w-8 animate-spin" />
    </div>
  );
}

  return (
    <AuthContext.Provider
      value={{
        user: (data?.data as User) ?? null,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
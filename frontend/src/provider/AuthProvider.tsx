// providers/AuthProvider.tsx

import { getMe } from "@/features/auth/api/auth.api";
import { useQuery } from "@tanstack/react-query";
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
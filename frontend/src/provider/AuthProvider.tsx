import { getMe } from "@/features/auth/api/auth.api";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { User } from "../types/user.types";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchMe = async () => {
    try {
      const res = await getMe();

      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchMe();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
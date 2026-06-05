import { useMe } from "@/features/auth/hooks/useMe";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({
  children,
}: Props) => {
  const {
    data,
    isLoading,
    isError,
  } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data?.data) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
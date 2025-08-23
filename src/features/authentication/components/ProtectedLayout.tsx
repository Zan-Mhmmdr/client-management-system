import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [token, _] = useLocalStorage("token", "");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedLayout;

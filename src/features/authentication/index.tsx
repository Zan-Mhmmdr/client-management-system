import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="bg-[#0F0F0F] text-[#EAEAEA] min-h-screen flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
};

export default AuthPage;

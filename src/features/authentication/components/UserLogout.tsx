import { useLocalStorage } from "react-use";
import { useEffect } from "react";
import { userLogout } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const [token, setToken] = useLocalStorage("token");
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        if (token) {
          await userLogout(token); // Panggil API
        }
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        setToken(""); 
        navigate("/login", { replace: true }); // Redirect ke login
      }
    };

    logout();
      [];
  });

  return null;
};

export default UserLogout;

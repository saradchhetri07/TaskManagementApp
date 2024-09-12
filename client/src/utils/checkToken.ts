import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

// Helper function to check if the token is expired
export const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp! < currentTime;
  } catch (error) {
    toast.error((error as Error).message);
    return true;
  }
};

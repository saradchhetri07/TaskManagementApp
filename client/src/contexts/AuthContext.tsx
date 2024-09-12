import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../services/ApiClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define interfaces for user and context
interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}
interface signUpData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  token: string;
  loginAction: (data: LoginData) => void;
  signUpAction: (data: signUpData) => void;
  logOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext: React.Context<AuthContextProps | undefined> = createContext<
  AuthContextProps | undefined
>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const navigate = useNavigate();
  const loginAction = (data: LoginData) => {
    ApiClient.post("/auth/login", data)
      .then((res) => {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);
        toast.success("Login Successful");
        navigate("/Home");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const signUpAction = (data: signUpData) => {
    ApiClient.post("/auth/signUp", data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          toast.error(error.response.data.message);
        }
      });
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token"); // Consistent key name
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginAction, logOut, signUpAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

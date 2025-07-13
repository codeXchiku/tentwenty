import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


interface AuthContextType {
  storeTokenInLS: (token: string) => void;
  logoutUser: () => void;
  isLoggedIn: boolean;
  user: any ;
  authorizationToken: string;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: any;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (jwtToken: string): void => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  const isLoggedIn: boolean = !!token;
  console.log("isLoggedIn:", isLoggedIn);

  const logoutUser = (): void => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
  };

  const userAuthentication = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/auth/user", {
        headers: {
          Authorization: authorizationToken,
        },
      });

      setUser(response.data.userData);

      if (response.status === 200) {
        setIsLoading(false);
      } else {
        console.log("Error in fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("User data not found:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ storeTokenInLS, logoutUser, isLoggedIn, user, authorizationToken, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return authContextValue;
};

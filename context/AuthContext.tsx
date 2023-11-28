'use client'
import { createContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContext {
  auth: {
    token: string;
    data: any;
  };
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') ?? '' : '',
    data: {},
  });

  const login = (token: string | undefined) => {
    if (token) {
      localStorage.setItem("token", token);
      setAuth({ token, data: {} });
    } else {
      console.error("Invalid token");
    }
  };

  const router = useRouter();
  const logout = () => {
    router.replace('/auth/login');
    localStorage.removeItem("token");
    setAuth({ token: '', data: {} });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

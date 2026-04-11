import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/services/api";

export type Role = "STUDENT" | "TUTOR" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. App Initialization: Ask the backend if we have a valid secure cookie
  useEffect(() => {
    const checkSession = async () => {
      try {
        // The browser automatically sends the HTTP-Only cookie here
        const response = await api.get<User>("/auth/me");
        setUser(response.data);
      } catch (error) {
        // 401 Unauthorized means no valid cookie. That's fine, they are just a guest.
        setUser(null);
      } finally {
        setIsLoading(false); // Stop the loading spinner
      }
    };

    checkSession();
  }, []);

  // 2. Login: Backend sets the cookie, frontend just saves the user data
  const login = (userData: User) => {
    setUser(userData);
  };

  // 3. Logout: Tell the backend to destroy the cookie, then clear frontend state
  const logout = async () => {
    try {
      await api.post("/auth/logout"); // Backend clears the HTTP-only cookie
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      // Optional: Force a hard reload to clear any sensitive data from memory
      window.location.href = "/sign-in"; 
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { router, useRouter } from "expo-router";
import AuthRepository from "@/src/repositories/AuthRepository";
import LoginService from "@/src/api/LoginService";
import UserService from "@/src/api/UserService";
import useUser from "@/hooks/useUser";
import SessionCookieStore from "@/src/session/SessionCookieStore";

interface AuthContextType {
  userId: string | null | undefined;
  role: string | null | undefined;
  loading: boolean;
  littleLoad: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null); // user object or null
  const [loading, setLoading] = useState(true);
  const [littleLoad, setLittleLoad] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const {user} = useUser();
  const cookie = SessionCookieStore.get();

  const showLoading = useCallback(() => setLittleLoad(true), []);
  const hideLoading = useCallback(() => setLittleLoad(false), []);

  // 🔎 Session kontrolü
  const checkSession = async () => {
    try {
      debugger;
      console.log("checksession > response",cookie);
      if (cookie !==undefined) {
         setUserId(user.id);
        setRole(user.role);
      }
    } catch (err) {
      console.warn("Session check error:", err);
      setUserId(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      checkSession(); // <-- BEKLET
  }, []);

  const logout = async () => {
    await AuthRepository.logout();
    setUserId("");
    setRole("");
    router.replace("/login");
  }; 

  return (
    <AuthContext.Provider
      value={{
        userId,
        role,
        loading,
        littleLoad,
        showLoading,
        hideLoading,
        checkSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider!");
  }

  return context;
};

//export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.tsx
import React, { createContext, useContext, useCallback, useState } from "react";
import { router } from "expo-router";
import AuthRepository from "@/src/repositories/AuthRepository";
import SessionCookieStore from "@/src/session/SessionCookieStore";
import { useUserStore } from "@/src/store/useUserStore";
import DateUtils from "@/src/utils/DateUtils";

interface AuthContextType {
  userId: string | null;
  role: string | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { setUser, clearUser } = useUserStore();



  // // 🌟 TEK GERÇEK CHECKSESSION
  // const checkSession = useCallback(async () => {
  //   debugger;
  //   setLoading(true);
  // console.log("AUTHCONTEXT çalışıyor",DateUtils.formatDateTime(new Date().toISOString()));

  //   try {
  //     const cookie = SessionCookieStore.get();
  //     const check = await AuthRepository.check();

  //     if (!cookie|| !check?.success) {
  //       clearUser();
  //       setUserId(null);
  //       setRole(null);
  //       return false;
  //     }

  //     // 2) User bilgisini çek
  //     const me = await AuthRepository.me(); // <-- user objesi gelecek
  //     if (!me?.success || !me?.user) {
  //       clearUser();
  //       setUserId(null);
  //       setRole(null);
  //       return false;
  //     }

  //     // User bilgilerini zustand store’a koy
  //     setUser(me.user);
  //     setUserId(me.user.id); 
  //     setRole(me.user.role);

  //     return true;

  //   } catch (err) {
  //     console.warn("checkSession error:", err);
  //     clearUser();
  //     setUserId(null);
  //     setRole(null);
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const logout = useCallback(async () => {
    try {
      await AuthRepository.logout();
    } catch {}
    SessionCookieStore.clear();
    clearUser();
    setUserId(null);
    setRole(null);
    router.replace("/login");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        role,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};




















// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
// } from "react";
// import { router } from "expo-router";
// import AuthRepository from "@/src/repositories/AuthRepository";
// import SessionCookieStore from "@/src/session/SessionCookieStore";

// interface AuthContextType {
//   userId: number | null;
//   role: string | null;
//   loading: boolean;
//   littleLoad: boolean;
//   showLoading: () => void;
//   hideLoading: () => void;
//   checkSession: () => Promise<boolean>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [userId, setUserId] = useState<number | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [littleLoad, setLittleLoad] = useState(false);

//   const showLoading = useCallback(() => setLittleLoad(true), []);
//   const hideLoading = useCallback(() => setLittleLoad(false), []);

//   // 🟢 DOĞRU CHECKSESSION
//   const checkSession = useCallback(async () => {
//     try {
//     debugger;
//     console.log("auth context çalışıyor");
//       const cookie = SessionCookieStore.get();

//       if (!cookie) {
//         setUserId(null);
//         setRole(null);
//         return false;
//       }

//       const response = await AuthRepository.check();

//       if (response?.success) {
//         setUserId(1);
//         setRole("admin");
//         return true;
//       }
// //return false;
//     } catch (err) {
//       console.warn("Session check error:", err);
//       setUserId(null);
//       setRole(null);
//       return false;

//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const logout = useCallback(async () => {
//     try {
//       await AuthRepository.logout();
//     } catch {}
//     SessionCookieStore.clear?.();
//     setUserId(null);
//     setRole(null);
//     router.replace("/login");
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         userId,
//         role,
//         loading,
//         littleLoad,
//         showLoading,
//         hideLoading,
//         checkSession,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider!");
//   return ctx;
// };

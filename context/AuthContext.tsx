import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import AuthRepository from "@/src/repositories/AuthRepository";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { Text } from "@react-navigation/elements";
import Sleep from "@/src/utils/Sleep";

interface AuthContextType {
  userId: string | null | undefined;
  SetUser: (id: string) => void;
  role:string | null |undefined;
  loading: boolean;
  littleLoad: boolean;
  showLoading:()=>void;
  hideLoading:()=>void;
  checkSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);     // user object or null
  const [loading, setLoading] = useState(true);
  const[littleLoad,setLittleLoad]= useState(false);
  const [role, setRole] = useState<string | null>(null); 

 const SetUser =(id:string) => setUserId(id);

  const showLoading = useCallback(() => setLittleLoad(true), []);
  const hideLoading = useCallback(() => setLittleLoad(false), []);

  // İlk yüklemede session kontrolü
  const checkSession = async () => {
    try {
  debugger;
      const res = {
        success:true,
        userId:"kmieyam",
        role:"admin"
      }
      var response= await AuthRepository.me();
     console.log("checksession > response", response);
     console.log("checksession > Res",res);

      if (res.success) {
        const {userId,role} = res;
        setUserId(userId!);
        setRole(role!)
      } else {
         setUserId(null);
        setRole(null)
        await logout();
      }
    } catch {
      setUserId("");
    }
    setLoading(false);
  };

   useEffect(() =>{
    
    console.log("authcontext useEffect içinde");
   checkSession(); // <-- BEKLET
  }, []);

  const logout = async () => {
    await AuthRepository.logout();
    setUserId("");
    setRole("");
    router.replace("/login");
  };


  return (
    <AuthContext.Provider value={{ userId,SetUser,role, loading,littleLoad,showLoading,hideLoading, checkSession, logout }}>
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

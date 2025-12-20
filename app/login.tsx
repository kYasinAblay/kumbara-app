
import "react-native-reanimated";
import React, {  useState } from "react";
import { StyleSheet } from "react-native";
import LoginPage from "@/components/LoginPage";
import { useRouter } from "expo-router";
import Sleep from "@/src/utils/Sleep";
import { NetworkGuard } from "@/src/core/network/NetworkGuard";
import RegisterScreen from "@/components/Register";

export default function LoginScreen() {
  const router = useRouter();
  const [loginOrRegister,setLoginOrRegister] = useState(true);
  

  const handleLogin = async () => {
   console.log("çalıştım");
   
   await Sleep(1000).then(() => router.push("/profile"));
  };



  return (
    <NetworkGuard>
     {loginOrRegister?<LoginPage  onBackToLogin={setLoginOrRegister} onLogin={handleLogin} />:<RegisterScreen  onBackToLogin={setLoginOrRegister} onLogin={handleLogin}/>} 
    </NetworkGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

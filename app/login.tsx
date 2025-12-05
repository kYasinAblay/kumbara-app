import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPage from "@/components/LoginPage";
import { useRouter } from "expo-router";
import { LoginRequest } from "@/src/models/LoginRequest";
import Sleep from "@/src/utils/Sleep";
import { NetworkGuard } from "@/src/core/network/NetworkGuard";
import RegisterScreen from "@/components/Register";
import { useLoading } from "@/context/LoadingContext";

export default function LoginScreen() {
  const router = useRouter();
  const [loginOrRegister,setLoginOrRegister] = useState(true);
 

  const handleLogin = () => {
    Sleep(1000).then(() => router.push("/profile"));
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

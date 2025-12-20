import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, router, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import  "@/src/bootstrap";
import { performSessionCheck } from "@/src/controllers/SessionController";
import { SessionWatcher } from "@/src/session/SessionWatcher";
import SessionCookieStore from "@/src/session/SessionCookieStore";
import { useAuthStore } from "@/src/store/authStore";

export const unstable_settings = {
  anchor: "login",
};

function AuthGuard() {
  const { loading,logout } = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
  
    let mounted = true;

    const run = async () => {
      const ok = await performSessionCheck();
     if (!ok) logout();
     setOk(true);
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

   const cookie = SessionCookieStore.get();


  if (loading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>;
  }


  return (
    <LoadingProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { fontFamily: "Inter" },
        }}
        initialRouteName={ !cookie ? "login" : "(tabs)"}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <LoadingOverlay />
    </LoadingProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/static/Inter_24pt-Regular.ttf"),
    InterBold: require("../assets/fonts/static/Inter_24pt-SemiBold.ttf"),
  });
  const { status, hydrate } = useAuthStore();


 useEffect(() => {
    hydrate();
  }, [hydrate]);


  if (!loaded && status ==="loading")
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SessionWatcher />
        <AuthGuard />
        <StatusBar
          style="dark"
          translucent={true}
          backgroundColor="#742020ff"
        />
      </ThemeProvider>
    </AuthProvider>
  );
}

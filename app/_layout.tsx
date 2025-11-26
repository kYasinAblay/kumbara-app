import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text,ActivityIndicator} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider,useAuth } from '@/context/AuthContext';
import { LoadingProvider } from '@/context/LoadingContext';
import LoadingOverlay from '@/components/LoadingOverlay';


export const unstable_settings = {
  anchor: '(tabs)',
};

function AuthGuard() {

  const { userId, loading } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // checkSession bitmiş ve userId yoksa login'e gönder
    if (!loading && userId === undefined) {
      router.replace("/login");
    }
  }, [loading, userId]);

  useEffect(() => {
    // userId varsa login kabul et
    setIsReady(true);
  }, [userId]);

  if (loading || !isReady) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // UI ready
  return (
    <LoadingProvider>
    <Stack
      screenOptions={{  
          contentStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { fontFamily: 'Inter' } }}
      initialRouteName={userId ? '(tabs)' : 'login'}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
      <LoadingOverlay />
    </LoadingProvider>
  );
}

export default function RootLayout() { 
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/static/Inter_24pt-Regular.ttf'),
    InterBold: require('../assets/fonts/static/Inter_24pt-SemiBold.ttf'),
  });

  if (!loaded) return <ActivityIndicator size={'large'} />;

  return (
    <AuthProvider>
      <ThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
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

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginScreen } from './login';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() { 
  
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/static/Inter_24pt-Regular.ttf'),
    InterBold: require('../assets/fonts/static/Inter_24pt-SemiBold.ttf'),
  });


  useEffect(() => {
    async function checkLogin() {
      const userId = await AsyncStorage.getItem('currentUserId');
      if (userId) {
        setIsLoggedIn(true);
      }
      setIsReady(true);
    }
    checkLogin();
  }, []);


  if (!loaded || !isReady) return (<View>
    <Text>Loading...</Text>
  </View>);



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerTitleStyle: { fontFamily: 'Inter' } }}
        initialRouteName={isLoggedIn ? '(tabs)' : 'login'} >
        <Stack.Screen name="login" options={{ headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

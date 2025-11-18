import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from '@/components/LoginPage';
import { useRouter } from 'expo-router';
import { LoginRequest } from '@/src/models/LoginRequest';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = (login:LoginRequest) => {
    //boş kontrol yapılacak
    console.log('Giriş yapan kullanıcı:', login);
    router.push('/profile');
  };

  return <LoginPage onLogin={handleLogin} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});


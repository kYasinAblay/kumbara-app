import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoginPage({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const savedUsers = await AsyncStorage.getItem('users');
      if (savedUsers) {
        const users = JSON.parse(savedUsers);
        const user = users.find(
          (u) =>
            u.name.toLowerCase() === loginData.email.toLowerCase() && !u.is_deleted
        );

        if (user) {
          await AsyncStorage.setItem('currentUserId', user.id);
          onLogin(user);
        } else {
          Alert.alert('Hata', 'Kullanıcı bulunamadı veya şifre hatalı!');
        }
      } else {
        Alert.alert('Uyarı', 'Kayıtlı kullanıcı bulunamadı!');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Hata', 'Giriş işlemi sırasında bir hata oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="cash-outline" size={36} color="#fff" />
          </View>
          <Text style={styles.title}>Kumbara Uygulaması</Text>
          <Text style={styles.subtitle}>Birikimlerinizi kolayca yönetin</Text>
        </View>

        {/* Login Form */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hoş Geldiniz</Text>
          <Text style={styles.cardSubtitle}>Devam etmek için giriş yapın</Text>

          <View style={{ marginTop: 16 }}>
            <Text style={styles.label}>Kullanıcı Adı</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#9ca3af"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Adınızı girin"
                value={loginData.email}
                onChangeText={(text) => setLoginData({ ...loginData, email: text })}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            <Text style={[styles.label, { marginTop: 12 }]}>Şifre</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#9ca3af"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Şifrenizi girin"
                value={loginData.password}
                onChangeText={(text) =>
                  setLoginData({ ...loginData, password: text })
                }
                style={styles.input}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
            </TouchableOpacity>

            <Text style={styles.hintText}>
              Demo için herhangi bir kullanıcı adı girebilirsiniz
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2025 Kumbara Uygulaması - Tüm hakları saklıdır
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 72,
    height: 72,
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#312e81',
  },
  subtitle: {
    fontSize: 14,
    color: '#6366f1',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#312e81',
  },
  cardSubtitle: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    marginLeft: 4,
  },
  inputContainer: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    marginTop: -10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c7d2fe',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 36,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#4f46e5',
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  hintText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 12,
  },
  footer: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 12,
    color: '#818cf8',
  },
});

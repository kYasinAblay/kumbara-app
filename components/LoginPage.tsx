import React, { useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import authRepository from "@/src/repositories/AuthRepository";
import { useLoading } from "@/context/LoadingContext";
import Sleep from "@/src/utils/Sleep";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage({ onLogin, onBackToLogin }) {
  const [loginData, setLoginData] = useState({
    username: "kyasinablay",
    password: "m0vks7z5j9",
  });

  const { loading, showLoading, hideLoading } = useLoading();

  const handleNavigateRegister = () => {
    onBackToLogin((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      debugger;
      showLoading();
      console.log(loginData);
      var check = await authRepository.login(loginData);

      if (check.success !== undefined && check.success) {
        onLogin();
      } else {
        Alert.alert("Hata", "Kullanıcı bulunamadı veya şifre hatalı!");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Hata", "Giriş işlemi sırasında bir hata oluştu.");
    }
    await Sleep(1000).then(hideLoading);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={{flex:1,justifyContent:"center"}}>
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
            <Text style={styles.cardSubtitle}>
              Devam etmek için giriş yapın
            </Text>

            <View style={{ marginTop: 16 }}>
              <Text style={styles.label}>Kullanıcı Adı</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={"black"}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Adınızı girin"
                  value={loginData.username}
                  onChangeText={(text) =>
                    setLoginData({ ...loginData, username: text })
                  }
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <Text style={[styles.label, { marginTop: 12 }]}>Şifre</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="black"
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

              <TouchableOpacity
                style={styles.loginButton}
                disabled={loading}
                onPress={handleLogin}
              >
                {loading ? (
                  <ActivityIndicator style={{ width: 40 }} color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Giriş Yap</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={handleNavigateRegister}>
                <Text style={styles.backText}>Hesabın yok mu? Kayıt ol</Text>
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoCircle: {
    width: 72,
    height: 72,
    backgroundColor: "#C8AC63",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#312e81",
  },
  subtitle: {
    fontSize: 14,
    color: "#6366f1",
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#312e81",
  },
  cardSubtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
    marginLeft: 4,
  },
  inputContainer: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: 10,
    top: "50%",
    marginTop: -10,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c7d2fe",
    borderRadius: 10,
    padding: 10,
    //paddingLeft: 36,
    fontSize: 14,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#016840",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  hintText: {
    marginTop: 12,
    textAlign: "center",
    color: "#6b7280",
    fontSize: 12,
  },
  backText: {
    marginTop: 12,
    textAlign: "center",
    color: "#4f46e5",
  },
  footer: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 12,
    color: "#818cf8",
  },
});

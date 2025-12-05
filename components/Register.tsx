import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { User as UserIcon, Phone } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLoading } from "@/context/LoadingContext";
import AuthRepository from "@/src/repositories/AuthRepository";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen({ onLogin, onBackToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, showLoading, hideLoading } = useLoading();

  const [errors, setErrors] = useState({});

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });

    if (errors[key]) {
      const updated = { ...errors };
      delete updated[key];
      setErrors(updated);
    }
  };

  const validate = () => {
    const newErr: any = {};

    if (!formData.name.trim()) newErr.name = "Ad zorunludur";
    if (!formData.surname.trim()) newErr.surname = "Soyad zorunludur";
    if (!formData.username.trim()) newErr.surname = "Kullanıcı adı zorunludur";
    if (formData.username.length < 6)
      newErr.username = "Minimum 6 karakter olmalı";

    if (!formData.password.trim()) newErr.password = "Şifre zorunludur";
    if (formData.password.length < 6)
      newErr.password = "Minimum 6 karakter olmalı";

    if (!formData.confirmPassword.trim())
      newErr.confirmPassword = "Şifre tekrar zorunludur";
    else if (formData.confirmPassword !== formData.password)
      newErr.confirmPassword = "Şifreler uyuşmuyor";

    if (!formData.phone.trim()) newErr.phone = "Telefon zorunludur";
    else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErr.phone = "Geçerli bir telefon giriniz";
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    debugger;
    showLoading();
    const newUser = {
      ...formData,
    };

    try {
      var response = await AuthRepository.register(newUser);
      if (response.success) onLogin?.();
      else alert("Kayıt yapılamadı.");
    } catch (error) {
      alert("Kayıt yapılamadı.");
    }
    hideLoading();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
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

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kayıt Ol</Text>
            <Text style={styles.cardSubtitle}>
              Hesap oluşturmak için bilgilerinizi girin
            </Text>

            {/* Name + Surname */}
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Ad</Text>
                <View style={styles.inputBox}>
                  <UserIcon size={18} color="#888" />
                  <TextInput
                    placeholder="Adınız"
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(t) => handleChange("name", t)}
                  />
                </View>
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}
              </View>

              <View style={styles.column}>
                <Text style={styles.label}>Soyad</Text>
                <View style={styles.inputBox}>
                  <UserIcon size={18} color="#888" />
                  <TextInput
                    placeholder="Soyadınız"
                    style={styles.input}
                    value={formData.surname}
                    onChangeText={(t) => handleChange("surname", t)}
                  />
                </View>
                {errors.surname && (
                  <Text style={styles.error}>{errors.surname}</Text>
                )}
              </View>
            </View>
            {/* Phone */}
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.label}>Telefon</Text>
              <View style={styles.inputBox}>
                <Phone size={18} color="#888" />
                <TextInput
                  placeholder="5xx xxx xx xx"
                  keyboardType="number-pad"
                  style={styles.input}
                  value={formData.phone}
                  onChangeText={(t) => handleChange("phone", t)}
                />
              </View>
              {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
            </View>

            {/* Username */}
            <View style={{ marginTop: 15, marginBottom: 15 }}>
              <Text style={styles.label}>Kullanıcı Adı</Text>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Kullanıcı adınız"
                  style={styles.input}
                  value={formData.username}
                  onChangeText={(t) => handleChange("username", t)}
                />
              </View>
              {errors.username && (
                <Text style={styles.error}>{errors.username}</Text>
              )}
            </View>
            {/* Password + confirm */}
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Parola</Text>
                <View style={styles.inputBox}>
                  <UserIcon size={18} color="#888" />
                  <TextInput
                    placeholder="********"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(t) => handleChange("password", t)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>

              <View style={styles.column}>
                <Text style={styles.label}>Parola Doğrula</Text>
                <View style={styles.inputBox}>
                  <UserIcon size={18} color="#888" />
                  <TextInput
                    placeholder="********"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChangeText={(t) => handleChange("confirmPassword", t)}
                  />
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </View>
            </View>

            {/* City + District */}
            {/* <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Şehir</Text>
            <View style={styles.inputBox}>
              <MapPin size={18} color="#888" />
              <TextInput
                placeholder="Şehir"
                style={styles.input}
                value={formData.city}
                onChangeText={(t) => handleChange("city", t)}
              />
            </View>
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>İlçe</Text>
            <View style={styles.inputBox}>
              <Map size={18} color="#888" />
              <TextInput
                placeholder="İlçe"
                style={styles.input}
                value={formData.district}
                onChangeText={(t) => handleChange("district", t)}
              />
            </View>
            {errors.district && (
              <Text style={styles.error}>{errors.district}</Text>
            )}
          </View>
        </View> */}

            {/* Region */}
            {/* <View>
          <Text style={styles.label}>Bölge</Text>
          <View style={styles.inputBox}>
            <Map size={18} color="#888" />
            <TextInput
              placeholder="Bölge"
              style={styles.input}
              value={formData.region}
              onChangeText={(t) => handleChange("region", t)}
            />
          </View>
          {errors.region && <Text style={styles.error}>{errors.region}</Text>}
        </View> */}

            {/* Submit */}
            <TouchableOpacity
              disabled={loading}
              style={styles.btn}
              onPress={submit}
            >
              {loading ? (
                <ActivityIndicator size={"large"} />
              ) : (
                <Text style={styles.btnText}>Kayıt Ol</Text>
              )}
            </TouchableOpacity>

            {/* Back */}
            <TouchableOpacity style={styles.backBtn} onPress={onBackToLogin}>
              <Text style={styles.backText}>
                Zaten hesabınız var mı? Giriş yapın
              </Text>
            </TouchableOpacity>
            <Text style={styles.hintText}>
              Bir yöneticiniz yok ise yeni kayıt yapın.
            </Text>
          </View>

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
    flex: 1,
    backgroundColor: "#eef2ff",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#f59e0b",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#312e81",
    marginTop: 12,
  },
  appSubtitle: {
    color: "#4f46e5",
    marginTop: 4,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#312e81",
    marginBottom: 4,
  },
  cardSubtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  column: {
    flex: 1,
  },
  label: {
    color: "#374151",
    marginBottom: 4,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  btn: {
    backgroundColor: "#047857",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  backBtn: {
    marginTop: 16,
    alignItems: "center",
  },
  backText: {
    color: "#4f46e5",
  },
  //   footer: {
  //     textAlign: "center",
  //     color: "#818cf8",
  //     marginTop: 24,
  //   },
  footer: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 12,
    color: "#818cf8",
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
  hintText: {
    marginTop: 12,
    textAlign: "center",
    color: "#6b7280",
    fontSize: 12,
  },
});

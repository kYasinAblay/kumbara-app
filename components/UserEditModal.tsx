import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/src/models/User";
import { UserWithPassword } from "@/src/data/users";


// Varsayım: username ve password alanları string'dir.
interface Credentials {
  username: string;
  password: string;
  // Eğer başka alanlar da varsa buraya eklenmeli
}

interface UserEditModalProps {
  visible: boolean; 
  onClose: () => void; 
  onSubmit: (userId:string,credentials:Credentials) => Promise<void>; 
  user: UserWithPassword | null; 
}

export default function UserEditModal({ visible, onClose,onSubmit, user }:UserEditModalProps) {
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState(user?.password || "");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (userId:string,credentials:Credentials) => {
    await setLoading(true);
     await onSubmit(user?.id!,{ username, password });
    onClose();
    setLoading(false);
  };

  useEffect(()=>{
    setUsername(user?.username || "");
    setPassword(user?.password || "");
    setLoading(false);
  },[onClose]);


  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>

          {/* Kapat Butonu */}
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>

          <Text style={styles.title}>Kullanıcı Bilgileri</Text>

          {/* Kullanıcı adı */}
          <Text style={styles.label}>Kullanıcı Adı</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholder="Kullanıcı adı"
            placeholderTextColor="#888"
          />

          {/* Şifre */}
          <Text style={styles.label}>Şifre</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { flex: 1 }]}
              placeholder="Şifre"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="#444"
              />
            </TouchableOpacity>
          </View>

          {/* Tamam */}
          {loading ? <Text style={[styles.submitButton,styles.submitText]}>Güncelleniyor...</Text>:
          <TouchableOpacity disabled={loading} style={styles.submitButton} onPress={()=>handleSubmit(user?.id!,{username,password})}>
            <Text style={styles.submitText}>Tamam</Text>
          </TouchableOpacity>}

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 14,
    elevation: 6,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
    backgroundColor:"lightgray",
    borderRadius:"50%",
    zIndex:1
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
    color: "#222",
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    color: "#444",
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#00897b",
    marginTop: 22,
    padding: 14,
    borderRadius: 10,
  },
  submitText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

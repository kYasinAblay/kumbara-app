// src/core/network/NetworkGuard.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNetworkStore } from "./NetworkStore";
import { router } from "expo-router";

interface Props {
  children: React.ReactNode;
  protectAfterLogin?: boolean; // Home gibi ekranlar için
}

export function NetworkGuard({ children, protectAfterLogin = false }: Props) {
  const isConnected = useNetworkStore((s) => s.isConnected);
  const hasRedirected = React.useRef(false);

  useEffect(() => {
    if (!isConnected && protectAfterLogin && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace("/login");
    }

    if (isConnected) {
      hasRedirected.current = false; // tekrar bağlanınca sıfırla
    }
  }, [isConnected, protectAfterLogin]);

  if (!isConnected && !protectAfterLogin) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>İnternet Bağlantısı Yok</Text>
        <Text style={styles.subText}>Devam etmek için bağlantıyı açın</Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  offlineContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  offlineText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#b91c1c",
    marginBottom: 6,
  },
  subText: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
  },
});

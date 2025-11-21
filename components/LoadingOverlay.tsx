import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useLoading } from "../context/LoadingContext";

export default function LoadingOverlay() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
});

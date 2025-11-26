import React from "react";
import { View } from "react-native";
import ProfilePage from "@/components/ProfilePage";
import { useRouter } from "expo-router";
import AuthRepository from "@/src/repositories/AuthRepository";
import Sleep from "@/src/utils/Sleep";
import useUser from "@/hooks/useUser";
import { ActivityIndicator } from "react-native";
import { useLoading } from "@/context/LoadingContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading, updateUser } = useUser();
  

  const handleLogout = async () => {
    AuthRepository.logout(); 
    router.push("/login");
  };

  if (loading) return(
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" />
  </View>);

  return (
    <ProfilePage
      user={user} 
      onUpdateUser={updateUser}
      onLogout={handleLogout}
    />
  );
}

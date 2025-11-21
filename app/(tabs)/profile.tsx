import React from "react";
import ProfilePage from "@/components/ProfilePage";
import { useRouter } from "expo-router";
import AuthRepository from "@/src/repositories/AuthRepository";
import Sleep from "@/src/utils/Sleep";
import useUser from "@/hooks/useUser";
import { useLoading } from "@/context/LoadingContext";
import { ActivityIndicator } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { user,loading, updateUser } = useUser();

  const handleLogout = async () => {
    AuthRepository.logout();
    await Sleep(1500);
    router.push("/login");
  };

if (loading) return <ActivityIndicator size={"large"} />;


  return (
    <ProfilePage
      user={user}
      onUpdateUser={updateUser}
      onLogout={handleLogout}
    />
  );
}

import React, { useEffect } from "react";
import { View } from "react-native";
import ProfilePage from "@/components/ProfilePage";
import { Redirect, useRouter } from "expo-router";
import AuthRepository from "@/src/repositories/AuthRepository";
import Sleep from "@/src/utils/Sleep";
import useUser from "@/hooks/useUser";
import { ActivityIndicator } from "react-native";
import { useUserStore } from "@/src/store/useUserStore";
import { useMoneyBoxStore } from "@/src/store/moneyBoxStore";
import { useMoneyBoxes } from "@/hooks/getMoneyBox";
import SessionCookieStore from "@/src/session/SessionCookieStore";

export default function ProfileScreen() {
  const router = useRouter();
  const { loading } = useUser();

  const { user, updateUser } = useUserStore();
  const { moneyBoxes } = useMoneyBoxStore();


console.log("profile screen render");

  const { refresh } = useMoneyBoxes();

  useEffect(() => {
    refresh();
  }, []);

  const handleLogout = async () => {
    AuthRepository.logout();
    router.push("/login");
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

    
  return (
    <ProfilePage
      user={user!}
      moneyBoxes={moneyBoxes}
      onUpdateUser={updateUser}
      onLogout={handleLogout}
    />
  );
}

import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useAuthorization from "@/hooks/useAuthorization";
import SessionCookieStore from "@/src/session/SessionCookieStore";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAdmin } = useAuthorization();

  
  return (
    <Tabs
      initialRouteName="profile"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="box.truck.fill" color={color} />
          ),
        }}
      />{" "}
      ,{" "}
      <Tabs.Screen
        name="index"
        options={{
          title: "Kumbaralar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dollarsign.circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: isAdmin ? "/explore" : null,
          title: "Toplam",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="wallet.pass.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

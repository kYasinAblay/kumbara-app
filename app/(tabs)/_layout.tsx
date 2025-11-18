import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/context/AuthContext';
import IsAdmin from '@/hooks/useAuthorization';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { userId } = useAuth();

console.log("TABS/_layout > role ",IsAdmin(), userId);
 
 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}> 
       <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="box.truck.fill" color={color} />,
        }} />,
      <Tabs.Screen
        name="index"
        options={{
          title: 'Kumbaralar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="box.truck" color={color} />,
        }}
      />
    
      <Tabs.Screen
        name="explore"
        options={{
          href: IsAdmin()? "/explore" :null,
          title: 'Toplam',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wallet.pass.fill" color={color} />,
        }}
        />
    </Tabs>
  );
}

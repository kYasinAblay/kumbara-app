import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MoneyBox } from '../../src/models/MoneyBox';
import {User} from '../../src/models/User';
import ProfilePage from '@/components/ProfilePage';


interface ProfilePageProps {
  user: User;
  onUpdateUser: (userData: Omit<User, 'id' | 'is_deleted' | 'date' | 'moneyboxes'>) => void;
}

export default function ProfileScreen() {

    const [user, setUser] = useState({
    id: '1',
    name: 'Kamil',
    surname: 'Yasin',
    phone: 5555555555,
    zone: 'İstanbul',
    address: 'Kadıköy',
    date: '2024-01-01',
    is_deleted: false,
    moneyboxes: [
      { id: 1, name: 'Tatil', city: 'İzmir', zone: 'Bornova', amount: 1200, is_deleted: false },
      { id: 2, name: 'Araba', city: 'İstanbul', zone: 'Ataşehir', amount: 3000, is_deleted: false },
    ],
  });

  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  return <ProfilePage user={user} onUpdateUser={updateUser} />;
}
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // PiggyBank, Plus yerine
import { MoneyBoxForm } from '../../components/MoneyBoxForm';
import { Dashboard } from '../../components/explore/Dashboard';
import { MoneyBox } from '../../src/models/MoneyBox';
import { Redirect, useRouter } from 'expo-router';
import { AlertDialog } from '@/components/ui/AlertDialog';
import useAuthorization from '@/hooks/useAuthorization';
import { useMoneyBoxStore } from '@/src/store/moneyBoxStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
    
  const {moneyBoxes, setMoneyBoxes} = useMoneyBoxStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBox, setEditingBox] = useState<MoneyBox | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const router = useRouter();

  const activeBoxes = moneyBoxes.filter(box => !box.is_deleted);
  
  // const {isAdmin} = useAuthorization();
  // if (!isAdmin) {
   
  //   return <View><AlertDialog
  //           visible={true}
  //           onClose={() => setIsDialogOpen(false)}
  //           title="Yetkiniz Yok"
  //           description={`Bu tab'a girmek için yetkiniz bulunmamaktadır.`}
  //           confirmText="Tamam"
  //           onConfirm={()=>router.navigate("/(tabs)")}
  //         /></View>;
  // }
//dropdownbox ile yıllık kazanç grafiği ekleyebiliriz
  return (
     <SafeAreaView style={[styles.safeArea, styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Ionicons name="piggy-bank" size={36} color="#016840" /> */}
        <View>
          <Text style={styles.title}>Kumbara Analitiği</Text>
          <Text style={styles.subtitle}>Manage your savings across locations</Text>
        </View>
        {/* bu bölümü istatistik butonu yapabiliriz
        <TouchableOpacity
          onPress={() => setIsDialogOpen(true)}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity> */} 
      </View>

      {/* Dashboard */}
      <Dashboard moneyBoxes={activeBoxes} />

  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: 
  { flex: 1, backgroundColor: '#eef2ff', padding: 16 },
  safeArea: {
    flex: 1,
    backgroundColor: "#eef2ff", // from-blue-50 via-indigo-50 to-purple-50
  },
  header: 
  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  title: 
  { fontSize: 20, fontWeight: '600', color: '#312e81' },
  subtitle:
   { color: '#312e81' },
  addButton:
   { backgroundColor: '#016840', padding: 10, borderRadius: 8 },
  box:
   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 },
  boxTitle:
   { fontSize: 16, fontWeight: '600' },
  boxSubtitle:
   { color: '#6b7280' },
  amount:
   { marginTop: 4, fontSize: 16, color: '#16a34a', fontWeight: '500' },
  modalContent:
   { flex: 1, justifyContent: 'flex-end', padding: 16 }
});




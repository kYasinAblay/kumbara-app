import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // PiggyBank, Plus yerine
import { MoneyBoxForm } from '../../components/MoneyBoxForm';
import { Dashboard } from '../../components/Dashboard';
import { MoneyBox } from '../../src/models/MoneyBox';

export default function TabTwoScreen() {
    
  const [moneyBoxes, setMoneyBoxes] = useState<MoneyBox[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBox, setEditingBox] = useState<MoneyBox | null>(null);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('moneyboxes');
      if (saved) {
        setMoneyBoxes(JSON.parse(saved));
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('moneyboxes', JSON.stringify(moneyBoxes));
  }, [moneyBoxes]);

  const handleCreateBox = (boxData: Omit<MoneyBox, 'id' | 'is_deleted' | 'date'>) => {
    const newBox: MoneyBox = {
      ...boxData,
      id: Date.now().toString(),
      is_deleted: false,
      date: new Date().toISOString(),
    };
    setMoneyBoxes(prev => [...prev, newBox]);
    setIsDialogOpen(false);
  };

  const handleUpdateBox = (boxData: Omit<MoneyBox, 'id' | 'is_deleted' | 'date'>) => {
    if (editingBox) {
      setMoneyBoxes(prev =>
        prev.map(box =>
          box.id === editingBox.id ? { ...box, ...boxData } : box
        )
      );
      setEditingBox(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteBox = (id: string) => {
    Alert.alert('Sil', 'Bu kutuyu silmek istediğine emin misin?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Evet', style: 'destructive',
        onPress: () =>
          setMoneyBoxes(prev =>
            prev.map(box =>
              box.id === id ? { ...box, is_deleted: true } : box
            )
          ),
      },
    ]);
  };

  const handleEdit = (box: MoneyBox) => {
    setEditingBox(box);
    setIsDialogOpen(true);
  };

  const activeBoxes = moneyBoxes.filter(box => !box.is_deleted);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Ionicons name="piggy-bank" size={36} color="#4f46e5" /> */}
        <View>
          <Text style={styles.title}>Money Box Manager</Text>
          <Text style={styles.subtitle}>Manage your savings across locations</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsDialogOpen(true)}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dashboard */}
      <Dashboard moneyBoxes={activeBoxes} />

      {/* List */}
      <FlatList
        data={activeBoxes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <View style={{ flex: 1 }}>
              <Text style={styles.boxTitle}>{item.name}</Text>
              <Text style={styles.boxSubtitle}>{item.city} - {item.zone}</Text>
              <Text style={styles.amount}>₺{item.amount}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Ionicons name="create-outline" size={22} color="#4f46e5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteBox(item.id)}>
              <Ionicons name="trash-outline" size={22} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal for Create/Edit */}
      <Modal visible={isDialogOpen} animationType="slide" style={{height:50,maxHeight:50, margin: 0,flex:0.5 }}>
           <View style={styles.modalContent}>
          <MoneyBoxForm
            initialData={editingBox || undefined}
            onSubmit={editingBox ? handleUpdateBox : handleCreateBox}
            onCancel={() => {
              setEditingBox(null);
              setIsDialogOpen(false);
            }}
          />
        </View>     
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { flex: 1, backgroundColor: '#eef2ff', padding: 16 ,paddingTop:50},

  header: 
  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  title: 
  { fontSize: 20, fontWeight: '600', color: '#1e1b4b' },
  subtitle:
   { color: '#4f46e5' },
  addButton:
   { backgroundColor: '#4f46e5', padding: 10, borderRadius: 8 },
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




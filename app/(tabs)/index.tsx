import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { Dashboard } from '../../components/home/Dashboard';
// import { MoneyBoxList } from '../../components/MoneyBoxList';
import { MoneyBoxForm } from '../../components/MoneyBoxForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/Dialog';
import { MoneyBox } from '../../src/models/MoneyBox';
import { MoneyBoxList } from '../../components/MoneyBoxList';


export default function HomeScreen() {
const [moneyBoxes, setMoneyBoxes] = useState<MoneyBox[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBox, setEditingBox] = useState<MoneyBox | null>(null);

  // 📦 Load data
  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem('moneyboxes');
      if (saved) setMoneyBoxes(JSON.parse(saved));
    };
    loadData();
  }, []);

  // 💾 Save data
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
    setMoneyBoxes(prev =>
      prev.map(box => (box.id === id ? { ...box, is_deleted: true } : box))
    );
  };

  const handleUpdateAmount = (id: string, newAmount: number) => {
    setMoneyBoxes(prev =>
      prev.map(box => (box.id === id ? { ...box, amount: newAmount } : box))
    );
  };

  const handleEdit = (box: MoneyBox) => {
    setEditingBox(box);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBox(null);
  };

  const activeBoxes = moneyBoxes.filter(box => !box.is_deleted);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoBox}>
              <Ionicons name="piggy-bank" size={22} color="#fff" />
            </View>
            <View>
              <Text style={styles.title}>Kumbaralar</Text>
              <Text style={styles.subtitle}>Birikimlerinizi yönetin</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsDialogOpen(true)}
          >
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={styles.addText}>Yeni</Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard */}
        <Dashboard moneyBoxes={activeBoxes} />

        {/* Money Box List */}
        <MoneyBoxList
          moneyBoxes={activeBoxes}
          onDelete={handleDeleteBox}
          onEdit={handleEdit}
          onUpdateAmount={handleUpdateAmount}
        />
      </ScrollView>

      {/* Dialog for Create/Edit */}
      <Dialog visible={isDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBox ? 'Kumbara Düzenle' : 'Yeni Kumbara Oluştur'}
            </DialogTitle>
          </DialogHeader>
          <MoneyBoxForm
            initialData={editingBox || undefined}
            onSubmit={editingBox ? handleUpdateBox : handleCreateBox}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef2ff', // from-blue-50 via-indigo-50 to-purple-50
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#6366f1', // from-indigo-600
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#312e81', // text-indigo-900
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#4f46e5',
    fontSize: 12,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },
});

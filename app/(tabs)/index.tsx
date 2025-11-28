import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { Dashboard } from '../../components/home/Dashboard';
import { MoneyBoxForm } from '../../components/MoneyBoxForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/Dialog';
import { MoneyBox } from '../../src/models/MoneyBox';
import { MoneyBoxList } from '../../components/MoneyBoxList';
import MoneyBoxRepository from '@/src/repositories/MoneyBoxRepository';
import useUser from '@/hooks/useUser';
import { getCityNameById } from '@/hooks/getCityNameById';
import { useMoneyBoxStore } from '@/src/store/moneyBoxStore';

export default function HomeScreen() {
  const { moneyBoxes, setMoneyBoxes,updateMoneyBox,removeMoneyBox, updateAmount} = useMoneyBoxStore.getState();
// const moneyBoxes = useMoneyBoxStore((state) => state.moneyBoxes);
  //const [moneyBoxes, setMoneyBoxes] = useState<MoneyBox[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBox, setEditingBox] = useState<MoneyBox | null>(null);

  const {user,loading} = useUser();
  // 📦 Load data
  useEffect(() => {
    const loadData = async () => {
      //  const saved = await AsyncStorage.getItem('moneyboxes');
         console.log("load data in index.tsx",moneyBoxes);
      setMoneyBoxes(moneyBoxes.filter(box => !box.is_deleted));
      //setMoneyBoxes(user.moneyboxes.filter(box => !box.is_deleted));
    };
    loadData();    

  }, [moneyBoxes]);

  const reInitial = ()=>{
        setEditingBox(prev => ({...prev,
      id:0,
      name:"",
      amount:0,
      description:"",
      zone:"",
      is_deleted:false
    }));
  }
  // 💾 Save data
  useEffect(() => {
    AsyncStorage.setItem('moneyboxes', JSON.stringify(moneyBoxes));
  }, [moneyBoxes]);
   
  useEffect(() => { 

    setEditingBox({
      id:0,
      name:"",
      amount:0,
      description:"",
      zone:"",
      is_deleted:false,
      city:getCityNameById(user.city),
      user_id:user.id}); 
  }, [user]); 


  const handleCreateBox = useCallback(async (boxData: Omit<MoneyBox, 'id' | 'is_deleted' | 'created_at'>) => {

    const newBox: MoneyBox = {
      ...boxData,
      // id: Date.now().toString(),
      is_deleted: false,
      created_at: new Date().toISOString(),
      user_id:user.id
    };

    const response = await MoneyBoxRepository.add(boxData)
     .catch((err)=> {console.warn("Kayıt yapılamadı!"); return;});

     newBox.id = response.moneyboxes?.id;
     updateMoneyBox(newBox.id!,newBox);
    
     //setMoneyBoxes(prev => [...prev, newBox]);
    reInitial();
    setIsDialogOpen(false);
  },[editingBox]);

  const handleUpdateBox = useCallback((boxData: Omit<MoneyBox, 'is_deleted' | 'created_at'>) => {
    if (editingBox) {
      updateMoneyBox(boxData.id!,boxData);
      // setMoneyBoxes(prev =>
      //   prev.map(box =>
      //     box.id === editingBox.id ? { ...box, ...boxData } : box
      //   )
      // );
     
      MoneyBoxRepository.update(boxData);
      reInitial();
      setIsDialogOpen(false);
    }
  }, [editingBox]);

  const handleDeleteBox = async (id: number) => {
    removeMoneyBox(id);
    // setMoneyBoxes(prev =>
    //   prev.map(box => (box.id === id ? { ...box, is_deleted: true } : box)).filter(box => box.id !== id)
    // );
   await MoneyBoxRepository.remove(id);
  };

  const handleUpdateAmount = (id: number, newAmount: number) => {
    updateAmount(id,newAmount);
    // setMoneyBoxes(prev =>
    //   prev.map(box => (box.id === id ? { ...box, amount: newAmount } : box))
    // );
  };

  const handleEdit = (box: MoneyBox) => {
    setEditingBox(box);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    reInitial();
  };



  if (loading) return(
   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <ActivityIndicator size={"large"} style={{marginTop:-50}} />  
     </View>
     );


  return (
    <SafeAreaView style={[styles.safeArea ,styles.container]}>
              {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoBox}>
              <Ionicons name="cash-outline" size={22} color="#fff" />
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
        <Dashboard moneyBoxes={moneyBoxes} />

        {/* Money Box List */}
        <MoneyBoxList
          moneyBoxes={moneyBoxes}
          onDelete={handleDeleteBox}
          onEdit={handleEdit}
          onUpdateAmount={handleUpdateAmount}
        />
      

      {/* Dialog for Create/Edit */}
      <Dialog visible={isDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBox ? 'Kumbara Düzenle' : 'Yeni Kumbara Oluştur'}
            </DialogTitle>
          </DialogHeader>
          { loading ? <ActivityIndicator size={'large'} /> :
            <MoneyBoxForm
            initialData={editingBox || undefined}
            onSubmit={editingBox?.id! >0 ? handleUpdateBox : handleCreateBox}
            onCancel={handleCloseDialog}
          />}
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
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#C9AD63', // from-indigo-600 #6366f1
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#312e81', // text-indigo-900 #312e81 eski renk tonu 
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#312e81',
    fontSize: 12,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#016840',
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

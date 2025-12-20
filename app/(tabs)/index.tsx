import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { Dashboard } from "../../components/home/Dashboard";
import { MoneyBoxForm } from "../../components/MoneyBoxForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog";
import { MoneyBox } from "../../src/models/MoneyBox";
import { MoneyBoxList } from "../../components/MoneyBoxList";
import useUser from "@/hooks/useUser";

import { getCityNameById } from "@/hooks/getCityNameById";
import { useMoneyBoxStore } from "@/src/store/moneyBoxStore";
import { NetworkGuard } from "@/src/core/network/NetworkGuard";
import { X } from "lucide-react-native";
import SessionCookieStore from "@/src/session/SessionCookieStore";
import { Redirect, router } from "expo-router";
import { useMoneyBoxes } from "@/hooks/getMoneyBox";

export default function HomeScreen() {


  const {
    moneyBoxes,
    setMoneyBoxes,
    addMoneyBox,
    updateMoneyBox,
    removeMoneyBox,
    updateAmount,
  } = useMoneyBoxStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBox, setEditingBox] = useState<MoneyBox | null>(null);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const { refresh } = useMoneyBoxes();
  const { user, loading } = useUser();

  // 📦 Load data
  useEffect(() => {
    const loadData = async () => {
      refresh();
      //  const saved = await AsyncStorage.getItem('moneyboxes');
      console.log("load data in index.tsx", moneyBoxes);
      setMoneyBoxes(moneyBoxes.filter((box) => !box.is_deleted));
      //setMoneyBoxes(user.moneyboxes.filter(box => !box.is_deleted));
    };
    loadData();
  }, [user]);

  const reInitial = () => {
    setEditingBox((prev) => ({
      ...prev,
      id: 0,
      name: "",
      amount: 0,
      description: "",
      zone: "",
      is_deleted: false,
    }));
  };

  useEffect(() => {
    setEditingBox({
      id: 0,
      name: "",
      amount: 0,
      description: "",
      zone: "",
      is_deleted: false,
      city: getCityNameById(user?.city),
      user_id: user?.id,
    });
  }, [user]);

  const handleCreateBox = useCallback(
    async (boxData: Omit<MoneyBox, "id" | "is_deleted" | "created_at">) => {
      const newBox: MoneyBox = {
        ...boxData,
        // id: Date.now().toString(),
        is_deleted: false,
        created_at: new Date().toISOString(),
        user_id: user?.id,
      };

      addMoneyBox(newBox);

      reInitial();
      setIsDialogOpen(false);
    },
    [editingBox]
  );

  const handleUpdateBox = useCallback(
    (boxData: Omit<MoneyBox, "is_deleted" | "created_at">) => {
      if (editingBox) {
        updateMoneyBox(boxData.id!, boxData);

        reInitial();
        setIsDialogOpen(false);
      }
    },
    [editingBox]
  );

  const handleDeleteBox = async (id: number) => {
    removeMoneyBox(id);
  };

  const handleEdit = (box: MoneyBox) => {
    setEditingBox(box);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    reInitial();
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} style={{ marginTop: 0 }} />
      </View>
    );

  return (
    <NetworkGuard protectAfterLogin>
      <SafeAreaView style={[styles.safeArea]}>
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {moneyBoxes.length > 1 && <TouchableOpacity
              onPress={() => setCityModalVisible(true)}
              style={styles.cityButton}
            >
              <Ionicons name="stats-chart" size={20} color="#fff" />
            </TouchableOpacity>
            }           
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsDialogOpen(true)}
            >
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.addText}>Yeni</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Money Box List */}
        <MoneyBoxList
          moneyBoxes={moneyBoxes}
          onDelete={handleDeleteBox}
          onEdit={handleEdit}
          onUpdateAmount={updateAmount}
        />

        {/* Dashboard */}
        {/* <Dashboard moneyBoxes={moneyBoxes} /> */}

        <Modal visible={cityModalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              {/* <Text style={styles.modalTitle}>Şehirlere Göre</Text> */}
              <TouchableOpacity
                onPress={() => setCityModalVisible(false)}
                style={{ alignSelf: "flex-end",top:-10,right:-5,backgroundColor:"red", borderRadius:"50%"}}
              >
                <X size={21} color="#f0f0f0f0" />
              </TouchableOpacity>
              <Dashboard moneyBoxes={moneyBoxes} />
            </View>
          </View>
        </Modal>

        {/* ⚙️ Filter Modal */}
        {/* Dialog for Create/Edit */}
        <Dialog visible={isDialogOpen} onClose={handleCloseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBox ? "Kumbara Düzenle" : "Yeni Kumbara Oluştur"}
              </DialogTitle>
            </DialogHeader>
            {loading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <MoneyBoxForm
                initialData={editingBox || undefined}
                onSubmit={
                  editingBox?.id! > 0 ? handleUpdateBox : handleCreateBox
                }
                onCancel={handleCloseDialog}
              />
            )}
          </DialogContent>
        </Dialog>
      </SafeAreaView>
    </NetworkGuard>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef2ff", //#eef2ff
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#C9AD63", // from-indigo-600 #6366f1
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#312e81", // text-indigo-900 #312e81 eski renk tonu
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: "#312e81",
    fontSize: 12,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#016840",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  cityButton: {
    backgroundColor: "#016840",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    position:"relative"
  },

  // modalTitle: {
  //   fontSize: 16,
  //   fontWeight: "700",
  //   marginBottom: 14,
  //   color: "#374151",
  // },

  closeButton: {
    marginTop: 18,
    backgroundColor: "#016840",
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
});

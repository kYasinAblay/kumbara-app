import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MoneyBox } from "../src/models/MoneyBox";
import { AlertDialog } from "./ui/AlertDialog";
import DateUtils from "@/src/utils/DateUtils";

interface Props {
  box: MoneyBox;
  onDelete: (id: number) => void;
  onEdit: (box: MoneyBox) => void;
  onUpdateAmount: (id: number, newAmount: number) => void;
}

export const MoneyBoxCard: React.FC<Props> = ({
  box,
  onDelete,
  onEdit,
  onUpdateAmount,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isTransaction, setIsTransaction] = useState(false);
  const [amountText, setAmountText] = useState("");

  const handleTransaction = (type: "add" | "sub") => {
    const val = parseFloat(amountText);
    if (!val || val <= 0) return;
    const newAmount =
      type === "add" ? box.amount + val : Math.max(0, box.amount - val);
    onUpdateAmount(box.id!, newAmount);
    setIsTransaction(false);
    setAmountText("");
  };

  //const dateStr = new Date(box.date).toLocaleDateString('tr-TR');

  return (
    <>
      <View style={styles.card}>
        {/* Header gradient */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.left}>
              <View style={styles.iconCircle}>
                {/* <Ionicons name="piggy-bank" size={20} color="#fff" /> */}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.boxName}>{box.name}</Text>
                <Text style={styles.zone}>{box.zone}</Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => onEdit(box)}>
                <Ionicons name="create-outline" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsDeleteOpen(true)}>
                <Ionicons name="trash-outline" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Amount */}
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>Miktar</Text>
            <Text style={styles.amountValue}>₺{box.amount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.locationRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={16}
              color="#016840"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.city}>{box.city}</Text>
              {box.description ? (
                <Text style={styles.desc} numberOfLines={1}>
                  {box.description}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
            <Text style={styles.date}>
              {DateUtils.formatDate(box.created_at!)}
            </Text>
          </View>

          {isTransaction ? (
            <View style={styles.txContainer}>
              <TextInput
                placeholder="Miktar girin"
                keyboardType="numeric"
                value={amountText}
                onChangeText={setAmountText}
                style={styles.input}
              />
              <View style={styles.txButtons}>
                <TouchableOpacity
                  style={[styles.txBtn, { backgroundColor: "#16a34a" }]}
                  onPress={() => handleTransaction("add")}
                >
                  <Ionicons name="add" size={16} color="#fff" />
                  <Text style={styles.txBtnText}>Ekle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.txBtn, { backgroundColor: "#dc2626" }]}
                  onPress={() => handleTransaction("sub")}
                >
                  <Ionicons name="remove" size={16} color="#fff" />
                  <Text style={styles.txBtnText}>Çıkar</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.cancelTx}
                onPress={() => {
                  setIsTransaction(false);
                  setAmountText("");
                }}
              >
                <Text style={styles.cancelTxText}>İptal</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.txToggle}
              onPress={() => setIsTransaction(true)}
            >
              <Text style={styles.txToggleText}>Para Ekle / Çıkar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 🗑️ Delete Alert */}
      <AlertDialog
        visible={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Kumbarayı Sil"
        description={`"${box.name}" kumbarasını silmek istiyor musunuz? Bu işlem geri alınamaz.`}
        confirmText="Sil"
        cancelText="İptal"
        onConfirm={() => {
          alert(box.id);
          onDelete(box.id!);
        }}
      />
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    backgroundColor: "#016840",
    padding: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  left: { flexDirection: "row", alignItems: "center", flex: 1, gap: 6 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  boxName: { color: "#fff", fontWeight: "600", fontSize: 15 },
  zone: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
  actions: { flexDirection: "row", gap: 10 },
  amountBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
  },
  amountLabel: { color: "rgba(255,255,255,0.8)", fontSize: 11 },
  amountValue: { color: "#fff", fontSize: 20, fontWeight: "700" },
  content: { padding: 12 },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  city: { color: "#111827", fontSize: 13 },
  desc: { color: "#6b7280", fontSize: 11 },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  date: { color: "#6b7280", fontSize: 11 },
  txContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 8,
    textAlign: "center",
    fontSize: 14,
    marginBottom: 6,
  },
  txButtons: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  txBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  txBtnText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  cancelTx: {
    marginTop: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelTxText: {
    textAlign: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    padding: 4,
    width: "60%",
    color: "#534949ff",
    fontSize: 12,
    fontWeight: 800,
  },
  txToggle: {
    borderWidth: 1,
    borderColor: "#c7d2fe",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 8,
  },
  txToggleText: { color: "#016840", fontWeight: "600", fontSize: 13 },
});

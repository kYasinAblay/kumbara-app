import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  ActivityIndicator,
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { MoneyBox } from "../src/models/MoneyBox";
import { MoneyBoxCard } from "../components/MoneyBoxCard";
import useAuthorization from "@/hooks/useAuthorization";

interface MoneyBoxListProps {
  moneyBoxes: MoneyBox[];
  onDelete: (id: number) => void;
  onEdit: (box: MoneyBox) => void;
  onUpdateAmount: (id: number, newAmount: number) => void;
  onEndReached: () => Promise<void> | undefined;
  loadingMore: boolean;
}

export function MoneyBoxList({
  moneyBoxes,
  onDelete,
  onEdit,
  onUpdateAmount,
  onEndReached,
  loadingMore,
}: MoneyBoxListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "name">("date");
  const [filterVisible, setFilterVisible] = useState(false);

  const cities = useMemo(
    () =>
      Array.from(new Set(moneyBoxes.map((b) => b.city?.toUpperCase()))).sort(),
    [moneyBoxes]
  );

  const filteredAndSortedBoxes = useMemo(() => {
    const filtered = moneyBoxes.filter((b) => {
      const matchSearch =
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.zone.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCity =
        selectedCity === "all" || b.city?.toUpperCase() === selectedCity;
      return matchSearch && matchCity;
    });

    return filtered.sort((a: MoneyBox, b: MoneyBox) => {
      if (sortBy === "date")
        return (
          new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
        );
      if (sortBy === "amount") return b.amount - a.amount;
      return a.name.localeCompare(b.name);
    });
  }, [moneyBoxes, searchTerm, selectedCity, sortBy]);

  // const grouped = useMemo(() => {
  //   const res: Record<string, MoneyBox[]> = {};
  //   cities.forEach(
  //     (c) =>
  //       (res[c] = filteredAndSortedBoxes.filter(
  //         (b) => b.city?.toUpperCase() === c?.toUpperCase()
  //       ))
  //   );
  //   return res;
  // }, [filteredAndSortedBoxes, cities]);

   const sections = useMemo(() => {
    if (selectedCity !== "all") {
      return [
        { title: selectedCity, data: filteredAndSortedBoxes },
      ];
    }

    return cities
      .map((c) => ({
        title: c,
        data: filteredAndSortedBoxes.filter(
          (b) => b.city?.toUpperCase() === c?.toUpperCase()
        ),
      }))
      .filter((s) => s.data.length > 0);
  }, [filteredAndSortedBoxes, cities, selectedCity]);

  const hasFilters =
    searchTerm !== "" || selectedCity !== "all" || sortBy !== "date";
  const { isAdmin } = useAuthorization();

  return (
    <View style={styles.container}>
      {/* 🔍 Search bar */}
      {isAdmin && (
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={18}
            color="#9ca3af"
            style={styles.iconLeft}
          />
          <TextInput
            placeholder="Kumbara ara..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}
          >
            <Ionicons name="options" size={18} color="#016840" />
            {hasFilters && <View style={styles.activeDot} />}
          </TouchableOpacity>
        </View>
      )}

      {/* 🧮 Count */}
      {filteredAndSortedBoxes.length > 0 && (
        <Text style={styles.resultCount}>
          {filteredAndSortedBoxes.length} kumbara bulundu
        </Text>
      )}

      {/* 🏦 Empty State */}
      {filteredAndSortedBoxes.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🏦</Text>
          <Text style={styles.emptyText}>
            {moneyBoxes.length === 0
              ? "Henüz kumbara yok"
              : "Eşleşen kumbara bulunamadı"}
          </Text>
          <Text style={styles.emptySub}>
            {moneyBoxes.length === 0
              ? "İlk kumbaranızı oluşturun!"
              : "Farklı arama kriterleri deneyin"}
          </Text>
        </View>
      ) : selectedCity === "all" ? (

          <SectionList
          sections={sections}
          keyExtractor={(item) => item.id?.toString()!}
          renderSectionHeader={({ section }) => (
            <View style={styles.cityHeader}>
              <Text style={styles.cityName}>{section.title}</Text>
              <Text style={styles.cityCount}>({section.data.length})</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <MoneyBoxCard
              box={item}
              onDelete={onDelete}
              onEdit={onEdit}
              onUpdateAmount={onUpdateAmount}
            />
          )}
          onEndReached={() => {
            // Filtre açıkken paging genelde istenmez (sonuç daralır)
            if (!hasFilters) onEndReached?.();
          }}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator style={{ marginVertical: 12 }} /> : null
          }
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled
        />
      //)
        // 🏙️ Grouped by City
        // <ScrollView showsVerticalScrollIndicator={false}>
        //   {Object.entries(grouped).map(([city, boxes]) =>
        //     boxes.length ? (
        //       <View key={city} style={styles.cityGroup}>
        //         <View style={styles.cityHeader}>
        //           <Text style={styles.cityName}>{city}</Text>
        //           <Text style={styles.cityCount}>({boxes.length})</Text>
        //         </View>
        //         {boxes.map((b) => (
        //           <MoneyBoxCard
        //             key={b.id}
        //             box={b}
        //             onDelete={onDelete}
        //             onEdit={onEdit}
        //             onUpdateAmount={onUpdateAmount}
        //           />
        //         ))}
        //       </View>
        //     ) : null
        //   )}
        // </ScrollView>
      ) : (
        // 📋 Flat list when filtered
        <FlatList
          data={filteredAndSortedBoxes}
          keyExtractor={(item) => item.id?.toString()!}
          renderItem={({ item }) => (
            <MoneyBoxCard
              box={item}
              onDelete={onDelete}
              onEdit={onEdit}
              onUpdateAmount={onUpdateAmount}
            />
          )}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator style={{ marginVertical: 12 }} />
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* ⚙️ Filter Modal */}
      <Modal visible={filterVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filtreler</Text>

          <Text style={styles.label}>Şehir</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(v) => setSelectedCity(v)}
            >
              <Picker.Item label="Tüm Şehirler" value="all" />
              {cities.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Sıralama</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={sortBy} onValueChange={(v) => setSortBy(v)}>
              <Picker.Item label="Tarihe Göre" value="date" />
              <Picker.Item label="Miktara Göre" value="amount" />
              <Picker.Item label="İsme Göre" value="name" />
            </Picker>
          </View>

          {hasFilters && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => {
                setSearchTerm("");
                setSelectedCity("all");
                setSortBy("date");
              }}
            >
              <Text style={styles.clearText}>Filtreleri Temizle</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setFilterVisible(false)}
          >
            <Text style={styles.closeText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: -24 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  iconLeft: { marginRight: 4 },
  input: { flex: 1, paddingVertical: 8, fontSize: 14 },
  filterButton: {
    padding: 6,
    position: "relative",
  },
  activeDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#016840",
  },
  resultCount: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 6,
  },
  emptyBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyEmoji: { fontSize: 32, marginBottom: 8 },
  emptyText: { color: "#4b5563", fontSize: 14, fontWeight: "600" },
  emptySub: { color: "#6b7280", fontSize: 12 },
  cityGroup: { marginBottom: 10 },
  cityHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  cityName: { color: "#312e81", fontSize: 16, fontWeight: "600" },
  cityCount: { color: "#6b7280", fontSize: 13 },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  label: { color: "#374151", marginTop: 10, fontSize: 13 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginTop: 4,
  },
  clearBtn: {
    marginTop: 16,
    backgroundColor: "#e0e7ff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  clearText: { color: "#4338ca", fontWeight: "600" },
  closeBtn: {
    marginTop: 16,
    backgroundColor: "#016840",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: { color: "#fff", fontWeight: "700" },
});

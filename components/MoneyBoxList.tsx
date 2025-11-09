import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { MoneyBox } from '../src/models/MoneyBox';
import { MoneyBoxCard } from '../components/MoneyBoxCard';

interface MoneyBoxListProps {
  moneyBoxes: MoneyBox[];
  onDelete: (id: string) => void;
  onEdit: (box: MoneyBox) => void;
  onUpdateAmount: (id: string, newAmount: number) => void;
}

export function MoneyBoxList({
  moneyBoxes,
  onDelete,
  onEdit,
  onUpdateAmount,
}: MoneyBoxListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');
  const [filterVisible, setFilterVisible] = useState(false);

  const cities = useMemo(
    () => Array.from(new Set(moneyBoxes.map(b => b.city))).sort(),
    [moneyBoxes]
  );

  const filteredAndSortedBoxes = useMemo(() => {
    const filtered = moneyBoxes.filter(b => {
      const matchSearch =
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.zone.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCity = selectedCity === 'all' || b.city === selectedCity;
      return matchSearch && matchCity;
    });

    return filtered.sort((a:MoneyBox, b:MoneyBox) => {
      if (sortBy === 'date')
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'amount') return b.amount - a.amount;
      return a.name.localeCompare(b.name);
    });
  }, [moneyBoxes, searchTerm, selectedCity, sortBy]);

  const grouped = useMemo(() => {
    const res: Record<string, MoneyBox[]> = {};
    cities.forEach(c => (res[c] = filteredAndSortedBoxes.filter(b => b.city === c)));
    return res;
  }, [filteredAndSortedBoxes, cities]);

  const hasFilters =
    searchTerm !== '' || selectedCity !== 'all' || sortBy !== 'date';

  return (
    <View style={styles.container}>
      {/* 🔍 Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#9ca3af" style={styles.iconLeft} />
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
          <Ionicons name="options" size={18} color="#4f46e5" />
          {hasFilters && <View style={styles.activeDot} />}
        </TouchableOpacity>
      </View>

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
              ? 'Henüz kumbara yok'
              : 'Eşleşen kumbara bulunamadı'}
          </Text>
          <Text style={styles.emptySub}>
            {moneyBoxes.length === 0
              ? 'İlk kumbaranızı oluşturun!'
              : 'Farklı arama kriterleri deneyin'}
          </Text>
        </View>
      ) : selectedCity === 'all' ? (
        // 🏙️ Grouped by City
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.entries(grouped).map(([city, boxes]) =>
            boxes.length ? (
              <View key={city} style={styles.cityGroup}>
                <View style={styles.cityHeader}>
                  <Text style={styles.cityName}>{city}</Text>
                  <Text style={styles.cityCount}>({boxes.length})</Text>
                </View>
                {boxes.map(b => (
                  <MoneyBoxCard
                    key={b.id}
                    box={b}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onUpdateAmount={onUpdateAmount}
                  />
                ))}
              </View>
            ) : null
          )}
        </ScrollView>
      ) : (
        // 📋 Flat list when filtered
        <FlatList
          data={filteredAndSortedBoxes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MoneyBoxCard
              box={item}
              onDelete={onDelete}
              onEdit={onEdit}
              onUpdateAmount={onUpdateAmount}
            />
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
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
              onValueChange={v => setSelectedCity(v)}
            >
              <Picker.Item label="Tüm Şehirler" value="all" />
              {cities.map(c => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Sıralama</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={sortBy} onValueChange={v => setSortBy(v)}>
              <Picker.Item label="Tarihe Göre" value="date" />
              <Picker.Item label="Miktara Göre" value="amount" />
              <Picker.Item label="İsme Göre" value="name" />
            </Picker>
          </View>

          {hasFilters && (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => {
                setSearchTerm('');
                setSelectedCity('all');
                setSortBy('date');
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
  container: { marginTop: 8 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconLeft: { marginRight: 4 },
  input: { flex: 1, paddingVertical: 8, fontSize: 14 },
  filterButton: {
    padding: 6,
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4f46e5',
  },
  resultCount: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 6,
  },
  emptyBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: { fontSize: 32, marginBottom: 8 },
  emptyText: { color: '#4b5563', fontSize: 14, fontWeight: '600' },
  emptySub: { color: '#6b7280', fontSize: 12 },
  cityGroup: { marginBottom: 20 },
  cityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  cityName: { color: '#312e81', fontSize: 16, fontWeight: '600' },
  cityCount: { color: '#6b7280', fontSize: 13 },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  label: { color: '#374151', marginTop: 10, fontSize: 13 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginTop: 4,
  },
  clearBtn: {
    marginTop: 16,
    backgroundColor: '#e0e7ff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearText: { color: '#4338ca', fontWeight: '600' },
  closeBtn: {
    marginTop: 16,
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeText: { color: '#fff', fontWeight: '700' },
});

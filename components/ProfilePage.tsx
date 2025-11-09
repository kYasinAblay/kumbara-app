// app/profile/ProfilePage.tsx
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



export default function ProfilePage({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    phone: user.phone.toString(),
    zone: user.zone,
    address: user.address,
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onUpdateUser({
      name: formData.name,
      surname: formData.surname,
      phone: parseInt(formData.phone),
      zone: formData.zone,
      address: formData.address,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      surname: user.surname,
      phone: user.phone.toString(),
      zone: user.zone,
      address: user.address,
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getInitials = () => {
    return `${user.name[0]}${user.surname[0]}`.toUpperCase();
  };

  const activeMoneyboxes = user.moneyboxes.filter((box) => !box.is_deleted);
  const totalSavings = activeMoneyboxes.reduce((sum, box) => sum + box.amount, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Profil</Text>
      <Text style={styles.headerSubtitle}>
        Kişisel bilgilerinizi görüntüleyin ve düzenleyin
      </Text>

      {/* PROFIL KARTI */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameText}>
              {user.name} {user.surname}
            </Text>
            <Text style={styles.memberText}>
              <Ionicons name="calendar-outline" size={14} /> Üyelik:{' '}
              {formatDate(user.date)}
            </Text>
          </View>

          {!isEditing && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
              <Text style={styles.editButtonText}>Düzenle</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* EDIT MODE */}
        {isEditing ? (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ad</Text>
              <TextInput
                value={formData.name}
                onChangeText={(v) => handleChange('name', v)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Soyad</Text>
              <TextInput
                value={formData.surname}
                onChangeText={(v) => handleChange('surname', v)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefon</Text>
              <TextInput
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(v) => handleChange('phone', v)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bölge</Text>
              <TextInput
                value={formData.zone}
                onChangeText={(v) => handleChange('zone', v)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adres</Text>
              <TextInput
                value={formData.address}
                onChangeText={(v) => handleChange('address', v)}
                style={[styles.input, { height: 80 }]}
                multiline
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Ionicons name="save-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Ionicons name="close-outline" size={18} color="#4b0082" />
                <Text style={[styles.buttonText, { color: '#4b0082' }]}>
                  İptal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Ionicons name="person-outline" size={20} color="#4b0082" />
              <Text style={styles.infoText}>
                {user.name} {user.surname}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#4b0082" />
              <Text style={styles.infoText}>{user.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="map-outline" size={20} color="#4b0082" />
              <Text style={styles.infoText}>{user.zone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="home-outline" size={20} color="#4b0082" />
              <Text style={styles.infoText}>{user.address}</Text>
            </View>
          </View>
        )}
      </View>

      {/* KUMBARALAR */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Kumbaralarım</Text>
        {activeMoneyboxes.length === 0 ? (
          <Text style={styles.emptyText}>Henüz kumbara yok</Text>
        ) : (
          activeMoneyboxes.map((box) => (
            <View key={box.id} style={styles.moneyboxItem}>
              <Text style={styles.boxName}>{box.name}</Text>
              <Text style={styles.boxAmount}>₺{box.amount.toFixed(2)}</Text>
            </View>
          ))
        )}
      </View>

      {/* TOPLAM BIRIKIM */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Toplam Birikim</Text>
        <Text style={styles.summaryAmount}>₺{totalSavings.toFixed(2)}</Text>
        <Text style={styles.summarySub}>
          {activeMoneyboxes.length} kumbara
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#312e81',
  },
  headerSubtitle: {
    color: '#6366f1',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#312e81', fontWeight: 'bold', fontSize: 18 },
  nameText: { fontSize: 18, color: '#111827', fontWeight: '600' },
  memberText: { color: '#6366f1', fontSize: 12 },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: { color: '#fff', marginLeft: 4 },
  form: { marginTop: 12 },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 14, color: '#4b5563', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#c7d2fe',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 10,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600', marginLeft: 4 },
  infoSection: { marginTop: 8 },
  infoItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  infoText: { marginLeft: 10, fontSize: 15, color: '#111827' },
  sectionTitle: { fontSize: 18, color: '#312e81', fontWeight: '600' },
  emptyText: { textAlign: 'center', color: '#9ca3af', paddingVertical: 10 },
  moneyboxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  boxName: { color: '#111827' },
  boxAmount: { color: '#4f46e5', fontWeight: '600' },
  summaryCard: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  summaryTitle: { color: '#fff', fontSize: 16 },
  summaryAmount: { color: '#fff', fontSize: 28, fontWeight: '700' },
  summarySub: { color: '#e0e7ff', fontSize: 12 },
});

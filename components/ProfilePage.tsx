// app/profile/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { User } from '@/src/models/User';
import { Card,CardHeader,CardTitle,CardContent } from './ui/Card';
import Sleep from '@/src/utils/Sleep';
import CityDistrictSelect from './CityDistrictSelect';
import { getCityNameById } from '@/hooks/getCityNameById';
import { useLoading } from '@/context/LoadingContext';
import UserRepository from '@/src/repositories/UserRepository';
import { SafeAreaView,useSafeAreaInsets } from 'react-native-safe-area-context';
import DateUtils from '@/src/utils/DateUtils';
import { MoneyBox } from '@/src/models/MoneyBox';
import AuthRepository from '@/src/repositories/AuthRepository';


interface ProfilePageProps {
  moneyBoxes: MoneyBox[];
  user: User | null;
  onUpdateUser: (data: Omit<User,"created_at"| "is_deleted" | "role" | "moneyboxes">) => void;
  onLogout?: () => void;
}

export default function ProfilePage({ user,moneyBoxes, onUpdateUser, onLogout }: ProfilePageProps) {
   const insets = useSafeAreaInsets();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    id: user?.id,
    name: user?.name,
    surname: user?.surname,
    phone: user?.phone,
    city:user?.city,
    district:user?.district,
    picture:user?.picture,
    zone: user?.zone,
    address: user?.address
  });

  const { loading,showLoading,hideLoading } = useLoading();

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  
  const handleSubmit = () => {

    onUpdateUser({
      id: formData.id,
      name: formData.name,
      surname: formData.surname,
      phone:formData.phone,
      city:formData.city,
      district:formData.district,
      picture:formData.picture,
      zone: formData.zone,
      address: formData.address
    });

    UserRepository.update({ ...formData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      id: formData.id,
       name: formData.name,
      surname: formData.surname,
      phone: formData.phone,
      city:formData.city,
      district:formData.district,
      picture:formData.picture,
      zone: formData.zone,
      address: formData.address
    });
    setIsEditing(false);
  };

 const handleLogout = async () => {

   showLoading();
   await onLogout?.();
   await Sleep(1000).then(hideLoading);
  };



  const getInitials = () => {
    return `${user?.name[0]}${user?.surname[0]}`.toUpperCase();
  };

  const activeMoneyboxes = moneyBoxes?.filter((box) => !box.is_deleted);
  const totalSavings = activeMoneyboxes.reduce((sum, box) => sum + box.amount, 0);

  useEffect(() => {
  if (!user) return;

  setFormData({
    id:user?.id,
    name: user?.name,
    surname: user?.surname,
    phone: user?.phone,
    city: user?.city,
    district: user?.district,
    picture: user?.picture,
    zone: user?.zone,
    address: user?.address
  });
}, [user]);

  return (
  <SafeAreaView edges={["top"]} style={[styles.safeArea,{paddingTop: insets.top * -0.25}]}>
    <ScrollView style={styles.container}>
       {/* HEADER */}
      
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Profil</Text>
            <Text style={styles.headerSubtitle}>Kişisel bilgilerinizi düzenleyin</Text>
          </View>

          {onLogout && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => setIsLogoutModalVisible(true)}
            >
              <Feather name="log-out" size={18} color="#FA8072" />
              <Text style={styles.logoutText}>Çıkış</Text>
            </TouchableOpacity>
          )}
        </View>
      {/* PROFIL KARTI */}
      <View style={[styles.card]}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameText}>
              {user?.name} {user?.surname}
            </Text>
            <Text style={styles.memberText}>
              <Ionicons name="calendar-outline" size={14} /> Üyelik:{' '}
              {DateUtils.formatDate(user?.created_at!.toString())}
            </Text>
          </View>

          {!isEditing && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {setIsEditing(true); AuthRepository.logout();}}
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
                value={formData.phone.toString()}
                onChangeText={(v) => handleChange('phone', v)}
                style={styles.input}
              />
            </View>
            

            <CityDistrictSelect formData={formData} handleChange={handleChange} />
   
            {/* <View style={styles.cityZoneInput}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bölge</Text>
                <TextInput
                  value={formData.zone}
                  onChangeText={(v) => handleChange('zone', v)}
                  style={styles.rowInput}
                />
              </View>
                <View style={styles.inputGroup}>
                <Text style={styles.label}>Şehir</Text>
                <TextInput
                  value={formData.city}
                  onChangeText={(v) => handleChange('city', v)}
                  style={styles.rowInput}
                />
              </View>
            </View> */}

              <View style={styles.inputGroup}>
              <Text style={styles.label}>Bölge</Text>
              <TextInput
                value={formData.zone}
                onChangeText={(v) => handleChange('zone', v)}
                style={[styles.input]}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adres</Text>
              <TextInput
                value={formData.address}
                onChangeText={(v) => handleChange('address', v)}
                style={[styles.input,styles.textarea, { height: 80, }]}
                multiline
                numberOfLines={4}
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
                {user?.name} {user?.surname}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#4b0082" />
              <Text style={styles.infoText}>{user?.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="map-outline" size={20} color="#4b0082" />
              <Text style={styles.infoText}>{getCityNameById(user?.city)}/{user?.zone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="home-outline" size={20} color="#4b0082" />
              <Text style={styles.infoText}>{user?.address}</Text>
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

<Card>
  <CardHeader>
    <CardTitle style={{ color: "#1e1b4b", fontSize: 14 }}>İstatistikler</CardTitle>
  </CardHeader>

  <CardContent>

    {/* Aktif Kumbara */}
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>Aktif Kumbara</Text>
      <View style={[styles.badge, { backgroundColor: "#016840" }]}>
        <Text style={styles.badgeText}>{activeMoneyboxes.length}</Text>
      </View>
    </View>

    {/* Toplam Kumbara */}
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>Toplam Kumbara</Text>
      <View style={[styles.badge, { backgroundColor: "#6b7280" }]}>
        <Text style={styles.badgeText}>{moneyBoxes.length}</Text>
      </View>
    </View>

    {/* Ortalama Miktar */}
    <View style={[styles.statRow, { borderBottomWidth: 0 }]}>
      <Text style={styles.statLabel}>Ortalama Miktar</Text>
      <Text style={styles.statValue}>
        ₺{activeMoneyboxes.length > 0
          ? (totalSavings / activeMoneyboxes.length).toFixed(2)
          : "0.00"}
      </Text>
    </View>

  </CardContent>
</Card>

    
  <Card style={{marginTop:20,marginBottom:30}}>
  <CardHeader>
    <CardTitle style={{ color: "#1e1b4b", fontSize: 14 }}>Hesap Bilgileri</CardTitle>
  </CardHeader>

  <CardContent>

    {/* user? ID */}
    <View style={{ marginBottom: 10}}>
      <Text style={styles.infoLabel}>Kullanıcı ID</Text>
      <Text style={styles.infoValueID}>{user?.id}</Text>
    </View>

    {/* DATE */}
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.infoLabel}>Kayıt Tarihi</Text>
      <Text style={styles.infoValue}>{DateUtils.formatDate(user?.created_at!)}</Text>
    </View>

    {/* STATUS */}
    <View>
      <Text style={styles.infoLabel}>Durum</Text>
      <View style={[styles.badge, { backgroundColor: "#22c55e", alignSelf: "flex-start" }]}>
        <Text style={[styles.badgeText, { color: "#fff" }]}>Aktif</Text>
      </View>
    </View>

  </CardContent>
</Card>


     {/* LOGOUT MODAL */}
      <Modal visible={isLogoutModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Çıkış Yap</Text>
            <Text style={styles.modalDesc}>
              Hesabınızdan çıkmak istediğinize emin misiniz?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setIsLogoutModalVisible(false)}
              >
                <Text>İptal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={loading}
                style={[styles.modalConfirm]}
                onPress={handleLogout}
              >
               {loading ? <ActivityIndicator color="#fff" style={{width:50}}/> : 
                <Text style={{ color: "#fff" }}>Evet, Çıkış Yap</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
    padding: 16
  },
   header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#312e81',
  },
  headerSubtitle: {
    color: '#6366f1'
  },
   logoutButton: {
    flexDirection: "row",
    padding: 8,
    marginTop:10,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    alignItems: "center",
    height:40
  },
  logoutText: { color: "#FA8072", marginLeft: 6 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 26,
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
    backgroundColor: '#016840',
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
  textarea:{
    height:80,
    textAlignVertical: 'top',
  },
   rowInput: {
    borderWidth: 1,
    borderColor: '#c7d2fe',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    width:175,
    maxWidth:"100%"
  },
  cityZoneInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
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
    backgroundColor: '#016840',
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
  boxAmount: { color: '#016840', fontWeight: '600' },
  summaryCard: {
    backgroundColor: '#016840',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20
  },
  summaryTitle: { color: '#fff', fontSize: 16 },
  summaryAmount: { color: '#fff', fontSize: 28, fontWeight: '700' },
  summarySub: { color: '#e0e7ff', fontSize: 12 },
    modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center", alignItems: "center"
  },
 statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  statLabel: {
    color: "#52525b",
    fontSize: 14,
  },
  statValue: {
    color: "#312e81",
    fontWeight: "600",
    fontSize: 14,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },

  infoLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    color: "#1e1b4b",
  },
  infoValueID: {
    fontSize: 12,
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderRadius: 6,
    color: "#1e1b4b",
    fontFamily: "monospace",
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 14
  },

  modalTitle: { fontWeight: "700", fontSize: 18, marginBottom: 10 },
  modalDesc: { fontSize: 14, color: "#444" },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    gap: 10
  },

  modalCancel: {
    padding: 10
  },

  modalConfirm: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 6
  }
});

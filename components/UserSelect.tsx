import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import UserRepository from "@/src/repositories/UserRepository";
import { User, Credentials } from "../src/models/User";
import { getCityNameById } from "@/hooks/getCityNameById";
import { Plus, Trash, UserPlus } from "lucide-react-native";
import AddUserModal from "./AddUserModal";
import { useLoading } from "@/context/LoadingContext";
import ShowUserInformationModal from "./UserEditModal";
import UserEditModal from "./UserEditModal";
import { UserWithPassword } from "@/src/data/users";
import Sleep from "@/src/utils/Sleep";

interface Props {
  userId: string;
  handleChange: (field: string, value: string) => void;
}

export default function UserSelect({ userId, handleChange }: Props) {
  console.log("UserSelect rendered");
  const [userModal, setUserModal] = useState(false);
  const [userList, setUserList] = useState<UserWithPassword[]>();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserWithPassword | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const getUsers = async () => {
    const response = await UserRepository.fetchAll();
    return response.users!;
  };

  const findUser = (userId: string) => {
    var user = userList?.find((c) => c.id === userId);
    if (!user) return "Kullanıcı Seçiniz";

    return `${user.name} ${user.surname}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      setUserList(users);
    };

    fetchData();
  }, []);

  const handleDeleteUser = useCallback(async (userId: string) => {
    Alert.alert(
      "Kullanıcıyı Sil",
      "Bu kullanıcıyı silmek istediğine emin misin?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Evet, Sil",
          style: "destructive",
          onPress: async () => {
            try {
              debugger;
              await UserRepository.remove(userId);
              setUserList((prev) => prev?.filter((u) => u.id !== userId));
            } catch (error) {
              console.error("Kullanıcı silinemedi:", error);
            }
          },
        },
      ]
    );
  }, []);

  const handleAddUser = useCallback(async (user: User) => {
    console.log("user to add: userselect.tsx");

    var response = await UserRepository.add(user);
    var insertedUser = response.user;

    handleChange("id", insertedUser.id!);
    handleChange("city", getCityNameById(user.city)!);

    insertedUser.phone = insertedUser.password!;
    insertedUser.username = insertedUser.username;

    setUserList((prev) => [...(prev || []), insertedUser]);

    debugger;
    setIsAddUserModalOpen(false);
    console.log("user to add: userselect.tsx => finish");
  }, []);

  const handleUpdateUser = useCallback(
    async (userId: string, credentials: Credentials) => {
   
      var response = await UserRepository.updatePassword(userId, credentials);
      if (!response.success) {
        alert("Kullanıcı güncellenemedi");
        return;
      }
      setModalVisible(false);
    },
    []
  );

  const openModal = (user: UserWithPassword) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  return (
    <View>
      {/* Şehir */}
      <TouchableOpacity onPress={() => setUserModal(true)} style={styles.input}>
        <Text style={{ color: userId ? "#000" : "#888" }}>
          {findUser(userId)}
        </Text>
      </TouchableOpacity>

      {/* Şehir Modal */}
      <Modal visible={userModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Kullanıcı Seç</Text>
          <TouchableOpacity
            onPress={() => setIsAddUserModalOpen(true)}
            style={styles.addUserRow}
          >
            <View style={styles.addUserAvatar}>
              <UserPlus size={24} color="#047857" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.addUserText}>Yeni Kullanıcı Ekle</Text>
              <Text style={styles.addUserSub}>Sisteme yeni kullanıcı ekle</Text>
            </View>

            <Plus size={20} color="#047857" />
          </TouchableOpacity>
          <FlatList
            data={userList}
            keyExtractor={(item) => item.id!}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.modalItem, styles.userRow]}
                onLongPress={() => openModal(item)}
                onPress={() => {
                  handleChange("userId", item.id!);
                  handleChange("city", getCityNameById(item.city)!);
                  setUserModal(false);
                }}
              >
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>
                    {item.name.charAt(0)}
                    {item.surname.charAt(0)}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>
                    {item.name} {item.surname}
                  </Text>
                  {item.phone ? (
                    <Text style={styles.userEmail}>{item.phone}</Text>
                  ) : null}
                  {item.username ? (
                    <Text style={styles.userEmail}>{item.username}</Text>
                  ) : null}
                </View>
                {/* Silme Butonu */}
                <TouchableOpacity
                  hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                  onPress={() => handleDeleteUser(item.id!)}
                >
                  <Trash size={20} color="#dc2626" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
          <UserEditModal
            visible={modalVisible}
            user={selectedUser}
            onClose={() => setModalVisible(false)}
            onSubmit={handleUpdateUser}
          />
          <TouchableOpacity
            onPress={() => setUserModal(false)}
            style={styles.modalClose}
          >
            <Text>Kapat</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Add User Modal */}
      <AddUserModal
        visible={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 15,
  },
  field: {
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#d1d5db",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  label: { fontSize: 14, color: "#4b5563", marginBottom: 4 },
  rowInput: {
    borderWidth: 1,
    borderColor: "#c7d2fe",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    width: 175,
    maxWidth: "100%",
  },
  cityZoneInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalClose: {
    padding: 15,
    backgroundColor: "#ddd",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 8,
  },
  TxName: {
    fontSize: 15,
    fontWeight: 400,
  },
  addUserAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#d1fae5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  addUserText: {
    color: "#047857",
    fontSize: 16,
    fontWeight: "600",
  },
  addUserSub: {
    color: "#666",
    fontSize: 13,
  },
  addUserRow: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  userRow: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 16,
    color: "#444",
    fontWeight: "bold",
  },
  userName: {
    color: "#111",
    fontSize: 16,
    fontWeight: "500",
  },
  userEmail: {
    color: "#666",
    fontSize: 13,
  },
});

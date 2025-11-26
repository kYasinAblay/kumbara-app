import React, { useEffect, useState } from "react";
import { View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
  ViewStyle,
  StyleProp, } from "react-native";

import cities from "../src/data/cities.json";
import districts from "../src/data/districts.json";
import UserRepository from "@/src/repositories/UserRepository";
import {User} from "../src/models/User";
import { getCityNameById } from "@/hooks/getCityNameById";

interface Props {
  userId:string,
  handleChange: (field: string, value: string) => void;
}

export default  function UserSelect({ userId, handleChange }: Props) {
  const [userModal, setUserModal] = useState(false);
  const [districtModal, setDistrictModal] = useState(false);
  const [userList, setUserList] = useState<User[]>();
  
  const getUsers = async () => {
    debugger;
  const response = await UserRepository.fetchAll();
  console.log("getusers",response.users!);
  return response.users!;
};

const findUser = async (userId:string)=>{
  var user = userList?.find((c) => c.id === userId);
  if(!user) return "";

  return `${user.name} ${user.surname}`;
}

  useEffect(() => {

    const fetchData = async () => {
      const users = await getUsers();
      setUserList(users);
    };

    fetchData();
  }, []);

  //return loading eklenecek 

  return (
    <View>
          {/* Şehir */}
        <TouchableOpacity
          onPress={() => setUserModal(true)}
          style={styles.input}>
          <Text style={{ color: userId? "#000" : "#888" }}>
            {userId
              ? findUser(userId)
              : "Kullanıcı seçiniz"}
          </Text>
        </TouchableOpacity>
    


      {/* Şehir Modal */}
      <Modal visible={userModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Kullanıcı Seç</Text>
          <FlatList
            data={userList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  handleChange("userId", item.id);
                  handleChange("city", getCityNameById(item.city)!);
                  setUserModal(false);
                }}
              >
                <Text style={styles.TxName}>{item.name} {item.surname}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={() => setUserModal(false)}
            style={styles.modalClose}
          >
            <Text>Kapat</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#d1d5db',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
 label: { fontSize: 14, color: '#4b5563', marginBottom: 4 },
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
  modalContainer: {
    flex: 1,
    padding: 20,
    marginTop: 40,
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
  TxName:{
    fontSize: 15,
    fontWeight:400
  }
});
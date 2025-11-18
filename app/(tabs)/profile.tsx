import React, { useState } from "react";

import { User } from "../../src/models/User";
import ProfilePage from "@/components/ProfilePage";
import { useRouter } from "expo-router";
import AuthRepository from "@/src/repositories/AuthRepository";
import {useLoading} from "../../hooks/useLoading";
import Sleep from "@/src/utils/Sleep";

export default function ProfileScreen() {
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Kamil Yasin",
    username: "kyasinablay",
    surname: "Ablay",
    phone: 5555555555,
    zone: "Esenler",
    city: "İstanbul",
    address: "Kadıköy",
    date: "2024-01-01",
    is_deleted: false,
    picture: "",
    role: "user",
    moneyboxes: [
      {
        id: "1",
        name: "Tatil",
        city: "İzmir",
        zone: "Bornova",
        amount: 1200,
        is_deleted: false,
        description: "",
        date: Date.now().toString(),
      },
      {
        id: "2",
        name: "Araba",
        city: "İstanbul",
        zone: "Ataşehir",
        amount: 3000,
        is_deleted: false,
        description: "",
        date: Date.now().toString(),
      },
    ],
  });

  const router = useRouter();


  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const handleLogout = async () => {
  
    AuthRepository.logout();
    await Sleep(1500).then(()=>{
    router.push("/login");
    }).finally(()=>setUser({
        id: "",
        name: "",
        username: "",
        surname: "",
        phone: 0,
        city: "",
        zone: "",
        address: "",
        date: "",
        role: "",
        picture: "",
        is_deleted: false,
        moneyboxes: [],
      }));      
  };

  return (
    <ProfilePage
      user={user}
      onUpdateUser={updateUser}
      onLogout={handleLogout}
    />
  );
}

import { useEffect, useState } from "react";
import UserService from "../src/api/UserService";
import { User } from "../src/models/User";
import Sleep from "@/src/utils/Sleep";
import { useUserStore } from "@/src/store/useUserStore";
import { useMoneyBoxStore } from "@/src/store/moneyBoxStore";

export default function useUser() {
    const { user, setUser, updateUser: updateUserStore } = useUserStore.getState();
    const { setMoneyBoxes } = useMoneyBoxStore.getState();

    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            await UserService.getMe().then((data) => {
                setMoneyBoxes(data.user.moneyboxes);

                data.user.moneyboxes = [];
                setUser(data.user);
            });
        } catch (error) {
            console.log("User fetch error:", error);
        } finally {
            Sleep(1000).then(() => setLoading(false));
        }
    };

    const updateUser = (data: Omit<User, "created_at" | "is_deleted" | "role" |"moneyboxes">) => {
        updateUserStore(data);
    };

    
  const IsAdmin =(role:string) =>{
       return {
        IsAdmin :role?.toLowerCase() === "admin"
    };
    }


    useEffect(() => {
        fetchUser();
    }, []);

    return { user, loading,IsAdmin ,updateUser };
}

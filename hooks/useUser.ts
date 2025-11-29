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
                const sanitized = { ...data.user, moneyboxes: [] };
                setUser(sanitized);
            });
        } catch (error) {
            console.log("User fetch error:", error);
        } finally {
            await Sleep(500).then(() => setLoading(false));
        }
    };

    const updateUser = (data: Omit<User, "created_at" | "is_deleted" | "role" |"moneyboxes">) => {
        updateUserStore(data);
    };

    

    useEffect(() => {
        fetchUser();
    }, []);

    return { user, loading ,updateUser };
}

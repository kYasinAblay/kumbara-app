import { useEffect, useState } from "react";
import UserService from "../src/api/UserService";
import { User } from "../src/models/User";

export default function useUser() {
    const [user, setUser] = useState<User>({
        id: "",
        username: "",
        name: "",
        surname: "",
        phone: "",
        zone: "",
        city: 0,
        district: "",
        address: "",
        picture: "",
        moneyboxes: [],
        role: "",
        is_deleted: false,
        date: ""
    });
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const data = await UserService.getMe();
            setUser(data.user);
        } catch (error) {
            console.log("User fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = (data: Omit<User, "id" | "date" | "is_deleted" | "moneyboxes" | "role">) => {
        setUser((prev) => ({ ...prev, ...data }));
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return { user, loading, updateUser };
}

import { useAuth } from "@/context/AuthContext"

export default function IsAdmin(){
    const {role} = useAuth();
    return {
        IsAdmin :role?.toLowerCase() === "admin"
    };
}


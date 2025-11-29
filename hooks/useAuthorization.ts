import { useUserStore } from "@/src/store/useUserStore";
import {RoleMap} from "@/src/models/Roles";

export default function useAuthorization() {
  const user = useUserStore((s) => s.user);

  const isAdmin = user?.role?.toLowerCase() === RoleMap.ADMIN;
  const isUser = user?.role?.toLowerCase() === RoleMap.USER;

  return { isAdmin, isUser, role: user?.role };
}

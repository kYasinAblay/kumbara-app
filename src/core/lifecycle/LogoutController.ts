import { router } from "expo-router";
import SessionCookieStore from "@/src/session/SessionCookieStore";
import AuthRepository from "@/src/repositories/AuthRepository";
import { useUserStore } from "@/src/store/useUserStore";

export async function logoutNow() {

  try {
    var response = await AuthRepository.logout();
    if (response?.success) {
    SessionCookieStore.clear?.();
    useUserStore.getState().clearUser();

    console.log("%cFORCED LOGOUT → /login", "color:red");
    router.replace("/login");
  }else{
    console.log("Logout failed:", response);
  }
  } catch (error) {
    console.log("Logout error", error);
  }
}

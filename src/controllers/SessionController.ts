import SessionCookieStore from "@/src/session/SessionCookieStore";
import AuthRepository from "@/src/repositories/AuthRepository";
import { useUserStore } from "@/src/store/useUserStore";
import DateUtils from "../utils/DateUtils";


export async function performSessionCheck() {
    console.log("Controller > performSessionCheck çalışıyor", DateUtils.formatDateTime(new Date().toISOString()));
  
  const cookie = SessionCookieStore.get();
  if (!cookie) return { ok: false };

  const check = await AuthRepository.check();
  if (!check?.success) return { ok: false };

  return { ok: true };
}

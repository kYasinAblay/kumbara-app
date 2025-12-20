// src/session/SessionWatcher.tsx
import React, { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { performSessionCheck } from "../controllers/SessionController";

const SESSION_CHECK_MIN_INTERVAL_MS = 60_000; // 60 saniyede birden sık check etme

export function SessionWatcher() {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const lastCheckAt = useRef<number>(0);
console.log("session watcher çalıştı.");

  useEffect(() => {
    const handleChange = async (nextState: AppStateStatus) => {
      const prevState = appState.current;
      appState.current = nextState;

      // sadece background/inactive → active geçişinde kontrol edelim
      const goingToForeground =
        (prevState === "background" || prevState === "inactive") &&
        nextState === "active";

      if (!goingToForeground) return;

      const now = Date.now();
      if (now - lastCheckAt.current < SESSION_CHECK_MIN_INTERVAL_MS) {
        // çok sık çağrılmasın, throttling
        return;
      }

      lastCheckAt.current = now;

      // burada checkSession çağrıyoruz
      const ok = await performSessionCheck();

      // ok === false ise AuthContext içinde zaten user temizlenmiş olacak.
      // AuthGuard da bunu görüp login ekranına yönlendirecek.
    };

    const sub = AppState.addEventListener("change", handleChange);

    return () => {
      sub.remove();
    };
  }, [performSessionCheck]);

  // Ekranda bir şey çizmesine gerek yok
  return null;
}

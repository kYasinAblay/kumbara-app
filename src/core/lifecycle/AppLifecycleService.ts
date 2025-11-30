import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutNow } from "./LogoutController";

class AppLifecycleServiceClass {
  private initialized = false;
  private maxBackgroundTime = 1 * 60 * 1000; // 1dk (arka planda kalma süresi limiti) 
  private appStateSubscription?: { remove: () => void };

  start() {
    if (this.initialized) return;
    this.initialized = true;

    this.appStateSubscription = AppState.addEventListener(
      "change",
      this.handleStateChange
    );

    console.log("%cAppLifecycleService started", "color: purple");
  }

  stop() {
    this.appStateSubscription?.remove();
    console.log("%cAppLifecycleService stopped", "color: gray");
  }

  private handleStateChange = async (state: AppStateStatus) => {
    console.log("handleStateChange:", state);
    if (state === "active") {
      const lastActiveStr = await AsyncStorage.getItem("lastActiveAt");

      if (lastActiveStr) {
        const lastActive = Number(lastActiveStr);
        const now = Date.now();
        const diff = now - lastActive;

        console.log("⏱ App active oldu. Background süresi(ms):", diff);

        if (diff > this.maxBackgroundTime) {
          console.log(
            "%c🔥 Background süresi limit aşıldı → forced logout",
            "color:red"
          );
          await logoutNow();
        }
      }

      // aktif olduğunda zaman güncellenmez
      return;
    }

    if (state === "background" || state === "inactive") {
      const now = Date.now();
      await AsyncStorage.setItem("lastActiveAt", String(now));
      console.log("📥 App background/inactive oldu. Zaman kaydedildi.");
    }
  };
}

export const AppLifecycleService = new AppLifecycleServiceClass();

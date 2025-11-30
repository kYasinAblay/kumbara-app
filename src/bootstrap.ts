import { SyncService } from "./services/SyncService";
import { NetworkService } from "./core/network/NetworkService";
import { AppLifecycleService } from "./core/lifecycle/AppLifecycleService";
/**
 * Global bootstrap initializer
 * Uygulama yaşam döngüsü boyunca sadece 1 kez çalışır.
 * RootLayout tarafından tekrar tetiklenmez.
 */

let initialized = false;

export function bootstrap() {
  if (initialized) {
    console.log("%cBootstrap already initialized – skipping", "color: gray");
    return;
  }

  initialized = true;

  console.log("%cBootstrap initializing...", "color: blue; font-weight: bold");

  // Servisleri başlat
  NetworkService.start();
  SyncService.init();
  AppLifecycleService.start();

  console.log("%cBootstrap complete.", "color: green; font-weight: bold");
 
}

bootstrap();
  
import NetInfo from "@react-native-community/netinfo";
import { useNetworkStore } from "./NetworkStore";

class NetworkServiceClass {
  private started = false;
  private unsubscribe?: () => void;

  start() {
    if (this.started) {
      console.log("NetworkService already started – skipping");
      return;
    }

    this.started = true;

    this.unsubscribe = NetInfo.addEventListener((state) => {

        if (state.isInternetReachable === null) return;


      const isConnected = Boolean(
        state.isConnected && state.isInternetReachable
      );

      const { isConnected: prev } = useNetworkStore.getState();

       if (prev !== isConnected) {
      useNetworkStore.getState().setConnected(isConnected);
    }
    });

    console.log("%cNetworkService started", "color: green");
  }

  stop() {
    if (!this.started) return;
    this.unsubscribe?.();
    this.started = false;
    console.log("%cNetworkService stopped", "color: orange");
  }
}

export const NetworkService = new NetworkServiceClass();
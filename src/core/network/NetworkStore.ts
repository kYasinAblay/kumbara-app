// src/core/network/NetworkStore.ts
import { create } from "zustand";

interface NetworkState {
  isConnected: boolean;
  setConnected: (value: boolean) => void;
}
console.log("network state isConnected:");
export const useNetworkStore = create<NetworkState>((set) => ({
  isConnected: true,
  setConnected: (value) => set({ isConnected: value }),
}));

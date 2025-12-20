import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  status: AuthStatus;
  token: string | null;
  hydrate: () => Promise<void>;
  setToken: (token: string | null) => Promise<void>;
  logout: () => Promise<void>;
};

const TOKEN_KEY = "access_token";

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "loading",
  token: null,

  hydrate: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      set({
        token,
        status: token ? "authenticated" : "unauthenticated",
      });
    } catch {
      set({ token: null, status: "unauthenticated" });
    }
  },

  setToken: async (token) => {
    if (token) await SecureStore.setItemAsync(TOKEN_KEY, token);
    else await SecureStore.deleteItemAsync(TOKEN_KEY);

    set({
      token,
      status: token ? "authenticated" : "unauthenticated",
    });
  },

  logout: async () => {
    await get().setToken(null);
  },
}));




//remember me 
// import * as SecureStore from "expo-secure-store";

// const TOKEN_KEY = "auth_token";
// const REMEMBER_KEY = "remember_me";

// export async function setRememberMe(value: boolean) {
//   await SecureStore.setItemAsync(REMEMBER_KEY, value ? "1" : "0");
// }

// export async function getRememberMe() {
//   const v = await SecureStore.getItemAsync(REMEMBER_KEY);
//   return v === "1";
// }

// export async function saveToken(token: string) {
//   await SecureStore.setItemAsync(TOKEN_KEY, token);
// }

// export async function getToken() {
//   return await SecureStore.getItemAsync(TOKEN_KEY);
// }

// export async function clearAuth() {
//   await SecureStore.deleteItemAsync(TOKEN_KEY);
//   await SecureStore.deleteItemAsync(REMEMBER_KEY);
// }

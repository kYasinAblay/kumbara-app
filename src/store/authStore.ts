import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const REMEMBER_KEY = "remember_me";

export async function setRememberMe(value: boolean) {
  await SecureStore.setItemAsync(REMEMBER_KEY, value ? "1" : "0");
}

export async function getRememberMe() {
  const v = await SecureStore.getItemAsync(REMEMBER_KEY);
  return v === "1";
}

export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function clearAuth() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(REMEMBER_KEY);
}

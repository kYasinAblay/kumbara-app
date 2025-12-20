import * as SecureStore from "expo-secure-store";

const KEY_EMAIL = "login_email";
const KEY_REMEMBER = "login_remember";

export async function saveEmail(email: string) {
  await SecureStore.setItemAsync(KEY_EMAIL, email);
}

export async function getEmail() {
  return SecureStore.getItemAsync(KEY_EMAIL);
}

export async function clearEmail() {
  await SecureStore.deleteItemAsync(KEY_EMAIL);
}

export async function setRememberMe(value: boolean) {
  await SecureStore.setItemAsync(KEY_REMEMBER, value ? "1" : "0");
}

export async function getRememberMe() {
  const v = await SecureStore.getItemAsync(KEY_REMEMBER);
  return v === "1";
}

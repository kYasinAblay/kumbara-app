import AsyncStorage from "@react-native-async-storage/async-storage";

const EMAIL_KEY = "login_email";

export async function saveEmail(email: string) {
  await AsyncStorage.setItem(EMAIL_KEY, email);
}

export async function getEmail() {
  return await AsyncStorage.getItem(EMAIL_KEY);
}

export async function clearEmail() {
  await AsyncStorage.removeItem(EMAIL_KEY);
}

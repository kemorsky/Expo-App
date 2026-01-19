import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "language";

export async function getStoredLanguage(): Promise<string | null> {
  if (Platform.OS === "web") {
    return AsyncStorage.getItem(KEY);
  }
  return SecureStore.getItemAsync(KEY);
}

export async function setStoredLanguage(value: string) {
  if (Platform.OS === "web") {
    return AsyncStorage.setItem(KEY, value);
  }
  return SecureStore.setItemAsync(KEY, value);
}

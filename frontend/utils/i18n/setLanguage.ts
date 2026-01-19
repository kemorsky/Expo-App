import { Platform } from "react-native";
import i18n from "i18next";
import * as SecureStorage from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setLanguage(locale: "en-US" | "sv-SV") {
  await i18n.changeLanguage(locale);
  if (Platform.OS === "ios") {
    await SecureStorage.setItemAsync("language", locale);
  } else {
    await AsyncStorage.setItem("language", locale);
  }

  
}

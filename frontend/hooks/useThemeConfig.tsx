import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Theme } from '@react-navigation/native';
import { DarkTheme as _DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Colors } from '@/constants/Colors';
import { Platform } from 'react-native';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
};

type StoredTheme = "light" | "dark";

const ThemeContext = createContext<ThemeContextType>(null as any);

export const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: '',
    background: Colors.dark.wrapperBackground,
    card: Colors.dark.card,
    text: Colors.dark.text,

  },
};

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '',
    background: Colors.light.wrapperBackground,
    card: Colors.light.card,
    text: Colors.light.text,

  },
};

const STORAGE_KEY = "theme";

const storage = { // written this way to allow for different storage method depending on the platform
  get: async (): Promise<StoredTheme | null> => {
    if (Platform.OS === "ios") {
      return (await AsyncStorage.getItem(STORAGE_KEY)) as | StoredTheme | null
    }
    return (await AsyncStorage.getItem(STORAGE_KEY)) as StoredTheme | null;
  },
  set: async (value: StoredTheme): Promise<void> => {
    if (Platform.OS === "ios") {
      await SecureStore.setItemAsync(STORAGE_KEY, value);
      return;
    }
    await AsyncStorage.setItem(STORAGE_KEY, value);
  }
}

export function ThemeConfigProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(DarkTheme);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await storage.get();
        if (saved === "light") setTheme(LightTheme);
        else if (saved === "dark") setTheme(DarkTheme);        

      } catch (error) {
        throw new Error (`Error getting theme: ${error}`)
      }
    }

    loadTheme();
  }, [])

  const setLightTheme = async () => {
    setTheme(LightTheme);
    await storage.set("light");
  };

  const setDarkTheme = async () => {
    setTheme(DarkTheme);
    await storage.set("dark");
  };

  const toggleTheme = async () => {
    const newTheme = theme === DarkTheme ? LightTheme : DarkTheme;
    const stored: StoredTheme = newTheme === LightTheme ? "light" : "dark";
    setTheme(newTheme);
    await storage.set(stored);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setLightTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  return useContext(ThemeContext);
}
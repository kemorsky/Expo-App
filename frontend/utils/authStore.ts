import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useLogin } from "@/lib/api/user/userMutations";
import { Platform } from "react-native";
import type { AuthPayload } from "@/__generated__/graphql";

type AuthState = {
    user: AuthPayload | null,
    setUser: (user: AuthPayload | null) => void,
    isLoggedIn: boolean,
    // logIn: (email: string, password: string) => Promise<void>,
    logOut: () => Promise<void>,
    // hydrate: () => Promise<void>;
    // session: string | null,
    // getToken: () => Promise<string | null>,
    // getRefreshToken: () => Promise<string | null>,
}

const set = async (key: string, value: string) => {
    if (Platform.OS === 'web') {
        return await AsyncStorage.setItem(key, value)
    } else {
        return await SecureStore.setItemAsync(key, value)
    }
}

const get = async (key: string) => {
    if (Platform.OS === 'web') {
        return await AsyncStorage.getItem(key)
    } else {
        return await SecureStore.getItemAsync(key)
    }
}

const del = async (key: string) => {
    if (Platform.OS === 'web') {
        return await AsyncStorage.removeItem(key)
    } else {
        return await SecureStore.deleteItemAsync(key)
    }
}

const storage = {
  getItem: async (name: string) => {
    const value = await get(name);
    if (!value) return null;
    try {
      return JSON.parse(value); // <- deserialize string to object
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: any) => {
    // <- serialize object to string
    await set(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await del(name);
  },
};


export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,
            setUser: (user: AuthPayload | null) => set({ user, isLoggedIn: !user}),
            logOut: async () => {
                await del('accessToken');
                await del('refreshToken');
                set({ user: null, isLoggedIn: false })
            },
            // hydrate: async () => {
            //     const accessToken = await get("accessToken");
            //     const refreshToken = await get("refreshToken");

            //     if (accessToken && refreshToken) {
            //         set({
            //             user: {
            //                 id: '',
            //                 name: '',
            //                 email: '',
            //                 token: accessToken,
            //                 refreshToken: refreshToken
            //             },
            //             isLoggedIn: true
            //         });
            //     }
            // }
        }),
        {
            name: "auth-storage", // AsyncStorage key
            storage
        }
    )
)

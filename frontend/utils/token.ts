import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"

export async function saveToken(accessToken: string) {
    if (Platform.OS === 'web') {
        console.log("token saved")
        return await AsyncStorage.setItem('accessToken', accessToken)
    } else {
        return await SecureStore.setItemAsync('accessToken', accessToken)
    }
};

export async function saveRefreshToken(refreshToken: string) {
    if (Platform.OS === 'web') {
        return await AsyncStorage.setItem('refreshToken', refreshToken)
    } else {
        return await SecureStore.setItemAsync('refreshToken', refreshToken)
    }
};

export async function getToken(): Promise<string | null> {
    if (Platform.OS === 'web') {
        console.log("function ran successfully")
        return await AsyncStorage.getItem('accessToken')
    } else {
        return await SecureStore.getItemAsync('accessToken')
    }
};

export async function getRefreshToken(): Promise<string | null> {
    if (Platform.OS === 'web') {
        console.log("function ran successfully - 2")
        return await AsyncStorage.getItem('refreshToken')
    } else {
        return await SecureStore.getItemAsync('refreshToken')
    }
};

export async function deleteToken() {
    if (Platform.OS === 'web') {
        return await AsyncStorage.removeItem('accessToken')
    } else {
        return await SecureStore.deleteItemAsync('accessToken')
    }
};

export async function deleteRefreshToken() {
    if (Platform.OS === 'web') {
        return await AsyncStorage.removeItem('refreshToken')
    } else {
        return await SecureStore.deleteItemAsync('refreshToken')
    }
};
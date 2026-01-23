import * as SecureStore from "expo-secure-store";

type SecureStoreKey = string;

export async function secureStore(key: SecureStoreKey, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
    })
};

export async function getToken(key: SecureStoreKey): Promise<string | null> {
    return await SecureStore.getItemAsync(key)
}

export async function deleteToken(key: SecureStoreKey): Promise<void> {
    await SecureStore.deleteItemAsync(key)
}
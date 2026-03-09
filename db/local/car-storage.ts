import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorageProvider = {
    async get(key: string) {
        const raw = await AsyncStorage.getItem(key);
        return raw !== null ? JSON.parse(raw) : null;
    },

    async keys(prefix: string): Promise<string[]> {
        const allKeys = await AsyncStorage.getAllKeys();
        return allKeys.filter(key => key.startsWith(prefix));
    },

    async set(key: string, value: any) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    },

    async remove(key: string) {
        await AsyncStorage.removeItem(key);
    },
};
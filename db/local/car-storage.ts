import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    async get(key: string) {
        const raw = await AsyncStorage.getItem(key);
        return raw !== null ? JSON.parse(raw) : null;
    },

    async set(key: string, value: any) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    },

    async remove(key: string) {
        await AsyncStorage.removeItem(key);
    },
};
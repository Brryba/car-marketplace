export const CAR_API_CONFIG = {
    baseURL: 'https://carapi.app/api',
    apiKey: process.env.EXPO_PUBLIC_CAR_API_KEY,
    timeout: 5000,
    cacheTime: 1000 * 3600 * 24, // 24 hours
} as const;
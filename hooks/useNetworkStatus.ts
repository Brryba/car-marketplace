import * as Network from 'expo-network';
import { useEffect, useState } from 'react';

export const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const check = async () => {
            const state = await Network.getNetworkStateAsync();
            setIsConnected(!!state.isConnected);
        };

        check().then(r => setInterval(check, 1000));
    }, []);

    return { isConnected };
};
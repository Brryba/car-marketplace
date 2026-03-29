import axios from 'axios';
import {CAR_API_CONFIG} from "@/api/config/car.config";
import {CarMakeResponse} from "@/types/car-api-types";

const client = axios.create({
    baseURL: CAR_API_CONFIG.baseURL,
    headers: { Authorization: `Bearer ${CAR_API_CONFIG.apiKey}` },
});

export const fetchCarMakes = async (): Promise<string[]> => {
    const { data } = await client.get<CarMakeResponse>('/makes/v2');
    return data.data.map((item: { name: string }) => item.name);
};
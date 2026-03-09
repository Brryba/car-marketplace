import { asyncStorageProvider } from "@/db/local/car-storage";
import { CarEntity, CarFormData } from "@/types/schemas/car-schema";
import uuid from "react-native-uuid";

export const carRepository = {
    async saveCar(car: CarFormData) {
        const id = uuid.v4().toString();
        const createdAt = Date.now().toString();
        const ownerId = "1";

        const carEntity: CarEntity = {
            ...car,
            id,
            createdAt,
            ownerId,
        };

        await asyncStorageProvider.set("car:" + id, carEntity);
    },

    async getCar(id: string): Promise<CarEntity | null> {
        return await asyncStorageProvider.get("car:" + id);
    },

    async getAllCars(): Promise<CarEntity[]> {
        const keys = await asyncStorageProvider.keys("car:");
        const cars = await Promise.all(keys.map(key => asyncStorageProvider.get(key)));
        return cars.filter(Boolean)
    },

    async editCar(id: string, car: CarEntity) {
        await asyncStorageProvider.set("car:" + id, car);
    },

    async deleteCar(id: string) {
        await asyncStorageProvider.remove("car:" + id);
    }
};
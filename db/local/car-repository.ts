import {CarEntity, CarFormData} from "@/types/schemas/car-schema";
import uuid from "react-native-uuid";
import {storage} from "@/db/local/car-storage";

export const carRepository = {
    async saveCar(car: CarFormData) {
        const id = uuid.v4();
        const createdAt = Date.now().toString();
        const ownerId = "1";

        const carEntity: CarEntity = {
            ...car,
            id,
            createdAt,
            ownerId,
        };

        await storage.set("car:" + id, JSON.stringify(carEntity));
    },

    async editCar(id: string, car: CarEntity) {
        await storage.set("car:" + id, JSON.stringify(car));
    },

    async deleteCar(id: string) {
        await storage.remove("car:" + id);
    }
};
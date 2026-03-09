import {CarEntity, CarFormData} from "@/types/schemas/car-schema";
import {carRepository} from "@/db/local/car-repository";

export function useCarStorage() {
    const saveCar = async (car: CarFormData) => {
        await carRepository.saveCar(car)
    }

    const editCar = async (uuid: string, car: CarEntity) => {
        await carRepository.editCar(uuid, car)
    }

    const deleteCar = async (uuid: string) => {
        await carRepository.deleteCar(uuid)
    }

    return { saveCar, editCar, deleteCar };
}
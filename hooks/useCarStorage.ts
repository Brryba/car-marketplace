import {CarEntity, CarFormData} from "@/types/schemas/car-schema";
import {carLocalRepository} from "@/db/local/car-local-repository";
import {ICarRepository} from "@/db/car-repository.interface";
import {CarFilters} from "@/types/car-filters";

export function useCarStorage(repository: ICarRepository = carLocalRepository) {
    const saveCar = async (car: CarFormData) => {
        await repository.saveCar(car)
    }

    const editCar = async (uuid: string, car: CarEntity) => {
        await repository.editCar(uuid, car)
    }

    const deleteCar = async (uuid: string) => {
        await repository.deleteCar(uuid)
    }

    const getCar = async (uuid: string) => {
        return await repository.getCar(uuid);
    }

    const getAllCars = async (filters?: CarFilters) => {
        return await repository.getAllCars(filters);
    }

    return { saveCar, editCar, deleteCar, getCar, getAllCars };
}
import {CarEntity, CarFormData} from "@/types/schemas/car-schema";
import {CarFilters} from "@/types/car-filters";

export interface ICarRepository {
    saveCar(car: CarFormData): Promise<void>
    editCar(uuid: string, car: CarEntity): Promise<void>
    deleteCar(uuid: string): Promise<void>
    getCar(uuid: string): Promise<CarEntity | null>
    getAllCars(filters?: CarFilters): Promise<CarEntity[]>
}
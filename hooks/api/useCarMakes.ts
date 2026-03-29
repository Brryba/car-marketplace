import {useQuery} from "@tanstack/react-query";
import {CAR_API_CONFIG} from "@/api/config/car.config";
import {fetchCarMakes} from "@/api/cars.api";

export const useCarMakes = () => {
    return useQuery({
        queryKey: ['makes'],
        staleTime: CAR_API_CONFIG.cacheTime,
        queryFn: fetchCarMakes,
    });
};
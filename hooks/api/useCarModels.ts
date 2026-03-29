import {useQuery} from "@tanstack/react-query";
import {CAR_API_CONFIG} from "@/api/config/car.config";
import {fetchCarModelsByMake} from "@/api/cars.api";

export const useCarModels = (make: string) => {
    return useQuery({
        queryKey: [`${make}.models`],
        staleTime: CAR_API_CONFIG.cacheTime,
        queryFn: () => fetchCarModelsByMake(make),
        enabled: make !== '',
    });
};
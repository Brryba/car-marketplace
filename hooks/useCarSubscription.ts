import {useEffect, useState} from "react";
import {CarEntity} from "@/types/schemas/car-schema";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {carFireBaseSubscriptionService} from "@/services/carFireBaseSubscriptionService";

export function useCarSubscription() {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ cars, setCars ] = useState<CarEntity[]>([]);
    const filters = useSelector((state: RootState) => state.carFilters);

    useEffect(() => {
        setLoading(true);

        return carFireBaseSubscriptionService.subscribeToCars(
            (data) => {
                setCars(data);
                setLoading(false);
            },
            filters
        );
    }, [ filters]);

    return { cars, loading };
}
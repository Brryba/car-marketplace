import {CarEntity} from "@/types/schemas/car-schema";
import {collection, onSnapshot, orderBy, query, Query, where} from "firebase/firestore";
import Fuse from "fuse.js";
import {db} from "@/db/firebase/fireBaseConfig";
import {CarFilters} from "@/types/car-filters";

const COLLECTION = 'cars';

export const carFireBaseSubscriptionService = {
    subscribeToCars(
        onData: (cars: CarEntity[]) => void,
        filters: CarFilters,
    ): () => void {
        let q: Query = collection(db, COLLECTION);
        if (filters?.make) {
            q = query(q, where('make', '==', filters.make));
            if (filters.model) {
                q = query(q, where('model', '==', filters.model));
            }
        }
        if (filters?.yearFrom) {
            q = query(q, where('releaseYear', '>=', filters.yearFrom));
        }
        if (filters?.yearTo) {
            q = query(q, where('releaseYear', '<=', filters.yearTo));
        }
        if (filters?.sortBy) {
            q = query(q, orderBy(filters.sortBy, filters.sortOrder ?? 'asc'));
        }

        return onSnapshot(
            q,
            (snapshot) => {
                let cars = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CarEntity));

                if (filters?.city) {
                    const fuse = new Fuse(cars, { keys: ['city'], threshold: 0.25 });
                    cars = fuse.search(filters.city).map(r => r.item);
                }

                onData(cars);
            },
        );
    },
}
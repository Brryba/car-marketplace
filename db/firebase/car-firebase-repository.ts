import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import uuid from "react-native-uuid";
import { CarEntity, CarFormData } from '@/types/schemas/car-schema';
import { ICarRepository } from '@/db/car-repository.interface';
import {db} from "@/db/firebase/fireBaseConfig";
import {CarFilters} from "@/types/car-filters";

const COLLECTION = 'cars';

export const firebaseCarRepository: ICarRepository = {
    async saveCar(car: CarFormData): Promise<void> {
        try {
            const id = uuid.v4() as string;
            console.log('[Firebase] saveCar started', { car, id });

            const ref = doc(collection(db, COLLECTION), id);
            console.log('[Firebase] ref created', ref.path);

            await setDoc(ref, { ...car, id, createdAt: Date.now() });
            console.log('[Firebase] saveCar success', id);
        } catch (e) {
            console.error('[Firebase] saveCar error', e);
            throw e;
        }
    },

    async editCar(id: string, car: CarEntity): Promise<void> {
        const ref = doc(db, COLLECTION, id);
        await updateDoc(ref, { ...car });
    },

    async deleteCar(id: string): Promise<void> {
        const ref = doc(db, COLLECTION, id);
        await deleteDoc(ref);
    },

    async getCar(id: string): Promise<CarEntity | null> {
        const ref = doc(db, COLLECTION, id);
        const snap = await getDoc(ref);
        if (!snap.exists()) return null;
        return snap.data() as CarEntity;
    },

    async getAllCars(filters?: CarFilters): Promise<CarEntity[]> {
        const snap = await getDocs(collection(db, COLLECTION));
        return snap.docs.map(d => d.data() as CarEntity);
    },
};
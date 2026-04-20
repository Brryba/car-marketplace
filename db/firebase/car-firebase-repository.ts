import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    Query,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';
import uuid from "react-native-uuid";
import {CarEntity, CarFormData} from '@/types/schemas/car-schema';
import {ICarRepository} from '@/db/car-repository.interface';
import {db} from "@/db/firebase/fireBaseConfig";
import {CarFilters} from "@/types/car-filters";
import Fuse from "fuse.js";
import {uploadPhotoToCloudinary} from "@/api/cloudinary.api";

const COLLECTION = 'cars';

export const firebaseCarRepository: ICarRepository = {
    async saveCar(car: CarFormData): Promise<void> {
        const id = uuid.v4() as string;

        let photoUrl = '';
        if (car.photo) {
            photoUrl = await uploadPhotoToCloudinary(car.photo);
        }

        const ref = doc(collection(db, COLLECTION), id);
        await setDoc(ref, { ...car, photo: photoUrl, id, createdAt: Date.now() });
    },

    async editCar(id: string, car: CarEntity): Promise<void> {
        let photoUrl = '';
        if (car.photo) {
            photoUrl = await uploadPhotoToCloudinary(car.photo);
        }

        const ref = doc(db, COLLECTION, id);
        await updateDoc(ref, { ...car, photo: photoUrl });
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
        if (!filters) {
            const snap = await getDocs(collection(db, COLLECTION));
            return snap.docs.map(d => d.data() as CarEntity);
        }

        let q: Query = collection(db, COLLECTION);

        if (filters.make) {
            q = query(q, where('make', '==', filters.make));

            if (filters.model) {
                q = query(q, where('model', '==', filters.model));
            }
        }
        if (filters.yearFrom) {
            q = query(q, where('releaseYear', '>=', filters.yearFrom));
        }
        if (filters.yearTo) {
            q = query(q, where('releaseYear', '<=', filters.yearTo));
        }
        if (filters.sortBy) {
            q = query(q, orderBy(filters.sortBy, filters.sortOrder ?? 'asc'));
        }

        const snapshot = await getDocs(q);
        let cars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CarEntity));

        if (filters.city) {
            const fuse = new Fuse(cars, {
                keys: ['city'],
                threshold: 0.25,
            });
            cars = fuse.search(filters.city).map(r => r.item);
        }

        return cars;
    },
};
import {configureStore} from "@reduxjs/toolkit";
import carFiltersReducer from "@/store/slices/filtersSlice";
import userReducer from '@/store/slices/userSlice';

export const store = configureStore({
    reducer: {
        carFilters: carFiltersReducer,
        user: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
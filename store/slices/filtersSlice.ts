import {CarFilters} from "@/types/car-filters";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: CarFilters = {};

export const carFiltersSlice = createSlice({
    name: "carFilters",
    initialState : initialState,
    reducers: {
        setCarFilters(state: CarFilters, action: PayloadAction<CarFilters>) {
            return action.payload;
        },

        resetFilters() {
            return initialState;
        }
    }
})

export const { setCarFilters, resetFilters } = carFiltersSlice.actions;

export default carFiltersSlice.reducer;
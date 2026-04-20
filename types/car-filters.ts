export type SortTypes = 'mileage' | 'year' | null;
export type SortDirection = 'asc' | 'desc';

export interface CarFilters {
    make?: string;
    model?: string;
    yearFrom?: number;
    yearTo?: number;
    city?: string;

    sortBy?: SortTypes;
    sortOrder?: SortDirection;
}
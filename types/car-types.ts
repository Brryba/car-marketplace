export const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'LPG'] as const;
export type FuelType = typeof FUEL_TYPES[number];

export const TRANSMISSIONS = ['Manual', 'Automatic', 'CVT', 'Robot'] as const;
export type TransmissionType = typeof TRANSMISSIONS[number];

export const BODY_TYPES = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Minivan', 'Pickup'] as const;
export type BodyType = typeof BODY_TYPES[number];

export const COLORS = ['Black', 'White', 'Silver', 'Grey', 'Red', 'Blue', 'Green', 'Yellow', 'Brown', 'Beige'] as const;
export type ColorType = typeof COLORS[number];
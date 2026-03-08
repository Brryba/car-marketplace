
import { z } from "zod";
import {BODY_TYPES, FUEL_TYPES, TRANSMISSIONS} from "@/types/car-types";

const currentYear = new Date().getFullYear();

export const carSchema = z.object({
    make: z.string().min(1, 'Required'),
    model: z.string().min(1, 'Required'),
    releaseYear: z.coerce.number().min(1900, "Invalid year").max(currentYear + 1, 'Invalid year'),
    mileage: z.coerce.number().min(0, 'Must be positive'),
    price: z.coerce.number().min(0, 'Must be positive'),
    city: z.string().min(1, 'Required'),
    description: z.string().optional(),
    transmission: z.enum(TRANSMISSIONS),
    fuelType: z.enum(FUEL_TYPES),
    engineSize: z.string().min(1, 'Required'),
    color: z.string().min(1, 'Required'),
    bodyType: z.enum(BODY_TYPES),
    vin: z.string().min(1, 'Required'),
});

export const carEntitySchema = carSchema.extend({
    id: z.string(),
    createdAt: z.string(),
    ownerId: z.string(),
});

export type CarFormData = z.infer<typeof carSchema>;
export type CarEntity = z.infer<typeof carEntitySchema>;
export type CarFieldKey = keyof CarFormData;
import { BODY_TYPES, COLORS, FUEL_TYPES, TRANSMISSIONS } from "@/types/car-types";
import { z } from "zod";
import { useTranslations } from "@/context/useTranslations";

const currentYear = new Date().getFullYear();

export function useCarSchema() {
    const { tr } = useTranslations();
    const numberField = () =>
        z.union([
            z.string().min(1, tr.errors.required),
            z.number()
        ]).pipe(z.coerce.number({ invalid_type_error: tr.errors.number }));

    const carSchema = z.object({
        make: z.string().min(1, tr.errors.required),
        model: z.string().min(1, tr.errors.required),
        releaseYear: numberField()
            .refine(val => val >= 1900 && val <= currentYear, tr.errors.invalidYear),
        mileage: numberField().refine(val => val >= 0, tr.errors.positive),
        price: numberField().refine(val => val >= 0, tr.errors.positive),
        city: z.string().min(1, tr.errors.required),
        description: z.string().optional(),
        transmission: z.enum(TRANSMISSIONS),
        fuelType: z.enum(FUEL_TYPES),
        engineSize: z.string().min(1, tr.errors.required),
        color: z.enum(COLORS),
        bodyType: z.enum(BODY_TYPES),
        vin: z.string().min(1, tr.errors.required),
        photo: z.string().optional(),
    });

    const carEntitySchema = carSchema.extend({
        id: z.string(),
        createdAt: z.string(),
        ownerId: z.string(),
    });

    return { carSchema, carEntitySchema };
}

export type CarFormData = z.infer<ReturnType<typeof useCarSchema>['carSchema']>;
export type CarEntity = z.infer<ReturnType<typeof useCarSchema>['carEntitySchema']>;
export type CarFieldKey = keyof CarFormData;
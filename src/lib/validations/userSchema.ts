import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    address: z.object({
        street: z.string().min(5),
        suite: z.string().min(5),
        city: z.string().min(5),
        zipcode: z.string().min(5),
        geo: z.object({
            lat: z.string().min(5),
            lng: z.string().min(5),
        }),
    }),
    company: z.object({
        name: z.string().min(5),
        catchPhrase: z.string().min(5),
        bs: z.string().min(5),
    }),
});
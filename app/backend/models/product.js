import {z} from 'zod';

export const productSchema = z.object({
    product_name: z.string().min(1, "El nombre es obligatorio"),
    description: z.string().optional(), // o .nullable() si también permites null
    is_active: z.boolean().optional().default(true), // opcional, se asume true por defecto
    category_id: z.number().int().min(1, "ID de categoría inválido"),
    color_id: z.number().int().min(1, "ID de color inválido")
  });
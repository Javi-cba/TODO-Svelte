// ESQUEMA PARA VALIDACIÓN
import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
});

export type FormSchema = typeof formSchema;

// src/lib/validation.ts
import { z } from 'zod';

// Definimos el esquema de validación
export const todoSchema = z.object({
	title: z.string().min(1, 'El título es obligatorio'),
	description: z.string().min(1, 'La descripción es obligatoria')
});

// Inferimos el tipo de datos a partir del esquema
export type TodoData = z.infer<typeof todoSchema>;

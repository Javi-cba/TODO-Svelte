// Para actualizar el estado de una tarea (para dar de baja o de alta)
import { json, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const PUT = async ({ request }: RequestEvent) => {
	const queryParams = new URL(request.url).searchParams;
	const id = queryParams.get('id');
	try {
		// Validaciones de req
		if (!id) {
			return json({ error: 'el ID por QueryParams es requerido' }, { status: 400 });
		}
		const idAsNumber = parseInt(id, 10);

		// Obtenemos el registro actual
		const currntTodo = await db
			.select()
			.from(table.todo)
			.where(eq(table.todo.id, idAsNumber))
			.limit(1)
			.execute();
		if (!currntTodo || currntTodo.length === 0) {
			return json({ error: 'No se encontró la tarea con el ID proporcionado' }, { status: 404 });
		}

		// Invertimos el valor de 'isCompleted'
		const currntIsCompleted = currntTodo[0].isCompleted;
		const newIsCompleted = !currntIsCompleted;

		// Update isCompleted
		const updatedTodo = await db
			.update(table.todo)
			.set({ isCompleted: newIsCompleted })
			.where(eq(table.todo.id, idAsNumber))
			.returning();

		return json(updatedTodo, { status: 200 });
	} catch (error) {
		console.log(error);
		return json(error, { status: 500 });
	}
};

import { json, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

// Para obtener todas las tareas (todo-list)
export const GET = async () => {
	try {
		const users = await db.select().from(table.usuario).orderBy(desc(table.usuario.updatedAt));

		if (users.length > 0) {
			const formattedUser = users.map((user) => ({
				...user,
				createdAt: new Date(user.createdAt).toLocaleDateString()
			}));

			return json(formattedUser, { status: 200 });
		} else {
			return json([], { status: 204 });
		}
	} catch (error) {
		console.error(error);
		return json({ error: 'Error al obtener las tareas' }, { status: 500 });
	}
};

export const POST = async (event: RequestEvent) => {
	try {
		const requestData = await event.request.json();
		console.log(requestData);
		if (!requestData.nombre) {
			return json({ error: 'Se requieren el campo "nombre"' }, { status: 400 });
		}
		const newUser = await db.insert(table.usuario).values(requestData).returning();

		return json(newUser, { status: 201 });
	} catch (error) {
		console.error(error);
		return json({ error: 'Error al crear el usuario' }, { status: 500 });
	}
};

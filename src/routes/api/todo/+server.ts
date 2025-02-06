import { json, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

// Para obtener todas las tareas (todo-list)
export const GET = async () => {
	try {
		const todos = await db
			.select()
			.from(table.todo)
			.where(eq(table.todo.isCompleted, false))
			.orderBy(desc(table.todo.updatedAt));

		if (todos.length > 0) {
			const formattedTodos = todos.map((todo) => ({
				...todo,
				createdAt: new Date(todo.createdAt).toLocaleDateString() // Formatea la fecha
			}));

			return json(formattedTodos, { status: 200 });
		} else {
			return json([], { status: 204 });
		}
	} catch (error) {
		console.error(error);
		return json({ error: 'Error al obtener las tareas' }, { status: 500 });
	}
};

// --> AL POST y PUT LO HACEMOS DESDE LAS SERVER ACTIONS DEL FORMULARIO AHORA

// export const POST = async ({ request }: RequestEvent) => {
//   try {
//     // Leer el cuerpo de la solicitud como texto
//     const rawBody = await request.text();
//     // Convertir el cuerpo crudo (x-www-form-urlencoded) a un objeto JavaScript
//     const params = new URLSearchParams(rawBody);
//     const data = {
//       title: params.get('title'),
//       description: params.get('description')
//     };

//     // Validación de los datos
//     if (!data.title || !data.description) {
//       return json({ error: 'Se requieren los campos "title" y "description"' }, { status: 400 });
//     }

//     // Insertar en la base de datos
//     const todo = await db
//       .insert(table.todo)
//       .values({
//         title: data.title,
//         description: data.description
//       })
//       .returning();

//     return json(todo, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return json({ error: 'Error al crear la tarea', details: error }, { status: 500 });
//   }
// };
// // PUT: Actualizar una tarea existente
// export const PUT = async ({ request }: RequestEvent) => {
//   const queryParams = new URL(request.url).searchParams;
//   const id = queryParams.get('id');

//   try {
//     if (!id) {
//       return json({ error: 'El ID es requerido en los QueryParams' }, { status: 400 });
//     }

//     const idAsNumber = parseInt(id, 10);
//     const data = await request.json();

//     // Validación de datos
//     if (!data.title && !data.description) {
//       return json(
//         {
//           error: 'Se requiere al menos uno de los campos: "title" o "description"'
//         },
//         { status: 400 }
//       );
//     }

//     // Actualizar en la base de datos
//     const todo = await db
//       .update(table.todo)
//       .set(data)
//       .where(eq(table.todo.id, idAsNumber))
//       .returning();

//     return json(todo, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return json({ error: 'Error al actualizar la tarea' }, { status: 500 });
//   }
// };

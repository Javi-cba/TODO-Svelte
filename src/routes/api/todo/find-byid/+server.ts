import { json, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

//Obtenemos los datos d una tarea especifica(para el editar)
export const GET = async ({ request }: RequestEvent) => {
  const queryParams = new URL(request.url).searchParams;
  const id = queryParams.get('id');
  try {
    if (!id) {
      return json(
        { error: 'El ID es requerido en los QueryParams' },
        { status: 400 }
      );
    }

    const idAsNumber = parseInt(id, 10);

    const todo = await db
      .select()
      .from(table.todo)
      .where(eq(table.todo.id, idAsNumber));

    if (todo.length > 0) {
      return json(todo, { status: 200 });
    } else {
      return json([], { status: 204 });
    }
  } catch (error) {
    console.error(error);
    return json({ error: 'Error al obtener la tarea por id' }, { status: 500 });
  }
};

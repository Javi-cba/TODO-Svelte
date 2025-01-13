import { json, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// GET: Obtener todas las tareas (todo)
export const GET = async () => {
  try {
    const todo = await db
      .select()
      .from(table.todo)
      .where(eq(table.todo.isCompleted, false));
    if (todo.length > 0) {
      return json(todo, { status: 200 });
    } else {
      return json([], { status: 204 });
    }
  } catch (error) {
    console.error(error);
    return json({ error: 'Error al obtener las tareas' }, { status: 500 });
  }
};
export const POST = async ({ request }: RequestEvent) => {
  try {
    // Leer el cuerpo de la solicitud como texto
    const rawBody = await request.text();
    console.log('Raw Body:', rawBody); // Imprimir el cuerpo crudo para depuración

    // Convertir el cuerpo crudo (x-www-form-urlencoded) a un objeto JavaScript
    const params = new URLSearchParams(rawBody);
    const data = {
      title: params.get('title'),
      description: params.get('description'),
    };

    // Validación de los datos
    if (!data.title || !data.description) {
      return json(
        { error: 'Se requieren los campos "title" y "description"' },
        { status: 400 }
      );
    }

    // Insertar en la base de datos
    const todo = await db
      .insert(table.todo)
      .values({
        title: data.title,
        description: data.description,
      })
      .returning();

    return json(todo, { status: 201 });
  } catch (error) {
    console.error(error);
    return json(
      { error: 'Error al crear la tarea', details: error },
      { status: 500 }
    );
  }
};
// PUT: Actualizar una tarea existente
export const PUT = async ({ request }: RequestEvent) => {
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
    const data = await request.json();

    // Validación de datos
    if (!data.title && !data.description) {
      return json(
        {
          error:
            'Se requiere al menos uno de los campos: "title" o "description"',
        },
        { status: 400 }
      );
    }

    // Actualizar en la base de datos
    const todo = await db
      .update(table.todo)
      .set(data)
      .where(eq(table.todo.id, idAsNumber))
      .returning();

    return json(todo, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ error: 'Error al actualizar la tarea' }, { status: 500 });
  }
};

// DELETE: Eliminar una tarea
export const DELETE = async ({ request }: RequestEvent) => {
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

    // Eliminar en la base de datos
    await db.delete(table.todo).where(eq(table.todo.id, idAsNumber));

    return json({ message: 'Tarea eliminada exitosamente' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ error: 'Error al eliminar la tarea' }, { status: 500 });
  }
};

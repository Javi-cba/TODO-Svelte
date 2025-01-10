import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async event => {
    const form = await superValidate(event, zod(formSchema));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { id, title, description } = form.data;
    console.log('id: ', id);
    if (id === undefined) {
      console.log('nohayid');

      try {
        await db
          .insert(table.todo)
          .values({
            title: title,
            description: description,
          })
          .returning();

        return {
          form,
          message: 'Datos insertados correctamente!',
        };
      } catch (error) {
        console.error('Error inserting data:', error);
        return fail(500, {
          form,
          error: 'Error al insertar los datos.',
        });
      }
    } else {
      console.log('hayid');

      try {
        const idAsNumber = parseInt(id, 10);

        await db
          .update(table.todo)
          .set({
            title: title,
            description: description,
          })
          .where(eq(table.todo.id, idAsNumber))
          .returning();

        return {
          message: 'Datos actualizados correctamente!',
        };
      } catch (error) {
        console.error('Error updating data:', error);
        return fail(500, {
          error: 'Error al actualizar los datos.',
        });
      }
    }
  },
};

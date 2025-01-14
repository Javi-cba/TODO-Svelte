<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { getTodoById } from '../../../services/todo-crud';
	import type { Todo } from '../../../types/todo';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	let { data, id }: { data: { form: SuperValidated<Infer<FormSchema>> }; id: string } = $props();

	onMount(async () => {
		if (id) {
			// Si estamos modificando traemos los datos del TO-DO
			const resp: Todo[] = await getTodoById(id);
			if (resp.length > 0) {
				let { description, title } = resp[0];

				formApi.set({
					id,
					description,
					title
				});
			}
		}
	});

	// VALIDACIONES DEL FORMULARIO
	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formApi, enhance } = form;
</script>

<!-- MENSAJE DE LA ACCION A REALIZAR  -->
{#if id}
	<h2 class="m-4 text-2xl font-bold text-gray-500">Editar TO-DO</h2>
{:else}
	<h2 class="m-4 text-2xl font-bold text-gray-500">Crear TO-DO</h2>
{/if}

<!-- FORMULARIO CON SERVERACTIONS -->
<form
	method="POST"
	use:enhance
	onsubmit={() => goto(`/todo-list`)}
	class="max-w-2xxl -md mx-auto space-y-5 pb-6 pl-6 pr-6 pt-0"
>
	<Form.Field {form} name="title">
		<input type="hidden" name="id" value={$formApi.id || ''} />

		<Form.Control>
			{#snippet children({ props })}
				<Form.Label class="block text-sm font-medium text-gray-700">Título</Form.Label>
				<Input
					{...props}
					bind:value={$formApi.title}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			{/snippet}
		</Form.Control>
		<Form.Description class="text-sm text-gray-500"
			>Este es el encabezado del TO-DO.</Form.Description
		>
		<Form.FieldErrors class="mt-1 text-sm text-red-500" />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label class="block text-sm font-medium text-gray-700">Descripción</Form.Label>
				<Input
					{...props}
					bind:value={$formApi.description}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			{/snippet}
		</Form.Control>
		<Form.Description class="text-sm text-gray-500"
			>Esta es una descripción adicional.</Form.Description
		>
		<Form.FieldErrors class="mt-1 text-sm text-red-500" />
	</Form.Field>

	<div class="flex justify-end space-x-4">
		<Button
			variant="outline"
			on:click={() => goto(`/todo-list`)}
			class="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cancelar</Button
		>
		<Button
			type="submit"
			variant="default"
			class="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
			>Submit</Button
		>
	</div>
</form>

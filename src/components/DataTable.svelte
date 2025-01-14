<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import type { Todo } from '../types/todo';
	import { getData, putStatusById } from '../services/todo-crud';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import { MdDelete, MdEdit } from 'svelte-icons/md';

	import { Button } from '$lib/components/ui/button';

	let todos = writable<Todo[]>([]);
	let isLoading = writable(true);

	onMount(async () => {
		const fetchedData = await getData();
		todos.set(fetchedData);
		isLoading.set(false);
	});

	const table = createTable(todos, {});
	// Configuramos las columnas de la tabla
	const columns = table.createColumns([
		table.column({
			accessor: 'title',
			header: 'Título'
		}),
		table.column({
			accessor: 'description',
			header: 'Descripción'
		}),
		table.column({
			accessor: 'createdAt',
			header: 'Creado'
		})
	]);

	// Creamos el modelo de vista para la tabla
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);

	async function handleDelete(id: string) {
		await putStatusById(id);

		// Recuperar nuevamente los datos actualizados
		const fetchedData = await getData();
		todos.set(fetchedData); // Actualizamos la tienda con los datos actualizados
	}
</script>

<div class="m-2 h-[calc(100vh-6rem)] overflow-y-auto rounded-lg border border-indigo-300 shadow-lg">
	{#if $isLoading}
		<!-- Spinner -->
		<div class="flex items-center justify-center p-4">
			<div
				class="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-indigo-600"
			></div>
		</div>
	{:else}
		<!-- Tabble -->
		<Table.Root class="w-full">
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row class="bg-indigo-100 text-white hover:bg-indigo-200">
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head
										class="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider"
										{...attrs}
									>
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>

			<Table.Body class="bg-white">
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} class="border-b border-t hover:bg-indigo-50">
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell class="px-4 py-2 text-sm text-gray-700" {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
							<Table.Cell
								class="flex w-auto flex-shrink-0 items-center justify-center space-x-1 px-1 py-1"
							>
								<Button
									class="h-8 w-9 rounded bg-indigo-600 px-2 py-1 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
									on:click={() => goto(`/todo-crud/${row.original.id}`)}
								>
									<MdEdit />
								</Button>
								<Button
									class="h-8 w-9 rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
									on:click={() => {
										handleDelete(row.original.id);
									}}
								>
									<MdDelete />
								</Button>
							</Table.Cell>
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	{/if}
</div>

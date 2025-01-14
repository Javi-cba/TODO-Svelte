<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import type { Todo } from '../types/todo';
	import { getData, putStatusById } from '../services/todo-crud';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';


  import { Button } from "$lib/components/ui/button";


		let todos = writable<Todo[]>([]);
			let filterText = writable('');

	onMount(async () => {
		const fetchedData = await getData();
		todos.set(fetchedData); // Actualizamos la store con los datos obtenidos
	});

	const table = createTable<Todo>(todos);

	// Configuramos las columnas de la tabla
	const columns = table.createColumns([
		table.column({
			accessor: 'title',
			header: 'Título'
		}),
		table.column({
			accessor: 'description',
			header: 'Descripción'
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
<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>

		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
						 <Table.Cell>
							<Button on:click={() => goto(`/todo-crud/${row.original.id}`)}>Editar</Button>
							<Button
								on:click={() => {
									handleDelete(row.original.id);
								}}>Eliminar</Button
							>
						</Table.Cell> -
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

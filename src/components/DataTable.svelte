<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import type { Todo } from '../types/todo';
	import { getData } from '../services/todo-crud';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	const data = readable<Todo[]>([], (set) => {
		getData()
			.then((fetchedData) => set(fetchedData))
			.catch((error) => console.error('Error al obtener los datos:', error));
	});

	const table = createTable<Todo>(data);

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
			accessor: 'id',
			header: 'Acciones'
		})
	]);

	// Creamos el modelo de vista para la tabla
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
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
						<!-- celda extra para acciones -->
						<Table.Cell>
							<Button on:click={() => goto(`/todo-crud/2`)}>Editar</Button>
							<Button on:click={() => console.log('Eliminar todo', row.id)}>Eliminar</Button>
						</Table.Cell>
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

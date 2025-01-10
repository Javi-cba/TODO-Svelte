<!-- src/routes/todo/create.svelte -->
<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	// Expecting data to have a "form" property
	export let data: { form: { title: string; description: string } };
	const { form } = superForm(data.form);
</script>

<form method="POST" action="api/todo">
	<div class="space-y-4">
		<!-- Campo Título -->
		<div>
			<label for="title" class="block text-sm font-medium">Título</label>
			<input
				id="title"
				name="title"
				type="text"
				class="input input-bordered w-full"
				bind:value={$form.title}
			/>
		</div>

		<!-- Campo Descripción -->
		<div>
			<label for="description" class="block text-sm font-medium">Descripción</label>
			<textarea
				id="description"
				name="description"
				class="textarea textarea-bordered w-full"
				bind:value={$form.description}
			></textarea>
		</div>

		<!-- Botón de Enviar -->
		<div>
			<button type="submit" class="btn btn-primary w-full">Crear To-Do</button>
		</div>
	</div>
</form>

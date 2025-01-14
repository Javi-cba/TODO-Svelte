<!-- PAGE HOME -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { MdCreate, MdViewList, MdDeleteForever } from 'svelte-icons/md';
	import { fade, fly } from 'svelte/transition';
</script>

<main class="flex min-h-screen flex-col items-center bg-gray-50 py-10 transition-all duration-500">
	<!-- Contenedor principal con el logo y descripción -->
	<header
		class="mb-12 transform text-center transition-transform duration-1000"
		in:fly={{ x: 200 }}
		out:fly={{ x: -200 }}
	>
		<h1 class="animate__animated animate__fadeIn text-4xl font-extrabold text-indigo-600">
			¡Bienvenido a TaskiFy!
		</h1>
		<p class="animate__animated animate__fadeIn animate__delay-1s mt-4 text-lg text-gray-600">
			Una manera simple y efectiva de gestionar tus tareas. Organiza y realiza un seguimiento de
			todo lo que necesitas hacer.
		</p>
	</header>

	<!-- Contenedores de acciones -->
	<section class="flex flex-wrap justify-center gap-8">
		<!-- Contenedor de Crear Tarea -->
		<div
			class="w-72 transform rounded-lg bg-white p-6 text-center shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
		>
			<Button
				on:click={() => goto('/todo-crud')}
				class="mb-4 transform rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-500 hover:scale-110 hover:bg-indigo-700"
			>
				<MdCreate class="mr-2 inline-block" /> Crear Tarea
			</Button>
			<p class="mb-4 text-gray-500">
				Agrega nuevas tareas a tu lista y organízate de manera eficiente.
			</p>
		</div>

		<!-- Contenedor de Ver Lista de Tareas -->
		<div
			class="w-72 transform rounded-lg bg-white p-6 text-center shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
		>
			<Button
				on:click={() => goto('/todo-list')}
				class="mb-4 transform rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-500 hover:scale-110 hover:bg-indigo-700"
			>
				<MdViewList class="mr-2 inline-block" /> Ver Lista
			</Button>
			<p class="mb-4 text-gray-500">
				Consulta todas las tareas que has creado, y marca como completadas las que hayas terminado.
			</p>
		</div>

		<!-- Contenedor de Editar Tarea -->
		<div
			class="w-72 transform rounded-lg bg-white p-6 text-center shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
		>
			<Button
				on:click={() => goto('/todo-list')}
				class="mb-4 transform rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-500 hover:scale-110 hover:bg-indigo-700"
			>
				<MdCreate class="mr-2 inline-block" /> Editar Tarea
			</Button>
			<p class="mb-4 text-gray-500">
				Modifica las tareas existentes para mantenerlas actualizadas y bien organizadas.
			</p>
		</div>

		<!-- Contenedor de Eliminar Tarea -->
		<div
			class="w-72 transform rounded-lg bg-white p-6 text-center shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
		>
			<Button
				on:click={() => goto('/todo-list')}
				class="mb-4 transform rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-500 hover:scale-110 hover:bg-indigo-700"
			>
				<MdDeleteForever class="mr-2 inline-block" /> Eliminar Tarea
			</Button>
			<p class="mb-4 text-gray-500">
				Si ya no necesitas una tarea, puedes eliminarla permanentemente de tu lista.
			</p>
		</div>
	</section>

	<!-- Descripción adicional -->
	<footer class="mt-12 text-center text-gray-500">
		<p>
			TaskiFy te ayuda a gestionar tus tareas de forma sencilla. Organiza, marca como completadas o
			elimina tus tareas fácilmente.
		</p>
	</footer>
</main>

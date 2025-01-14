<script lang="ts">
	import '../app.css';
	import { MdAdd } from 'svelte-icons/md';
	import { Button } from '$lib/components/ui/button';

	let { children } = $props();
</script>

<nav
	class="flex items-center justify-between bg-indigo-600 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
>
	<a href="/">
		<div class="animate-item flex items-center space-x-2">
			<img
				src="https://img.icons8.com/?size=100&id=CPpEk1LXJJim&format=png&color=000000"
				alt="TaskiFy Logo"
				class="h-10 w-10"
			/>
			<span class="text-xl font-bold text-white">TaskiFy</span>
		</div>
	</a>

	<div class="animate-item flex space-x-4">
		<a
			href="/todo-crud"
			class="flex items-center justify-center rounded-md px-6 py-2 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
		>
			<span>Crear Nuevo</span>

			<Button class="h-8 w-9  bg-transparent px-2 py-1 text-white hover:bg-transparent ">
				<MdAdd />
			</Button>
		</a>
	</div>
</nav>

{@render children()}

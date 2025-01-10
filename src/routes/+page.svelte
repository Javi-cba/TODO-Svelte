<script lang="ts">
	import '../app.css';
	import TodoCreate from './todo/create.svelte';
	let formData = {
		form: {
			title: '',
			description: ''
		}
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<TodoCreate data={formData} />

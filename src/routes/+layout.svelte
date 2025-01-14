<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex justify-center bg-gray-800 p-4 m-2 rounded-lg shadow-lg">
	<a href="/" class="text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">Home</a>
	<a href="/about" class="text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">About</a>
	<a href="/contact" class="text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">Contact</a>
</nav>

{@render children()}

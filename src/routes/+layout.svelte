<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="fixed left-0 top-0 z-50 w-full bg-gray-800">
	<div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
		<!-- Logo -->
		<a href="/" class="text-lg font-bold text-white">SvelteKit</a>

		<!-- Links -->
		<div class="hidden space-x-4 md:flex">
			<a href="/" class="text-gray-300 hover:text-white">Home</a>
			<a href="/about" class="text-gray-300 hover:text-white">About</a>
			<a href="/contact" class="text-gray-300 hover:text-white">Contact</a>
		</div>

		<!-- Mobile Menu Button -->
		<button
			class="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white md:hidden"
			aria-label="Open Menu"
		>
			<svg
				class="h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16m-7 6h7"
				/>
			</svg>
		</button>
	</div>
</nav>

<main class="mt-16">
	{@render children()}
</main>

<div class="fixed inset-0 flex justify-center sm:px-8">
	<div class="flex w-full max-w-3xl lg:w-3/4">
		<h1 class="sr-only">SvelteKit</h1>
	</div>
</div>

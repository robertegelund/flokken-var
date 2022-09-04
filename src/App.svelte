<script>
	import Velkommen from "./pages/Velkommen.svelte"
	import Flokken from "./pages/Flokken.svelte"
	import Historier from "./pages/Historier.svelte"
	let aktivSide = ""
	export const endreSide = valgtSide => aktivSide = valgtSide
</script>

<main>
	{#if aktivSide === "Flokken"} <Flokken {endreSide} />
		{:else if aktivSide === "Historier"} <Historier {endreSide} />
		{:else} <Velkommen {endreSide} />
	{/if}
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		margin: 0 auto;
	}
</style>
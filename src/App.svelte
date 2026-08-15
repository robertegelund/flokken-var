<script>
	import Velkommen from "./pages/Velkommen.svelte"
	import Flokken from "./pages/Flokken.svelte"
	import Historier from "./pages/Historier.svelte"
	const sider = {
		Forside: Velkommen,
		Flokken,
		Historier
	}

	let aktivSide = "Forside"
	export const endreSide = (valgtSide) => {
		aktivSide = sider[valgtSide] ? valgtSide : "Forside"
	}

	$: aktivKomponent = sider[aktivSide]
</script>

<main>
	<svelte:component this={aktivKomponent} {endreSide} {aktivSide} />
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		margin: 0 auto;
	}
</style>
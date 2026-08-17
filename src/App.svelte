<script>
	import { rute } from "./utils/router.js"
	import Velkommen from "./pages/Velkommen.svelte"
	import Flokken from "./pages/Flokken.svelte"
	import Historier from "./pages/Historier.svelte"
	import SidenFinnesIkke from "./pages/SidenFinnesIkke.svelte"

	const sidetitler = {
		"": "Forside",
		historier: "Historiene",
		fagfolk: "Fagfolk og influencere"
	}

	$: segmenter = $rute.path.split("/").filter(Boolean)
	$: side = segmenter[0] ?? ""
	$: sidetittel = sidetitler[side] ?? "Side ikke funnet"

	$: if (typeof document !== "undefined") {
		document.title = `${sidetittel} – Flokken vår.`
	}
</script>

<a href="#hovedinnhold" class="hopp-til-innhold">Hopp til hovedinnhold</a>

<div class="sr-only" role="status" aria-live="polite">{sidetittel}</div>

<main>
	{#if side === ""}
		<Velkommen />
	{:else if side === "historier"}
		<Historier />
	{:else if side === "fagfolk"}
		<Flokken />
	{:else}
		<SidenFinnesIkke />
	{/if}
</main>

<style>
	main {
		height: 100vh;
		height: 100dvh;
	}

	.hopp-til-innhold {
		position: absolute;
		left: -9999px;
		top: 0;
		background: #fff;
		color: #000;
		padding: 1rem 1.5rem;
		z-index: 1000;
	}

	.hopp-til-innhold:focus {
		left: 1rem;
		top: 1rem;
	}
</style>

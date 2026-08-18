<script>
	export let flokkMedlemID
	export let flokkMedlemData

	let erSynlig = false
	const visDetaljer = () => erSynlig = !erSynlig
	$: detaljerId = `flokkmedlem-detaljer-${flokkMedlemID}`
</script>

<article class="flokkmedlem">
	<button
		type="button"
		class="flokkmedlem-trigger"
		aria-expanded={erSynlig}
		aria-controls={detaljerId}
		on:click={visDetaljer}
	>
		<div class="flokkmedlem-container">
			<img class="flokkmedlem-bilde" src={flokkMedlemData.bildeUrl} alt="Portrettbilde av {flokkMedlemData.fornavn} {flokkMedlemData.etternavn}">
			<div class="flokkmedlem-info">
				<p class="flokkmedlem-navn">{`${flokkMedlemData.fornavn} ${flokkMedlemData.etternavn}`}</p>
				<p class="flokkmedlem-tittel"><em>{flokkMedlemData.tittel}</em></p>
			</div>
		</div>
	</button>

	{#if erSynlig}
		<div id={detaljerId} class="flokkmedlem-detaljer" role="region" aria-label="Detaljer om {flokkMedlemData.fornavn} {flokkMedlemData.etternavn}">
			<button type="button" on:click={() => erSynlig = false} class="lukk-detaljer-knapp" aria-label="Lukk detaljer">×</button>
			<p>{flokkMedlemData.beskrivelse}</p>
		</div>
	{/if}
</article>

<style>
	.flokkmedlem {
		position: relative;
	}

	.flokkmedlem-trigger {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		border: none;
		background: transparent;
		margin: 0;
		padding: 0;
		color: inherit;
		text-align: inherit;
		font-family: inherit;
		cursor: pointer;
	}

	.flokkmedlem-container, .flokkmedlem-info {
		display: flex; flex-direction: column;
		align-items: center;
	}

	.flokkmedlem-navn {
		margin-bottom: 0.5rem;
	}

	.flokkmedlem-tittel {
		font-size: 1.5rem;
	}

    .flokkmedlem-bilde {
		width: clamp(14rem, 10rem + 10vw, 20rem);
		height: clamp(14rem, 10rem + 10vw, 20rem);
		object-fit: cover;
		border-radius: 50%;
		margin-bottom: 0.3rem;
	}

	.flokkmedlem-detaljer {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		position: absolute; top: 0; right: 0;
		padding: 1.2rem; padding-top: 7rem; z-index: 99;
		border-radius: 2px;
		font-size: 1.8rem; color: white;
		line-height: calc(1.5 * 1.8rem);
		overflow-y: scroll;
		background-color: rgba(0, 0, 0, 0.8);
	}

	.flokkmedlem-detaljer p { margin-bottom: 2.4rem; }
</style>

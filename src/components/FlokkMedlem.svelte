<script>
	import { db } from "../utils/firebase.js"
	import { collection, onSnapshot } from "firebase/firestore"
	export let flokkMedlemID
	export let flokkMedlemData

	const flokkenBokerRef = collection(db, "boker")
	let bokData
	let erSynlig = false
	const visDetaljer = () => erSynlig = !erSynlig
	$: detaljerId = `flokkmedlem-detaljer-${flokkMedlemID}`

	onSnapshot(flokkenBokerRef, snap => {
		snap.docs.forEach(doc => {
			if(doc.data().forfatterID === flokkMedlemID) {
				bokData = doc.data()
			}
	})})
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
			<button type="button" on:click={() => erSynlig = false} class="lukk-medlem" aria-label="Lukk detaljer">X</button>
			<p>{flokkMedlemData.beskrivelse}</p>
			{#if bokData}
				<div class="flokkmedlem-bokdetaljer">
					<p>{flokkMedlemData.fornavn}s seneste utgivelse fra {bokData.utgivelsesår}: "{bokData.boktittel}".</p>
					<a target="_blank" rel="noopener noreferrer" href={bokData.bokUrl} aria-label="Side med informasjon om boken {bokData.boktittel} (åpnes i ny fane)"><img class="flokkmedlem-bokdetaljer-bokbilde" src={bokData.bokbildeUrl} alt=""></a>
				</div>
			{/if}
		</div>
	{/if}
</article>

<style>
	.lukk-medlem {
        width: 35px; height: 35px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.8);
        color: white; font-size: 15px; font-weight: 600;
        position: absolute; top: -65px; right: -15px;
        z-index: 100;
        border: none;
    }

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
		width: 20rem;
		height: 20rem;
		object-fit: cover;
		border-radius: 50%;
		margin-bottom: 0.3rem;
	}

	.flokkmedlem-detaljer {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		position: absolute; right: 0;
		padding: 1.2rem; z-index: 99;
		border-radius: 2px;
		font-size: 1.8rem; color: white;
		line-height: calc(1.5 * 1.8rem);
		overflow-y: scroll;
		background-color: rgba(0, 0, 0, 0.8);
		cursor: pointer;
	}

	.flokkmedlem-detaljer p { margin-bottom: 2.4rem; }

	.flokkmedlem-bokdetaljer { display: flex; }

	.flokkmedlem-bokdetaljer p { font-size: 1.6rem; margin-right: 1rem; }

	.flokkmedlem-bokdetaljer img { width: 10rem; }
	
	::-webkit-scrollbar { width: 0; }

	@media (max-width: 749px) {
		.flokkmedlem-bilde {
			width: 18rem;
			height: 18rem;
		}
	}
</style>
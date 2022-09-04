<script>
	import { db } from "../firebase.js"
	export let flokkMedlemID
	export let flokkMedlemData
		
	const flokkenBoker = db.collection("boker")
	let bokData
	let erSynlig = false
	const visDetaljer = () => erSynlig = !erSynlig

	flokkenBoker.onSnapshot(snap => {
		snap.docs.forEach(doc => {
			if(doc.data().forfatterID === flokkMedlemID) {
				bokData = doc.data()
			}
	})})
</script>

<article tabindex=0 class="flokkmedlem" on:click={visDetaljer}>
    <div class="flokkmedlem-container">
		<img tabindex=0 class="flokkmedlem-bilde" src="{flokkMedlemData.bildeUrl}" alt="Portrettbilde av ${`${flokkMedlemData.fornavn} ${flokkMedlemData.etternavn}`}">
		<div class="flokkmedlem-info">
			<p tabindex=0 class="flokkmedlem-navn">{`${flokkMedlemData.fornavn} ${flokkMedlemData.etternavn}`}</p>
			<p tabindex=0 class="flokkmedlem-tittel"><em>{flokkMedlemData.tittel}</em></p>
		</div>
	</div>

	{#if erSynlig}
		<button on:click={() => !erSynlig} class="lukk-medlem">X</button>
		<article tabindex=0 class="flokkmedlem-detaljer" >
			<p tabindex=0>{flokkMedlemData.beskrivelse}</p> 
			{#if bokData}
				<div class="flokkmedlem-bokdetaljer">
					<p tabindex=0>{flokkMedlemData.fornavn}s seneste utgivelse fra {bokData.utgivelsesår}: "{bokData.boktittel}".</p>
					<a target="_blank" href="{bokData.bokUrl}"><img class="flokkmedlem-bokdetaljer-bokbilde" src="{bokData.bokbildeUrl}" alt="Side med informasjon om boken {bokData.boktittel}"></a>
				</div>
			{/if}
		</article>
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
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
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
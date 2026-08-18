<script>
    import { slettHistorie } from "../utils/historie-handtering.js"
    import { harSlettenokkel } from "../utils/klient.js"
    export let historieID, historieData, erApen, erSkjult, veksleApen, oppdaterHistorier

    $: erMinHistorie = harSlettenokkel(historieID)
    $: detaljerId = `historie-detaljer-${historieID}`

    const handterSlett = async () => {
        const suksess = await slettHistorie(historieID)
        if (suksess) oppdaterHistorier()
    }
</script>

<article class="flokk-historie" class:skjult={erSkjult} class:utvidet={erApen}>
    {#if erMinHistorie}
        <button
            type="button"
            class="historie-slett"
            on:click={handterSlett}
            aria-label="Slett historien {historieData.title}"
        >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M4 7h16" />
                <path d="M9.5 7V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V7" />
                <path d="M18.5 7l-.9 12.6a2 2 0 0 1-2 1.9H8.4a2 2 0 0 1-2-1.9L5.5 7" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
            </svg>
        </button>
    {/if}

    <button
        type="button"
        class="flokk-historie-trigger"
        aria-expanded={erApen}
        aria-controls={detaljerId}
        on:click={veksleApen}
    >
        <h2 class="historie-tittel">{historieData.title}</h2>

        {#if historieData.imageUrl}
            <img class="historie-bilde" src="{historieData.imageUrl}" alt={historieData.imageDescription || ""}>
        {/if}

        <p class="historie-innhold"><em>{historieData.content.slice(0, 40)}</em> [...]</p>
        <div class="historie-valgte-kategorier">
            {#each historieData.categories as valgtHistorieKategori}
                <span class="historie-valgt-kategori"> {valgtHistorieKategori} | </span>
            {/each}
        </div>
        <div class="historie-delt-dato">{new Date(historieData.publishedAt).toString().slice(4,15)}</div>
    </button>

    {#if erApen}
        <div id={detaljerId} class="historie-full" role="region" aria-label="Full historie: {historieData.title}">
            <button type="button" on:click={veksleApen} class="lukk-detaljer-knapp" aria-label="Lukk historie">×</button>
            <h2 class="historie-tittel">{historieData.title}</h2>
            <p>{historieData.content}</p>
        </div>
	{/if}
</article>

<style>
    .flokk-historie {
        position: relative;
    }

    .flokk-historie.skjult {
        display: none;
    }

    .flokk-historie.utvidet {
        width: min(80vw, 70rem);
    }

    .flokk-historie.utvidet .flokk-historie-trigger .historie-tittel {
        color: white;
    }

    .flokk-historie-trigger {
        display: block;
        width: 100%;
        border: none;
        background: transparent;
        margin: 0;
        padding: 0;
        text-align: inherit;
        color: inherit;
        font: inherit;
        cursor: pointer;
    }

    .historie-tittel, .historie-innhold {
        margin-bottom: 1rem;
    }

    .historie-tittel {
        font-size: 2.2rem;
    }

    .historie-bilde {
        width: 100%;
        border-radius: .5rem;
        margin-bottom: 0.8rem;
    }

    .historie-innhold {
        font-size: 1.8rem;
        margin-bottom: calc(1.8rem * 1.5);
    }

    .historie-valgte-kategorier {
        text-align: right;
    }

    .historie-delt-dato, .historie-valgt-kategori {
        font-size: 1.6rem;
        text-align: right;
    }

    .historie-slett {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 4rem;
        margin: 0 0 0.8rem auto;
        padding: 0;
        border: none;
        border-radius: 50%;
        background-color: #b3261e;
        color: white;
        cursor: pointer;
    }

    .historie-slett:hover, .historie-slett:focus-visible {
        background-color: #8f1e17;
    }

    .historie-full {
        position: absolute; top: 0;
        width: 100%; padding: 2rem;
        padding-top: 7rem;
		border-radius: 2px; z-index: 99;
		font-size: 1.8rem; color: white;
		line-height: calc(1.5 * 1.8rem);
		background-color: rgba(0, 0, 0, 0.8);
        overflow-y: scroll;
	}
</style>

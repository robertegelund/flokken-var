<script>
    import { slettHistorie } from "../utils/historie-handtering";
    import { auth, klarTilInnlogging } from "../utils/firebase.js"
    export let historieID, historieData, erApen, erSkjult, veksleApen

    let brukerUid = null
    klarTilInnlogging.then(() => brukerUid = auth.currentUser?.uid ?? null)

    $: erMinHistorie = brukerUid !== null && historieData.opprettetAv === brukerUid
    $: historiekategorier = Array.isArray(historieData.valgteHistorieKategorier)
        ? historieData.valgteHistorieKategorier
        : [historieData.valgteHistorieKategorier]
    $: detaljerId = `historie-detaljer-${historieID}`
</script>

<article class="flokk-historie" class:skjult={erSkjult} class:utvidet={erApen}>
    {#if erMinHistorie}
        <button type="button" class="historie-slett" on:click={() => slettHistorie(historieID)} title="Slett historie">Slett</button>
    {/if}

    <button
        type="button"
        class="flokk-historie-trigger"
        aria-expanded={erApen}
        aria-controls={detaljerId}
        on:click={veksleApen}
    >
        <h2 class="historie-tittel">{historieData.historieTittel}</h2>

        {#if historieData.historieBildeUrl}
            <img class="historie-bilde" src="{historieData.historieBildeUrl}" alt={historieData.bildebeskrivelse || ""}>
        {/if}

        <p class="historie-innhold"><em>{historieData.historieInnhold.slice(0, 40)}</em> [...]</p>
        <div class="historie-valgte-kategorier">
            {#each historiekategorier as valgtHistorieKategori}
                <span class="historie-valgt-kategori"> {valgtHistorieKategori} | </span>
            {/each}
        </div>
        <div class="historie-delt-dato">{historieData.historiePublisert.toDate().toString().slice(4,15)}</div>
    </button>

    {#if erApen}
        <div id={detaljerId} class="historie-full" role="region" aria-label="Full historie: {historieData.historieTittel}">
            <button type="button" on:click={veksleApen} class="lukk-historie" aria-label="Lukk historie">×</button>
            <h2 class="historie-tittel">{historieData.historieTittel}</h2>
            <p>{historieData.historieInnhold}</p>
        </div>
	{/if}
</article>

<style>
    .lukk-historie {
        width: 3.6rem; height: 3.6rem;
        border-radius: 50%;
        background-color: #000;
        border: 0.2rem solid white;
        box-shadow: 0 0 0 0.15rem rgba(0, 0, 0, 0.6);
        color: white; font-size: 2rem; font-weight: 700;
        line-height: 1;
        display: flex; align-items: center; justify-content: center;
        position: absolute; top: 1rem; right: 1rem; z-index: 100;
        cursor: pointer;
    }

    .flokk-historie {
        position: relative;
    }

    .flokk-historie.skjult {
        display: none;
    }

    .flokk-historie.utvidet {
        width: 80vw;
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

    .historie-slett, .historie-delt-dato, .historie-valgt-kategori {
        font-size: 1.6rem;
        text-align: right;
    }

    .historie-slett {
        width: 100%;
        cursor: pointer;
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

    ::-webkit-scrollbar {
        width: 0;
    }
</style>

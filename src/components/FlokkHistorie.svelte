<script>
    import { onMount } from "svelte";
    import { slettHistorie } from "../utils/historie-handtering";
    import { historieArtikler } from "../utils/stores.js"
    export let historieID, historieData, index, container
    let historie; let erSynlig = false
    let historieTittel;

    $: historieEksistererLokalt = localStorage.getItem(historieID) ? true : false

    onMount( () => $historieArtikler = [...$historieArtikler, historie])

    const visFullHistorie = () => {
        erSynlig = !erSynlig
        for(let i=0; i < $historieArtikler.length; i++) {
            if(i != index && erSynlig) {
                $historieArtikler[i].style.display = "none";
                container.style.display = "flex";
                historie.style.width = "80vw";
                historieTittel.style.color = "white"
            }
            else {
                $historieArtikler[i].style.display = "";
                container.style.display = "grid";
                historie.style.width = "";
                historieTittel.style.color = "black"
            }
        }
    }
</script>

<article class="flokk-historie" on:click={visFullHistorie} bind:this={historie}>
    {#if historieEksistererLokalt}
        <button class="historie-slett" on:click={slettHistorie(historieID)} title="Slett historie">Slett</button>
    {/if}

    <h2 tabindex=0 class="historie-tittel" bind:this={historieTittel}>{historieData.historieTittel}</h2>
      
    {#if historieData.historieBildeUrl}
        <img tabindex=0 class="historie-bilde" src="{historieData.historieBildeUrl}" alt={historieData.bildebeskrivelse}>
    {/if}

    <p tabindex=0 class="historie-innhold"><em>{historieData.historieInnhold.slice(0, 40)}</em> [...]</p>
    <div class="historie-valgte-kategorier">
        {#each historieData.valgteHistorieKategorier as valgtHistorieKategori}
            <span tabindex=0 class="historie-valgt-kategori"> {valgtHistorieKategori} | </span>
        {/each}
    </div>
    <div tabindex=0 class="historie-delt-dato">{historieData.historiePublisert.toDate().toString().slice(4,15)}</div>

    {#if erSynlig}
        <button on:click={() => !erSynlig} class="lukk-historie">X</button>
		<article tabindex=0 class="historie-full">
            <h2 color="white" tabindex=0 class="historie-tittel">{historieData.historieTittel}</h2>
			<p tabindex=0>{historieData.historieInnhold}</p> 
		</article>
	{/if}
</article>

<style>
    .lukk-historie {
        width: 35px; height: 35px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.8);
        color: white; font-size: 15px; font-weight: 600;
        position: absolute; top: -40px; right: -15px; z-index: 100;
        border: none;
    }

    .flokk-historie {
        position: relative;
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
		border-radius: 2px; z-index: 99;
		font-size: 1.8rem; color: white;
		line-height: calc(1.5 * 1.8rem);
		background-color: rgba(0, 0, 0, 0.8);
        overflow-y: scroll; cursor: pointer;
	}

    ::-webkit-scrollbar {
        width: 0;
    }
</style>  
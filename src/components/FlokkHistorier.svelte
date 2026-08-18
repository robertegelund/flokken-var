<script>
    import FlokkHistorie from "./FlokkHistorie.svelte"
    export let valgteFlokkHistorier
    export let oppdaterHistorier
    let apenHistorieID = null
    const veksleApen = (id) => apenHistorieID = apenHistorieID === id ? null : id
</script>

<section class="flokkhistorier-container" class:harApenHistorie={apenHistorieID !== null}>
    {#each valgteFlokkHistorier as historie (historie.id)}
        <FlokkHistorie
            historieID={historie.id}
            historieData={historie}
            erApen={apenHistorieID === historie.id}
            erSkjult={apenHistorieID !== null && apenHistorieID !== historie.id}
            veksleApen={() => veksleApen(historie.id)}
            {oppdaterHistorier}
        />
    {/each}
</section>

<style>
    .flokkhistorier-container {
        width: 100%; display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(25rem, 100%), 1fr) );
        gap: 3rem 10rem; margin-bottom: 8rem;
    }

    .flokkhistorier-container.harApenHistorie {
        display: flex;
    }
</style>

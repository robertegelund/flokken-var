<script>
    import FlokkHistorie from "./FlokkHistorie.svelte"
    export let valgteFlokkHistorier
    let apenHistorieID = null
    const veksleApen = (id) => apenHistorieID = apenHistorieID === id ? null : id
</script>

<section class="flokkhistorier-container" class:harApenHistorie={apenHistorieID !== null}>
    {#each valgteFlokkHistorier as valgtFlokkHistorie (valgtFlokkHistorie.id)}
        <FlokkHistorie
            historieID={valgtFlokkHistorie.id}
            historieData={valgtFlokkHistorie.data()}
            erApen={apenHistorieID === valgtFlokkHistorie.id}
            erSkjult={apenHistorieID !== null && apenHistorieID !== valgtFlokkHistorie.id}
            veksleApen={() => veksleApen(valgtFlokkHistorie.id)}
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

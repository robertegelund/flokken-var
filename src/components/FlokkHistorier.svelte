<script>
    import FlokkHistorie from "./FlokkHistorie.svelte"
    export let valgteFlokkHistorier
    let container
</script>

<section class="flokkhistorier-container" bind:this={container}>
    {#each valgteFlokkHistorier as valgtFlokkHistorie, index}
        <FlokkHistorie 
            historieID={valgtFlokkHistorie.id} 
            historieData={valgtFlokkHistorie.data()}
            index={index}
            container={container}
        />
    {/each}
</section>

<style>
    .flokkhistorier-container {
        width: 100%; display: grid;
        grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr) );
        gap: 3rem 10rem; margin-bottom: 8rem;
    }
</style>
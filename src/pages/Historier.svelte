<script>
    import { db } from "../utils/firebase.js"
    import FlokkHistorier from "../components/FlokkHistorier.svelte"
    import HistorieSkjema from "../components/HistorieSkjema.svelte"
    import Hovedmeny from "../components/Hovedmeny.svelte"

    let aktivFane = "FlokkHistorier"
    const endreFane = (valgtFane) => aktivFane = valgtFane
    export let endreSide
    export let aktivSide
    const flokkHistorier = db.collection("flokkhistorier")
    let flokkHistorieUtvalg = []
    let historieSokeord = ""
    const historieFaner = [
        { id: "FlokkHistorier", tekst: "Flokkhistorier" },
        { id: "HistorieSkjema", tekst: "Del din historie" }
    ]
    flokkHistorier
        .orderBy("historiePublisert", "desc")
        .onSnapshot(snap => 
            flokkHistorieUtvalg = snap.docs.map(valgtFlokkHistorie => valgtFlokkHistorie))

    $: valgteFlokkHistorier = flokkHistorieUtvalg.filter( flokkHistorie => 
        flokkHistorie.data().historieTittel.toLowerCase().includes(historieSokeord.toLowerCase()) || 
        flokkHistorie.data().historieInnhold.toLowerCase().includes(historieSokeord.toLowerCase()))
</script>

<nav aria-label="Hovedmeny og historievalg">
    <ul>
        <Hovedmeny {endreSide} {aktivSide} />
        {#each historieFaner as fane}
            <li>
                <button
                    type="button"
                    class:active={aktivFane === fane.id}
                    on:click={() => endreFane(fane.id)}
                >
                    {fane.tekst}
                </button>
            </li>
        {/each}
        <li>
            <input
                bind:value={historieSokeord}
                on:focus={() => endreFane("FlokkHistorier")}
                placeholder="Søk i historier"
                aria-label="Søk i historier"
            >
        </li>
    </ul>  
</nav>

<section>
    {#if aktivFane === "FlokkHistorier"}
        <FlokkHistorier {valgteFlokkHistorier} />
    {:else}
        <HistorieSkjema {endreFane} />
    {/if}
</section>
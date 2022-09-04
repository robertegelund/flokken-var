<script>
    import { db } from "../firebase.js"
    import FlokkHistorier from "../components/FlokkHistorier.svelte"
    import HistorieSkjema from "../components/HistorieSkjema.svelte"
    import Hovedmeny from "../components/Hovedmeny.svelte"

    let aktivFane = "FlokkHistorier"
    const endreFane = (valgtFane) => aktivFane = valgtFane
    export let endreSide
    const flokkHistorier = db.collection("flokkhistorier")
    let flokkHistorieUtvalg = []
    let historieSokeord = ""
    flokkHistorier
        .orderBy("historiePublisert", "desc")
        .onSnapshot(snap => 
            flokkHistorieUtvalg = snap.docs.map(valgtFlokkHistorie => valgtFlokkHistorie))

    $: valgteFlokkHistorier = flokkHistorieUtvalg.filter( flokkHistorie => 
        flokkHistorie.data().historieTittel.toLowerCase().includes(historieSokeord.toLowerCase()) || 
        flokkHistorie.data().historieInnhold.toLowerCase().includes(historieSokeord.toLowerCase()))
</script>

<nav>
    <ul>
        <Hovedmeny {endreSide} />
        <li 
            tabindex=0
            class:active="{aktivFane === "FlokkHistorier"}"
            on:click={() => endreFane("FlokkHistorier")}>Flokkhistorier
        </li>
        <li 
            tabindex=0
            class:active="{aktivFane === "HistorieSkjema"}"
            on:click={() => endreFane("HistorieSkjema")}>Del din historie
        </li>
        <li>
            <input bind:value={historieSokeord} on:click={() => endreFane("FlokkHistorier")} placeholder="Søk i historier">
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
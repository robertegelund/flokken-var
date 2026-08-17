<script>
    import { db } from "../utils/firebase.js"
    import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
    import { rute, naviger, settSokIUrl, lenkeKlikk } from "../utils/router.js"
    import FlokkHistorier from "../components/FlokkHistorier.svelte"
    import HistorieSkjema from "../components/HistorieSkjema.svelte"
    import Hovedmeny from "../components/Hovedmeny.svelte"

    const historieFaner = [
        { sti: "/historier", id: "FlokkHistorier", tekst: "Flokkhistorier" },
        { sti: "/historier/del-din-historie", id: "HistorieSkjema", tekst: "Del din historie" }
    ]

    $: aktivFane = $rute.path === "/historier/del-din-historie" ? "HistorieSkjema" : "FlokkHistorier"
    $: historieSokeord = $rute.sok

    const flokkHistorierQuery = query(collection(db, "flokkhistorier"), orderBy("historiePublisert", "desc"))
    let flokkHistorieUtvalg = []
    onSnapshot(flokkHistorierQuery, snap =>
        flokkHistorieUtvalg = snap.docs.map(valgtFlokkHistorie => valgtFlokkHistorie))

    $: valgteFlokkHistorier = flokkHistorieUtvalg.filter( flokkHistorie =>
        flokkHistorie.data().historieTittel.toLowerCase().includes(historieSokeord.toLowerCase()) ||
        flokkHistorie.data().historieInnhold.toLowerCase().includes(historieSokeord.toLowerCase()))

    const oppdaterSokeord = (event) => settSokIUrl(event.target.value)
    const fokuserSok = () => {
        if (aktivFane !== "FlokkHistorier") naviger("/historier", { erstatt: true, fokuser: false })
    }
</script>

<nav aria-label="Hovedmeny og historievalg">
    <ul>
        <Hovedmeny />
        {#each historieFaner as fane}
            <li>
                <a
                    href={fane.sti}
                    aria-current={aktivFane === fane.id ? "page" : undefined}
                    on:click={lenkeKlikk(fane.sti)}
                >
                    {fane.tekst}
                </a>
            </li>
        {/each}
        <li>
            <input
                value={historieSokeord}
                on:input={oppdaterSokeord}
                on:focus={fokuserSok}
                placeholder="Søk i historier"
                aria-label="Søk i historier"
            >
        </li>
    </ul>
</nav>

<section id="hovedinnhold" tabindex="-1">
    <h1 class="sr-only">{aktivFane === "FlokkHistorier" ? "Flokkhistorier" : "Del din historie"}</h1>
    {#if aktivFane === "FlokkHistorier"}
        <FlokkHistorier {valgteFlokkHistorier} />
    {:else}
        <HistorieSkjema />
    {/if}
</section>

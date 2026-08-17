<script>
    import Hovedmeny from "../components/Hovedmeny.svelte"
    import FlokkMedlemmer from "../components/FlokkMedlemmer.svelte"
    import { velgFlokk } from "../utils/flokk-handtering.js"
    import { rute, naviger, settSokIUrl, lenkeKlikk } from "../utils/router.js"

    const flokkValg = [
        { sti: "/fagfolk", id: "alle", tekst: "Alle" },
        { sti: "/fagfolk/fagfolk", id: "fagfolk", tekst: "Fagfolk" },
        { sti: "/fagfolk/influensere", id: "influensere", tekst: "Influensere" }
    ]

    $: underside = $rute.path.split("/").filter(Boolean)[1]
    $: aktivFlokk = underside === "fagfolk" || underside === "influensere" ? underside : "alle"
    $: sokeord = $rute.sok
    $: valgtFlokk = sokeord.length === 0 ? velgFlokk(aktivFlokk) : velgFlokk(sokeord)

    const oppdaterSokeord = (event) => settSokIUrl(event.target.value)
    const fokuserSok = () => {
        if (aktivFlokk !== "alle") naviger("/fagfolk", { erstatt: true, fokuser: false })
    }
</script>

<nav aria-label="Hovedmeny og flokkfilter">
    <ul>
        <Hovedmeny />
        {#each flokkValg as flokkvalg}
            <li>
                <a
                    href={flokkvalg.sti}
                    aria-current={aktivFlokk === flokkvalg.id ? "page" : undefined}
                    on:click={lenkeKlikk(flokkvalg.sti)}
                >
                    {flokkvalg.tekst}
                </a>
            </li>
        {/each}
        <li>
            <input
                value={sokeord}
                on:input={oppdaterSokeord}
                on:focus={fokuserSok}
                placeholder="Søk i fagfolk+influencere"
                aria-label="Søk blant fagfolk og influencere"
            >
        </li>
    </ul>
</nav>

<section id="hovedinnhold" tabindex="-1">
    <h1 class="sr-only">Fagfolk og influencere</h1>
    <FlokkMedlemmer {valgtFlokk} />
</section>

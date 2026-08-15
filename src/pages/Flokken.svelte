<script>
    import Hovedmeny from "../components/Hovedmeny.svelte"
    import FlokkMedlemmer from "../components/FlokkMedlemmer.svelte"
    import {velgFlokk} from "../utils/flokk-handtering.js"

    export let endreSide
    export let aktivSide
    let aktivFlokk = "alle"
    let sokeord = ""
    const flokkValg = [
        { id: "alle", tekst: "Alle" },
        { id: "fagfolk", tekst: "Fagfolk" },
        { id: "influensere", tekst: "Influensere" }
    ]

    $: valgtFlokk = sokeord.length == 0 ? velgFlokk(aktivFlokk) : velgFlokk(sokeord)
</script>

<nav aria-label="Hovedmeny og flokkfilter">
    <ul>
        <Hovedmeny {endreSide} {aktivSide} />
        {#each flokkValg as flokkvalg}
            <li>
                <button
                    type="button"
                    class:active={aktivFlokk === flokkvalg.id}
                    on:click={() => aktivFlokk = flokkvalg.id}
                >
                    {flokkvalg.tekst}
                </button>
            </li>
        {/each}
        <li>
            <input 
                bind:value={sokeord} 
                placeholder="Søk i fagfolk+influencere"
                on:focus={() => aktivFlokk = "alle"}
                aria-label="Søk blant fagfolk og influencere"
            >
        </li>
    </ul>  
</nav>

<section>
    <FlokkMedlemmer {valgtFlokk} />
</section>
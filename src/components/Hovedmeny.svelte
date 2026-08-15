
<script>
    export let endreSide
    export let aktivSide = "Forside"

    const hovedmenyValg = [
        { side: "Forside", tittel: "Forside" },
        { side: "Historier", tittel: "Historiene" },
        { side: "Flokken", tittel: "Fagfolk + Influencere" }
    ]
</script>


{#each hovedmenyValg as menyvalg}
    <li>
        <button
            type="button"
            class:active={aktivSide === menyvalg.side}
            aria-current={aktivSide === menyvalg.side ? "page" : undefined}
            on:click={() => endreSide(menyvalg.side)}
        >
            {menyvalg.tittel}
        </button>
    </li>
{/each}

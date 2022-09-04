<script>
    import Hovedmeny from "../components/Hovedmeny.svelte"
    import FlokkMedlemmer from "../components/FlokkMedlemmer.svelte"
    import {velgFlokk} from "../utils/flokk-handtering.js"

    export let endreSide
    let aktivFlokk = "alle"
    let sokeord = ""

    $: valgtFlokk = sokeord.length == 0 ? velgFlokk(aktivFlokk) : velgFlokk(sokeord)
</script>

<nav>
    <ul>
        <Hovedmeny {endreSide} />
        <li 
            tabindex=0
            class:active="{aktivFlokk === "alle"}"
            on:click={() => aktivFlokk = "alle"}>Alle
        </li>
        <li 
            tabindex=0
            class:active="{aktivFlokk === "fagfolk"}"
            on:click={() => aktivFlokk = "fagfolk"}>Fagfolk
        </li>
        <li
            tabindex=0
            class:active="{aktivFlokk === "influensere"}"
            on:click={() => aktivFlokk = "influensere"}>Influensere
        </li>
        <li>
            <input 
                bind:value={sokeord} 
                placeholder="Søk i fagfolk+influencere"
                on:focus={() => aktivFlokk = "alle"}
            >
        </li>
    </ul>  
</nav>

<section>
    <FlokkMedlemmer {valgtFlokk} />
</section>
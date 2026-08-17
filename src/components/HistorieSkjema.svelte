<script>
    import { lagreHistorie, lastOppHistorieBilde } from "../utils/historie-handtering.js"
    let historieTittel
    let historieInnhold
    let historieKategorier = ["Familie", "Vennskap", "Forhold", "Barndom", "Seksualitet", "Arbeid", "Fritid", "Annet"]
    let valgteHistorieKategorier = ["Familie"]
    let files
    $: historieBildeFil = files?.[0]
    let historieBildeBeskrivelse = ""
    let bildetErOpplastet = false
    let historienErDelt = false
    let opplastingFeil = ""
    const tillatteFiltyper = ["image/jpeg", "image/png", "image/webp"]
    const maksFilstorrelse = 5 * 1024 * 1024

    const validerHistorieBilde = (fil) => {
        if (!fil) {
            return "Velg en bildefil før opplasting."
        }
        if (!tillatteFiltyper.includes(fil.type)) {
            return "Du kan kun laste opp JPG, PNG eller WEBP."
        }
        if (fil.size > maksFilstorrelse) {
            return "Bildet må være mindre enn 5 MB."
        }
        return ""
    }

    const lastOppValgtHistorieBilde = async () => {
        opplastingFeil = validerHistorieBilde(historieBildeFil)
        if (opplastingFeil) {
            return
        }

        const bildeBleLastetOpp = await lastOppHistorieBilde(historieBildeFil)
        if (!bildeBleLastetOpp) {
            opplastingFeil = "Opplasting feilet. Prøv igjen."
            return
        }

        bildetErOpplastet = true
        files = null
        opplastingFeil = ""
    }
</script>

<form on:submit|preventDefault={async () => {historienErDelt = await lagreHistorie(historieTittel.trim(), historieInnhold.trim(), valgteHistorieKategorier, historieBildeBeskrivelse.trim())}}>
    <label for="historie-navn">Hva heter historien din? (Feltet må ha noe innhold)</label>
    <input id="historie-navn" bind:value={historieTittel} autocomplete="off" required/>
    <label for="historie-innhold">Her kan du fortelle din historie (Feltet må ha noe innhold)</label>
    <textarea id="historie-innhold" bind:value={historieInnhold} required></textarea>
    <fieldset class="historie-kategorier">
        <legend>Velg historiekategori(er)</legend>
        {#each historieKategorier as historieKategori}
            <label class="historie-kategori-valg">
                <input type="checkbox" bind:group={valgteHistorieKategorier} value={historieKategori}>
                {historieKategori}
            </label>
        {/each}
    </fieldset>
        <label for="historie-bilde-opplasting-input">Last opp et historiebilde (Du velger selv om du vil ha bilde)</label>
            <div class="opplasting-container">
                <input id="historie-bilde-opplasting-input" type="file" accept="image/png,image/jpeg,image/webp" bind:files>
                <button
                    type="button"
                    class="historie-bilde-opplasting-knapp"
                    class:historie-bilde-opplasting-knapp-disabled={!historieBildeFil || bildetErOpplastet}
                    on:click={lastOppValgtHistorieBilde}
                    disabled={!historieBildeFil || bildetErOpplastet}
                >
                    {bildetErOpplastet ? "Bildet er opplastet" : "Last opp"}
                </button>
            </div>
            {#if opplastingFeil}
                <p class="opplasting-feil" aria-live="assertive">{opplastingFeil}</p>
            {/if}
            {#if bildetErOpplastet}
                <label for="historie-bilde-beskrivelse">Beskriv bildet med noen ord (for skjermlesere)</label>
                <input id="historie-bilde-beskrivelse" bind:value={historieBildeBeskrivelse} autocomplete="off" placeholder="F.eks. «To venner som ler sammen utendørs»">
            {/if}

        {#if !historienErDelt}
            <button>Del din historie</button>
        {:else}
            <p class="historie-er-delt" aria-live="polite"><b>Historien din er delt. Klikk Historier øverst for å se den.</b></p>
        {/if} 
</form>

<style>
    form {
        width: 70%;
        display: flex;
        flex-direction: column;
        font-size: 1.8rem;
    }

    input, textarea {
        padding: 1rem;
        margin-bottom: 3rem;
        outline: none;
        border: none;
        border-bottom: dotted 0.2rem black;
    }


    textarea {
        height: 15rem;
    }

    label {
        margin-bottom: 1.2rem;
    }

    .historie-kategorier {
        border: none;
        padding: 0;
        margin: 0 0 3rem;
    }

    .historie-kategorier legend {
        padding: 0;
        margin-bottom: 1.2rem;
        font-size: inherit;
    }

    .historie-kategori-valg {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 0.8rem;
        cursor: pointer;
    }

    .historie-kategori-valg input {
        margin: 0;
        cursor: pointer;
    }

    button {
        padding: 0.5rem;
        width: 40%;
        align-self: center;
        margin-bottom: 2.5rem;
        cursor: pointer;
    }

    .opplasting-container {
        display: flex;
    }

    .historie-bilde-opplasting-knapp {
        width: 20%;
        border-radius: 0.5rem;
        color: white;
        text-align: center;
        background-color: #112233;
        cursor: pointer;
        margin-left: 2rem;
    }

    .historie-bilde-opplasting-knapp-disabled {
        width: 20%;
        border-radius: 0.5rem;
        color: #222;
        text-align: center;
        background-color: #bbb;
        margin-left: 2rem;
    }

    .opplasting-feil {
        color: #a80000;
        font-size: 1.6rem;
        margin-bottom: 2rem;
    }

    .historie-er-delt {
        margin-top: 2rem;
        font-size: 2rem;
    }
</style>

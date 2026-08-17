<script>
    import { lagreHistorie, lastOppHistorieBilde } from "../utils/historie-handtering.js"
    let historieTittel
    let historieInnhold
    let historieKategorier = ["Familie", "Vennskap", "Forhold", "Barndom", "Seksualitet", "Arbeid", "Fritid", "Annet"]
    let valgteHistorieKategorier = ["Familie"]
    let files
    $: historieBildeFil = files?.[0]
    let historieBildeBeskrivelse = ""
    let historienErDelt = false
    let opplastingFeil = ""
    let senderInn = false
    const tillatteFiltyper = ["image/jpeg", "image/png", "image/webp"]
    const maksFilstorrelse = 5 * 1024 * 1024

    const validerHistorieBilde = (fil) => {
        if (!tillatteFiltyper.includes(fil.type)) {
            return "Du kan kun laste opp JPG, PNG eller WEBP."
        }
        if (fil.size > maksFilstorrelse) {
            return "Bildet må være mindre enn 5 MB."
        }
        return ""
    }

    const sendInnHistorie = async () => {
        opplastingFeil = historieBildeFil ? validerHistorieBilde(historieBildeFil) : ""
        if (opplastingFeil) {
            return
        }

        senderInn = true

        let historieBildeUrl = ""
        if (historieBildeFil) {
            historieBildeUrl = await lastOppHistorieBilde(historieBildeFil)
            if (!historieBildeUrl) {
                opplastingFeil = "Opplasting av bilde feilet. Prøv igjen."
                senderInn = false
                return
            }
        }

        historienErDelt = await lagreHistorie(historieTittel.trim(), historieInnhold.trim(), valgteHistorieKategorier, historieBildeBeskrivelse.trim(), historieBildeUrl)
        senderInn = false
    }
</script>

<form on:submit|preventDefault={sendInnHistorie}>
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
        <label for="historie-bilde-opplasting-input">Legg til et historiebilde (Du velger selv om du vil ha bilde)</label>
            <input id="historie-bilde-opplasting-input" type="file" accept="image/png,image/jpeg,image/webp" bind:files>
            {#if opplastingFeil}
                <p class="opplasting-feil" aria-live="assertive">{opplastingFeil}</p>
            {/if}
            {#if historieBildeFil}
                <label for="historie-bilde-beskrivelse">Beskriv bildet med noen ord (for skjermlesere)</label>
                <input id="historie-bilde-beskrivelse" bind:value={historieBildeBeskrivelse} autocomplete="off" placeholder="F.eks. «To venner som ler sammen utendørs»">
            {/if}

        {#if !historienErDelt}
            <button disabled={senderInn}>{senderInn ? "Deler historien …" : "Del din historie"}</button>
        {:else}
            <p class="historie-er-delt" aria-live="polite"><b>Historien din er delt. Klikk Historier øverst for å se den.</b></p>
        {/if}
</form>

<style>
    form {
        width: min(70rem, 92%);
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
        padding: 1rem 2rem;
        min-width: 18rem;
        align-self: center;
        margin-bottom: 2.5rem;
        cursor: pointer;
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

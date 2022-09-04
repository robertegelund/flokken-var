<script>
    import { lagreHistorie, slettHistorie, lastOppHistorieBilde } from "../utils/historie-handtering.js"
    let historieTittel
    let historieInnhold
    let historieKategorier = ["Familie", "Vennskap", "Forhold", "Barndom", "Seksualitet", "Arbeid", "Fritid", "Annet"]
    let valgteHistorieKategorier = "Familie"
    let files = []
    $: historieBildeFil = files[0]
    let bildetErOpplastet = false
    let historienErDelt = false
</script>

<form on:submit|preventDefault={async () => {await lagreHistorie(historieTittel, historieInnhold, valgteHistorieKategorier); historienErDelt = true}}>
    <label for="historie-navn">Hva heter historien din? (Feltet må ha noe innhold)</label>
    <input id="historie-navn" bind:value={historieTittel} autocomplete="off" required/>
    <label for="historie-innhold">Her kan du fortelle din historie (Feltet må ha noe innhold)</label>
    <textarea id="historie-innhold" bind:value={historieInnhold} required></textarea>
    <label for="historie-velg-kategorier">Velg historiekategori(er)</label>
    <select id="historie-velg-kategorier" multiple bind:value={valgteHistorieKategorier}>
        {#each historieKategorier as historieKategori}
            <option value={historieKategori}>
                {historieKategori}
            </option>
        {/each} 
    </select>
        <label for="historie-bilde-opplasting-input">Last opp et historiebilde (Du velger selv om du vil ha bilde)</label>
            <div class="opplasting-container">
                <input id="historie-bilde-opplasting-input" type="file" bind:files>
                {#if historieBildeFil}
                    <button class="historie-bilde-opplasting-knapp" on:click={() => {lastOppHistorieBilde(historieBildeFil); bildetErOpplastet = true; historieBildeFil = "" }}>Last opp</button>
                {:else if bildetErOpplastet && historieBildeFil === ""}
                    <button class="historie-bilde-opplasting-knapp-disabled">Bildet er opplastet</button>
                {:else}
                    <button class="historie-bilde-opplasting-knapp-disabled">Last opp</button>
                {/if}
            </div>
            
        {#if !historienErDelt}
            <button>Del din historie</button>
        {:else}
            <p class="historie-er-delt"><b>Historien din er delt. Klikk Historier øverst for å se den.</b></p>
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

    select {
        margin-bottom: 3rem;
        outline: none;
    }

    label {
        margin-bottom: 1.2rem;
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
        color: #555;
        text-align: center;
        background-color: #999;
        margin-left: 2rem;
    }

    .historie-er-delt {
        margin-top: 2rem;
        font-size: 2rem;
    }
</style>


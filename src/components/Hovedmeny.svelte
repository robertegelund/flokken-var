<script>
    import { rute, lenkeKlikk } from "../utils/router.js"

    const hovedmenyValg = [
        { sti: "/", tittel: "Forside" },
        { sti: "/historier", tittel: "Historiene" },
        { sti: "/fagfolk", tittel: "Fagfolk + Influencere" }
    ]

    $: gjeldendeSide = "/" + ($rute.path.split("/").filter(Boolean)[0] ?? "")
</script>

{#each hovedmenyValg as menyvalg}
    <li>
        <a
            href={menyvalg.sti}
            class:active={gjeldendeSide === menyvalg.sti}
            aria-current={gjeldendeSide === menyvalg.sti ? "page" : undefined}
            on:click={lenkeKlikk(menyvalg.sti)}
        >
            {menyvalg.tittel}
        </a>
    </li>
{/each}

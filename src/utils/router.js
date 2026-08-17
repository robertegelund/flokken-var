import { writable } from "svelte/store"
import { tick } from "svelte"

const lesRute = () => ({
    path: window.location.pathname,
    sok: new URLSearchParams(window.location.search).get("sok") || ""
})

export const rute = writable(lesRute())

const flyttFokusTilInnhold = async () => {
    // Wait for Svelte to actually finish swapping in the new route's DOM —
    // requestAnimationFrame alone isn't a reliable guarantee of that, and
    // focusing the outgoing page's element right before it's unmounted just
    // sends focus back to <body>.
    await tick()
    // .focus() alone triggers the browser's own scroll-into-view heuristic,
    // which for a tall element can land anywhere on the page. Scroll to the
    // top explicitly first, then focus without letting it re-scroll.
    window.scrollTo(0, 0)
    document.getElementById("hovedinnhold")?.focus({ preventScroll: true })
}

window.addEventListener("popstate", () => {
    rute.set(lesRute())
    flyttFokusTilInnhold()
})

export const naviger = (sti, { erstatt = false, fokuser = true } = {}) => {
    if (erstatt) {
        window.history.replaceState({}, "", sti)
    } else {
        window.history.pushState({}, "", sti)
    }
    rute.set(lesRute())
    if (fokuser) flyttFokusTilInnhold()
}

export const settSokIUrl = (sok) => {
    const url = new URL(window.location.href)
    if (sok) {
        url.searchParams.set("sok", sok)
    } else {
        url.searchParams.delete("sok")
    }
    window.history.replaceState({}, "", url.pathname + url.search)
    rute.set(lesRute())
}

export const lenkeKlikk = (sti) => (event) => {
    event.preventDefault()
    naviger(sti)
}

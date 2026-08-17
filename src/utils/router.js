import { writable } from "svelte/store"

const lesRute = () => ({
    path: window.location.pathname,
    sok: new URLSearchParams(window.location.search).get("sok") || ""
})

export const rute = writable(lesRute())

const flyttFokusTilInnhold = () => {
    requestAnimationFrame(() => {
        document.getElementById("hovedinnhold")?.focus()
    })
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

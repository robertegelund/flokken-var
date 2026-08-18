import { lagreSlettenokkel, hentSlettenokkel } from "./klient.js"

export const hentHistorier = async () => {
    try {
        const respons = await fetch("/api/stories")
        if (!respons.ok) {
            return []
        }
        return await respons.json()
    }
    catch (error) {
        console.error(error)
        return []
    }
}

export const lagreHistorie = async (historieTittel, historieInnhold, valgteHistorieKategorier, bildebeskrivelse = "", historieBildeUrl = "") => {
    try {
        const respons = await fetch("/api/stories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: historieTittel,
                content: historieInnhold,
                categories: valgteHistorieKategorier,
                imageUrl: historieBildeUrl || undefined,
                imageDescription: bildebeskrivelse || undefined,
            }),
        })

        if (!respons.ok) {
            return false
        }

        const { id, slettenokkel } = await respons.json()
        lagreSlettenokkel(id, slettenokkel)
        return true
    }
    catch (error) {
        console.error(error)
        return false
    }
}

export const slettHistorie = async (historieID) => {
    const slettenokkel = hentSlettenokkel(historieID)
    if (!slettenokkel) {
        return false
    }

    try {
        const respons = await fetch(`/api/stories/${historieID}`, {
            method: "DELETE",
            headers: { "x-slettenokkel": slettenokkel },
        })
        return respons.ok
    }
    catch (error) {
        console.error(error)
        return false
    }
}

export const lastOppHistorieBilde = async (historieBildeFil) => {
    try {
        const respons = await fetch("/api/pictures", {
            method: "POST",
            headers: { "Content-Type": historieBildeFil.type },
            body: historieBildeFil,
        })

        if (!respons.ok) {
            return null
        }

        const { url } = await respons.json()
        return url
    }
    catch (error) {
        console.error(error)
        return null
    }
}
